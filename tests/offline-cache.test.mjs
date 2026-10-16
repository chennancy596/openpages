import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../service-worker.js", import.meta.url), "utf8");
function worker({ match = async () => undefined, put = async () => {}, fetch = async () => { throw new Error("offline"); } } = {}) {
  const cache = { match, put };
  const context = vm.createContext({
    caches: { open: async () => cache, match }, fetch, Response, URL,
    self: { addEventListener() {} },
  });
  vm.runInContext(source, context);
  return (code) => vm.runInContext(code, context);
}

test("offline versioned scripts can use their precached unversioned resource", async () => {
  const run = worker({match: async (request, options) => options?.ignoreSearch ? new Response("cached script") : undefined});
  const response = await run('networkFirst({url:"https://local.test/app.js?v=new", mode:"cors"})');
  assert.equal(await response.text(), "cached script");
});

test("an exact updated cache entry wins over an older unversioned resource", async () => {
  const run = worker({match: async (request, options) => new Response(options?.ignoreSearch ? "old" : "updated")});
  assert.equal(await (await run('networkFirst({url:"https://local.test/app.js?v=new", mode:"cors"})')).text(), "updated");
});

test("missing scripts return a network error, never an HTML document", async () => {
  const run = worker({match: async (request) => request === "./index.html" ? new Response("<html>journal</html>") : undefined});
  const script = await run('networkFirst({url:"https://local.test/missing.js",mode:"cors"})');
  assert.equal(script.type, "error");
  const document = await run('networkFirst({url:"https://local.test/",mode:"navigate"})');
  assert.equal(await document.text(), "<html>journal</html>");
});

test("HTTP failures do not replace cached resources", async () => {
  let writes = 0;
  const run = worker({fetch: async () => new Response("unavailable", {status:503}), put: async () => { writes++; }});
  const response = await run('networkFirst({url:"https://local.test/app.js",mode:"cors"})');
  assert.equal(response.status, 503);
  assert.equal(writes, 0);
});

test("a full browser cache does not discard a successful network response", async () => {
  const run = worker({fetch: async () => new Response("current script"), put: async () => { throw new Error("quota"); }});
  assert.equal(await (await run('networkFirst({url:"https://local.test/app.js",mode:"cors"})')).text(), "current script");
});
