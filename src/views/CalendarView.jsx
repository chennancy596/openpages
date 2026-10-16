import { todayKey } from "../data/schema.js";
import { stamps } from "../data/stamps.js";
import StampIcon from "../components/StampIcon.jsx";

export default function CalendarView({ entries, selectedDate, onSelectDate }) {
  const cursor = new Date(`${selectedDate}T00:00:00`);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const entryByDate = new Map(entries.map((entry) => [entry.date, entry]));
  const cells = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = todayKey(date);
    return { date, key, entry: entryByDate.get(key) };
  });

  return (
    <section className="paper-page calendar-view">
      <h2 className="title-mincho">{year}.{String(month + 1).padStart(2, "0")}</h2>
      <div className="calendar-grid">
        {"一二三四五六日".split("").map((day) => <strong key={day}>{day}</strong>)}
        {cells.map((cell) => (
          <button
            key={cell.key}
            className={cell.key === selectedDate ? "is-selected" : ""}
            data-muted={cell.date.getMonth() !== month}
            onClick={() => onSelectDate(cell.key)}
          >
            <span>{cell.date.getDate()}</span>
            {cell.entry?.stampId && (
              <small>
                <StampIcon stamp={stamps.find((stamp) => stamp.id === cell.entry.stampId)} size={24} />
              </small>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
