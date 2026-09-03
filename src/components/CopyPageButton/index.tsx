import {useCallback, useEffect, useRef, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import TurndownService from 'turndown';

import styles from './styles.module.css';

/** 优先使用异步剪贴板 API,失败时降级到隐藏 textarea 的兼容方案。 */
async function copyTextToClipboard(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 构建一个贴合 Docusaurus 文档页渲染结构的 HTML → Markdown 转换器。
 * 自定义规则还原 Docusaurus 专属语法:
 *  - ```lang title="..." 代码围栏
 *  - :::type[title] ... ::: 提示框(admonition)
 *
 * @param admonitionDefaults 各提示框类型在当前语言下的默认标题,
 *   用于区分「自定义标题」与「默认标题」,默认标题省略不写。
 */
function createDocTurndown(
  admonitionDefaults: Record<string, string>,
): TurndownService {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
  });

  // 代码块:还原 ```lang [title="..."] 围栏,并正确保留每行内容
  turndown.addRule('docusaurusCodeBlock', {
    filter: (node: HTMLElement) =>
      node.nodeType === 1 && node.classList?.contains('theme-code-block'),
    replacement: (_content, node) => {
      const block = node as HTMLElement;
      const pre = block.querySelector('pre');
      const code = pre?.querySelector('code');
      const lang =
        pre?.className.match(/language-([\w-]+)/)?.[1] ??
        code?.getAttribute('data-language') ??
        '';

      const title = block
        .querySelector('[class*="codeBlockTitle"]')
        ?.textContent?.trim();
      const meta = title ? ` title="${title}"` : '';

      // 每行由 div.token-line 包裹;按行拼接以保留换行
      const lineNodes = code?.querySelectorAll('.token-line');
      let codeText: string;
      if (lineNodes && lineNodes.length > 0) {
        codeText = Array.from(lineNodes)
          .map((line) => line.textContent ?? '')
          .join('\n');
      } else {
        codeText = code?.textContent ?? '';
      }

      return `\n\n\`\`\`${lang}${meta}\n${codeText.replace(/\n+$/, '')}\n\`\`\`\n\n`;
    },
  });

  // Admonition:还原 :::type[自定义标题] ... ::: 语法
  turndown.addRule('docusaurusAdmonition', {
    filter: (node: HTMLElement) =>
      node.nodeType === 1 && node.classList?.contains('theme-admonition'),
    replacement: (_content, node) => {
      const el = node as HTMLElement;
      const type =
        Array.from(el.classList)
          .find((cls) => cls.startsWith('theme-admonition-'))
          ?.replace('theme-admonition-', '') ?? 'note';

      // 提取标题(去掉左侧图标)
      const heading = el.querySelector('[class*="admonitionHeading"]');
      let titleText = '';
      if (heading) {
        const headingClone = heading.cloneNode(true) as HTMLElement;
        headingClone
          .querySelectorAll('[class*="admonitionIcon"], svg')
          .forEach((child) => child.remove());
        titleText = (headingClone.textContent ?? '').trim();
      }

      // 与当前语言默认标题一致时省略,避免 :::note[note] 这类冗余
      const defaultLabel = admonitionDefaults[type];
      const titlePart =
        titleText && titleText !== defaultLabel ? `[${titleText}]` : '';

      const contentEl = el.querySelector('[class*="admonitionContent"]');
      const innerMarkdown = contentEl
        ? turndown.turndown(contentEl.innerHTML)
        : '';

      return `\n\n:::${type}${titlePart}\n\n${innerMarkdown.trim()}\n\n:::\n\n`;
    },
  });

  return turndown;
}

/** 从按钮所在文档正文容器提取 Markdown。 */
function extractPageMarkdown(
  buttonEl: HTMLElement,
  admonitionDefaults: Record<string, string>,
): string {
  const container = buttonEl.closest('.theme-doc-markdown') as HTMLElement | null;
  if (!container) {
    return '';
  }

  // 克隆正文,剔除 UI 噪声:复制按钮、标题锚点、代码块操作按钮等
  const clone = container.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      '[data-copy-page-button], .hash-link, .clean-btn, button, .theme-code-block-copy-button, .theme-code-block-word-wrap-toggle',
    )
    .forEach((el) => el.remove());

  return createDocTurndown(admonitionDefaults).turndown(clone.innerHTML);
}

function useCopyFeedback(durationMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const markCopied = useCallback(() => {
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), durationMs);
  }, [durationMs]);

  return {copied, markCopied};
}

export default function CopyPageButton() {
  const {copied, markCopied} = useCopyFeedback();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const label = translate({
    id: 'theme.copyPage.label',
    message: '复制页面',
  });
  const copiedLabel = translate({
    id: 'theme.copyPage.copied',
    message: '已复制',
  });
  const ariaLabel = translate({
    id: 'theme.copyPage.ariaLabel',
    message: '复制当前页面的 Markdown 内容',
  });

  const handleCopy = useCallback(async () => {
    if (!buttonRef.current) {
      return;
    }

    // 取各提示框类型在当前语言下的默认标题(与 Docusaurus 翻译体系对齐)
    const admonitionDefaults: Record<string, string> = {
      note: translate({id: 'theme.admonition.note', message: 'note'}),
      tip: translate({id: 'theme.admonition.tip', message: 'tip'}),
      info: translate({id: 'theme.admonition.info', message: 'info'}),
      warning: translate({id: 'theme.admonition.warning', message: 'warning'}),
      danger: translate({id: 'theme.admonition.danger', message: 'danger'}),
      caution: translate({id: 'theme.admonition.caution', message: 'caution'}),
    };

    const markdown = extractPageMarkdown(buttonRef.current, admonitionDefaults);
    if (!markdown) {
      return;
    }
    try {
      await copyTextToClipboard(markdown);
      markCopied();
    } catch {
      // 复制失败时静默降级,不影响阅读
    }
  }, [markCopied]);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-copy-page-button
      className={clsx(styles.copyButton, copied && styles.copied)}
      onClick={handleCopy}
      aria-label={ariaLabel}>
      <span className={styles.tooltip} role="tooltip">
        {ariaLabel}
      </span>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span className={styles.label}>
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
}
