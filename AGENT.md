# AGENT.md — FastGPT 解决方案中心

> 给 agent 的快速简报：这个仓库是什么、要产出什么内容、有哪些硬约束。动手前先读一遍，再按「写一篇新文章」的流程走。

## 一、这是什么

FastGPT **解决方案中心**官网（Docusaurus，部署到 GitHub Pages）。核心产出是一批**公开通用的解决方案文章**，用来吸引潜在企业客户、推动预约 POC——**不是**对某个具体客户的售前定制方案。

- 站点：https://xuyupeng07.github.io/fastgpt-solution-center/ （标题「FastGPT 解决方案中心」）
- i18n：zh-Hans（默认）/ en；Mermaid 已启用（`markdown.mermaid: true`）

## 二、核心定位：公开通用，不是私人定制

一条必须记住的判据：

|          | 公开通用（本仓库）                       | 私人定制（售前，另一条线）   |
| -------- | ---------------------------------------- | ---------------------------- |
| 给谁看   | 大众，浏览中的潜在采购决策者             | 一个具体客户的高管/IT/采购   |
| 要什么   | 吸引 → 预约 POC                         | 成单（拿下这一个客户）       |
| 核心判据 | **换了客户名仍成立**（通用可迁移） | 换了客户名就失效（定制到位） |
| 数据     | 脱敏行业案例 + 保守估算                  | 尽调客户真实数据             |

> 写之前先判断：**这是给大众看的公开文章，还是给某一个客户的售前方案？** 本仓库的解决方案文章一律走「公开通用」这条线，方法论见 `ToBeReleased/解决方案写作方法论-公开通用.md`（私人定制见 `解决方案写作方法论-私人定制.md`，入口见 `解决方案写作方法论.md`）。

## 三、每篇文章必须体现的硬要求（六项）

这是本仓库解决方案文章的硬要求，缺一不可——前三项是「覆盖」（多渠道/多系统/多场景），后三项是「闭环、算账、配图」（痛点一一解决、ROI、图片占位符）。

### 3.1 多渠道覆盖（用户入口）

同一套 AI 能力，覆盖客户可能在用的所有入口——不罗列「支持多渠道」五个字，要落到「同一套知识库与流程在背后复用」：

- **IM 协同**：企业微信机器人、钉钉机器人、飞书机器人
- **微信生态**：微信公众号、微信个人号（ClawBot）
- **自有端**：小程序、APP、Web 免登录窗口（分享链接 / iframe）、团队门户
- **API 接入**：自研系统、业务后端、第三方前端

### 3.2 多系统覆盖（业务系统对接）

不只讲 AI 本身，要讲清它如何对接客户已有的业务系统（经 API / 插件）：

- **泛微 OA / 审批流 / 财务 / ERP / CRM / 工单** 等，用于报销、审批、合同、订单、数据查询等场景。
- 写法示例：「员工在飞书群里 @机器人 问差旅标准，客户在公众号问订单进度，报销单据经泛微 OA 发起，用的都是同一套知识库与校验流程。」

### 3.3 多场景覆盖（长尾与边界）

不能只写主流程 happy path，要主动点出复杂/长尾场景，证明「经得起生产追问」。用**枚举四问**：

1. **金额/数量异常**：多币种、跨部门分摊、红冲退款、超额、批量提交？
2. **数据/凭证异常**：缺字段、识别不确定、口径冲突、重复提交？
3. **权限/合规异常**：敏感数据、越权、审计留痕、合规否决？
4. **流程/系统异常**：接口超时、回调失败、并发峰值、人工介入点？

每项给「AI 怎么做 + 人工怎么兜底」，落进人机分工表（AI 全自动 / AI 生成+人工确认 / 人工主导）。**能主动写出「哪些地方仍需人工」，是文章成熟度的标志。**

### 3.4 痛点一一对应解决（因果闭环）

痛点不能只「罗列」要「消灭」：每一行痛点都必须在方案模块里找到对应「解药」，每个方案模块都要反向指回一个痛点。用「痛点 → 方案模块 → 落地结果」三列闭环，结果落到可观察的变化（耗时/转接率/覆盖率/工时）。杜绝「孤岛模块」（很强但没治任何病）和「悬空痛点」（很痛但方案没接住）。详见方法论 `4.9`。

### 3.5 ROI 与回本呈现（让「值不值」算得出来）

「三、落地价值与收益」不能只给指标，还要给一笔算得清的账：**回本周期 = 一次性投入 ÷ 月净收益**。投入写全（授权/服务器/实施/冷启动/培训）、收益写保守，用百分比与区间表达（「人力成本下降 35%-55%」「预计 6-9 个月回本」），不写绝对金额、不给绝对值。回本区间同时进概览首屏的核心结果数字。详见方法论 `4.10`。

