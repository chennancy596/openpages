import { useMemo, useState } from "react";
import { createDecorationInstance, makeId } from "../data/schema.js";
import { stamps } from "../data/stamps.js";
import { stickers } from "../data/stickers.js";
import { tapes } from "../data/tapes.js";
import StampIcon from "../components/StampIcon.jsx";

const modeOptions = [
  ["daily", "一日一页"],
  ["bullet", "子弹笔记"],
  ["weekly", "周计划"],
  ["memory", "记忆拼贴"],
  ["mood", "情绪追踪"],
];

const bulletTypes = [
  ["task", "任务"],
  ["event", "事件"],
  ["note", "笔记"],
  ["migrate", "迁移"],
];

const weekDays = [
  ["mon", "月"],
  ["tue", "火"],
  ["wed", "水"],
  ["thu", "木"],
  ["fri", "金"],
  ["sat", "土"],
  ["sun", "日"],
];

const defaultMetrics = { energy: 3, stress: 2, sleep: 7 };

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        id: makeId("image"),
        name: file.name,
        src: reader.result,
        caption: "",
        createdAt: new Date().toISOString(),
      });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function DiaryPage({ entry, onChange, onSave }) {
  const [draftTask, setDraftTask] = useState("");
  const [draftBullet, setDraftBullet] = useState("");
  const [bulletType, setBulletType] = useState("task");
  const [draftTag, setDraftTag] = useState("");

  const current = useMemo(
    () => ({
      ...entry,
      focus: entry.focus || "",
      tasks: entry.tasks || [],
      bullets: entry.bullets || [],
      week: entry.week || {},
      metrics: { ...defaultMetrics, ...(entry.metrics || {}) },
      decorations: entry.decorations || [],
      images: entry.images || [],
      tags: entry.tags || [],
    }),
    [entry]
  );

  const stamp = stamps.find((item) => item.id === current.stampId);

  function update(patch, shouldSave = false) {
    const next = { ...current, ...patch };
    onChange(next);
    if (shouldSave) onSave(next);
  }

  function addTask() {
    const text = draftTask.trim();
    if (!text) return;
    update({ tasks: [...current.tasks, { id: makeId("task"), text, done: false }] }, true);
    setDraftTask("");
  }

  function toggleTask(id) {
    update({ tasks: current.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)) }, true);
  }

  function removeTask(id) {
    update({ tasks: current.tasks.filter((task) => task.id !== id) }, true);
  }

  function addBullet() {
    const text = draftBullet.trim();
    if (!text) return;
    update(
      {
        bullets: [
          ...current.bullets,
          { id: makeId("bullet"), type: bulletType, text, done: false, createdAt: new Date().toISOString() },
        ],
      },
      true
    );
    setDraftBullet("");
  }

  function updateBullet(id, patch) {
    update({ bullets: current.bullets.map((bullet) => (bullet.id === id ? { ...bullet, ...patch } : bullet)) }, true);
  }

  function removeBullet(id) {
    update({ bullets: current.bullets.filter((bullet) => bullet.id !== id) }, true);
  }

  function addTag() {
    const tag = draftTag.replace(/^#/, "").trim();
    if (!tag || current.tags.includes(tag)) return;
    update({ tags: [...current.tags, tag] }, true);
    setDraftTag("");
  }

  function updateWeek(day, text) {
    update({ week: { ...current.week, [day]: text } });
  }

  async function handleImages(files) {
    const picked = Array.from(files || []);
    if (!picked.length) return;
    const images = await Promise.all(picked.map(readImage));
    update({ images: [...current.images, ...images] }, true);
  }

  function updateImage(id, patch) {
    update({ images: current.images.map((image) => (image.id === id ? { ...image, ...patch } : image)) }, true);
  }

  function removeImage(id) {
    update({ images: current.images.filter((image) => image.id !== id) }, true);
  }

  function applyTodayStamp() {
    const index = stamps.findIndex((item) => item.id === current.stampId);
    const nextStamp = stamps[(index + 1 + stamps.length) % stamps.length];
    const decoration = createDecorationInstance(nextStamp.id, "stamp", 520, 520);
    update({ stampId: nextStamp.id, decorations: [...current.decorations, decoration] }, true);
  }

  function renderDecoration(decoration) {
    const style = {
      left: decoration.x,
      top: decoration.y,
      transform: `rotate(${decoration.rotate || 0}deg) scale(${decoration.scale || 1})`,
    };

    if (decoration.type === "stamp") {
      const item = stamps.find((candidate) => candidate.id === decoration.materialId);
      return (
        <span key={decoration.id} className="placed-decoration placed-stamp" style={style}>
          <StampIcon stamp={item} size={58} />
        </span>
      );
    }

    if (decoration.type === "tape") {
      const item = tapes.find((candidate) => candidate.id === decoration.materialId);
      return (
        <span key={decoration.id} className="placed-decoration placed-tape" style={{ ...style, background: item?.css }}>
          {item?.label}
        </span>
      );
    }

    const sticker = stickers.find((candidate) => candidate.id === decoration.materialId);
    return (
      <span key={decoration.id} className="placed-decoration placed-sticker-react" style={{ ...style, background: sticker?.color }}>
        {sticker?.text || decoration.materialId}
      </span>
    );
  }

  return (
    <section className={`paper-page diary-page layout-${current.layout}`}>
      <div className="decoration-layer">{current.decorations.map(renderDecoration)}</div>

      <header className="diary-header">
        <div>
          <span className="date-label">{current.date}</span>
          <input value={current.title} onChange={(event) => update({ title: event.target.value })} />
        </div>
        <select value={current.layout} onChange={(event) => update({ layout: event.target.value }, true)}>
          <option value="dot">点阵</option>
          <option value="grid">方格</option>
          <option value="line">横线</option>
          <option value="plain">空白</option>
        </select>
      </header>

      <div className="mode-row">
        {modeOptions.map(([mode, label]) => (
          <button key={mode} className={current.mode === mode ? "is-active" : ""} onClick={() => update({ mode }, true)}>
            {label}
          </button>
        ))}
      </div>

      <textarea
        className="journal-body"
        value={current.body}
        onChange={(event) => update({ body: event.target.value })}
        onBlur={() => onSave(current)}
        placeholder="空白也是记录。写一点、贴一点，或者什么都不写。"
      />

      <section className="entry-tools">
        <label>
          今日重点
          <input value={current.focus} onChange={(event) => update({ focus: event.target.value })} onBlur={() => onSave(current)} />
        </label>
        <label>
          页签
          <input
            value={draftTag}
            placeholder="输入后回车"
            onChange={(event) => setDraftTag(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTag();
              }
            }}
          />
        </label>
        <div className="tag-cloud">
          {current.tags.map((tag) => (
            <button key={tag} onClick={() => update({ tags: current.tags.filter((item) => item !== tag) }, true)}>
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {current.mode === "daily" && (
        <section className="mode-panel">
          <h3>今日待办</h3>
          <div className="inline-add">
            <input value={draftTask} onChange={(event) => setDraftTask(event.target.value)} placeholder="写一个小任务" />
            <button onClick={addTask}>添加</button>
          </div>
          <ul className="check-list">
            {current.tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                  <span>{task.text}</span>
                </label>
                <button onClick={() => removeTask(task.id)}>删除</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {current.mode === "bullet" && (
        <section className="mode-panel">
          <h3>子弹笔记</h3>
          <div className="inline-add">
            <select value={bulletType} onChange={(event) => setBulletType(event.target.value)}>
              {bulletTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input value={draftBullet} onChange={(event) => setDraftBullet(event.target.value)} placeholder="任务、事件、迁移或想法" />
            <button onClick={addBullet}>添加</button>
          </div>
          <ul className="bullet-list">
            {current.bullets.map((bullet) => (
              <li key={bullet.id} data-type={bullet.type}>
                <button onClick={() => updateBullet(bullet.id, { done: !bullet.done })}>{bullet.done ? "✓" : "•"}</button>
                <span>{bullet.text}</span>
                <small>{bulletTypes.find(([value]) => value === bullet.type)?.[1]}</small>
                <button onClick={() => removeBullet(bullet.id)}>删除</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {current.mode === "weekly" && (
        <section className="mode-panel">
          <h3>周计划</h3>
          <div className="week-planner">
            {weekDays.map(([day, label]) => (
              <label key={day}>
                <span>{label}</span>
                <textarea value={current.week[day] || ""} onChange={(event) => updateWeek(day, event.target.value)} onBlur={() => onSave(current)} />
              </label>
            ))}
          </div>
        </section>
      )}

      {current.mode === "memory" && (
        <section className="mode-panel">
          <h3>记忆拼贴</h3>
          <label className="file-pick">
            添加照片 / 票根
            <input type="file" accept="image/*" multiple onChange={(event) => handleImages(event.target.files)} />
          </label>
          <div className="memory-grid">
            {current.images.map((image) => (
              <figure key={image.id}>
                <img src={image.src} alt={image.caption || image.name} />
                <input value={image.caption || ""} placeholder="写一句旁白" onChange={(event) => updateImage(image.id, { caption: event.target.value })} />
                <button onClick={() => removeImage(image.id)}>删除</button>
              </figure>
            ))}
          </div>
        </section>
      )}

      {current.mode === "mood" && (
        <section className="mode-panel">
          <h3>情绪追踪</h3>
          <select value={current.mood} onChange={(event) => update({ mood: event.target.value }, true)}>
            <option value="">选择今天的心情</option>
            <option value="calm">平静</option>
            <option value="busy">忙碌</option>
            <option value="tired">需要休息</option>
            <option value="spark">有灵感</option>
          </select>
          {[
            ["energy", "能量", 5],
            ["stress", "压力", 5],
            ["sleep", "睡眠", 12],
          ].map(([key, label, max]) => (
            <label key={key} className="range-row">
              <span>{label}</span>
              <input
                type="range"
                min="0"
                max={max}
                step={key === "sleep" ? "0.5" : "1"}
                value={current.metrics[key]}
                onChange={(event) => update({ metrics: { ...current.metrics, [key]: Number(event.target.value) } })}
                onMouseUp={() => onSave(current)}
                onTouchEnd={() => onSave(current)}
              />
              <strong>{current.metrics[key]}</strong>
            </label>
          ))}
        </section>
      )}

      <button className="today-stamp" onClick={applyTodayStamp}>
        {stamp ? <StampIcon stamp={stamp} size={54} /> : "今日印章"}
      </button>
      <button className="save-page" onClick={() => onSave(current)}>
        保存日页
      </button>
    </section>
  );
}
