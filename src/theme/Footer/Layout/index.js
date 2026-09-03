/**
 * Swizzled from @docusaurus/theme-classic Footer/Layout.
 * 在 footer 底部叠加原项目的 footer-illustration.svg(紫色底图)。
 */
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ThemeClassNames} from '@docusaurus/theme-common';

import styles from './styles.module.css';

export default function FooterLayout({style, links, logo, copyright}) {
  const illustrationLight = useBaseUrl('img/footer-illustration-light.svg');
  const illustrationDark = useBaseUrl('img/footer-illustration.svg');
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      <img
        className={clsx(styles.illustration, styles.illustrationLight)}
        src={illustrationLight}
        alt=""
        aria-hidden="true"
      />
      <img
        className={clsx(styles.illustration, styles.illustrationDark)}
        src={illustrationDark}
        alt=""
        aria-hidden="true"
      />
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
