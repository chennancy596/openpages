# Apple Health / Health Connect 集成状态

## 当前实现

iOS/Android 原生工程已经通过 Capacitor 健康桥接接入系统授权。应用只请求读取：

- 步数
- 活动能量
- 步行/跑步距离
- 睡眠时长
- 平均心率

授权后应用查询最近 30 天的日摘要，写入 `state.health.summaries[YYYY-MM-DD]`，并在对应日期的健康附页展示。同步使用 `Promise.allSettled`，用户只授权部分类型时也能正常工作。应用不请求写入权限，不上传健康数据；旧版 Apple 健康 `export.xml` 仅作为历史恢复入口。

## 平台边界

Apple 健康需要 iOS 原生 HealthKit 权限，Android 健康数据需要 Health Connect 权限。普通网页、PWA、Tauri/Steam 桌面应用不能直接访问手机健康数据库，因此这些平台会明确显示“需手机安装版”，不会伪装成已经连接。

## 已落地的原生配置

1. Capacitor 8 iOS/Android 工程已经生成。
2. iOS 已添加 HealthKit entitlement、用途说明和签名配置。
3. Android 最低 SDK 为 26，清单仅保留步数、距离、活动能量、心率和睡眠读取权限。
4. `src/native/health-bridge.js` 负责暴露原生健康桥，Web 构建会生成 `generated/health-bridge.js`。
5. 连接按钮触发系统权限面板；同步按钮读取最近 30 天摘要。
6. iOS 需要开发者团队、证书和真机完成最终授权测试；Android 需要带 Health Connect 的设备或模拟器测试。

## 隐私原则

- 系统逐项授权，可随时在系统设置撤销。
- 默认只读，不提供健康数据写入接口。
- 摘要留在当前设备，不用于广告、出售或模型训练。
- 基础健康连接属于开源免费核心；Plus 只对本地趋势整理等高级工作流收费。

## 参考

- Apple HealthKit authorization: https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data
- Apple HealthKit privacy: https://developer.apple.com/documentation/healthkit/protecting-user-privacy
- Android Health Connect read data: https://developer.android.com/health-and-fitness/health-connect/read-data
- Android Health Connect permissions UI: https://developer.android.com/health-and-fitness/health-connect/ui/permissions
- Capacitor health bridge: https://github.com/Cap-go/capacitor-health
