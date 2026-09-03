/**
 * Swizzled from @docusaurus/theme-classic CodeBlock.
 * 拦截 ` ```echarts ` 代码块，交给 ECharts 组件在客户端懒渲染；
 * 其余语言代码块原样回退给官方 CodeBlock（Prism 高亮 / live codeblock）。
 */
import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import ECharts from '@site/src/components/ECharts';

export default function CodeBlock(props) {
  const {className, children} = props;
  const classes = typeof className === 'string' ? className.split(/\s+/) : [];
  if (classes.includes('language-echarts')) {
    return <ECharts code={children} />;
  }
  return <OriginalCodeBlock {...props} />;
}
