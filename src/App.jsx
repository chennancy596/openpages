import { useEffect, useMemo, useState } from "react";
import "./styles/base.css";
import { createDecorationInstance, createEmptyEntry, todayKey } from "./data/schema.js";
import { saveEntry, getEntry, getAllEntries, exportAllAsJSON, importFromJSON } from "./store/db.js";
import CalendarView from "./views/CalendarView.jsx";
import DiaryPage from "./views/DiaryPage.jsx";
import TimelineView from "./views/TimelineView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import MaterialDrawer from "./components/MaterialDrawer.jsx";

const views = [
  ["diary", "日记本"],
  ["calendar", "月历"],
  ["timeline", "回顾"],
  ["settings", "备份"],
];

export default function App() {
  const [view, setView] = useState("diary");
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [entry, setEntry] = useState(createEmptyEntry(todayKey()));
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntry(selectedDate).then(setEntry);
  }, [selectedDate]);

  useEffect(() => {
    getAllEntries().then(setEntries);
  }, [entry.updatedAt]);

  const title = useMemo(() => {
    const item = views.find(([key]) => key === view);
    return item?.[1] || "日记本";
  }, [view]);

  async function handleSave(next = entry) {
    const saved = await saveEntry(next);
    setEntry(saved);
    setEntries(await getAllEntries());
  }

  async function handleSelectDate(date) {
    await handleSave(entry);
    setSelectedDate(date);
    setView("diary");
  }

  function handleAddMaterial(materialId, type) {
    const next = {
      ...entry,
      decorations: [...entry.decorations, createDecorationInstance(materialId, type)],
    };
    setEntry(next);
    handleSave(next);
  }

  function handleStamp(stampId) {
    const next = { ...entry, stampId };
    setEntry(next);
    handleSave(next);
  }

  async function handleExport() {
    const text = await exportAllAsJSON();
    const blob = new Blob([text], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `techo-openpages-${todayKey()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function handleImport(file) {
    if (!file) return;
    const text = await file.text();
    await importFromJSON(text);
    setEntries(await getAllEntries());
    setEntry(await getEntry(selectedDate));
  }

  return (
    <main className="techo-shell">
      <aside className="ring-sidebar">
        <h1 className="title-mincho">Techō</h1>
        <p>本地优先电子手帐</p>
        <nav>
          {views.map(([key, label]) => (
            <button key={key} className={view === key ? "is-active" : ""} onClick={() => setView(key)}>
              {label}
            </button>
          ))}
        </nav>
        <input type="date" value={selectedDate} onChange={(event) => handleSelectDate(event.target.value)} />
      </aside>

      <section className="paper-stack" aria-label={title}>
        {view === "diary" && (
          <>
            <DiaryPage entry={entry} onChange={setEntry} onSave={handleSave} />
            <MaterialDrawer onAddMaterial={handleAddMaterial} onStamp={handleStamp} />
          </>
        )}
        {view === "calendar" && <CalendarView entries={entries} selectedDate={selectedDate} onSelectDate={handleSelectDate} />}
        {view === "timeline" && <TimelineView entries={entries} onSelectDate={handleSelectDate} />}
        {view === "settings" && <SettingsView onExport={handleExport} onImport={handleImport} />}
      </section>
    </main>
  );
}
