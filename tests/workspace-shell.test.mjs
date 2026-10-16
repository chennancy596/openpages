import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import vm from "node:vm";

const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const source = read("app.js");

function app() {
  const nodes = new Map();
  let document;
  function node(dataset = {}) {
    const classes = new Set();
    const attributes = {};
    const label = { textContent: "" };
    return {
      dataset, attributes, isConnected: true, hidden: false, inert: false,
      classList: {
        add: (...items) => items.forEach((item) => classes.add(item)),
        remove: (...items) => items.forEach((item) => classes.delete(item)),
        contains: (item) => classes.has(item),
        toggle: (item, on) => on ? classes.add(item) : classes.delete(item),
      },
      setAttribute: (key, value) => { attributes[key] = value; },
      querySelector: () => label,
      focus() { document.activeElement = this; },
    };
  }
  document = {
    body: node(), activeElement: node(),
    querySelector: (selector) => nodes.get(selector) || null,
    querySelectorAll: () => [],
    createElement: () => ({ content: { textContent: "" } }),
  };
  for (const selector of [".workspace", ".sidebar", "#journalSpread", "#penOptions", "#inkOptionsToggle", "#rightDock", "#dockCloseButton", "#dockOverlay"]) nodes.set(selector, node());
  const context = vm.createContext({ document, localStorage: { getItem: () => null }, crypto: webcrypto, setTimeout, clearTimeout, console, node });
  const run = (code) => vm.runInContext(code, context);
  run(source.slice(0, source.lastIndexOf("\nstartApp();")));
  run('elements.mobilePageButtons = [node({mobilePageTarget:"write"}), node({mobilePageTarget:"ink"})];');
  return { run, nodes, document, context };
}

test("editing side, toolbar state and accessible selection change together", () => {
  const { run } = app();
  assert.equal(run(`
    setMobilePage("ink");
    elements.body.dataset.inputMode === "ink" &&
    elements.journalSpread.dataset.mobilePage === "ink" &&
    elements.mobilePageButtons[1].attributes["aria-pressed"] === "true" &&
    elements.mobilePageButtons[0].attributes["aria-pressed"] === "false";
  `), true);
});

test("brush settings have one visibility state and close when changing input", () => {
  const { run } = app();
  assert.equal(run(`
    setInkOptionsExpanded(true);
    !elements.penOptions.hidden && elements.inkOptionsToggle.attributes["aria-expanded"] === "true";
  `), true);
  assert.equal(run(`
    setMobilePage("write");
    elements.penOptions.hidden && elements.inkOptionsToggle.attributes["aria-expanded"] === "false";
  `), true);
});

test("opening the drawer prevents editing the document behind it", () => {
  const { run, nodes } = app();
  run('openMobilePanel("stickers")');
  assert.equal(nodes.get(".workspace").inert, true);
  assert.equal(nodes.get(".sidebar").inert, true);
  assert.equal(nodes.get("#rightDock").inert, false);
});

test("closing the drawer restores the trigger focus and editing", () => {
  const { run, document, nodes } = app();
  const trigger = document.activeElement;
  run('openMobilePanel("stickers"); closeMobilePanel();');
  assert.equal(document.activeElement, trigger);
  assert.equal(nodes.get(".workspace").inert, false);
  assert.equal(nodes.get("#rightDock").inert, true);
});

test("old bitmap handwriting keeps its original aspect ratio", () => {
  const { run, context } = app();
  let drawArguments;
  context.Image = class {
    naturalWidth = 900;
    naturalHeight = 720;
    addEventListener(type, callback) { this.load = callback; }
    set src(value) { this.load(); }
  };
  context.canvas = { width: 900, height: 1260, getContext: () => ({ clearRect() {}, drawImage: (...args) => { drawArguments = args; } }) };
  run(`
    const key = "2026-09-05";
    state.selectedDate = key;
    state.entries[key] = createEntry(key);
    state.entries[key].ink = "data:image/png;base64,legacy";
    elements.inkCanvas = canvas;
    restoreInk();
  `);
  assert.deepEqual(drawArguments.slice(1), [0, 0, 900, 720]);
});

test("all responsive canvas ratios match the logical drawing surface", () => {
  const html = read("index.html");
  assert.match(html, /id="inkCanvas" width="900" height="1260"/);
  const ratios = [...read("workspace.css").matchAll(/aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/g)];
  assert.ok(ratios.length > 0);
  for (const [, width, height] of ratios) assert.equal(Number(width) / Number(height), 900 / 1260);
});

test("moving toolbars does not duplicate element IDs", () => {
  const ids = [...read("index.html").matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ["journalEditor", "inkCanvas", "penOptions", "saveState", "clearInkButton", "inkFocusButton"]) assert.equal(ids.filter((value) => value === id).length, 1);
});

test("the new shell is included in build and offline assets", () => {
  for (const name of ["index.html", "scripts/build-web.mjs", "service-worker.js"]) assert.ok(read(name).includes("workspace.css"), name);
});

test("core brand text colors meet 4.5:1 on their intended surfaces", () => {
  const css = read("workspace.css");
  const color = (token) => css.match(new RegExp(`${token}: (#[0-9a-f]{6})`))[1];
  const luminance = (hex) => hex.slice(1).match(/../g).map((part) => parseInt(part, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
  for (const [text, surface] of [["--op-forest", "--op-white"], ["--op-gray", "--op-white"], ["--op-ink", "--op-mist"]]) {
    const values = [luminance(color(text)), luminance(color(surface))].sort((a, b) => b - a);
    assert.ok((values[0] + .05) / (values[1] + .05) >= 4.5, text);
  }
});
