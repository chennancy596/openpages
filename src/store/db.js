import { createEmptyEntry } from "../data/schema.js";

const DB_NAME = "techo-openpages";
const DB_VERSION = 1;
const ENTRY_STORE = "entries";

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ENTRY_STORE)) {
        const store = db.createObjectStore(ENTRY_STORE, { keyPath: "date" });
        store.createIndex("updatedAt", "updatedAt");
        store.createIndex("mode", "mode");
        store.createIndex("mood", "mood");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function withStore(mode, callback) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(ENTRY_STORE, mode);
        const store = tx.objectStore(ENTRY_STORE);
        const result = callback(store);
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
      })
  );
}

export async function saveEntry(entry) {
  const next = { ...entry, updatedAt: new Date().toISOString() };
  await withStore("readwrite", (store) => store.put(next));
  return next;
}

export async function getEntry(date) {
  return withStore(
    "readonly",
    (store) =>
      new Promise((resolve, reject) => {
        const request = store.get(date);
        request.onsuccess = () => resolve(request.result || createEmptyEntry(date));
        request.onerror = () => reject(request.error);
      })
  );
}

export async function getEntriesByDate(startDate, endDate) {
  const all = await getAllEntries();
  return all.filter((entry) => entry.date >= startDate && entry.date <= endDate);
}

export async function getAllEntries() {
  return withStore(
    "readonly",
    (store) =>
      new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result.sort((a, b) => a.date.localeCompare(b.date)));
        request.onerror = () => reject(request.error);
      })
  );
}

export async function deleteEntry(date) {
  return withStore("readwrite", (store) => store.delete(date));
}

export async function exportAllAsJSON() {
  const entries = await getAllEntries();
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), entries }, null, 2);
}

export async function importFromJSON(json) {
  const payload = typeof json === "string" ? JSON.parse(json) : json;
  if (!Array.isArray(payload.entries)) throw new Error("Invalid OpenPages backup");
  await Promise.all(payload.entries.map((entry) => saveEntry(entry)));
  return payload.entries.length;
}
