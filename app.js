const STORAGE_KEY = "openpages.state.v1";
const APP_VERSION = "0.4.0-beta";
// Where 意见反馈 opens (a questionnaire, a 小红书 profile or a GitHub Issues page). Empty hides the link.
const FEEDBACK_URL = "";
const LOCAL_STORAGE_SOFT_LIMIT = 4_000_000;
const TEMPLATE_PACK_VERSION = 1;
const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const STICKERS = {
  "tape-coral": { text: "Memo", className: "tape coral" },
  "tape-leaf": { text: "Today", className: "tape leaf" },
  "tape-indigo": { text: "青蓝", className: "tape indigo tape-pattern" },
  "tape-grid": { text: "Grid", className: "tape gridtape" },
  "tape-kraft": { text: "NOTE", className: "tape kraft" },
  "tape-moss": { text: "FOREST", className: "tape moss" },
  "tape-plum": { text: "余韵", className: "tape plum" },
  "tape-stripe": { text: "LINE", className: "tape stripe" },
  "note-butter": { text: "想法", className: "note butter" },
  "note-sky": { text: "灵感", className: "note sky" },
  "note-matcha": { text: "观察", className: "note matcha" },
  "note-mauve": { text: "余白", className: "note mauve" },
  "note-linen": { text: "日期", className: "note linen-note" },
  "note-bluegray": { text: "读书", className: "note bluegray" },
  "stamp-rose": { text: "DONE", className: "stamp rose" },
  "stamp-ink": { text: "OPEN", className: "stamp ink" },
  "stamp-vermilion": { text: "毕", className: "stamp vermilion" },
  "stamp-brass": { text: "旅", className: "stamp brass-stamp" },
  "stamp-tea": { text: "喫茶", className: "stamp tea-stamp" },
  "stamp-read": { text: "读", className: "stamp read-stamp" },
  "index-sage": { text: "INDEX", className: "index-tab sage-tab" },
  "index-rust": { text: "TODAY", className: "index-tab rust-tab" },
  "ticket-cream": { text: "TICKET", className: "ticket ticket-cream" },
  "ticket-blue": { text: "DATE", className: "ticket ticket-blue" },
  "ticket-green": { text: "MUSEUM", className: "ticket ticket-green" },
  "photo-frame": { text: "PHOTO", className: "photo-frame" },
  "seal-gold": { text: "月", className: "seal seal-gold" },
  "seal-copper": { text: "栞", className: "seal seal-copper" },
  "botanical-leaf": { text: "葉", className: "botanical botanical-leaf" },
  "botanical-flower": { text: "花", className: "botanical botanical-flower" },
  "art-fern": { text: "蕨", label: "蕨类植物标本", className: "art-sticker art-fern" },
  "art-sakura": { text: "樱", label: "樱花枝插画", className: "art-sticker art-sakura" },
  "art-ginkgo": { text: "银杏", label: "银杏叶插画", className: "art-sticker art-ginkgo" },
  "art-kissa": { text: "咖啡", label: "喫茶店咖啡杯", className: "art-sticker art-kissa" },
  "art-mountain": { text: "山", label: "远山与日出", className: "art-sticker art-mountain" },
  "art-window": { text: "雨", label: "雨日窗景", className: "art-sticker art-window" },
  "art-bird": { text: "旅", label: "飞鸟旅行插画", className: "art-sticker art-bird" },
  "art-lamp": { text: "灯", label: "夜读台灯插画", className: "art-sticker art-lamp" },
};
const DEFAULT_TASK_TEXTS = ["写下今天最重要的一件事", "给自己留一个小小的奖励"];
// Mood is recorded only when chosen; "" means not recorded.
const MOOD_LABELS = {
  sunny: "晴朗",
  calm: "平静",
  spark: "有灵感",
  busy: "忙碌",
  tired: "疲惫",
  low: "低落",
  tense: "紧绷",
};
// One prompt a day for the blank daily page, chosen by date so every window shows the same one.
// Written to be answerable in a sentence; none asks for a streak, a score or a goal.
const DAILY_PROMPTS = [
  "今天最想记住的一刻是：",
  "今天吃到的最好吃的东西：",
  "今天听到的一句话：",
  "此刻窗外是什么样子：",
  "今天让我笑出来的事：",
  "今天花时间最多的事，和它带来的感受：",
  "今天比昨天轻松一点的地方：",
  "今天想感谢的一个人，和原因：",
  "今天身体最明显的感受：",
  "今天做完的一件小事：",
  "今天一直在想的问题：",
  "如果给今天起个名字，会叫：",
  "今天读到、看到或听到的好东西：",
  "今天的天气和我的心情像不像：",
  "今天遇到的一个小麻烦，我是怎么过去的：",
  "今天想对自己说的一句话：",
  "今天去过的地方：",
  "今天和谁说了话，聊了什么：",
  "今天学会的一件事：",
  "今天想放下的一件事：",
  "今天最安静的时刻：",
  "明天想记得做的一件事：",
  "最近一直期待的事：",
  "今天收到或送出的一份心意：",
  "今天注意到的一个颜色、气味或声音：",
  "今天有没有哪一刻觉得自己做得不错：",
  "今天让我有点累的事：",
  "此刻最想吃什么：",
  "今天拍下的照片里，最想留住的是：",
  "如果今天重来一次，想换个做法的地方：",
  "这周到现在为止，最难忘的瞬间：",
  "今天读到的一个词或一句话：",
  "一件最近才开始喜欢的东西：",
  "今天的晚饭和一起吃饭的人：",
  "今天有什么事比预想中顺利：",
  "最近反复想起的一个人：",
  "今天为自己做的一件小事：",
  "今天路上看到的风景：",
  "今天的情绪像什么天气：",
  "一年后的我读到这一页，最想知道什么：",
];
const INK_PALETTES = {
  stationery: {
    label: "文具基础",
    colors: ["#2f3330", "#9f4f46", "#4f6973", "#64735e", "#6e6254", "#a98463"],
  },
  morandi: {
    label: "莫兰迪",
    colors: ["#8f9891", "#a9aaa1", "#9aa6ad", "#b7a0a0", "#928d80", "#6e7773"],
  },
  botanical: {
    label: "植物标本",
    colors: ["#39473a", "#62725b", "#8c9872", "#b8b88f", "#7a6857", "#a65a50"],
  },
  showa: {
    label: "昭和复古",
    colors: ["#2f4050", "#a54f3f", "#c8944b", "#66806a", "#7d5d48", "#d7cfb7"],
  },
  night: {
    label: "夜读墨色",
    colors: ["#161716", "#2d3436", "#44545f", "#5b4b63", "#78685a", "#b8b2a6"],
  },
};
const INK_BRUSHES = {
  fountain: { label: "钢笔", note: "斜角收锋", size: 1, alpha: 0.96 },
  ballpoint: { label: "圆珠笔", note: "细线墨珠", size: 0.72, alpha: 0.9 },
  monoline: { label: "针管笔", note: "绝对等宽", size: 0.9, alpha: 1 },
  pencil: { label: "铅笔", note: "石墨颗粒", size: 0.78, alpha: 0.52 },
  marker: { label: "马克笔", note: "斜切叠色", size: 3.2, alpha: 0.26 },
  brush: { label: "毛笔", note: "笔腹飞白", size: 1.55, alpha: 0.9 },
};
const PAGE_PALETTES = {
  shiro: "#667b72",
  moss: "#61745f",
  indigo: "#506d77",
  ume: "#9d5b65",
  tea: "#8a704f",
};
const PAGE_STYLE_LABELS = { dot: "点阵", line: "横线", grid: "方格", plain: "空白" };
const PAGE_ILLUSTRATION_LABELS = {
  none: "无印花",
  botanical: "植物标本",
  kissa: "喫茶日常",
  travel: "旅行速写",
  seasonal: "四季花信",
  night: "夜读书房",
  atelier: "文具工房",
};
const THEME_TOKENS = {
  daylight: { desk: "#e2e5e1", soft: "#f0f2ee", chrome: "#faf9f4" },
  sage: { desk: "#bdc9bd", soft: "#d9e2d9", chrome: "#e5ede6" },
  plum: { desk: "#d6c8cc", soft: "#eadfe2", chrome: "#f4eaec" },
  ink: { desk: "#202622", soft: "#303832", chrome: "#e7e0d5" },
};
const COVER_TOKENS = {
  olive: ["#39443b", "#5c685c", "#858a74"],
  camel: ["#412b1f", "#755137", "#a67d55"],
  blueblack: ["#172126", "#293b42", "#4a6069"],
  burgundy: ["#321d1f", "#5b3335", "#825154"],
  natural: ["#55402d", "#896745", "#b28c62"],
};
// Tinted papers are the faint tints of real stationery (Midori MD cream, pale TN refills): writing
// and hints keep their contrast on every one. They used to be strong enough to grey the text.
const PAPER_TOKENS = {
  washi: ["#f8f6ef", "#e2dfd6", "#aeb8b0"],
  ivory: ["#f3ead6", "#e0d3b8", "#b9a789"],
  gray: ["#eceeeb", "#d6dbd7", "#9aa59f"],
  blue: ["#e9f0f1", "#cfdde0", "#8fa9b0"],
  sakura: ["#f6eaeb", "#e6cfd3", "#b98f98"],
};
const THEME_PRESETS = {
  morning: {
    label: "清晨和纸",
    theme: "daylight",
    coverTheme: "olive",
    paperTone: "washi",
    pagePalette: "shiro",
    pageAccent: PAGE_PALETTES.shiro,
    inkPalette: "stationery",
    inkColor: "#2f3330",
  },
  garden: {
    label: "苔庭蓝墨",
    theme: "sage",
    coverTheme: "blueblack",
    paperTone: "blue",
    pagePalette: "indigo",
    pageAccent: PAGE_PALETTES.indigo,
    inkPalette: "botanical",
    inkColor: "#39473a",
  },
  plum: {
    label: "梅雨书房",
    theme: "plum",
    coverTheme: "burgundy",
    paperTone: "sakura",
    pagePalette: "ume",
    pageAccent: PAGE_PALETTES.ume,
    inkPalette: "showa",
    inkColor: "#a54f3f",
  },
  night: {
    label: "夜读皮革",
    theme: "ink",
    coverTheme: "camel",
    paperTone: "ivory",
    pagePalette: "tea",
    pageAccent: PAGE_PALETTES.tea,
    inkPalette: "night",
    inkColor: "#2d3436",
  },
};
const MODE_COPY = {
  daily: {
    eyebrow: "Daily Log",
    rightEyebrow: "Freehand",
    editorLabel: "文字手帐",
    placeholder: "写下今天的片段、清单、灵感或碎碎念。",
    mobileLeft: "文字页",
    mobileRight: "手写页",
    showMood: true,
    showTags: true,
    showToolbar: true,
    focusLabel: "",
    tagPlaceholder: "添加页签，例如：旅行、学习、情绪",
    prompts: [
      ["记一刻", "今天最想记住的一刻是："],
      ["感谢", "此刻我正在感谢："],
      ["给明天", "明天想留给自己的提示："],
    ],
  },
  bullet: {
    eyebrow: "Bullet Log",
    rightEyebrow: "Rapid Log",
    editorLabel: "子弹笔记",
    placeholder: "用符号快速记录：• 任务、○ 事件、- 笔记、> 迁移。也可以直接用右页速记。",
    mobileLeft: "说明页",
    mobileRight: "速记页",
    showMood: false,
    showTags: false,
    showToolbar: false,
    focusLabel: "",
    prompts: [],
  },
  weekly: {
    eyebrow: "Weekly Log",
    rightEyebrow: "Week Spread",
    editorLabel: "周记",
    placeholder: "写下本周主题、想留白的时间和周末回看。",
    mobileLeft: "周记",
    mobileRight: "一周安排",
    showMood: false,
    showTags: false,
    showToolbar: false,
    focusLabel: "本周主线",
    tagPlaceholder: "添加本周主题，例如：工作、学习、休息",
    prompts: [],
  },
  memory: {
    eyebrow: "Memory Page",
    rightEyebrow: "Memory Board",
    editorLabel: "拼贴旁白",
    placeholder: "记录地点、声音、味道，或者给照片和票根写一句旁白。",
    mobileLeft: "旁白页",
    mobileRight: "拼贴页",
    showMood: false,
    showTags: true,
    showToolbar: true,
    focusLabel: "本页主题",
    tagPlaceholder: "添加场景页签，例如：旅行、展览、咖啡馆",
    prompts: [
      ["地点", "这一页发生在："],
      ["感官", "当时记住的声音、气味或触感："],
      ["一句旁白", "如果只留一句话，我想写："],
    ],
  },
  mood: {
    eyebrow: "Mood Log",
    rightEyebrow: "Body & Mood",
    editorLabel: "情绪记录",
    placeholder: "写下今天的情绪天气、身体感受和让自己稳定下来的事。",
    mobileLeft: "记录页",
    mobileRight: "指标页",
    showMood: true,
    showTags: false,
    showToolbar: false,
    focusLabel: "此刻需要",
    prompts: [
      ["触发点", "情绪发生变化之前，我注意到："],
      ["身体", "此刻身体最明显的感受是："],
      ["安定", "让我稍微稳定下来的是："],
    ],
  },
  monthly: {
    eyebrow: "Monthly Index",
    rightEyebrow: "Month & Memo",
    editorLabel: "本月旁注",
    placeholder: "写下这个月想保留的节奏、重要日期，或暂时没有归类的想法。",
    mobileLeft: "月记",
    mobileRight: "月历",
    showMood: false,
    showTags: false,
    showToolbar: false,
    focusLabel: "本月主题",
    tagPlaceholder: "添加月份页签，例如：工作、旅行、恢复",
    prompts: [],
  },
  reading: {
    eyebrow: "Reading Notes",
    rightEyebrow: "Book Record",
    editorLabel: "阅读札记",
    placeholder: "自由记录摘句、联想和读到这里时的生活。",
    mobileLeft: "札记页",
    mobileRight: "书目卡",
    showMood: false,
    showTags: true,
    showToolbar: true,
    focusLabel: "阅读主题",
    tagPlaceholder: "添加阅读页签，例如：小说、设计、历史",
    prompts: [
      ["摘句", "想留下的一句话："],
      ["联想", "它让我想到："],
      ["带走", "读完后想带走的是："],
    ],
  },
  travel: {
    eyebrow: "Travel Journal",
    rightEyebrow: "Route & Keepsakes",
    editorLabel: "旅途旁白",
    placeholder: "记录路上的气味、声音、偶遇和计划之外的片段。",
    mobileLeft: "旅途页",
    mobileRight: "行程页",
    showMood: false,
    showTags: true,
    showToolbar: true,
    focusLabel: "目的地",
    tagPlaceholder: "添加旅途页签，例如：京都、海边、独自旅行",
    prompts: [
      ["路线", "今天走过的路线："],
      ["偶遇", "计划之外遇见了："],
      ["带回", "想从这段旅途带回生活的是："],
    ],
  },
  fiveyear: {
    eyebrow: "Five Year Diary",
    rightEyebrow: "Same Day, Different Year",
    editorLabel: "今年的今天",
    placeholder: "只写几行也可以。多年以后，这些普通句子会彼此照面。",
    mobileLeft: "今年",
    mobileRight: "历年同日",
    showMood: true,
    showTags: false,
    showToolbar: true,
    focusLabel: "今日一句",
    tagPlaceholder: "",
    prompts: [
      ["天气", "今天的天气和体感："],
      ["此刻", "此刻生活里最具体的一件事："],
      ["明年见", "想留给明年今天的一句话："],
    ],
  },
};
const LAYOUT_LABELS = {
  daily: "自由双页",
  bullet: "速记索引",
  weekly: "周计划",
  monthly: "月计划",
  memory: "图文拼贴",
  reading: "阅读札记",
  mood: "身心温度",
  travel: "旅途采集",
  fiveyear: "同日五年",
};
const TEMPLATE_APPEARANCES = {
  daily: { pageStyle: "dot", pagePalette: "shiro", pageIllustration: "botanical" },
  bullet: { pageStyle: "dot", pagePalette: "indigo", pageIllustration: "none" },
  reading: { pageStyle: "line", pagePalette: "indigo", pageIllustration: "night" },
  mood: { pageStyle: "dot", pagePalette: "ume", pageIllustration: "seasonal" },
  travel: { pageStyle: "grid", pagePalette: "tea", pageIllustration: "travel" },
  memory: { pageStyle: "plain", pagePalette: "moss", pageIllustration: "atelier" },
  fiveyear: { pageStyle: "line", pagePalette: "ume", pageIllustration: "seasonal" },
};
const CALENDAR_PAGE_MODES = new Set(["monthly", "weekly"]);
const PAGE_GROUP_FIELDS = [
  "title",
  "bookmarked",
  "mode",
  "mood",
  "text",
  "html",
  "focus",
  "tasks",
  "tags",
  "fragments",
  "bullets",
  "photos",
  "metrics",
  "stamp",
  "pageStyle",
  "pagePalette",
  "pageAccent",
  "pageIllustration",
  "habits",
  "week",
  "modules",
  "stickers",
  "ink",
  "strokes",
  "versions",
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const elements = {
  body: document.body,
  pageHeading: $("#pageHeading"),
  datePicker: $("#datePicker"),
  topDatePicker: $("#topDatePicker"),
  topDateText: $("#topDateText"),
  todayButton: $("#todayButton"),
  footerTodayButton: $("#footerTodayButton"),
  calendarScaleButtons: $$('[data-calendar-scale]'),
  prevDayButton: $("#prevDayButton"),
  nextDayButton: $("#nextDayButton"),
  prevSpreadButton: $("#prevSpreadButton"),
  nextSpreadButton: $("#nextSpreadButton"),
  addSpreadButton: $("#addSpreadButton"),
  spreadPosition: $("#spreadPosition"),
  spreadScopeLabel: $("#spreadScopeLabel"),
  leftPageNumber: $("#leftPageNumber"),
  rightPageNumber: $("#rightPageNumber"),
  miniMonthTitle: $("#miniMonthTitle"),
  miniDays: $("#miniDays"),
  entryTitle: $("#entryTitle"),
  entryModeLabel: $("#entryModeLabel"),
  rightPageModeLabel: $("#rightPageModeLabel"),
  moodSelect: $("#moodSelect"),
  moodChips: $("#moodChips"),
  dailyPrompt: $("#dailyPrompt"),
  dailyPromptText: $("#dailyPromptText"),
  useDailyPromptButton: $("#useDailyPromptButton"),
  nextDailyPromptButton: $("#nextDailyPromptButton"),
  editorLabel: $("#editorLabel"),
  bulletKey: $("#bulletKey"),
  bulletIndexNote: $("#bulletIndexNote"),
  syncBulletsButtons: $$("[data-sync-bullets]"),
  journalEditor: $("#journalEditor"),
  journalText: $("#journalText"),
  editorToolbar: $(".editor-toolbar"),
  focusInput: $("#focusInput"),
  modeFocus: $("#modeFocus"),
  modeFocusLabel: $("#modeFocusLabel"),
  modeFocusInput: $("#modeFocusInput"),
  entryContext: $("#entryContext"),
  entryContextMeta: $("#entryContextMeta"),
  tagInput: $("#tagInput"),
  tagList: $("#tagList"),
  fragmentInput: $("#fragmentInput"),
  addFragmentButton: $("#addFragmentButton"),
  fragmentList: $("#fragmentList"),
  bulletType: $("#bulletType"),
  bulletInput: $("#bulletInput"),
  addBulletButton: $("#addBulletButton"),
  bulletList: $("#bulletList"),
  photoInput: $("#photoInput"),
  photoGrid: $("#photoGrid"),
  energyRange: $("#energyRange"),
  stressRange: $("#stressRange"),
  sleepRange: $("#sleepRange"),
  energyValue: $("#energyValue"),
  stressValue: $("#stressValue"),
  sleepValue: $("#sleepValue"),
  healthInput: $("#healthInput"),
  healthGrid: $("#healthGrid"),
  healthSourceLabel: $("#healthSourceLabel"),
  healthImportStatus: $("#healthImportStatus"),
  healthConnectionState: $("#healthConnectionState"),
  healthConnectionCopy: $("#healthConnectionCopy"),
  connectHealthButton: $("#connectHealthButton"),
  syncHealthButton: $("#syncHealthButton"),
  manageHealthButton: $("#manageHealthButton"),
  healthWeeklyReportButton: $("#healthWeeklyReportButton"),
  saveVersionButton: $("#saveVersionButton"),
  restoreLastVersionButton: $("#restoreLastVersionButton"),
  versionCount: $("#versionCount"),
  saveDetails: $("#saveDetails"),
  pageHistory: $("#pageHistory"),
  pageHistoryMeta: $("#pageHistoryMeta"),
  pageHistoryList: $("#pageHistoryList"),
  savePageVersionButton: $("#savePageVersionButton"),
  taskInput: $("#taskInput"),
  addTaskButton: $("#addTaskButton"),
  dailyStampButton: $("#dailyStampButton"),
  dailyStampIcon: $("#dailyStampIcon"),
  exportDayButton: $("#exportDayButton"),
  migrateTasksButton: $("#migrateTasksButton"),
  deleteCurrentPageButton: $("#deleteCurrentPageButton"),
  workflowNote: $("#workflowNote"),
  taskList: $("#taskList"),
  taskCount: $("#taskCount"),
  habitInputs: $$("[data-habit]"),
  dateLabel: $("#dateLabel"),
  weekGrid: $("#weekGrid"),
  weekRangeLabel: $("#weekRangeLabel"),
  collectionView: $("#collectionView"),
  saveState: $("#saveState"),
  saveNowButton: $("#saveNowButton"),
  lastSavedTime: $("#lastSavedTime"),
  saveDetailsNote: $("#saveDetailsNote"),
  themeSelect: $("#themeSelect"),
  themePresetPicker: $("#themePresetPicker"),
  coverThemeSelect: $("#coverThemeSelect"),
  customCoverColor: $("#customCoverColor"),
  paperToneSelect: $("#paperToneSelect"),
  decorativePrintToggle: $("#decorativePrintToggle"),
  coverDisplaySelect: $("#coverDisplaySelect"),
  themePreviewTitle: $("#themePreviewTitle"),
  themePreviewMeta: $("#themePreviewMeta"),
  themeApplyState: $("#themeApplyState"),
  privacyButton: $("#privacyButton"),
  focusModeButton: $("#focusModeButton"),
  pageExtras: $("#pageExtras"),
  pageStyleTabs: $("#pageStyleTabs"),
  pagePalettePicker: $("#pagePalettePicker"),
  customPageAccent: $("#customPageAccent"),
  pageIllustrationPicker: $("#pageIllustrationPicker"),
  pagePaperMeta: $("#pagePaperMeta"),
  modeLibrary: $("#modeLibrary"),
  recordPageCategory: $("#recordPageCategory"),
  dayPageShelfMeta: $("#dayPageShelfMeta"),
  dayPageShelfList: $("#dayPageShelfList"),
  saveTemplateButton: $("#saveTemplateButton"),
  exportTemplatePackButton: $("#exportTemplatePackButton"),
  templatePackInput: $("#templatePackInput"),
  customTemplateList: $("#customTemplateList"),
  myTemplates: $("#myTemplates"),
  myTemplatesMeta: $("#myTemplatesMeta"),
  exportButton: $("#exportButton"),
  exportMarkdownButton: $("#exportMarkdownButton"),
  printDayButton: $("#printDayButton"),
  importInput: $("#importInput"),
  installAppButton: $("#installAppButton"),
  copyShareLinkButton: $("#copyShareLinkButton"),
  stickerCategoryTabs: $("#stickerCategoryTabs"),
  stickerPalette: $("#stickerPalette"),
  stickerLayer: $("#stickerLayer"),
  deleteStickerButton: $("#deleteStickerButton"),
  journalSpread: $("#journalSpread"),
  pageTurnSheet: $(".page-turn-sheet"),
  openCoverButton: $("#openCoverButton"),
  rightDock: $("#rightDock"),
  dockCloseButton: $("#dockCloseButton"),
  dockOverlay: $("#dockOverlay"),
  mobilePageButtons: $$("[data-mobile-page-target]"),
  inkCanvas: $("#inkCanvas"),
  penButton: $("#penButton"),
  eraserButton: $("#eraserButton"),
  clearInkButton: $("#clearInkButton"),
  undoInkButton: $("#undoInkButton"),
  redoInkButton: $("#redoInkButton"),
  inkPaletteSelect: $("#inkPaletteSelect"),
  inkColorPalette: $("#inkColorPalette"),
  inkBrushPicker: $("#inkBrushPicker"),
  customInkColor: $("#customInkColor"),
  addInkColorButton: $("#addInkColorButton"),
  inkSizeRange: $("#inkSizeRange"),
  inkSmoothingRange: $("#inkSmoothingRange"),
  stylusOnlyToggle: $("#stylusOnlyToggle"),
  inkOptionsToggle: $("#inkOptionsToggle"),
  penOptions: $("#penOptions"),
  inkFocusButton: $("#inkFocusButton"),
  searchInput: $("#searchInput"),
  searchResults: $("#searchResults"),
  reviewSummary: $("#reviewSummary"),
  reviewTypeFilter: $("#reviewTypeFilter"),
  reviewTagFilter: $("#reviewTagFilter"),
  reviewStartDate: $("#reviewStartDate"),
  reviewEndDate: $("#reviewEndDate"),
  reviewDateLabel: $("#reviewDateLabel"),
  reviewResetButton: $("#reviewResetButton"),
  reviewMoreButton: $("#reviewMoreButton"),
  bookmarkPageButton: $("#bookmarkPageButton"),
  linkedPlans: $("#linkedPlans"),
  linkedPlansMeta: $("#linkedPlansMeta"),
  linkedPlansList: $("#linkedPlansList"),
  onThisDay: $("#onThisDay"),
  onThisDayMeta: $("#onThisDayMeta"),
  onThisDayList: $("#onThisDayList"),
  lastBackupTime: $("#lastBackupTime"),
  storageWhere: $("#storageWhere"),
  storageUsage: $("#storageUsage"),
  aboutVersion: $("#aboutVersion"),
  aboutVersionValue: $("#aboutVersionValue"),
  feedbackLink: $("#feedbackLink"),
  trashMeta: $("#trashMeta"),
  trashList: $("#trashList"),
  recentPages: $("#recentPages"),
  streakDays: $("#streakDays"),
  entryCount: $("#entryCount"),
  fragmentCount: $("#fragmentCount"),
  actionToast: $("#actionToast"),
  dockSections: $$(".right-dock .dock-section"),
};

let state = loadState();
let knownStoredRevision = readStoredRevision();
const dirtyEntryKeys = new Set();
let selectedStickerId = null;
let drawMode = "pen";
let drawActive = false;
let dragSticker = null;
let saveTimer = null;
let hasPendingChanges = false;
let currentStroke = null;
let inkColor = state.inkColor || INK_PALETTES.stationery.colors[0];
let inkSize = state.inkSize || 4;
let inkBrush = state.inkBrush || "fountain";
let toastTimer = null;
let deferredInstallPrompt = null;
let inkRedoByDate = new Map();
let pageTurnInProgress = false;
let pageTurnSwapTimer = null;
let pageTurnFallbackTimer = null;
let pageTurnCompletion = null;
let reviewScope = "all";
let reviewLimit = 20;
let reviewFilterSignature = "";

function todayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function normalizeState(saved) {
  saved.customTemplates = saved.customTemplates || [];
  saved.entries = saved.entries || {};
  saved.selectedDate = saved.selectedDate || todayKey();
  saved.calendarFocusDate = saved.calendarFocusDate || saved.selectedDate;
  saved.health = saved.health || { summaries: {}, source: "", connection: null };
  saved.health.summaries = saved.health.summaries || {};
  saved.health.connection = saved.health.connection || null;
  saved.inkPalette = saved.inkPalette || "stationery";
  saved.inkColor = saved.inkColor || INK_PALETTES.stationery.colors[0];
  saved.inkSize = saved.inkSize || 4;
  saved.inkBrush = INK_BRUSHES[saved.inkBrush] ? saved.inkBrush : "fountain";
  saved.inkSmoothing = Number.isFinite(saved.inkSmoothing) ? saved.inkSmoothing : 30;
  saved.customInkColors = Array.isArray(saved.customInkColors) ? saved.customInkColors : [];
  saved.theme = saved.theme || "daylight";
  saved.pageStyle = saved.pageStyle || "dot";
  saved.pageIllustration = saved.pageIllustration || "botanical";
  saved.coverTheme = saved.coverTheme || "olive";
  saved.customCoverColor = saved.customCoverColor || "#4f5b50";
  saved.paperTone = saved.paperTone || "washi";
  saved.decorativePrints = saved.decorativePrints !== false;
  // "daily" used to be the default and was saved with every journal; only a choice made in the
  // settings (coverDisplayChosen) is kept, so everyone else now opens the notebook by hand each time.
  if (saved.coverDisplay === "daily" && !saved.coverDisplayChosen) saved.coverDisplay = "always";
  saved.coverDisplay = ["daily", "always", "never"].includes(saved.coverDisplay) ? saved.coverDisplay : "always";
  saved.trash = Array.isArray(saved.trash) ? saved.trash : [];
  return saved;
}

// Keeps an unreadable payload under a separate key so the next save cannot overwrite it.
function preserveUnreadableState(raw) {
  if (!raw) return;
  try {
    localStorage.setItem(`${STORAGE_KEY}.unreadable-${Date.now()}`, raw);
  } catch {
    // Storage full: the copy is skipped; loading continues with an empty journal.
  }
}

function loadState() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
    const saved = JSON.parse(raw || "null");
    if (saved && saved.version === 1) return normalizeState(saved);
    if (saved) preserveUnreadableState(raw);
  } catch {
    preserveUnreadableState(raw);
  }

  return {
    version: 1,
    selectedDate: todayKey(),
    calendarFocusDate: todayKey(),
    theme: "daylight",
    pageStyle: "dot",
    pageIllustration: "botanical",
    customTemplates: [],
    inkPalette: "stationery",
    inkColor: INK_PALETTES.stationery.colors[0],
    inkSize: 4,
    inkBrush: "fountain",
    inkSmoothing: 30,
    customInkColors: [],
    coverTheme: "olive",
    customCoverColor: "#4f5b50",
    paperTone: "washi",
    decorativePrints: true,
    coverDisplay: "always",
    health: { summaries: {}, source: "", connection: null },
    trash: [],
    entries: {},
  };
}

// Large media (photos, legacy ink images, handwriting strokes) lives in IndexedDB.
// localStorage keeps the journal text plus "opmedia:" references, so it stays far below its quota.
// The in-memory state always holds the full values, so rendering, export and snapshots are unchanged.
const MEDIA_DB_NAME = "openpages-media";
const MEDIA_STORE = "media";
const MEDIA_REF_PREFIX = "opmedia:v1:";
const MEDIA_INLINE_LIMIT = 2048;
let mediaDbPromise = null;
let mediaStoreAvailable = false;
const persistedMediaIds = new Set();
const mediaWritesInFlight = new Set();
let storedMediaRefs = new Set();
let mediaCleanupTimer = null;
let mediaHydrated = false;
const strokeRefCache = new WeakMap();
const dataUrlRefCache = new Map();

