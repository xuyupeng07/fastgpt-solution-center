import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageHighlights from '@site/src/components/HomepageHighlights';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import HomepageVideo from '@site/src/components/HomepageVideo';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const heroBgs = [{
    position: styles.heroBgTop,
    light: useBaseUrl('img/illustrations/page-illustration-light.svg'),
    dark: useBaseUrl('img/illustrations/page-illustration.svg'),
  }];

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
        <div className={styles.heroIntro}>
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
              to="/docs/企业通用/AI 智能报销">
              <Translate id="homepage.hero.cta">
                {'浏览解决方案'}
              </Translate>
            </Link>
            <Link
              className={clsx('button button--lg', styles.consultButton)}
              href="https://fael3z0zfze.feishu.cn/share/base/form/shrcnmi17ze9c8dKMqZv4vmhtwe?prefill_source=solutions&hide_source=1">
              <Translate id="homepage.hero.consult">{'商务咨询'}</Translate>
            </Link>
          </div>
        </div>
        <HomepageVideo />
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
      </main>
    </Layout>
  );
}
