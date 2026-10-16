# 发布到 Steam、应用商店与开源渠道

这份清单用于把 OpenPages 从原型推进到可下载软件。账号注册、费用、税务和审核要求会变化，发布前应以官方文档为准。

## 推荐分发策略

1. 先发布 GitHub Releases：成本最低，适合开源社区测试。
2. 再发布 Steam：适合桌面用户下载、更新和付费支持。
3. Android 同步走 Google Play 与 F-Droid/APK：兼顾普通用户和开源用户。
4. iOS 走 App Store / TestFlight：审核和证书准备时间最长，建议后置。

内测阶段的具体分享步骤见 `INSTALL_AND_SHARE.md`：先发 PWA beta 链接和 GitHub Releases，再决定是否投入签名桌面包、Steam 和移动商店。

## Steam 桌面端

目标产物来自：

```bash
npm run desktop:build
```

发布前准备：

- Steamworks partner 账号
- Steam Direct app fee
- Windows/macOS/Linux 构建包
- Store capsules、截图、宣传图、描述、标签
- 隐私政策与开源许可证说明
- Depot 配置、build 上传、测试分支

建议：

- 把 Steam 版定位成“捐助/支持开发”的付费桌面版。
- GitHub Releases 保留免费开源构建，符合开源定位。
- 暂不接 Steamworks SDK，先用普通桌面软件形式发布。

## macOS / Windows / Linux

Tauri 可以生成常见桌面包。正式发布前需要补充：

- macOS Developer ID 签名与 notarization
- Windows Authenticode 代码签名证书
- Linux `.deb`、`.rpm`、`.AppImage` 包名和 desktop entry
- 自动更新策略

## iOS / Android

目标产物来自 Capacitor：

```bash
npm run web:build
npm run mobile:sync
```

Android：

- Android Studio
- keystore 签名文件
- Play Console 账号
- Data safety、隐私政策、测试轨道

iOS：

- macOS + Xcode
- Apple Developer Program
- Bundle ID、证书、Provisioning Profile
- App Store Connect、TestFlight、隐私标签

## 开源仓库建议

仓库结构可以保持：

```text
openpages/
  index.html
  app.css
  app.js
  assets/
  src-tauri/
  capacitor.config.json
  README.md
  PUBLISHING.md
  LICENSE
```

第一批 issue 可以这样拆：

- `storage`: IndexedDB 数据层
- `sync`: WebDAV / Git 同步
- `templates`: 模板包格式
- `themes`: 主题系统
- `desktop`: Tauri 打包和签名
- `mobile`: Capacitor 原生工程
- `a11y`: 无障碍与键盘操作
- `tests`: Playwright 冒烟测试