function hashMediaValue(text) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    h1 = Math.imul(h1 ^ code, 2654435761);
    h2 = Math.imul(h2 ^ code, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${(h2 >>> 0).toString(36)}${(h1 >>> 0).toString(36)}-${text.length.toString(36)}`;
}

function isMediaRef(value) {
  return typeof value === "string" && value.startsWith(MEDIA_REF_PREFIX);
}

function openMediaDb() {
  if (mediaDbPromise) return mediaDbPromise;
  mediaDbPromise = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    try {
      const request = indexedDB.open(MEDIA_DB_NAME, 1);
      request.addEventListener("upgradeneeded", () => request.result.createObjectStore(MEDIA_STORE));
      request.addEventListener("success", () => resolve(request.result));
      request.addEventListener("error", () => resolve(null));
      request.addEventListener("blocked", () => resolve(null));
    } catch {
      resolve(null);
    }
  });
  return mediaDbPromise;
}

function mediaTransaction(mode, work) {
  return openMediaDb().then((db) => new Promise((resolve, reject) => {
    if (!db) return reject(new Error("IndexedDB unavailable"));
    const transaction = db.transaction(MEDIA_STORE, mode);
    const result = work(transaction.objectStore(MEDIA_STORE));
    transaction.addEventListener("complete", () => resolve(result));
    transaction.addEventListener("error", () => reject(transaction.error));
    transaction.addEventListener("abort", () => reject(transaction.error || new Error("aborted")));
  }));
}

// Serializes state for localStorage, moving large values out into references.
function serializeStateForStorage(snapshot) {
  if (!mediaStoreAvailable) return { json: JSON.stringify(snapshot), refs: new Set(), pending: new Map() };
  const refs = new Set();
  const pending = new Map();
  const reference = (value, id) => {
    refs.add(id);
    if (!persistedMediaIds.has(id)) pending.set(id, value);
    return `${MEDIA_REF_PREFIX}${id}`;
  };
  const json = JSON.stringify(snapshot, (key, value) => {
    if (isMediaRef(value)) {
      refs.add(value.slice(MEDIA_REF_PREFIX.length));
      return value;
    }
    if (typeof value === "string" && value.length > MEDIA_INLINE_LIMIT && value.startsWith("data:")) {
      if (!dataUrlRefCache.has(value)) dataUrlRefCache.set(value, hashMediaValue(value));
      return reference(value, dataUrlRefCache.get(value));
    }
    if (key === "strokes" && Array.isArray(value) && value.length) {
      // Finished strokes never change, so length plus the last stroke identifies an unchanged array.
      const cached = strokeRefCache.get(value);
      if (cached && cached.length === value.length && cached.last === value[value.length - 1]) {
        return cached.id ? reference(value, cached.id) : value;
      }
      const text = JSON.stringify(value);
      const id = text.length > MEDIA_INLINE_LIMIT ? hashMediaValue(text) : "";
      strokeRefCache.set(value, { length: value.length, last: value[value.length - 1], id });
      if (id) return reference(value, id);
    }
    return value;
  });
  return { json, refs, pending };
}

function writePendingMedia(pending) {
  const fresh = [...pending].filter(([id]) => !mediaWritesInFlight.has(id));
  if (!fresh.length) return;
  fresh.forEach(([id]) => mediaWritesInFlight.add(id));
  mediaTransaction("readwrite", (store) => fresh.forEach(([id, value]) => store.put(value, id)))
    .then(() => {
      fresh.forEach(([id]) => persistedMediaIds.add(id));
      fresh.forEach(([id]) => mediaWritesInFlight.delete(id));
      if (hasPendingChanges) flushState();
    })
    .catch((error) => {
      fresh.forEach(([id]) => mediaWritesInFlight.delete(id));
      hasPendingChanges = true;
      setSaveState("error");
      notify(error?.name === "QuotaExceededError" ? "设备空间不足，图片和手写未能保存，请先导出备份" : "图片和手写保存失败，请先导出备份");
    });
}

// Deletes stored media that the last successful save no longer references.
function scheduleMediaCleanup() {
  if (!mediaStoreAvailable || !mediaHydrated) return;
  clearTimeout(mediaCleanupTimer);
  mediaCleanupTimer = setTimeout(() => {
    const keep = new Set([...storedMediaRefs, ...mediaWritesInFlight]);
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || "";
      for (const match of raw.matchAll(/opmedia:v1:([0-9a-z-]+)/g)) keep.add(match[1]);
    } catch {
      return;
    }
    mediaTransaction("readwrite", (store) => {
      const request = store.openKeyCursor();
      request.addEventListener("success", () => {
        const cursor = request.result;
        if (!cursor) return;
        if (!keep.has(cursor.key)) {
          store.delete(cursor.key);
          persistedMediaIds.delete(cursor.key);
          dataUrlRefCache.forEach((id, value) => { if (id === cursor.key) dataUrlRefCache.delete(value); });
        }
        cursor.continue();
      });
    }).catch(() => {});
  }, 8000);
}

function collectMediaRefs(value, found = new Set()) {
  if (isMediaRef(value)) found.add(value.slice(MEDIA_REF_PREFIX.length));
  else if (Array.isArray(value)) value.forEach((item) => collectMediaRefs(item, found));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectMediaRefs(item, found));
  return found;
}

function replaceMediaRefs(value, media, missing) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (isMediaRef(item)) value[index] = resolveMediaRef(item, media, missing, null);
      else replaceMediaRefs(item, media, missing);
    });
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      if (isMediaRef(item)) value[key] = resolveMediaRef(item, media, missing, key);
      else replaceMediaRefs(item, media, missing);
    });
  }
}

function resolveMediaRef(ref, media, missing, key) {
  const id = ref.slice(MEDIA_REF_PREFIX.length);
  if (media.has(id)) return clonePageValue(media.get(id));
  missing.add(id);
  // Strokes must stay an array for the canvas code; images keep the reference so nothing else is overwritten.
  return key === "strokes" ? [] : ref;
}

// Loads referenced media back into the in-memory state before the first render.
async function hydrateStoredMedia() {
  const db = await openMediaDb();
  mediaStoreAvailable = Boolean(db);
  if (!db) return;
  navigator.storage?.persist?.().catch(() => {});
  storedMediaRefs = collectMediaRefs(state);
  const missing = await resolveMediaInto(state);
  if (!missing) {
    // Reading failed: new media is stored inline and nothing is deleted from IndexedDB this session.
    mediaStoreAvailable = false;
    window.setTimeout(() => notify("图片和手写暂时读取失败，请刷新页面；本次不会清理已存内容"), 600);
    return;
  }
  mediaHydrated = true;
  if (missing.size) window.setTimeout(() => notify(`有 ${missing.size} 份图片或手写没有找到，可从备份导入恢复`), 600);
}

// Replaces media references in `target` with the stored values.
// Resolves to the set of ids that were not found, or null when IndexedDB could not be read.
async function resolveMediaInto(target) {
  const refs = collectMediaRefs(target);
  if (!refs.size) return new Set();
  const media = new Map();
  try {
    await mediaTransaction("readonly", (store) => {
      refs.forEach((id) => {
        const request = store.get(id);
        request.addEventListener("success", () => {
          if (request.result !== undefined) media.set(id, request.result);
        });
      });
    });
  } catch {
    return null;
  }
  media.forEach((_, id) => persistedMediaIds.add(id));
  const missing = new Set();
  replaceMediaRefs(target, media, missing);
  return missing;
}

// Moves media still stored inline in localStorage into IndexedDB on first launch after the upgrade.
function migrateInlineMedia() {
  if (!mediaStoreAvailable) return;
  const raw = localStorage.getItem(STORAGE_KEY) || "";
  if (raw.includes('"data:') || raw.includes('"strokes":[{')) flushState();
}

function persistState() {
  autoSaveVersionBeforeEdit();
  syncCurrentPageGroup();
  dirtyEntryKeys.add(state.selectedDate);
  hasPendingChanges = true;
  setSaveState("saving");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    // The write (tens of ms for a year of pages) runs when the browser is idle, not between keystrokes.
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => { if (hasPendingChanges) flushState(); }, { timeout: 800 });
    } else {
      flushState();
    }
  }, 180);
}

// The lastSavedAt of the journal currently in localStorage, read without parsing the whole payload.
// Only the top-level key is unescaped in the JSON, so text inside entries cannot match.
function readStoredRevision() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "";
    return raw.match(/"lastSavedAt":"([^"]+)"/)?.[1] || null;
  } catch {
    return null;
  }
}

// Another window (tab, installed PWA) of the same origin saved the journal.
// This window adopts the stored journal but keeps the pages it has unsaved edits for,
// so neither window silently overwrites what the other wrote.
// `saved` must already be parsed; `refs` are the media references it held on disk.
function adoptExternalState(saved, refs, { keepEdited = false } = {}) {
  normalizeState(saved);
  const key = state.selectedDate;
  const localEntry = state.entries[key];
  if (keepEdited) {
    new Set([...dirtyEntryKeys, key]).forEach((dirtyKey) => {
      if (state.entries[dirtyKey]) saved.entries[dirtyKey] = state.entries[dirtyKey];
    });
    const remoteTrash = new Set(saved.trash.map((item) => item.id));
    saved.trash = [...saved.trash, ...state.trash.filter((item) => !remoteTrash.has(item.id))];
  } else if (localEntry && saved.entries[key]) {
    const remoteEntry = saved.entries[key];
    normalizeEntry(remoteEntry, key);
    const index = Number(localEntry.activePageGroup) || 0;
    if (index !== remoteEntry.activePageGroup && remoteEntry.pageGroups[index]) {
      remoteEntry.activePageGroup = index;
      applyPageGroup(remoteEntry, remoteEntry.pageGroups[index], key);
    }
  }
  saved.selectedDate = state.selectedDate;
  saved.calendarFocusDate = state.calendarFocusDate;
  const currentPageChanged = !keepEdited
    && JSON.stringify(localEntry?.pageGroups || null) !== JSON.stringify(saved.entries[key]?.pageGroups || null);
  state = saved;
  knownStoredRevision = saved.lastSavedAt || null;
  storedMediaRefs = refs;
  return currentPageChanged;
}

function parseStoredJournal(raw) {
  try {
    const saved = JSON.parse(raw || "null");
    return saved && saved.version === 1 && saved.entries && typeof saved.entries === "object" ? saved : null;
  } catch {
    return null;
  }
}

function handleExternalStorageChange(event) {
  if (event.key !== STORAGE_KEY || !event.newValue) return;
  const revision = event.newValue.match(/"lastSavedAt":"([^"]+)"/)?.[1] || null;
  if (revision !== knownStoredRevision) syncExternalState(event.newValue);
  // The prepared stand-in pages would show the old content.
  discardPreparedBook();
}

async function syncExternalState(raw) {
  const saved = parseStoredJournal(raw);
  if (!saved) return;
  const refs = collectMediaRefs(saved);
  // Media is loaded before the swap, so this window never renders or re-saves bare references.
  if (refs.size && !(await resolveMediaInto(saved))) return;
  // Skip if this version is already known, or a newer save replaced it while media was loading.
  if (saved.lastSavedAt === knownStoredRevision || saved.lastSavedAt !== readStoredRevision()) return;
  syncEntryFromForm();
  const editing = hasPendingChanges || drawActive || pageTurnInProgress;
  const currentPageChanged = adoptExternalState(saved, refs, { keepEdited: editing });
  // Edits still pending here are written on top of the adopted journal.
  if (editing) persistState();
  applyGlobalSettings();
  if (currentPageChanged) {
    loadEntryIntoForm();
    notify("另一个窗口更新了这一页，已显示最新内容");
  } else {
    renderPageGroupNavigation();
    renderCalendar();
    scheduleStats();
    renderSearch();
    renderPageHistory();
  }
  renderTrash();
  renderBackupStatus();
}

// A window frozen in the background can miss storage events; check again when it returns.
function checkStoredRevision() {
  const revision = readStoredRevision();
  if (!revision || revision === knownStoredRevision) return;
  try {
    syncExternalState(localStorage.getItem(STORAGE_KEY));
  } catch {
    // Unreadable storage: keep the in-memory journal.
  }
}

function flushState() {
  clearTimeout(saveTimer);
  try {
    const storedRevision = readStoredRevision();
    const stored = storedRevision && storedRevision !== knownStoredRevision
      ? parseStoredJournal(localStorage.getItem(STORAGE_KEY))
      : null;
    if (stored) {
      // Another window saved since this one last read storage. Merge first so its pages survive;
      // their media stays as references, which the serializer writes back unchanged.
      adoptExternalState(stored, collectMediaRefs(stored), { keepEdited: true });
      resolveMediaInto(state).then(() => {
        renderCalendar();
        scheduleStats();
        renderTrash();
      });
    }
    syncAllPageGroups();
    const savedAt = new Date().toISOString();
    const payload = serializeStateForStorage({ ...state, lastSavedAt: savedAt });
    if (payload.pending.size) {
      // Media goes to IndexedDB first; the text save follows once it is stored.
      hasPendingChanges = true;
      setSaveState("saving");
      writePendingMedia(payload.pending);
      return false;
    }
    localStorage.setItem(STORAGE_KEY, payload.json);
    warnIfStorageNearlyFull(payload.json.length);
    state.lastSavedAt = savedAt;
    knownStoredRevision = savedAt;
    dirtyEntryKeys.clear();
    storedMediaRefs = payload.refs;
    hasPendingChanges = false;
    setSaveState("saved");
    scheduleMediaCleanup();
    return true;
  } catch (error) {
    hasPendingChanges = true;
    setSaveState("error");
    notify(error?.name === "QuotaExceededError" ? "本地空间不足，请先导出备份并删除大图" : "保存失败，请先导出备份");
    return false;
  }
}

function setSaveState(stateName) {
  const config = {
    // A blank page is created for today on launch; only pages with writing count as records.
    ready: { text: Object.entries(state.entries).some(([key, entry]) => !entry.sample && hasMeaningfulContent(entry, key)) ? "已载入本机记录" : "新手帐 · 保存在本机" },
    saving: { text: "正在保存…" },
    saved: { text: "已保存到本机" },
    error: { text: "保存失败 · 未写入" },
  }[stateName] || { text: "等待记录" };
  elements.saveState.dataset.state = stateName;
  elements.saveState.textContent = config.text;
  elements.saveState.setAttribute("aria-label", config.text);
  elements.saveState.title = config.text;
  if (elements.saveNowButton) elements.saveNowButton.textContent = stateName === "error" ? "重试保存" : "保存";
  if (elements.lastSavedTime) {
    const date = new Date(state.lastSavedAt || "");
    elements.lastSavedTime.textContent = Number.isNaN(date.getTime()) ? "暂无时间记录" : date.toLocaleString("zh-CN", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }
  if (elements.saveDetailsNote) elements.saveDetailsNote.textContent = stateName === "error"
    ? "最新改动尚未写入本机。请重试或导出备份，暂时不要关闭页面。"
    : "清除浏览器数据会移除本机记录。备份文件可另行保留。";
}

function saveNow() {
  settlePageTurn();
  syncEntryFromForm();
  const saved = flushState();
  if (saved) notify("全部改动已保存到本机");
  return saved;
}

function handleSaveShortcut(event) {
  if (!(event.metaKey || event.ctrlKey) || event.altKey || event.isComposing || event.key.toLowerCase() !== "s") return;
  event.preventDefault();
  saveNow();
}

function handleBeforeUnload(event) {
  if (!hasPendingChanges || flushState()) return;
  event.preventDefault();
  event.returnValue = "";
}

function scheduleToastHide(delay) {
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    // An action toast stays while the pointer or keyboard focus is on it.
    if (elements.actionToast.matches(".has-action:is(:hover, :focus-within)")) return scheduleToastHide(1500);
    elements.actionToast.classList.remove("is-visible", "has-action");
  }, delay);
}

// `action` adds one button (e.g. 撤销) and keeps the toast up long enough to reach it.
function notify(message, action = null) {
  if (!elements.actionToast) return;
  elements.actionToast.replaceChildren(document.createTextNode(message));
  elements.actionToast.classList.toggle("has-action", Boolean(action));
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", () => {
      elements.actionToast.classList.remove("is-visible", "has-action");
      action.run();
    }, { once: true });
    elements.actionToast.append(button);
  }
  elements.actionToast.classList.add("is-visible");
  scheduleToastHide(action ? 8000 : 2200);
  // A light tap confirms the person's own action; toasts the app shows by itself stay silent.
  if ("vibrate" in navigator && navigator.userActivation?.isActive) navigator.vibrate(8);
}

// The cover is shown on every launch by default, and the notebook is opened by hand. The setting can
// show it only on the first launch of each day instead. The day is remembered per device, outside the journal and its backups.
const COVER_OPENED_KEY = "openpages.cover.openedOn";

function shouldShowCover() {
  if (state.coverDisplay === "always") return true;
  if (state.coverDisplay === "never") return false;
  try {
    return localStorage.getItem(COVER_OPENED_KEY) !== todayKey();
  } catch {
    return true;
  }
}

function rememberCoverOpened() {
  try {
    localStorage.setItem(COVER_OPENED_KEY, todayKey());
  } catch {
    // Storage blocked: the cover is shown again next time.
  }
}

// Switching closed → open changes the notebook's size and many colours and shadows at once.
// Transitions are held off across that switch, otherwise shadows on the whole spread repaint every
// frame for half a second right after the cover opens.
function settleBookState(afterwards) {
  let done = false;
  const release = () => {
    if (done) return;
    done = true;
    elements.body.classList.remove("is-book-settling");
    afterwards?.();
  };
  requestAnimationFrame(() => requestAnimationFrame(release));
  // Frames do not run while the page is hidden; transitions are never held off for long.
  window.setTimeout(release, 160);
}

function openNotebookWithoutCover() {
  window.clearTimeout(prepareBookTimer);
  // A stand-in cover prepared for an animated opening is put away first.
  if (preparedBook) {
    const { book, animations, inertNodes } = preparedBook;
    preparedBook = null;
    animations.forEach((animation) => animation.cancel());
    inertNodes.forEach((node) => { node.inert = false; });
    book.overlay.remove();
    elements.body.classList.remove("is-cover-leaving");
  }
  elements.body.classList.add("is-book-settling");
  elements.body.dataset.book = "open";
  elements.journalSpread.classList.add("is-opened-once");
  settleBookState();
}

// Opening and closing the notebook, played on a stand-in book above the real layout:
// the cover turns on its spine to lie flat on the left, the notebook slides to centre on its spine, then
// comes up to full size, showing the person's real pages all the way. The open layout is laid out and
// painted underneath before anything moves, and every moving part changes only transform or opacity.
// Closing plays the same timeline backwards.
const BOOK_TIMELINE = {
  total: 1260,
  move: { delay: 0, duration: 1150 },
  turn: { delay: 40, duration: 700 },
  backdrop: { delay: 560, duration: 560 },
  handOff: { delay: 1100, duration: 160 },
};

function focusEditorAfterOpening() {
  if (elements.body.dataset.inputMode === "write" && window.matchMedia("(pointer: fine)").matches) {
    elements.journalEditor.focus({ preventScroll: true });
  }
}

function copyCoverMaterial(target, source) {
  const style = getComputedStyle(source);
  for (const property of ["backgroundColor", "backgroundImage", "backgroundSize", "backgroundPosition", "backgroundRepeat"]) {
    target.style[property] = style[property];
  }
}

// Builds the stand-in book over the open layout, which must already be in place. `closedRect` is where
// the closed cover sits; `backdrop` is the colour behind the closed notebook.
function buildBookStage(closedRect, backdrop) {
  const spread = elements.journalSpread;
  const cover = elements.openCoverButton;
  const boardSource = spread.querySelector(".notebook-cover") || spread;
  const board = boardSource.getBoundingClientRect();
  const pages = $$(".paper-page", spread).filter((page) => page.offsetWidth).map((page) => ({ page, rect: page.getBoundingClientRect() }));
  if (!board.width || !pages.length) return null;
  const twoPages = pages.length > 1;
  const spineX = twoPages ? (pages[0].rect.right + pages[1].rect.left) / 2 : board.left;
  const block = { left: spineX, top: board.top, width: board.right - spineX, height: board.height };
  const rightPage = pages[pages.length - 1];
  // One scale for both axes, so the pages are never squashed on the way up; the cover may then be a
  // little wider than the pages under it, as a real cover is.
  const scale = closedRect.height / block.height;
  const leafWidth = closedRect.width / scale;

  const overlay = document.createElement("div");
  overlay.className = "book-overlay";
  overlay.setAttribute("aria-hidden", "true");
  const shade = document.createElement("div");
  shade.className = "book-overlay__backdrop";
  shade.style.backgroundColor = backdrop;

  const stage = document.createElement("div");
  stage.className = "book-stage";
  Object.assign(stage.style, {
    left: `${block.left}px`, top: `${block.top}px`, width: `${block.width}px`, height: `${block.height}px`,
    perspective: `${Math.round(block.width * 4)}px`, perspectiveOrigin: twoPages ? "0 50%" : "50% 50%",
  });

  // A page is styled by the spread around it (its mode, palette, illustration, which page shows on a
  // phone), so each copy sits in an unstyled element carrying the spread's class and attributes.
  const placePage = (parent, page, originX, originY) => {
    const holder = document.createElement("div");
    holder.className = "book-stage__page";
    Object.assign(holder.style, { left: `${page.rect.left - originX}px`, top: `${page.rect.top - originY}px`, width: `${page.rect.width}px`, height: `${page.rect.height}px` });
    const context = document.createElement("div");
    context.className = "journal-spread book-stage__context";
    Object.assign(context.dataset, spread.dataset);
    context.append(clonePageForFlip(page.page));
    holder.append(context);
    parent.append(holder);
  };

  const boardRight = document.createElement("div");
  boardRight.className = `book-stage__board${twoPages ? " book-stage__board--right" : ""}`;
  copyCoverMaterial(boardRight, boardSource);
  placePage(boardRight, rightPage, block.left, block.top);
  const cast = document.createElement("div");
  cast.className = "book-stage__cast";
  boardRight.append(cast);

  const leaf = document.createElement("div");
  leaf.className = "book-stage__leaf";
  leaf.style.width = `${leafWidth}px`;
  const front = document.createElement("div");
  front.className = "book-stage__face";
  const coverHolder = document.createElement("div");
  coverHolder.className = "book-stage__cover";
  Object.assign(coverHolder.style, {
    width: `${closedRect.width}px`, height: `${closedRect.height}px`,
    transform: `scale(${1 / scale})`,
  });
  const coverCopy = cover.cloneNode(true);
  coverCopy.removeAttribute("id");
  coverCopy.tabIndex = -1;
  coverHolder.append(coverCopy);
  const frontShade = document.createElement("div");
  frontShade.className = "book-stage__shade";
  coverHolder.append(frontShade);
  front.append(coverHolder);

  // The inside of the cover. Turned with the leaf, it lies flat to the left of the spine, where the left page is.
  const back = document.createElement("div");
  back.className = "book-stage__face book-stage__face--back";
  back.style.width = `${block.width}px`;
  copyCoverMaterial(back, boardSource);
  if (twoPages) placePage(back, pages[0], spineX - block.width, block.top);
  // Turned about its own centre and then with the leaf, the back face lies just left of the spine.
  const backShade = document.createElement("div");
  backShade.className = "book-stage__shade";
  back.append(backShade);
  leaf.append(front, back);

  stage.append(boardRight, leaf);
  overlay.append(shade, stage);

  const closedTransform = `translate(${closedRect.left - block.left}px, ${closedRect.top - block.top}px) scale(${scale})`;
  // Lying open at the closed size, centred on its spine where the closed notebook was.
  const centredX = twoPages ? closedRect.left + closedRect.width / 2 - block.left : closedRect.left - block.left;
  const openSmallTransform = `translate(${centredX}px, ${closedRect.top - block.top}px) scale(${scale})`;
  return { overlay, shade, stage, board: boardRight, leaf, cast, frontShade, backShade, closedTransform, openSmallTransform };
}

// Creates the timeline forwards (opening) or backwards (closing); every animation starts at once.
function createBookAnimations(book, reverse) {
  const t = BOOK_TIMELINE;
  const timing = ({ delay, duration }, easing) => ({
    delay: reverse ? t.total - delay - duration : delay,
    duration, easing, fill: "both", direction: reverse ? "reverse" : "normal",
  });
  const turnEasing = "cubic-bezier(0.36, 0.02, 0.22, 1)";
  return [
    book.stage.animate([
      { transform: book.closedTransform, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
      { transform: book.openSmallTransform, offset: 0.52, easing: "cubic-bezier(0.3, 0.05, 0.12, 1)" },
      { transform: "translate(0px, 0px) scale(1)" },
    ], timing(t.move, "linear")),
    book.leaf.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(-180deg)" }], timing(t.turn, turnEasing)),
    // Light: the cover darkens as it turns away, its inside brightens as it settles, and it shades the
    // first page while it is still low over it.
    book.frontShade.animate([{ opacity: 0 }, { opacity: 0.3, offset: 0.5 }, { opacity: 0.3 }], timing(t.turn, turnEasing)),
    book.backShade.animate([{ opacity: 0.32 }, { opacity: 0.32, offset: 0.5 }, { opacity: 0 }], timing(t.turn, turnEasing)),
    book.cast.animate([{ opacity: 0 }, { opacity: 0.55, offset: 0.16 }, { opacity: 0.18, offset: 0.5 }, { opacity: 0 }], timing(t.turn, turnEasing)),
    // The pages under the cover are square-cornered where the cover is rounded: at rest they would show
    // at its corners, so they come in only as the cover lifts.
    book.board.animate([{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1 }], timing(t.turn, turnEasing)),
    book.shade.animate([{ opacity: 1 }, { opacity: 0 }], timing(t.backdrop, "ease-in-out")),
    book.stage.animate([{ opacity: 1 }, { opacity: 0 }], timing(t.handOff, "linear")),
  ];
}

// The animations are made, and held at their first frame, as soon as the stand-in book is in the page:
// without them its plain styles would show for a frame or two (the cover at full size, an opaque
// backdrop). `start` lets them run and resolves when they have finished.
function holdBookStage(book, reverse) {
  const animations = createBookAnimations(book, reverse);
  animations.forEach((animation) => animation.pause());
  return {
    animations,
    start: () => {
      animations.forEach((animation) => animation.play());
      return Promise.all(animations.map((animation) => animation.finished));
    },
  };
}

// The first time the open notebook is drawn costs a few hundred milliseconds (its layout, paper and
// cover textures, the stand-in book), and in a click that shows as the cover sticking before it moves.
// So while the closed cover is on screen and nothing else happens, all of it is prepared underneath:
// the open layout, and the stand-in book posed exactly as the closed cover, with its animations made
// and held at their first frame. The click then only has to let them run.
let preparedBook = null;
let prepareBookTimer = 0;
// Where the closed cover sits, remembered from the last opening so closing need not lay out the closed
// notebook again while the window keeps its size.
let closedCoverGeometry = null;

function rememberClosedCover(rect, backdrop) {
  closedCoverGeometry = { rect, backdrop, width: window.innerWidth, height: window.innerHeight };
}

function scheduleBookPreparation(delay = 700) {
  window.clearTimeout(prepareBookTimer);
  prepareBookTimer = window.setTimeout(() => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(prepareNotebookOpening, { timeout: 1200 });
    else prepareNotebookOpening();
  }, delay);
}

function prepareNotebookOpening() {
  if (preparedBook || elements.body.dataset.book !== "closed") return;
  const cover = elements.openCoverButton;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof cover?.animate !== "function") return;
  const closedRect = cover.getBoundingClientRect();
  if (!closedRect.width) return;
  const backdrop = getComputedStyle(elements.body).backgroundColor;
  const coverHadFocus = document.activeElement === cover;
  rememberClosedCover(closedRect, backdrop);

  elements.body.classList.add("is-book-settling", "is-cover-leaving");
  elements.body.dataset.book = "open";
  elements.journalSpread.classList.add("is-opened-once");
  $(".view-stage").scrollTop = 0;
  const book = buildBookStage(closedRect, backdrop);
  if (!book) {
    elements.body.dataset.book = "closed";
    elements.body.classList.remove("is-cover-leaving");
    settleBookState();
    return;
  }
  // Until it opens, the stand-in cover is the cover: it takes the clicks, the keys and the focus, and the
  // notebook under it cannot be reached.
  const inertNodes = [...elements.body.children].filter((node) => node !== book.overlay && !node.inert && node.tagName !== "SCRIPT");
  inertNodes.forEach((node) => { node.inert = true; });
  book.overlay.classList.add("is-prepared");
  book.overlay.removeAttribute("aria-hidden");
  Object.assign(book.leaf, { tabIndex: 0 });
  book.leaf.setAttribute("role", "button");
  book.leaf.setAttribute("aria-label", cover.getAttribute("aria-label") || "打开手帐封面");
  book.leaf.addEventListener("click", openNotebook);
  book.leaf.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openNotebook();
  });
  elements.body.append(book.overlay);
  const { animations } = holdBookStage(book, false);
  preparedBook = { book, animations, inertNodes };
  if (coverHadFocus) book.leaf.focus({ preventScroll: true });
  settleBookState();
}

// Puts the real closed cover back, for a new window size or new content; it is prepared again later.
function discardPreparedBook() {
  if (!preparedBook) return;
  const { book, animations, inertNodes } = preparedBook;
  preparedBook = null;
  const hadFocus = document.activeElement === book.leaf;
  animations.forEach((animation) => animation.cancel());
  inertNodes.forEach((node) => { node.inert = false; });
  book.overlay.remove();
  elements.body.classList.add("is-book-settling");
  elements.body.classList.remove("is-cover-leaving");
  elements.body.dataset.book = "closed";
  settleBookState();
  if (hadFocus) elements.openCoverButton.focus({ preventScroll: true });
  scheduleBookPreparation();
}

function openNotebook() {
  if (preparedBook) {
    openPreparedNotebook();
    return;
  }
  if (elements.body.dataset.book === "open" || elements.body.dataset.book === "opening") return;
  window.clearTimeout(prepareBookTimer);
  rememberCoverOpened();
  const cover = elements.openCoverButton;
  const closedRect = cover?.getBoundingClientRect();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !closedRect?.width || typeof cover.animate !== "function") {
    openNotebookWithoutCover();
    focusEditorAfterOpening();
    introduceSamplePage();
    return;
  }
  const backdrop = getComputedStyle(elements.body).backgroundColor;
  rememberClosedCover(closedRect, backdrop);

  elements.body.classList.add("is-book-settling", "is-cover-leaving");
  elements.body.dataset.book = "open";
  elements.journalSpread.classList.add("is-opened-once");
  $(".view-stage").scrollTop = 0;
  const book = buildBookStage(closedRect, backdrop);
  if (!book) {
    elements.body.classList.remove("is-cover-leaving");
    settleBookState();
    focusEditorAfterOpening();
    return;
  }
  elements.body.append(book.overlay);
  const held = holdBookStage(book, false);
  const finish = finishOpeningOnce(book);
  // Two frames: the open layout and the stand-in book are painted while still, before anything moves.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (!finish.done) held.start().then(finish, finish);
  }));
  // Frames do not run while the page is hidden; the notebook must never stay covered.
  window.setTimeout(finish, BOOK_TIMELINE.total + 1000);
}

function openPreparedNotebook() {
  const { book, animations, inertNodes } = preparedBook;
  preparedBook = null;
  rememberCoverOpened();
  book.overlay.classList.remove("is-prepared");
  book.overlay.setAttribute("aria-hidden", "true");
  book.leaf.removeAttribute("role");
  book.leaf.removeAttribute("tabindex");
  // The notebook becomes reachable once it is open: changing that now restyles the whole page in the
  // first frame of the turn.
  const finish = finishOpeningOnce(book, () => inertNodes.forEach((node) => { node.inert = false; }));
  animations.forEach((animation) => animation.play());
  Promise.all(animations.map((animation) => animation.finished)).then(finish, finish);
  window.setTimeout(finish, BOOK_TIMELINE.total + 1000);
}

function finishOpeningOnce(book, beforeFocus) {
  const finish = () => {
    if (finish.done) return;
    finish.done = true;
    book.overlay.remove();
    beforeFocus?.();
    // is-cover-opened keeps the arrival animations off: removing the suppression would start them now.
    elements.body.classList.add("is-cover-opened");
    elements.body.classList.remove("is-cover-leaving", "is-book-settling");
    focusEditorAfterOpening();
    introduceSamplePage();
  };
  finish.done = false;
  return finish;
}

function closeNotebook() {
  if (elements.body.dataset.book !== "open" || elements.body.classList.contains("is-cover-leaving")) return;
  settlePageTurn();
  closeMobilePanel();
  if (elements.body.classList.contains("is-focus-mode")) toggleFocusMode(false);
  const cover = elements.openCoverButton;
  const showClosed = () => {
    flushState();
    elements.body.classList.add("is-book-settling");
    elements.body.dataset.book = "closed";
    settleBookState();
    cover?.focus({ preventScroll: true });
    scheduleBookPreparation();
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof cover?.animate !== "function") {
    showClosed();
    return;
  }

  // Where the cover will rest, and the colour behind it. Unless the window changed size since it was
  // last open, both are known; otherwise they are read from the closed layout and switched back within
  // the same task, so it is laid out once but never painted.
  let closedRect;
  let backdrop;
  const known = closedCoverGeometry;
  if (known && known.width === window.innerWidth && known.height === window.innerHeight) {
    ({ rect: closedRect, backdrop } = known);
  } else {
    elements.body.classList.add("is-book-settling");
    elements.body.dataset.book = "closed";
    closedRect = cover.getBoundingClientRect();
    backdrop = getComputedStyle(elements.body).backgroundColor;
    elements.body.dataset.book = "open";
    rememberClosedCover(closedRect, backdrop);
  }
  const book = closedRect.width ? buildBookStage(closedRect, backdrop) : null;
  if (!book) {
    showClosed();
    return;
  }
  elements.body.append(book.overlay);
  const held = holdBookStage(book, true);
  elements.body.classList.add("is-cover-leaving");

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    // The backdrop is opaque and the stand-in cover rests exactly where the real one will be drawn.
    elements.body.classList.add("is-book-settling");
    elements.body.dataset.book = "closed";
    cover.focus({ preventScroll: true });
    settleBookState(() => {
      book.overlay.remove();
      elements.body.classList.remove("is-cover-leaving");
      scheduleBookPreparation();
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (finished) return;
    held.start().then(finish, finish);
    // Saved once the cover is already moving: the turn runs off the main thread, the save on it.
    flushState();
  }));
  window.setTimeout(() => { if (!finished) flushState(); finish(); }, BOOK_TIMELINE.total + 1000);
}

function appendEmptyState(parent, text, tagName = "li") {
  const empty = document.createElement(tagName);
  empty.className = "empty-state";
  empty.textContent = text;
  parent.append(empty);
}

function currentEntry() {
  const key = state.selectedDate;
  if (!state.entries[key]) {
    state.entries[key] = createEntry(key);
  }
  normalizeEntry(state.entries[key], key);
  return state.entries[key];
}

function createEntry(key) {
  const date = parseDate(key);
  return {
    title: defaultDayTitle(key),
    bookmarked: false,
    mode: "daily",
    mood: "",
    text: "",
    html: "",
    focus: "",
    // No example tasks: a new page starts empty and the input carries the suggestion instead.
    tasks: [],
    tags: [],
    fragments: [],
    bullets: [],
    photos: [],
    metrics: { energy: 3, stress: 2, sleep: 7 },
    stamp: "",
    pageStyle: state?.pageStyle || "dot",
    pagePalette: "shiro",
    pageAccent: "#667b72",
    pageIllustration: state?.pageIllustration || "botanical",
    habits: { water: false, sleep: false, move: false, read: false },
    week: {},
    modules: {},
    stickers: [],
    ink: "",
    strokes: [],
    versions: [],
  };
}

function normalizeEntry(entry, key) {
  const fresh = createEntry(key);
  for (const [field, value] of Object.entries(fresh)) {
    if (entry[field] === undefined) entry[field] = value;
  }
  if (!Array.isArray(entry.tags)) entry.tags = [];
  if (!Array.isArray(entry.fragments)) entry.fragments = [];
  if (!Array.isArray(entry.bullets)) entry.bullets = [];
  if (!Array.isArray(entry.photos)) entry.photos = [];
  // A media reference stands in for strokes until it is loaded from IndexedDB.
  if (!Array.isArray(entry.strokes) && !isMediaRef(entry.strokes)) entry.strokes = [];
  if (!Array.isArray(entry.versions)) entry.versions = [];
  if (!entry.metrics) entry.metrics = fresh.metrics;
  if (entry.stamp === undefined) entry.stamp = "";
  if (!entry.habits) entry.habits = fresh.habits;
  if (!entry.modules || typeof entry.modules !== "object") entry.modules = {};
  if (!entry.html && entry.text) entry.html = escapeHtml(entry.text).replace(/\n/g, "<br>");
  if (entry.mode === "bullet" && isLegacyBulletScaffold(entry.text || plainTextFromHtml(entry.html || ""))) {
    entry.text = "";
    entry.html = "";
  }
  ensurePageGroups(entry, key);
  const legacyTitle = `${parseDate(key).getMonth() + 1}月${parseDate(key).getDate()}日手帐`;
  [entry, ...entry.pageGroups].forEach((page) => {
    if (page.title === legacyTitle) page.title = defaultDayTitle(key);
    if (page.mode === "weekly" && /^\d+\/\d+ - \d+\/\d+ · 周计划$/.test(page.title || "")) page.title = defaultWeekTitle(key);
  });
  stripLegacyDateScaffold(entry);
  entry.pageGroups.forEach((group) => stripLegacyDateScaffold(group));
}

function stripLegacyDateScaffold(page) {
  const text = (page.text || plainTextFromHtml(page.html || "")).trim();
  const generated = {
    monthly: "本月想记住：\n\n重要日期：\n\n暂不安排：",
    weekly: "本周主题：\n\n想留白的时间：\n\n周末回看：",
  };
  const legacyFocus = {
    monthly: "给这个月留一条清楚的主线",
    weekly: "安排节奏，不把每天塞满",
  };
  if (generated[page.mode] && text === generated[page.mode]) {
    page.text = "";
    page.html = "";
  }
  if (legacyFocus[page.mode] && page.focus === legacyFocus[page.mode]) page.focus = "";
  if (page.mode === "monthly" && Array.isArray(page.tags)) page.tags = page.tags.filter((tag) => tag !== "月间");
  if (page.mode === "weekly" && Array.isArray(page.tags)) page.tags = page.tags.filter((tag) => tag !== "周计划");
}

function clonePageValue(value) {
  if (value === undefined || value === null) return value;
  return JSON.parse(JSON.stringify(value));
}

function pageScopeForMode(mode = "daily") {
  if (mode === "monthly") return "month";
  if (mode === "weekly") return "week";
  return "day";
}

function rememberPageGroup(entry, index = entry.activePageGroup || 0) {
  const group = entry.pageGroups?.[index];
  if (!group) return;
  if (!entry.lastPageGroupByScope || typeof entry.lastPageGroupByScope !== "object") {
    entry.lastPageGroupByScope = {};
  }
  entry.lastPageGroupByScope[pageScopeForMode(group.mode)] = group.id;
}

function findLastPageGroupIndex(entry, predicate) {
  for (let index = entry.pageGroups.length - 1; index >= 0; index -= 1) {
    if (predicate(entry.pageGroups[index], index)) return index;
  }
  return -1;
}

function findPageGroupForScale(entry, scale, key = state.selectedDate) {
  const wantedScope = scale === "month" ? "month" : scale === "week" ? "week" : "day";
  const rememberedId = entry.lastPageGroupByScope?.[wantedScope];
  let index = entry.pageGroups.findIndex(
    (group) => group.id === rememberedId && pageScopeForMode(group.mode) === wantedScope,
  );
  if (index >= 0) {
    if (wantedScope !== "day" || hasUserContent(entry.pageGroups[index], key)) return index;
    const meaningful = findLastPageGroupIndex(entry,
      (group) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, key),
    );
    if (meaningful >= 0) return meaningful;
    return index;
  }

  const activeIndex = entry.activePageGroup || 0;
  if (pageScopeForMode(entry.pageGroups[activeIndex]?.mode) === wantedScope) {
    if (wantedScope !== "day" || hasUserContent(entry.pageGroups[activeIndex], key)) return activeIndex;
    const meaningful = findLastPageGroupIndex(entry,
      (group) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, key),
    );
    if (meaningful >= 0) return meaningful;
    return activeIndex;
  }

  if (wantedScope === "day") {
    index = findLastPageGroupIndex(entry,
      (group) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, key),
    );
    if (index >= 0) return index;
  }
  index = entry.pageGroups.findIndex((group) => pageScopeForMode(group.mode) === wantedScope);
  return index;
}

function capturePageGroup(entry, existing = {}) {
  const group = {
    id: existing.id || crypto.randomUUID(),
    createdAt: existing.createdAt || new Date().toISOString(),
  };
  PAGE_GROUP_FIELDS.forEach((field) => {
    group[field] = clonePageValue(entry[field]);
  });
  return group;
}

function ensurePageGroups(entry, key) {
  if (!Array.isArray(entry.pageGroups) || !entry.pageGroups.length) {
    entry.pageGroups = [capturePageGroup(entry)];
  }
  entry.pageGroups = entry.pageGroups.filter((group) => group && typeof group === "object");
  if (!entry.pageGroups.length) entry.pageGroups.push(capturePageGroup(entry));
  entry.pageGroups.forEach((group) => {
    if (!group.id) group.id = crypto.randomUUID();
    if (!group.createdAt) group.createdAt = new Date().toISOString();
    const fresh = createEntry(key);
    PAGE_GROUP_FIELDS.forEach((field) => {
      if (group[field] === undefined) group[field] = clonePageValue(fresh[field]);
    });
  });
  const index = Number(entry.activePageGroup);
  entry.activePageGroup = Number.isInteger(index)
    ? Math.min(Math.max(index, 0), entry.pageGroups.length - 1)
    : 0;
  if (!entry.lastPageGroupByScope || typeof entry.lastPageGroupByScope !== "object") {
    entry.lastPageGroupByScope = {};
  }
  rememberPageGroup(entry, entry.activePageGroup);
}

function applyPageGroup(entry, group, key) {
  const fresh = createEntry(key);
  PAGE_GROUP_FIELDS.forEach((field) => {
    entry[field] = clonePageValue(group[field] === undefined ? fresh[field] : group[field]);
  });
  const index = entry.pageGroups?.findIndex((candidate) => candidate.id === group.id) ?? -1;
  if (index >= 0) rememberPageGroup(entry, index);
}

function syncPageGroup(entry, key) {
  if (!entry) return;
  ensurePageGroups(entry, key);
  const index = entry.activePageGroup || 0;
  entry.pageGroups[index] = capturePageGroup(entry, entry.pageGroups[index]);
}

function syncCurrentPageGroup() {
  const entry = state.entries?.[state.selectedDate];
  if (entry) syncPageGroup(entry, state.selectedDate);
}

function syncAllPageGroups() {
  Object.entries(state.entries || {}).forEach(([key, entry]) => {
    normalizeEntry(entry, key);
    syncPageGroup(entry, key);
  });
}

function pageHistoryKey() {
  const entry = currentEntry();
  return `${state.selectedDate}:${entry.pageGroups?.[entry.activePageGroup || 0]?.id || 0}`;
}

function plainTextFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.textContent || "";
}

function isLegacyBulletScaffold(text) {
  const compact = (text || "")
    .replace(/\s+/g, " ")
    .replace(/・/g, " ")
    .trim();
  return /^Key\s+•\s*任务\s*○\s*事件\s*-\s*笔记\s*>\s*迁移\s*Daily Log\s*•\s*○\s*-\s*Collection$/i.test(compact);
}

const WEEKDAY_NAMES = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

// "10月21日", for messages; dates are never shown in their stored form (2026-10-21).
function shortDateLabel(key) {
  const date = parseDate(key);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function defaultDayTitle(key) {
  const date = parseDate(key);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${WEEKDAY_NAMES[date.getDay()]}`;
}

