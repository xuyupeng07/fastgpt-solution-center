/**
 * ECharts 图表组件 —— 路线 A：客户端懒渲染，SSR 安全 + 明暗主题自适应。
 *
 * `docusaurus build`（Node 端预渲染）阶段只输出一个占位容器 <div>，
 * 浏览器 hydration 后由 useEffect 初始化 echarts 并把 JSON 配置画进去。
 *
 * 配色统一：作者在 JSON 里不写死 hex，而是引用语义色 token（primary/success/…），
 * 组件读取 src/css/custom.css 里随 `[data-theme]` 切换的 `--chart-*` 变量，
 * 解析为当前明暗主题下的色值；并监听 `data-theme` 变化，切换主题时自动重绘。
 */
import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

import styles from './styles.module.css';

export interface EChartsProps {
  /** 代码块里的原始内容（ECharts option 的 JSON 字符串） */
  code: React.ReactNode;
}

/** 语义色 token —— 作者在 `"color"` 字段里写这些关键字，组件按当前主题解析为具体色值。 */
const COLOR_TOKENS = ['primary', 'success', 'warning', 'danger', 'neutral', 'violet', 'cyan'] as const;
type ColorToken = (typeof COLOR_TOKENS)[number];
const TOKEN_SET: ReadonlySet<string> = new Set<string>(COLOR_TOKENS);

/** token → 对应 CSS 变量（src/css/custom.css 里明暗各一套）。 */
const TOKEN_VAR: Record<ColorToken, string> = {
  primary: '--chart-primary',
  success: '--chart-success',
  warning: '--chart-warning',
  danger: '--chart-danger',
  neutral: '--chart-neutral',
  violet: '--chart-violet',
  cyan: '--chart-cyan',
};

/** 外观变量（文字 / 轴线 / 分割线），由组件注入默认值，作者无需写死。 */
const STRUCTURE_VAR = {
  text: '--chart-text',
  textSecondary: '--chart-text-secondary',
  axis: '--chart-axis',
  split: '--chart-split',
} as const;

/** CSS 变量缺失时的兜底色板（浅色），正常情况下不会用到。 */
const DEFAULT_PALETTE = {
  primary: '#326dff',
  success: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
  neutral: '#94a3b8',
  violet: '#7c3aed',
  cyan: '#0891b2',
  text: '#1f2937',
  textSecondary: '#6b7280',
  axis: '#e5e7eb',
  split: '#f3f4f6',
} as const;

const THEME_NAME = 'fastgpt-doc';

interface Palette {
  tokens: Record<ColorToken, string>;
  text: string;
  textSecondary: string;
  axis: string;
  split: string;
}

function toCodeString(code: React.ReactNode): string {
  if (typeof code === 'string') return code;
  if (Array.isArray(code)) return code.map((c) => (typeof c === 'string' ? c : '')).join('');
  return String(code ?? '');
}

function readVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** 读当前明暗主题下的语义色 + 外观色。 */
function readPalette(): Palette {
  const tokens = {} as Record<ColorToken, string>;
  for (const token of COLOR_TOKENS) {
    tokens[token] = readVar(TOKEN_VAR[token]) || DEFAULT_PALETTE[token];
  }
  return {
    tokens,
    text: readVar(STRUCTURE_VAR.text) || DEFAULT_PALETTE.text,
    textSecondary: readVar(STRUCTURE_VAR.textSecondary) || DEFAULT_PALETTE.textSecondary,
    axis: readVar(STRUCTURE_VAR.axis) || DEFAULT_PALETTE.axis,
    split: readVar(STRUCTURE_VAR.split) || DEFAULT_PALETTE.split,
  };
}

/** 递归把 `color` 字段里的 token 关键字解析为当前主题色值；普通 hex/rgba 原样保留。 */
function resolveColorTokens(node: unknown, tokens: Record<ColorToken, string>): unknown {
  if (Array.isArray(node)) return node.map((n) => resolveColorTokens(n, tokens));
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === 'color') {
        out[key] = resolveColorValue(value, tokens);
      } else {
        out[key] = resolveColorTokens(value, tokens);
      }
    }
    return out;
  }
  return node;
}

function resolveColorValue(value: unknown, tokens: Record<ColorToken, string>): unknown {
  if (typeof value === 'string') return TOKEN_SET.has(value) ? tokens[value as ColorToken] : value;
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' && TOKEN_SET.has(v) ? tokens[v as ColorToken] : v));
  }
  return value;
}

/** 注册与当前主题匹配的 ECharts 主题：序列色板 + 文字/轴线/分割线默认色。 */
function registerTheme(palette: Palette): void {
  echarts.registerTheme(THEME_NAME, {
    color: COLOR_TOKENS.map((t) => palette.tokens[t]),
    textStyle: {color: palette.text},
    title: {
      textStyle: {color: palette.text},
      subtextStyle: {color: palette.textSecondary},
    },
    legend: {textStyle: {color: palette.textSecondary}},
    categoryAxis: {
      axisLine: {lineStyle: {color: palette.axis}},
      axisTick: {lineStyle: {color: palette.axis}},
      axisLabel: {color: palette.textSecondary},
      splitLine: {lineStyle: {color: palette.split}},
    },
    valueAxis: {
      axisLine: {lineStyle: {color: palette.axis}},
      axisTick: {lineStyle: {color: palette.axis}},
      axisLabel: {color: palette.textSecondary},
      splitLine: {lineStyle: {color: palette.split}},
    },
  });
}

export default function ECharts({code}: EChartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const raw = toCodeString(code);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let option: unknown;
    try {
      option = JSON.parse(raw);
    } catch (err) {
      el.textContent = `ECharts 配置解析失败：${(err as Error).message}`;
      return;
    }

    let chart: echarts.ECharts | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let themeObserver: MutationObserver | undefined;

    const render = () => {
      const palette = readPalette();
      registerTheme(palette);
      chart?.dispose();
      chart = echarts.init(el, THEME_NAME);
      chart.setOption(resolveColorTokens(option, palette.tokens) as echarts.EChartsOption);

      resizeObserver?.disconnect();
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => chart?.resize());
        resizeObserver.observe(el);
      }
    };

    render();

    // 明暗主题切换时重绘，配色跟随站点主题。
    if (typeof MutationObserver !== 'undefined') {
      themeObserver = new MutationObserver(() => render());
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    return () => {
      themeObserver?.disconnect();
      resizeObserver?.disconnect();
      chart?.dispose();
    };
  }, [raw]);

  return <div ref={containerRef} className={styles.root} />;
}
