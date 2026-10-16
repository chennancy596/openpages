import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function app() {
  // Data tests do not render HTML. Real rendering and navigation are checked in a browser.
  const context = vm.createContext({
    document: {
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ content: { textContent: "" } }),
    },
    localStorage: { getItem: () => null },
    crypto: webcrypto,
    setTimeout, clearTimeout, console,
  });
  vm.runInContext(source.slice(0, source.lastIndexOf("\napplyGlobalSettings();")), context);
  return (code) => vm.runInContext(code, context);
}

test("empty default pages do not fill the index; bookmarked blanks do", () => {
  const run = app();
  assert.equal(run('hasUserContent(createEntry("2026-09-05"))'), false);
  assert.equal(run('hasUserContent({...createEntry("2026-09-05"), bookmarked: true})'), true);
});

test("a week containing only an arrangement is a meaningful saved record", () => {
  const run = app();
  assert.equal(run(`
    const key = "2026-08-31";
    const entry = createEntry(key);
    entry.mode = "weekly";
    entry.week["2026-09-05"] = "整理旅行照片";
    state.entries[key] = entry;
    const pages = journalPageIndex();
    pages.length === 1 && filterJournalPages(pages, {query:"旅行照片"}).length === 1;
  `), true);
});

test("search returns the matching inner page, not the first page of a day", () => {
  const run = app();
  assert.equal(run(`
    const key = "2026-09-05";
    const entry = createEntry(key);
    entry.text = "当天日记";
    normalizeEntry(entry, key);
    const second = {...createEntry(key), mode:"reading", text:"雪国摘录", bookmarked:true, tags:["阅读"]};
    entry.pageGroups.push(capturePageGroup(second));
    state.entries[key] = entry;
    const match = filterJournalPages(journalPageIndex(), {query:"雪国 阅读", type:"reading", tag:"阅读", scope:"bookmarks"});
    match.length === 1 && match[0].index === 1 && match[0].group.text === "雪国摘录";
  `), true);
});

test("all filters intersect instead of silently ignoring type or dates", () => {
  const run = app();
  assert.equal(run(`
    const group = {...createEntry("2026-09-05"), mode:"reading", text:"札记", tags:["阅读"], bookmarked:true};
    const pages = [{key:"2026-09-05", index:0, group}];
    filterJournalPages(pages, {tag:"旅行"}).length === 0 &&
    filterJournalPages(pages, {type:"daily"}).length === 0 &&
    filterJournalPages(pages, {start:"2026-09-06"}).length === 0 &&
    filterJournalPages(pages, {end:"2026-09-04"}).length === 0 &&
    filterJournalPages(pages, {start:"2026-09-05", end:"2026-09-05"}).length === 1;
  `), true);
});

test("date filters include overlapping weekly and monthly plans", () => {
  const run = app();
  assert.equal(run(`
    const weekly = {key:"2026-08-31",group:{...createEntry("2026-08-31"),mode:"weekly"}};
    const monthly = {key:"2026-09-01",group:{...createEntry("2026-09-01"),mode:"monthly"}};
    filterJournalPages([weekly,monthly],{start:"2026-09-05",end:"2026-09-05"}).length === 2 &&
    filterJournalPages([weekly,monthly],{start:"2026-10-01"}).length === 0;
  `), true);
});

test("page bookmarks remain independent through switching and serialization", () => {
  const run = app();
  assert.equal(run(`
    const key = "2026-09-05";
    const entry = createEntry(key);
    entry.text = "第一页";
    entry.bookmarked = true;
    normalizeEntry(entry,key);
    entry.pageGroups.push(capturePageGroup({...createEntry(key),text:"第二页"}));
    syncPageGroup(entry,key);
    entry.activePageGroup = 1;
    applyPageGroup(entry,entry.pageGroups[1],key);
    const secondHasNoBookmark = !entry.bookmarked;
    syncPageGroup(entry,key);
    const restored = JSON.parse(JSON.stringify(entry));
    normalizeEntry(restored,key);
    restored.activePageGroup = 0;
    applyPageGroup(restored,restored.pageGroups[0],key);
    secondHasNoBookmark && restored.bookmarked && restored.text === "第一页";
  `), true);
});

test("legacy entries gain an unbookmarked default without losing text", () => {
  const run = app();
  assert.equal(run(`
    const entry = createEntry("2026-09-05");
    delete entry.bookmarked;
    entry.text = "原来的记录";
    normalizeEntry(entry,"2026-09-05");
    entry.text === "原来的记录" && entry.pageGroups[0].bookmarked === false;
  `), true);
});

test("daily plan references stay connected to their source without copying", () => {
  const run = app();
  assert.equal(run(`
    const week = createEntry("2026-08-31");
    week.mode = "weekly"; week.week["2026-09-05"] = "书店";
    const month = createEntry("2026-09-01");
    month.mode = "monthly"; month.modules.monthly = {priorities:"完成阅读"};
    state.entries = {"2026-08-31":week,"2026-09-01":month};
    const before = linkedPlansForDate("2026-09-05");
    week.week["2026-09-05"] = "图书馆";
    const after = linkedPlansForDate("2026-09-05");
    before.length === 2 && after[0].text === "图书馆" && after[0].key === "2026-08-31" && after[1].text === "完成阅读";
  `), true);
});

test("the index does not drop records after eight dates", () => {
  const run = app();
  assert.equal(run(`
    for(let day=1;day<=31;day++) {
      const key = "2026-08-" + String(day).padStart(2,"0");
      state.entries[key] = {...createEntry(key),text:"第" + day + "条"};
    }
    const pages = filterJournalPages(journalPageIndex(),{});
    pages.length === 31 && pages[0].key === "2026-08-31" && pages[30].key === "2026-08-01";
  `), true);
});

test("search excerpts escape markup while highlighting literal matches", () => {
  const run = app();
  const excerpt = run('reviewExcerpt({...createEntry("2026-09-05"),text:"<img src=x onerror=alert(1)>旅行"},"2026-09-05","<img")');
  assert.ok(excerpt.includes("<mark>&lt;img</mark>"));
  assert.ok(!excerpt.includes("<img"));
});

test("opening a linked plan preserves the original day for the return journey", () => {
  const run = app();
  assert.equal(run(`
    state.selectedDate = "2026-09-05";
    state.entries["2026-08-31"] = {...createEntry("2026-08-31"),mode:"weekly"};
    syncEntryFromForm = () => {};
    closeMobilePanel = () => {};
    selectDate = (key) => { state.selectedDate = key; };
    openPageGroupForDate("2026-08-31",0,{focusDate:"2026-09-05"});
    state.selectedDate === "2026-08-31" && calendarStorageKey("day") === "2026-09-05";
  `), true);
});

test("mobile layout opens the relevant side for a different template", () => {
  const run = app();
  assert.equal(run('mobilePageForTransition("daily","weekly","write")'), "ink");
  assert.equal(run('mobilePageForTransition("weekly","daily","ink")'), "write");
  assert.equal(run('mobilePageForTransition("daily","daily","ink")'), "ink");
});