// Titles the app generated for a day page: old ("10月16日手帐"), current ("10月16日 星期五"), or a continuation.
function isDefaultDayTitle(title) {
  return /^\d+月\d+日手帐$/.test(title || "")
    || /^\d+月\d+日 星期[一二三四五六日]$/.test(title || "")
    || /^\d+月\d+日 · 续页 \d+$/.test(title || "");
}

// One spelling for a week everywhere: "10月12日–18日", or "10月26日–11月1日" across months.
function weekRangeText(weekStartKey) {
  const start = parseDate(weekStartKey);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const endLabel = end.getMonth() === start.getMonth() ? `${end.getDate()}日` : `${end.getMonth() + 1}月${end.getDate()}日`;
  return `${start.getMonth() + 1}月${start.getDate()}日–${endLabel}`;
}

function defaultWeekTitle(weekStartKey) {
  return `${weekRangeText(weekStartKey)} · 周计划`;
}

// The top bar names the date in the app's own format; the native date field differs by
// browser and system language (e.g. 16/10/2026), so it stays underneath as the picker.
function renderTopDate() {
  if (!elements.topDateText) return;
  const key = calendarFocusKey();
  const date = parseDate(key);
  const scope = pageScopeForMode(currentEntry().mode);
  const year = key.slice(0, 4) === todayKey().slice(0, 4) ? "" : `${date.getFullYear()}年`;
  let text = `${year}${date.getMonth() + 1}月${date.getDate()}日 ${WEEKDAY_NAMES[date.getDay()].replace("星期", "周")}`;
  if (scope === "month") text = `${date.getFullYear()}年${date.getMonth() + 1}月`;
  if (scope === "week") text = `${year}${weekRangeText(calendarStorageKey("week", key))}`;
  elements.topDateText.textContent = text;
  if (elements.todayButton) {
    const scale = scope === "month" ? "month" : scope === "week" ? "week" : "day";
    const onToday = calendarStorageKey(scale, key) === calendarStorageKey(scale, todayKey());
    elements.todayButton.hidden = onToday;
    if (elements.footerTodayButton) elements.footerTodayButton.hidden = onToday;
  }
}

function goToToday() {
  settlePageTurn();
  const scope = pageScopeForMode(currentEntry().mode);
  navigateToCalendarPage(todayKey(), scope === "month" ? "month" : scope === "week" ? "week" : "day");
}

function formatDateLabel(key) {
  const date = parseDate(key);
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

function setView(view) {
  pulsePage();
  elements.body.dataset.view = view;
  const titles = {
    today: "今日手帐",
    planner: "周计划",
    library: "素材库",
    open: "设置与数据",
  };
  elements.pageHeading.textContent = titles[view] || titles.today;
  if (view === "today") renderCalendarScaleNavigation();

  $$("[data-view-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === view);
  });

  if (view === "library") openMobilePanel("stickers");
  if (view === "open") openMobilePanel("open");
}

function loadEntryIntoForm() {
  const entry = currentEntry();
  const focusedDate = calendarFocusKey();
  elements.datePicker.value = focusedDate;
  elements.topDatePicker.value = focusedDate;
  renderTopDate();
  elements.entryTitle.value = entry.title;
  elements.moodSelect.value = entry.mood || "";
  elements.journalEditor.innerHTML = sanitizeEditorHtml(entry.html || "");
  refreshEditorHint();
  // A page with nothing written is truly empty, not an empty paragraph the caret cannot enter.
  if (elements.journalEditor.classList.contains("is-blank")) elements.journalEditor.replaceChildren();
  elements.journalText.value = entry.text || "";
  elements.focusInput.value = entry.focus;
  elements.modeFocusInput.value = entry.focus;
  elements.dateLabel.textContent = formatDateLabel(state.selectedDate);
  renderPageGroupNavigation();
  renderCalendar();
  renderTasks();
  renderHabits();
  renderWeek();
  renderTags();
  renderFragments();
  renderBullets();
  renderPhotos();
  renderMetrics();
  renderHealth();
  renderStamp();
  renderMode();
  setMobilePage(defaultMobilePage(entry.mode));
  renderPageAppearance();
  renderDayPageShelf();
  renderLinkedPlans();
  renderOnThisDay();
  renderCustomTemplates();
  renderStickers();
  scheduleStats();
  renderSearch();
  renderPlusPanel();
  renderPageHistory();
  renderMood();
  renderDailyPrompt();
  restoreInk();
}

// A day entry can also hold the week or month plan that starts on it. Navigation, counts and
// page numbers only cover pages of the kind being shown, so a diary never turns into a plan.
function scopedGroupIndexes(entry, scope) {
  return entry.pageGroups
    .map((group, index) => (pageScopeForMode(group.mode) === scope ? index : -1))
    .filter((index) => index >= 0);
}

// Each page group is a spread of two numbered pages: position 0 is pages 1–2.
function pageRangeLabel(position) {
  return `${position * 2 + 1}–${position * 2 + 2}`;
}

function stepPageGroup(step) {
  const entry = currentEntry();
  const index = entry.activePageGroup || 0;
  const scoped = scopedGroupIndexes(entry, pageScopeForMode(entry.pageGroups[index]?.mode || entry.mode));
  const target = scoped[scoped.indexOf(index) + step];
  if (target !== undefined) selectPageGroup(target);
}

// CJK characters count one each, other scripts count by word, as in most Chinese editors.
function countWords(text) {
  const cjk = /[\u3400-\u9fff\uf900-\ufaff]/g;
  const characters = (text.match(cjk) || []).length;
  const words = (text.replace(cjk, " ").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
  return characters + words;
}

function renderSpreadScope(scope = pageScopeForMode(currentEntry().mode)) {
  if (!elements.spreadScopeLabel) return;
  const date = parseDate(state.selectedDate);
  const label = scope === "month" ? `${date.getMonth() + 1}月计划` : scope === "week" ? "本周计划" : `${date.getMonth() + 1}月${date.getDate()}日`;
  const words = countWords(currentEntry().text || "");
  // On phones the top bar already shows the date, so the footer keeps only the count there.
  elements.spreadScopeLabel.innerHTML = `<span class="spread-scope__date">${escapeHtml(label)}</span>${words ? `<span class="spread-scope__words">${words} 字</span>` : ""}`;
}

function renderPageGroupNavigation() {
  const entry = currentEntry();
  const index = entry.activePageGroup || 0;
  const mode = entry.pageGroups[index]?.mode || entry.mode || "daily";
  const scope = pageScopeForMode(mode);
  const scoped = scopedGroupIndexes(entry, scope);
  const position = Math.max(0, scoped.indexOf(index));
  const total = Math.max(1, scoped.length);
  const leftPage = position * 2 + 1;
  const rightPage = leftPage + 1;
  renderSpreadScope(scope);
  if (elements.spreadPosition) {
    const label = LAYOUT_LABELS[mode] || MODE_COPY[mode]?.editorLabel || "自由内页";
    elements.spreadPosition.textContent = `${pageRangeLabel(position)} / ${total * 2} 页`;
    elements.spreadPosition.title = label;
  }

  if (elements.leftPageNumber) elements.leftPageNumber.textContent = String(leftPage).padStart(3, "0");
  if (elements.rightPageNumber) elements.rightPageNumber.textContent = String(rightPage).padStart(3, "0");
  if (elements.prevSpreadButton) elements.prevSpreadButton.disabled = position === 0;
  if (elements.nextSpreadButton) elements.nextSpreadButton.disabled = position >= total - 1;
  if (elements.addSpreadButton) {
    // Plans are one spread per week or month; adding pages belongs to diary days.
    elements.addSpreadButton.hidden = scope !== "day";
    elements.addSpreadButton.disabled = false;
    elements.addSpreadButton.setAttribute("aria-label", `在后面续两页，当前第 ${pageRangeLabel(position)} 页，共 ${total * 2} 页`);
  }
  if (elements.bookmarkPageButton) {
    const label = entry.bookmarked ? "移除当前内页书签" : "为当前内页添加书签";
    elements.bookmarkPageButton.setAttribute("aria-pressed", String(Boolean(entry.bookmarked)));
    elements.bookmarkPageButton.setAttribute("aria-label", label);
    elements.bookmarkPageButton.title = label;
    elements.bookmarkPageButton.disabled = pageTurnInProgress;
  }
}

function togglePageBookmark() {
  currentEntry().bookmarked = !currentEntry().bookmarked;
  persistState();
  renderPageGroupNavigation();
  renderSearch();
  scheduleStats();
  notify(currentEntry().bookmarked ? "已夹入书签" : "已移除书签");
}

function linkedPlansForDate(key) {
  const links = [];
  for (const scale of ["week", "month"]) {
    const sourceKey = calendarStorageKey(scale, key);
    const source = state.entries[sourceKey];
    if (!source) continue;
    pageGroupsForRead(source, sourceKey).forEach((group, index) => {
      if (pageScopeForMode(group.mode) !== scale) return;
      const text = scale === "week" ? group.week?.[key] : group.modules?.monthly?.priorities;
      if (String(text || "").trim()) links.push({ key: sourceKey, index, scale, text: String(text) });
    });
  }
  return links;
}

function renderLinkedPlans() {
  if (!elements.linkedPlans) return;
  const originKey = state.selectedDate;
  const links = pageScopeForMode(currentEntry().mode) === "day" ? linkedPlansForDate(state.selectedDate) : [];
  elements.linkedPlans.hidden = !links.length;
  elements.linkedPlansMeta.textContent = links.length ? `${links.length} 条` : "";
  elements.linkedPlansList.replaceChildren();
  links.forEach(({ key, index, scale, text }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<small>${scale === "week" ? "周计划 · 当天安排" : "月计划 · 本月重点"}</small><span>${escapeHtml(text)}</span><svg aria-hidden="true"><use href="#icon-redo"></use></svg>`;
    button.title = scale === "week" ? "打开原周计划" : "打开原月计划";
    button.addEventListener("click", () => openPageGroupForDate(key, index, { focusDate: originKey }));
    elements.linkedPlansList.append(button);
  });
}

// Day One style "On this day": earlier years' day pages for the same date, only when they have content.
function onThisDayPages(key) {
  const selected = parseDate(key);
  const pages = [];
  for (let offset = 1; offset <= 10; offset += 1) {
    const date = new Date(selected);
    date.setFullYear(selected.getFullYear() - offset);
    if (date.getDate() !== selected.getDate()) continue;
    const pastKey = toDateKey(date);
    const entry = state.entries[pastKey];
    if (!entry) continue;
    const index = pageGroupsForRead(entry, pastKey).findIndex((group) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, pastKey));
    if (index < 0) continue;
    const group = entry.pageGroups[index];
    const text = plainTextFromHtml(group.html || "").trim() || group.text?.trim() || group.focus?.trim() || "";
    const excerpt = text.replace(/\s+/g, " ").slice(0, 80) || (group.photos?.length ? `${group.photos.length} 张照片` : group.strokes?.length ? "手写记录" : "");
    pages.push({ key: pastKey, index, years: offset, title: group.title || "", excerpt });
  }
  return pages;
}

function renderOnThisDay() {
  if (!elements.onThisDay) return;
  const pages = pageScopeForMode(currentEntry().mode) === "day" ? onThisDayPages(state.selectedDate) : [];
  elements.onThisDay.hidden = !pages.length;
  elements.onThisDayMeta.textContent = pages.length ? `${pages.length} 年` : "";
  elements.onThisDayList.replaceChildren();
  pages.forEach(({ key, index, years, title, excerpt }) => {
    const button = document.createElement("button");
    button.type = "button";
    const then = parseDate(key);
    button.innerHTML = `<small>${years} 年前 · ${then.getFullYear()}年 ${WEEKDAY_NAMES[then.getDay()]}</small><span>${escapeHtml(excerpt || title || "打开那一天")}</span><svg aria-hidden="true"><use href="#icon-redo"></use></svg>`;
    button.title = `打开${shortDateLabel(key)}的日页`;
    button.addEventListener("click", () => {
      elements.onThisDay.open = false;
      openPageGroupForDate(key, index);
    });
    elements.onThisDayList.append(button);
  });
}

function renderDayPageShelf() {
  if (!elements.dayPageShelfList || !elements.dayPageShelfMeta) return;
  const key = calendarStorageKey("day", calendarFocusKey());
  const date = parseDate(key);
  const entry = state.entries[key];
  elements.dayPageShelfList.replaceChildren();
  if (elements.recordPageCategory) {
    elements.recordPageCategory.textContent = `追加到 ${date.getMonth() + 1}月${date.getDate()}日`;
  }
  if (!entry) {
    elements.dayPageShelfMeta.textContent = `${date.getMonth() + 1}月${date.getDate()}日 · 还没有内页`;
    const empty = document.createElement("span");
    empty.className = "day-page-shelf__empty";
    empty.textContent = "还没有记录内页";
    elements.dayPageShelfList.append(empty);
    return;
  }

  normalizeEntry(entry, key);
  const dayPages = entry.pageGroups
    .map((group, index) => ({ group, index }))
    .filter(({ group }) => pageScopeForMode(group.mode) === "day");
  elements.dayPageShelfMeta.textContent = `${date.getMonth() + 1}月${date.getDate()}日 · 共 ${dayPages.length * 2} 页`;
  dayPages.forEach(({ group, index }, shelfIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-page-shelf__item";
    button.classList.toggle("is-active", key === state.selectedDate && index === (entry.activePageGroup || 0));
    const label = LAYOUT_LABELS[group.mode] || MODE_COPY[group.mode]?.editorLabel || "自由内页";
    button.innerHTML = `<span>${pageRangeLabel(shelfIndex)}</span><strong>${escapeHtml(label)}</strong>`;
    button.setAttribute("aria-label", `打开${shortDateLabel(key)}的${label}`);
    button.addEventListener("click", () => openPageGroupForDate(key, index));
    elements.dayPageShelfList.append(button);
  });
}

function renderStamp() {
  const entry = currentEntry();
  const stampMap = {
    sunny: "晴",
    calm: "静",
    busy: "忙",
    tired: "休",
    spark: "灵",
    low: "雨",
    tense: "紧",
  };
  elements.dailyStampIcon.textContent = entry.stamp || stampMap[entry.mood] || "印";
  elements.dailyStampButton.classList.toggle("is-stamped", Boolean(entry.stamp));
}

function applyDailyStamp() {
  const entry = currentEntry();
  const options = ["晴", "静", "书", "行", "休", "灵", "毕"];
  const current = options.indexOf(entry.stamp);
  entry.stamp = options[(current + 1) % options.length];
  renderStamp();
  scheduleStats();
  notify(`已盖今日印章：${entry.stamp}`);
  persistState();
}

function migrateOpenTasks() {
  const entry = currentEntry();
  const openTasks = entry.tasks.filter((task) => !task.done && !DEFAULT_TASK_TEXTS.includes(task.text));
  if (!openTasks.length) {
    elements.workflowNote.textContent = "今天没有未完成任务。";
    notify("今天没有需要迁移的任务");
    return;
  }
  const next = parseDate(state.selectedDate);
  next.setDate(next.getDate() + 1);
  const nextKey = toDateKey(next);
  if (!state.entries[nextKey]) state.entries[nextKey] = createEntry(nextKey);
  normalizeEntry(state.entries[nextKey], nextKey);
  const nextEntry = state.entries[nextKey];
  openTasks.forEach((task) => {
    if (!nextEntry.tasks.some((candidate) => candidate.text === task.text)) {
      nextEntry.tasks.push({ id: crypto.randomUUID(), text: task.text, done: false, migratedFrom: state.selectedDate });
    }
  });
  entry.fragments.unshift({
    id: crypto.randomUUID(),
    text: `${openTasks.length} 个未完成任务已挪到${shortDateLabel(nextKey)}`,
    createdAt: new Date().toISOString(),
  });
  elements.workflowNote.textContent = `已把 ${openTasks.length} 个任务挪到${shortDateLabel(nextKey)}。`;
  renderFragments();
  renderCalendar();
  notify(`已迁移 ${openTasks.length} 个任务`);
  persistState();
}

function exportCurrentDay() {
  syncEntryFromForm();
  const payload = {
    date: state.selectedDate,
    entry: currentEntry(),
    health: state.health?.summaries?.[state.selectedDate] || null,
    exportedAt: new Date().toISOString(),
  };
  downloadJson(payload, `openpages-day-${state.selectedDate}.json`);
  notify("已导出当前日页");
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function calendarScaleForMode(mode) {
  if (mode === "monthly") return "month";
  if (mode === "weekly") return "week";
  return "day";
}

function calendarFocusKey() {
  return state.calendarFocusDate || state.selectedDate || todayKey();
}

function calendarStorageKey(scale, focusKey = calendarFocusKey()) {
  const date = parseDate(focusKey);
  if (scale === "month") {
    date.setDate(1);
    return toDateKey(date);
  }
  if (scale === "week") return toDateKey(startOfWeek(date));
  return toDateKey(date);
}

function createCalendarPage(key, mode, appearance = {}) {
  const fresh = createEntry(key);
  fresh.mode = mode;
  fillEntryFromTemplate(fresh, modePresets()[mode]);
  const date = parseDate(key);
  if (mode === "monthly") fresh.title = `${date.getFullYear()}年${date.getMonth() + 1}月 · 月计划`;
  if (mode === "weekly") fresh.title = defaultWeekTitle(key);
  if (mode === "daily") fresh.title = defaultDayTitle(key);
  fresh.pageStyle = mode === "monthly" ? "grid" : mode === "weekly" ? "line" : appearance.pageStyle || state.pageStyle || "dot";
  fresh.pagePalette = appearance.pagePalette || "shiro";
  fresh.pageAccent = appearance.pageAccent || PAGE_PALETTES[fresh.pagePalette] || PAGE_PALETTES.shiro;
  fresh.pageIllustration = appearance.pageIllustration || state.pageIllustration || "botanical";
  return fresh;
}

function ensureCalendarPage(key, scale) {
  const mode = { month: "monthly", week: "weekly", day: "daily" }[scale] || "daily";
  const existing = state.entries[key];
  if (!existing) {
    const appearance = state.entries[state.selectedDate] || {};
    const fresh = createCalendarPage(key, mode, appearance);
    state.entries[key] = fresh;
    normalizeEntry(fresh, key);
    return { entry: fresh, index: 0, mode };
  }

  normalizeEntry(existing, key);
  syncPageGroup(existing, key);
  let index = findPageGroupForScale(existing, scale, key);
  if (index < 0) {
    const fresh = createCalendarPage(key, mode, existing);
    existing.pageGroups.push(capturePageGroup(fresh));
    index = existing.pageGroups.length - 1;
  }
  return { entry: existing, index, mode };
}

function activateCalendarPageForDate(key, scale) {
  const result = ensureCalendarPage(key, scale);
  result.entry.activePageGroup = result.index;
  applyPageGroup(result.entry, result.entry.pageGroups[result.index], key);
  return result;
}

function openPageGroupForDate(key, index, options = {}) {
  settlePageTurn();
  if (!key) return;
  syncEntryFromForm();
  const entry = state.entries[key];
  if (!entry) return;
  normalizeEntry(entry, key);
  const target = Math.min(Math.max(index, 0), entry.pageGroups.length - 1);
  state.calendarFocusDate = options.focusDate || key;
  if (key === state.selectedDate) {
    if ((entry.activePageGroup || 0) === target) {
      applyPageGroup(entry, entry.pageGroups[target], key);
      loadEntryIntoForm();
      persistState();
    } else {
      selectPageGroup(target);
    }
    closeMobilePanel();
    return;
  }
  entry.activePageGroup = target;
  applyPageGroup(entry, entry.pageGroups[target], key);
  selectDate(key);
  closeMobilePanel();
}

function navigateToCalendarPage(focusKey, scale = "day") {
  settlePageTurn();
  if (!focusKey) return;
  syncEntryFromForm();
  state.calendarFocusDate = focusKey;
  const targetKey = calendarStorageKey(scale, focusKey);
  const { entry, index, mode } = ensureCalendarPage(targetKey, scale);

  if (targetKey === state.selectedDate) {
    if ((entry.activePageGroup || 0) === index) {
      applyPageGroup(entry, entry.pageGroups[index], targetKey);
      loadEntryIntoForm();
      persistState();
    } else {
      selectPageGroup(index);
    }
  } else {
    entry.activePageGroup = index;
    applyPageGroup(entry, entry.pageGroups[index], targetKey);
    selectDate(targetKey);
  }

  // No toast: the page itself changes, and the top bar names the new date and scale.
}

function openCalendarScale(scale) {
  navigateToCalendarPage(calendarFocusKey(), scale);
}

function renderCalendarScaleNavigation(mode = currentEntry().mode) {
  const scale = calendarScaleForMode(mode);
  elements.calendarScaleButtons.forEach((button) => {
    const active = button.dataset.calendarScale === scale;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const labels = {
    month: ["上个月", "下个月", "月计划"],
    week: ["上一周", "下一周", "周计划"],
    day: ["前一天", "后一天", "今日手帐"],
  }[scale];
  elements.prevDayButton.title = labels[0];
  elements.prevDayButton.setAttribute("aria-label", labels[0]);
  elements.nextDayButton.title = labels[1];
  elements.nextDayButton.setAttribute("aria-label", labels[1]);
  if (elements.body.dataset.view === "today") elements.pageHeading.textContent = labels[2];
}

// Page turns are short and never block input. A new tap during a turn settles it at once
// (its final content is applied) and continues; taps in quick succession skip the animation,
// like flicking through paper.
const TURN_MS_WIDE = 460;
const TURN_MS_NARROW = 400;
const RUSH_WINDOW_MS = 650;
let pendingTurnCommit = null;
let lastRushAt = -Infinity;

function turnDurationNow() {
  return window.matchMedia("(max-width: 760px)").matches ? TURN_MS_NARROW : TURN_MS_WIDE;
}

function settlePageTurn() {
  if (!pageTurnInProgress) return false;
  clearTimeout(pageTurnSwapTimer);
  const commit = pendingTurnCommit;
  pendingTurnCommit = null;
  commit?.();
  lastRushAt = performance.now();
  finishPageTurn();
  return true;
}

// True when the person is moving through pages quickly; the next turn then happens without animation.
function isRushing() {
  const rushing = performance.now() - lastRushAt < RUSH_WINDOW_MS;
  if (rushing) lastRushAt = performance.now();
  return rushing;
}

function selectDate(key) {
  settlePageTurn();
  if (!key || key === state.selectedDate) return;
  syncEntryFromForm();
  pageTurnCompletion = null;
  const preservedMobilePage = mobilePageForTransition(currentEntry().mode, state.entries[key]?.mode || "daily", elements.journalSpread.dataset.mobilePage);
  const direction = key > state.selectedDate ? "forward" : "backward";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (elements.body.dataset.book !== "open" || reduceMotion || isRushing()) {
    commitSelectedDate(key);
    setMobilePage(preservedMobilePage);
    return;
  }

  const previousSpread = capturePageFlipSnapshot();
  commitSelectedDate(key);
  setMobilePage(preservedMobilePage);
  pageTurnInProgress = true;
  if (!startLeafTurn(direction, turnDurationNow(), previousSpread)) {
    pageTurnInProgress = false;
    return;
  }
  setDateNavigationDisabled(true);
}

function clonePageForFlip(source) {
  const clone = source.cloneNode(true);
  clone.classList.add("page-flip-engine__content");
  clone.setAttribute("aria-hidden", "true");
  clone.inert = true;
  clone.querySelectorAll("[id]").forEach((node) => {
    node.dataset.sourceId = node.id;
    node.removeAttribute("id");
  });
  clone.querySelectorAll("[contenteditable]").forEach((node) => node.setAttribute("contenteditable", "false"));

  const sourceFields = source.querySelectorAll("input, textarea, select");
  clone.querySelectorAll("input, textarea, select").forEach((field, index) => {
    const sourceField = sourceFields[index];
    field.disabled = true;
    // A file input's value can only be cleared; copying it throws once a file was picked.
    if (!sourceField || field.type === "file") return;
    field.value = sourceField.value;
    if ("checked" in field) field.checked = sourceField.checked;
    field.disabled = true;
  });

  const sourceCanvas = source.querySelector("canvas");
  const cloneCanvas = clone.querySelector("canvas");
  if (sourceCanvas && cloneCanvas) {
    cloneCanvas.width = sourceCanvas.width;
    cloneCanvas.height = sourceCanvas.height;
    cloneCanvas.getContext("2d")?.drawImage(sourceCanvas, 0, 0);
  }
  return clone;
}

function capturePageFlipSnapshot() {
  const spread = elements.journalSpread;
  const leftPage = spread?.querySelector(".paper-page--left");
  const rightPage = spread?.querySelector(".paper-page--right");
  if (!leftPage || !rightPage) return null;
  // The snapshot only feeds the turning animation; if it cannot be made, the plain transition is used.
  try {
    return {
      left: clonePageForFlip(leftPage),
      right: clonePageForFlip(rightPage),
      mobilePage: spread.dataset.mobilePage || "journal",
    };
  } catch {
    return null;
  }
}

// Page turn: one sheet turns around the spine, front = the page being left, back = the page it
// reveals. Copies of the pages it uncovers and lands on stay still underneath until it lands, so the
// live pages (already showing the new content) appear only when the turn completes. Only transform
// and opacity animate, on a few composited layers, through the Web Animations API, so it runs off
// the main thread and settles instantly when interrupted.
let leafTurnLayer = null;
let leafTurnAnimations = [];

function startLeafTurn(direction, duration, previous) {
  const spread = elements.journalSpread;
  if (!previous || typeof spread.animate !== "function") return false;
  const leftPage = spread.querySelector(".paper-page--left");
  const rightPage = spread.querySelector(".paper-page--right");
  const spreadRect = spread.getBoundingClientRect();
  const box = (page) => {
    const rect = page.getBoundingClientRect();
    return { x: rect.left - spreadRect.left, y: rect.top - spreadRect.top, w: rect.width, h: rect.height };
  };
  const leftBox = box(leftPage);
  const rightBox = box(rightPage);
  const visible = (b) => b.w > 1 && b.h > 1;
  const twoPages = visible(leftBox) && visible(rightBox) && rightBox.x >= leftBox.x + leftBox.w - 4;
  if (!visible(leftBox) && !visible(rightBox)) return false;

  const layer = document.createElement("div");
  layer.className = "leaf-turn";
  layer.setAttribute("aria-hidden", "true");
  const place = (node, b) => {
    node.style.left = `${b.x}px`;
    node.style.top = `${b.y}px`;
    node.style.width = `${b.w}px`;
    node.style.height = `${b.h}px`;
  };
  const sheet = (clone, b, extra = "") => {
    const node = document.createElement("div");
    node.className = `leaf-turn__sheet ${extra}`.trim();
    place(node, b);
    if (clone) node.append(clone);
    return node;
  };
  const face = (clone, back = false) => {
    const node = document.createElement("div");
    node.className = back ? "leaf-turn__face leaf-turn__face--back" : "leaf-turn__face";
    if (clone) node.append(clone);
    const shade = document.createElement("div");
    shade.className = "leaf-turn__shade";
    node.append(shade);
    return { node, shade };
  };
  const easing = "cubic-bezier(0.42, 0.06, 0.22, 1)";
  const timing = { duration, easing, fill: "both" };
  const animations = [];
  let leaf;
  let front;
  let back;
  let reveal;

  if (twoPages) {
    const forward = direction === "forward";
    // The page that stays put until the sheet lands on it, and the page the sheet uncovers.
    layer.append(sheet(forward ? previous.left : previous.right, forward ? leftBox : rightBox));
    reveal = sheet(null, forward ? rightBox : leftBox, `leaf-turn__reveal leaf-turn__reveal--${forward ? "right" : "left"}`);
    layer.append(reveal);
    leaf = sheet(null, forward ? rightBox : leftBox, `leaf-turn__leaf leaf-turn__leaf--${forward ? "right" : "left"}`);
    front = face(forward ? previous.right : previous.left);
    back = face(clonePageForFlip(forward ? leftPage : rightPage), true);
    leaf.append(front.node, back.node);
    layer.append(leaf);
    const end = forward ? -180 : 180;
    animations.push(leaf.animate([{ transform: "rotateY(0deg)" }, { transform: `rotateY(${end}deg)` }], timing));
  } else {
    // One page on screen: forward turns the old page away; backward brings the earlier page in.
    const target = visible(leftBox) ? leftBox : rightBox;
    const livePage = visible(leftBox) ? leftPage : rightPage;
    const previousVisible = previous.mobilePage === "ink" ? previous.right : previous.left;
    const forward = direction === "forward";
    if (!forward) layer.append(sheet(previousVisible, target));
    reveal = sheet(null, target, "leaf-turn__reveal leaf-turn__reveal--right");
    layer.append(reveal);
    leaf = sheet(null, target, "leaf-turn__leaf leaf-turn__leaf--right");
    front = face(forward ? previousVisible : clonePageForFlip(livePage));
    leaf.append(front.node);
    layer.append(leaf);
    const frames = forward
      ? [{ transform: "rotateY(0deg)", opacity: 1 }, { transform: "rotateY(-96deg)", opacity: 1, offset: 0.82 }, { transform: "rotateY(-110deg)", opacity: 0 }]
      : [{ transform: "rotateY(-110deg)", opacity: 0 }, { transform: "rotateY(-96deg)", opacity: 1, offset: 0.18 }, { transform: "rotateY(0deg)", opacity: 1 }];
    animations.push(leaf.animate(frames, timing));
  }

  // Shading follows the angle: the turning face darkens toward the spine, the uncovered page lightens.
  animations.push(front.shade.animate([{ opacity: 0 }, { opacity: 0.22, offset: 0.5 }, { opacity: 0.3 }], timing));
  if (back) animations.push(back.shade.animate([{ opacity: 0.3 }, { opacity: 0.22, offset: 0.5 }, { opacity: 0 }], timing));
  animations.push(reveal.animate([{ opacity: 0.55 }, { opacity: 0 }], timing));

  spread.append(layer);
  leafTurnLayer = layer;
  leafTurnAnimations = animations;
  animations[0].finished.then(() => {
    if (leafTurnLayer === layer) finishPageTurn();
  }).catch(() => {});
  // If the animation clock stalls, the copies must never stay drawn over the live page.
  pageTurnFallbackTimer = window.setTimeout(() => {
    if (leafTurnLayer === layer) finishPageTurn();
  }, duration + 400);
  return true;
}

function finishPageTurn() {
  if (!pageTurnInProgress) return;
  window.clearTimeout(pageTurnSwapTimer);
  if (pendingTurnCommit) {
    const commit = pendingTurnCommit;
    pendingTurnCommit = null;
    commit();
  }
  window.clearTimeout(pageTurnFallbackTimer);
  const animations = leafTurnAnimations;
  leafTurnAnimations = [];
  animations.forEach((animation) => animation.cancel());
  leafTurnLayer?.remove();
  leafTurnLayer = null;
  pageTurnInProgress = false;
  setDateNavigationDisabled(false);
  const completion = pageTurnCompletion;
  pageTurnCompletion = null;
  completion?.();
}

function commitSelectedDate(key) {
  state.selectedDate = key;
  loadEntryIntoForm();
  persistState();
}

function commitPageGroup(index) {
  const entry = state.entries[state.selectedDate];
  normalizeEntry(entry, state.selectedDate);
  const target = Math.min(Math.max(index, 0), entry.pageGroups.length - 1);
  entry.activePageGroup = target;
  applyPageGroup(entry, entry.pageGroups[target], state.selectedDate);
  selectedStickerId = null;
  loadEntryIntoForm();
  persistState();
}

function selectPageGroup(index, options = {}) {
  settlePageTurn();
  const entry = currentEntry();
  const previousIndex = entry.activePageGroup || 0;
  const targetIndex = Math.min(Math.max(index, 0), entry.pageGroups.length - 1);
  if (targetIndex === previousIndex) return;

  syncEntryFromForm();
  syncPageGroup(entry, state.selectedDate);
  const preservedMobilePage = mobilePageForTransition(entry.mode, entry.pageGroups[targetIndex].mode, elements.journalSpread.dataset.mobilePage);
  const direction = targetIndex > previousIndex ? "forward" : "backward";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const complete = () => {
    renderPageGroupNavigation();
    if (options.openPicker) openMobilePanel("templates");
  };
  if (elements.body.dataset.book !== "open" || reduceMotion || isRushing()) {
    commitPageGroup(targetIndex);
    setMobilePage(preservedMobilePage);
    complete();
    return;
  }

  const previousSpread = capturePageFlipSnapshot();
  commitPageGroup(targetIndex);
  setMobilePage(preservedMobilePage);
  pageTurnInProgress = true;
  pageTurnCompletion = complete;
  if (!startLeafTurn(direction, turnDurationNow(), previousSpread)) {
    pageTurnInProgress = false;
    pageTurnCompletion = null;
    complete();
    return;
  }
  setDateNavigationDisabled(true);
}

function addPageGroup() {
  settlePageTurn();
  syncEntryFromForm();
  const entry = currentEntry();
  if (pageScopeForMode(entry.mode) !== "day") {
    applyModeTemplate("daily");
    return;
  }
  syncPageGroup(entry, state.selectedDate);
  const date = parseDate(state.selectedDate);
  const fresh = createEntry(state.selectedDate);
  fresh.title = `${date.getMonth() + 1}月${date.getDate()}日 · 续页 ${entry.pageGroups.length + 1}`;
  fresh.tasks = [];
  fresh.pageStyle = entry.pageStyle || state.pageStyle || "dot";
  fresh.pagePalette = entry.pagePalette || "shiro";
  fresh.pageAccent = entry.pageAccent || PAGE_PALETTES.shiro;
  fresh.pageIllustration = entry.pageIllustration || state.pageIllustration || "botanical";
  entry.pageGroups.push(capturePageGroup(fresh));
  selectPageGroup(entry.pageGroups.length - 1, { openPicker: true });
  notify("已续两页，可以为它们选择内页样式");
}

// Navigation stays enabled during a turn (a tap settles it and moves on); only aria-busy reflects it.
function setDateNavigationDisabled(disabled) {
  elements.journalSpread.setAttribute("aria-busy", String(disabled));
  if (!disabled) renderPageGroupNavigation();
}

function shiftDate(days) {
  const scale = calendarScaleForMode(currentEntry().mode || "daily");
  const date = parseDate(calendarFocusKey());
  if (scale === "month") {
    const wantedDay = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + days);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(wantedDay, lastDay));
  } else {
    date.setDate(date.getDate() + (scale === "week" ? days * 7 : days));
  }
  navigateToCalendarPage(toDateKey(date), scale);
}

function syncEntryFromForm() {
  const entry = currentEntry();
  const values = {
    title: elements.entryTitle.value.trim() || (pageScopeForMode(entry.mode) === "day" ? defaultDayTitle(state.selectedDate) : "未命名手帐"),
    mood: elements.moodSelect.value,
    html: sanitizeEditorHtml(elements.journalEditor.innerHTML),
    text: editorPlainText(),
    focus: elements.modeFocus.hidden ? elements.focusInput.value : elements.modeFocusInput.value,
  };
  if (Object.entries(values).every(([key, value]) => entry[key] === value)) return;
  Object.assign(entry, values);
  elements.journalText.value = entry.text;
  elements.focusInput.value = entry.focus;
  elements.modeFocusInput.value = entry.focus;
  renderSearch();
  persistState();
}

function runEditorCommand(button) {
  const command = button.dataset.editorCommand;
  if (!command) return;
  elements.journalEditor.focus();
  document.execCommand(command, false, button.dataset.editorValue || null);
  syncEntryFromForm();
}

function runEditorInsert(button) {
  const kind = button.dataset.editorInsert;
  if (kind === "divider") {
    insertEditorHtml('<hr><p><br></p>');
  }
  if (kind === "twocol") {
    insertEditorHtml(
      '<section class="editor-columns"><p>左栏记录</p><p>右栏记录</p></section><p><br></p>'
    );
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeEditorHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("script, style, iframe, frame, object, embed, link, meta, base").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on")) node.removeAttribute(attr.name);
      if (/(^|:)(href|src|action|formaction)$/.test(name) && /^\s*(javascript|vbscript|data:text\/html)/i.test(attr.value.replace(/[\u0000-\u001f]/g, ""))) node.removeAttribute(attr.name);
      if (name === "style") {
        const safe = attr.value
          .split(";")
          .map((rule) => rule.trim())
          .filter((rule) => /^(background-color|text-align|color)\s*:/.test(rule))
          .join("; ");
        if (safe) node.setAttribute("style", safe);
        else node.removeAttribute("style");
      }
    });
  });
  return template.innerHTML;
}

function editorPlainText() {
  return elements.journalEditor.innerText.trim();
}

// The hint shows only while the page holds nothing at all. Judged from what is there rather than from
// the markup's shape: typing can leave an empty paragraph beside the new text, and a CSS test for "one
// empty paragraph" then kept the hint on top of the writing.
function refreshEditorHint() {
  const editor = elements.journalEditor;
  if (!editor) return;
  const blank = !editor.textContent.trim() && !editor.querySelector("img, hr, li, table, input, [contenteditable=false]");
  editor.classList.toggle("is-blank", blank);
}

function insertEditorHtml(html) {
  elements.journalEditor.focus();
  document.execCommand("insertHTML", false, html);
  refreshEditorHint();
  syncEntryFromForm();
}

function renderMood() {
  const mood = currentEntry().mood || "";
  elements.moodSelect.value = mood;
  $$("#moodChips [data-mood]").forEach((button) => {
    button.setAttribute("aria-checked", String(button.dataset.mood === mood));
  });
  renderEntryContextMeta();
}

// Tapping the chosen mood again clears it, so a page can stay without a mood.
function setMood(mood) {
  elements.moodSelect.value = elements.moodSelect.value === mood ? "" : mood;
  syncEntryFromForm();
  renderMood();
  renderStamp();
}

// The folded "心情与标签" row shows what is recorded, so it can stay closed.
function renderEntryContextMeta() {
  if (!elements.entryContextMeta) return;
  const entry = currentEntry();
  const copy = MODE_COPY[entry.mode] || MODE_COPY.daily;
  const tags = copy.showTags ? entry.tags : [];
  const recorded = [
    copy.showMood && MOOD_LABELS[entry.mood],
    tags.length && `${tags.slice(0, 2).map((tag) => `#${tag}`).join(" ")}${tags.length > 2 ? ` 等 ${tags.length} 个` : ""}`,
  ].filter(Boolean);
  elements.entryContextMeta.dataset.recorded = String(recorded.length > 0);
  elements.entryContextMeta.textContent = recorded.length
    ? recorded.join(" · ")
    : [copy.showMood && "心情", copy.showTags && "页签", copy.prompts.length && "提示"].filter(Boolean).join(" · ");
}

const dailyPromptOffsets = new Map();

function dailyPromptFor(key) {
  const date = parseDate(key);
  const dayOfYear = Math.round((date - new Date(date.getFullYear(), 0, 1)) / 86_400_000);
  const index = (dayOfYear + date.getFullYear() * 11 + (dailyPromptOffsets.get(key) || 0)) % DAILY_PROMPTS.length;
  return DAILY_PROMPTS[index];
}

// Shown only on a blank daily page; it disappears as soon as anything is written.
function renderDailyPrompt() {
  if (!elements.dailyPrompt) return;
  const entry = currentEntry();
  const visible = (entry.mode || "daily") === "daily" && !hasUserContent(entry) && !editorPlainText();
  elements.dailyPrompt.hidden = !visible;
  if (visible) elements.dailyPromptText.textContent = dailyPromptFor(state.selectedDate);
}

function useDailyPrompt() {
  const editor = elements.journalEditor;
  if (editor.classList.contains("is-blank")) {
    // On a blank page the prompt becomes the first line, and writing carries on right after it.
    editor.innerHTML = `<p>${escapeHtml(dailyPromptFor(state.selectedDate))}</p>`;
    refreshEditorHint(); // before focusing, or the blank-page handler would clear the line again
    editor.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(editor.firstChild);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    syncEntryFromForm();
  } else {
    insertEditorHtml(`<p>${escapeHtml(dailyPromptFor(state.selectedDate))}</p>`);
  }
  renderDailyPrompt();
  renderSpreadScope();
}

function nextDailyPrompt() {
  const key = state.selectedDate;
  dailyPromptOffsets.set(key, (dailyPromptOffsets.get(key) || 0) + 1);
  renderDailyPrompt();
}

function renderTags() {
  const entry = currentEntry();
  elements.tagList.innerHTML = "";
  entry.tags.forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.title = "页签";
    const label = document.createElement("span");
    label.className = "tag-pill__label";
    label.textContent = `#${tag}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "tag-pill__remove";
    remove.textContent = "×";
    remove.title = `移除页签 #${tag}`;
    remove.setAttribute("aria-label", `移除页签 #${tag}`);
    remove.addEventListener("click", () => {
      entry.tags = entry.tags.filter((candidate) => candidate !== tag);
      renderTags();
      renderSearch();
      persistState();
    });
    pill.append(label, remove);
    elements.tagList.append(pill);
  });
  renderEntryContextMeta();
}

function addTag() {
  const value = elements.tagInput.value.trim().replace(/^#/, "");
  if (!value) return;
  const entry = currentEntry();
  if (!entry.tags.includes(value)) entry.tags.push(value);
  elements.tagInput.value = "";
  renderTags();
  renderSearch();
  persistState();
}

function renderFragments() {
  const entry = currentEntry();
  elements.fragmentList.innerHTML = "";
  if (!entry.fragments.length) {
    appendEmptyState(elements.fragmentList, "还没有便签。");
    return;
  }
  entry.fragments.forEach((fragment) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = fragment.text;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.title = "删除灵感便签";
    remove.innerHTML = '<svg><use href="#icon-trash"></use></svg>';
    remove.addEventListener("click", () => {
      entry.fragments = entry.fragments.filter((candidate) => candidate.id !== fragment.id);
      renderFragments();
      scheduleStats();
      renderSearch();
      persistState();
    });
    item.append(text, remove);
    elements.fragmentList.append(item);
  });
}

function addFragment() {
  const text = elements.fragmentInput.value.trim();
  if (!text) return;
  currentEntry().fragments.unshift({ id: crypto.randomUUID(), text, createdAt: new Date().toISOString() });
  elements.fragmentInput.value = "";
  renderFragments();
  scheduleStats();
  renderSearch();
  notify("已贴上灵感便签");
  persistState();
}

function bulletMarker(type) {
  return { task: "•", event: "○", note: "-", migrate: ">" }[type] || "-";
}

function renderBullets() {
  const entry = currentEntry();
  elements.bulletList.innerHTML = "";
  if (!entry.bullets.length) {
    appendEmptyState(elements.bulletList, "还没有子弹记录。");
    return;
  }
  entry.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.classList.toggle("is-done", Boolean(bullet.done));
    item.dataset.type = bullet.type;

    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "bullet-marker";
    marker.textContent = bullet.done ? "x" : bulletMarker(bullet.type);
    marker.title = bullet.type === "task" ? "切换完成" : "切换标记";
    marker.addEventListener("click", () => {
      bullet.done = !bullet.done;
      renderBullets();
      scheduleStats();
      persistState();
    });

    const text = document.createElement("span");
    text.textContent = bullet.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.title = "删除子弹";
    remove.innerHTML = '<svg><use href="#icon-trash"></use></svg>';
    remove.addEventListener("click", () => {
      entry.bullets = entry.bullets.filter((candidate) => candidate.id !== bullet.id);
      renderBullets();
      scheduleStats();
      renderSearch();
      persistState();
    });

    item.append(marker, text, remove);
    elements.bulletList.append(item);
  });
}

