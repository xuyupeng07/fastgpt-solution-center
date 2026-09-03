import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageHighlights from '@site/src/components/HomepageHighlights';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import HomepageCta from '@site/src/components/HomepageCta';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const heroBgs = [
    {
      position: styles.heroBgTop,
      light: useBaseUrl('img/page-illustration-light.svg'),
      dark: useBaseUrl('img/page-illustration.svg'),
    },
    {
      position: styles.heroBgGray,
      light: useBaseUrl('img/blurred-shape-gray-light.svg'),
      dark: useBaseUrl('img/blurred-shape-gray.svg'),
    },
    {
      position: styles.heroBgIndigo,
      light: useBaseUrl('img/blurred-shape-light.svg'),
      dark: useBaseUrl('img/blurred-shape.svg'),
    },
  ];

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {heroBgs.map((bg, idx) => (
        <React.Fragment key={idx}>
          <img
            className={clsx(styles.heroBg, bg.position, styles.heroBgLight)}
            src={bg.light}
            alt=""
            aria-hidden="true"
          />
          <img
            className={clsx(styles.heroBg, bg.position, styles.heroBgDark)}
            src={bg.dark}
            alt=""
            aria-hidden="true"
          />
        </React.Fragment>
      ))}
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title">FastGPT 解决方案中心</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.tagline">
            面向企业级 AI 应用的解决方案沉淀
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.hero.cta">
              {'浏览解决方案'}
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const pageTitle = translate({
    id: 'homepage.hero.title',
    message: 'FastGPT 解决方案中心',
  });
  return (
    <Layout title={pageTitle}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageHighlights />
        <HomepageTestimonials />
        <HomepageCta />
      </main>
    </Layout>
  );
}