### 3.6 图片占位符（交代「放什么图 + 怎么截图/制图」）

需要配图处放 `【插图占位：<名称>｜类型｜内容｜获取方式】` 占位符，截图类写清「FastGPT 哪个页面 → 哪个菜单 → 截哪个区域」，制图类写清「画什么结构、用什么工具」，并标注图注与脱敏。交付前全部替换为真实图或删除。详见方法论 `五、插图与图片占位符规范`。

## 四、文章结构（决策链是「逻辑」，不是「模板」）

公开文章必须走完决策链——**为什么做 → 做什么 → 值不值 → 怎么做 → 现在干嘛**——**骨架固定、血肉可变**：五章 + 三级编号（`一、`/`1.1`/`1.1.1`）+ 章标题各篇统一（场景洞察与痛点 / 解决方案设计 / 落地价值与收益 / 落地路径与运营 / 选型价值与下一步）；开场、图型、痛点、数字按选题定制，各篇血肉长成不同样子（详见方法论第三章）。

```text
决策链逻辑（每篇都要有，顺序可灵活）
  为什么做（痛点）→ 做什么（方案）→ 值不值（价值）→ 怎么做（落地）→ 现在干嘛（行动）
```

**动笔前先写「选题卡」**（定制化的开始，别直接套骨架）：

```text
1. 一句话定位：解决「谁」的「什么挣扎」？
2. 一个故事主角：谁、在什么时刻、最痛？
3. 三个想让人记住的数字：哪三个最反常识？
4. 一个开场钩子：场景冲突 / 反常识数字 / 真实对话 / 不做的代价？
5. 一张「必放图」：最值得用一张图讲清的「一个点」是什么？
```

- **frontmatter**：`sidebar_position` 排序 + `name`（≤10 字）+ `description`（干什么 + 量化结果，≤120 字，优先百分比）。
- **结构**：骨架固定——五章（场景洞察与痛点 / 解决方案设计 / 落地价值与收益 / 落地路径与运营 / 选型价值与下一步）+ 每章固定子节 + 三级编号；血肉可变——开场钩子、图型、痛点、数字按选题定制。每个小节走「洞察段 → 表/图/例 → 承上启下」三步，字数不要省。
- **图表**：Mermaid ≥1（业务流程，不暴露工作流内部实现）；数据图用 ECharts 代码块（```echarts```）渲染。**图型跟着数据的故事走**（分类对比→柱状、趋势→折线、占比→环形、多维→雷达、转化→漏斗、流转→桑基、桥接→瀑布、强度→热力、排名→横向条形…），**同一篇图型不重复、各篇图型不重样**；禁止「落地前=0」伪基线、禁止伪造「回本周期」曲线。配色用语义色 token（`primary`/`neutral`/`danger` 等，不写死 hex），详见方法论五。
- **配图**：需要配图处放 `【插图占位】`，交代「放什么图 + 怎么截图/制图」（见方法论五）；配图生成可调用项目 skill `solution-illustration`。
- 章节详情见 `ToBeReleased/解决方案写作方法论-公开通用.md`；排版与校验细节以 `fastgpt-expert` skill 的 `articles.md` 为准。

## 五、硬规则（对内/对外边界）

1. **脱敏**：不出现真实公司名、人名、病历号、订单号、收入、客诉量；用「某三甲医院 / 某连锁零售企业 / 某制造集团」等脱敏标签。
2. **数据保守**：优先百分比与区间（「下降 35%-55%」），不写绝对金额；不出现「待替换 / 示例数据 / 用户未提供」等占位痕迹。
3. **不暴露内部实现**：不写工作流节点名、Prompt、API 路径、堆栈、内部 ID。
4. **竞品通用指代**：「商业 SaaS / 自研方案 / 通用 AI 助手」，不点名、不攻击、不「全面碾压」。
5. **不承诺不可控结果**：未经验证的准确率/效果写保守估算或「待 POC 验证」。
6. **POC 只做预约入口**：全文重点是落地价值，结尾短 CTA 引导「预约免费 POC」，不展开 POC 流程。
7. **FastGPT 价值**：每篇至少自然提及 5 项卖点，按「能力 → 证据 → 收益」表达，讲成「企业 AI 应用底座」而非聊天机器人。
8. **图片占位符可执行**：需要配图处放占位符并交代「放什么图 + 怎么截图/制图」，交付前全部替换为真实图或删除。
9. **图型跟着故事走**：图表选型由数据要讲的故事决定，禁止清一色「前后对比柱状图 + 回本曲线」。
10. **禁止伪基线与伪造曲线**：「落地前 = 0」这类假数据、伪造的「累计净现金流」回本曲线一律不用。
11. **骨架固定、血肉可变**：五章 + 三级编号（一、/1.1/1.1.1）+ 章标题各篇统一；开场、图型、痛点、数字按选题定制，各篇血肉长成不同样子（动笔前先写「选题卡」）。