function parseBulletText(rawText, fallbackType) {
  const match = rawText.match(/^([•○x>-])\s*(.+)$/i);
  if (!match) return { type: fallbackType, text: rawText, done: false };
  const marker = match[1].toLowerCase();
  const typeMap = {
    "•": "task",
    "○": "event",
    "-": "note",
    ">": "migrate",
    x: "task",
  };
  return {
    type: typeMap[marker] || fallbackType,
    text: match[2].trim(),
    done: marker === "x",
  };
}

function addBullet() {
  const rawText = elements.bulletInput.value.trim();
  if (!rawText) return;
  const parsed = parseBulletText(rawText, elements.bulletType.value);
  if (!parsed.text) return;
  currentEntry().bullets.unshift({
    id: crypto.randomUUID(),
    type: parsed.type,
    text: parsed.text,
    done: parsed.done,
    createdAt: new Date().toISOString(),
  });
  elements.bulletInput.value = "";
  renderBullets();
  scheduleStats();
  renderSearch();
  notify("已记下");
  persistState();
}

function syncBulletsToEditor() {
  const entry = currentEntry();
  if (!entry.bullets.length) {
    notify("右页还没有可整理的速记");
    return;
  }
  const stamp = new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(parseDate(state.selectedDate));
  const items = entry.bullets
    .map((bullet) => `<li><strong>${escapeHtml(bullet.done ? "x" : bulletMarker(bullet.type))}</strong> ${escapeHtml(bullet.text)}</li>`)
    .join("");
  const block = `<p><strong>${stamp} Bullet Log 整理</strong></p><ul class="synced-bullet-list">${items}</ul>`;
  elements.journalEditor.innerHTML = `${elements.journalEditor.innerHTML}${block}`;
  refreshEditorHint();
  syncEntryFromForm();
  notify("已整理到左页正文");
}

function renderPhotos() {
  const entry = currentEntry();
  elements.photoGrid.innerHTML = "";
  if (!entry.photos.length) {
    appendEmptyState(elements.photoGrid, "还没有照片或票根。", "div");
    return;
  }
  entry.photos.forEach((photo) => {
    const card = document.createElement("figure");
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.caption || photo.name || "手帐照片";

    const caption = document.createElement("input");
    caption.value = photo.caption || "";
    caption.placeholder = "写一句旁白";
    caption.addEventListener("input", () => {
      photo.caption = caption.value;
      renderSearch();
      persistState();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.title = "删除照片";
    remove.innerHTML = '<svg><use href="#icon-trash"></use></svg>';
    remove.addEventListener("click", () => {
      entry.photos = entry.photos.filter((candidate) => candidate.id !== photo.id);
      renderPhotos();
      scheduleStats();
      renderSearch();
      notify("照片已移除");
      persistState();
    });

    card.append(image, caption, remove);
    elements.photoGrid.append(card);
  });
}

async function compressPhoto(file) {
  const source = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const preview = new Image();
    preview.addEventListener("load", () => resolve(preview));
    preview.addEventListener("error", reject);
    preview.src = source;
  });
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  if (scale === 1 && file.size < 900_000) return source;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.84);
}

async function addPhotos(files) {
  const images = [...files].filter((file) => file.type.startsWith("image/"));
  if (!images.length) return;
  notify(`正在整理 ${images.length} 张图片`);
  for (const file of images) {
    try {
      const src = await compressPhoto(file);
      currentEntry().photos.unshift({
        id: crypto.randomUUID(),
        name: file.name,
        src,
        caption: "",
        createdAt: new Date().toISOString(),
      });
    } catch {
      notify(`${file.name} 读取失败`);
    }
  }
  renderPhotos();
  scheduleStats();
  renderSearch();
  persistState();
  notify(`已加入 ${images.length} 张图片`);
}

function renderMetrics() {
  const metrics = currentEntry().metrics;
  elements.energyRange.value = metrics.energy;
  elements.stressRange.value = metrics.stress;
  elements.sleepRange.value = metrics.sleep;
  elements.energyValue.textContent = metrics.energy;
  elements.stressValue.textContent = metrics.stress;
  elements.sleepValue.textContent = metrics.sleep;
}

function updateMetric(name, value) {
  currentEntry().metrics[name] = Number(value);
  renderMetrics();
  renderSearch();
  persistState();
}

function renderHealth() {
  const summary = state.health?.summaries?.[state.selectedDate] || null;
  const connected = Boolean(state.health?.connection?.connected);
  elements.healthSourceLabel.textContent = summary ? state.health.source || "健康数据" : connected ? "已连接" : "未连接";
  if (!summary) {
    elements.healthGrid.innerHTML = `<div class="health-empty"><strong>${connected ? "这一天暂无数据" : "连接手机健康后显示"}</strong><span>${connected ? "下次同步会继续补齐授权范围内的摘要。" : "步数、活动能量、距离、睡眠和平均心率会按日期进入手帐。"}</span></div>`;
    return;
  }
  const items = [
    ["步数", summary ? Math.round(summary.steps || 0).toLocaleString("zh-CN") : "--", "steps"],
    ["活动能量", summary && summary.activeEnergy ? `${Math.round(summary.activeEnergy)} kcal` : "--", "energy"],
    ["步行距离", summary && summary.distance ? `${(summary.distance / 1000).toFixed(2)} km` : "--", "distance"],
    ["睡眠", summary && summary.sleepHours ? `${summary.sleepHours.toFixed(1)} h` : "--", "sleep"],
    ["平均心率", summary && summary.heartRateAvg ? `${Math.round(summary.heartRateAvg)} bpm` : "--", "heart"],
  ];
  elements.healthGrid.innerHTML = items
    .map(([label, value, kind]) => `<span data-kind="${kind}"><strong>${value}</strong>${label}</span>`)
    .join("");
}

function getNativeHealthBridge() {
  return window.OpenPagesNativeHealth || null;
}

function nativeHealthSource(platform) {
  return platform === "ios" ? "Apple 健康" : platform === "android" ? "Health Connect" : "手机健康";
}

function renderHealthConnection() {
  if (!elements.healthConnectionState) return;
  const bridge = getNativeHealthBridge();
  const connection = state.health?.connection || null;
  const connected = Boolean(connection?.connected);
  const platform = connection?.platform || bridge?.platform || "web";
  const source = nativeHealthSource(platform);

  elements.healthConnectionState.textContent = connected ? `已连接 ${source}` : bridge?.isNative ? "等待系统授权" : "需手机安装版";
  elements.healthConnectionCopy.textContent = connected
    ? `已允许 OpenPages 读取日摘要。最近同步：${connection.lastSync ? new Date(connection.lastSync).toLocaleString("zh-CN") : "尚未同步"}`
    : bridge?.isNative
      ? `点击后由系统显示 ${source} 的逐项授权页；OpenPages 只请求步数、活动能量、距离、睡眠和心率。`
      : "请在 iPhone、iPad 或 Android 安装版中授权。电脑端会显示手机同步到 OpenPages 的摘要。";
  elements.connectHealthButton.hidden = connected;
  elements.connectHealthButton.disabled = !bridge?.isNative;
  const connectLabel = elements.connectHealthButton.querySelector("span");
  if (connectLabel) connectLabel.textContent = bridge?.isNative ? `连接${source}` : "请在手机端连接";
  elements.syncHealthButton.hidden = !connected;
  elements.manageHealthButton.hidden = !(connected && platform === "android");
}

function renderPlusPanel() {
  if (!elements.versionCount) return;
  const versions = currentEntry().versions || [];
  elements.versionCount.textContent = versions.length ? `本页 ${versions.length} 个版本` : "编辑时自动留存";
  const hasRecentHealth = recentDateKeys(state.selectedDate, 7).some((key) => Boolean(state.health?.summaries?.[key]));
  elements.healthWeeklyReportButton.disabled = !hasRecentHealth;
}

function recentDateKeys(endKey, count) {
  const end = parseDate(endKey);
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    return toDateKey(date);
  });
}

// Page history: an automatic copy is kept before a page is edited (at most every 30 minutes),
// plus copies saved by hand. Restoring first keeps the current content, so it can be undone.
const VERSION_FIELDS = [
  "title", "mode", "mood", "text", "html", "focus", "tasks", "tags", "fragments", "bullets",
  "metrics", "stamp", "pagePalette", "pageAccent", "habits", "week", "modules", "strokes",
];
const AUTO_VERSION_GAP_MS = 30 * 60_000;
const AUTO_VERSION_LIMIT = 6;
const AUTO_VERSION_DAYS = 30;
const MANUAL_VERSION_LIMIT = 12;
const autoVersionTimes = new Map();

function versionData(source) {
  return Object.fromEntries(VERSION_FIELDS.map((field) => [field, clonePageValue(source[field])]));
}

function pruneVersions(versions) {
  const cutoff = Date.now() - AUTO_VERSION_DAYS * 86_400_000;
  const auto = versions.filter((version) => version.kind === "auto" && Date.parse(version.savedAt) >= cutoff);
  const kept = versions.filter((version) => version.kind !== "auto");
  const keepIds = new Set([
    ...auto.slice(-AUTO_VERSION_LIMIT),
    ...kept.slice(-MANUAL_VERSION_LIMIT),
  ].map((version) => version.id));
  return versions.filter((version) => keepIds.has(version.id));
}

function addEntryVersion(entry, data, kind) {
  const previous = entry.versions[entry.versions.length - 1];
  if (previous && JSON.stringify(previous.data) === JSON.stringify(data)) return false;
  entry.versions = pruneVersions([...entry.versions, { id: crypto.randomUUID(), savedAt: new Date().toISOString(), kind, data }]);
  return true;
}

// Called before an edit is copied into the page group, so the group still holds the earlier content.
function autoSaveVersionBeforeEdit() {
  const key = state.selectedDate;
  const entry = state.entries?.[key];
  const group = entry?.pageGroups?.[entry.activePageGroup || 0];
  if (!group || !Array.isArray(entry.versions)) return;
  const historyKey = `${key}:${group.id}`;
  const last = autoVersionTimes.get(historyKey);
  if (last && Date.now() - last < AUTO_VERSION_GAP_MS) return;
  autoVersionTimes.set(historyKey, Date.now());
  if (!hasUserContent(group, key)) return;
  if (addEntryVersion(entry, versionData(group), "auto")) renderPageHistory();
}

function saveEntryVersion() {
  syncEntryFromForm();
  const entry = currentEntry();
  if (!addEntryVersion(entry, versionData(entry), "manual")) {
    notify("当前内容和最近一个版本相同");
    return;
  }
  renderPlusPanel();
  renderPageHistory();
  persistState();
  notify("已保存当前版本");
}

function restoreEntryVersion(id) {
  settlePageTurn();
  syncEntryFromForm();
  const entry = currentEntry();
  const snapshot = entry.versions.find((version) => version.id === id);
  if (!snapshot) return;
  addEntryVersion(entry, versionData(entry), "restore");
  Object.assign(entry, clonePageValue(snapshot.data));
  inkRedoByDate.set(pageHistoryKey(), []);
  autoVersionTimes.set(pageHistoryKey(), Date.now());
  loadEntryIntoForm();
  persistState();
  notify(`已恢复 ${formatVersionTime(snapshot.savedAt)} 的版本，恢复前的内容也已留存`);
}

function formatVersionTime(value) {
  return new Date(value).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
}

function renderPageHistory() {
  if (!elements.pageHistoryList) return;
  const versions = currentEntry().versions || [];
  elements.pageHistoryMeta.textContent = versions.length ? `${versions.length} 个版本` : "暂无";
  elements.pageHistoryList.replaceChildren();
  if (!versions.length) {
    const empty = document.createElement("span");
    empty.className = "trash-empty";
    empty.textContent = "这一页还没有历史版本。";
    elements.pageHistoryList.append(empty);
    return;
  }
  const kindLabels = { auto: "编辑前", restore: "恢复前", manual: "手动" };
  [...versions].reverse().forEach((version) => {
    const text = plainTextFromHtml(version.data?.html || "").trim() || version.data?.text?.trim() || "";
    const strokes = Array.isArray(version.data?.strokes) ? version.data.strokes.length : 0;
    const summary = text.replace(/\s+/g, " ").slice(0, 36) || (strokes ? `${strokes} 笔手写` : "无文字内容");
    const row = document.createElement("div");
    row.className = "trash-item";
    row.innerHTML = `<div><strong>${escapeHtml(formatVersionTime(version.savedAt))} · ${kindLabels[version.kind] || "手动"}</strong><small>${escapeHtml(summary)}</small></div><button type="button">恢复</button>`;
    row.querySelector("button").addEventListener("click", () => restoreEntryVersion(version.id));
    elements.pageHistoryList.append(row);
  });
}

function openPageHistory() {
  closeMobilePanel();
  elements.saveDetails.open = true;
  elements.pageHistory.open = true;
  renderPageHistory();
}

function generateHealthWeeklyReport() {
  const keys = recentDateKeys(state.selectedDate, 7);
  const summaries = keys.map((key) => state.health?.summaries?.[key]).filter(Boolean);
  if (!summaries.length) {
    notify("最近七天还没有健康摘要");
    return;
  }
  const average = (field) => {
    const values = summaries.map((summary) => Number(summary[field] || 0)).filter((value) => value > 0);
    return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;
  };
  const total = (field) => summaries.reduce((sum, summary) => sum + Number(summary[field] || 0), 0);
  const items = [];
  if (average("steps")) items.push(`日均步数 ${Math.round(average("steps")).toLocaleString("zh-CN")} 步`);
  if (total("activeEnergy")) items.push(`活动能量 ${Math.round(total("activeEnergy"))} kcal`);
  if (total("distance")) items.push(`步行距离 ${(total("distance") / 1000).toFixed(1)} km`);
  if (average("sleepHours")) items.push(`平均睡眠 ${average("sleepHours").toFixed(1)} 小时`);
  if (average("heartRateAvg")) items.push(`平均心率 ${Math.round(average("heartRateAvg"))} bpm`);
  const startLabel = formatDateLabel(keys[keys.length - 1]);
  const endLabel = formatDateLabel(keys[0]);
  insertEditorHtml(`<h3>七日健康回顾</h3><p>${escapeHtml(startLabel)} - ${escapeHtml(endLabel)}</p><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><p>身体给我的提醒：</p>`);
  notify("七日健康回顾已加入当前页");
}

async function requestNativeHealthAccess() {
  const bridge = getNativeHealthBridge();
  if (!bridge?.isNative) {
    elements.healthImportStatus.textContent = "当前是网页或桌面预览。请在手机安装版中点击连接，系统才会显示健康授权。";
    notify("手机安装版才能请求系统健康授权");
    return;
  }

  const plugin = bridge.plugin;
  elements.connectHealthButton.disabled = true;
  elements.healthImportStatus.textContent = "正在检查系统健康服务…";
  try {
    const availability = await plugin.isAvailable();
    if (!availability.available) throw new Error(availability.reason || "当前设备不支持健康服务");
    await plugin.requestAuthorization({
      read: ["steps", "calories", "distance", "sleep", "heartRate"],
      write: [],
    });
    state.health = state.health || { summaries: {}, source: "", connection: null };
    state.health.connection = {
      connected: true,
      platform: bridge.platform,
      connectedAt: new Date().toISOString(),
      lastSync: null,
    };
    state.health.source = nativeHealthSource(bridge.platform);
    persistState();
    renderHealthConnection();
    await syncNativeHealth();
  } catch (error) {
    elements.healthImportStatus.textContent = `未能连接：${error?.message || "请检查系统授权"}`;
    notify("健康连接未完成");
  } finally {
    elements.connectHealthButton.disabled = false;
  }
}

