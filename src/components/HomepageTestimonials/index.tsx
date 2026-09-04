import {useState, type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useMasonry from '@site/src/utils/useMasonry';
import styles from './styles.module.css';

type Category = 'all' | 'kb' | 'service' | 'data' | 'workflow';

type Testimonial = {
  category: Category;
  logo: string;
  logoDark?: string;
  company: string;
  quoteId: string;
  quoteDefault: string;
  avatar: string;
  name: string;
  roleId: string;
  roleDefault: string;
};

const CATEGORIES: {key: Category; id: string; default: string; icon: ReactNode}[] = [
  {
    key: 'all',
    id: 'homepage.testimonials.category.all',
    default: '全部',
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
        <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
      </svg>
    ),
  },
  {
    key: 'kb',
    id: 'homepage.testimonials.category.kb',
    default: '知识库问答',
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2H8v10H3.5A1.5 1.5 0 0 0 2 13.5v-10Z" />
        <path d="M14 3.5A1.5 1.5 0 0 0 12.5 2H8v10h4.5a1.5 1.5 0 0 1 1.5 1.5v-10Z" />
      </svg>
    ),
  },
  {
    key: 'service',
    id: 'homepage.testimonials.category.service',
    default: '智能客服',
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
        <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7l-3 3v-3H3a1 1 0 0 1-1-1V3Z" />
      </svg>
    ),
  },
  {
    key: 'data',
    id: 'homepage.testimonials.category.data',
    default: '数据分析',
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
        <path d="M3 10h3v4H3zM7 6h3v8H7zM11 2h3v12h-3z" />
      </svg>
    ),
  },
  {
    key: 'workflow',
    id: 'homepage.testimonials.category.workflow',
    default: '工作流自动化',
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
        <rect x="2" y="2" width="4" height="2" rx="1" />
        <rect x="10" y="2" width="4" height="2" rx="1" />
        <rect x="2" y="12" width="4" height="2" rx="1" />
        <rect x="10" y="12" width="4" height="2" rx="1" />
        <path d="M4 4v8M12 4v8" />
      </svg>
    ),
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    category: 'kb',
    logo: 'img/customers/启鸣达人.png',
    company: '启鸣达人',
    quoteId: 'homepage.testimonials.q1',
    quoteDefault:
      '把上千份课程讲义和答疑沉淀进 FastGPT 知识库后，学员提问秒回，教研团队省下了大量重复答疑的时间。',
    avatar: 'img/avatars/avatar-1.jpg',
    name: '张伟',
    roleId: 'homepage.testimonials.r1',
    roleDefault: '教研负责人',
  },
  {
    category: 'kb',
    logo: 'img/customers/延锋国际.png',
    company: '延锋国际',
    quoteId: 'homepage.testimonials.q2',
    quoteDefault:
      '几万条产品与工艺文档接入 FastGPT，一线工程师用自然语言就能检索到标准作业指导，结果还能溯源到原文。',
    avatar: 'img/avatars/avatar-2.jpg',
    name: '王建国',
    roleId: 'homepage.testimonials.r2',
    roleDefault: '数字化与 IT 负责人',
  },
  {
    category: 'data',
    logo: 'img/customers/招商证券.png',
    company: '招商证券',
    quoteId: 'homepage.testimonials.q3',
    quoteDefault:
      'FastGPT 接上内部数据库后，投研同学直接用自然语言查数、生成图表，行情复盘和研报整理的效率提升非常明显。',
    avatar: 'img/avatars/avatar-3.jpg',
    name: '李静',
    roleId: 'homepage.testimonials.r3',
    roleDefault: '金融科技部数据分析师',
  },
  {
    category: 'kb',
    logo: 'img/customers/昭昭医考.png',
    company: '昭昭医考',
    quoteId: 'homepage.testimonials.q4',
    quoteDefault:
      '海量题库和教材导入 FastGPT，学员随时提问都能得到带出处的解答，医考复习的答疑压力大大减轻。',
    avatar: 'img/avatars/avatar-4.jpg',
    name: '刘敏',
    roleId: 'homepage.testimonials.r4',
    roleDefault: '教务与题库负责人',
  },
  {
    category: 'data',
    logo: 'img/customers/朝阳永续.png',
    company: '朝阳永续',
    quoteId: 'homepage.testimonials.q5',
    quoteDefault:
      '把金融数据接口接到 FastGPT，业务团队不再依赖技术排期，自己就能完成数据查询和可视化分析。',
    avatar: 'img/avatars/avatar-5.jpg',
    name: '陈晨',
    roleId: 'homepage.testimonials.r5',
    roleDefault: '数据产品经理',
  },
  {
    category: 'service',
    logo: 'img/customers/欧派家居.png',
    logoDark: 'img/customers/欧派家居-dark.png',
    company: '欧派家居',
    quoteId: 'homepage.testimonials.q6',
    quoteDefault:
      '用 FastGPT 搭的智能客服 7×24 小时在线，常见问题自动解决，人工只集中处理复杂设计需求，客户体验明显提升。',
    avatar: 'img/avatars/avatar-6.jpg',
    name: '黄丽娟',
    roleId: 'homepage.testimonials.r6',
    roleDefault: '客户服务中心总监',
  },
  {
    category: 'workflow',
    logo: 'img/customers/联邦制药.png',
    logoDark: 'img/customers/联邦制药-dark.png',
    company: '联邦制药',
    quoteId: 'homepage.testimonials.q7',
    quoteDefault:
      '拖拽式工作流把多份质检报告、合规文档自动汇总成流水线，原来要几天的整理工作现在几分钟就能完成。',
    avatar: 'img/avatars/avatar-7.jpg',
    name: '赵强',
    roleId: 'homepage.testimonials.r7',
    roleDefault: '质量管理与合规负责人',
  },
];

