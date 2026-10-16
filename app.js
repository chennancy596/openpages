const STORAGE_KEY = "openpages.state.v1";
const APP_VERSION = "0.3.3-beta";
const TEMPLATE_PACK_VERSION = 1;
const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const STICKERS = {
  "tape-coral": { text: "Memo", className: "tape coral" },
  "tape-leaf": { text: "Today", className: "tape leaf" },
  "tape-indigo": { text: "青藍", className: "tape indigo tape-pattern" },
  "tape-grid": { text: "Grid", className: "tape gridtape" },
  "tape-kraft": { text: "NOTE", className: "tape kraft" },
  "tape-moss": { text: "FOREST", className: "tape moss" },
  "tape-plum": { text: "余韻", className: "tape plum" },
  "tape-stripe": { text: "LINE", className: "tape stripe" },
  "note-butter": { text: "想法", className: "note butter" },
  "note-sky": { text: "灵感", className: "note sky" },
  "note-matcha": { text: "観察", className: "note matcha" },
  "note-mauve": { text: "余白", className: "note mauve" },
  "note-linen": { text: "日付", className: "note linen-note" },
  "note-bluegray": { text: "読書", className: "note bluegray" },
  "stamp-rose": { text: "DONE", className: "stamp rose" },
  "stamp-ink": { text: "OPEN", className: "stamp ink" },
  "stamp-vermilion": { text: "済", className: "stamp vermilion" },
  "stamp-brass": { text: "旅", className: "stamp brass-stamp" },
  "stamp-tea": { text: "喫茶", className: "stamp tea-stamp" },
  "stamp-read": { text: "読", className: "stamp read-stamp" },
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
  "art-sakura": { text: "桜", label: "樱花枝插画", className: "art-sticker art-sakura" },
  "art-ginkgo": { text: "銀杏", label: "银杏叶插画", className: "art-sticker art-ginkgo" },
  "art-kissa": { text: "珈琲", label: "喫茶店咖啡杯", className: "art-sticker art-kissa" },
  "art-mountain": { text: "山", label: "远山与日出", className: "art-sticker art-mountain" },
  "art-window": { text: "雨", label: "雨日窗景", className: "art-sticker art-window" },
  "art-bird": { text: "旅", label: "飞鸟旅行插画", className: "art-sticker art-bird" },
  "art-lamp": { text: "灯", label: "夜读台灯插画", className: "art-sticker art-lamp" },
};
const DEFAULT_TASK_TEXTS = ["写下今天最重要的一件事", "给自己留一个小小的奖励"];
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
const PAPER_TOKENS = {
  washi: ["#f8f6ef", "#e2dfd6", "#aeb8b0"],
  ivory: ["#e6d3b5", "#cdb38c", "#927858"],
  gray: ["#d8e1dc", "#b6c7bf", "#778e84"],
  blue: ["#cfe3e8", "#a5c8d0", "#638c96"],
  sakura: ["#ecd2da", "#d7a9b6", "#9f6a79"],
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
    rightEyebrow: "Plan & Ritual",
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
  taskInput: $("#taskInput"),
  addTaskButton: $("#addTaskButton"),
  dailyStampButton: $("#dailyStampButton"),
  dailyStampIcon: $("#dailyStampIcon"),
  exportDayButton: $("#exportDayButton"),
  migrateTasksButton: $("#migrateTasksButton"),
  backupReminderButton: $("#backupReminderButton"),
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
  pageFlipEngine: $("#pageFlipEngine"),
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
  recentPages: $("#recentPages"),
  streakDays: $("#streakDays"),
  entryCount: $("#entryCount"),
  fragmentCount: $("#fragmentCount"),
  actionToast: $("#actionToast"),
  dockSections: $$(".right-dock .dock-section"),
};

let state = loadState();
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
let pageFlipInstance = null;
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
    health: { summaries: {}, source: "", connection: null },
    entries: {},
  };
}

function persistState() {
  syncCurrentPageGroup();
  hasPendingChanges = true;
  setSaveState("saving");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    flushState();
  }, 180);
}

function flushState() {
  clearTimeout(saveTimer);
  try {
    syncAllPageGroups();
    const savedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastSavedAt: savedAt }));
    state.lastSavedAt = savedAt;
    hasPendingChanges = false;
    setSaveState("saved");
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
    ready: { text: Object.keys(state.entries).length ? "已载入本机记录" : "等待记录" },
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
  if (pageTurnInProgress) return false;
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

function notify(message) {
  if (!elements.actionToast) return;
  elements.actionToast.textContent = message;
  elements.actionToast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.actionToast.classList.remove("is-visible");
  }, 2200);
  if ("vibrate" in navigator) navigator.vibrate(8);
}