function mergeAggregatedHealthSamples(summaries, samples, field, transform = (value) => value) {
  (samples || []).forEach((sample) => {
    const date = new Date(sample.startDate);
    if (Number.isNaN(date.getTime())) return;
    const key = toDateKey(date);
    summaries[key] = summaries[key] || {};
    summaries[key][field] = transform(Number(sample.value || 0), sample.unit);
    summaries[key].syncedAt = new Date().toISOString();
  });
}

async function syncNativeHealth({ silent = false } = {}) {
  const bridge = getNativeHealthBridge();
  if (!bridge?.isNative || !state.health?.connection?.connected) return;
  const plugin = bridge.plugin;
  const end = new Date();
  end.setHours(24, 0, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - 31);
  const range = { startDate: start.toISOString(), endDate: end.toISOString() };

  elements.syncHealthButton.disabled = true;
  elements.healthImportStatus.textContent = "正在同步最近 30 天的健康摘要…";
  try {
    const requests = await Promise.allSettled([
      plugin.queryAggregated({ dataType: "steps", bucket: "day", aggregation: "sum", ...range }),
      plugin.queryAggregated({ dataType: "calories", bucket: "day", aggregation: "sum", ...range }),
      plugin.queryAggregated({ dataType: "distance", bucket: "day", aggregation: "sum", ...range }),
      plugin.queryAggregated({ dataType: "heartRate", bucket: "day", aggregation: "average", ...range }),
      plugin.readSamples({ dataType: "sleep", limit: 2000, ascending: true, ...range }),
    ]);
    const fulfilled = requests.filter((result) => result.status === "fulfilled");
    if (!fulfilled.length) throw requests[0]?.reason || new Error("没有可读取的数据");

    const summaries = { ...(state.health.summaries || {}) };
    if (requests[0].status === "fulfilled") mergeAggregatedHealthSamples(summaries, requests[0].value.samples, "steps", Math.round);
    if (requests[1].status === "fulfilled") mergeAggregatedHealthSamples(summaries, requests[1].value.samples, "activeEnergy");
    if (requests[2].status === "fulfilled") mergeAggregatedHealthSamples(summaries, requests[2].value.samples, "distance");
    if (requests[3].status === "fulfilled") mergeAggregatedHealthSamples(summaries, requests[3].value.samples, "heartRateAvg");
    if (requests[4].status === "fulfilled") {
      const refreshedSleepDays = new Set();
      requests[4].value.samples.forEach((sample) => {
        if (["awake", "inBed"].includes(sample.sleepState)) return;
        const date = new Date(sample.startDate);
        if (Number.isNaN(date.getTime())) return;
        const key = toDateKey(date);
        const minutes = sample.unit === "hour" ? Number(sample.value || 0) * 60 : Number(sample.value || 0);
        summaries[key] = summaries[key] || {};
        if (!refreshedSleepDays.has(key)) {
          summaries[key].sleepHours = 0;
          refreshedSleepDays.add(key);
        }
        summaries[key].sleepHours = (summaries[key].sleepHours || 0) + minutes / 60;
        summaries[key].syncedAt = new Date().toISOString();
      });
    }

    state.health.summaries = summaries;
    state.health.source = nativeHealthSource(bridge.platform);
    state.health.connection.lastSync = new Date().toISOString();
    renderHealth();
    renderHealthConnection();
    scheduleStats();
    renderSearch();
    renderPlusPanel();
    persistState();
    elements.healthImportStatus.textContent = `已从 ${state.health.source} 同步最近 30 天；数据只保存在 OpenPages 本地。`;
    if (!silent) notify("健康摘要已同步");
  } catch (error) {
    elements.healthImportStatus.textContent = `同步失败：${error?.message || "请确认授权范围"}`;
    if (!silent) notify("健康同步失败");
  } finally {
    elements.syncHealthButton.disabled = false;
  }
}

async function manageNativeHealthAccess() {
  const bridge = getNativeHealthBridge();
  if (!bridge?.isNative || bridge.platform !== "android") return;
  await bridge.plugin.openHealthConnectSettings();
}

function parseAppleDate(value) {
  if (!value) return null;
  const normalized = value.replace(/^(\d{4}-\d{2}-\d{2}) /, "$1T").replace(/ ([+-]\d{4})$/, "$1");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readAttributes(markup) {
  const attrs = {};
  markup.replace(/([A-Za-z0-9_:-]+)="([^"]*)"/g, (_, key, value) => {
    attrs[key] = value;
    return "";
  });
  return attrs;
}

function addHealthValue(bucket, attrs) {
  const value = Number(attrs.value);
  if (!Number.isFinite(value)) return;
  switch (attrs.type) {
    case "HKQuantityTypeIdentifierStepCount":
      bucket.steps += value;
      break;
    case "HKQuantityTypeIdentifierActiveEnergyBurned":
      bucket.activeEnergy += value;
      break;
    case "HKQuantityTypeIdentifierDistanceWalkingRunning":
      bucket.distance += attrs.unit === "mi" ? value * 1609.344 : value;
      break;
    case "HKQuantityTypeIdentifierHeartRate":
    case "HKQuantityTypeIdentifierRestingHeartRate":
      bucket.heartRateSum += value;
      bucket.heartRateCount += 1;
      break;
    default:
      break;
  }
}

function importAppleHealthXml(text) {
  const summaries = {};
  const getBucket = (key) => {
    if (!summaries[key]) {
      summaries[key] = {
        steps: 0,
        activeEnergy: 0,
        distance: 0,
        sleepHours: 0,
        heartRateSum: 0,
        heartRateCount: 0,
      };
    }
    return summaries[key];
  };

  const records = text.match(/<Record\b[^>]*>/g) || [];
  records.forEach((record) => {
    const attrs = readAttributes(record);
    const start = parseAppleDate(attrs.startDate);
    if (!start || !attrs.type) return;
    const key = toDateKey(start);
    const bucket = getBucket(key);

    if (attrs.type === "HKCategoryTypeIdentifierSleepAnalysis") {
      const end = parseAppleDate(attrs.endDate);
      if (end && attrs.value && attrs.value.includes("Asleep")) {
        bucket.sleepHours += Math.max(0, end - start) / 3600000;
      }
      return;
    }

    addHealthValue(bucket, attrs);
  });

  const cleaned = {};
  Object.entries(summaries).forEach(([key, bucket]) => {
    const heartRateAvg = bucket.heartRateCount ? bucket.heartRateSum / bucket.heartRateCount : 0;
    cleaned[key] = {
      steps: bucket.steps,
      activeEnergy: bucket.activeEnergy,
      distance: bucket.distance,
      sleepHours: bucket.sleepHours,
      heartRateAvg,
      importedAt: new Date().toISOString(),
    };
  });

  state.health = {
    source: "健康数据 XML",
    summaries: cleaned,
    connection: state.health?.connection || null,
  };
  renderHealth();
  renderHealthConnection();
  scheduleStats();
  renderSearch();
  renderPlusPanel();
  persistState();
  return Object.keys(cleaned).length;
}

function handleHealthImport(file) {
  if (!file) return;
  elements.healthImportStatus.textContent = "正在解析健康数据 XML...";
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const days = importAppleHealthXml(String(reader.result));
      elements.healthImportStatus.textContent = `已导入 ${days} 天健康摘要。所有数据仍保存在本地浏览器。`;
    } catch {
      elements.healthImportStatus.textContent = "导入失败，请选择健康数据导出的 export.xml。";
    }
  });
  reader.readAsText(file);
}

function renderCalendar() {
  const focusKey = calendarFocusKey();
  const selected = parseDate(focusKey);
  const year = selected.getFullYear();
  const month = selected.getMonth();
  elements.miniMonthTitle.textContent = `${year}.${String(month + 1).padStart(2, "0")}`;
  elements.miniDays.innerHTML = "";

  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = date.getDate();
    button.classList.toggle("is-current", key === focusKey);
    button.classList.toggle("has-entry", Boolean(state.entries[key] && hasDayContent(state.entries[key], key)));
    button.classList.toggle("is-muted", date.getMonth() !== month);
    button.addEventListener("click", () => {
      navigateToCalendarPage(key, "day");
    });
    elements.miniDays.append(button);
  }
}

function renderTasks() {
  const entry = currentEntry();
  elements.taskList.innerHTML = "";
  // Older pages still hold the two example tasks; unless ticked, they are not real tasks.
  const tasks = entry.tasks.filter((task) => task.done || !DEFAULT_TASK_TEXTS.includes(task.text));
  const done = tasks.filter((task) => task.done).length;
  elements.taskCount.textContent = tasks.length ? `${done}/${tasks.length}` : "";
  if (!tasks.length) {
    appendEmptyState(elements.taskList, "还没有待办。");
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.classList.toggle("is-done", task.done);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
      persistState();
    });

    const label = document.createElement("span");
    label.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.title = "删除任务";
    remove.innerHTML = '<svg><use href="#icon-trash"></use></svg>';
    remove.addEventListener("click", () => {
      entry.tasks = entry.tasks.filter((candidate) => candidate.id !== task.id);
      renderTasks();
      persistState();
    });

    item.append(checkbox, label, remove);
    elements.taskList.append(item);
  });
}

function addTask() {
  const text = elements.taskInput.value.trim();
  if (!text) return;
  currentEntry().tasks.push({ id: crypto.randomUUID(), text, done: false });
  elements.taskInput.value = "";
  renderTasks();
  notify("已添加待办");
  persistState();
}

function renderHabits() {
  const habits = currentEntry().habits;
  elements.habitInputs.forEach((input) => {
    input.checked = Boolean(habits[input.dataset.habit]);
  });
}

// Sidebar counts and recent pages are not needed within the same frame as a page change.
let statsHandle = null;
function scheduleStats() {
  if (statsHandle) return;
  const run = () => {
    statsHandle = null;
    renderStats();
  };
  statsHandle = typeof requestIdleCallback === "function"
    ? requestIdleCallback(run, { timeout: 400 })
    : setTimeout(run, 60);
}

function renderStats() {
  const entries = Object.entries(state.entries)
    .map(([key, entry]) => {
      normalizeEntry(entry, key);
      return [key, entry];
    })
    .filter(([key, entry]) => hasMeaningfulContent(entry, key));
  elements.entryCount.textContent = String(entries.reduce((sum, [key, entry]) => sum + pageGroupsForRead(entry, key).length * 2, 0));
  elements.fragmentCount.textContent = String(entries.reduce((sum, [key, entry]) =>
    sum + pageGroupsForRead(entry, key).reduce((pageSum, group) => pageSum + (group.fragments || []).length, 0), 0));
  elements.streakDays.textContent = String(entries.length);
  renderRecentPages(entries);
}

function renderRecentPages(entries) {
  if (!elements.recentPages) return;
  elements.recentPages.innerHTML = "";
  const recent = entries
    .filter(([key, entry]) => pageGroupsForRead(entry, key).some((group) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, key)))
    .sort(([left], [right]) => right.localeCompare(left))
    .slice(0, 6);

  if (!recent.length) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = "还没有写过的页。";
    elements.recentPages.append(empty);
    return;
  }

  recent.forEach(([key, entry]) => {
    const groups = pageGroupsForRead(entry, key);
    const activeIndex = entry.activePageGroup || 0;
    // "Recent pages" are diary pages; a week or month plan stored on the same date is not one.
    const isWrittenDayPage = (group) => group && pageScopeForMode(group.mode) === "day" && hasUserContent(group, key);
    const firstWritten = groups.findIndex(isWrittenDayPage);
    if (firstWritten < 0) return;
    const index = isWrittenDayPage(groups[activeIndex]) ? activeIndex : firstWritten;
    const primary = groups[index];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-page";
    const excerpt = (plainTextFromHtml(primary.html || "").trim() || primary.text?.trim() || "").replace(/\s+/g, " ");
    const subtitle = primary.title && !isDefaultDayTitle(primary.title) ? primary.title : (excerpt.length > 28 ? `${excerpt.slice(0, 27)}…` : excerpt) || primary.title || "未命名日页";
    const sameYear = key.slice(0, 4) === todayKey().slice(0, 4);
    const dayPageCount = scopedGroupIndexes(entry, "day").length * 2;
    button.innerHTML = `<strong>${sameYear ? "" : `${key.slice(0, 4)}年`}${escapeHtml(formatDateLabel(key))}</strong><span>${escapeHtml(subtitle)}${dayPageCount > 2 ? ` · 共 ${dayPageCount} 页` : ""}</span>`;
    button.addEventListener("click", () => openPageGroupForDate(key, index));
    elements.recentPages.append(button);
  });
}

