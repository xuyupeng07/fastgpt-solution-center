import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

type Highlight = {
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
  icon: ReactNode;
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const Highlights: Highlight[] = [
  {
    titleId: 'homepage.highlights.rag.title',
    titleDefault: '知识库与 RAG',
    descId: 'homepage.highlights.rag.desc',
    descDefault:
      '多格式文档自动导入与智能预处理，向量 + 全文混合检索，高精度、可溯源。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    titleId: 'homepage.highlights.workflow.title',
    titleDefault: '可视化工作流',
    descId: 'homepage.highlights.workflow.desc',
    descDefault:
      '拖拽式低代码编排，25+ 内置节点支持循环、并行与判断分支。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <rect x="3" y="3" width="6" height="6" rx="1.5" />
        <rect x="15" y="15" width="6" height="6" rx="1.5" />
        <path d="M9 6h6a3 3 0 0 1 3 3v3" />
        <path d="M15 18H9a3 3 0 0 1-3-3V9" />
      </svg>
    ),
  },
  {
    titleId: 'homepage.highlights.agent.title',
    titleDefault: 'AI Agent 与 MCP',
    descId: 'homepage.highlights.agent.desc',
    descDefault:
      'Function Calling 自主决策，双向 MCP 协议打通外部工具与系统。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  {
    titleId: 'homepage.highlights.models.title',
    titleDefault: '模型无关',
    descId: 'homepage.highlights.models.desc',
    descDefault:
      'AI Proxy 统一网关，接入 ChatGPT、Claude、DeepSeek、文心一言等主流模型。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
  },
  {
    titleId: 'homepage.highlights.security.title',
    titleDefault: '权限与协作',
    descId: 'homepage.highlights.security.desc',
    descDefault:
      'ABAC + RBAC 资源级权限，团队协作与多渠道发布一体化。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    titleId: 'homepage.highlights.deploy.title',
    titleDefault: '私有化部署',
    descId: 'homepage.highlights.deploy.desc',
    descDefault:
      'Docker Compose 一键私有化部署，也提供全托管 SaaS 云服务。',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} {...stroke}>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
    ),
  },
];

export default function HomepageHighlights(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headerBadgeLine}>
              <span className={styles.headerBadgeText}>
                <Translate id="homepage.highlights.label">平台特性</Translate>
              </span>
            </div>
            <h2 className={styles.headerTitle}>
              <Translate id="homepage.highlights.title">
                为现代产品团队而生
              </Translate>
            </h2>
            <p className={styles.headerDesc}>
              <Translate id="homepage.highlights.desc">
                FastGPT 将知识库、工作流与 AI Agent 融为一体，让团队无需深厚的 AI 基础也能快速落地企业级应用。
              </Translate>
            </p>
          </div>

          <div className={styles.grid}>
            {Highlights.map((item, idx) => (
              <article key={idx} className={styles.item}>
                <div className={styles.icon}>{item.icon}</div>
                <h3 className={styles.itemTitle}>
                  <Translate id={item.titleId}>{item.titleDefault}</Translate>
                </h3>
                <p className={styles.itemDesc}>
                  <Translate id={item.descId}>{item.descDefault}</Translate>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
