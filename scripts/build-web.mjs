import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const generated = join(root, "generated");
const files = ["index.html", "privacypolicy.html", "app.css", "app.js", "manifest.webmanifest", "service-worker.js", "assets", "generated"];


await build({
  configFile: false,
  logLevel: "warn",
  build: {
    emptyOutDir: true,
    lib: {
      entry: join(root, "src/native/health-bridge.js"),
      name: "OpenPagesNativeHealthBridge",
      formats: ["iife"],
      fileName: () => "runtime-bridge-v2.js",
    },
    minify: true,
    outDir: generated,
  },
});

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await Promise.all(
  files.map((file) =>
    cp(join(root, file), join(dist, file), {
      recursive: true,
    })
  )
);

console.log("Built Web/PWA files into dist/");
