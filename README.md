# 开页 OpenPages

开页是一个开源、本地优先、跨端电子手帐原型。核心功能用标准 Web 技术实现，可以作为 PWA 直接运行，也可以用 Tauri 打包桌面端、用 Capacitor 打包 iOS/Android。

## 当前功能

- 自由双页、速记索引、周横备忘、月间索引、图文拼贴、摘录双栏、同日五年七种内页结构；切换版式不离开当天页面
- 月 → 周 → 日形成连续日期层级：月页按月初归档、周页按周一归档，系统始终记住正在关注的日期；月历可下钻日页，周页日期可下钻日页，前后翻页会按当前层级移动
- 旅行记录、身心记录作为可选用途起稿加入正文，不再伪装成另一套功能或改变当前内页
- 同一天可连续新增多组跨页，每组独立保存文字、手写、贴纸、纸面与版式；页码连续递增并支持真实翻页回看
- 月间索引支持记录点和日期跳转；阅读页含进度、评分、摘句与回声；旅行页含路线、预算和轻装清单；同日五年可回看历年同一天
- 日页按需附页：今日计划、临时收集、状态与健康，默认不打扰书写
- 自定义模板保存
- 点阵、横线、方格、空白纸张
- 电脑端富文本排版编辑：加粗、列表、引用、标注、分隔线、双栏
- 电脑/平板/移动端手写画布：钢笔、圆珠笔、针管笔、铅笔、马克笔、毛笔六种笔迹，大画布专注模式、可折叠笔刷设置、稳定器、压力笔迹、撤销/重做、自定义色板、笔宽、橡皮和仅手写笔模式
- 本册封皮、内页纸色、单页强调色、纸张纹理和插画印花可分别自定义
- 可拖拽贴纸、可点击移动端添加贴纸
- 灵感便签、页签、搜索与回看
- 照片/票根上传到当天拼贴页
- iOS/Android 安装版可经系统授权只读连接 Apple 健康 / Health Connect；旧 Apple 健康 `export.xml` 仍可用于恢复历史数据
- OpenPages Plus beta：七日健康回顾、页面版本快照和专业笔刷库；本地书写、健康授权、导出和自托管不锁付费墙
- 写过的日子统计和隐私帘
- 顶部月/周/日层级切换、日期定位和月历记录点
- 浏览器本地保存：文字存 localStorage，照片和手写存 IndexedDB，不再受约 5MB 上限限制
- 最近删除：删除的内页保留 30 天，可恢复到原日期
- 往年今日：日页自动列出往年同一天写过的内容
- 备份提醒：写满一周且 30 天未导出时轻提示一次，保存详情显示上次导出日期
- JSON、Markdown 导出，支持打印或保存为 PDF；导入图片会自动压缩后本地保存
- PWA 离线缓存
- React/Vite 开发骨架：IndexedDB、素材抽屉、月历、日记页、回顾页、备份页已经拆成可维护模块
- MIT License，适合公开仓库和社区贡献

## 设计方向

OpenPages 参考了日系手帐、Hobonichi 一日一页、手帐博主常见的胶带/便签/票根拼贴，以及 Zinnia、Goodnotes、Day One 这类数字手帐/日记产品的功能结构。当前版本重点解决：

- 空白页压力：用可视化内页样式、可选起稿和灵感便签帮用户快速开始，但不要求填满页面。
- 坚持困难：不做连续记录压力，用低负担模板和轻量照顾降低回来的门槛。
- 数据归属焦虑：本地优先，支持 JSON 导入导出。
- 找不到旧内容：支持页签和搜索回看。
- 数字手帐缺少纸本感：加入封面露边、书脊、纸纤维、书签、基于纸张折叠计算的翻页动效、胶带和贴纸层。

内页结构的边界、竞品能力与手帐博主工作流见 `PRODUCT_BENCHMARK.md`。

## Apple Health / Health Connect

Capacitor 安装版已接入只读健康桥接：iPhone/iPad 使用 HealthKit，Android 使用 Health Connect。用户点击“连接手机健康”后由系统逐项请求步数、活动能量、步行距离、睡眠和心率读取权限；授权后同步最近 30 天的日摘要并只保存在当前设备。Web/PWA/Tauri/Steam 版受平台权限限制，不能直接读取手机健康数据库，界面会明确提示改用手机安装版。`export.xml` 仅保留为旧数据恢复入口。

原生配置、权限范围和隐私边界见 `HEALTHKIT_PLAN.md` 与 `privacypolicy.html`。

## 本地预览

直接打开 `index.html` 可以使用大部分功能。推荐用本地服务器预览 PWA：

```bash
npm install
npm run web:dev
```

然后打开 Vite 输出的本地地址。

## React 开发版

当前仓库同时保留一个 React/Vite 续接版本，入口是 `index.react.html`。它更适合开源协作和后续接 Capacitor/Tauri 原生能力：

```bash
npm install
npm run react:dev
```

主要文件：

