# OpenPages 0.3.0 beta 安装包分享说明

这份文档用于把当前原型发给第一批内测用户。原则是：先用 PWA 和 GitHub Releases 快速验证真实需求，再做签名桌面包和移动商店。

## 最快内测方式：PWA 分享包

适合发给小红书、社群、朋友试用。

```bash
npm install
npm run web:build
```

构建后的 `dist/` 就是一份可部署的离线 PWA。推荐上传到：

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel 静态站点

用户打开网页后：

- 桌面 Chrome / Edge：地址栏安装图标，或点 App 内「设置 -> 安装到当前设备」
- iPhone Safari：分享按钮 -> 添加到主屏幕
- Android Chrome：菜单 -> 安装应用

注意：直接双击 `index.html` 可以体验大部分功能，但 PWA 安装和 Service Worker 离线缓存需要 `http://localhost` 或 HTTPS。

## 直接发 ZIP 给别人

本仓库会生成两种 beta 包：

- `openpages-0.3.0-beta-pwa.zip`：只包含 `dist/`，适合上传到静态托管平台
- `openpages-0.3.0-beta-source.zip`：包含源码、文档、Tauri 配置和现成 iOS/Android 工程，适合开源协作

如果只是发 ZIP 给非技术用户，建议同时给一个已经部署好的网址；否则对方还需要自己启动本地服务器：

```bash
cd dist
python3 -m http.server 4173
```

然后打开 `http://127.0.0.1:4173/`。

## 桌面安装包

桌面端使用 Tauri：

```bash
npm install
npm run desktop:build
```

常见产物在 `src-tauri/target/release/bundle/` 下，例如 `.dmg`、`.msi`、`.deb`、`.AppImage`。正式对外发布前需要：

- macOS Developer ID 签名和 notarization
- Windows Authenticode 签名，降低 SmartScreen 拦截
- Linux 包名、图标、desktop entry

没有签名的安装包只适合小范围内测，不建议直接作为正式产品宣传。

## 移动端安装包

移动端使用 Capacitor：

```bash
npm install
npm run mobile:sync
```

Android 内测：

- 用 Android Studio 打开工程
- 生成 signed APK / AAB
- 通过 GitHub Releases、网盘或 Google Play 内测轨道分发

iOS 内测：

- 需要 Apple Developer Program
- 用 Xcode 配置证书和 Bundle ID
- 推荐通过 TestFlight 分发

手机健康的直接授权只在原生安装版中出现：iOS 由 HealthKit 系统面板授权，Android 由 Health Connect 系统面板授权。PWA、Steam 和普通桌面包不能绕过手机系统权限读取健康数据。

## 面向客户盈利的分发路线

开源核心继续保留 MIT License，保证用户可以免费记录、导出和自托管。盈利部分建议放在便利服务和高质量内容上：

- Steam / App Store / Google Play 付费版：提供一键安装、自动更新和支持开发
- 官方同步服务：本地优先免费，自托管开放，官方托管收费
- 主题 / 贴纸 / 模板市场：基础包开源，高质量作者包付费
- 教育、心理咨询、工作室私有定制：按项目收费

推荐发布顺序：

1. PWA beta 链接 + GitHub Releases
2. 收集 20-50 个真实用户反馈
3. 签名桌面包，上 Steam / GitHub Releases
4. Android 内测
5. iOS TestFlight
