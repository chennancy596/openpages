# OpenPages 产品模式基准

这份文档用于约束后续开源贡献，避免内页再次变成同一页面换标题，也避免把市场上所有功能堆进一天。

## 总原则

- 主路径始终是记录，不以连续打卡、完成率或 AI 功能制造压力。
- 每个模式只常驻完成该模式所需的工具，其余能力进入抽屉或按需附页。
- 用户数据默认保存在本地；搜索、JSON/Markdown 导出和打印不得作为付费门槛。
- 可商业化的是高级素材、托管同步、团队协作和增值服务，不锁住用户自己的内容。
- 参考成熟产品的交互范式，不复制品牌商标、专有素材、模板插画或界面资产。

## 日期层级

| 层级 | 核心任务 | 页面职责 | 联动规则 | 参考范式 |
|---|---|---|---|---|
| 月 | 看方向与重要日期 | 月历、本月主线、无日期备忘、内容墨点 | 点日期进入日页；进入周页时保留当前关注日期 | MD Diary 月间 Block；Jibun Techo 月间索引 |
| 周 | 安排节奏但不过度填满 | 七日连续行、周主题、自由备忘 | 只有日期标题负责跳转，书写格不会误触；前后翻动按周移动 | Traveler's weekly + memo；Hobonichi Cousin vertical weekly |
| 日 | 自由记录与延展 | 文字、手写、贴纸、同日多组跨页 | 写满后续一页并单独选择版式；返回月/周仍保留日期上下文 | Hobonichi 一日一页；Midori hibino 双页一日 |

日期层级采用按需创建，不预生成整年巨型文件；这回应了数字手帐用户常见的文件过重、模板过多和导航误触问题。空白日不计算完成率，也不会制造补页压力。

## 五种模式

| 模式 | 用户任务 | 常驻功能 | 按需功能 | 对标重点 |
|---|---|---|---|---|
| 一日一页 | 自由写下一天 | 富文本、手写、心情、页签、提示句 | 今日计划、灵感、状态与健康 | Day One 的低门槛记录；Goodnotes 的混合输入；Hobonichi 的大留白 |
| 子弹笔记 | 快速收集并整理 | Key、任务/事件/笔记/迁移、状态切换、整理到正文 | 搜索与跨日迁移 | Bullet Journal 的 Rapid Logging 和 Migration |
| 周计划 | 安排一周并复盘 | 本周主线、七日输入、周提示、周切换 | 页签、正文排版 | Hobonichi Weeks 的周视图；手帐博主常用 Top priorities 和 weekly review |
| 记忆拼贴 | 保存一个场景 | 场景主题、照片/票根、旁白、贴纸层 | 纸张和单页配色 | Zinnia/Penly 的素材操作；手帐拼贴的主视觉和层次顺序 |
| 情绪追踪 | 看见情绪和身体状态 | 心情、触发点、身体感受、能量/压力/睡眠 | 健康数据摘要 | Apple Journal 的隐私与健康语境；Day One 的叙事回顾 |

## 博主工作流提炼

1. 先决定本页主题或本周主线，再选择一组克制的颜色。
2. 拼贴页先放主视觉，再放票根或胶带建立层次，最后补文字旁白。
3. 周计划以重点、七日安排和周末回看为核心，不强迫每格填满。
4. 子弹笔记先快速记录，再通过完成、迁移和整理完成闭环。
5. 一日一页允许长文、短句、图片或完全留白，不设置 streak 压力。

参考研究：

- MD Notebook Diary: https://md.midori-japan.co.jp/en/products/mddiary/
- MD Notebook Journal: https://md.midori-japan.co.jp/en/products/mdnote-journal/
- Jibun Techo: https://www.kokuyo.com/en/products/jibun_techo/
- Hobonichi Cousin: https://cdn-test.1101.com/store/techo/en/2026/all_about/cousin/
- Midori hibino: https://www.midori-japan.co.jp/english/products/hibino/
- Traveler's weekly inserts: https://www.designphil.co.jp/presspdf/220825_tr_EN.pdf
- Goodnotes Features: https://www.goodnotes.com/features/
- Goodnotes Frequently Requested Features: https://support.goodnotes.com/hc/en-us/articles/7616167357967-Frequently-requested-features-for-Goodnotes
- Penly: https://www.penly.net/
- Zinnia: https://apps.apple.com/us/app/zinnia-digital-planner/id1485310935
- Day One Encryption: https://dayoneapp.com/features/end-to-end-encryption/
- Hobonichi 一日一页拼贴示例: https://www.bilibili.com/video/BV1kJ411J7u8/
- Hobonichi Weeks 时间轴周计划示例: https://www.bilibili.com/video/BV17TPWecEhz/
- 每周复盘手写流程示例: https://www.bilibili.com/video/BV1zM4y1q7Em/
- 精简 all-in-one 手帐体系示例: https://www.bilibili.com/video/BV1DHz2YDEYp/

## 商业化边界

MIT 代码可以用于商业发行。社区素材需要单独记录作者和许可证；默认只接受原创、CC0、CC-BY 或明确允许商业使用的素材。商店版可以收费，但基础编辑、本地存储、搜索和无损导出应保持可用。
