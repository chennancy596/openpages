import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const STORAGE_KEY = "openpages.state.v1";

// One browser origin: windows share `store`, each window gets its own app instance.
function windowOn(store) {
  const nodes = new Map();
  for (const id of ["saveState", "saveNowButton", "lastSavedTime", "saveDetailsNote"]) {
    nodes.set(`#${id}`, { dataset: {}, textContent: "", setAttribute() {} });
  }
  const timers = new Map();
  let timerId = 0;
  const context = vm.createContext({
    document: {
      querySelector: (selector) => nodes.get(selector) || null,
      querySelectorAll: () => [],
      createElement: () => ({ content: { textContent: "" } }),
    },
    localStorage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
    },
    crypto: webcrypto,
    setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  });
  const run = (code) => vm.runInContext(code, context);
  run(source.slice(0, source.lastIndexOf("\nstartApp();")));
  // Rendering needs the full page; these tests only look at the journal data.
  run(`
    syncEntryFromForm = () => {};
    for (const name of ["applyGlobalSettings", "loadEntryIntoForm", "renderPageGroupNavigation", "renderCalendar",
      "renderStats", "renderSearch", "renderPageHistory", "renderTrash", "renderBackupStatus", "renderPlusPanel"]) {
      globalThis[name] = () => {};
    }
    notify = () => {};
  `);
  return { run, flushTimers: () => { const pending = [...timers.values()]; timers.clear(); pending.forEach((fn) => fn()); } };
}

const textOf = (store, key) => JSON.parse(store.get(STORAGE_KEY)).entries[key]?.text;

function write(window, key, text) {
  window.run(`
    state.selectedDate = ${JSON.stringify(key)};
    currentEntry().text = ${JSON.stringify(text)};
    currentEntry().html = ${JSON.stringify(text)};
    persistState();
    flushState();
  `);
}

test("a save from a stale window keeps the pages another window wrote", () => {
  const store = new Map();
  const first = windowOn(store);
  const second = windowOn(store);
  write(first, "2026-10-16", "第一个窗口的今天");
  // The second window never saw that save (no storage event) and writes another day.
  write(second, "2026-10-15", "第二个窗口的昨天");
  assert.equal(textOf(store, "2026-10-16"), "第一个窗口的今天");
  assert.equal(textOf(store, "2026-10-15"), "第二个窗口的昨天");
});

test("an idle window adopts another window's save but stays on its own date", () => {
  const store = new Map();
  const first = windowOn(store);
  const second = windowOn(store);
  second.run('state.selectedDate = "2026-10-01"; state.calendarFocusDate = "2026-10-01";');
  write(first, "2026-10-16", "来自另一个窗口");
  second.run(`handleExternalStorageChange({ key: ${JSON.stringify(STORAGE_KEY)}, newValue: localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) })`);
  assert.equal(second.run('state.entries["2026-10-16"].text'), "来自另一个窗口");
  assert.equal(second.run("state.selectedDate"), "2026-10-01");
  assert.equal(second.run("hasPendingChanges"), false);
});

test("a window with unsaved edits keeps them and writes them on top of the other window's save", () => {
  const store = new Map();
  const first = windowOn(store);
  const second = windowOn(store);
  second.run('state.selectedDate = "2026-10-15"; currentEntry().text = "还没保存的补记"; persistState();');
  write(first, "2026-10-16", "另一个窗口的今天");
  second.run(`handleExternalStorageChange({ key: ${JSON.stringify(STORAGE_KEY)}, newValue: localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) })`);
  assert.equal(second.run('state.entries["2026-10-15"].text'), "还没保存的补记");
  second.flushTimers();
  assert.equal(textOf(store, "2026-10-15"), "还没保存的补记");
  assert.equal(textOf(store, "2026-10-16"), "另一个窗口的今天");
});

test("importing a backup still replaces the journal instead of merging old pages back", () => {
  const store = new Map();
  const window = windowOn(store);
  write(window, "2026-10-16", "旧记录");
  window.run(`
    state = normalizeState({ version: 1, entries: { "2026-01-01": { text: "备份里的一页" } } });
    flushState();
  `);
  const entries = JSON.parse(store.get(STORAGE_KEY)).entries;
  assert.equal(entries["2026-01-01"].text, "备份里的一页");
  assert.equal(entries["2026-10-16"]?.text ?? "", "");
});

test("the first edit of a written page keeps the earlier content, at most every 30 minutes", () => {
  const store = new Map();
  const window = windowOn(store);
  write(window, "2026-10-16", "原来的内容");
  window.run("autoVersionTimes.clear();");
  window.run('currentEntry().text = "改坏了"; persistState(); currentEntry().text = "又改了一次"; persistState();');
  const versions = window.run("currentEntry().versions.map((version) => [version.kind, version.data.text])");
  assert.deepEqual(JSON.parse(JSON.stringify(versions)), [["auto", "原来的内容"]]);
});

test("restoring a version first keeps the current content, so it can be undone", () => {
  const store = new Map();
  const window = windowOn(store);
  write(window, "2026-10-16", "原来的内容");
  window.run('autoVersionTimes.clear(); currentEntry().text = "改坏了"; persistState();');
  window.run("restoreEntryVersion(currentEntry().versions[0].id);");
  assert.equal(window.run("currentEntry().text"), "原来的内容");
  const kinds = window.run("currentEntry().versions.map((version) => version.kind + ':' + version.data.text).join('|')");
  assert.equal(kinds, "auto:原来的内容|restore:改坏了");
});

test("automatic versions are capped and expire; hand-saved ones are kept", () => {
  const window = windowOn(new Map());
  const result = window.run(`
    const old = new Date(Date.now() - 40 * 86_400_000).toISOString();
    const now = new Date().toISOString();
    const versions = [
      { id: "expired", kind: "auto", savedAt: old, data: {} },
      { id: "manual-old", savedAt: old, data: {} },
      ...Array.from({ length: 8 }, (_, index) => ({ id: "auto-" + index, kind: "auto", savedAt: now, data: {} })),
    ];
    pruneVersions(versions).map((version) => version.id).join(",");
  `);
  assert.equal(result, "manual-old,auto-2,auto-3,auto-4,auto-5,auto-6,auto-7");
});

test("the cover shows once a day by default and follows the setting", () => {
  const store = new Map();
  const window = windowOn(store);
  assert.equal(window.run("shouldShowCover()"), true);
  window.run("rememberCoverOpened();");
  assert.equal(window.run("shouldShowCover()"), false);
  store.set("openpages.cover.openedOn", "2020-01-01");
  assert.equal(window.run("shouldShowCover()"), true);
  window.run('state.coverDisplay = "never";');
  assert.equal(window.run("shouldShowCover()"), false);
  window.run('state.coverDisplay = "always"; rememberCoverOpened();');
  assert.equal(window.run("shouldShowCover()"), true);
});