## 六、目录结构

```text
docs/           已发布的解决方案文章（.mdx，frontmatter 带 sidebar_position）
ToBeReleased/   待发布文章（AI合同报销助手 / AI智能报销助手 / AI销售开单助手 等 .mdx）
                + 方法论（解决方案写作方法论[入口/私人定制/公开通用].md）
.claude/skills/ 项目技能（solution-illustration 配图生成等）
blog/ src/ static/ i18n/   站点其他内容与多语言
docusaurus.config.ts       站点配置（标题/i18n/Mermaid/部署）
```

## 七、写一篇新解决方案文章怎么走

1. **读方法论**：`ToBeReleased/解决方案写作方法论-公开通用.md`（先判断是不是公开通用，再按「5 章决策链」+ 六项硬要求写）。
2. **先写「选题卡」**：一句话定位 + 故事主角 + 三个反常识数字 + 开场钩子 + 必放图，再定结构与图型（别直接套骨架）。
3. **写初稿**：`.mdx`，含 frontmatter + 决策链五件事 + 六项硬要求（渠道/系统/场景覆盖 + 痛点一一对应 + ROI + 图片占位符），图表按「数据的故事」选型、六篇六种图。
4. **放到 `ToBeReleased/`**（待发布），经确认后进 `docs/`。
5. **校验与审查**：用 `fastgpt-expert` skill（`validate-article.py` + 专家评分/优化/最终审查）——未通过 `APPROVED` 审查不发布。
6. **默认草稿**：新案例默认不发布；只有用户明确说「直接发布 / 上架 / 立即发布」才发布。

> 原则记忆：**公开文章先让读者「对号入座」，再让他「想验证」；多渠道、多系统、多场景覆盖，痛点一一对应解决，ROI 算得清、回本看得到，配图占位可执行；数据保守可信，能力可感知，行动可预约；图型跟着故事走，六篇文章长成六个样子。**

---

# 附录：Docusaurus 站点知识