function openNotebook() {
  if (elements.body.dataset.book === "open" || elements.body.dataset.book === "opening") return;
  elements.body.dataset.book = "opening";
  elements.journalSpread.classList.add("is-opening-cover");
  window.setTimeout(() => {
    elements.body.dataset.book = "open";
    elements.journalSpread.classList.remove("is-opening-cover");
    elements.journalSpread.classList.add("is-opened-once");
    revealPageMotif();
    $(".view-stage").scrollTop = 0;
    if (elements.body.dataset.inputMode === "write" && window.matchMedia("(pointer: fine)").matches) {
      elements.journalEditor.focus({ preventScroll: true });
    }
  }, 1120);
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
    title: `${date.getMonth() + 1}月${date.getDate()}日手帐`,
    bookmarked: false,
    mode: "daily",
    mood: "calm",
    text: "",
    html: "",
    focus: "",
    tasks: DEFAULT_TASK_TEXTS.map((text) => ({ id: crypto.randomUUID(), text, done: false })),
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
  if (!Array.isArray(entry.strokes)) entry.strokes = [];
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
  elements.entryTitle.value = entry.title;
  elements.moodSelect.value = entry.mood;
  elements.journalEditor.innerHTML = sanitizeEditorHtml(entry.html || "");
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
  renderCustomTemplates();
  renderStickers();
  renderStats();
  renderSearch();
  renderPlusPanel();
  restoreInk();
}

function renderPageGroupNavigation() {
  const entry = currentEntry();
  const index = entry.activePageGroup || 0;
  const count = entry.pageGroups.length;
  const mode = entry.pageGroups[index]?.mode || entry.mode || "daily";
  const scope = pageScopeForMode(mode);
  const leftPage = index * 2 + 1;
  const rightPage = leftPage + 1;
  if (elements.spreadScopeLabel) {
    const date = parseDate(state.selectedDate);
    elements.spreadScopeLabel.textContent = scope === "month" ? `${date.getMonth() + 1}月计划` : scope === "week" ? "本周计划" : `${date.getMonth() + 1}月${date.getDate()}日`;
  }
  if (elements.spreadPosition) {
    const label = LAYOUT_LABELS[mode] || MODE_COPY[mode]?.editorLabel || "自由内页";
    elements.spreadPosition.textContent = `第 ${index + 1} 组 / 共 ${count} 组`;
    elements.spreadPosition.title = label;
  }
  if (elements.saveNowButton) elements.saveNowButton.disabled = pageTurnInProgress;
  if (elements.leftPageNumber) elements.leftPageNumber.textContent = String(leftPage).padStart(3, "0");
  if (elements.rightPageNumber) elements.rightPageNumber.textContent = String(rightPage).padStart(3, "0");
  if (elements.prevSpreadButton) elements.prevSpreadButton.disabled = pageTurnInProgress || index === 0;
  if (elements.nextSpreadButton) elements.nextSpreadButton.disabled = pageTurnInProgress || index >= count - 1;
  if (elements.addSpreadButton) {
    elements.addSpreadButton.disabled = pageTurnInProgress;
    elements.addSpreadButton.setAttribute("aria-label", `续一页，当前第 ${index + 1} 组，共 ${count} 组`);
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
  renderStats();
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
    button.innerHTML = `<small>${scale === "week" ? "周计划 · 当天安排" : "月计划 · 本月主线"}</small><span>${escapeHtml(text)}</span><svg aria-hidden="true"><use href="#icon-redo"></use></svg>`;
    button.title = scale === "week" ? "打开原周计划" : "打开原月计划";
    button.addEventListener("click", () => openPageGroupForDate(key, index, { focusDate: originKey }));
    elements.linkedPlansList.append(button);
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
    elements.dayPageShelfMeta.textContent = `${date.getMonth() + 1}月${date.getDate()}日 · 0 张`;
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
  elements.dayPageShelfMeta.textContent = `${date.getMonth() + 1}月${date.getDate()}日 · ${dayPages.length} 张`;
  dayPages.forEach(({ group, index }, shelfIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-page-shelf__item";
    button.classList.toggle("is-active", key === state.selectedDate && index === (entry.activePageGroup || 0));
    const label = LAYOUT_LABELS[group.mode] || MODE_COPY[group.mode]?.editorLabel || "自由内页";
    button.innerHTML = `<span>${String(shelfIndex + 1).padStart(2, "0")}</span><strong>${escapeHtml(label)}</strong>`;
    button.setAttribute("aria-label", `打开 ${key} 的${label}`);
    button.addEventListener("click", () => openPageGroupForDate(key, index));
    elements.dayPageShelfList.append(button);
  });
}

function renderStamp() {
  const entry = currentEntry();
  const stampMap = {
    sunny: "晴",
    calm: "穏",
    busy: "忙",
    tired: "休",
    spark: "閃",
  };
  elements.dailyStampIcon.textContent = entry.stamp || stampMap[entry.mood] || "印";
  elements.dailyStampButton.classList.toggle("is-stamped", Boolean(entry.stamp));
}

function applyDailyStamp() {
  const entry = currentEntry();
  const options = ["晴", "穏", "書", "歩", "休", "閃", "済"];
  const current = options.indexOf(entry.stamp);
  entry.stamp = options[(current + 1) % options.length];
  renderStamp();
  renderStats();
  notify(`已盖今日印章：${entry.stamp}`);
  persistState();
}

function migrateOpenTasks() {
  const entry = currentEntry();
  const openTasks = entry.tasks.filter((task) => !task.done);
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
    text: `${openTasks.length} 个未完成任务已迁移到 ${nextKey}`,
    createdAt: new Date().toISOString(),
  });
  elements.workflowNote.textContent = `已迁移 ${openTasks.length} 个任务到 ${nextKey}。`;
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

