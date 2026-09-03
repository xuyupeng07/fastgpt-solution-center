import {useState, type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import useMasonry from '@site/src/utils/useMasonry';
import styles from './styles.module.css';

type Category = 'all' | 'kb' | 'service' | 'data' | 'workflow';

type LogoKey =
  | 'manufacturing'
  | 'group'
  | 'ecommerce'
  | 'service'
  | 'data'
  | 'content';

type Testimonial = {
  category: Category;
  logoKey: LogoKey;
  quoteId: string;
  quoteDefault: string;
  name: string;
  roleId: string;
  roleDefault: string;
};

/** 占位企业 logo:彩色徽标 + 名称,后续可替换为真实品牌图片 */
const CLIENT_LOGOS: Record<LogoKey, {name: string; color: string; glyph: ReactNode}> =
  {
    manufacturing: {
      name: '华科制造',
      color: '#2563eb',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M1.5 15V6.5l4-2 2.5 1.7 2.5-1.7 4 2V15h-13Z" />
        </svg>
      ),
    },
    group: {
      name: '云启集团',
      color: '#6366f1',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M13 12.5H3.5a2.5 2.5 0 0 1 0-5c.15-1.7 1.55-3 3.3-3 1.15 0 2.15.58 2.75 1.5A2.75 2.75 0 0 1 13 12.5Z" />
        </svg>
      ),
    },
    ecommerce: {
      name: '优选商城',
      color: '#f97316',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M6 6V5a2 2 0 0 1 4 0v1" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3.2 6h9.6l-.9 8.5a1 1 0 0 1-1 .9H4.1a1 1 0 0 1-1-.9L3.2 6Z" fill="currentColor" />
        </svg>
      ),
    },
    service: {
      name: '橙心服务',
      color: '#10b981',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H7.2L3.8 14v-2.5H3a1 1 0 0 1-1-1V4Z" />
        </svg>
      ),
    },
    data: {
      name: '数说科技',
      color: '#8b5cf6',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M3 10h3v4H3V10Z M7 6h3v8H7V6Z M11 2h3v12h-3V2Z" />
        </svg>
      ),
    },
    content: {
      name: '内容工坊',
      color: '#ec4899',
      glyph: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M11.5 3 13 4.5 5.5 12l-2 .5.5-2L11.5 3Z" />
        </svg>
      ),
    },
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
    logoKey: 'manufacturing',
    quoteId: 'homepage.testimonials.q1',
    quoteDefault:
      '我们把几百份产品文档导入 FastGPT，客户咨询的响应从几小时缩短到秒级，检索结果还能溯源到原文。',
    name: '李明',
    roleId: 'homepage.testimonials.r1',
    roleDefault: '制造企业知识管理负责人',
  },
  {
    category: 'kb',
    logoKey: 'group',
    quoteId: 'homepage.testimonials.q2',
    quoteDefault:
      'FastGPT 的混合检索加重排序让答案精准了很多，内部制度问答不再答非所问。',
    name: '王芳',
    roleId: 'homepage.testimonials.r2',
    roleDefault: '集团 IT 主管',
  },
  {
    category: 'service',
    logoKey: 'ecommerce',
    quoteId: 'homepage.testimonials.q3',
    quoteDefault:
      '用 FastGPT 搭的智能客服 7×24 小时在线，常见问题自动解决，人工只处理复杂工单。',
    name: '陈杰',
    roleId: 'homepage.testimonials.r3',
    roleDefault: '电商客服负责人',
  },
  {
    category: 'service',
    logoKey: 'service',
    quoteId: 'homepage.testimonials.q4',
    quoteDefault:
      '工作流里能接入人工转接，复杂问题无缝交给人，客户体验明显提升。',
    name: '刘洋',
    roleId: 'homepage.testimonials.r4',
    roleDefault: '客服运营经理',
  },
  {
    category: 'data',
    logoKey: 'data',
    quoteId: 'homepage.testimonials.q5',
    quoteDefault:
      'FastGPT 接上数据库后，业务同学用自然语言就能查数、出图，数据分析效率大幅提升。',
    name: '赵敏',
    roleId: 'homepage.testimonials.r5',
    roleDefault: '数据分析师',
  },
  {
    category: 'workflow',
    logoKey: 'content',
    quoteId: 'homepage.testimonials.q6',
    quoteDefault:
      '拖拽式工作流把多文档总结、批量翻译串成流水线，省掉了大量重复劳动。',
    name: '孙磊',
    roleId: 'homepage.testimonials.r6',
    roleDefault: '内容团队负责人',
  },
];

function TestimonialCard({item, active}: {item: Testimonial; active: boolean}) {
  const initial = item.name.charAt(0);
  const logo = CLIENT_LOGOS[item.logoKey];
  return (
    <article className={clsx(styles.card, !active && styles.cardDimmed)}>
      <div className={styles.cardInner}>
        <div className={styles.client}>
          <span className={styles.clientMark} style={{backgroundColor: logo.color}}>
            {logo.glyph}
          </span>
          <span className={styles.clientName}>{logo.name}</span>
        </div>
        <p className={styles.quote}>
          <Translate id={item.quoteId}>{item.quoteDefault}</Translate>
        </p>
        <div className={styles.author}>
          <span className={styles.avatar} aria-hidden="true">
            {initial}
          </span>
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
  const masonryContainer = useMasonry();

  return (
    <section className={styles.section}>
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

          <div className={styles.grid} ref={masonryContainer}>
            {TESTIMONIALS.map((item, idx) => (
              <TestimonialCard
                key={idx}
                item={item}
                active={category === 'all' || item.category === category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
