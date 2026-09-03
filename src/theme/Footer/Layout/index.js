/**
 * Swizzled from @docusaurus/theme-classic Footer/Layout.
 * 复刻 FastGPT 官网(fastgpt-home)页脚:
 *  品牌区(FastGPT + 企业级AI生产力引擎) + 四列链接 + 二维码 + 分隔线 + 备案/社媒.
 * 支持白天 / 黑夜模式,配色沿用本站主色(蓝)与暗色背景(#030712).
 */
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ThemeClassNames} from '@docusaurus/theme-common';

import styles from './styles.module.css';

const BRAND = 'FastGPT';
const TAGLINE = '企业级AI生产力引擎';
const COPYRIGHT = '广州环际云计算有限公司 版权所有';

const columns = [
  {
    title: '服务',
    items: [
      {label: '云服务', href: 'https://cloud.fastgpt.io'},
      {label: '私有化', href: 'https://fastgpt.io/contact'},
      {label: '社区版', href: 'https://github.com/labring/FastGPT'},
    ],
  },
  {
    title: '链接',
    items: [
      {label: '官网文档', href: 'https://doc.fastgpt.io/docs/introduction'},
      {label: '指南', href: 'https://fastgpt.io/guide'},
      {label: '学习中心', href: 'https://video.fastgpt.cn/videos'},
      {label: '案例中心', href: 'https://fastgpt.io/customers'},
      {label: '常见问题', href: 'https://fastgpt.io/faq'},
      {label: '技术中心', href: 'https://fastgpt.io/tech-center'},
    ],
  },
  {
    title: '生态伙伴',
    items: [
      {label: 'Sealos', href: 'https://sealos.run/'},
      {label: 'AI Proxy', href: 'https://sealos.run/products/aiproxy'},
    ],
  },
  {
    title: '更多信息',
    wide: true,
    items: [
      {label: '邮箱：Dennis@sealos.io'},
      {label: '蓝桥云课 x FastGPT教程', href: 'https://www.lanqiao.cn/courses/6666'},
      {label: 'FastGPT官方教材（纸质书）', href: 'https://item.m.jd.com/product/10204687656446.html'},
    ],
  },
];

const qrs = [
  {label: '官方公众号（微信）', src: 'img/footer-qr/wechat.avif'},
  {label: '官方社群（飞书）', src: 'img/footer-qr/feishu.avif'},
  {label: '官方社群（微信）', src: 'img/footer-qr/group.avif'},
];

const socials = [
  {
    label: '抖音',
    href: 'https://www.douyin.com/user/MS4wLjABAAAAO6DBKtrrM1zFyOZPcvKX06PmbJlLu7GyReqRY2toeRd3-_Q7Ih6s_jAgtEou_la7?previous_page=app_code_link',
    src: 'img/footer-social/douyin.svg',
  },
  {label: '小红书', href: 'https://xhslink.com/m/4b1i3KO5KxC', src: 'img/footer-social/xhs.svg'},
  {label: 'B 站', href: 'https://b23.tv/bfSWLDX', src: 'img/footer-social/bilibili.svg'},
  {
    label: '知乎',
    href: 'https://www.zhihu.com/people/341ddd5c4e4a320bdf06ed50121d66df',
    src: 'img/footer-social/zhihu.svg',
  },
  {label: 'GitHub', href: 'https://github.com/labring/FastGPT', src: 'img/footer-social/github.svg'},
];

const legal = [
  {label: '浙公网安备33011002017871号', href: 'https://beian.mps.gov.cn/'},
  {label: '粤ICP备2023048773号', href: 'https://beian.miit.gov.cn/'},
];

const externalAttrs = {target: '_blank', rel: 'noopener noreferrer nofollow'};

function QrItem({label, src}) {
  const url = useBaseUrl(src);
  return (
    <div className={styles.qrItem}>
      <span className={styles.qrLabel}>{label}</span>
      <img className={styles.qrImg} src={url} alt={label} loading="lazy" draggable={false} />
    </div>
  );
}

function SocialItem({label, href, src}) {
  const url = useBaseUrl(src);
  return (
    <a href={href} {...externalAttrs} aria-label={label} className={styles.socialLink}>
      <img src={url} alt="" width={24} height={24} loading="lazy" draggable={false} />
    </a>
  );
}

export default function FooterLayout({style}) {
  const logoUrl = useBaseUrl('img/fastgpt.svg');
  const year = new Date().getFullYear();

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', styles.footerRoot, {
        'footer--dark': style === 'dark',
      })}>
      <div className={styles.inner}>
        {/* 顶部:品牌区 + (链接列 + 二维码) */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <img src={logoUrl} alt="FastGPT" width={22} height={22} draggable={false} />
              <span>{BRAND}</span>
            </div>
            <p className={styles.tagline}>{TAGLINE}</p>
          </div>

          <div className={styles.right}>
            <div className={styles.columns}>
              {columns.map((col) => (
                <div
                  key={col.title}
                  className={clsx(styles.column, col.wide && styles.columnWide)}>
                  <h2 className={styles.columnTitle}>{col.title}</h2>
                  {col.items.map((item) =>
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        {...(item.href.startsWith('http') ? externalAttrs : {})}
                        className={styles.link}>
                        {item.label}
                      </a>
                    ) : (
                      <span key={item.label} className={styles.linkText}>
                        {item.label}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>

            <div className={styles.qrRow}>
              {qrs.map((q) => (
                <QrItem key={q.label} {...q} />
              ))}
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className={styles.divider} />

        {/* 底部:版权 + 备案(左) / 社媒(右) */}
        <div className={styles.bottom}>
          <div className={styles.legal}>
            <a
              href="https://github.com/labring/FastGPT"
              {...externalAttrs}
              className={styles.legalCopyright}>
              © {year} {COPYRIGHT}
            </a>
            {legal.map((l) => (
              <a key={l.label} href={l.href} {...externalAttrs} className={styles.legalLink}>
                {l.label}
              </a>
            ))}
          </div>

          <div className={styles.socials}>
            {socials.map((s) => (
              <SocialItem key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
