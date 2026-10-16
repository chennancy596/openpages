import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function app() {
  const storage = { value: null, fail: false };
  const nodes = new Map();
  const timers = new Map();
  let timerId = 0;
  for (const id of ["saveState", "saveNowButton", "lastSavedTime", "saveDetailsNote"]) {
    nodes.set(`#${id}`, { dataset: {}, textContent: "", setAttribute() {} });
  }
  const context = vm.createContext({
    document: {
      querySelector: (selector) => nodes.get(selector) || null,
      querySelectorAll: () => [],
      createElement: () => ({ content: { textContent: "" } }),
    },
    localStorage: {
      getItem: () => storage.value,
      setItem(key, value) {
        if (storage.fail) throw Object.assign(new Error("Full"), { name: "QuotaExceededError" });
        storage.value = value;
      },
    },
    crypto: webcrypto,
    setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  });
  const run = (code) => vm.runInContext(code, context);
  run(source.slice(0, source.lastIndexOf("\nstartApp();")));
  run('state.selectedDate = "2026-09-05"; state.entries[state.selectedDate] = createEntry(state.selectedDate);');
  return { run, nodes, storage, timers };
}

test("pending changes are not reported as saved before the write", () => {
  const { run, nodes, storage, timers } = app();
  run('currentEntry().text = "一页记录"; persistState();');
  assert.equal(nodes.get("#saveState").dataset.state, "saving");
  assert.equal(storage.value, null);
  assert.equal(run("hasPendingChanges"), true);
  [...timers.values()][0]();
  assert.equal(nodes.get("#saveState").textContent, "已保存到本机");
  assert.equal(run("hasPendingChanges"), false);
  assert.equal(JSON.parse(storage.value).entries["2026-09-05"].text, "一页记录");
});

test("successful writes persist the timestamp alongside the entry", () => {
  const { run, storage, nodes } = app();
  assert.equal(run("flushState()"), true);
  assert.equal(JSON.parse(storage.value).lastSavedAt, run("state.lastSavedAt"));
  assert.notEqual(nodes.get("#lastSavedTime").textContent, "暂无时间记录");
});

test("a failed write keeps the last successful data and time, and exposes retry", () => {
  const { run, nodes, storage } = app();
  run('currentEntry().text = "已存内容"; flushState();');
  const previous = storage.value;
  const time = run("state.lastSavedAt");
  storage.fail = true;
  assert.equal(run('currentEntry().text = "新内容"; flushState();'), false);
  assert.equal(storage.value, previous);
  assert.equal(run("state.lastSavedAt"), time);
  assert.equal(run("hasPendingChanges"), true);
  assert.equal(nodes.get("#saveState").dataset.state, "error");
  assert.equal(nodes.get("#saveNowButton").textContent, "重试保存");
  assert.match(nodes.get("#saveDetailsNote").textContent, /不要关闭/);
});

test("retry writes pending edits and clears the failure state", () => {
  const { run, nodes, storage } = app();
  storage.fail = true;
  run('currentEntry().text = "待恢复的记录"; flushState();');
  storage.fail = false;
  assert.equal(run("flushState()"), true);
  assert.equal(nodes.get("#saveNowButton").textContent, "保存");
  assert.equal(nodes.get("#saveState").dataset.state, "saved");
  assert.equal(JSON.parse(storage.value).entries["2026-09-05"].text, "待恢复的记录");
});

test("manual save captures the editor then writes without waiting for debounce", () => {
  const { run, storage, timers } = app();
  run('syncEntryFromForm = () => { currentEntry().text = "手动保存"; persistState(); };');
  assert.equal(run("saveNow()"), true);
  assert.equal(JSON.parse(storage.value).entries["2026-09-05"].text, "手动保存");
  assert.equal(timers.size, 0);
});

test("save shortcut intercepts Ctrl/Cmd S but leaves typing and IME alone", () => {
  const { run } = app();
  assert.equal(run(`
    let saves = 0, prevented = 0;
    saveNow = () => { saves++; };
    const event = {key:"s", ctrlKey:true, preventDefault(){prevented++;}};
    handleSaveShortcut(event);
    handleSaveShortcut({...event, ctrlKey:false, metaKey:true, key:"S"});
    handleSaveShortcut({...event, isComposing:true});
    handleSaveShortcut({...event, ctrlKey:false});
    saves === 2 && prevented === 2;
  `), true);
});

test("leaving warns only when pending changes could not be written", () => {
  const { run, storage } = app();
  storage.fail = true;
  assert.equal(run(`
    let warned = false;
    const event = {preventDefault(){warned = true;}};
    hasPendingChanges = true;
    handleBeforeUnload(event);
    warned && event.returnValue === "";
  `), true);
  storage.fail = false;
  assert.equal(run("warned = false; handleBeforeUnload(event); warned"), false);
});

test("unchanged editor blur does not restart autosave or refresh its timestamp", () => {
  const { run, timers } = app();
  run(`
    sanitizeEditorHtml = value => value;
    editorPlainText = () => "已写好的内容";
    Object.assign(currentEntry(), {title:"标题", mood:"calm", html:"<p>已写好的内容</p>", text:"已写好的内容", focus:""});
    elements.entryTitle = {value:"标题"};
    elements.moodSelect = {value:"calm"};
    elements.journalEditor = {innerHTML:"<p>已写好的内容</p>"};
    elements.modeFocus = {hidden:true};
    elements.focusInput = {value:""};
    syncEntryFromForm();
  `);
  assert.equal(timers.size, 0);
});

test("large media is stored first and the text save then keeps only references", () => {
  const { run, storage } = app();
  run(`
    mediaStoreAvailable = true;
    var queued = null;
    writePendingMedia = (pending) => { queued = pending; };
    currentEntry().photos = [{ id: "p1", name: "a.jpg", src: "data:image/jpeg;base64," + "A".repeat(5000) }];
    currentEntry().strokes = Array.from({ length: 40 }, (_, s) => ({ brush: "pencil", points: [{ x: s, y: 1 }, { x: s, y: 2 }] }));
  `);
  assert.equal(run("flushState()"), false);
  assert.equal(storage.value, null);
  assert.equal(run("hasPendingChanges"), true);
  assert.equal(run("queued.size"), 2);
  run("queued.forEach((_, id) => persistedMediaIds.add(id));");
  assert.equal(run("flushState()"), true);
  assert.doesNotMatch(storage.value, /data:image/);
  const entry = JSON.parse(storage.value).entries["2026-09-05"];
  assert.match(entry.photos[0].src, /^opmedia:v1:/);
  assert.match(entry.strokes, /^opmedia:v1:/);
  assert.match(run("currentEntry().photos[0].src"), /^data:image/);
});

test("stored references are restored into the state and missing strokes stay an array", () => {
  const { run } = app();
  assert.equal(run(`
    const target = { photos: [{ src: "opmedia:v1:img" }], strokes: "opmedia:v1:ink", other: { strokes: "opmedia:v1:gone" } };
    const missing = new Set();
    replaceMediaRefs(target, new Map([["img", "data:image/png;base64,x"], ["ink", [{ points: [] }]]]), missing);
    JSON.stringify([target, [...missing]]);
  `), JSON.stringify([{ photos: [{ src: "data:image/png;base64,x" }], strokes: [{ points: [] }], other: { strokes: [] } }, ["gone"]]));
});