> 本仓库是 **Docusaurus 3.10.2**（preset-classic + React 19 + MDX 3）静态站，已开启 `future: { v4: true }`。下面是与本项目相关的基础与进阶知识，细节以官网 [docusaurus.io/docs](https://docusaurus.io/docs) 为准。

## 八、Docusaurus 基础

### 8.1 它是什么

Docusaurus 是 React 驱动的**静态站点生成器（SSG）**：你写 Markdown/MDX，它编译成 React 单页应用 + 每页静态 HTML（SEO 友好），内置文档版本管理、国际化（i18n）、博客、站内搜索等能力。

### 8.2 目录结构（本项目）

| 路径 | 作用 |
|------|------|
| `docusaurus.config.ts` | 站点唯一配置（标题/URL/i18n/导航/页脚/插件/主题） |
| `sidebars.ts` | 侧边栏定义（本项目用 `autogenerated` 自动生成） |
| `docs/` | 文档，`.md`/`.mdx`，按文件名自动成为路由 |
| `blog/` | 博客，文件名带日期前缀 |
| `src/pages/` | 独立页面（`index.tsx` 首页等），路由 = 文件路径 |
| `src/components/` | 自定义 React 组件 |
| `src/css/custom.css` | 全局样式覆盖（Infima CSS 变量） |
| `src/theme/` | swizzle（改写）过的主题组件 |
| `static/` | 静态资源，原样拷到站点根 URL（`/img/foo.png`） |
| `i18n/` | 多语言翻译（en） |
| `build/` | 构建产物（`npm run build` 生成，勿手改） |

### 8.3 常用命令

```bash
npm run start        # 本地开发，热更新（localhost:3000）
npm run build        # 构建到 build/
npm run serve        # 本地预览构建产物（先 build）
npm run clear        # 清缓存（.docusaurus 等，遇到缓存问题先跑它）
npm run deploy       # 部署（本项目走 GitHub Actions，一般不用手动）
npm run swizzle      # 抽取/改写主题组件
npm run write-translations  # 生成/刷新翻译模板到 i18n/
npm run typecheck    # tsc 类型检查
```

### 8.4 添加一篇文档（doc）

1. 在 `docs/` 下新建 `.md` 或 `.mdx`（本仓库统一用 `.mdx`）。
2. 写 frontmatter（均可选）：

   ```yaml
   ---
   id: my-doc            # 覆盖文档 ID（默认取文件路径）
   title: 标题           # 页面标题（默认取首个 H1）
   sidebar_position: 4   # 侧边栏排序（数字越小越靠前）
   sidebar_label: 短标题 # 侧边栏显示名
   description: ...      # SEO/meta 描述
   slug: /docs/custom    # 覆盖 URL
   tags: [标签]          # 文档标签
   ---
   ```

3. **路由约定**：默认 URL 从文件路径派生、去掉扩展名；`index` / `README` / 与父目录同名 三种文件名**不加 URL 段**（如 `docs/Guides/index.md` → `/docs/Guides`）。
4. **侧边栏**：`sidebars.ts` 用 `{type: 'autogenerated', dirName: '.'}` 按 `docs/` 目录结构自动生成，默认按**文件/目录名字母序**排序，用 frontmatter 的 `sidebar_position` 或分类目录里的 `_category_.json` 调整顺序。

### 8.5 分类目录 `_category_.json`

在某个子目录放 `_category_.json` 为该分类提供元数据：

```json
{
  "label": "教程 - 基础",
  "position": 2,
  "collapsible": true,
  "collapsed": false,
  "link": { "type": "generated-index", "description": "分类首页说明" }
}
```

字段：`label`（显示名）、`position`（排序，支持小数）、`collapsible`/`collapsed`（可否折叠/默认折叠）、`link`（分类首页，`generated-index` 或指定 doc）、`className`/`key`/`customProps`。

### 8.6 添加一篇博客（blog）

1. 在 `blog/` 下新建，**文件名用日期前缀**：`2026-09-04-welcome.md` 或 `2026-09-04-welcome/index.mdx`（日期自动从文件名提取）。
2. frontmatter：

   ```yaml
   ---
   title: 欢迎来到 FastGPT 解决方案中心
   description: 摘要
   slug: welcome        # 自定义 URL（可选）
   date: 2026-09-04     # 同一天多篇时用于精确定序（可选）
   authors: [xuyupeng]  # 引用 blog/authors.yml 的 key
   tags: [announcement] # 引用 blog/tags.yml 的 key
   ---
   ```

3. **摘要截断**：博客列表页只显示截断标记之前的内容——`.md` 用 `<!-- truncate -->`，`.mdx` 用 `{/* truncate */}`。
4. `blog/authors.yml` 定义作者（key → name/title/image_url/socials），`blog/tags.yml` 预定义标签（label/permalink/description）。
5. 想给文章配图，用**文件夹形式** `blog/2026-09-04-welcome/index.mdx`，把图片放同目录相对引用。
6. 站点已开启 `showReadingTime`（阅读时长）与 RSS/Atom（`feedOptions`）。

### 8.7 独立页面（pages）

`src/pages/` 下 `.js`/`.tsx`/`.mdx` 直接按路径映射为路由（`src/pages/index.tsx` → 首页）。页面里可 import `src/components/` 下的组件、`@docusaurus/Link`（内部链接，自动加 baseUrl）、`@docusaurus/Translate`（多语言文案）。

### 8.8 Markdown / MDX 特性

- **Admonitions**：`:::note` / `:::tip` / `:::info` / `:::warning` / `:::danger`，可带标题 `:::note 提示`。
- **代码块**：``` 围栏即高亮代码块，`title` 加标题、`showLineNumbers` 显示行号、`highlight` 高亮行。
- **Tabs**：`import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';` 后 `<Tabs><TabItem value="a" label="A">…</TabItem></Tabs>`。
- **标题锚点**：标题自动生成 id，可被 `[链接](#标题)` 引用。
- **MDX 内嵌 JSX**：Docusaurus v3 下 `.md`/`.mdx` 默认都按 MDX 编译，可直接 import 并使用 React 组件。
- **折叠**：`<details><summary>…</summary>…</details>`，内部支持 Markdown。
- **Mermaid**：本项目已 `markdown.mermaid: true`，直接写 ` ```mermaid ` 围栏渲染流程图。
- **Live CodeBlock**：本项目装了 `@docusaurus/theme-live-codeblock`，代码块 language 加 `live` 后缀（如 ` ```jsx live `）可交互运行。

### 8.9 静态资源

- `static/` 下文件原样拷到站点根，用**绝对路径**引用：`/img/fastgpt.svg`。
- 文档/博客内配图用**相对路径**引用同目录文件（如 `./banner.png`）。

### 8.10 站点配置要点（docusaurus.config.ts）

- `url` / `baseUrl` / `organizationName` / `projectName`：GitHub Pages 部署，勿乱改。
- `onBrokenLinks: 'throw'`：任何失效内部链接都会让 `npm run build` 报错（改链接时必须保证目标存在）。
- `i18n`：`defaultLocale: 'zh-Hans'` + `locales: ['zh-Hans','en']`。
- `themeConfig`：`navbar`（导航）、`footer`（页脚）、`colorMode`、`prism`（代码高亮主题）。
- `presets` / `themes` / `plugins`：classic 预设自带 docs/blog/theme；本项目额外挂了 mermaid、live-codeblock、pagefind。

## 九、Docusaurus 进阶

### 9.1 国际化 i18n

- 三类内容：**站点内容**（docs/blog 文本）、**插件元数据**（`options.json`）、**UI 字符串**（`code.json` / `navbar.json` / `footer.json`）。
- 翻译文件结构：`i18n/<locale>/docusaurus-plugin-content-docs/current/<与 docs/ 同路径>`，blog 同理。
- 某文件没有对应翻译时**回退到默认 locale**（不会报错）。
- 改默认文案后跑 `npm run write-translations` 刷新翻译键；`navbar.json`/`footer.json` 里是 **label 的翻译**，`to`/`href` 链接目标始终在 `docusaurus.config.ts` 里改。

### 9.2 swizzle 与主题定制

- `npm run swizzle @docusaurus/theme-classic <组件名>` 把主题组件拷到 `src/theme/` 再改。
- 本项目已 swizzle：`src/theme/CodeBlock`、`src/theme/DocItem/Content`、`src/theme/Footer/Layout`、`src/theme/NavbarItem/*`（自定义 GitHub 图标导航项）。
- 改动主题组件后跑 `npm run build` 验证，别破坏默认行为。

### 9.3 插件 / 主题

- 主题在 `themes` 数组、插件在 `plugins` 数组，都是 npm 包或本地模块。
- 本项目额外：`@docusaurus/theme-mermaid`（流程图）、`@docusaurus/theme-live-codeblock`（可运行代码）、`docusaurus-plugin-pagefind`（站内搜索，构建期生成静态索引，无需云服务）。

### 9.4 部署（GitHub Pages）

- 已配 `.github/workflows`（push 到 main 自动 build + 部署 gh-pages）。
- 站点地址：`https://xuyupeng07.github.io/fastgpt-solution-center/`，故 `baseUrl` 必须带 `/fastgpt-solution-center/`。
- 本地验证：`npm run build && npm run serve`。

### 9.5 文档版本管理（备用）

本仓库**当前未启用**多版本，但 Docusaurus 原生支持：`npm run docusaurus docs:version 1.0` 会把当前 `docs/` 快照到 `versioned_docs/version-1.0` 并生成版本下拉，需要时再启用。

### 9.6 调试技巧

- 构建报 `Broken link` / `Anchor links`：搜失效 `to`/`href`（如已删除的 `/docs/intro`）改掉。
- 缓存异常：`npm run clear` 后再 `npm run start`。
- MDX 语法错误：构建日志会指到具体文件与行号。

## 十、本项目 Docusaurus 特有约定（速查）

- **文档正文**：`.mdx`，frontmatter 带 `sidebar_position` + `name`（≤10 字）+ `description`（≤120 字，优先百分比）。
- **图表**：Mermaid 画业务流程；数据对比/趋势/ROI 用 ` ```echarts ` 代码块（`src/components/ECharts`），配色用语义色 token。
- **配图占位**：`【插图占位：…】`，交代「放什么图 + 怎么截图/制图」。
- **文档入口**：`docs/intro.mdx`（欢迎/介绍，`sidebar_position: 1`）是文档落地页；具体解决方案按场景放分类目录（如 `docs/企业通用/`，对应侧边栏「企业通用」分类，路由 `/docs/企业通用/…`）。页脚「解决方案」指向 intro，首页/CTA 指向具体方案（新增文档后记得同步这些入口）。
- **博客作者**：`blog/authors.yml` 的 `xuyupeng`；**博客标签**：`blog/tags.yml`；**文档标签**：`docs/tags.yml`。frontmatter 里的 `tags: [key]` 引用的是 YAML 里的 **key**（不是 label），未登记会变成 inline 标签并触发 `onInlineTags: 'warn'`。
