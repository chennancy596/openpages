import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function app() {
  // Data tests do not render HTML. Real rendering is checked in a browser.
  const context = vm.createContext({
    document: {
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ content: { textContent: "" } }),
    },
    localStorage: { getItem: () => null, setItem() {} },
    crypto: webcrypto,
    setTimeout, clearTimeout, console,
  });
  vm.runInContext(source.slice(0, source.lastIndexOf("\nstartApp();")), context);
  return (code) => vm.runInContext(code, context);
}

test("new day pages are titled with the date and weekday", () => {
  const run = app();
  assert.equal(run('createEntry("2026-10-16").title'), "10月16日 星期五");
  assert.equal(run('createEntry("2026-10-18").title'), "10月18日 星期日");
});

test("old generated titles gain the weekday; titles the writer chose are kept", () => {
  const run = app();
  assert.equal(run('const legacy = { ...createEntry("2026-10-16"), title: "10月16日手帐" }; normalizeEntry(legacy, "2026-10-16"); legacy.title'), "10月16日 星期五");
  assert.equal(run('legacy.pageGroups[0].title'), "10月16日 星期五");
  assert.equal(run('const mine = { ...createEntry("2026-10-16"), title: "雨天的图书馆" }; normalizeEntry(mine, "2026-10-16"); mine.title'), "雨天的图书馆");
});

test("a new page records no mood until one is chosen", () => {
  const run = app();
  assert.equal(run('createEntry("2026-10-16").mood'), "");
});

test("word count treats each Chinese character and each other word as one", () => {
  const run = app();
  assert.equal(run('countWords("今天去了图书馆")'), 7);
  assert.equal(run('countWords("Market day! 菜市场")'), 5);
  assert.equal(run('countWords("  ")'), 0);
});

test("the daily prompt is fixed for a date and changes on request", () => {
  const run = app();
  const first = run('dailyPromptFor("2026-10-16")');
  assert.equal(run('dailyPromptFor("2026-10-16")'), first);
  assert.notEqual(run('dailyPromptFor("2026-10-17")'), first);
  run('dailyPromptOffsets.set("2026-10-16", 1)');
  assert.notEqual(run('dailyPromptFor("2026-10-16")'), first);
});

test("moving open tasks to tomorrow skips the placeholder tasks every page starts with", () => {
  const run = app();
  const moved = run(`
    elements.workflowNote = {};
    renderFragments = renderCalendar = persistState = notify = () => {};
    state.selectedDate = "2026-10-16";
    state.entries["2026-10-16"] = createEntry("2026-10-16");
    currentEntry().tasks.push({ id: "real", text: "还书", done: false });
    migrateOpenTasks();
    state.entries["2026-10-17"].tasks.filter((task) => task.migratedFrom).map((task) => task.text).join(",");
  `);
  assert.equal(moved, "还书");
});

test("a week plan stored on Monday is not counted or paged as part of Monday's diary", () => {
  const run = app();
  const result = run(`
    const monday = createEntry("2026-10-12");
    normalizeEntry(monday, "2026-10-12");
    monday.pageGroups.push(capturePageGroup(createCalendarPage("2026-10-12", "weekly")));
    monday.pageGroups.push(capturePageGroup({ ...createEntry("2026-10-12"), title: "续页" }));
    [scopedGroupIndexes(monday, "day").join(","), scopedGroupIndexes(monday, "week").join(",")].join(" | ");
  `);
  assert.equal(result, "0,2 | 1");
  assert.equal(run("pageRangeLabel(0)"), "1–2");
  assert.equal(run("pageRangeLabel(1)"), "3–4");
});

test("a week is written the same way everywhere, including across months", () => {
  const run = app();
  assert.equal(run('weekRangeText("2026-10-12")'), "10月12日–18日");
  assert.equal(run('weekRangeText("2026-10-26")'), "10月26日–11月1日");
  assert.equal(run('createCalendarPage("2026-10-12", "weekly").title'), "10月12日–18日 · 周计划");
  assert.equal(run('const oldWeek = { ...createCalendarPage("2026-10-12", "weekly"), title: "10/12 - 10/18 · 周计划" }; normalizeEntry(oldWeek, "2026-10-12"); oldWeek.title'), "10月12日–18日 · 周计划");
});

test("a new page starts without example tasks; continuation titles count as generated", () => {
  const run = app();
  assert.equal(run('createEntry("2026-10-16").tasks.length'), 0);
  assert.equal(run('isDefaultDayTitle("10月16日 · 续页 2")'), true);
  assert.equal(run('isDefaultDayTitle("雨天的图书馆")'), false);
});

test("deleting a page needs no confirmation and 撤销 puts it back in its place", () => {
  const run = app();
  const result = run(`
    let confirmCalls = 0, lastAction = null;
    globalThis.confirm = () => { confirmCalls++; return true; };
    syncEntryFromForm = loadEntryIntoForm = renderTrash = flushState = () => {};
    notify = (message, action) => { if (action) lastAction = action; };
    state.selectedDate = "2026-10-16";
    const day = createEntry("2026-10-16");
    state.entries["2026-10-16"] = day;
    normalizeEntry(day, "2026-10-16");
    day.pageGroups = ["第一页", "第二页", "第三页"].map((text) => capturePageGroup({ ...createEntry("2026-10-16"), text, html: text }));
    day.activePageGroup = 1;
    applyPageGroup(day, day.pageGroups[1], "2026-10-16");
    deleteCurrentPage();
    const afterDelete = day.pageGroups.map((group) => group.text).join(",");
    lastAction.run();
    [confirmCalls, afterDelete, day.pageGroups.map((group) => group.text).join(","), day.activePageGroup, state.trash.length].join(" | ");
  `);
  assert.equal(result, "0 | 第一页,第三页 | 第一页,第二页,第三页 | 1 | 0");
});

test("built-in templates give structure only, so an unused page stays empty", () => {
  const run = app();
  const filled = run(`
    Object.entries(modePresets()).filter(([, preset]) =>
      preset.text || preset.focus || preset.tags.length || preset.tasks.length || preset.fragments.length || (preset.bullets || []).length
    ).map(([mode]) => mode).join(",");
  `);
  assert.equal(filled, "");
  assert.equal(run(`
    const page = createEntry("2026-10-25");
    fillEntryFromTemplate(page, modePresets().reading);
    page.mode = "reading";
    hasUserContent(page, "2026-10-25");
  `), false);
});

test("scaffold written by older templates is still recognised as generated, not as the writer's text", () => {
  const run = app();
  const result = run(`
    const old = { ...createEntry("2026-10-25"), text: "摘句：\\n\\n联想：\\n\\n读完后想带走：", focus: "读慢一点，留下真正有回声的部分", tags: ["阅读", "我的页签"] };
    applyTemplateNonDestructively(old, { ...modePresets().travel, title: "x" });
    [old.text, old.focus, old.tags.join(",")].join(" | ");
  `);
  assert.equal(result, " |  | 我的页签");
});
