export default function TimelineView({ entries, onSelectDate }) {
  return (
    <section className="paper-page timeline-view">
      <h2 className="title-mincho">时间轴 / 回顾</h2>
      <div className="timeline-list">
        {entries.slice().reverse().map((entry) => (
          <button key={entry.date} onClick={() => onSelectDate(entry.date)}>
            <strong>{entry.date}</strong>
            <span>{entry.title || "未命名日页"}</span>
            <small>{entry.tags?.map((tag) => `#${tag}`).join(" ")}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
