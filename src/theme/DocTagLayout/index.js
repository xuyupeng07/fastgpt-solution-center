/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
  DocsSidebarProvider,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';

/**
 * 让文档标签页（标签列表页 / 单标签详情页）复用普通文档页的布局，
 * 左侧像普通文档一样保留文档侧边栏，而不是默认的居中无侧边栏布局。
 */
export default function DocTagLayout({children}) {
  const version = useDocsVersion();
  // 站点只配置了一个侧边栏（tutorialSidebar），取第一个即可。
  // 若未来有多侧边栏，可在此按需选择对应侧边栏。
  const [sidebarName, sidebarItems] =
    Object.entries(version.docsSidebars)[0] ?? [];
  return (
    <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
      <DocRootLayout>{children}</DocRootLayout>
    </DocsSidebarProvider>
  );
}