function TestimonialCard({item, dimmed}: {item: Testimonial; dimmed: boolean}) {
  return (
    <article className={clsx(styles.card, dimmed && styles.cardDimmed)}>
      <div className={styles.cardInner}>
        <div className={clsx(styles.client, item.logoDark && styles.clientHasDark)}>
          <img
            className={styles.clientLogoLt}
            src={useBaseUrl(item.logo)}
            alt={item.company}
            loading="lazy"
          />
          {item.logoDark && (
            <img
              className={styles.clientLogoDk}
              src={useBaseUrl(item.logoDark)}
              alt={item.company}
              loading="lazy"
              aria-hidden="true"
            />
          )}
        </div>
        <p className={styles.quote}>
          <Translate id={item.quoteId}>{item.quoteDefault}</Translate>
        </p>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src={useBaseUrl(item.avatar)}
            alt={item.name}
            loading="lazy"
          />
          <div className={styles.authorMeta}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.role}>
              <Translate id={item.roleId}>{item.roleDefault}</Translate>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HomepageTestimonials(): ReactNode {
  const [category, setCategory] = useState<Category>('all');

  // 卡片始终全部渲染,不随筛选增删;仅用明暗变化突出当前分类(复刻原模板)。
  const gridRef = useMasonry();

  return (
    <section className={styles.section}>
      {/* 环境氛围光:紫色系光晕,置于内容之下 */}
      <img
        className={clsx(styles.bgShape, styles.bgShapeViolet, styles.bgLight)}
        src={useBaseUrl('img/shapes/blurred-shape-violet-light.svg')}
        alt=""
        aria-hidden="true"
      />
      <img
        className={clsx(styles.bgShape, styles.bgShapeViolet, styles.bgDark)}
        src={useBaseUrl('img/shapes/blurred-shape-violet.svg')}
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>
              <Translate id="homepage.testimonials.title">
                听听他们怎么说
              </Translate>
            </h2>
            <p className={styles.headerDesc}>
              <Translate id="homepage.testimonials.desc">
                FastGPT 已帮助众多团队把 AI 能力真正落地到知识库、客服与数据分析场景。
              </Translate>
            </p>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={clsx(
                    styles.filterBtn,
                    category === cat.key && styles.filterBtnActive,
                  )}
                  aria-pressed={category === cat.key}
                  onClick={() => setCategory(cat.key)}>
                  <span className={styles.filterIcon}>{cat.icon}</span>
                  <span>
                    <Translate id={cat.id}>{cat.default}</Translate>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid} ref={gridRef}>
            {TESTIMONIALS.map((item) => (
              <TestimonialCard
                key={item.quoteId}
                item={item}
                dimmed={category !== 'all' && item.category !== category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
