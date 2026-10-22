const CACHE_NAME = "openpages-v124-040";
const ASSETS = [
  "./",
  "./index.html",
  "./privacypolicy.html",
  "./app.css",
  "./generated/runtime-bridge-v2.js",
  "./app.js",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./assets/icon.png",
  "./assets/icon-192.png",
  "./assets/apple-touch-icon.png",
  "./assets/icon.svg",
  "./assets/openpages-mark.svg",
  "./assets/paper-fiber.png",
  "./assets/linen-weave.png",
  "./assets/cover-grain.png",
  "./assets/washi-paper-fine.png",
  "./assets/desk-cloth-fine.png",
  "./assets/cover-grain-fine.png",
];

const CORE_DESTINATIONS = new Set(["document", "script", "style"]);
const CORE_EXTENSIONS = [".html", ".css", ".js"];

function isCoreRequest(request) {
  const url = new URL(request.url);
  return (
    request.mode === "navigate" ||
    CORE_DESTINATIONS.has(request.destination) ||
    CORE_EXTENSIONS.some((extension) => url.pathname.endsWith(extension))
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok) await cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch {
    const cached = (await cache.match(request)) || (await cache.match(request, { ignoreSearch: true }));
    if (cached) return cached;
    if (request.mode === "navigate") return (await cache.match("./index.html")) || Response.error();
    return Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("openpages-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(isCoreRequest(event.request) ? networkFirst(event.request) : cacheFirst(event.request));
});