function createBackupReminder() {
  elements.workflowNote.textContent = "建议每周导出一次 JSON 备份；如果后续接 WebDAV/Git，可在这里配置自动提醒。";
  notify("已生成备份提示");
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
  if (mode === "weekly") {
    const end = new Date(date);
    end.setDate(date.getDate() + 6);
    fresh.title = `${date.getMonth() + 1}/${date.getDate()} - ${end.getMonth() + 1}/${end.getDate()} · 周计划`;
  }
  if (mode === "daily") fresh.title = `${date.getMonth() + 1}月${date.getDate()}日手帐`;
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
  if (!key || pageTurnInProgress) return;
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
  if (!focusKey || pageTurnInProgress) return;
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

  const labels = { month: "已打开月计划", week: "已打开周计划", day: "已打开日记" };
  notify(labels[calendarScaleForMode(mode)] || labels.day);
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

function selectDate(key) {
  if (!key || key === state.selectedDate || pageTurnInProgress) return;
  syncEntryFromForm();
  pageTurnCompletion = null;
  const previousKey = state.selectedDate;
  const preservedMobilePage = mobilePageForTransition(currentEntry().mode, state.entries[key]?.mode || "daily", elements.journalSpread.dataset.mobilePage);
  const direction = key > state.selectedDate ? "forward" : "backward";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (elements.body.dataset.book !== "open" || reduceMotion) {
    commitSelectedDate(key);
    setMobilePage(preservedMobilePage);
    return;
  }

  pageTurnInProgress = true;
  const spread = elements.journalSpread;
  const turnClass = `is-turning-${direction}`;
  spread.classList.remove("is-turning-forward", "is-turning-backward", "is-turn-content-swapped");
  const isNarrowScreen = window.matchMedia("(max-width: 760px)").matches;
  const turnDuration = isNarrowScreen ? 740 : 920;
  const previousSpread = capturePageFlipSnapshot();
  commitSelectedDate(key);
  setMobilePage(preservedMobilePage);
  const usesPageFlipEngine = startPageFlipEngine(direction, turnDuration, previousSpread);
  if (!usesPageFlipEngine) {
    commitSelectedDate(previousKey);
    setMobilePage(preservedMobilePage);
    preparePageTurnFace(direction);
  }
  void spread.offsetWidth;
  spread.classList.add(turnClass);
  setDateNavigationDisabled(true);

  if (!usesPageFlipEngine) {
    pageTurnSwapTimer = window.setTimeout(() => {
      commitSelectedDate(key);
      setMobilePage(preservedMobilePage);
      spread.classList.add("is-turn-content-swapped");
    }, Math.round(turnDuration * 0.48));
  }

  pageTurnFallbackTimer = window.setTimeout(finishPageTurn, turnDuration + 120);
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
    if (!sourceField) return;
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

function makePageFlipLeaf(content = null) {
  const page = document.createElement("div");
  page.className = "page-flip-engine__page";
  page.dataset.density = "soft";
  if (content) page.append(content);
  else page.innerHTML = '<span class="page-flip-engine__blank" aria-hidden="true"></span>';
  return page;
}

function capturePageFlipSnapshot() {
  const spread = elements.journalSpread;
  const leftPage = spread?.querySelector(".paper-page--left");
  const rightPage = spread?.querySelector(".paper-page--right");
  if (!leftPage || !rightPage) return null;
  return {
    left: clonePageForFlip(leftPage),
    right: clonePageForFlip(rightPage),
    mobilePage: spread.dataset.mobilePage || "journal",
  };
}

function startPageFlipEngine(direction, duration, previousSpread) {
  const PageFlip = window.St?.PageFlip || window.OpenPagesPageFlip;
  const engine = elements.pageFlipEngine;
  if (!PageFlip || !engine || !previousSpread) return false;

  const spread = elements.journalSpread;
  const leftPage = spread.querySelector(".paper-page--left");
  const rightPage = spread.querySelector(".paper-page--right");
  if (!leftPage || !rightPage) return false;
  const rect = spread.getBoundingClientRect();
  const isNarrowScreen = window.matchMedia("(max-width: 1100px)").matches;
  const visiblePage = isNarrowScreen && spread.dataset.mobilePage === "ink" ? rightPage : leftPage;
  const pageRect = visiblePage.getBoundingClientRect();
  const pageWidth = Math.round(pageRect.width);
  const pageHeight = Math.round(pageRect.height);
  if (!pageWidth || !pageHeight) return false;
  engine.style.setProperty("top", `${pageRect.top - rect.top}px`, "important");
  engine.style.setProperty("left", `${pageRect.left - rect.left}px`, "important");
  engine.style.setProperty("right", "auto", "important");
  engine.style.setProperty("bottom", "auto", "important");
  engine.style.setProperty("width", `${pageWidth * (isNarrowScreen ? 1 : 2)}px`, "important");
  engine.style.setProperty("height", `${pageHeight}px`, "important");
  const targetLeft = clonePageForFlip(leftPage);
  const targetRight = clonePageForFlip(rightPage);
  const visibleTarget = spread.dataset.mobilePage === "ink" ? targetRight : targetLeft;
  const visiblePrevious = previousSpread.mobilePage === "ink" ? previousSpread.right : previousSpread.left;
  const pages = [];
  const startPage = direction === "forward" ? 0 : isNarrowScreen ? 1 : 2;

  if (isNarrowScreen) {
    if (direction === "forward") pages.push(makePageFlipLeaf(visiblePrevious), makePageFlipLeaf(visibleTarget));
    else pages.push(makePageFlipLeaf(visibleTarget), makePageFlipLeaf(visiblePrevious));
  } else if (direction === "forward") {
    pages.push(
      makePageFlipLeaf(previousSpread.left),
      makePageFlipLeaf(previousSpread.right),
      makePageFlipLeaf(targetLeft),
      makePageFlipLeaf(targetRight),
    );
  } else {
    pages.push(
      makePageFlipLeaf(targetLeft),
      makePageFlipLeaf(targetRight),
      makePageFlipLeaf(previousSpread.left),
      makePageFlipLeaf(previousSpread.right),
    );
  }

  engine.replaceChildren(...pages);
  engine.hidden = false;
  try {
    pageFlipInstance = new PageFlip(engine, {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      minWidth: pageWidth,
      maxWidth: pageWidth,
      minHeight: pageHeight,
      maxHeight: pageHeight,
      startPage,
      drawShadow: true,
      flippingTime: duration,
      usePortrait: isNarrowScreen,
      autoSize: false,
      maxShadowOpacity: 0.18,
      showCover: false,
      mobileScrollSupport: false,
      clickEventForward: false,
      useMouseEvents: false,
      showPageCorners: false,
      disableFlipByClick: true,
    });
    pageFlipInstance.loadFromHTML(pages);
    spread.classList.add("is-pageflip-engine-active");
    window.setTimeout(() => {
      try {
        if (direction === "forward") pageFlipInstance?.flipNext("bottom");
        else pageFlipInstance?.flipPrev("bottom");
      } catch {
        finishPageTurn();
      }
    }, 18);
    return true;
  } catch {
    engine.hidden = true;
    engine.replaceChildren();
    pageFlipInstance = null;
    return false;
  }
}

function preparePageTurnFace(direction) {
  if (!elements.pageTurnSheet) return;
  const spread = elements.journalSpread;
  const isNarrowScreen = window.matchMedia("(max-width: 760px)").matches;
  const mobilePage = spread.dataset.mobilePage;
  const sourcePage = isNarrowScreen
    ? mobilePage === "ink" ? ".paper-page--right" : ".paper-page--left"
    : direction === "forward" ? ".paper-page--right" : ".paper-page--left";
  elements.pageTurnSheet.replaceChildren();
  elements.pageTurnSheet.classList.remove("has-page-turn-content");
  elements.pageTurnSheet.dataset.sourcePage = sourcePage;
  elements.pageTurnSheet.dataset.direction = direction;
  if (isNarrowScreen) {
    const source = spread.querySelector(sourcePage);
    if (source) {
      const face = clonePageForFlip(source);
      face.classList.add("page-turn-content");
      elements.pageTurnSheet.append(face);
      elements.pageTurnSheet.classList.add("has-page-turn-content");
    }
  }
}

function finishPageTurn() {
  if (!pageTurnInProgress) return;
  window.clearTimeout(pageTurnSwapTimer);
  window.clearTimeout(pageTurnFallbackTimer);
  elements.journalSpread.classList.remove("is-turning-forward", "is-turning-backward", "is-turn-content-swapped", "is-pageflip-engine-active");
  elements.pageTurnSheet?.replaceChildren();
  elements.pageTurnSheet?.classList.remove("has-page-turn-content");
  try {
    pageFlipInstance?.destroy();
  } catch {}
  pageFlipInstance = null;
  if (elements.pageFlipEngine) {
    if (!elements.pageFlipEngine.isConnected && elements.dailyStampButton) {
      elements.journalSpread.insertBefore(elements.pageFlipEngine, elements.dailyStampButton);
    }
    elements.pageFlipEngine.hidden = true;
    elements.pageFlipEngine.replaceChildren();
  }
  pageTurnInProgress = false;
  setDateNavigationDisabled(false);
  const completion = pageTurnCompletion;
  pageTurnCompletion = null;
  completion?.();
}

function handlePageTurnEnd(event) {
  if (event.target !== elements.pageTurnSheet || !/^(pageLeaf|mobilePaper)/.test(event.animationName)) return;
  finishPageTurn();
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
  if (pageTurnInProgress) return;
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
  if (elements.body.dataset.book !== "open" || reduceMotion) {
    commitPageGroup(targetIndex);
    setMobilePage(preservedMobilePage);
    complete();
    return;
  }

  pageTurnInProgress = true;
  pageTurnCompletion = complete;
  const spread = elements.journalSpread;
  const turnClass = `is-turning-${direction}`;
  spread.classList.remove("is-turning-forward", "is-turning-backward", "is-turn-content-swapped");
  const isNarrowScreen = window.matchMedia("(max-width: 760px)").matches;
  const turnDuration = isNarrowScreen ? 740 : 920;
  const previousSpread = capturePageFlipSnapshot();
  commitPageGroup(targetIndex);
  setMobilePage(preservedMobilePage);
  const usesPageFlipEngine = startPageFlipEngine(direction, turnDuration, previousSpread);
  if (!usesPageFlipEngine) {
    commitPageGroup(previousIndex);
    setMobilePage(preservedMobilePage);
    preparePageTurnFace(direction);
  }
  void spread.offsetWidth;
  spread.classList.add(turnClass);
  setDateNavigationDisabled(true);

  if (!usesPageFlipEngine) {
    pageTurnSwapTimer = window.setTimeout(() => {
      commitPageGroup(targetIndex);
      setMobilePage(preservedMobilePage);
      spread.classList.add("is-turn-content-swapped");
    }, Math.round(turnDuration * 0.48));
  }
  pageTurnFallbackTimer = window.setTimeout(finishPageTurn, turnDuration + 120);
}

function addPageGroup() {
  if (pageTurnInProgress) return;
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
  notify("已续一组空白跨页，请选择内页样式");
}

function setDateNavigationDisabled(disabled) {
  elements.prevDayButton.disabled = disabled;
  elements.nextDayButton.disabled = disabled;
  elements.datePicker.disabled = disabled;
  elements.topDatePicker.disabled = disabled;
  elements.calendarScaleButtons.forEach((button) => {
    button.disabled = disabled;
  });
  elements.journalSpread.setAttribute("aria-busy", String(disabled));
  if (disabled) {
    elements.prevSpreadButton.disabled = true;
    elements.nextSpreadButton.disabled = true;
    elements.addSpreadButton.disabled = true;
  } else {
    renderPageGroupNavigation();
  }
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
    title: elements.entryTitle.value.trim() || "未命名手帐",
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

function insertEditorHtml(html) {
  elements.journalEditor.focus();
  document.execCommand("insertHTML", false, html);
  syncEntryFromForm();
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
      renderStats();
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
  renderStats();
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
      renderStats();
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
      renderStats();
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
  renderStats();
  renderSearch();
  notify("已记录一条子弹");
  persistState();
}

function syncBulletsToEditor() {
  const entry = currentEntry();
  if (!entry.bullets.length) {
    notify("右页还没有可整理的子弹记录");
    return;
  }
  const stamp = new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(parseDate(state.selectedDate));
  const items = entry.bullets
    .map((bullet) => `<li><strong>${escapeHtml(bullet.done ? "x" : bulletMarker(bullet.type))}</strong> ${escapeHtml(bullet.text)}</li>`)
    .join("");
  const block = `<p><strong>${stamp} Bullet Log 整理</strong></p><ul class="synced-bullet-list">${items}</ul>`;
  elements.journalEditor.innerHTML = `${elements.journalEditor.innerHTML}${block}`;
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
      renderStats();
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
  renderStats();
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
  elements.versionCount.textContent = versions.length ? `${versions.length} 个本地快照` : "尚无快照";
  elements.restoreLastVersionButton.disabled = versions.length === 0;
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

function saveEntryVersion() {
  syncEntryFromForm();
  const entry = currentEntry();
  const fields = [
    "title", "mode", "mood", "text", "html", "focus", "tasks", "tags", "fragments", "bullets",
    "metrics", "stamp", "pagePalette", "pageAccent", "habits", "week", "strokes",
  ];
  const data = Object.fromEntries(fields.map((field) => [field, JSON.parse(JSON.stringify(entry[field]))]));
  entry.versions.push({ id: crypto.randomUUID(), savedAt: new Date().toISOString(), data });
  entry.versions = entry.versions.slice(-12);
  renderPlusPanel();
  persistState();
  notify("已保存当前页面快照");
}

function restoreLastEntryVersion() {
  const entry = currentEntry();
  const snapshot = entry.versions?.[entry.versions.length - 1];
  if (!snapshot) return;
  const approved = window.confirm(`恢复 ${new Date(snapshot.savedAt).toLocaleString("zh-CN")} 的页面内容？当前照片和贴纸会保留。`);
  if (!approved) return;
  Object.assign(entry, JSON.parse(JSON.stringify(snapshot.data)));
  loadEntryIntoForm();
  persistState();
  notify("已恢复最近页面快照");
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
  elements.healthImportStatus.textContent = "正在检查系统健康服务...";
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
  elements.healthImportStatus.textContent = "正在同步最近 30 天的健康摘要...";
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
    renderStats();
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
  renderStats();
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
  const done = entry.tasks.filter((task) => task.done).length;
  elements.taskCount.textContent = `${done}/${entry.tasks.length}`;
  if (!entry.tasks.length) {
    appendEmptyState(elements.taskList, "没有待办。");
    return;
  }

  entry.tasks.forEach((task) => {
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
    .slice()
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
    const index = hasUserContent(groups[activeIndex], key) ? activeIndex : Math.max(0, groups.findIndex((group) => hasUserContent(group, key)));
    const primary = groups[index];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-page";
    button.innerHTML = `<strong>${escapeHtml(formatDateLabel(key))}</strong><span>${escapeHtml(primary.title || "未命名日页")}${groups.length > 1 ? ` · ${groups.length} 组` : ""}</span>`;
    button.addEventListener("click", () => openPageGroupForDate(key, index));
    elements.recentPages.append(button);
  });
}

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
      focus: "快速记录，然后再整理",
      text: "",
      tags: ["Bullet"],
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
      focus: "把今天变成可以回看的小场景",
      text: "地点：\n声音：\n味道：\n想贴上的票根/照片：\n这一刻的旁白：",
      tags: ["拼贴", "记忆"],
      tasks: ["选一张照片", "写下三件小物", "整理成一页拼贴"],
      fragments: ["适合旅行、展览、约会、读书页，页面不必写满。"],
      bullets: [],
      photos: [],
      metrics: { energy: 4, stress: 2, sleep: 7 },
    },
    mood: {
      title: "情绪追踪",
      focus: "先看见自己，再安排事情",
      text: "今天的情绪天气：\n身体感受：\n触发点：\n让我稳定下来的事：\n想对自己说：",
      tags: ["情绪", "自我照顾"],
      tasks: ["记录情绪天气", "做一个安定动作", "减少一个不必要任务"],
      fragments: ["低能量日也算记录，贴一枚小贴纸就很好。"],
      bullets: [
        { type: "note", text: "触发点是什么" },
        { type: "note", text: "什么让我稳定下来" },
      ],
      photos: [],
      metrics: { energy: 2, stress: 3, sleep: 7 },
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
      focus: "读慢一点，留下真正有回声的部分",
      text: "摘句：\n\n联想：\n\n读完后想带走：",
      tags: ["阅读"],
      tasks: [],
      fragments: ["不做读书数量排行榜，只留下与自己有关的句子。"],
      bullets: [],
      photos: [],
      metrics: { energy: 3, stress: 2, sleep: 7 },
    },
    travel: {
      title: "旅行手帐",
      focus: "收下路线之外发生的事",
      text: "今日路线：\n\n计划之外：\n\n想带回生活：",
      tags: ["旅行"],
      tasks: [],
      fragments: ["照片、票根和手写可以混在同一页，不必排得整齐。"],
      bullets: [],
      photos: [],
      metrics: { energy: 4, stress: 1, sleep: 7 },
    },
    fiveyear: {
      title: "同日五年",
      focus: "写给以后会回到这一页的自己",
      text: "天气与体感：\n\n今天最具体的一件事：\n\n留给明年今天：",
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
    notify(mode === "monthly" ? "已打开月计划" : "已打开周计划");
    return;
  }
  if (usesBuiltIn && mode === "daily") {
    const date = parseDate(calendarStorageKey("day", calendarFocusKey()));
    template = { ...template, title: `${date.getMonth() + 1}月${date.getDate()}日手帐` };
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

  if (index < 0) {
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
  notify(`已加入${usesBuiltIn ? LAYOUT_LABELS[mode] || modePresets()[mode].title : template.name || template.title}，保存在 ${targetKey}`);
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
  notify(`已加入${starter.label}起稿，保存在 ${targetKey}`);
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

function applyTemplateNonDestructively(entry, template) {
  const presets = Object.values(modePresets());
  const generatedTitles = new Set(presets.map((preset) => preset.title));
  const generatedFocus = new Set(presets.map((preset) => preset.focus));
  const generatedText = new Set(presets.map((preset) => preset.text));
  const generatedTags = new Set(presets.flatMap((preset) => preset.tags));
  const generatedTasks = new Set([...DEFAULT_TASK_TEXTS, ...presets.flatMap((preset) => preset.tasks)]);
  const generatedFragments = new Set(presets.flatMap((preset) => preset.fragments));

  if (generatedTitles.has(entry.title) || /^\d+月\d+日手帐$/.test(entry.title)) entry.title = template.title;
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
    if (elements.entryContextMeta) {
      elements.entryContextMeta.textContent = [copy.showMood && "心情", copy.showTags && "页签", copy.prompts.length && "提示"].filter(Boolean).join(" · ");
    }
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
    days.push(`<button type="button" data-collection-date="${key}" class="${date.getMonth() === month ? "" : "is-muted"} ${key === focusKey ? "is-current" : ""} ${saved ? "has-entry" : ""}" aria-label="打开 ${key} 的日页">${date.getDate()}</button>`);
  }
  root.innerHTML = `
    <div class="collection-heading"><div><span>月历</span><h3>${year}.${String(month + 1).padStart(2, "0")}</h3></div></div>
    <div class="collection-calendar" aria-label="月历">
      <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
      ${days.join("")}
    </div>
    <div class="collection-fields collection-fields--split">
      <label><span>本月主线 · 最多三件</span><textarea data-module-field="priorities" placeholder="只留下真正重要的事，也可以空着">${moduleValue(data.priorities)}</textarea></label>
      <label><span>无日期备忘</span><textarea data-module-field="memo" placeholder="不确定哪天做的事，先放在这里">${moduleValue(data.memo)}</textarea></label>
    </div>`;
}

function renderReadingCollection(root, data) {
  const rating = Number(data.rating) || 0;
  root.innerHTML = `
    <div class="collection-heading"><div><h3>阅读札记</h3></div></div>
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
    <div class="collection-heading"><div><span>旅行手帐</span><h3>${moduleValue(data.destination) || "旅途采集"}</h3></div></div>
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
    <div class="collection-heading"><div><span>同日五年</span><h3>${selected.getMonth() + 1}月${selected.getDate()}日</h3></div></div>
    <div class="fiveyear-list">${rows.join("")}</div>
    <label class="collection-wide-field"><span>这一年的一句话</span><input data-module-field="line" value="${moduleValue(data.line)}" placeholder="一句就够了" /></label>`;
}

function handleCollectionInput(event) {
  const field = event.target.closest("[data-module-field]");
  if (!field) return;
  const mode = currentEntry().mode;
  currentModeModule(mode)[field.dataset.moduleField] = field.value;
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

function renderCustomTemplates() {
  state.customTemplates = state.customTemplates || [];
  elements.customTemplateList.innerHTML = "";
  if (!state.customTemplates.length) {
    elements.customTemplateList.innerHTML = "<span>还没有自定义模板</span>";
    return;
  }
  state.customTemplates.slice(0, 6).forEach((template) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(template.name)}</strong><span>${escapeHtml(template.tags.map((tag) => `#${tag}`).join(" ") || "自定义")}</span>`;
    button.addEventListener("click", () => applyModeTemplate(template.mode || "daily", template));
    elements.customTemplateList.append(button);
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

function renderSearch() {
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
  elements.reviewSummary.textContent = invalidRange ? "结束日期不能早于开始日期" : `${matches.length} 组内页${matches.length > reviewLimit ? ` · 已显示 ${reviewLimit} 组` : ""}`;
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
    button.innerHTML = `
      <span class="review-page__date" aria-hidden="true"><small>${date.getMonth() + 1}月</small><strong>${String(date.getDate()).padStart(2, "0")}</strong></span>
      <span class="review-page__body">
        <small class="review-page__meta">${escapeHtml(key)} · ${escapeHtml(label)} · 第 ${index + 1} 组</small>
        <strong class="review-page__title">${escapeHtml(group.title || label)}</strong>
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
    elements.weekRangeLabel.textContent = `${start.getMonth() + 1}月${start.getDate()}日 - ${end.getMonth() + 1}月${end.getDate()}日`;
  }
  elements.weekGrid.innerHTML = "";

  WEEKDAYS.forEach((weekday, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    const card = document.createElement("div");
    card.className = "week-day";
    if (key === focusKey) card.classList.add("is-current");
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
    title.setAttribute("aria-label", `打开 ${key} 的日页`);
    const dayLabel = document.createElement("span");
    dayLabel.textContent = weekday;
    const dateLabel = document.createElement("small");
    dateLabel.textContent = `${date.getMonth() + 1}/${date.getDate()}`;
    title.append(dayLabel, dateLabel);
    title.addEventListener("click", () => navigateToCalendarPage(key, "day"));

    const textarea = document.createElement("textarea");
    textarea.rows = 1;
    textarea.setAttribute("aria-label", `${key} 的周安排`);
    textarea.placeholder = "安排、约定或留白";
    textarea.value = entry.week[key] || "";
    textarea.addEventListener("input", () => {
      entry.week[key] = textarea.value;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      persistState();
      renderStats();
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
      linked.innerHTML = `<strong>${linkedPageCount} 张记录</strong><span>${escapeHtml(linkedExcerpt || "打开当天内页")}</span>`;
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
  event.currentTarget.setPointerCapture(event.pointerId);
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
  const confirmed = confirm(hasMultipleGroups
    ? `删除 ${key} 的第 ${index + 1} 组跨页？同一天的其他内页会保留。`
    : `删除 ${key} 的整页记录？此操作不会影响其他日期。`);
  if (!confirmed) return;
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
  notify(hasMultipleGroups ? "已删除当前跨页" : `已删除 ${key} 的记录`);
}

function exportData() {
  syncEntryFromForm();
  downloadJson({ ...state, exportedFrom: `OpenPages ${APP_VERSION}` }, `openpages-${state.selectedDate}.json`);
  notify("已导出全部本地数据");
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
    `mood: ${entry.mood}`,
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
  lines.push("---", "由 OpenPages 导出。图片与手写笔迹保留在 JSON 备份中。", "");
  downloadText(lines.join("\n"), `openpages-${state.selectedDate}.md`, "text/markdown;charset=utf-8");
  notify("已导出当前页 Markdown");
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
      alert("这个 JSON 不是有效的 OpenPages 模板包。");
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
    notify("已复制当前体验链接");
  } catch {
    const input = document.createElement("input");
    input.value = url;
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    notify("已复制当前体验链接");
  }
}

async function installApp() {
  if (!deferredInstallPrompt) {
    notify("请用本地服务器或 HTTPS 打开，再从浏览器安装 PWA");
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
      selectedStickerId = null;
      applyGlobalSettings();
      loadEntryIntoForm();
      notify("已导入 OpenPages 数据");
      persistState();
    } catch {
      alert("这个 JSON 不是有效的 OpenPages 数据。");
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
  if (panel === "review") renderSearch();
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
    drawActive = true;
    canvas.setPointerCapture(event.pointerId);
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
  if (entry.strokes?.length) {
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
  if (currentEntry().strokes.length || currentEntry().ink) {
    const confirmed = confirm("清空整张手写页？这个操作会删除当前日期的手写笔迹。");
    if (!confirmed) return;
  }
  const canvas = elements.inkCanvas;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  currentEntry().ink = "";
  currentEntry().strokes = [];
  inkRedoByDate.set(pageHistoryKey(), []);
  updateInkHistoryButtons();
  notify("手写页已清空");
  persistState();
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
  elements.pageTurnSheet?.addEventListener("animationend", handlePageTurnEnd);
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
  elements.topDatePicker.addEventListener("change", () => {
    if (!elements.topDatePicker.value) return;
    navigateToCalendarPage(elements.topDatePicker.value, "day");
  });
  elements.calendarScaleButtons.forEach((button) => {
    button.addEventListener("click", () => openCalendarScale(button.dataset.calendarScale));
  });
  elements.prevDayButton.addEventListener("click", () => shiftDate(-1));
  elements.nextDayButton.addEventListener("click", () => shiftDate(1));
  elements.prevSpreadButton.addEventListener("click", () => selectPageGroup((currentEntry().activePageGroup || 0) - 1));
  elements.nextSpreadButton.addEventListener("click", () => selectPageGroup((currentEntry().activePageGroup || 0) + 1));
  elements.addSpreadButton.addEventListener("click", addPageGroup);

  [elements.entryTitle, elements.moodSelect, elements.focusInput, elements.modeFocusInput].forEach((input) => {
    input.addEventListener("input", syncEntryFromForm);
    input.addEventListener("change", syncEntryFromForm);
  });
  elements.journalEditor.addEventListener("input", syncEntryFromForm);
  elements.journalEditor.addEventListener("blur", syncEntryFromForm);
  elements.journalEditor.addEventListener("focus", () => {
    if (elements.body.dataset.inputMode !== "write") setMobilePage("write");
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
  elements.photoInput.addEventListener("change", () => addPhotos(elements.photoInput.files));
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
      renderStats();
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
  elements.importInput.addEventListener("change", () => importData(elements.importInput.files[0]));
  elements.installAppButton.addEventListener("click", installApp);
  elements.copyShareLinkButton.addEventListener("click", copyProjectLink);
  elements.healthInput.addEventListener("change", () => handleHealthImport(elements.healthInput.files[0]));
  elements.connectHealthButton?.addEventListener("click", requestNativeHealthAccess);
  elements.syncHealthButton?.addEventListener("click", () => syncNativeHealth());
  elements.manageHealthButton?.addEventListener("click", manageNativeHealthAccess);
  elements.healthWeeklyReportButton?.addEventListener("click", generateHealthWeeklyReport);
  elements.saveVersionButton?.addEventListener("click", saveEntryVersion);
  elements.restoreLastVersionButton?.addEventListener("click", restoreLastEntryVersion);
  elements.privacyButton.addEventListener("click", () => {
    elements.body.classList.toggle("is-private");
  });
  elements.focusModeButton.addEventListener("click", () => toggleFocusMode());
  elements.searchInput.addEventListener("input", renderSearch);
  elements.deleteStickerButton.addEventListener("click", deleteSelectedSticker);
  elements.dailyStampButton.addEventListener("click", applyDailyStamp);
  elements.migrateTasksButton.addEventListener("click", migrateOpenTasks);
  elements.backupReminderButton?.addEventListener("click", createBackupReminder);
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
    if (event.altKey && event.key === "ArrowLeft") shiftDate(-1);
    if (event.altKey && event.key === "ArrowRight") shiftDate(1);
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
    notify(`画笔颜色：${button.dataset.inkColor.toUpperCase()}`);
  });
  elements.inkBrushPicker?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ink-brush]");
    if (!button) return;
    setInkBrush(button.dataset.inkBrush);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && hasPendingChanges) flushState();
  });
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
    notify("OpenPages 已安装");
  });
}

function bindWorkspaceShell() {
  elements.saveNowButton.addEventListener("click", saveNow);
  $("#saveBackupButton").addEventListener("click", exportData);
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

applyGlobalSettings();
setSaveState(state.lastSavedAt ? "saved" : "ready");
bindInstallPrompt();
bindEvents();
setupCanvas();
loadEntryIntoForm();
bindWorkspaceShell();
registerServiceWorker();
if (state.health?.connection?.connected && getNativeHealthBridge()?.isNative) {
  window.setTimeout(() => syncNativeHealth({ silent: true }), 450);
}
