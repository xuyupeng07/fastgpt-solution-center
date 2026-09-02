import {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
  docValue?: boolean;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
};

const FeatureList: FeatureItem[] = [
  {
    titleId: 'homepage.feature.easy.title',
    titleDefault: '简单易用',
    descId: 'homepage.feature.easy.desc',
    descDefault:
      'Docusaurus 从设计之初就注重易安装、易上手，让你能快速把网站搭建并运行起来。',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
  },
  {
    titleId: 'homepage.feature.focus.title',
    titleDefault: '聚焦真正重要的事',
    descId: 'homepage.feature.focus.desc',
    descDefault:
      'Docusaurus 让你专注于文档本身，杂事交给我们。把你写好的文档放进 {docs} 目录即可。',
    docValue: true,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  },
  {
    titleId: 'homepage.feature.react.title',
    titleDefault: 'React 驱动',
    descId: 'homepage.feature.react.desc',
    descDefault:
      '通过复用 React 来扩展或定制你的站点布局。Docusaurus 允许在复用同一套页头页脚的前提下进行扩展。',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  },
];

function Feature({titleId, titleDefault, descId, descDefault, docValue, Svg}: FeatureItem) {
  const values = docValue ? {docs: <code>docs</code>} : undefined;
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate id={titleId}>{titleDefault}</Translate>
        </Heading>
        <p>
          <Translate id={descId} values={values}>
            {descDefault}
          </Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
