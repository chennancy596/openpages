# OpenPages 痛点与优化方案（2026-10-16）

范围：通读 `app.js`、`index.html`、样式表、`service-worker.js`、构建脚本、`src/` React 版与测试。

## 痛点与方案（按优先级）

| 优先级 | 痛点 | 方案 | 状态 |
| --- | --- | --- | --- |
| P0 | 本机存储读不出来时（JSON 损坏或版本不认识），`loadState` 会直接删除整份手帐，下一次保存再覆盖，记录无法找回 | 不再删除；把原始内容另存到 `openpages.state.v1.unreadable-<时间>` 后再以空白手帐启动 | 已改 |
| P0 | 导入 JSON 会无提示地替换本机全部记录 | 本机已有记录时先弹确认，写明两边各有几天记录并建议先导出 | 已改 |
| P0 | 导入的数据只补了部分默认值（缺主题、纸色、封面等），旧备份导入后界面可能出现空值 | 抽出 `normalizeState`，启动和导入共用同一套默认值 | 已改 |
| P1 | 正文 HTML 只在保存时过滤，载入时直接 `innerHTML`；一份被改过的备份可执行脚本 | 载入时同样过滤；过滤器补上 `javascript:` 链接、`link/meta/base/frame` | 已改 |
| P1 | 所有数据（含照片 base64、手写）存在 localStorage，约 5MB 上限；每次按键 180ms 后整份 JSON 重新序列化写入，照片多了会卡且容易写满 | 照片和手写迁到 IndexedDB，文字保留在现有结构；需做数据迁移 | 待确认（大改动） |
| P1 | 项目不在 git 里，靠 `-v2`、`dist 2`、截图文件名做版本，改坏了无法回退 | `git init` 并加 `.gitignore`（忽略 `node_modules`、`dist`、宣传图和 zip） | 待确认 |
| P2 | 根目录约 67MB 的验证截图、小红书宣传图和 zip，加上空的 `dist 2`、`legacy` 目录，代码很难找 | 宣传素材移到 `promo/`，验证截图移到 `docs/verify/` 或删除 | 待确认（会移动文件） |
| P2 | 两套实现并存：静态版 `app.js`（5000 行，实际在用）和 React 版 `src/`（约 800 行，功能少很多），README 又说 React 是主线 | 明确一条主线；若继续静态版，先按功能把 `app.js` 拆成模块 | 待确认（方向问题） |
| P2 | 五个 CSS 共约 1.6 万行，后加载的文件不断覆盖前面的规则，改一个样式要查多处 | 合并重复规则，按组件整理；配合截图回归逐步做 | 后续 |
| P3 | 每次发版要手动改 `service-worker.js` 缓存名和 `index.html` 的 `?v=` | 构建脚本自动注入版本号 | 后续 |
| P3 | 本机没有 Node，`npm test` 和 `npm run web:build` 都跑不了 | 安装 Node 20+（如 `brew install node`） | 需要你操作 |

## 本次改动

- `app.js`：新增 `normalizeState`、`preserveUnreadableState`；`loadState` 不再删除数据；`importData` 加确认并统一默认值；正文载入前过滤；过滤器加强。
- `index.html`：`app.js` 版本参数改为 `20261016-safe-load`。
- `service-worker.js`：缓存名改为 `openpages-v56-safe-load`，确保已安装的 PWA 拿到新脚本。
- `dist/`：同步了上面三个文件（与构建脚本的复制步骤一致，其余文件未变）。

## 验证

在独立端口 4187 的浏览器里检查，没有碰 4175 的正式数据，结束后已清空测试数据：

- 写入损坏的存储后重新载入：页面正常打开，原内容保留在 `unreadable` 备份键。
- 正常输入与保存：写入成功，内容可读回。
- 导入：点取消时原记录不变；点确认后导入成功，缺失的设置补上默认值。
- 正文里放 `<img onerror>`、`javascript:` 链接后载入：事件属性和危险链接被去掉，没有执行。
- 控制台没有新的脚本错误。Service Worker 在这个内置浏览器里无法注册（环境限制），脚本本身语法检查通过。

未验证：`npm test`（本机无 Node）、iOS/Android 真机。
