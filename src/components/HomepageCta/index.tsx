import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageCta(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.band}>
          <div className={styles.inner}>
            <h2 className={styles.title}>
              <Translate id="homepage.cta.title">开始构建你的 AI 应用</Translate>
            </h2>
            <div className={styles.buttons}>
              <Link className={styles.primaryBtn} href="https://fastgpt.cn/">
                <Translate id="homepage.cta.primary">开始构建</Translate>
                <span className={styles.arrow} aria-hidden="true">
                  -&gt;
                </span>
              </Link>
              <Link
                className={styles.secondaryBtn}
                href="https://fael3z0zfze.feishu.cn/share/base/form/shrcnmi17ze9c8dKMqZv4vmhtwe?prefill_source=solutions&hide_source=1">
                <Translate id="homepage.cta.secondary">预约演示</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
