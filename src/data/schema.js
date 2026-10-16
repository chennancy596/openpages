export function makeId(prefix = "id") {
  const random = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return `${prefix}_${random}`;
}

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createEmptyEntry(date = todayKey()) {
  return {
    id: makeId("entry"),
    date,
    title: "未命名日页",
    focus: "",
    body: "",
    bodyHtml: "",
    layout: "dot",
    mode: "daily",
    mood: "",
    stampId: "",
    tags: [],
    tasks: [],
    bullets: [],
    week: {},
    metrics: { energy: 3, stress: 2, sleep: 7 },
    health: null,
    decorations: [],
    images: [],
    inkStrokes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createDecorationInstance(materialId, type, x = 120, y = 120) {
  return {
    id: makeId("decoration"),
    materialId,
    type,
    x,
    y,
    rotate: Math.round((Math.random() * 8 - 4) * 10) / 10,
    scale: 1,
  };
}
