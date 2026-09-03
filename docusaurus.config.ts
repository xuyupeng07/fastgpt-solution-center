import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FastGPT 解决方案中心',
  tagline: '面向企业级 AI 应用的解决方案沉淀',
  favicon: 'img/fastgpt.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://xuyupeng07.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/fastgpt-solution-center/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xuyupeng07', // Usually your GitHub org/user name.
  projectName: 'fastgpt-solution-center', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Mermaid 流程图支持
  markdown: {
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en', 'fr'],
  },

  themes: [
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
  ],

  plugins: [
    // 站内搜索：使用 Pagefind 静态索引替代 Algolia DocSearch（构建期生成索引，无需云端搜索服务）
    'docusaurus-plugin-pagefind',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xuyupeng07/fastgpt-solution-center/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // 博客左侧“最新文章”标题的默认(zh-Hans)文案;
          // en/fr 通过各自 i18n/.../docusaurus-plugin-content-blog/options.json 覆盖.
          blogSidebarTitle: '最新文章',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xuyupeng07/fastgpt-solution-center/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // 可交互代码块（代码块 language 加 live 后缀即可运行，如 `jsx live`）
    liveCodeBlock: {
      // 运行结果预览区显示在代码块下方
      playgroundPosition: 'bottom',
    },
    navbar: {
      title: 'FastGPT 解决方案中心',
      logo: {
        alt: 'FastGPT Logo',
        src: 'img/fastgpt.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '教程',
        },
        {to: '/blog', label: '博客', position: 'left'},
        {
          type: 'custom-github',
          href: 'https://github.com/xuyupeng07/fastgpt-solution-center',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: '文档',
          items: [
            {
              label: '教程',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/xuyupeng07/fastgpt-solution-center',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FastGPT 解决方案中心`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