// Built-in templates give a page its structure (layout, fields, paper and prompts), never content:
// no pre-written text, focus line, tags, tasks or notes, so an unused page stays an empty page.
// The guidance they used to write into the page lives in each mode's placeholder and prompts.
function modePresets() {
  return {
    daily: {
      title: "一日一页",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    bullet: {
      title: "子弹笔记",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    weekly: {
      title: "周计划",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    memory: {
      title: "记忆拼贴",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    mood: {
      title: "情绪追踪",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    monthly: {
      title: "月计划",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    reading: {
      title: "阅读手帐",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    travel: {
      title: "旅行手帐",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    fiveyear: {
      title: "同日五年",
      focus: "",
      text: "",
      tags: [],
      tasks: [],
      fragments: [],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
  };
}

function applyModeTemplate(mode, template) {
  const usesBuiltIn = !template;
  template = template || modePresets()[mode];
  if (!template) return;
  if (usesBuiltIn && CALENDAR_PAGE_MODES.has(mode)) {
    openCalendarScale(mode === "monthly" ? "month" : "week");
    return;
  }
  if (usesBuiltIn && pageScopeForMode(mode) === "day") {
    // A day page is titled by its date; the layout name is shown wherever the page is listed.
    template = { ...template, title: defaultDayTitle(calendarStorageKey("day", calendarFocusKey())) };
  }
  syncEntryFromForm();
  const sourceAppearance = currentEntry();
  const targetKey = calendarStorageKey("day", calendarFocusKey());
  if (!state.entries[targetKey]) state.entries[targetKey] = createEntry(targetKey);
  const entry = state.entries[targetKey];
  normalizeEntry(entry, targetKey);
  syncPageGroup(entry, targetKey);

  const activeIndex = entry.activePageGroup || 0;
  const activeGroup = entry.pageGroups[activeIndex];
  if (
    usesBuiltIn &&
    targetKey === state.selectedDate &&
    pageScopeForMode(activeGroup?.mode) === "day" &&
    (activeGroup?.mode || "daily") === mode
  ) {
    setView("today");
    closeMobilePanel();
    notify(`${LAYOUT_LABELS[mode] || template.title}已经在当前页`);
    return;
  }

  let index = entry.pageGroups.findIndex(
    (group) => pageScopeForMode(group.mode) === "day" && !hasUserContent(group, targetKey),
  );
  const fresh = createEntry(targetKey);
  fresh.mode = mode;
  const suggestedAppearance = usesBuiltIn ? TEMPLATE_APPEARANCES[mode] || {} : {};
  fresh.pageStyle = suggestedAppearance.pageStyle || sourceAppearance.pageStyle || state.pageStyle || "dot";
  fresh.pagePalette = suggestedAppearance.pagePalette || sourceAppearance.pagePalette || "shiro";
  fresh.pageAccent = suggestedAppearance.pagePalette
    ? PAGE_PALETTES[fresh.pagePalette]
    : sourceAppearance.pageAccent || PAGE_PALETTES[fresh.pagePalette] || PAGE_PALETTES.shiro;
  fresh.pageIllustration = suggestedAppearance.pageIllustration || sourceAppearance.pageIllustration || state.pageIllustration || "botanical";
  fillEntryFromTemplate(fresh, template);

  const appended = index < 0;
  const previousActiveIndex = activeIndex;
  if (appended) {
    entry.pageGroups.push(capturePageGroup(fresh));
    index = entry.pageGroups.length - 1;
  } else {
    entry.pageGroups[index] = capturePageGroup(fresh, entry.pageGroups[index]);
  }
  entry.activePageGroup = index;
  applyPageGroup(entry, entry.pageGroups[index], targetKey);
  state.calendarFocusDate = targetKey;

  if (targetKey === state.selectedDate) {
    loadEntryIntoForm();
    setView("today");
    persistState();
    flushState();
  } else {
    selectDate(targetKey);
  }
  closeMobilePanel();
  // Say what happened: a written page is never replaced, so the layout arrives as new pages after it.
  const label = usesBuiltIn ? LAYOUT_LABELS[mode] || modePresets()[mode].title : template.name || template.title;
  const day = parseDate(targetKey);
  const where = targetKey === todayKey() ? "" : `${day.getMonth() + 1}月${day.getDate()}日 · `;
  if (!appended) {
    notify(`${where}这一页已换成「${label}」`);
    return;
  }
  const addedId = entry.pageGroups[index].id;
  notify(`${where}已在后面续两页「${label}」`, {
    label: "撤销",
    run: () => {
      settlePageTurn();
      const position = entry.pageGroups.findIndex((group) => group.id === addedId);
      if (position < 0) return;
      entry.pageGroups.splice(position, 1);
      entry.activePageGroup = Math.min(previousActiveIndex, entry.pageGroups.length - 1);
      applyPageGroup(entry, entry.pageGroups[entry.activePageGroup], targetKey);
      if (targetKey === state.selectedDate) loadEntryIntoForm();
      persistState();
      notify("已撤销");
    },
  });
}

function starterPresets() {
  return {
    travel: {
      label: "旅行记录",
      text: "今日路线：\n\n计划之外：\n\n想带回生活：",
      tags: ["旅行"],
    },
    mood: {
      label: "身心记录",
      text: "此刻的身体感受：\n\n今天的触发点：\n\n让我安定下来的片刻：",
      tags: ["身心"],
    },
  };
}

function applyStarterTemplate(name) {
  const starter = starterPresets()[name];
  if (!starter) return;
  syncEntryFromForm();
  const targetKey = calendarStorageKey("day", calendarFocusKey());
  const { entry, index } = ensureCalendarPage(targetKey, "day");
  entry.activePageGroup = index;
  applyPageGroup(entry, entry.pageGroups[index], targetKey);
  const currentText = plainTextFromHtml(entry.html || entry.text || "").trim();
  const firstPrompt = starter.text.split("\n")[0];

  if (!currentText) {
    entry.text = starter.text;
    entry.html = textToHtml(starter.text);
  } else if (!currentText.includes(firstPrompt)) {
    entry.text = `${currentText}\n\n${starter.text}`;
    const currentHtml = entry.html?.trim() || textToHtml(currentText);
    entry.html = `${currentHtml}<hr>${textToHtml(starter.text)}`;
  }
  starter.tags.forEach((tag) => {
    if (!entry.tags.includes(tag)) entry.tags.push(tag);
  });
  syncPageGroup(entry, targetKey);
  state.calendarFocusDate = targetKey;
  if (targetKey === state.selectedDate) {
    loadEntryIntoForm();
    setView("today");
    persistState();
    flushState();
  } else {
    selectDate(targetKey);
  }
  closeMobilePanel();
  notify(`已在${shortDateLabel(targetKey)}加入${starter.label}`);
}

function fillEntryFromTemplate(entry, template) {
  entry.title = template.title;
  entry.focus = template.focus;
  entry.text = template.text;
  entry.html = template.html || textToHtml(template.text);
  entry.tags = [...template.tags];
  entry.tasks = template.tasks.map((text) => ({ id: crypto.randomUUID(), text, done: false }));
  entry.fragments = template.fragments.map((text) => ({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  }));
  entry.bullets = (template.bullets || []).map((bullet) => ({
    id: crypto.randomUUID(),
    type: bullet.type || "note",
    text: bullet.text,
    done: false,
    createdAt: new Date().toISOString(),
  }));
  entry.photos = [...(template.photos || [])];
  entry.metrics = { ...(template.metrics || { energy: 3, stress: 2, sleep: 7 }) };
}

// What built-in templates wrote into pages before they became structure-only; such content is still
// recognised as generated, not as the writer's own.
const LEGACY_TEMPLATE_CONTENT = {
  focus: ["快速记录，然后再整理", "把今天变成可以回看的小场景", "先看见自己，再安排事情", "读慢一点，留下真正有回声的部分", "收下路线之外发生的事", "写给以后会回到这一页的自己"],
  text: ["地点：\n声音：\n味道：\n想贴上的票根/照片：\n这一刻的旁白：", "今天的情绪天气：\n身体感受：\n触发点：\n让我稳定下来的事：\n想对自己说：", "摘句：\n\n联想：\n\n读完后想带走：", "今日路线：\n\n计划之外：\n\n想带回生活：", "天气与体感：\n\n今天最具体的一件事：\n\n留给明年今天："],
  tags: ["Bullet", "拼贴", "记忆", "情绪", "自我照顾", "阅读", "旅行"],
  tasks: ["选一张照片", "写下三件小物", "整理成一页拼贴", "记录情绪天气", "做一个安定动作", "减少一个不必要任务"],
  fragments: ["适合旅行、展览、约会、读书页，页面不必写满。", "低能量日也算记录，贴一枚小贴纸就很好。", "不做读书数量排行榜，只留下与自己有关的句子。", "照片、票根和手写可以混在同一页，不必排得整齐。"],
};

function applyTemplateNonDestructively(entry, template) {
  const presets = [...Object.values(modePresets()), LEGACY_TEMPLATE_CONTENT];
  const generatedTitles = new Set(presets.map((preset) => preset.title).filter(Boolean));
  const generatedFocus = new Set(presets.flatMap((preset) => preset.focus));
  const generatedText = new Set(presets.flatMap((preset) => preset.text));
  const generatedTags = new Set(presets.flatMap((preset) => preset.tags));
  const generatedTasks = new Set([...DEFAULT_TASK_TEXTS, ...presets.flatMap((preset) => preset.tasks)]);
  const generatedFragments = new Set(presets.flatMap((preset) => preset.fragments));

  if (generatedTitles.has(entry.title) || isDefaultDayTitle(entry.title)) entry.title = template.title;
  if (!entry.focus.trim() || generatedFocus.has(entry.focus)) entry.focus = template.focus;
  if (
    (!entry.text.trim() && !entry.html.trim()) ||
    generatedText.has(entry.text.trim()) ||
    generatedText.has(plainTextFromHtml(entry.html || "").trim())
  ) {
    entry.text = template.text;
    entry.html = template.html || textToHtml(template.text);
  }
  entry.tags = entry.tags.filter((tag) => !generatedTags.has(tag));
  template.tags.forEach((tag) => {
    if (!entry.tags.includes(tag)) entry.tags.push(tag);
  });
  const customTasks = entry.tasks.filter((task) => !generatedTasks.has(task.text));
  entry.tasks = [
    ...customTasks,
    ...template.tasks.map((text) => ({ id: crypto.randomUUID(), text, done: false })),
  ];
  const customFragments = entry.fragments.filter((fragment) => !generatedFragments.has(fragment.text));
  entry.fragments = [
    ...customFragments,
    ...template.fragments.map((text) => ({
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    })),
  ];
  if (!entry.bullets.length && template.bullets?.length) {
    entry.bullets = template.bullets.map((bullet) => ({
      id: crypto.randomUUID(),
      type: bullet.type || "note",
      text: bullet.text,
      done: false,
      createdAt: new Date().toISOString(),
    }));
  }
  entry.metrics = { ...(entry.metrics || template.metrics || { energy: 3, stress: 2, sleep: 7 }) };
}

function textToHtml(text) {
  return text
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function renderMode() {
  const entry = currentEntry();
  const mode = entry.mode || "daily";
  const copy = MODE_COPY[mode] || MODE_COPY.daily;
  const isBulletMode = mode === "bullet";
  const isCollectionMode = ["monthly", "reading", "travel", "fiveyear"].includes(mode);
  if (elements.pageExtras) {
    elements.pageExtras.open = ["bullet", "memory", "mood"].includes(mode);
  }
  elements.journalSpread.dataset.mode = mode;
  elements.body.dataset.editorTemplate = mode;
  if (elements.entryModeLabel) elements.entryModeLabel.textContent = copy.eyebrow;
  if (elements.rightPageModeLabel) elements.rightPageModeLabel.textContent = copy.rightEyebrow;
  // The right page is titled by what it is for; the date already heads the left page.
  const rightTitle = $(".paper-page--right .ink-page-title");
  if (rightTitle) rightTitle.textContent = mode === "daily" ? "自由手写" : LAYOUT_LABELS[mode] || copy.rightEyebrow;
  if (elements.editorLabel) elements.editorLabel.textContent = copy.editorLabel;
  if (elements.modeFocus) {
    elements.modeFocus.hidden = !copy.focusLabel;
    elements.modeFocus.setAttribute("aria-hidden", String(!copy.focusLabel));
    elements.modeFocusLabel.textContent = copy.focusLabel || "本页主题";
    const focusPlaceholders = {
      weekly: "这一周最重要的方向",
      memory: "为这一页取一个场景主题",
      mood: "此刻最需要照顾的感受",
      monthly: "这个月想围绕什么生活",
      reading: "这本书正在回应什么",
      travel: "这段旅程要去哪里",
      fiveyear: "留给明年今天的一句话",
    };
    elements.modeFocusInput.placeholder = focusPlaceholders[mode] || "本页最想留下的主题";
  }
  if (elements.bulletKey) {
    elements.bulletKey.hidden = !isBulletMode;
    elements.bulletKey.setAttribute("aria-hidden", String(!isBulletMode));
  }
  if (elements.bulletIndexNote) {
    elements.bulletIndexNote.hidden = !isBulletMode;
    elements.bulletIndexNote.setAttribute("aria-hidden", String(!isBulletMode));
  }
  const visibility = [
    [elements.moodSelect?.closest(".mood-select"), copy.showMood],
    [$(".tag-panel"), copy.showTags],
    [elements.editorToolbar, copy.showToolbar],
  ];
  visibility.forEach(([node, visible]) => {
    if (!node) return;
    node.hidden = !visible;
    node.setAttribute("aria-hidden", String(!visible));
  });
  if (elements.tagInput) elements.tagInput.placeholder = copy.tagPlaceholder || "添加页签";
  const promptRow = $(".prompt-row");
  const promptButtons = $$(".prompt-row button");
  promptRow.hidden = !copy.prompts.length;
  promptRow.setAttribute("aria-hidden", String(!copy.prompts.length));
  if (elements.entryContext) {
    const showContext = Boolean(copy.prompts.length || copy.showTags || copy.showMood);
    elements.entryContext.hidden = !showContext;
    elements.entryContext.setAttribute("aria-hidden", String(!showContext));
    if (!showContext) elements.entryContext.open = false;
    renderEntryContextMeta();
  }
  promptButtons.forEach((button, index) => {
    const prompt = copy.prompts[index];
    button.hidden = !prompt;
    if (!prompt) return;
    button.textContent = prompt[0];
    button.dataset.prompt = prompt[1];
  });
  if (elements.journalEditor) {
    elements.journalEditor.dataset.placeholder = copy.placeholder;
    elements.journalEditor.setAttribute("aria-label", copy.editorLabel);
  }
  elements.mobilePageButtons.forEach((button) => {
    const isRightPage = button.dataset.mobilePageTarget === "ink";
    button.textContent = isRightPage ? copy.mobileRight : copy.mobileLeft;
  });
  $$("[data-mode-template]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.modeTemplate === mode);
  });
  if (elements.collectionView) {
    elements.collectionView.hidden = !isCollectionMode;
    elements.collectionView.setAttribute("aria-hidden", String(!isCollectionMode));
    renderCollectionView(mode);
  }
  renderCalendarScaleNavigation(mode);
  revealPageMotif();
}

function modeModuleDefaults(mode) {
  const defaults = {
    monthly: { priorities: "", memo: "" },
    reading: { book: "", author: "", progress: 0, rating: 0, quote: "", reflection: "" },
    travel: { destination: "", route: "", budget: "", packing: "", keepsake: "" },
    fiveyear: { line: "" },
  };
  return { ...(defaults[mode] || {}) };
}

function currentModeModule(mode) {
  const entry = currentEntry();
  entry.modules = entry.modules || {};
  entry.modules[mode] = { ...modeModuleDefaults(mode), ...(entry.modules[mode] || {}) };
  return entry.modules[mode];
}

function moduleValue(value) {
  return escapeHtml(String(value ?? ""));
}

function renderCollectionView(mode) {
  const root = elements.collectionView;
  if (!root) return;
  if (!["monthly", "reading", "travel", "fiveyear"].includes(mode)) {
    root.replaceChildren();
    return;
  }
  const data = currentModeModule(mode);
  if (mode === "monthly") renderMonthlyCollection(root, data);
  if (mode === "reading") renderReadingCollection(root, data);
  if (mode === "travel") renderTravelCollection(root, data);
  if (mode === "fiveyear") renderFiveYearCollection(root, data);
  // Text areas on these pages grow with their text, like the week's; there is no corner grip.
  requestAnimationFrame(() => root.querySelectorAll("textarea").forEach(fitTextareaToText));
}

function fitTextareaToText(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function renderMonthlyCollection(root, data) {
  const selected = parseDate(state.selectedDate);
  const focusKey = calendarFocusKey();
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    const candidate = state.entries[key];
    if (candidate) normalizeEntry(candidate, key);
    const saved = candidate && hasMeaningfulContent(candidate, key);
    days.push(`<button type="button" data-collection-date="${key}" class="${date.getMonth() === month ? "" : "is-muted"} ${key === focusKey ? "is-current" : ""} ${saved ? "has-entry" : ""}" aria-label="打开${shortDateLabel(key)}的日页">${date.getDate()}</button>`);
  }
  root.innerHTML = `
    <div class="collection-heading"><div><span>${headingEyebrow("monthly")}</span><h3>${year}.${String(month + 1).padStart(2, "0")}</h3></div></div>
    <div class="collection-calendar" aria-label="月历">
      <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
      ${days.join("")}
    </div>
    <div class="collection-fields collection-fields--split">
      <label><span>本月重点 · 最多三件</span><textarea data-module-field="priorities" placeholder="只留下真正重要的事，也可以空着">${moduleValue(data.priorities)}</textarea></label>
      <label><span>无日期备忘</span><textarea data-module-field="memo" placeholder="不确定哪天做的事，先放在这里">${moduleValue(data.memo)}</textarea></label>
    </div>`;
}

// A right page is headed like the left one: a small label in English over its title.
function headingEyebrow(mode) {
  return (MODE_COPY[mode]?.rightEyebrow || "").replace(/&/g, "&amp;");
}

function renderReadingCollection(root, data) {
  const rating = Number(data.rating) || 0;
  root.innerHTML = `
    <div class="collection-heading"><div><span>${headingEyebrow("reading")}</span><h3>${moduleValue(data.book) || "阅读札记"}</h3></div></div>
    <div class="collection-fields collection-fields--book">
      <label><span>书名</span><input data-module-field="book" value="${moduleValue(data.book)}" placeholder="正在读什么" /></label>
      <label><span>作者</span><input data-module-field="author" value="${moduleValue(data.author)}" placeholder="作者 / 译者" /></label>
    </div>
    <label class="collection-progress"><span>阅读进度 <output>${Number(data.progress) || 0}%</output></span><input type="range" min="0" max="100" step="5" value="${Number(data.progress) || 0}" data-module-field="progress" /></label>
    <div class="collection-rating" role="group" aria-label="阅读评分"><span>读后余韵</span>${[1, 2, 3, 4, 5].map((value) => `<button type="button" data-reading-rating="${value}" class="${value <= rating ? "is-active" : ""}" aria-label="${value}分">${value <= rating ? "●" : "○"}</button>`).join("")}</div>
    <div class="collection-fields collection-fields--split">
      <label><span>摘录</span><textarea data-module-field="quote">${moduleValue(data.quote)}</textarea></label>
      <label><span>读后感</span><textarea data-module-field="reflection">${moduleValue(data.reflection)}</textarea></label>
    </div>`;
}

function renderTravelCollection(root, data) {
  root.innerHTML = `
    <div class="collection-heading"><div><span>${headingEyebrow("travel")}</span><h3>${moduleValue(data.destination) || "旅途采集"}</h3></div></div>
    <div class="collection-fields collection-fields--book">
      <label><span>目的地</span><input data-module-field="destination" value="${moduleValue(data.destination)}" placeholder="城市 / 山 / 海" /></label>
      <label><span>预算</span><input data-module-field="budget" value="${moduleValue(data.budget)}" placeholder="可留空" /></label>
    </div>
    <div class="travel-route-mark" aria-hidden="true"><i></i><i></i><i></i><span></span></div>
    <div class="collection-fields collection-fields--split">
      <label><span>路线与预约</span><textarea data-module-field="route" placeholder="车次、住处、想去但不强求的地方">${moduleValue(data.route)}</textarea></label>
      <label><span>行李清单</span><textarea data-module-field="packing">${moduleValue(data.packing)}</textarea></label>
    </div>
    <label class="collection-wide-field"><span>旅行见闻</span><textarea data-module-field="keepsake">${moduleValue(data.keepsake)}</textarea></label>`;
}

function renderFiveYearCollection(root, data) {
  const selected = parseDate(state.selectedDate);
  const rows = [];
  for (let offset = 4; offset >= 0; offset -= 1) {
    const date = new Date(selected);
    date.setFullYear(selected.getFullYear() - offset);
    const key = toDateKey(date);
    const entry = state.entries[key];
    let excerpt = "这一年还没有写下什么";
    if (entry) {
      normalizeEntry(entry, key);
      const group = pageGroupsForRead(entry, key).find((candidate) => hasUserContent(candidate, key));
      const text = group && (plainTextFromHtml(group.html || "").trim() || group.text?.trim() || group.focus?.trim());
      if (text) excerpt = text.replace(/\s+/g, " ").slice(0, 72);
    }
    rows.push(`<button type="button" class="fiveyear-row ${key === state.selectedDate ? "is-current" : ""}" data-collection-date="${key}"><strong>${date.getFullYear()}</strong><span>${moduleValue(excerpt)}</span></button>`);
  }
  root.innerHTML = `
    <div class="collection-heading"><div><span>${headingEyebrow("fiveyear")}</span><h3>${selected.getMonth() + 1}月${selected.getDate()}日</h3></div></div>
    <div class="fiveyear-list">${rows.join("")}</div>
    <label class="collection-wide-field"><span>这一年的一句话</span><input data-module-field="line" value="${moduleValue(data.line)}" placeholder="一句就够了" /></label>`;
}

function handleCollectionInput(event) {
  const field = event.target.closest("[data-module-field]");
  if (!field) return;
  const mode = currentEntry().mode;
  currentModeModule(mode)[field.dataset.moduleField] = field.value;
  if (field instanceof HTMLTextAreaElement) fitTextareaToText(field);
  if (field.type === "range") field.closest("label")?.querySelector("output")?.replaceChildren(`${field.value}%`);
  persistState();
}

function handleCollectionClick(event) {
  const dateButton = event.target.closest("[data-collection-date]");
  if (dateButton) {
    navigateToCalendarPage(dateButton.dataset.collectionDate, "day");
    return;
  }
  const ratingButton = event.target.closest("[data-reading-rating]");
  if (!ratingButton) return;
  currentModeModule("reading").rating = Number(ratingButton.dataset.readingRating);
  renderCollectionView("reading");
  persistState();
}

function saveCustomTemplate() {
  const entry = currentEntry();
  const name = prompt("给这个自定义模板取个名字");
  if (!name) return;
  state.customTemplates = state.customTemplates || [];
  state.customTemplates.unshift({
    id: crypto.randomUUID(),
    name: name.trim(),
    mode: entry.mode || "daily",
    title: entry.title,
    focus: entry.focus,
    text: entry.text,
    tags: [...entry.tags],
    tasks: entry.tasks.map((task) => task.text),
    fragments: entry.fragments.map((fragment) => fragment.text),
    bullets: entry.bullets.map((bullet) => ({ type: bullet.type, text: bullet.text })),
    photos: [],
    metrics: { ...entry.metrics },
    createdAt: new Date().toISOString(),
  });
  renderCustomTemplates();
  persistState();
}

// Saved templates sit beside the built-in ones (not inside 更多), all of them, each removable.
function renderCustomTemplates() {
  state.customTemplates = state.customTemplates || [];
  elements.customTemplateList.replaceChildren();
  if (elements.myTemplates) elements.myTemplates.hidden = !state.customTemplates.length;
  if (elements.myTemplatesMeta) elements.myTemplatesMeta.textContent = state.customTemplates.length ? `${state.customTemplates.length} 个` : "";
  state.customTemplates.forEach((template, position) => {
    const row = document.createElement("div");
    row.className = "custom-template";
    const apply = document.createElement("button");
    apply.type = "button";
    apply.className = "custom-template__apply";
    const tags = (template.tags || []).map((tag) => `#${tag}`).join(" ");
    apply.innerHTML = `<strong>${escapeHtml(template.name || template.title || "未命名模板")}</strong><span>${escapeHtml([LAYOUT_LABELS[template.mode] || "自由双页", tags].filter(Boolean).join(" · "))}</span>`;
    apply.addEventListener("click", () => applyModeTemplate(template.mode || "daily", template));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "custom-template__remove";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `删除模板「${template.name || template.title || "未命名模板"}」`);
    remove.addEventListener("click", () => {
      state.customTemplates = state.customTemplates.filter((candidate) => candidate !== template);
      renderCustomTemplates();
      persistState();
      notify(`已删除模板「${template.name || template.title || "未命名模板"}」`, {
        label: "撤销",
        run: () => {
          state.customTemplates.splice(Math.min(position, state.customTemplates.length), 0, template);
          renderCustomTemplates();
          persistState();
        },
      });
    });
    row.append(apply, remove);
    elements.customTemplateList.append(row);
  });
}

function hasModuleContent(entry) {
  return Object.values(entry.modules || {}).some((module) =>
    Object.values(module || {}).some((value) => String(value ?? "").trim() && Number(value) !== 0)
  );
}

function hasUserContent(entry, key = state.selectedDate) {
  const hasCustomTasks = entry.tasks.some((task) => task.done || !DEFAULT_TASK_TEXTS.includes(task.text));
  return Boolean(
    (entry.text || "").trim() ||
      (entry.html || "").replace(/<[^>]*>/g, "").trim() ||
      entry.focus.trim() ||
      entry.ink ||
      entry.strokes.length ||
      entry.tags.length ||
      entry.fragments.length ||
      entry.bullets.length ||
      entry.photos.length ||
      entry.stamp ||
      entry.bookmarked ||
      Object.values(entry.week || {}).some((text) => String(text || "").trim()) ||
      Boolean(state.health?.summaries?.[key]) ||
      entry.stickers.length ||
      hasModuleContent(entry) ||
      hasCustomTasks
  );
}

function pageGroupsForRead(entry, key = state.selectedDate) {
  normalizeEntry(entry, key);
  const activeIndex = entry.activePageGroup || 0;
  return entry.pageGroups.map((group, index) =>
    index === activeIndex ? capturePageGroup(entry, group) : group
  );
}

function hasDayContent(entry, key = state.selectedDate) {
  return pageGroupsForRead(entry, key).some((group) => hasUserContent(group, key));
}

function hasMeaningfulContent(entry, key = state.selectedDate) {
  return hasDayContent(entry, key);
}

function calculateStreak() {
  let streak = 0;
  const cursor = parseDate(todayKey());
  while (true) {
    const key = toDateKey(cursor);
    const entry = state.entries[key];
    if (!entry) break;
    normalizeEntry(entry, key);
    if (!hasMeaningfulContent(entry, key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function journalPageIndex() {
  return Object.entries(state.entries)
    .sort(([a], [b]) => b.localeCompare(a))
    .flatMap(([key, entry]) => pageGroupsForRead(entry, key)
      .map((group, index) => ({ key, group, index }))
      .filter(({ group }) => hasUserContent(group, key)));
}

function searchablePageText(group, key) {
  return [
    key, LAYOUT_LABELS[group.mode], group.title,
    group.text || plainTextFromHtml(group.html || ""), group.focus,
    ...(group.tags || []),
    ...(group.fragments || []).map((item) => item.text),
    ...(group.bullets || []).map((item) => item.text),
    ...(group.tasks || []).filter((item) => !DEFAULT_TASK_TEXTS.includes(item.text)).map((item) => item.text),
    ...(group.photos || []).map((item) => `${item.name || ""} ${item.caption || ""}`),
    ...Object.entries(group.week || {}).flat(),
    ...Object.values(group.modules || {}).flatMap((module) => Object.values(module || {})),
  ].filter(Boolean).join(" ");
}

function filterJournalPages(pages, { query = "", scope = "all", type = "all", tag = "", start = "", end = "" }) {
  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return pages.filter(({ key, group }) => {
    if (scope === "bookmarks" && !group.bookmarked) return false;
    if (type !== "all" && group.mode !== type) return false;
    if (tag && !(group.tags || []).includes(tag)) return false;
    // Calendar pages span a period; a date filter should include overlapping weeks/months.
    const last = parseDate(key);
    if (group.mode === "weekly") last.setDate(last.getDate() + 6);
    if (group.mode === "monthly") last.setMonth(last.getMonth() + 1, 0);
    if ((start && toDateKey(last) < start) || (end && key > end)) return false;
    const text = searchablePageText(group, key).toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}

function reviewExcerpt(group, key, query) {
  const source = searchablePageText(group, key);
  const term = query.split(/\s+/).find((word) => word && source.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
  if (!term) return escapeHtml(pageGroupExcerpt(group));
  const index = source.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());
  const start = Math.max(0, index - 24);
  const end = Math.min(source.length, index + term.length + 60);
  return `${start ? "…" : ""}${escapeHtml(source.slice(start, index))}<mark>${escapeHtml(source.slice(index, index + term.length))}</mark>${escapeHtml(source.slice(index + term.length, end))}${end < source.length ? "…" : ""}`;
}

// The index is rebuilt only while 回看 is on screen; otherwise it is marked stale and rebuilt on open.
let searchStale = true;
function renderSearch({ force = false } = {}) {
  const reviewShowing = elements.rightDock?.classList.contains("is-open") && elements.rightDock.dataset.mobilePanel === "review";
  if (!force && !reviewShowing) {
    searchStale = true;
    return;
  }
  searchStale = false;
  const pages = journalPageIndex();
  const tag = elements.reviewTagFilter.value;
  const tags = [...new Set(pages.flatMap(({ group }) => group.tags || []).concat(tag || []))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  elements.reviewTagFilter.innerHTML = `<option value="">全部页签</option>${tags.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
  elements.reviewTagFilter.value = tag;
  const filters = {
    query: elements.searchInput.value.trim(), scope: reviewScope,
    type: elements.reviewTypeFilter.value, tag,
    start: elements.reviewStartDate.value, end: elements.reviewEndDate.value,
  };
  const signature = JSON.stringify(filters);
  if (signature !== reviewFilterSignature) reviewLimit = 20;
  reviewFilterSignature = signature;
  const invalidRange = filters.start && filters.end && filters.start > filters.end;
  elements.reviewEndDate.setCustomValidity(invalidRange ? "结束日期不能早于开始日期" : "");
  const matches = invalidRange ? [] : filterJournalPages(pages, filters);
  const hasFilters = filters.query || filters.tag || filters.start || filters.end || filters.type !== "all" || reviewScope !== "all";
  elements.reviewDateLabel.textContent = filters.start || filters.end ? `${filters.start || "最早"} 至 ${filters.end || "今天以后"}` : "不限";
  elements.reviewSummary.textContent = invalidRange ? "结束日期不能早于开始日期" : `共 ${matches.length} 条${matches.length > reviewLimit ? ` · 已显示 ${reviewLimit} 条` : ""}`;
  elements.reviewResetButton.hidden = !hasFilters;
  elements.reviewMoreButton.hidden = matches.length <= reviewLimit;
  elements.searchResults.replaceChildren();
  if (!matches.length) {
    appendEmptyState(elements.searchResults, invalidRange ? "请调整日期范围。" : hasFilters ? "没有符合条件的内页。" : "还没有写过的页。", "p");
    return;
  }
  matches.slice(0, reviewLimit).forEach(({ key, group, index }) => {
    const date = parseDate(key);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "review-page";
    const label = LAYOUT_LABELS[group.mode] || "自由内页";
    // The date column already says which day it is; the meta line adds what the column cannot.
    const sameYear = key.slice(0, 4) === todayKey().slice(0, 4);
    const scope = pageScopeForMode(group.mode);
    const position = Math.max(0, scopedGroupIndexes(state.entries[key], scope).indexOf(index));
    const meta = [
      !sameYear && `${date.getFullYear()}年`,
      scope === "day" && WEEKDAY_NAMES[date.getDay()],
      label,
      `第 ${pageRangeLabel(position)} 页`,
    ].filter(Boolean).join(" · ");
    const title = isDefaultDayTitle(group.title) ? "" : group.title || label;
    button.innerHTML = `
      <span class="review-page__date" aria-hidden="true"><small>${date.getMonth() + 1}月</small><strong>${String(date.getDate()).padStart(2, "0")}</strong></span>
      <span class="review-page__body">
        <small class="review-page__meta">${escapeHtml(meta)}</small>
        ${title ? `<strong class="review-page__title">${escapeHtml(title)}</strong>` : ""}
        <span class="review-page__excerpt">${reviewExcerpt(group, key, filters.query)}</span>
      </span>
      ${group.bookmarked ? '<svg class="review-page__bookmark" aria-label="已夹书签"><use href="#icon-bookmark"></use></svg>' : ""}`;
    button.addEventListener("click", () => openPageGroupForDate(key, index));
    elements.searchResults.append(button);
  });
}

function setReviewScope(scope) {
  reviewScope = scope;
  $$("[data-review-scope]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.reviewScope === scope)));
  renderSearch();
}

function resetReviewFilters() {
  elements.searchInput.value = "";
  elements.reviewTypeFilter.value = "all";
  elements.reviewTagFilter.value = "";
  elements.reviewStartDate.value = "";
  elements.reviewEndDate.value = "";
  setReviewScope("all");
}

function startOfWeek(date) {
  const result = new Date(date);
  const day = (date.getDay() + 6) % 7;
  result.setDate(date.getDate() - day);
  result.setHours(0, 0, 0, 0);
  return result;
}

function renderWeek() {
  const entry = currentEntry();
  const start = startOfWeek(parseDate(state.selectedDate));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const focusKey = calendarFocusKey();
  if (elements.weekRangeLabel) {
    elements.weekRangeLabel.textContent = weekRangeText(toDateKey(start));
  }
  elements.weekGrid.innerHTML = "";

  WEEKDAYS.forEach((weekday, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    const card = document.createElement("div");
    card.className = "week-day";
    if (key === focusKey) card.classList.add("is-current");
    // Planner convention: Saturday in blue, Sunday in red.
    if (date.getDay() === 6) card.classList.add("is-saturday");
    if (date.getDay() === 0) card.classList.add("is-sunday");
    const dayEntry = state.entries[key];
    let linkedPageCount = 0;
    let linkedExcerpt = "";
    let firstLinked = null;
    if (dayEntry) {
      normalizeEntry(dayEntry, key);
      card.classList.toggle("has-entry", hasDayContent(dayEntry, key));
      const linkedPages = pageGroupsForRead(dayEntry, key)
        .map((group, pageIndex) => ({ group, pageIndex }))
        .filter(({ group }) => pageScopeForMode(group.mode) === "day" && hasUserContent(group, key));
      linkedPageCount = linkedPages.length;
      firstLinked = linkedPages[0];
      linkedExcerpt = firstLinked ? pageGroupExcerpt(firstLinked.group) : "";
    }

    const title = document.createElement("button");
    title.type = "button";
    title.className = "week-day__date";
    title.setAttribute("aria-label", `打开${shortDateLabel(key)}的日页`);
    const dayLabel = document.createElement("span");
    dayLabel.textContent = weekday;
    const dateLabel = document.createElement("small");
    // The day of the month, large; the month is in the page's head.
    dateLabel.textContent = String(date.getDate());
    title.append(dayLabel, dateLabel);
    title.addEventListener("click", () => navigateToCalendarPage(key, "day"));

    const textarea = document.createElement("textarea");
    textarea.rows = 1;
    textarea.setAttribute("aria-label", `${shortDateLabel(key)}的安排`);
    textarea.placeholder = "安排、约定或留白";
    textarea.value = entry.week[key] || "";
    textarea.addEventListener("input", () => {
      entry.week[key] = textarea.value;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      persistState();
      scheduleStats();
      renderSearch();
    });
    requestAnimationFrame(() => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });

    card.append(title, textarea);
    if (linkedPageCount) {
      const linked = document.createElement("button");
      linked.type = "button";
      linked.className = "week-day__linked";
      linked.innerHTML = `<strong>当天记录</strong><span>${escapeHtml(linkedExcerpt || "打开当天内页")}</span>`;
      linked.addEventListener("click", () => openPageGroupForDate(key, firstLinked.pageIndex));
      card.append(linked);
    }
    elements.weekGrid.append(card);
  });
}

function pageGroupExcerpt(group) {
  const module = group.modules?.[group.mode] || {};
  const modeSpecific = {
    reading: [module.book, module.quote, module.reflection],
    travel: [module.destination, module.keepsake, module.route],
    fiveyear: [module.line],
    monthly: [module.priorities, module.memo],
  }[group.mode] || [];
  const bulletText = (group.bullets || []).map((item) => item.text).find(Boolean);
  const photoText = (group.photos || []).map((item) => item.caption || item.name).find(Boolean);
  const value = [
    ...modeSpecific,
    bulletText,
    photoText,
    plainTextFromHtml(group.html || "").trim(),
    group.text?.trim(),
    group.focus?.trim(),
    Object.values(group.week || {}).find((text) => String(text || "").trim()),
    group.title,
  ].find((item) => String(item || "").trim());
  return String(value || "打开当天内页").replace(/\s+/g, " ").slice(0, 34);
}

function addSticker(type, x, y) {
  const preset = STICKERS[type] || STICKERS["note-butter"];
  const spread = elements.journalSpread.getBoundingClientRect();
  const sticker = {
    id: crypto.randomUUID(),
    type,
    text: preset.text,
    className: preset.className,
    x: clamp(x, 8, Math.max(8, spread.width - 92)),
    y: clamp(y, 8, Math.max(8, spread.height - 64)),
    rotate: Math.round((Math.random() * 8 - 4) * 10) / 10,
  };
  currentEntry().stickers.push(sticker);
  selectedStickerId = sticker.id;
  renderStickers();
  notify("贴纸已放到页面上");
  persistState();
}

function renderStickers() {
  elements.stickerLayer.innerHTML = "";
  currentEntry().stickers.forEach((sticker) => {
    const preset = STICKERS[sticker.type] || {};
    const button = document.createElement("button");
    button.type = "button";
    button.className = `placed-sticker ${sticker.className}`;
    button.classList.toggle("is-selected", sticker.id === selectedStickerId);
    button.dataset.stickerId = sticker.id;
    button.style.left = `${sticker.x}px`;
    button.style.top = `${sticker.y}px`;
    button.style.setProperty("--rotate", `${sticker.rotate}deg`);
    button.textContent = sticker.text;
    button.setAttribute("aria-label", preset.label || preset.text || "贴纸");
    button.addEventListener("pointerdown", startStickerMove);
    button.addEventListener("click", () => {
      selectedStickerId = sticker.id;
      renderStickers();
    });
    elements.stickerLayer.append(button);
  });
}

function startStickerMove(event) {
  const id = event.currentTarget.dataset.stickerId;
  const sticker = currentEntry().stickers.find((candidate) => candidate.id === id);
  if (!sticker) return;
  selectedStickerId = id;
  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {
    // The pointer may already be gone (a very quick tap); dragging still follows window events.
  }
  dragSticker = {
    pointerId: event.pointerId,
    id,
    startX: event.clientX,
    startY: event.clientY,
    stickerX: sticker.x,
    stickerY: sticker.y,
  };
  renderStickers();
}

function moveSticker(event) {
  if (!dragSticker || event.pointerId !== dragSticker.pointerId) return;
  const sticker = currentEntry().stickers.find((candidate) => candidate.id === dragSticker.id);
  if (!sticker) return;
  const spread = elements.journalSpread.getBoundingClientRect();
  sticker.x = clamp(dragSticker.stickerX + event.clientX - dragSticker.startX, 0, spread.width - 70);
  sticker.y = clamp(dragSticker.stickerY + event.clientY - dragSticker.startY, 0, spread.height - 34);
  renderStickers();
}

function endStickerMove(event) {
  if (!dragSticker || event.pointerId !== dragSticker.pointerId) return;
  dragSticker = null;
  persistState();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function deleteSelectedSticker() {
  if (!selectedStickerId) {
    notify("先点选一枚贴纸");
    return;
  }
  const entry = currentEntry();
  entry.stickers = entry.stickers.filter((sticker) => sticker.id !== selectedStickerId);
  selectedStickerId = null;
  renderStickers();
  notify("已删除贴纸");
  persistState();
}

function deleteCurrentPage() {
  const key = state.selectedDate;
  const entry = state.entries[key];
  if (!entry) {
    notify("当前页还没有需要删除的内容");
    return;
  }
  normalizeEntry(entry, key);
  const index = entry.activePageGroup || 0;
  const hasMultipleGroups = entry.pageGroups.length > 1;
  if (!hasMultipleGroups && !hasUserContent(entry, key)) {
    notify("当前页还没有需要删除的内容");
    return;
  }
  // No confirmation dialog: the page goes to 最近删除 and the toast offers 撤销, as in Apple's apps.
  syncEntryFromForm();
  syncPageGroup(entry, key);
  pruneTrash();
  const deletedAt = new Date().toISOString();
  const trashId = crypto.randomUUID();
  state.trash.unshift(hasMultipleGroups
    ? { id: trashId, deletedAt, date: key, kind: "group", group: clonePageValue(entry.pageGroups[index]) }
    : { id: trashId, deletedAt, date: key, kind: "entry", entry: clonePageValue(entry) });
  if (hasMultipleGroups) {
    entry.pageGroups.splice(index, 1);
    entry.activePageGroup = Math.min(index, entry.pageGroups.length - 1);
    applyPageGroup(entry, entry.pageGroups[entry.activePageGroup], key);
  } else {
    delete state.entries[key];
  }
  [...inkRedoByDate.keys()].forEach((historyKey) => {
    if (historyKey.startsWith(`${key}:`)) inkRedoByDate.delete(historyKey);
  });
  selectedStickerId = null;
  loadEntryIntoForm();
  flushState();
  renderTrash();
  notify(hasMultipleGroups ? "已删除这两页" : "已删除这一天的记录", { label: "撤销", run: () => undoDelete(trashId, index) });
}

// Puts a just-deleted page back exactly where it was; anything else goes through 最近删除.
function undoDelete(trashId, index) {
  const item = state.trash.find((candidate) => candidate.id === trashId);
  settlePageTurn();
  if (!item) return;
  const entry = state.entries[item.date];
  if (item.kind !== "group" || !entry) {
    restoreTrashItem(trashId);
    return;
  }
  syncEntryFromForm();
  normalizeEntry(entry, item.date);
  syncPageGroup(entry, item.date);
  const position = Math.min(index, entry.pageGroups.length);
  entry.pageGroups.splice(position, 0, clonePageValue(item.group));
  entry.activePageGroup = position;
  applyPageGroup(entry, entry.pageGroups[position], item.date);
  state.trash = state.trash.filter((candidate) => candidate.id !== trashId);
  if (item.date === state.selectedDate) loadEntryIntoForm();
  else selectDate(item.date);
  flushState();
  renderTrash();
  notify("已撤销删除");
}

const TRASH_RETENTION_DAYS = 30;

function pruneTrash() {
  const cutoff = Date.now() - TRASH_RETENTION_DAYS * 86_400_000;
  state.trash = (Array.isArray(state.trash) ? state.trash : []).filter((item) => item && Date.parse(item.deletedAt) > cutoff);
}

function trashedGroups(item) {
  if (item.kind === "group") return item.group ? [item.group] : [];
  const entry = clonePageValue(item.entry);
  if (!entry) return [];
  normalizeEntry(entry, item.date);
  return entry.pageGroups;
}

function renderTrash() {
  if (!elements.trashList) return;
  pruneTrash();
  elements.trashMeta.textContent = state.trash.length ? `${state.trash.length} 页` : "空";
  elements.trashList.replaceChildren();
  if (!state.trash.length) {
    const empty = document.createElement("span");
    empty.className = "trash-empty";
    empty.textContent = "没有最近删除的内页";
    elements.trashList.append(empty);
    return;
  }
  state.trash.forEach((item) => {
    const group = trashedGroups(item)[0] || {};
    const text = plainTextFromHtml(group.html || "").trim() || group.text?.trim() || "";
    const daysLeft = Math.max(1, Math.ceil((Date.parse(item.deletedAt) + TRASH_RETENTION_DAYS * 86_400_000 - Date.now()) / 86_400_000));
    const row = document.createElement("div");
    row.className = "trash-item";
    row.innerHTML = `<div><strong>${escapeHtml(item.date)} · ${escapeHtml(group.title || LAYOUT_LABELS[group.mode] || "内页")}</strong><small>${escapeHtml(text.replace(/\s+/g, " ").slice(0, 40) || "无文字内容")} · 剩 ${daysLeft} 天</small></div><button type="button" data-trash-action="restore">恢复</button><button type="button" data-trash-action="purge">彻底删除</button>`;
    row.querySelector('[data-trash-action="restore"]').addEventListener("click", () => restoreTrashItem(item.id));
    row.querySelector('[data-trash-action="purge"]').addEventListener("click", () => purgeTrashItem(item.id));
    elements.trashList.append(row);
  });
}

function restoreTrashItem(id) {
  const item = state.trash.find((candidate) => candidate.id === id);
  settlePageTurn();
  if (!item) return;
  syncEntryFromForm();
  const key = item.date;
  const groups = trashedGroups(item).map((group) => clonePageValue(group));
  if (!groups.length) return;
  let entry = state.entries[key];
  let target = 0;
  if (!entry) {
    entry = item.kind === "entry" ? clonePageValue(item.entry) : createEntry(key);
    state.entries[key] = entry;
    normalizeEntry(entry, key);
    entry.pageGroups = groups;
  } else {
    normalizeEntry(entry, key);
    const blank = entry.pageGroups.length === 1 && !hasUserContent(entry, key);
    const ids = new Set(blank ? [] : entry.pageGroups.map((group) => group.id));
    groups.forEach((group) => { if (ids.has(group.id)) group.id = crypto.randomUUID(); });
    target = blank ? 0 : entry.pageGroups.length;
    entry.pageGroups = blank ? groups : [...entry.pageGroups, ...groups];
  }
  entry.activePageGroup = target;
  applyPageGroup(entry, entry.pageGroups[target], key);
  state.trash = state.trash.filter((candidate) => candidate.id !== id);
  state.calendarFocusDate = key;
  if (key === state.selectedDate) loadEntryIntoForm();
  else selectDate(key);
  flushState();
  renderTrash();
  notify(`已放回${shortDateLabel(key)}`);
}

function purgeTrashItem(id) {
  if (!confirm("彻底删除这页？之后无法再恢复。")) return;
  state.trash = state.trash.filter((candidate) => candidate.id !== id);
  flushState();
  renderTrash();
  notify("已彻底删除");
}

const BACKUP_REMINDER_DAYS = 30;

// How the app is running decides how safe the stored journal is.
function runtimeContext() {
  const ua = navigator.userAgent;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|CriOS|FxiOS/.test(ua);
  const native = Boolean(getNativeHealthBridge()?.isNative);
  return { standalone, isIOS, isSafari, native };
}

function formatMegabytes(bytes) {
  return bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`;
}

async function renderStorageInfo() {
  const context = runtimeContext();
  if (elements.storageWhere) {
    elements.storageWhere.textContent = context.native ? "手机应用 · 本机"
      : context.standalone ? "已安装的开页 · 本机"
      : context.isSafari ? "Safari 网页 · 本机（7 天不打开可能被清理，建议添加到主屏幕）"
      : "当前浏览器 · 本机";
  }
  if (!elements.storageUsage) return;
  let textChars = 0;
  try {
    textChars = (localStorage.getItem(STORAGE_KEY) || "").length;
  } catch {
    // Storage blocked: shown as unknown below.
  }
  // Photos and handwriting are measured in their own store; the browser's estimate also counts the app's offline cache.
  let media = 0;
  if (mediaStoreAvailable) {
    try {
      await mediaTransaction("readonly", (store) => {
        const request = store.openCursor();
        request.addEventListener("success", () => {
          const cursor = request.result;
          if (!cursor) return;
          media += typeof cursor.value === "string" ? cursor.value.length : JSON.stringify(cursor.value).length;
          cursor.continue();
        });
      });
    } catch {
      media = 0;
    }
  }
  const share = Math.round((textChars / 5_000_000) * 100);
  elements.storageUsage.textContent = `文字 ${formatMegabytes(textChars)}（上限约 5 MB，已用 ${share}%）${media > 50_000 ? ` · 图片与手写 ${formatMegabytes(media)}` : ""}`;
}

// localStorage holds about 5 million characters; warn well before a save could fail.
function warnIfStorageNearlyFull(chars) {
  if (chars < LOCAL_STORAGE_SOFT_LIMIT) return;
  try {
    if (sessionStorage.getItem("openpages.storage-warned")) return;
    sessionStorage.setItem("openpages.storage-warned", "1");
  } catch {
    // sessionStorage blocked: the warning may repeat.
  }
  window.setTimeout(() => notify("文字记录已接近浏览器上限，请先导出一份备份", { label: "导出", run: exportData }), 400);
}

// Safari clears a website's storage after 7 days without a visit; home-screen apps are exempt.
function remindHomeScreenIfNeeded() {
  const context = runtimeContext();
  if (!context.isIOS || !context.isSafari || context.standalone || context.native) return;
  try {
    const last = Number(localStorage.getItem("openpages.hint.homescreen") || 0);
    if (Date.now() - last < 7 * 86_400_000) return;
    localStorage.setItem("openpages.hint.homescreen", String(Date.now()));
  } catch {
    return;
  }
  window.setTimeout(() => notify("Safari 里 7 天不打开，记录可能被系统清理", {
    label: "怎么避免",
    run: () => window.setTimeout(() => notify("点 Safari 的「分享」，选「添加到主屏幕」，从桌面图标打开"), 120),
  }), 2400);
}

function renderAbout() {
  if (elements.aboutVersion) elements.aboutVersion.textContent = `v${APP_VERSION}`;
  if (elements.aboutVersionValue) elements.aboutVersionValue.textContent = APP_VERSION;
  if (elements.feedbackLink) {
    elements.feedbackLink.hidden = !FEEDBACK_URL;
    if (FEEDBACK_URL) elements.feedbackLink.href = FEEDBACK_URL;
  }
}

function renderBackupStatus() {
  if (!elements.lastBackupTime) return;
  const date = new Date(state.lastExportedAt || "");
  elements.lastBackupTime.textContent = Number.isNaN(date.getTime())
    ? "还没有导出过"
    : date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

// A gentle once-per-session nudge, only when there is enough written to be worth protecting.
function remindBackupIfDue() {
  const written = Object.entries(state.entries).filter(([key, entry]) => hasMeaningfulContent(entry, key)).length;
  if (written < 7) return;
  const last = Date.parse(state.lastExportedAt || "");
  const days = Number.isNaN(last) ? Infinity : (Date.now() - last) / 86_400_000;
  if (days < BACKUP_REMINDER_DAYS) return;
  try {
    if (sessionStorage.getItem("openpages.backup-reminded")) return;
    sessionStorage.setItem("openpages.backup-reminded", "1");
  } catch {
    // sessionStorage blocked: still show the reminder once for this page load.
  }
  window.setTimeout(() => notify(Number.isFinite(days) ? `已有 ${Math.floor(days)} 天没有导出备份，可在底部保存详情中导出` : `已写下 ${written} 天，建议导出一份备份`), 1600);
}

function exportData() {
  syncEntryFromForm();
  state.lastExportedAt = new Date().toISOString();
  downloadJson({ ...state, exportedFrom: `OpenPages ${APP_VERSION}` }, `openpages-${state.selectedDate}.json`);
  persistState();
  renderBackupStatus();
  notify("已导出完整备份");
}

function downloadText(content, filename, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function exportCurrentDayMarkdown() {
  syncEntryFromForm();
  const entry = currentEntry();
  const lines = [
    "---",
    `date: ${state.selectedDate}`,
    `title: ${JSON.stringify(entry.title)}`,
    ...(MOOD_LABELS[entry.mood] ? [`mood: ${MOOD_LABELS[entry.mood]}`] : []),
    `mode: ${entry.mode || "daily"}`,
    `tags: [${entry.tags.map((tag) => JSON.stringify(tag)).join(", ")}]`,
    "---",
    "",
    `# ${entry.title}`,
    "",
  ];
  if (entry.focus) lines.push(`> 今日重点：${entry.focus}`, "");
  if (entry.text) lines.push(entry.text, "");
  if (entry.bullets.length) {
    lines.push("## 子弹记录", "");
    entry.bullets.forEach((bullet) => {
      lines.push(`${bullet.done ? "- [x]" : "- [ ]"} ${bulletMarker(bullet.type)} ${bullet.text}`);
    });
    lines.push("");
  }
  if (entry.tasks.length) {
    lines.push("## 待办", "");
    entry.tasks.forEach((task) => lines.push(`- [${task.done ? "x" : " "}] ${task.text}`));
    lines.push("");
  }
  if (entry.fragments.length) {
    lines.push("## 灵感便签", "", ...entry.fragments.map((fragment) => `- ${fragment.text}`), "");
  }
  if (entry.photos.length) {
    lines.push("## 图片旁白", "", ...entry.photos.map((photo) => `- ${photo.caption || photo.name || "未命名图片"}`), "");
  }
  lines.push("---", "由开页导出。照片和手写在完整备份里。", "");
  downloadText(lines.join("\n"), `openpages-${state.selectedDate}.md`, "text/markdown;charset=utf-8");
  notify("已导出当前页文字");
}

function printCurrentDay() {
  syncEntryFromForm();
  closeMobilePanel();
  elements.body.classList.add("is-printing-day");
  const cleanup = () => elements.body.classList.remove("is-printing-day");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  window.setTimeout(cleanup, 1200);
}

function builtInTemplatePack() {
  return Object.entries(modePresets()).map(([id, template]) => ({
    id,
    name: template.title,
    mode: id,
    source: "builtin",
    title: template.title,
    focus: template.focus,
    text: template.text,
    tags: [...template.tags],
    tasks: [...template.tasks],
    fragments: [...template.fragments],
    bullets: (template.bullets || []).map((bullet) => ({ type: bullet.type, text: bullet.text })),
    metrics: { ...template.metrics },
  }));
}

function exportTemplatePack() {
  syncEntryFromForm();
  const custom = (state.customTemplates || []).map((template) => ({
    id: template.id,
    name: template.name,
    mode: template.mode || "daily",
    source: "custom",
    title: template.title || template.name,
    focus: template.focus || "",
    text: template.text || "",
    tags: [...(template.tags || [])],
    tasks: [...(template.tasks || [])],
    fragments: [...(template.fragments || [])],
    bullets: (template.bullets || []).map((bullet) => ({ type: bullet.type || "note", text: bullet.text })),
    metrics: { ...(template.metrics || { energy: 3, stress: 2, sleep: 7 }) },
  }));
  downloadJson(
    {
      openpagesTemplatePack: TEMPLATE_PACK_VERSION,
      appVersion: APP_VERSION,
      name: "OpenPages starter template pack",
      exportedAt: new Date().toISOString(),
      templates: [...builtInTemplatePack(), ...custom],
    },
    "openpages-template-pack.json"
  );
  notify("已导出模板包");
}

function normalizeImportedTemplate(template) {
  const name = String(template.name || template.title || "导入模板").trim().slice(0, 40);
  return {
    id: crypto.randomUUID(),
    name,
    mode: template.mode || "daily",
    title: template.title || name,
    focus: template.focus || "",
    text: template.text || "",
    tags: Array.isArray(template.tags) ? template.tags.map(String).slice(0, 12) : [],
    tasks: Array.isArray(template.tasks) ? template.tasks.map(String).slice(0, 20) : [],
    fragments: Array.isArray(template.fragments) ? template.fragments.map(String).slice(0, 20) : [],
    bullets: Array.isArray(template.bullets)
      ? template.bullets
          .filter((bullet) => bullet && bullet.text)
          .slice(0, 40)
          .map((bullet) => ({ type: bullet.type || "note", text: String(bullet.text) }))
      : [],
    photos: [],
    metrics: template.metrics || { energy: 3, stress: 2, sleep: 7 },
    importedAt: new Date().toISOString(),
  };
}

function importTemplatePack(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(String(reader.result));
      const templates = Array.isArray(imported) ? imported : imported.templates;
      if (!Array.isArray(templates)) throw new Error("bad template pack");
      state.customTemplates = state.customTemplates || [];
      const normalized = templates.map(normalizeImportedTemplate);
      state.customTemplates = [...normalized, ...state.customTemplates].slice(0, 48);
      renderCustomTemplates();
      persistState();
      notify(`已导入 ${normalized.length} 个模板`);
    } catch {
      notify("这个文件不是开页的模板包，没有导入任何内容");
    } finally {
      elements.templatePackInput.value = "";
    }
  });
  reader.readAsText(file);
}

async function copyProjectLink() {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    notify("已复制应用链接");
  } catch {
    const input = document.createElement("input");
    input.value = url;
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    notify("已复制应用链接");
  }
}

async function installApp() {
  if (!deferredInstallPrompt) {
    // Only Chromium browsers offer an install prompt; elsewhere, say where the browser's own option is.
    const { standalone, isIOS, isSafari } = runtimeContext();
    const message = standalone ? "开页已经安装在这台设备上"
      : isIOS ? "在 Safari 点「分享」，再选「添加到主屏幕」"
      : isSafari ? "在 Safari 菜单「文件」中选「添加到程序坞」"
      : window.isSecureContext ? "可点地址栏右侧的安装图标；如果没有，说明这个浏览器暂不支持安装"
      : "需要通过 HTTPS 或本机地址打开，浏览器才能安装";
    notify(message);
    return;
  }
  deferredInstallPrompt.prompt();
  const result = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  notify(result.outcome === "accepted" ? "已开始安装 OpenPages" : "已取消安装");
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(String(reader.result));
      if (imported.version !== 1 || !imported.entries || typeof imported.entries !== "object") throw new Error("bad schema");
      const currentCount = Object.keys(state.entries || {}).length;
      const importedCount = Object.keys(imported.entries).length;
      if (currentCount && !confirm(`导入会用备份中的 ${importedCount} 天记录替换本机现有的 ${currentCount} 天记录。建议先导出当前数据。继续导入？`)) return;
      state = normalizeState(imported);
      renderTrash();
      renderBackupStatus();
      selectedStickerId = null;
      applyGlobalSettings();
      loadEntryIntoForm();
      notify("已从备份恢复");
      persistState();
    } catch {
      notify("这个文件不是开页的备份，本机记录没有改动");
    }
  });
  reader.readAsText(file);
}

function applyGlobalSettings() {
  const entry = currentEntry();
  elements.body.dataset.theme = state.theme;
  elements.body.dataset.page = entry.pageStyle || state.pageStyle;
  elements.body.dataset.cover = state.coverTheme || "olive";
  elements.body.dataset.paperTone = state.paperTone || "washi";
  elements.body.dataset.decorativePrints = state.decorativePrints === false ? "off" : "on";
  elements.body.style.setProperty("--custom-cover", state.customCoverColor || "#4f5b50");
  applyAppearanceTokens();
  elements.themeSelect.value = state.theme;
  elements.coverThemeSelect.value = state.coverTheme || "olive";
  elements.customCoverColor.value = state.customCoverColor || "#4f5b50";
  elements.paperToneSelect.value = state.paperTone || "washi";
  elements.decorativePrintToggle.checked = state.decorativePrints !== false;
  if (elements.coverDisplaySelect) elements.coverDisplaySelect.value = state.coverDisplay || "always";
  inkColor = state.inkColor || INK_PALETTES.stationery.colors[0];
  inkSize = Number(state.inkSize || 4);
  inkBrush = INK_BRUSHES[state.inkBrush] ? state.inkBrush : "fountain";
  elements.inkSizeRange.value = String(inkSize);
  elements.inkSmoothingRange.value = String(state.inkSmoothing ?? 30);
  elements.inkPaletteSelect.value = state.inkPalette || "stationery";
  $$("[data-page-style]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.pageStyle === (entry.pageStyle || state.pageStyle));
  });
  renderThemePreview();
  renderThemePresets();
  renderInkPalette();
  renderInkBrushes();
  renderHealthConnection();
}

function normalizeHex(value, fallback = "#4f5b50") {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

function mixHex(left, right, ratio) {
  const parse = (value) => [1, 3, 5].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
  const a = parse(normalizeHex(left));
  const b = parse(normalizeHex(right));
  const mixed = a.map((channel, index) =>
    Math.round(channel * (1 - ratio) + b[index] * ratio)
      .toString(16)
      .padStart(2, "0")
  );
  return `#${mixed.join("")}`;
}

function applyAppearanceTokens() {
  const theme = THEME_TOKENS[state.theme] || THEME_TOKENS.daylight;
  const paper = PAPER_TOKENS[state.paperTone] || PAPER_TOKENS.washi;
  const customCover = normalizeHex(state.customCoverColor);
  const cover = state.coverTheme === "custom"
    ? [mixHex(customCover, "#000000", 0.4), customCover, mixHex(customCover, "#ffffff", 0.24)]
    : COVER_TOKENS[state.coverTheme] || COVER_TOKENS.olive;
  const style = elements.body.style;
  style.setProperty("--desk", theme.desk);
  style.setProperty("--bg-soft", theme.soft);
  style.setProperty("--chrome-live", theme.chrome);
  style.setProperty("--cover-a", cover[0]);
  style.setProperty("--cover-b", cover[1]);
  style.setProperty("--cover-c", cover[2]);
  style.setProperty("--paper", paper[0]);
  style.setProperty("--paper-edge", paper[1]);
  style.setProperty("--paper-rule", paper[2]);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.desk);
}

function selectedOptionLabel(select) {
  return select?.selectedOptions?.[0]?.textContent?.trim() || "";
}

function renderThemePreview() {
  const cover = selectedOptionLabel(elements.coverThemeSelect);
  const paper = selectedOptionLabel(elements.paperToneSelect);
  const light = selectedOptionLabel(elements.themeSelect);
  const entry = currentEntry();
  const paletteButton = elements.pagePalettePicker?.querySelector(`[data-page-palette="${entry.pagePalette || "shiro"}"]`);
  const palette = paletteButton?.title || (entry.pagePalette === "custom" ? "自定义" : "素纸");
  if (elements.themePreviewTitle) elements.themePreviewTitle.textContent = `${cover} · ${paper}`;
  if (elements.themePreviewMeta) elements.themePreviewMeta.textContent = `${light}桌面 · ${palette}页色`;
}

function matchingThemePreset() {
  const entry = currentEntry();
  return Object.entries(THEME_PRESETS).find(([, preset]) =>
    preset.theme === state.theme &&
    preset.coverTheme === state.coverTheme &&
    preset.paperTone === state.paperTone &&
    preset.pagePalette === entry.pagePalette
  )?.[0] || "";
}

function renderThemePresets() {
  if (!elements.themePresetPicker) return;
  const activePreset = matchingThemePreset();
  $$('[data-theme-preset]', elements.themePresetPicker).forEach((button) => {
    const isActive = button.dataset.themePreset === activePreset;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyThemePreset(presetId) {
  const preset = THEME_PRESETS[presetId];
  if (!preset) return;
  const entry = currentEntry();
  state.theme = preset.theme;
  state.coverTheme = preset.coverTheme;
  state.paperTone = preset.paperTone;
  state.inkPalette = preset.inkPalette;
  state.inkColor = preset.inkColor;
  entry.pagePalette = preset.pagePalette;
  entry.pageAccent = preset.pageAccent;
  applyGlobalSettings();
  renderPageAppearance();
  announceAppearance(`已应用「${preset.label}」整本主题`);
  persistState();
  if (window.matchMedia("(max-width: 760px)").matches) window.setTimeout(closeMobilePanel, 140);
}

function announceAppearance(message) {
  elements.body.classList.remove("is-theme-updating");
  void elements.body.offsetWidth;
  elements.body.classList.add("is-theme-updating");
  if (elements.themeApplyState) {
    elements.themeApplyState.textContent = "已更新";
    elements.themeApplyState.classList.remove("is-pulsing");
    void elements.themeApplyState.offsetWidth;
    elements.themeApplyState.classList.add("is-pulsing");
  }
  window.setTimeout(() => elements.body.classList.remove("is-theme-updating"), 520);
  window.setTimeout(() => {
    if (elements.themeApplyState) elements.themeApplyState.textContent = "已应用";
  }, 900);
  notify(message);
}

function renderPageAppearance() {
  const entry = currentEntry();
  const pageStyle = entry.pageStyle || state.pageStyle || "dot";
  const palette = entry.pagePalette || "shiro";
  const illustration = entry.pageIllustration || state.pageIllustration || "botanical";
  const accent = palette === "custom" ? entry.pageAccent || "#667b72" : PAGE_PALETTES[palette] || PAGE_PALETTES.shiro;
  elements.journalSpread.dataset.pagePalette = palette;
  elements.journalSpread.dataset.pageIllustration = illustration;
  elements.journalSpread.classList.remove("is-active");
  elements.journalSpread.style.setProperty("--page-accent", accent);
  elements.body.style.setProperty("--current-page-accent", accent);
  elements.body.dataset.page = pageStyle;
  elements.customPageAccent.value = accent;
  $$('[data-page-palette]', elements.pagePalettePicker).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.pagePalette === palette);
  });
  $$("[data-page-style]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.pageStyle === pageStyle);
  });
  $$('[data-page-illustration]', elements.pageIllustrationPicker).forEach((button) => {
    const active = button.dataset.pageIllustration === illustration;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (elements.pagePaperMeta) {
    elements.pagePaperMeta.textContent = `${PAGE_STYLE_LABELS[pageStyle] || "点阵"} · ${PAGE_ILLUSTRATION_LABELS[illustration] || "植物标本"}`;
  }
  elements.customPageAccent.closest(".custom-page-color")?.classList.toggle("is-active", palette === "custom");
  renderThemePreview();
}

function setPagePalette(palette, accent) {
  const entry = currentEntry();
  entry.pagePalette = palette;
  if (accent) entry.pageAccent = accent;
  renderPageAppearance();
  persistState();
}

function setPageIllustration(illustration) {
  if (!PAGE_ILLUSTRATION_LABELS[illustration]) return;
  state.pageIllustration = illustration;
  currentEntry().pageIllustration = illustration;
  renderPageAppearance();
  revealPageMotif();
  announceAppearance(`本页插画：${PAGE_ILLUSTRATION_LABELS[illustration]}`);
  persistState();
}

let dockReturnFocus = null;

function openMobilePanel(panel) {
  if (!elements.rightDock.classList.contains("is-open")) dockReturnFocus = document.activeElement;
  const panelName = { stickers: "素材", templates: "内页", review: "回看", open: "设置与备份" }[panel] || "手帐工具";
  const panelTitle = $("#dockPanelTitle");
  if (panelTitle) panelTitle.textContent = panelName;
  elements.rightDock.setAttribute("aria-label", panelName);
  if (panel === "review") renderSearch({ force: true });
  elements.dockSections.forEach((section) => {
    const active = section.dataset.panel === panel;
    section.classList.toggle("is-panel-active", active);
    section.setAttribute("aria-hidden", String(!active));
  });
  elements.rightDock.classList.add("is-open");
  elements.rightDock.inert = false;
  elements.rightDock.setAttribute("aria-hidden", "false");
  $(".workspace").inert = true;
  $(".sidebar").inert = true;
  elements.rightDock.dataset.mobilePanel = panel;
  elements.body.dataset.dockPanel = panel;
  elements.dockOverlay.hidden = false;
  elements.body.classList.add("has-dock-open");
  $$('[data-open-mobile-panel]').forEach((button) => {
    button.classList.toggle("is-active", button.dataset.openMobilePanel === panel);
  });
  elements.dockCloseButton.focus({ preventScroll: true });
}

function toggleMobilePanel(panel) {
  const isSameOpenPanel = elements.rightDock.classList.contains("is-open") && elements.rightDock.dataset.mobilePanel === panel;
  if (isSameOpenPanel) {
    closeMobilePanel();
    return;
  }
  openMobilePanel(panel);
}

function toggleFocusMode(force) {
  const shouldFocus = typeof force === "boolean" ? force : !elements.body.classList.contains("is-focus-mode");
  elements.body.classList.toggle("is-focus-mode", shouldFocus);
  elements.focusModeButton?.classList.toggle("is-active", shouldFocus);
  elements.focusModeButton?.setAttribute("aria-label", shouldFocus ? "退出专注书写" : "进入专注书写");
  elements.focusModeButton?.setAttribute("title", shouldFocus ? "退出专注书写" : "专注书写");
  if (shouldFocus) closeMobilePanel();
  notify(shouldFocus ? "已进入专注书写" : "已退出专注书写");
}

function closeMobilePanel() {
  const wasOpen = elements.rightDock.classList.contains("is-open");
  elements.rightDock.classList.remove("is-open");
  elements.rightDock.inert = true;
  elements.rightDock.setAttribute("aria-hidden", "true");
  $(".workspace").inert = false;
  $(".sidebar").inert = false;
  elements.body.classList.remove("has-dock-open");
  delete elements.body.dataset.dockPanel;
  elements.dockOverlay.hidden = true;
  $$('[data-open-mobile-panel]').forEach((button) => button.classList.remove("is-active"));
  if (wasOpen && dockReturnFocus?.isConnected) dockReturnFocus.focus({ preventScroll: true });
}

function defaultMobilePage(mode) {
  return ["bullet", "weekly", "memory", "mood", "monthly", "reading", "travel", "fiveyear"].includes(mode) ? "ink" : "write";
}

function mobilePageForTransition(previousMode, nextMode, currentPage = "write") {
  return previousMode === nextMode ? currentPage : defaultMobilePage(nextMode);
}

function setMobilePage(page) {
  elements.journalSpread.dataset.mobilePage = page;
  elements.body.dataset.inputMode = page;
  elements.mobilePageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mobilePageTarget === page);
    button.setAttribute("aria-pressed", String(button.dataset.mobilePageTarget === page));
  });
  setInkOptionsExpanded(false);
}

function setInkOptionsExpanded(expanded) {
  elements.journalSpread.classList.toggle("is-ink-options-open", expanded);
  if (elements.penOptions) elements.penOptions.hidden = !expanded;
  elements.inkOptionsToggle?.setAttribute("aria-expanded", String(expanded));
  elements.inkOptionsToggle?.setAttribute("title", expanded ? "收起笔刷设置" : "展开笔刷设置");
  elements.inkOptionsToggle?.setAttribute("aria-label", expanded ? "收起笔刷设置" : "展开笔刷设置");
  const label = elements.inkOptionsToggle?.querySelector("span");
  if (label) label.textContent = expanded ? "收起" : "调笔";
}

function setInkFocus(enabled) {
  elements.body.classList.toggle("is-ink-focus", enabled);
  elements.inkFocusButton?.setAttribute("aria-pressed", String(enabled));
  elements.inkFocusButton?.setAttribute("aria-label", enabled ? "退出全屏手写" : "展开手写画布");
  elements.inkFocusButton?.setAttribute("title", enabled ? "退出全屏手写" : "展开手写画布");
  if (enabled) {
    setMobilePage("ink");
    closeMobilePanel();
  }
  notify(enabled ? "已展开手写画布" : "已退出全屏手写");
}

function renderInkBrushes() {
  if (!elements.inkBrushPicker) return;
  elements.inkBrushPicker.innerHTML = "";
  Object.entries(INK_BRUSHES).forEach(([key, brush]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.inkBrush = key;
    button.dataset.brush = key;
    button.className = "brush-type-button";
    button.classList.toggle("is-active", key === inkBrush);
    button.setAttribute("aria-pressed", String(key === inkBrush));
    button.title = `${brush.label}：${brush.note}`;
    button.innerHTML = `<canvas class="brush-type-button__sample" width="96" height="32" aria-hidden="true"></canvas><span><strong>${brush.label}</strong><small>${brush.note}</small></span>`;
    elements.inkBrushPicker.append(button);
    renderBrushSample(button.querySelector("canvas"), key);
  });
  const activeBrush = INK_BRUSHES[inkBrush] || INK_BRUSHES.fountain;
  elements.penButton?.setAttribute("title", `笔刷：${activeBrush.label}`);
  elements.penButton?.setAttribute("aria-label", `笔刷：${activeBrush.label}`);
}

function renderBrushSample(canvas, brush) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const points = [
    { x: 5, y: 21, pressure: brush === "fountain" || brush === "brush" ? 0.12 : 0.5, index: 0 },
    { x: 20, y: 17, pressure: 0.3, index: 1 },
    { x: 38, y: 9, pressure: 0.78, index: 2 },
    { x: 58, y: 14, pressure: 0.94, index: 3 },
    { x: 77, y: 8, pressure: 0.52, index: 4 },
    { x: 91, y: 13, pressure: brush === "fountain" || brush === "brush" ? 0.1 : 0.5, index: 5 },
  ];
  const sampleStroke = { mode: "pen", brush, color: "#35413a", size: brush === "marker" || brush === "brush" ? 4.2 : 3.6, seed: 24681357, points };
  for (let index = 1; index < points.length; index += 1) {
    const start = Math.max(0, index - 2);
    drawLatestStrokeSegment(ctx, { ...sampleStroke, points: points.slice(start, index + 1) }, index);
  }
  ctx.globalAlpha = 1;
}

function setInkBrush(type) {
  if (!INK_BRUSHES[type]) return;
  inkBrush = type;
  state.inkBrush = type;
  renderInkBrushes();
  setDrawMode("pen");
  notify(`已切换为${INK_BRUSHES[type].label}`);
  persistState();
}

function renderInkPalette() {
  const palette = INK_PALETTES[state.inkPalette] || INK_PALETTES.stationery;
  const colors = [...palette.colors, ...(state.customInkColors || [])];
  elements.inkColorPalette.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.inkColor = color;
    button.style.setProperty("--swatch", color);
    button.title = `笔刷颜色 ${color}`;
    button.classList.toggle("is-active", color.toLowerCase() === inkColor.toLowerCase());
    elements.inkColorPalette.append(button);
  });
}

function setInkColor(color) {
  inkColor = color;
  state.inkColor = color;
  renderInkPalette();
  setDrawMode("pen");
  persistState();
}

function addCustomInkColor() {
  const color = elements.customInkColor.value;
  state.customInkColors = state.customInkColors || [];
  if (!state.customInkColors.some((candidate) => candidate.toLowerCase() === color.toLowerCase())) {
    state.customInkColors.push(color);
  }
  setInkColor(color);
  notify("已加入自选色");
}

function setupCanvas() {
  const canvas = elements.inkCanvas;
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  canvas.addEventListener("pointerdown", (event) => {
    if (elements.stylusOnlyToggle.checked && event.pointerType !== "pen") return;
    if (elements.body.dataset.inputMode !== "ink") setMobilePage("ink");
    canvas.closest(".canvas-card")?.classList.remove("is-empty");
    drawActive = true;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // Pointer already released; the stroke is still drawn from the events received.
    }
    const point = canvasPoint(event);
    const startingPressure = event.pressure || 0.5;
    currentStroke = {
      mode: drawMode,
      brush: drawMode === "eraser" ? "eraser" : inkBrush,
      color: inkColor,
      size: inkSize,
      seed: Math.floor(Math.random() * 1000000000),
      points: [{
        ...point,
        index: 0,
        pressure: ["fountain", "brush"].includes(inkBrush) ? Math.min(0.16, startingPressure) : startingPressure,
        tiltX: event.tiltX || 0,
        tiltY: event.tiltY || 0,
        twist: event.twist || 0,
      }],
    };
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!drawActive) return;
    const samples = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];
    samples.forEach((sample) => {
      const rawPoint = canvasPoint(sample);
      const pressure = sample.pressure || event.pressure || 0.5;
      if (!currentStroke) return;
      const previous = currentStroke.points[currentStroke.points.length - 1];
      const smoothing = Math.min(0.8, Math.max(0, Number(state.inkSmoothing || 0) / 100));
      const response = 1 - smoothing * 0.72;
      const point = previous
        ? {
            x: previous.x + (rawPoint.x - previous.x) * response,
            y: previous.y + (rawPoint.y - previous.y) * response,
          }
        : rawPoint;
      currentStroke.points.push({
        ...point,
        index: currentStroke.points.length,
        pressure,
        tiltX: sample.tiltX || event.tiltX || 0,
        tiltY: sample.tiltY || event.tiltY || 0,
        twist: sample.twist || event.twist || 0,
      });
      drawLatestStrokeSegment(ctx, currentStroke);
    });
  });

  canvas.addEventListener("pointerup", finishDrawing);
  canvas.addEventListener("pointercancel", finishDrawing);
}

function clampInk(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function inkNoise(stroke, index, salt = 0) {
  const seed = Number(stroke.seed || 137) + index * 92821 + salt * 68917;
  const value = Math.sin(seed * 0.000137 + salt * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function segmentGeometry(previous, current) {
  const dx = current.x - previous.x;
  const dy = current.y - previous.y;
  const distance = Math.max(0.001, Math.hypot(dx, dy));
  return {
    dx,
    dy,
    distance,
    tx: dx / distance,
    ty: dy / distance,
    nx: -dy / distance,
    ny: dx / distance,
  };
}

function prepareInkContext(ctx, stroke) {
  ctx.globalCompositeOperation = stroke.mode === "eraser" ? "destination-out" : "source-over";
  ctx.globalAlpha = 1;
  ctx.strokeStyle = stroke.color || "#2f3330";
  ctx.fillStyle = stroke.color || "#2f3330";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowBlur = 0;
  ctx.setLineDash([]);
}

function drawRoundLine(ctx, previous, current, width, alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(previous.x, previous.y);
  ctx.lineTo(current.x, current.y);
  ctx.stroke();
}

function drawFountainSegment(ctx, stroke, previous, current) {
  const geometry = segmentGeometry(previous, current);
  const size = stroke.size || 4;
  const step = Math.max(0.65, size * 0.18);
  const count = Math.max(1, Math.ceil(geometry.distance / step));
  const twist = current.twist || previous.twist || 0;
  const nibAngle = twist ? ((twist - 90) * Math.PI) / 180 : -Math.PI / 4;
  ctx.globalAlpha = 0.94;
  for (let sample = 0; sample <= count; sample += 1) {
    const t = sample / count;
    const pressure = clampInk((previous.pressure || 0.5) * (1 - t) + (current.pressure || 0.5) * t, 0.08, 1);
    const major = Math.max(1.15, size * (0.42 + pressure * 0.5));
    const minor = Math.max(0.38, size * (0.105 + pressure * 0.08));
    ctx.beginPath();
    ctx.ellipse(previous.x + geometry.dx * t, previous.y + geometry.dy * t, major, minor, nibAngle, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBallpointSegment(ctx, stroke, previous, current, segmentIndex) {
  const size = stroke.size || 4;
  const geometry = segmentGeometry(previous, current);
  const width = Math.max(0.72, size * 0.28);
  const speedFade = clampInk(1 - geometry.distance / 58, 0.66, 0.94);
  drawRoundLine(ctx, previous, current, width, speedFade);
  if (inkNoise(stroke, segmentIndex, 2) > 0.76) {
    const t = inkNoise(stroke, segmentIndex, 3);
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(previous.x + geometry.dx * t, previous.y + geometry.dy * t, Math.max(0.35, width * 0.42), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMonolineSegment(ctx, stroke, previous, current) {
  drawRoundLine(ctx, previous, current, Math.max(1.1, (stroke.size || 4) * 0.62), 1);
}

function drawPencilSegment(ctx, stroke, previous, current, segmentIndex) {
  const size = stroke.size || 4;
  const geometry = segmentGeometry(previous, current);
  const pressure = clampInk(((previous.pressure || 0.5) + (current.pressure || 0.5)) / 2, 0.1, 1);
  const graphiteWidth = Math.max(1.1, size * (0.3 + pressure * 0.22));
  const strands = 5;
  for (let strand = 0; strand < strands; strand += 1) {
    const offset = (inkNoise(stroke, segmentIndex, strand + 10) - 0.5) * graphiteWidth * 1.35;
    const drift = (inkNoise(stroke, segmentIndex + 1, strand + 20) - 0.5) * graphiteWidth * 0.5;
    const start = { x: previous.x + geometry.nx * offset, y: previous.y + geometry.ny * offset };
    const end = { x: current.x + geometry.nx * (offset + drift), y: current.y + geometry.ny * (offset + drift) };
    drawRoundLine(ctx, start, end, Math.max(0.32, size * 0.085), 0.16 + pressure * 0.1);
  }
  const grainCount = Math.max(1, Math.round(geometry.distance / 2.8));
  for (let grain = 0; grain < grainCount; grain += 1) {
    const t = inkNoise(stroke, segmentIndex, grain + 50);
    const offset = (inkNoise(stroke, segmentIndex, grain + 90) - 0.5) * graphiteWidth * 1.7;
    ctx.globalAlpha = 0.16 + pressure * 0.18;
    ctx.beginPath();
    ctx.arc(
      previous.x + geometry.dx * t + geometry.nx * offset,
      previous.y + geometry.dy * t + geometry.ny * offset,
      0.28 + inkNoise(stroke, segmentIndex, grain + 120) * 0.52,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function drawMarkerSegment(ctx, stroke, previous, current) {
  const size = stroke.size || 4;
  const pressure = clampInk(((previous.pressure || 0.5) + (current.pressure || 0.5)) / 2, 0.2, 1);
  const width = Math.max(7, size * (2.2 + pressure * 0.55));
  const nibAngle = -24 * Math.PI / 180;
  const ox = Math.cos(nibAngle) * width * 0.5;
  const oy = Math.sin(nibAngle) * width * 0.5;
  ctx.globalAlpha = 0.23;
  ctx.beginPath();
  ctx.moveTo(previous.x - ox, previous.y - oy);
  ctx.lineTo(previous.x + ox, previous.y + oy);
  ctx.lineTo(current.x + ox, current.y + oy);
  ctx.lineTo(current.x - ox, current.y - oy);
  ctx.closePath();
  ctx.fill();
}

function drawBrushSegment(ctx, stroke, previous, current, segmentIndex) {
  const size = stroke.size || 4;
  const geometry = segmentGeometry(previous, current);
  const speed = clampInk(geometry.distance / 34, 0, 1);
  const previousPressure = clampInk(previous.pressure || 0.5, 0.06, 1);
  const currentPressure = clampInk(current.pressure || 0.5, 0.06, 1);
  const previousWidth = Math.max(0.9, size * (0.2 + previousPressure * 1.75) * (1 - speed * 0.24));
  const currentWidth = Math.max(0.75, size * (0.18 + currentPressure * 1.75) * (1 - speed * 0.24));

  const bodyPressure = Math.min(previousPressure, currentPressure);
  ctx.globalAlpha = 0.24 + bodyPressure * 0.58;
  ctx.beginPath();
  ctx.moveTo(previous.x + geometry.nx * previousWidth * 0.5, previous.y + geometry.ny * previousWidth * 0.5);
  ctx.lineTo(current.x + geometry.nx * currentWidth * 0.5, current.y + geometry.ny * currentWidth * 0.5);
  ctx.lineTo(current.x - geometry.nx * currentWidth * 0.5, current.y - geometry.ny * currentWidth * 0.5);
  ctx.lineTo(previous.x - geometry.nx * previousWidth * 0.5, previous.y - geometry.ny * previousWidth * 0.5);
  ctx.closePath();
  ctx.fill();

  const dryness = clampInk(0.74 - currentPressure + speed * 0.44, 0.08, 0.78);
  const bristles = 7;
  for (let bristle = 0; bristle < bristles; bristle += 1) {
    if (inkNoise(stroke, segmentIndex, bristle + 160) < dryness * 0.48) continue;
    const lane = bristles === 1 ? 0 : bristle / (bristles - 1) - 0.5;
    const jitter = (inkNoise(stroke, segmentIndex, bristle + 180) - 0.5) * 0.16;
    const startOffset = (lane + jitter) * previousWidth;
    const endOffset = (lane - jitter * 0.6) * currentWidth;
    const start = { x: previous.x + geometry.nx * startOffset, y: previous.y + geometry.ny * startOffset };
    const end = { x: current.x + geometry.nx * endOffset, y: current.y + geometry.ny * endOffset };
    drawRoundLine(ctx, start, end, Math.max(0.36, size * 0.085), 0.26 + (1 - dryness) * 0.42);
  }
}

function drawInkDot(ctx, stroke, point) {
  prepareInkContext(ctx, stroke);
  const brush = INK_BRUSHES[stroke.brush] ? stroke.brush : "fountain";
  const size = stroke.size || 4;
  const pressure = clampInk(point.pressure || 0.5, 0.08, 1);

  if (stroke.mode === "eraser") {
    ctx.beginPath();
    ctx.arc(point.x, point.y, Math.max(9, size * 2.5), 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  if (brush === "fountain") {
    ctx.globalAlpha = 0.94;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, Math.max(1.2, size * (0.42 + pressure * 0.5)), Math.max(0.4, size * 0.16), -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  if (brush === "marker") {
    ctx.globalAlpha = 0.18;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(-24 * Math.PI / 180);
    ctx.fillRect(-size * 1.35, -size * 0.42, size * 2.7, size * 0.84);
    ctx.restore();
    return;
  }
  if (brush === "pencil") {
    for (let grain = 0; grain < 11; grain += 1) {
      const angle = inkNoise(stroke, 0, grain + 220) * Math.PI * 2;
      const radius = inkNoise(stroke, 0, grain + 240) * size * 0.34;
      ctx.globalAlpha = 0.12 + pressure * 0.14;
      ctx.beginPath();
      ctx.arc(point.x + Math.cos(angle) * radius, point.y + Math.sin(angle) * radius, 0.32, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }
  ctx.globalAlpha = brush === "ballpoint" ? 0.9 : brush === "brush" ? 0.78 : 1;
  const radius = brush === "ballpoint" ? size * 0.14 : brush === "brush" ? size * pressure * 0.85 : size * 0.31;
  ctx.beginPath();
  ctx.arc(point.x, point.y, Math.max(0.55, radius), 0, Math.PI * 2);
  ctx.fill();
}

function drawLatestStrokeSegment(ctx, stroke, explicitSegmentIndex) {
  const points = stroke.points;
  if (points.length < 2) return;
  const current = points[points.length - 1];
  const previous = points[points.length - 2];
  const segmentIndex = explicitSegmentIndex ?? current.index ?? points.length - 1;
  const brush = stroke.mode === "eraser" ? "eraser" : INK_BRUSHES[stroke.brush] ? stroke.brush : "fountain";
  prepareInkContext(ctx, stroke);

  if (brush === "eraser") drawRoundLine(ctx, previous, current, Math.max(18, (stroke.size || 4) * 5), 1);
  if (brush === "fountain") drawFountainSegment(ctx, stroke, previous, current);
  if (brush === "ballpoint") drawBallpointSegment(ctx, stroke, previous, current, segmentIndex);
  if (brush === "monoline") drawMonolineSegment(ctx, stroke, previous, current);
  if (brush === "pencil") drawPencilSegment(ctx, stroke, previous, current, segmentIndex);
  if (brush === "marker") drawMarkerSegment(ctx, stroke, previous, current);
  if (brush === "brush") drawBrushSegment(ctx, stroke, previous, current, segmentIndex);
}

function canvasPoint(event) {
  const rect = elements.inkCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * elements.inkCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * elements.inkCanvas.height,
  };
}

function finishDrawing() {
  if (!drawActive) return;
  drawActive = false;
  if (currentStroke && ["fountain", "brush"].includes(currentStroke.brush) && currentStroke.points.length > 2) {
    const taperCount = Math.min(5, currentStroke.points.length - 1);
    currentStroke.points.slice(-taperCount).forEach((point, index) => {
      const remaining = taperCount - index;
      point.pressure = Math.max(0.08, (point.pressure || 0.5) * (remaining / taperCount));
    });
  }
  if (currentStroke?.points.length === 1) {
    const point = currentStroke.points[0];
    const ctx = elements.inkCanvas.getContext("2d");
    drawInkDot(ctx, currentStroke, point);
  }
  if (currentStroke?.points.length) {
    currentEntry().strokes.push(currentStroke);
    inkRedoByDate.set(pageHistoryKey(), []);
  }
  currentStroke = null;
  currentEntry().ink = "";
  updateInkHistoryButtons();
  restoreInk();
  persistState();
}

function restoreInk() {
  const canvas = elements.inkCanvas;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const entry = currentEntry();
  if (Array.isArray(entry.strokes) && entry.strokes.length) {
    replayStrokes(entry.strokes);
    updateInkHistoryButtons();
    return;
  }
  if (!entry.ink) {
    updateInkHistoryButtons();
    return;
  }
  const image = new Image();
  image.addEventListener("load", () => ctx.drawImage(image, 0, 0, canvas.width, image.naturalHeight * canvas.width / image.naturalWidth));
  image.src = entry.ink;
  updateInkHistoryButtons();
}

function replayStrokes(strokes) {
  const ctx = elements.inkCanvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  strokes.forEach((stroke) => {
    if (!stroke.points?.length) return;
    if (stroke.points.length === 1) {
      const point = stroke.points[0];
      drawInkDot(ctx, stroke, point);
      return;
    }
    for (let index = 1; index < stroke.points.length; index += 1) {
      const start = Math.max(0, index - 2);
      drawLatestStrokeSegment(ctx, { ...stroke, points: stroke.points.slice(start, index + 1) }, index);
    }
  });
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.setLineDash([]);
}

function updateInkHistoryButtons() {
  const entry = currentEntry();
  const redo = inkRedoByDate.get(pageHistoryKey()) || [];
  if (elements.undoInkButton) elements.undoInkButton.disabled = !entry.strokes.length;
  if (elements.redoInkButton) elements.redoInkButton.disabled = !redo.length;
  // An empty handwriting page says, once, that it can be written on.
  elements.inkCanvas?.closest?.(".canvas-card")?.classList.toggle("is-empty", !entry.strokes.length && !entry.ink);
}

function undoInk() {
  const entry = currentEntry();
  const stroke = entry.strokes.pop();
  if (!stroke) return;
  const historyKey = pageHistoryKey();
  const redo = inkRedoByDate.get(historyKey) || [];
  redo.push(stroke);
  inkRedoByDate.set(historyKey, redo);
  restoreInk();
  persistState();
}

function redoInk() {
  const historyKey = pageHistoryKey();
  const redo = inkRedoByDate.get(historyKey) || [];
  const stroke = redo.pop();
  if (!stroke) return;
  currentEntry().strokes.push(stroke);
  inkRedoByDate.set(historyKey, redo);
  restoreInk();
  persistState();
}

function clearInk() {
  const entry = currentEntry();
  if (!entry.strokes.length && !entry.ink) return;
  // No confirmation: clearing is undoable from the toast, like deleting a page.
  const previous = { ink: entry.ink, strokes: entry.strokes, key: pageHistoryKey() };
  const canvas = elements.inkCanvas;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  entry.ink = "";
  entry.strokes = [];
  inkRedoByDate.set(pageHistoryKey(), []);
  updateInkHistoryButtons();
  persistState();
  notify("手写页已清空", {
    label: "撤销",
    run: () => {
      if (pageHistoryKey() !== previous.key) return;
      const current = currentEntry();
      current.ink = previous.ink;
      current.strokes = previous.strokes;
      restoreInk();
      persistState();
    },
  });
}

function bindEvents() {
  Object.entries(LAYOUT_LABELS).forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    elements.reviewTypeFilter.append(option);
  });
  elements.bookmarkPageButton.addEventListener("click", togglePageBookmark);
  $$("[data-review-scope]").forEach((button) => button.addEventListener("click", () => setReviewScope(button.dataset.reviewScope)));
  [elements.reviewTypeFilter, elements.reviewTagFilter, elements.reviewStartDate, elements.reviewEndDate].forEach((input) => input.addEventListener("change", renderSearch));
  elements.reviewResetButton.addEventListener("click", resetReviewFilters);
  elements.reviewMoreButton.addEventListener("click", () => {
    const previousCount = elements.searchResults.children.length;
    reviewLimit += 20;
    renderSearch();
    elements.searchResults.children[previousCount]?.focus({ preventScroll: true });
  });
  elements.openCoverButton?.addEventListener("click", openNotebook);
  elements.collectionView?.addEventListener("input", handleCollectionInput);
  elements.collectionView?.addEventListener("change", handleCollectionInput);
  elements.collectionView?.addEventListener("click", handleCollectionClick);

  $$("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewTarget));
  });

  elements.datePicker.addEventListener("change", () => {
    if (!elements.datePicker.value) return;
    navigateToCalendarPage(elements.datePicker.value, "day");
  });
  // Clicking anywhere on the date opens the calendar, not just the small native icon.
  elements.topDatePicker.addEventListener("click", () => {
    try {
      elements.topDatePicker.showPicker?.();
    } catch {
      // Without showPicker the browser's own date field handles the click.
    }
  });
  elements.saveDetails?.addEventListener("toggle", () => {
    if (elements.saveDetails.open) renderStorageInfo();
  });
  elements.todayButton?.addEventListener("click", goToToday);
  elements.footerTodayButton?.addEventListener("click", goToToday);
  elements.topDatePicker.addEventListener("change", () => {
    if (!elements.topDatePicker.value) return;
    navigateToCalendarPage(elements.topDatePicker.value, "day");
  });
  elements.calendarScaleButtons.forEach((button) => {
    button.addEventListener("click", () => openCalendarScale(button.dataset.calendarScale));
  });
  elements.prevDayButton.addEventListener("click", () => shiftDate(-1));
  elements.nextDayButton.addEventListener("click", () => shiftDate(1));
  elements.prevSpreadButton.addEventListener("click", () => stepPageGroup(-1));
  elements.nextSpreadButton.addEventListener("click", () => stepPageGroup(1));
  elements.addSpreadButton.addEventListener("click", addPageGroup);

  [elements.entryTitle, elements.moodSelect, elements.focusInput, elements.modeFocusInput].forEach((input) => {
    input.addEventListener("input", syncEntryFromForm);
    input.addEventListener("change", syncEntryFromForm);
  });
  elements.journalEditor.addEventListener("input", () => {
    refreshEditorHint();
    syncEntryFromForm();
    renderDailyPrompt();
    renderSpreadScope();
  });
  elements.moodChips?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood]");
    if (button) setMood(button.dataset.mood);
  });
  elements.useDailyPromptButton?.addEventListener("click", useDailyPrompt);
  elements.nextDailyPromptButton?.addEventListener("click", nextDailyPrompt);
  elements.journalEditor.addEventListener("blur", syncEntryFromForm);
  // While typing, a phone shows the formatting row (as Notes does); otherwise the row stays folded away.
  elements.journalEditor.addEventListener("focus", () => elements.body.classList.add("is-writing"));
  elements.journalEditor.addEventListener("blur", () => {
    window.setTimeout(() => {
      if (document.activeElement !== elements.journalEditor) elements.body.classList.remove("is-writing");
    }, 120);
  });
  // Back to the text tools as soon as the text is touched: after drawing, the editor may still hold
  // focus, so its focus event would not fire again.
  elements.journalEditor.addEventListener("pointerdown", () => {
    if (elements.body.dataset.inputMode !== "write") setMobilePage("write");
  });
  elements.journalEditor.addEventListener("focus", () => {
    if (elements.body.dataset.inputMode !== "write") setMobilePage("write");
    // An empty paragraph has no line for the caret, so typing landed beside it, outside any paragraph.
    // A blank page gets one real line to write on, with the caret in it.
    const editor = elements.journalEditor;
    if (editor.classList.contains("is-blank") && editor.innerHTML !== "<p><br></p>") {
      editor.innerHTML = "<p><br></p>";
      const range = document.createRange();
      range.setStart(editor.firstChild, 0);
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  elements.editorToolbar.addEventListener("pointerdown", (event) => {
    // Keep the text selection when formatting from the document toolbar.
    if (event.target.closest("[data-editor-command], [data-editor-insert]")) event.preventDefault();
  });
  elements.editorToolbar.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    runEditorCommand(button);
    runEditorInsert(button);
    button.closest(".editor-more")?.removeAttribute("open");
  });

  elements.tagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  });
  elements.tagInput.addEventListener("blur", addTag);

  elements.addFragmentButton.addEventListener("click", addFragment);
  elements.fragmentInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addFragment();
  });
  elements.addBulletButton.addEventListener("click", addBullet);
  elements.bulletInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addBullet();
  });
  elements.syncBulletsButtons.forEach((button) => {
    button.addEventListener("click", syncBulletsToEditor);
  });
  // File inputs are cleared after reading: the same file can be chosen again, and no file lingers in the page.
  elements.photoInput.addEventListener("change", () => {
    const files = [...elements.photoInput.files];
    elements.photoInput.value = "";
    addPhotos(files);
  });
  elements.energyRange.addEventListener("input", () => updateMetric("energy", elements.energyRange.value));
  elements.stressRange.addEventListener("input", () => updateMetric("stress", elements.stressRange.value));
  elements.sleepRange.addEventListener("input", () => updateMetric("sleep", elements.sleepRange.value));

  $$(".prompt-row button").forEach((button) => {
    button.addEventListener("click", () => {
      insertEditorHtml(`<p>${escapeHtml(button.dataset.prompt)}</p>`);
    });
  });

  elements.addTaskButton.addEventListener("click", addTask);
  elements.taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addTask();
  });

  elements.habitInputs.forEach((input) => {
    input.addEventListener("change", () => {
      currentEntry().habits[input.dataset.habit] = input.checked;
      scheduleStats();
      persistState();
    });
  });

  elements.themeSelect.addEventListener("change", () => {
    state.theme = elements.themeSelect.value;
    applyGlobalSettings();
    announceAppearance(`桌面光线：${selectedOptionLabel(elements.themeSelect)}`);
    persistState();
    if (window.matchMedia("(max-width: 760px)").matches) window.setTimeout(closeMobilePanel, 140);
  });

  elements.themePresetPicker?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-preset]");
    if (!button) return;
    applyThemePreset(button.dataset.themePreset);
  });

  elements.coverThemeSelect.addEventListener("change", () => {
    state.coverTheme = elements.coverThemeSelect.value;
    applyGlobalSettings();
    const coverLabel = selectedOptionLabel(elements.coverThemeSelect);
    announceAppearance(`本册封皮：${coverLabel}`);
    persistState();
    if (window.matchMedia("(max-width: 760px)").matches) window.setTimeout(closeMobilePanel, 140);
  });
  elements.customCoverColor.addEventListener("input", () => {
    state.customCoverColor = elements.customCoverColor.value;
    state.coverTheme = "custom";
    applyGlobalSettings();
    persistState();
  });
  elements.customCoverColor.addEventListener("change", () => {
    announceAppearance("已应用自定义封皮");
    if (window.matchMedia("(max-width: 760px)").matches) window.setTimeout(closeMobilePanel, 140);
  });
  elements.paperToneSelect.addEventListener("change", () => {
    state.paperTone = elements.paperToneSelect.value;
    applyGlobalSettings();
    announceAppearance(`内页纸色：${selectedOptionLabel(elements.paperToneSelect)}`);
    persistState();
    if (window.matchMedia("(max-width: 760px)").matches) window.setTimeout(closeMobilePanel, 140);
  });
  elements.coverDisplaySelect?.addEventListener("change", () => {
    state.coverDisplay = elements.coverDisplaySelect.value;
    state.coverDisplayChosen = true;
    persistState();
    notify(selectedOptionLabel(elements.coverDisplaySelect));
  });
  elements.decorativePrintToggle.addEventListener("change", () => {
    state.decorativePrints = elements.decorativePrintToggle.checked;
    applyGlobalSettings();
    persistState();
  });

  elements.pageStyleTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-style]");
    if (!button) return;
    state.pageStyle = button.dataset.pageStyle;
    currentEntry().pageStyle = button.dataset.pageStyle;
    renderPageAppearance();
    persistState();
  });
  elements.pagePalettePicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-palette]");
    if (!button) return;
    setPagePalette(button.dataset.pagePalette);
    announceAppearance(`本页配色：${button.title}`);
  });
  elements.customPageAccent.addEventListener("input", () => {
    setPagePalette("custom", elements.customPageAccent.value);
  });
  elements.pageIllustrationPicker?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-illustration]");
    if (!button) return;
    setPageIllustration(button.dataset.pageIllustration);
  });

  document.addEventListener("click", (event) => {
    const calendarJump = event.target.closest("[data-calendar-scale-jump]");
    if (calendarJump) {
      openCalendarScale(calendarJump.dataset.calendarScaleJump);
      return;
    }
    const layoutButton = event.target.closest("[data-mode-template]");
    if (layoutButton) {
      applyModeTemplate(layoutButton.dataset.modeTemplate);
      closeMobilePanel();
      return;
    }
    const starterButton = event.target.closest("[data-starter-template]");
    if (starterButton) {
      applyStarterTemplate(starterButton.dataset.starterTemplate);
      closeMobilePanel();
    }
  });
  elements.saveTemplateButton.addEventListener("click", saveCustomTemplate);
  elements.exportTemplatePackButton.addEventListener("click", exportTemplatePack);
  elements.templatePackInput.addEventListener("change", () => importTemplatePack(elements.templatePackInput.files[0]));

  elements.exportButton.addEventListener("click", exportData);
  elements.exportMarkdownButton.addEventListener("click", exportCurrentDayMarkdown);
  elements.printDayButton.addEventListener("click", printCurrentDay);
  elements.exportDayButton.addEventListener("click", exportCurrentDay);
  elements.importInput.addEventListener("change", () => {
    const file = elements.importInput.files[0];
    elements.importInput.value = "";
    importData(file);
  });
  elements.installAppButton.addEventListener("click", installApp);
  elements.copyShareLinkButton.addEventListener("click", copyProjectLink);
  elements.healthInput.addEventListener("change", () => {
    const file = elements.healthInput.files[0];
    elements.healthInput.value = "";
    handleHealthImport(file);
  });
  elements.connectHealthButton?.addEventListener("click", requestNativeHealthAccess);
  elements.syncHealthButton?.addEventListener("click", () => syncNativeHealth());
  elements.manageHealthButton?.addEventListener("click", manageNativeHealthAccess);
  elements.healthWeeklyReportButton?.addEventListener("click", generateHealthWeeklyReport);
  elements.saveVersionButton?.addEventListener("click", saveEntryVersion);
  elements.restoreLastVersionButton?.addEventListener("click", openPageHistory);
  elements.savePageVersionButton?.addEventListener("click", saveEntryVersion);
  elements.privacyButton.addEventListener("click", () => {
    elements.body.classList.toggle("is-private");
  });
  elements.focusModeButton.addEventListener("click", () => toggleFocusMode());
  elements.searchInput.addEventListener("input", renderSearch);
  elements.deleteStickerButton.addEventListener("click", deleteSelectedSticker);
  elements.dailyStampButton.addEventListener("click", applyDailyStamp);
  elements.migrateTasksButton.addEventListener("click", migrateOpenTasks);
  elements.deleteCurrentPageButton.addEventListener("click", deleteCurrentPage);

  const stickerSamples = $$(".sticker-sample");
  stickerSamples.forEach((sample) => {
    sample.dataset.stickerCategory = sample.classList.contains("tape")
      ? "washi"
      : sample.classList.contains("art-sticker") || sample.classList.contains("botanical")
        ? "art"
        : "paper";
    sample.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", sample.dataset.sticker);
    });
    sample.addEventListener("click", () => {
      const spread = elements.journalSpread.getBoundingClientRect();
      addSticker(sample.dataset.sticker, spread.width / 2 - 40, 120);
    });
  });
  elements.stickerCategoryTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sticker-filter]");
    if (!button) return;
    const filter = button.dataset.stickerFilter;
    elements.stickerCategoryTabs.querySelectorAll("[data-sticker-filter]").forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    stickerSamples.forEach((sample) => {
      sample.hidden = filter !== "all" && sample.dataset.stickerCategory !== filter;
    });
  });

  elements.journalSpread.addEventListener("dragover", (event) => event.preventDefault());
  elements.journalSpread.addEventListener("drop", (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const rect = elements.journalSpread.getBoundingClientRect();
    addSticker(type, event.clientX - rect.left - 36, event.clientY - rect.top - 18);
  });

  window.addEventListener("pointermove", moveSticker);
  window.addEventListener("pointerup", endStickerMove);
  window.addEventListener("keydown", (event) => {
    // While the cover is closed, the notebook under it does not take shortcuts.
    if (preparedBook) return;
    const target = event.target;
    const isEditing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
    if ((event.key === "Delete" || event.key === "Backspace") && selectedStickerId && !isEditing) {
      deleteSelectedSticker();
    }
    if (event.key === "Escape") {
      closeMobilePanel();
      if (elements.body.classList.contains("is-focus-mode")) toggleFocusMode(false);
      if (elements.body.classList.contains("is-ink-focus")) setInkFocus(false);
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openMobilePanel("review");
      window.setTimeout(() => elements.searchInput.focus(), 50);
    }
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "f") {
      event.preventDefault();
      toggleFocusMode();
    }
    // Date shortcuts only act outside text fields: there, arrows and Option+arrows move the caret.
    const isFormControl = isEditing || target instanceof HTMLSelectElement || target?.closest?.("[role=radiogroup]");
    const panelOpen = elements.rightDock.classList.contains("is-open");
    if (!isFormControl && !panelOpen && !event.metaKey && !event.ctrlKey && !event.isComposing) {
      if (event.key === "ArrowLeft") { event.preventDefault(); shiftDate(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); shiftDate(1); }
      if (!event.altKey && !event.shiftKey && event.key.toLowerCase() === "t") goToToday();
    }
  });

  $$("[data-open-mobile-panel]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMobilePanel(button.dataset.openMobilePanel);
    });
  });
  const settingsGroups = $$("[data-panel=\"open\"] > .settings-group", elements.rightDock);
  settingsGroups.forEach((group) => {
    group.addEventListener("toggle", () => {
      if (!group.open) return;
      settingsGroups.forEach((otherGroup) => {
        if (otherGroup !== group) otherGroup.open = false;
      });
      requestAnimationFrame(() => group.scrollIntoView({ block: "nearest", behavior: "smooth" }));
    });
  });
  elements.dockCloseButton?.addEventListener("click", closeMobilePanel);
  elements.mobilePageButtons.forEach((button) => {
    button.addEventListener("click", () => setMobilePage(button.dataset.mobilePageTarget));
  });
  elements.inkOptionsToggle?.addEventListener("click", () => {
    setInkOptionsExpanded(!elements.journalSpread.classList.contains("is-ink-options-open"));
  });
  elements.inkFocusButton?.addEventListener("click", () => {
    setInkFocus(!elements.body.classList.contains("is-ink-focus"));
  });

  document.addEventListener("click", (event) => {
    const clickedDock = elements.rightDock.contains(event.target);
    const clickedTool = Boolean(event.target.closest("[data-open-mobile-panel]"));
    const clickedViewNav = Boolean(event.target.closest("[data-view-target]"));
    if (!clickedDock && !clickedTool && !clickedViewNav) closeMobilePanel();
  });
  elements.dockOverlay.addEventListener("click", closeMobilePanel);

  elements.penButton.addEventListener("click", () => setDrawMode("pen"));
  elements.eraserButton.addEventListener("click", () => setDrawMode("eraser"));
  elements.undoInkButton.addEventListener("click", undoInk);
  elements.redoInkButton.addEventListener("click", redoInk);
  elements.clearInkButton.addEventListener("click", clearInk);
  elements.inkSizeRange.addEventListener("input", () => {
    inkSize = Number(elements.inkSizeRange.value);
    state.inkSize = inkSize;
    persistState();
  });
  elements.inkSmoothingRange.addEventListener("input", () => {
    state.inkSmoothing = Number(elements.inkSmoothingRange.value);
    persistState();
  });
  elements.inkPaletteSelect.addEventListener("change", () => {
    state.inkPalette = elements.inkPaletteSelect.value;
    const palette = INK_PALETTES[state.inkPalette] || INK_PALETTES.stationery;
    setInkColor(palette.colors[0]);
    notify(`画笔套色：${selectedOptionLabel(elements.inkPaletteSelect)}`);
  });
  elements.addInkColorButton.addEventListener("click", addCustomInkColor);
  elements.customInkColor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomInkColor();
    }
  });
  elements.inkColorPalette.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ink-color]");
    if (!button) return;
    setInkColor(button.dataset.inkColor);
    notify("已换画笔颜色");
  });
  elements.inkBrushPicker?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ink-brush]");
    if (!button) return;
    setInkBrush(button.dataset.inkBrush);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") settlePageTurn();
    if (document.visibilityState === "hidden" && hasPendingChanges) flushState();
    if (document.visibilityState === "visible") checkStoredRevision();
  });
  window.addEventListener("storage", handleExternalStorageChange);
  window.addEventListener("pageshow", (event) => { if (event.persisted) checkStoredRevision(); });
  window.addEventListener("beforeunload", handleBeforeUnload);
}

