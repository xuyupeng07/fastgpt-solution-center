import {useState, type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

type Category = 'all' | 'kb' | 'service' | 'data' | 'workflow';

type Testimonial = {
  category: Category;
  quoteId: string;
  quoteDefault: string;
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
    quoteId: 'homepage.testimonials.q1',
    quoteDefault:
      '我们把几百份产品文档导入 FastGPT，客户咨询的响应从几小时缩短到秒级，检索结果还能溯源到原文。',
    name: '李明',
    roleId: 'homepage.testimonials.r1',
    roleDefault: '制造企业知识管理负责人',
  },
  {
    category: 'kb',
    quoteId: 'homepage.testimonials.q2',
    quoteDefault:
      'FastGPT 的混合检索加重排序让答案精准了很多，内部制度问答不再答非所问。',
    name: '王芳',
    roleId: 'homepage.testimonials.r2',
    roleDefault: '集团 IT 主管',
  },
  {
    category: 'service',
    quoteId: 'homepage.testimonials.q3',
    quoteDefault:
      '用 FastGPT 搭的智能客服 7×24 小时在线，常见问题自动解决，人工只处理复杂工单。',
    name: '陈杰',
    roleId: 'homepage.testimonials.r3',
    roleDefault: '电商客服负责人',
  },
  {
    category: 'service',
    quoteId: 'homepage.testimonials.q4',
    quoteDefault:
      '工作流里能接入人工转接，复杂问题无缝交给人，客户体验明显提升。',
    name: '刘洋',
    roleId: 'homepage.testimonials.r4',
    roleDefault: '客服运营经理',
  },
  {
    category: 'data',
    quoteId: 'homepage.testimonials.q5',
    quoteDefault:
      'FastGPT 接上数据库后，业务同学用自然语言就能查数、出图，数据分析效率大幅提升。',
    name: '赵敏',
    roleId: 'homepage.testimonials.r5',
    roleDefault: '数据分析师',
  },
  {
    category: 'workflow',
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
  return (
    <article className={clsx(styles.card, !active && styles.cardDimmed)}>
      <div className={styles.cardInner}>
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

  const visible =
    category === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === category);

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

          <div className={styles.grid}>
            {visible.map((item, idx) => (
              <TestimonialCard key={idx} item={item} active />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
