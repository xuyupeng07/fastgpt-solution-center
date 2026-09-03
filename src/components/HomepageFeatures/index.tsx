import {useEffect, useRef, type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
  lightImg: string;
  darkImg: string;
};

const FeatureList: FeatureItem[] = [
  {
    titleId: 'homepage.feature.rag.title',
    titleDefault: '智能知识库问答',
    descId: 'homepage.feature.rag.desc',
    descDefault:
      '多格式文档自动导入与智能预处理，向量 + 全文混合检索配合重排序，实现高精度、可溯源的多轮问答。',
    lightImg: 'img/feature-rag-light.jpg',
    darkImg: 'img/feature-rag-dark.jpg',
  },
  {
    titleId: 'homepage.feature.workflow.title',
    titleDefault: '可视化工作流编排',
    descId: 'homepage.feature.workflow.desc',
    descDefault:
      '拖拽式低代码设计，25+ 内置节点支持循环、并行与判断分支，无需写代码即可编排复杂业务逻辑。',
    lightImg: 'img/feature-workflow-light.jpg',
    darkImg: 'img/feature-workflow-dark.jpg',
  },
  {
    titleId: 'homepage.feature.agent.title',
    titleDefault: 'AI Agent 与工具调用',
    descId: 'homepage.feature.agent.desc',
    descDefault:
      '支持 Function Calling 与 Agent 自主决策，灵活组合工具、技能与知识库，内置双向 MCP 协议打通外部系统。',
    lightImg: 'img/feature-agent-light.jpg',
    darkImg: 'img/feature-agent-dark.jpg',
  },
];

/** 让卡片上的光斑跟随鼠标:把相对坐标写入每个子卡片的 --mouse-x / --mouse-y */
function Spotlight({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }
    const handleMouseMove = (event: MouseEvent) => {
      Array.from(container.children).forEach((child) => {
        const el = child as HTMLElement;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
        el.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
      });
    };
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} className={styles.spotlightGrid}>
      {children}
    </div>
  );
}

function Feature({titleId, titleDefault, descId, descDefault, lightImg, darkImg}: FeatureItem) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardImage}>
          <img
            className={clsx(styles.image, styles.imageLight)}
            src={useBaseUrl(lightImg)}
            alt=""
            loading="lazy"
          />
          <img
            className={clsx(styles.image, styles.imageDark)}
            src={useBaseUrl(darkImg)}
            alt=""
            loading="lazy"
          />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardBadge}>
            <span className={styles.cardBadgeText}>
              <Translate id={titleId}>{titleDefault}</Translate>
            </span>
          </span>
          <p>
            <Translate id={descId}>{descDefault}</Translate>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <img
        className={clsx(styles.bgShape, styles.bgShapeTop, styles.bgLight)}
        src={useBaseUrl('img/blurred-shape-gray-light.svg')}
        alt=""
        aria-hidden="true"
      />
      <img
        className={clsx(styles.bgShape, styles.bgShapeTop, styles.bgDark)}
        src={useBaseUrl('img/blurred-shape-gray.svg')}
        alt=""
        aria-hidden="true"
      />
      <img
        className={clsx(styles.bgShape, styles.bgShapeBottom, styles.bgLight)}
        src={useBaseUrl('img/blurred-shape-light.svg')}
        alt=""
        aria-hidden="true"
      />
      <img
        className={clsx(styles.bgShape, styles.bgShapeBottom, styles.bgDark)}
        src={useBaseUrl('img/blurred-shape.svg')}
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerBadgeLine}>
            <span className={styles.headerBadgeText}>
              <Translate id="homepage.features.label">核心能力</Translate>
            </span>
          </div>
          <h2 className={styles.headerTitle}>
            <Translate id="homepage.features.title">为你的 AI 应用而生</Translate>
          </h2>
          <p className={styles.headerDesc}>
            <Translate id="homepage.features.desc">
              从知识库问答到 Agent 工作流，FastGPT 提供开箱即用的一站式能力，让你在几分钟内搭建并发布企业级 AI 应用。
            </Translate>
          </p>
        </div>
        <Spotlight>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