function pulsePage() {
  if (elements.body.dataset.book !== "open") return;
  elements.journalSpread.classList.remove("is-page-settling");
  requestAnimationFrame(() => {
    elements.journalSpread.classList.add("is-page-settling");
    window.setTimeout(() => elements.journalSpread.classList.remove("is-page-settling"), 520);
  });
}

function revealPageMotif() {
  if (elements.body.dataset.book !== "open" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  elements.journalSpread.classList.remove("is-motif-revealing");
  requestAnimationFrame(() => {
    elements.journalSpread.classList.add("is-motif-revealing");
    window.setTimeout(() => elements.journalSpread.classList.remove("is-motif-revealing"), 720);
  });
}

function setDrawMode(mode) {
  drawMode = mode;
  elements.penButton.classList.toggle("is-active", mode === "pen");
  elements.eraserButton.classList.toggle("is-active", mode === "eraser");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloadingForUpdate = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloadingForUpdate || sessionStorage.getItem("openpages.sw-refresh") === APP_VERSION) return;
    reloadingForUpdate = true;
    sessionStorage.setItem("openpages.sw-refresh", APP_VERSION);
    window.location.reload();
  });

  navigator.serviceWorker
    .register("./service-worker.js", { updateViaCache: "none" })
    .then((registration) => registration.update())
    .catch(() => {});
}

function bindInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    elements.installAppButton?.removeAttribute("disabled");
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    notify("开页已安装");
  });
}

function bindWorkspaceShell() {
  elements.saveNowButton.addEventListener("click", saveNow);
  $("#saveBackupButton").addEventListener("click", exportData);
  $("#openSampleButton")?.addEventListener("click", openSamplePage);
  document.addEventListener("keydown", handleSaveShortcut);
  const toggle = $("#sidebarToggle");
  const scrim = $("#sidebarScrim");
  const compact = window.matchMedia("(max-width: 1100px)");
  const setSidebarOpen = (open) => {
    elements.body.classList.toggle("is-sidebar-open", compact.matches && open);
    elements.body.classList.toggle("is-sidebar-collapsed", !compact.matches && !open);
    scrim.hidden = !compact.matches || !open;
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => {
    const open = compact.matches
      ? elements.body.classList.contains("is-sidebar-open")
      : !elements.body.classList.contains("is-sidebar-collapsed");
    setSidebarOpen(!open);
  });
  scrim.addEventListener("click", () => { setSidebarOpen(false); toggle.focus(); });
  compact.addEventListener("change", () => setSidebarOpen(!compact.matches));
  $("#closeBookButton").addEventListener("click", closeNotebook);
  $("#sidebarCloseBookButton").addEventListener("click", () => {
    if (compact.matches) setSidebarOpen(false);
    closeNotebook();
  });
  $("#returnToNotebook").addEventListener("click", () => {
    closeMobilePanel();
    if (compact.matches) setSidebarOpen(false);
  });
  $("#notebookSidebar").addEventListener("click", (event) => {
    if (compact.matches && event.target.closest(".mini-days button, .recent-list button, [data-open-mobile-panel]")) setSidebarOpen(false);
  });
  const details = $$(".page-meta details");
  details.forEach((detail) => detail.addEventListener("toggle", () => {
    if (detail.open) details.forEach((other) => { if (other !== detail) other.open = false; });
  }));
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".save-details")) $("#saveDetails").open = false;
    if (!event.target.closest(".page-meta")) details.forEach((detail) => { detail.open = false; });
    if (!event.target.closest(".pen-options, #inkOptionsToggle")) setInkOptionsExpanded(false);
    if (!event.target.closest(".editor-more")) $(".editor-more").open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && elements.rightDock.classList.contains("is-open")) {
      const focusable = Array.from(elements.rightDock.querySelectorAll("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea, summary, a[href]")).filter((node) => node.getClientRects().length);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    if (event.key !== "Escape") return;
    if ($("#saveDetails").open) {
      $("#saveDetails").open = false;
      $("#saveDetails summary").focus();
    }
    details.forEach((detail) => { detail.open = false; });
    setInkOptionsExpanded(false);
    if (compact.matches && elements.body.classList.contains("is-sidebar-open")) {
      setSidebarOpen(false);
      toggle.focus();
    }
  });
  setSidebarOpen(!compact.matches);
  elements.rightDock.inert = !elements.rightDock.classList.contains("is-open");
  elements.rightDock.setAttribute("aria-hidden", String(elements.rightDock.inert));
}

// ---- The sample page ----
// A first-time journal gets one written page, dated yesterday, that shows what a page can hold: text,
// a to-do, a loose note, a tag, a mood, a stamp, a sticker and some handwriting. It is an ordinary page
// (it can be edited or deleted) marked `sample`, and it is offered once, when the notebook first opens.
const SAMPLE_PAGE_HTML = [
  '<p class="op-lead">一本放在手机和电脑里的手帐。这一页是它的使用说明，读完可以留着，也可以删去。</p>',
  '<ol class="op-guide">',
  "<li><strong>翻开与合上</strong><span>每次打开先看到封面，轻点即可翻开；顶栏的书本图标将它合上。</span></li>",
  "<li><strong>一日一页</strong><span>顶栏的箭头前后翻阅，「今天」回到当日；一页写不下，底部「续页」再添两页。</span></li>",
  "<li><strong>书写与手绘</strong><span>左页打字，右页以笔、手指或鼠标直接书写；手机上切换到「手写页」。</span></li>",
  "<li><strong>周计划与月计划</strong><span>在顶栏切换，与日记同在一本之中。</span></li>",
  "<li><strong>更换内页</strong><span>「内页样式」中有阅读札记、旅途、拼贴与同日五年，纸面亦可选点阵、横线或方格。</span></li>",
  "<li><strong>贴纸与素材</strong><span>在「素材」中轻点即贴上页面，按住可以移动。</span></li>",
  "</ol>",
  "<blockquote>你写下的一切只保存在这台设备上，不会上传。更换设备之前，请在「设置与备份」中导出一份完整备份。</blockquote>",
  '<p class="op-sign">开页</p>',
].join("");

let sampleIntroPending = false;

function sampleStroke(seed, points, brush = "fountain", size = 4) {
  return {
    mode: "pen",
    brush,
    color: "#35413a",
    size,
    seed,
    points: points.map(([x, y, pressure = 0.55], index) => ({ x, y, pressure, index, tiltX: 0, tiltY: 0, twist: 0 })),
  };
}

// The right page's handwriting: a sprig drawn in fine liner, a stem with leaves set alternately along it,
// in keeping with the notebook's botanical prints.
function sampleStrokes() {
  const stem = (t) => {
    const [x0, y0, x1, y1, x2, y2] = [560, 1120, 300, 820, 470, 360];
    const u = 1 - t;
    return [u * u * x0 + 2 * u * t * x1 + t * t * x2, u * u * y0 + 2 * u * t * y1 + t * t * y2];
  };
  const tangent = (t) => {
    const [ax, ay] = stem(Math.max(0, t - 0.01));
    const [bx, by] = stem(Math.min(1, t + 0.01));
    const length = Math.hypot(bx - ax, by - ay) || 1;
    return [(bx - ax) / length, (by - ay) / length];
  };
  const strokes = [];
  const stemPoints = [];
  for (let step = 0; step <= 48; step += 1) {
    const t = step / 48;
    const [x, y] = stem(t);
    stemPoints.push([x, y, 0.62 - 0.32 * t]);
  }
  strokes.push(sampleStroke(24681357, stemPoints, "monoline", 3.2));
  [0.18, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9].forEach((t, index) => {
    const [bx, by] = stem(t);
    const [tx, ty] = tangent(t);
    const side = index % 2 ? 1 : -1;
    // The leaf leans 48° off the stem, towards its tip, and shortens towards the top.
    const angle = (side * 48 * Math.PI) / 180;
    const dx = tx * Math.cos(angle) - ty * Math.sin(angle);
    const dy = tx * Math.sin(angle) + ty * Math.cos(angle);
    const nx = -dy;
    const ny = dx;
    const length = 132 * (1 - 0.45 * t);
    const width = length * 0.44;
    const outline = [];
    for (let step = 0; step <= 20; step += 1) {
      const s = step / 20;
      const bulge = (Math.sin(Math.PI * s) * width) / 2;
      outline.push([bx + dx * length * s + nx * bulge, by + dy * length * s + ny * bulge, 0.5]);
    }
    for (let step = 19; step >= 0; step -= 1) {
      const s = step / 20;
      const bulge = (Math.sin(Math.PI * s) * width) / 2;
      outline.push([bx + dx * length * s - nx * bulge, by + dy * length * s - ny * bulge, 0.5]);
    }
    strokes.push(sampleStroke(13572468 + index, outline, "monoline", 2.6));
    // The midrib, two thirds of the way along.
    strokes.push(sampleStroke(97531864 + index, [[bx, by, 0.4], [bx + dx * length * 0.66, by + dy * length * 0.66, 0.3]], "monoline", 1.8));
  });
  return strokes;
}

function buildSamplePage(key) {
  const entry = createEntry(key);
  Object.assign(entry, {
    sample: true,
    title: "欢迎使用开页",
    html: SAMPLE_PAGE_HTML,
    text: "",
    mood: "calm",
    stamp: "晴",
    tags: ["示范"],
    tasks: [
      { id: crypto.randomUUID(), text: "读完使用说明", done: true },
      { id: crypto.randomUUID(), text: "翻到今天，写下第一句", done: false },
    ],
    fragments: [{ id: crypto.randomUUID(), text: "一闪而过的念头，先贴在这里，不打断正文。", createdAt: new Date().toISOString() }],
    stickers: [{ id: crypto.randomUUID(), type: "tape-kraft", text: STICKERS["tape-kraft"].text, className: STICKERS["tape-kraft"].className, x: 214, y: 12, rotate: -1.5 }],
    strokes: sampleStrokes(),
  });
  normalizeEntry(entry, key);
  syncPageGroup(entry, key);
  return entry;
}

function sampleDateKey() {
  const date = parseDate(todayKey());
  date.setDate(date.getDate() - 1);
  return toDateKey(date);
}

// Only for a journal that has never been saved: nothing is ever added to existing writing.
function seedSamplePageIfFirstRun() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    return;
  }
  if (stored || state.sampleSeeded || Object.keys(state.entries).length) return;
  const key = sampleDateKey();
  state.entries[key] = buildSamplePage(key);
  state.sampleSeeded = true;
  sampleIntroPending = true;
  persistState();
}

function findSamplePageKey() {
  return Object.keys(state.entries).find((key) => state.entries[key]?.sample) || "";
}

function openSamplePage() {
  let key = findSamplePageKey();
  if (!key) {
    key = sampleDateKey();
    // Never over a page that already has writing on it.
    if (state.entries[key] && hasMeaningfulContent(state.entries[key], key)) {
      notify("昨天那页已经有内容，示范页没有放进去");
      return;
    }
    state.entries[key] = buildSamplePage(key);
    persistState();
  }
  closeMobilePanel();
  navigateToCalendarPage(key, "day");
}

// Offered once, after the cover of a brand-new journal first opens.
function introduceSamplePage() {
  if (!sampleIntroPending) return;
  sampleIntroPending = false;
  window.setTimeout(() => notify("第一次来？昨天那页是一份示范，看看都能做什么", { label: "去看看", run: openSamplePage }), 500);
}

async function startApp() {
  await hydrateStoredMedia();
  seedSamplePageIfFirstRun();
  applyGlobalSettings();
  setSaveState(state.lastSavedAt ? "saved" : "ready");
  bindInstallPrompt();
  bindEvents();
  setupCanvas();
  loadEntryIntoForm();
  if (!shouldShowCover()) {
    openNotebookWithoutCover();
    introduceSamplePage();
  } else scheduleBookPreparation(900);
  window.addEventListener("resize", discardPreparedBook);
  bindWorkspaceShell();
  registerServiceWorker();
  migrateInlineMedia();
  renderTrash();
  renderBackupStatus();
  renderAbout();
  renderStorageInfo();
  remindBackupIfDue();
  remindHomeScreenIfNeeded();
  if (state.health?.connection?.connected && getNativeHealthBridge()?.isNative) {
    window.setTimeout(() => syncNativeHealth({ silent: true }), 450);
  }
}

startApp();
