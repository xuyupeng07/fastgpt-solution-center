import type {CSSProperties, ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const lightBg = useBaseUrl('img/hero-light.jpg');
  const darkBg = useBaseUrl('img/hero-dark.jpg');
  const style = {
    '--hero-bg-light': `url('${lightBg}')`,
    '--hero-bg-dark': `url('${darkBg}')`,
  } as CSSProperties;

  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={style}>
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
              {'Docusaurus 教程 - 5 分钟 ⏱️'}
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
      </main>
    </Layout>
  );
}