- `src/App.jsx`：活页侧栏、视图切换、日期选择和 IndexedDB 读写。
- `src/views/DiaryPage.jsx`：一日一页、子弹笔记、周计划、记忆拼贴、情绪追踪五种模式。
- `src/components/MaterialDrawer.jsx`：印章、和纸胶带、贴纸素材抽屉。
- `src/store/db.js`：IndexedDB 本地优先存储、JSON 导入导出。
- `src/data/*.js`：纯数据素材包，适合社区用 PR 扩展。

## 构建 Web / PWA

```bash
npm run web:build
```

构建产物会复制到 `dist/`，可以部署到 GitHub Pages、Cloudflare Pages、Netlify，或作为移动/桌面打包输入。

React 开发版单独构建：

```bash
npm run react:build
```

产物会输出到 `dist-react/`。当前 0.3.0 beta 推荐先发布静态 PWA 与 TestFlight/Android 内测版，React 版本作为后续重构主线。

## 内测安装与分享

当前 0.3.0 beta 可先分享 PWA 版本：把 `dist/` 上传到 GitHub Pages、Cloudflare Pages、Netlify 或 Vercel，用户打开网页后即可安装到桌面或手机主屏幕。详细步骤见 `INSTALL_AND_SHARE.md`。

如果要发安装包，建议先在 GitHub Releases 上传：

- `openpages-0.3.0-beta-pwa.zip`：PWA 静态分享包
- `openpages-0.3.0-beta-source.zip`：开源源码包，包含 iOS/Android 原生工程

桌面 `.dmg` / `.msi` / `.AppImage` 和移动 APK / TestFlight 版本可以继续用 Tauri / Capacitor 生成，但正式对外发布前需要签名、隐私政策和商店素材。

## 打包桌面端

桌面端使用 Tauri。构建前需要安装 Rust、Node.js 和平台对应的系统依赖。

```bash
npm install
npm run desktop:build
```

常见发行目标：

- Steam：上传 Tauri 生成的 Windows/macOS/Linux 可执行包到 Steamworks depots/builds。
- GitHub Releases：发布 `.dmg`、`.msi`、`.deb`、`.AppImage` 等安装包。
- Microsoft Store / Mac App Store：按商店要求做签名、沙盒和审核资料。

## 打包移动端

移动端使用 Capacitor 8，仓库已包含 `ios/` 与 `android/` 原生工程。安装依赖并同步 Web 代码：

```bash
npm install
npm run mobile:sync
```

打开原生工程：

```bash
npm run android:open
npm run ios:open
```

Android 需要 Android Studio 和签名密钥；iOS 需要 macOS、Xcode、Apple Developer Program 账号和证书。

## 商店发布清单

- Steam：创建 Steamworks partner 账号，支付每个 app 的 Steam Direct fee，准备 store assets、描述、隐私政策、构建包和 depot 配置。
- App Store：加入 Apple Developer Program，配置 Bundle ID、证书、App Store Connect、TestFlight、隐私标签和审核资料。
- Google Play：创建 Play Console 开发者账号，准备包名、签名密钥、隐私政策、Data safety、商店素材和测试轨道。
- F-Droid / GitHub Releases：适合开源用户，不强制商业商店账号。

## 推荐路线图

1. 把静态 PWA 原型中已经跑通的手写、原生健康连接、隐私帘和回顾能力迁移到 React 模块。
2. 增加 WebDAV / Git / Syncthing 友好的文件同步。
3. 将本册封皮、纸色和单页配色整理为可导入导出的 `openpages-theme.json`。
4. 为官方托管同步与 Plus 内容包接入可替换的订阅/权益层，保持核心记录与导出免费。
5. 增加原生设备测试、无障碍、键盘快捷键和端到端测试。
6. 发布 0.3.0 beta 到 GitHub Releases/TestFlight/Play 内测，再准备 Steam 和移动商店资料。

## 开源与商业化边界

OpenPages 的核心代码继续保持 MIT License，确保用户和贡献者可以自由学习、修改、分发和自托管。商业化优先放在不破坏开源核心的部分：

- Steam / App Store / Google Play 付费版：作为打包、自动更新和支持开发的便捷分发渠道。
- 付费同步托管：核心本地数据结构开放，官方可以提供省心的托管同步服务。
- 模板与主题市场：基础模板包开源，设计师可以出售高质量主题、贴纸和手帐内页。
- 企业/教育定制：为学校、工作室、心理咨询等场景做私有部署和定制开发。

原则是免费开源版本必须能完成基础记录闭环，付费版本提供便利、服务和高质量内容，而不是把基础记录能力锁起来。

## 许可证

OpenPages 自有代码使用 MIT License。翻页使用 MIT License 的 `page-flip`；原生健康桥接依赖 `@capgo/capacitor-health`，该依赖使用 MPL-2.0。分发和修改第三方依赖时需同时遵守其许可证；这些许可证允许商业分发，核心开源与付费安装包可以并存。
