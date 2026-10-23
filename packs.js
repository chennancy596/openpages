"use strict";
// 开页 · 精选系列: the artwork of the four paid series, made in code.
//
// Painted things (plants, tape motifs, stamp pictures) are real watercolour, simulated: each wash is
// some twenty translucent layers of a shape whose edge is broken up differently every time, so the
// pigment builds in the middle and feathers at the edge; leaves are glazed light to dark and shaded
// beside the midrib; a fine pen line in warm grey goes over the top; the paper's tooth shows through.
// They are rendered once to a picture at 3× and cached. Printed things (tickets, labels) are vector
// type on aged card. Every drawing is seeded, so a sticker looks the same each time it is drawn.
// Items with `fields` carry words the writer can change (a postmark's town, a ticket's stations).
window.OpenPagesPacks = (() => {
  const SERIF = "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif";
  const SONG = "'Songti SC','STSong','Noto Serif SC','Source Han Serif SC','SimSun',serif";
  const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif";
  const MONO = "'SF Mono',Menlo,Consolas,'Courier New',monospace";
  const HAND = "'Hannotate SC','HanziPen SC','Kaiti SC','STKaiti','KaiTi','楷体',serif";
  const SEPIA = "#3a3027";
  const PEN = "#54483b";
  const OUTLINE = "#6e5747";
  const SCALE = 3;

  let serial = 0;
  const nextId = () => `opk${(serial += 1).toString(36)}`;
  const n = (value) => Math.round(value * 10) / 10;
  const esc = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (r, list) => list[Math.floor(r() * list.length) % list.length];
  function gauss(r) {
    let u = 0;
    let v = 0;
    while (!u) u = r();
    while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function svg(w, h, body, defs = "") {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${defs ? `<defs>${defs}</defs>` : ""}${body}</svg>`;
  }
  const line = (points) => points.map(([x, y], i) => `${i ? "L" : "M"}${n(x)} ${n(y)}`).join("");
  const closed = (points) => `${line(points)}Z`;

  // The width a line of mixed Chinese and Latin text takes, in ems, so the writer's words can be fitted.
  function ems(value, spacing = 0, size = 1) {
    let width = 0;
    for (const ch of String(value)) width += /[⺀-鿿豈-﫿＀-￯]/.test(ch) ? 1 : 0.6;
    return width + (spacing / size) * [...String(value)].length;
  }
  const fit = (value, maxWidth, size, spacing = 0) => {
    const width = ems(value, spacing, size) * size;
    return width > maxWidth ? Math.max(size * 0.45, (size * maxWidth) / width) : size;
  };
  function text(x, y, value, { size = 7, font = SERIF, fill = SEPIA, anchor = "start", spacing = 0, weight = 400, italic = false, opacity = 1, max = 0 } = {}) {
    const fitted = max ? fit(value, max, size, spacing) : size;
    const tracked = max && fitted < size ? spacing * (fitted / size) : spacing;
    return `<text x="${n(x)}" y="${n(y)}" font-family="${font}" font-size="${n(fitted)}" fill="${fill}" text-anchor="${anchor}"${tracked ? ` letter-spacing="${n(tracked)}"` : ""}${weight !== 400 ? ` font-weight="${weight}"` : ""}${italic ? ' font-style="italic"' : ""}${opacity !== 1 ? ` opacity="${opacity}"` : ""}>${esc(value)}</text>`;
  }

  // ---- Curves ------------------------------------------------------------------------------------

  const quad = (p0, p1, p2) => (t) => {
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  };
  const cubic = (p0, p1, p2, p3) => (t) => {
    const u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  };
  const tangentOf = (curve) => (t) => {
    const a = curve(Math.max(0, t - 0.01));
    const b = curve(Math.min(1, t + 0.01));
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / length, (b[1] - a[1]) / length];
  };
  const sample = (curve, from = 0, to = 1, steps = 40) => Array.from({ length: steps + 1 }, (_, i) => curve(from + ((to - from) * i) / steps));
  const turn = ([x, y], degrees) => {
    const a = (degrees * Math.PI) / 180;
    return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
  };
  const along = (p, d, k) => [p[0] + d[0] * k, p[1] + d[1] * k];
  const unit = (deg) => [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  const angleOf = (d) => (Math.atan2(d[1], d[0]) * 180) / Math.PI;
  function ellipsePoints([cx, cy], rx, ry, rotation = 0, from = 0, to = 360, steps = 40) {
    const rot = (rotation * Math.PI) / 180;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;
      return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];
    });
  }
  // The two edges of a leaf, petal or grain from base `b` along unit direction `d`, base to tip.
  function leafSides(b, d, length, width, profile = (k) => Math.sin(Math.PI * k), steps = 22) {
    const normal = [-d[1], d[0]];
    const left = [];
    const right = [];
    for (let i = 0; i <= steps; i += 1) {
      const k = i / steps;
      const half = (profile(k) * width) / 2;
      const p = along(b, d, length * k);
      left.push([p[0] + normal[0] * half, p[1] + normal[1] * half]);
      right.push([p[0] - normal[0] * half, p[1] - normal[1] * half]);
    }
    return [left, right];
  }
  const ring = ([left, right]) => [...left, ...[...right].reverse().slice(1, -1)];

  function noise1(seed) {
    const r = rng(seed);
    const values = Array.from({ length: 64 }, r);
    return (x) => {
      const i = Math.floor(x);
      const f = x - i;
      const a = values[((i % 64) + 64) % 64];
      const b = values[(((i + 1) % 64) + 64) % 64];
      return a + (b - a) * f * f * (3 - 2 * f);
    };
  }
  const STEP = 1.2;
  function resample(points, step = STEP) {
    const out = [points[0]];
    let carry = 0;
    for (let i = 1; i < points.length; i += 1) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const segment = Math.hypot(x1 - x0, y1 - y0);
      if (!segment) continue;
      let d = step - carry;
      while (d <= segment) {
        out.push([x0 + ((x1 - x0) * d) / segment, y0 + ((y1 - y0) * d) / segment]);
        d += step;
      }
      carry = segment - (d - step);
    }
    const last = points[points.length - 1];
    const end = out[out.length - 1];
    if (Math.hypot(last[0] - end[0], last[1] - end[1]) > step * 0.3) out.push(last);
    return out;
  }
  function normalAt(points, i) {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const length = Math.hypot(dx, dy) || 1;
    return [-dy / length, dx / length];
  }
  function wobble(points, amount, seed, wavelength = 16) {
    const pts = resample(points);
    if (!amount) return pts;
    const nz = noise1(seed);
    return pts.map((p, i) => {
      const [nx, ny] = normalAt(pts, i);
      const offset = (nz((i * STEP) / wavelength) - 0.5) * 2 * amount;
      return [p[0] + nx * offset, p[1] + ny * offset];
    });
  }
  // A pen stroke along `points`: it swells from a fine start, wavers, and lifts off.
  function brush(points, width, { seed = 1, start = 0.15, end = 0.3, jitter = 0.3, wobble: amount = 0.3, min = 0.18 } = {}) {
    if (!points || points.length < 2) return "";
    const pts = wobble(points, amount, seed);
    if (pts.length < 2) return "";
    const nz = noise1(seed + 11);
    const left = [];
    const right = [];
    const last = pts.length - 1;
    pts.forEach((p, i) => {
      const u = i / last;
      const rise = start > 0 ? Math.pow(Math.min(1, u / start), 0.6) : 1;
      const fall = end > 0 ? Math.pow(Math.min(1, (1 - u) / end), 0.8) : 1;
      const half = (width * Math.max(min, rise * fall) * (1 - jitter / 2 + jitter * nz(i * 0.15))) / 2;
      const [nx, ny] = normalAt(pts, i);
      left.push([p[0] + nx * half, p[1] + ny * half]);
      right.push([p[0] - nx * half, p[1] - ny * half]);
    });
    return closed([...left, ...right.reverse()]);
  }

  // ---- Watercolour -------------------------------------------------------------------------------

  // Splits every edge and pushes the new point off by a Gaussian share of the edge's length; done a
  // few times, a smooth outline becomes the ragged edge of a wash.
  function deform(points, depth, spread, r) {
    let pts = points.map(([x, y, v]) => [x, y, v ?? spread * (0.5 + r())]);
    for (let d = 0; d < depth; d += 1) {
      const out = [];
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const v = (a[2] + b[2]) / 2;
        out.push(a, [(a[0] + b[0]) / 2 + gauss(r) * length * v, (a[1] + b[1]) / 2 + gauss(r) * length * v, v * 0.72]);
      }
      pts = out;
    }
    return pts;
  }
  function closedResample(points, step) {
    const out = resample([...points, points[0]], step);
    if (out.length > 3) out.pop();
    return out;
  }
  function trace(g, pts) {
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath();
  }
  function watercolor(g, points, paint, { seed = 1, layers = 16, alpha = 0.085, spread = 0.32, edge = 0.14, step = 2.2 } = {}) {
    if (!points || points.length < 3) return;
    const r = rng(seed);
    const outline = closedResample(points, step);
    if (outline.length < 3) return;
    const base = deform(outline, 1, spread, r);
    g.save();
    g.fillStyle = paint;
    g.strokeStyle = paint;
    g.globalAlpha = alpha;
    for (let i = 0; i < layers; i += 1) {
      trace(g, deform(base, 2, spread, r));
      g.fill();
    }
    if (edge) {
      g.globalAlpha = edge;
      g.lineWidth = 0.35;
      trace(g, deform(base, 1, spread * 0.4, r));
      g.stroke();
    }
    g.restore();
  }
  let grainTile = null;
  function grain() {
    if (grainTile) return grainTile;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    const image = g.createImageData(128, 128);
    const r = rng(7);
    for (let i = 0; i < 128 * 128; i += 1) image.data[i * 4 + 3] = Math.round(Math.pow(r(), 3.2) * 255);
    g.putImageData(image, 0, 0);
    grainTile = c;
    return c;
  }
  // The tools a painting is made with, all drawing on `g` in the picture's own units.
  function kit(g, seed) {
    let s = seed * 131;
    const next = () => (s += 7);
    const gradient = (from, to, c0, c1) => {
      const paint = g.createLinearGradient(from[0], from[1], to[0], to[1]);
      paint.addColorStop(0, c0);
      paint.addColorStop(1, c1);
      return paint;
    };
    const k = {
      g,
      rand: rng(seed * 17 + 3),
      gradient,
      wash(points, paint, options = {}) {
        watercolor(g, points, paint, { seed: next(), ...options });
      },
      dab(c, radius, paint, options = {}) {
        watercolor(g, ellipsePoints(c, radius, radius * (options.squash || 1), options.rotate || 0, 0, 360, Math.max(10, Math.round(radius * 3))).slice(0, -1), paint, { step: Math.max(0.8, radius / 3), spread: 0.28, layers: 12, alpha: 0.1, ...options });
      },
      pen(points, width, options = {}) {
        const d = brush(points, width, { seed: next(), ...options });
        if (!d) return;
        g.save();
        g.globalAlpha = options.alpha ?? 0.7;
        g.fillStyle = options.color || PEN;
        g.fill(new Path2D(d));
        g.restore();
      },
      // A leaf painted as an illustrator would: a light-to-dark glaze, a darker half beside the
      // midrib, a vein or two, and a pen line along one edge.
      leaf(b, d, length, width, { profile, light = "#b7c9a6", dark = "#6f8f6c", shade = 0.06, midrib = 0.3, outline = 0.32, veins = 0, layers = 15 } = {}) {
        const sides = leafSides(b, d, length, width, profile, 20);
        const tip = along(b, d, length);
        k.wash(ring(sides), gradient(b, tip, dark, light), { layers, alpha: 0.09, spread: 0.26 });
        const mid = Array.from({ length: 21 }, (_, i) => along(b, d, length * (i / 20)));
        if (shade) k.wash([...sides[1], ...[...mid].reverse()], dark, { layers: 7, alpha: shade, spread: 0.22, edge: 0 });
        if (midrib) k.pen([b, along(b, d, length * 0.86)], midrib, { alpha: 0.42, end: 0.7, wobble: 0.06 });
        for (let i = 0; i < veins; i += 1) {
          const t = 0.22 + (0.55 * i) / Math.max(1, veins - 1);
          const p = along(b, d, length * t);
          [-1, 1].forEach((side) => k.pen([p, along(p, turn(d, side * 42), width * 0.38)], 0.2, { alpha: 0.32, start: 0, end: 0.7, wobble: 0 }));
        }
        if (outline) k.pen(sides[k.rand() > 0.5 ? 0 : 1].slice(2, -1), outline, { alpha: 0.48, start: 0.2, end: 0.3, wobble: 0.08 });
        return sides;
      },
      stem(points, width, color = "#8ea383", ink = 0.45) {
        const d = brush(points, width, { seed: next(), start: 0.02, end: 0.15, wobble: 0.15 });
        if (d) {
          g.save();
          g.globalAlpha = 0.55;
          g.fillStyle = color;
          g.fill(new Path2D(d));
          g.restore();
        }
        if (ink) k.pen(points, ink, { alpha: 0.6, start: 0.02, end: 0.12, wobble: 0.12 });
      },
      // A closed pen line round a shape, as in pen-and-wash: continuous, a little unsteady.
      outline(points, width = 0.55, options = {}) {
        k.pen([...points, points[0], points[1]], width, { alpha: 0.85, color: OUTLINE, start: 0.03, end: 0.05, wobble: 0.14, jitter: 0.22, min: 0.55, ...options });
      },
      // A shape washed in (deep enough to read as colour, not a tint) and then drawn round.
      shape(points, paint, { line = 0.55, layers = 22, alpha = 0.09, spread = 0.18, step = 1.6, edge = 0.16 } = {}) {
        k.wash(points, paint, { layers, alpha, spread, step, edge });
        if (line) k.outline(points, line);
      },
      // A second colour dropped into a wash while it is wet, kept inside the shape.
      bloom(clip, points, paint, alpha = 0.08, layers = 8) {
        g.save();
        trace(g, clip);
        g.clip();
        k.wash(points, paint, { layers, alpha, spread: 0.35, edge: 0 });
        g.restore();
      },
      // The paper's tooth: pigment lifts off in a fine random speckle.
      tooth(strength = 0.3) {
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.globalCompositeOperation = "destination-out";
        g.globalAlpha = strength;
        g.fillStyle = g.createPattern(grain(), "repeat");
        g.fillRect(0, 0, g.canvas.width, g.canvas.height);
        g.restore();
      },
    };
    return k;
  }
  // Paints into a fresh canvas `w` × `h` (in sticker pixels) and returns it as a PNG data URL. With
  // `cut`, the painting is cut out of white sticker stock that far beyond its edge, with a soft
  // shadow under it, and the picture grows by STICKER_PAD on every side.
  const STICKER_PAD = 7;
  function paintPicture(w, h, seed, draw, { cut = 0 } = {}) {
    const pad = cut ? STICKER_PAD : 0;
    const make = () => {
      const c = document.createElement("canvas");
      c.width = Math.round((w + pad * 2) * SCALE);
      c.height = Math.round((h + pad * 2) * SCALE);
      return c;
    };
    const art = make();
    const g = art.getContext("2d");
    g.scale(SCALE, SCALE);
    g.translate(pad, pad);
    g.lineJoin = "round";
    g.lineCap = "round";
    const k = kit(g, seed);
    draw(k, g);
    k.tooth();
    if (!cut) return art.toDataURL("image/png");
    const stock = make();
    const s = stock.getContext("2d");
    for (let a = 0; a < 360; a += 12) s.drawImage(art, Math.cos((a * Math.PI) / 180) * cut * SCALE, Math.sin((a * Math.PI) / 180) * cut * SCALE);
    s.globalCompositeOperation = "source-in";
    s.fillStyle = "#fffdf9";
    s.fillRect(0, 0, stock.width, stock.height);
    const out = make();
    const o = out.getContext("2d");
    o.shadowColor = "rgba(70, 52, 36, 0.2)";
    o.shadowBlur = 4 * SCALE;
    o.shadowOffsetY = 1.2 * SCALE;
    o.drawImage(stock, 0, 0);
    o.shadowColor = "transparent";
    o.drawImage(stock, 0, 0);
    o.drawImage(art, 0, 0);
    return out.toDataURL("image/png");
  }
  const pictureCache = new Map();
  const picture = (key, w, h, seed, draw, options) => {
    if (!pictureCache.has(key)) pictureCache.set(key, paintPicture(w, h, seed, draw, options));
    return pictureCache.get(key);
  };
  const within = (k, x, y, rotation, scale, draw) => {
    k.g.save();
    k.g.translate(x, y);
    k.g.rotate((rotation * Math.PI) / 180);
    k.g.scale(scale, scale);
    draw();
    k.g.restore();
  };
  // A band of even width along `points` (a stem, a ribbon end), narrowing a little towards its end.
  function band(points, width, taper = 0.7) {
    const pts = resample(points, 1.2);
    const left = [];
    const right = [];
    pts.forEach((p, i) => {
      const u = i / Math.max(1, pts.length - 1);
      const half = (width / 2) * (1 - (1 - taper) * u);
      const [nx, ny] = normalAt(pts, i);
      left.push([p[0] + nx * half, p[1] + ny * half]);
      right.push([p[0] - nx * half, p[1] - ny * half]);
    });
    return [...left, ...right.reverse()];
  }
  // Points in a frame centred on `c`, `s` units to one, turned by `rotation` degrees.
  const frame = (c, s, rotation = 0) => ([x, y]) => {
    const a = (rotation * Math.PI) / 180;
    return [c[0] + (x * Math.cos(a) - y * Math.sin(a)) * s, c[1] + (x * Math.sin(a) + y * Math.cos(a)) * s];
  };
  const curves = (map, list, steps = 14) => list.flatMap((curve, i) => sample(curve, 0, 1, steps).slice(i ? 1 : 0)).map(map);

  // The fern on the pressed-flower card is drawn as a specimen, without the pen outline.
  function drawFern(k) {
    const stem = quad([54, 136], [72, 70], [40, 8]);
    const tangent = tangentOf(stem);
    k.stem(sample(stem, 0, 1, 50), 2.2, "#7f9a6f", 0.75);
    for (let i = 0; i < 13; i += 1) {
      for (const side of [-1, 1]) {
        const t = 0.08 + i * 0.068 + (side > 0 ? 0.032 : 0);
        if (t > 0.95) continue;
        const base = stem(t);
        const d = turn(tangent(t), side * 60);
        const length = 4 + 27 * Math.pow(1 - t, 0.9) * Math.min(1, (t + 0.15) / 0.4);
        const lobes = Math.max(2, Math.round(length / 4.4));
        const profile = (q) => Math.min(1, q * 5) * Math.pow(1 - q, 0.55) * (0.6 + 0.4 * Math.abs(Math.sin(Math.PI * q * lobes)));
        k.leaf(base, d, length, length * 0.36, { profile, light: pick(k.rand, ["#b4c99a", "#a9c08f", "#bfd0a6"]), dark: pick(k.rand, ["#5f8461", "#6b8d66", "#547a59"]), shade: 0.05, midrib: 0.28, outline: k.rand() > 0.5 ? 0.24 : 0, layers: 12 });
      }
    }
    k.leaf(stem(1), tangent(1), 7, 3.4, { light: "#bfd0a6", dark: "#6b8d66", outline: 0, midrib: 0 });
  }

  // ---- 花草 · 水彩 ---------------------------------------------------------------------------------
  // Illustrated watercolour, pen and wash: every shape is washed in (a darker hue blooming into a
  // lighter one, paper left for the highlight) and drawn round in warm brown. Each painting is cut
  // out of white sticker stock. Plants draw themselves in their own box, stem base near the bottom.

  const GREEN = { deep: "#5c9066", mid: "#86b47c", pale: "#cfe4b2" };
  const SAGE = { deep: "#6f9e98", pale: "#c4ddd5" };

  function ileaf(k, b, d, length, width, { light = GREEN.pale, dark = GREEN.deep, profile = (q) => Math.pow(Math.sin(Math.PI * q), 0.8), vein = 0.4, line = 0.5 } = {}) {
    const sides = leafSides(b, d, length, width, profile, 18);
    const shape = ring(sides);
    k.shape(shape, k.gradient(b, along(b, d, length), dark, light), { line });
    const n0 = [-d[1], d[0]];
    k.bloom(shape, ring(leafSides(along(b, n0, width * 0.16), d, length * 0.78, width * 0.28)), "#ffffff", 0.07, 6);
    if (vein) k.pen([along(b, d, length * 0.06), along(b, d, length * 0.82)], vein, { alpha: 0.55, color: OUTLINE, end: 0.6, wobble: 0.08 });
    return shape;
  }
  function stemBand(k, points, width = 1.8, colors = [GREEN.deep, GREEN.mid]) {
    const shape = band(points, width);
    k.shape(shape, k.gradient(points[0], points[points.length - 1], colors[0], colors[1]), { line: 0.4, layers: 16 });
  }

  function tulipHead(k, c, s, rotation, [deep, pale]) {
    const map = frame(c, s, rotation);
    const left = curves(map, [cubic([-0.36, -0.12], [-0.8, -0.42], [-0.8, -1.02], [-0.5, -1.22]), cubic([-0.5, -1.22], [-0.32, -0.98], [-0.1, -0.86], [0.04, -0.72]), quad([0.04, -0.72], [-0.12, -0.3], [-0.36, -0.12])]);
    const right = curves(map, [cubic([0.36, -0.12], [0.8, -0.42], [0.8, -1.02], [0.5, -1.22]), cubic([0.5, -1.22], [0.32, -0.98], [0.1, -0.86], [-0.04, -0.72]), quad([-0.04, -0.72], [0.12, -0.3], [0.36, -0.12])]);
    const front = curves(map, [cubic([-0.46, -0.24], [-0.62, -0.82], [-0.26, -1.12], [0, -1.04]), cubic([0, -1.04], [0.26, -1.12], [0.62, -0.82], [0.46, -0.24]), cubic([0.46, -0.24], [0.34, 0.08], [-0.34, 0.08], [-0.46, -0.24])]);
    k.shape(left, k.gradient(map([0, 0]), map([0, -1.2]), deep, pale));
    k.shape(right, k.gradient(map([0, 0]), map([0, -1.2]), deep, pale));
    k.shape(front, k.gradient(map([0, 0.06]), map([0, -1.05]), deep, pale), { layers: 24 });
    k.bloom(front, ellipsePoints(map([0, -0.12]), s * 0.4, s * 0.22, rotation, 0, 360, 18).slice(0, -1), deep, 0.09);
    k.bloom(front, ellipsePoints(map([0.18, -0.68]), s * 0.08, s * 0.26, rotation - 8, 0, 360, 14).slice(0, -1), "#ffffff", 0.12, 6);
    k.pen([map([-0.06, -0.14]), map([-0.1, -0.7])], 0.3, { alpha: 0.4, color: OUTLINE, end: 0.6, wobble: 0.05 });
  }
  function drawTulips(k) {
    stemBand(k, sample(quad([42, 138], [36, 92], [30, 48]), 0, 1, 30), 2);
    stemBand(k, sample(quad([44, 138], [52, 100], [57, 62]), 0, 1, 30), 1.9);
    ileaf(k, [40, 134], unit(-114), 56, 13, { profile: (q) => Math.pow(Math.sin(Math.PI * Math.pow(q, 0.8)), 0.9) });
    ileaf(k, [45, 134], unit(-60), 48, 12, { profile: (q) => Math.pow(Math.sin(Math.PI * Math.pow(q, 0.8)), 0.9), dark: "#6a9c6d" });
    tulipHead(k, [30, 50], 17, -6, ["#e97c90", "#fcd3d8"]);
    tulipHead(k, [57, 64], 15, 9, ["#f0956f", "#fddcc4"]);
  }

  function drawRose(k) {
    stemBand(k, sample(quad([46, 138], [40, 96], [44, 54]), 0, 1, 30), 2);
    [[0.3, -1, 22, 11], [0.52, 1, 20, 10], [0.7, -1, 15, 8]].forEach(([t, side, length, width]) => {
      const stem = quad([46, 138], [40, 96], [44, 54]);
      const p = stem(t);
      const d = turn(tangentOf(stem)(t), side * 52);
      k.pen([p, along(p, d, 4)], 0.7, { alpha: 0.75, color: OUTLINE });
      const serrate = (q) => Math.pow(Math.sin(Math.PI * q), 0.75) * (0.9 + 0.1 * Math.abs(Math.sin(q * 30)));
      ileaf(k, along(p, d, 3.5), d, length, width, { profile: serrate, dark: "#4f8560" });
    });
    const c = [44, 42];
    const map = frame(c, 1, 0);
    const outer = [];
    for (let i = 0; i < 5; i += 1) {
      const a = -90 + i * 72 + 18;
      const p = along(c, unit(a), 9);
      outer.push(ellipsePoints(p, 10.5, 8.6, a, 0, 360, 26).slice(0, -1));
    }
    outer.forEach((shape) => k.shape(shape, k.gradient(c, along(c, [0, 1], 20), "#e8727a", "#fbd0cd"), { layers: 18 }));
    const cup = ellipsePoints(map([0, -1]), 11, 9.4, 0, 0, 360, 30).slice(0, -1);
    k.shape(cup, k.gradient(map([0, -10]), map([0, 9]), "#f39a9c", "#d9545f"), { layers: 22 });
    const spiral = [];
    for (let i = 0; i <= 60; i += 1) {
      const t = i / 60;
      const a = t * Math.PI * 3.2 + 0.6;
      const r = 1 + t * 8;
      spiral.push([c[0] + Math.cos(a) * r, c[1] - 1 + Math.sin(a) * r * 0.78]);
    }
    k.pen(spiral, 0.45, { alpha: 0.75, color: OUTLINE, start: 0.05, end: 0.2, wobble: 0.1 });
    k.bloom(cup, ellipsePoints(map([-3, -5]), 3, 2, -20, 0, 360, 14).slice(0, -1), "#ffffff", 0.12, 6);
    ileaf(k, along(c, [0, 1], 8), unit(130), 8, 4.4, { vein: 0, dark: "#4f8560" });
    ileaf(k, along(c, [0, 1], 8), unit(50), 8, 4.4, { vein: 0, dark: "#4f8560" });
  }

  function daisyHead(k, c, s, tilt = 0, count = 13) {
    const squash = Math.cos((tilt * Math.PI) / 180);
    for (let i = 0; i < count; i += 1) {
      const a = (i * 360) / count + (k.rand() - 0.5) * 7;
      const d0 = unit(a);
      const len = Math.hypot(d0[0], d0[1] * squash);
      const d = [d0[0] / len, (d0[1] * squash) / len];
      const shape = ring(leafSides(along(c, d, s * 0.3 * len), d, s * (0.95 + (k.rand() - 0.5) * 0.12) * len, s * 0.36, (q) => Math.pow(Math.sin(Math.PI * q), 0.55), 12));
      k.shape(shape, k.gradient(c, along(c, d, s * 1.2), "#cfd6e2", "#fffefa"), { line: 0.36, layers: 14, alpha: 0.11 });
    }
    const disc = ellipsePoints(c, s * 0.34, s * 0.34 * squash, 0, 0, 360, 22).slice(0, -1);
    k.shape(disc, k.gradient([c[0] - s * 0.3, c[1] - s * 0.3], [c[0] + s * 0.3, c[1] + s * 0.3], "#f8d466", "#d9952f"), { line: 0.45, layers: 20 });
    for (let i = 0; i < 9; i += 1) k.dab(along(c, unit(i * 47), s * 0.12 * (1 + (i % 3))), 0.32, "#8a5f22", { alpha: 0.25, layers: 5 });
  }
  function drawDaisies(k) {
    stemBand(k, sample(quad([44, 138], [36, 92], [34, 46]), 0, 1, 30), 1.7);
    stemBand(k, sample(quad([46, 138], [56, 100], [60, 68]), 0, 1, 26), 1.6);
    ileaf(k, [42, 120], unit(-150), 22, 7);
    ileaf(k, [47, 108], unit(-30), 19, 6.4, { dark: "#6a9c6d" });
    ileaf(k, [44, 132], unit(-128), 16, 5.4);
    daisyHead(k, [34, 40], 15);
    daisyHead(k, [60, 64], 12, 34, 12);
  }

  function drawEucalyptus(k) {
    const stem = quad([42, 138], [28, 80], [48, 10]);
    const tangent = tangentOf(stem);
    stemBand(k, sample(stem, 0, 1, 40), 1.7, ["#8a7462", "#a99c86"]);
    [0.1, 0.22, 0.34, 0.45, 0.56, 0.66, 0.75, 0.83, 0.9, 0.96].forEach((t, i) => {
      const side = i % 2 ? 1 : -1;
      const rad = 12 * (1 - t * 0.6);
      const p = stem(t);
      const d = turn(tangent(t), side * 70);
      const c = along(p, d, rad + 2.4);
      const shape = ellipsePoints(c, rad, rad * 0.88, angleOf(d), 0, 360, 34).slice(0, -1);
      k.pen([p, along(p, d, 2.6)], 0.6, { alpha: 0.75, color: OUTLINE });
      k.shape(shape, k.gradient(along(c, d, -rad), along(c, d, rad), pick(k.rand, ["#689690", "#76a39c", "#5f8d88"]), SAGE.pale), { line: 0.48 });
      k.bloom(shape, ellipsePoints(along(c, turn(d, -90), rad * 0.3), rad * 0.5, rad * 0.32, angleOf(d), 0, 360, 16).slice(0, -1), "#ffffff", 0.09, 6);
      k.pen([along(p, d, 2.6), along(p, d, 2.6 + rad * 1.3)], 0.3, { alpha: 0.4, color: OUTLINE, end: 0.7, wobble: 0.05 });
    });
  }

  function drawLavender(k) {
    [quad([38, 138], [32, 80], [21, 18]), quad([38, 138], [40, 70], [40, 8]), quad([38, 138], [46, 80], [57, 20])].forEach((stem) => {
      const tangent = tangentOf(stem);
      stemBand(k, sample(stem, 0, 0.97, 30), 1.4, ["#6f9672", "#a3be93"]);
      for (let j = 0; j < 11; j += 1) {
        const t = 0.6 + j * 0.035;
        const size = 1 - (t - 0.6) * 1.05;
        const p = stem(t);
        const d = tangent(t);
        [-1, 1].forEach((side) => {
          const c = along(p, [-d[1], d[0]], side * 2.2 * size);
          const shape = ellipsePoints(c, 1.9 * size + 0.8, 3.4 * size + 1.2, angleOf(d) + 90 + side * 24, 0, 360, 16).slice(0, -1);
          k.shape(shape, k.gradient(along(c, d, 4), along(c, d, -4), pick(k.rand, ["#8573c2", "#9483cf", "#7a68b8"]), "#d3c9f2"), { line: 0.3, layers: 14, alpha: 0.11, step: 0.9 });
        });
      }
      k.shape(ellipsePoints(stem(1), 1.4, 2.8, angleOf(tangent(1)) + 90, 0, 360, 12).slice(0, -1), "#9483cf", { line: 0.3, layers: 12, step: 0.8 });
    });
    const knot = [40, 110];
    [[knot, [30, 101], [28, 112], [40, 111]], [knot, [50, 101], [53, 112], [40, 111]]].forEach(([a, b, c, d]) => {
      const loop = sample(cubic(a, b, c, d), 0, 1, 18);
      k.shape(band(loop, 1.8, 1), "#d9b98a", { line: 0.32, layers: 12 });
    });
    [[knot, [37, 118], [34, 126]], [knot, [43, 118], [47, 125]]].forEach(([a, b, c]) => k.shape(band(sample(quad(a, b, c), 0, 1, 12), 1.8, 0.8), "#d9b98a", { line: 0.32, layers: 12 }));
    k.shape(ellipsePoints(knot, 1.8, 1.6, 0, 0, 360, 10).slice(0, -1), "#c9a46b", { line: 0.32, layers: 10 });
  }

  function drawGinkgo(k) {
    const reach = (offset) => (offset < 7 ? 0.74 + 0.26 * (offset / 7) : 1) * Math.min(1, 0.35 + (58 - offset) / 22);
    const fan = (p, angle, R) => {
      const rim = [];
      for (let i = 0; i <= 40; i += 1) {
        const a = angle - 58 + (116 * i) / 40;
        rim.push(along(p, unit(a), R * reach(Math.abs(a - angle)) * (1 + 0.025 * Math.sin(i * 1.7))));
      }
      const paint = k.g.createRadialGradient(p[0], p[1], 2, p[0], p[1], R);
      paint.addColorStop(0, "#f6e39e");
      paint.addColorStop(0.6, "#f0c552");
      paint.addColorStop(1, "#e2973a");
      const shape = [p, ...rim];
      k.shape(shape, paint, { layers: 22, spread: 0.16 });
      for (let i = 1; i < 16; i += 1) {
        const a = angle - 52 + (104 * i) / 16;
        const offset = Math.abs(a - angle);
        if (offset < 3) continue;
        k.pen([along(p, unit(a), 3), along(p, unit(a), R * 0.88 * reach(offset))], 0.2, { alpha: 0.35, color: "#a8742a", start: 0.1, end: 0.3, wobble: 0.04 });
      }
    };
    k.shape(band(sample(quad([44, 58], [48, 84], [52, 104]), 0, 1, 20), 1.6), "#b49b58", { line: 0.36 });
    k.shape(band(sample(quad([62, 66], [56, 86], [52, 104]), 0, 1, 20), 1.6), "#b49b58", { line: 0.36 });
    fan([44, 58], -100, 34);
    fan([62, 66], -36, 27);
  }

  function drawVase(k) {
    // Stems in the water first, then the glass over them, then the flowers above the neck.
    k.pen(sample(quad([38, 128], [34, 86], [30, 40]), 0, 1, 24), 0.9, { alpha: 0.6, color: GREEN.deep });
    k.pen(sample(quad([42, 128], [48, 90], [58, 54]), 0, 1, 24), 0.9, { alpha: 0.6, color: GREEN.deep });
    k.pen(sample(quad([40, 128], [40, 84], [44, 30]), 0, 1, 24), 0.8, { alpha: 0.6, color: GREEN.deep });
    const glass = [...curves((p) => p, [cubic([33, 70], [33, 80], [16, 88], [16, 108]), cubic([16, 108], [16, 132], [64, 132], [64, 108]), cubic([64, 108], [64, 88], [47, 80], [47, 70])]), [47, 64], [33, 64]];
    const water = [[10, 96], [70, 96], [70, 140], [10, 140]];
    k.wash(glass, "#dcecf2", { layers: 12, alpha: 0.07, spread: 0.1, edge: 0 });
    k.bloom(glass, water, "#a9cfdf", 0.08, 12);
    k.bloom(glass, [[19, 96], [61, 96], [61, 98], [19, 98]], "#7fb2c8", 0.12, 6);
    k.outline(glass, 0.55);
    k.pen([[33, 64], [47, 64]], 0.5, { alpha: 0.85, color: OUTLINE });
    k.pen(sample(quad([22, 102], [21, 114], [27, 122]), 0, 1, 10), 1.2, { alpha: 0.5, color: "#ffffff", wobble: 0.05 });
    k.pen(sample(quad([36, 72], [36, 80], [30, 84]), 0, 1, 8), 0.8, { alpha: 0.5, color: "#ffffff", wobble: 0.05 });
    // Mimosa: soft yellow puffs along a sprig.
    const sprig = quad([44, 64], [42, 44], [46, 20]);
    for (let i = 0; i < 16; i += 1) {
      const t = 0.15 + (i / 16) * 0.85;
      const p = along(sprig(t), unit(k.rand() * 360), 2 + k.rand() * 4);
      k.shape(ellipsePoints(p, 2.4, 2.4, 0, 0, 360, 12).slice(0, -1), k.gradient([p[0] - 2, p[1] - 2], [p[0] + 2, p[1] + 2], "#fbe48a", "#e9b53c"), { line: 0.28, layers: 12, step: 0.8 });
    }
    ileaf(k, [40, 66], unit(-150), 14, 4, { vein: 0.3 });
    tulipHead(k, [58, 52], 13, 12, ["#e97c90", "#fcd3d8"]);
    daisyHead(k, [29, 38], 11, 10, 12);
  }

  function drawPot(k) {
    [[-62, 30, 15], [-112, 26, 13.5], [-88, 36, 14], [-30, 22, 11.5], [-150, 20, 11]].forEach(([a, length, width], i) => {
      const base = [35, 56];
      const d = unit(a);
      k.pen([base, along(base, d, 4)], 0.8, { alpha: 0.8, color: OUTLINE });
      ileaf(k, along(base, d, 3), d, length, width, { dark: i % 2 ? "#4f8560" : GREEN.deep, light: i % 2 ? "#bfdca6" : GREEN.pale });
    });
    const pot = [[13, 62], [57, 62], [51, 96], [19, 96]];
    k.shape(pot, k.gradient([13, 62], [57, 96], "#f2b99a", "#d27e5a"), { layers: 24 });
    k.bloom(pot, [[40, 60], [62, 60], [54, 98], [40, 98]], "#c46b4a", 0.07);
    k.shape([[10, 56], [60, 56], [60, 65], [10, 65]], k.gradient([10, 56], [60, 65], "#f6c6aa", "#df8f6b"), { layers: 22 });
    k.pen([[20, 72], [22, 86]], 1.1, { alpha: 0.4, color: "#ffffff", wobble: 0.05 });
  }

  function drawWreath(k) {
    const c = [56, 54];
    const R = 38;
    for (let i = 0; i < 26; i += 1) {
      const a = (i / 26) * 360;
      const p = along(c, unit(a), R + (i % 2 ? 2.6 : -2.6));
      const d = unit(a + 90 + (i % 2 ? 26 : -26));
      ileaf(k, p, d, 13, 6, { dark: pick(k.rand, [GREEN.deep, "#4f8560", "#6a9c6d"]), light: pick(k.rand, [GREEN.pale, "#bfdca6"]), vein: 0.3 });
    }
    k.outline(ellipsePoints(c, R, R, 0, 0, 360, 80).slice(0, -1), 0.6, { alpha: 0.5 });
    for (let i = 0; i < 9; i += 1) {
      const a = 18 + i * 40 + (k.rand() - 0.5) * 10;
      const p = along(c, unit(a), R + (k.rand() - 0.5) * 6);
      if (i % 3 === 0) daisyHead(k, p, 5.5, 0, 10);
      else [[0, 0], [2.6, -1.4], [1, 2.2]].forEach(([dx, dy]) => k.shape(ellipsePoints([p[0] + dx, p[1] + dy], 1.7, 1.7, 0, 0, 360, 10).slice(0, -1), k.gradient([p[0] - 1, p[1] - 1], [p[0] + 2, p[1] + 2], "#f09a8a", "#c84a46"), { line: 0.3, layers: 12, step: 0.7 }));
    }
    const knot = [c[0], c[1] + R + 2];
    [[knot, [44, 82], [41, 96], [56, 95]], [knot, [68, 82], [71, 96], [56, 95]]].forEach(([a, b, cc, d]) => {
      k.shape(band(sample(cubic(a, b, cc, d), 0, 1, 18), 3, 1), k.gradient([40, 84], [72, 98], "#f6c3c1", "#e58f94"), { line: 0.36, layers: 14 });
    });
    [[knot, [51, 102], [47, 110]], [knot, [61, 102], [66, 109]]].forEach(([a, b, cc]) => k.shape(band(sample(quad(a, b, cc), 0, 1, 12), 3, 0.8), "#eba3a5", { line: 0.36, layers: 14 }));
    k.shape(ellipsePoints(knot, 2.6, 2.2, 0, 0, 360, 12).slice(0, -1), "#e58f94", { line: 0.36 });
  }

  // Each plant turned about the base of its own stem, which is brought to the tie.
  const gathered = (k, tie, base, rotation, scale, draw) => {
    k.g.save();
    k.g.translate(tie[0], tie[1]);
    k.g.rotate((rotation * Math.PI) / 180);
    k.g.scale(scale, scale);
    k.g.translate(-base[0], -base[1] + 40);
    draw();
    k.g.restore();
  };
  function drawBouquet(k) {
    const tie = [52, 112];
    gathered(k, tie, [42, 138], -30, 0.76, () => drawEucalyptus(k));
    gathered(k, tie, [38, 138], 26, 0.74, () => drawLavender(k));
    gathered(k, tie, [43, 138], -8, 0.86, () => drawTulips(k));
    gathered(k, tie, [45, 138], 16, 0.8, () => drawDaisies(k));
    const wrap = [[30, 98], [76, 96], [60, 146], [52, 149], [44, 146]];
    k.shape(wrap, k.gradient([30, 98], [76, 148], "#f1e2c8", "#d3b48a"), { layers: 22 });
    k.bloom(wrap, [[53, 94], [80, 94], [62, 150], [53, 150]], "#c49f72", 0.08);
    k.pen([[53, 99], [56, 145]], 0.35, { alpha: 0.4, color: OUTLINE });
    const knot = [53, 113];
    [[knot, [40, 102], [36, 115], [53, 115]], [knot, [66, 102], [70, 115], [53, 115]]].forEach(([a, b, c, d]) => {
      k.shape(band(sample(cubic(a, b, c, d), 0, 1, 18), 3.2, 1), k.gradient([38, 102], [70, 116], "#f6c3c1", "#e58f94"), { line: 0.4, layers: 14 });
    });
    [[knot, [48, 124], [44, 134]], [knot, [58, 124], [63, 133]]].forEach(([a, b, c]) => k.shape(band(sample(quad(a, b, c), 0, 1, 12), 3.2, 0.8), "#eba3a5", { line: 0.4, layers: 14 }));
    k.shape(ellipsePoints(knot, 2.8, 2.4, 0, 0, 360, 12).slice(0, -1), "#e58f94", { line: 0.4 });
  }

  const flora = (w, h, seed, draw) => () => {
    const W = w + STICKER_PAD * 2;
    const H = h + STICKER_PAD * 2;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><image href="${picture(`flora-${seed}`, w, h, seed, draw, { cut: 3 })}" width="${W}" height="${H}"/></svg>`;
  };
  const floraSize = (w, h) => [w + STICKER_PAD * 2, h + STICKER_PAD * 2];

  // ---- Paper for printed things ------------------------------------------------------------------

  function roundedShape(w, h, r = 3, notch = 0, notchY = h / 2) {
    if (!notch) return `M${r} 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}H${r}A${r} ${r} 0 0 1 0 ${h - r}V${r}A${r} ${r} 0 0 1 ${r} 0Z`;
    return `M${r} 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V${notchY - notch}A${notch} ${notch} 0 0 0 ${w} ${notchY + notch}V${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}H${r}A${r} ${r} 0 0 1 0 ${h - r}V${notchY + notch}A${notch} ${notch} 0 0 0 0 ${notchY - notch}V${r}A${r} ${r} 0 0 1 ${r} 0Z`;
  }
  function inkFilter(id, seed, { roughen = 0.5, holes = 1.3 } = {}) {
    return `<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" result="n"/>`
      + `<feDisplacementMap in="SourceGraphic" in2="n" scale="${roughen}" result="d"/>`
      + `<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -${holes} ${n(holes * 0.5 + 0.95)}" result="s"/>`
      + '<feComposite in="d" in2="s" operator="in"/></filter>';
  }
  const grainFilter = (id, seed, rgb = "0.42 0.34 0.24", strength = 0.3) => {
    const [r, g, b] = rgb.split(" ");
    return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 ${strength} -0.07"/></filter>`;
  };
  // Card stock that has been kept a while: an uneven edge, speckle, edges gone towards ochre and a
  // faint tide mark. `print` wraps what was printed on it, so its ink is uneven.
  function oldPaper(w, h, shape, fill, seed, { grain: speck = "0.42 0.34 0.24", strength = 0.26, age = 0.15, stains = 1, tone = "#a07d48" } = {}) {
    const id = nextId();
    const stain = stains ? picture(`stain-${w}-${h}-${seed}`, w, h, seed, (k) => {
      const c = [w * (0.6 + k.rand() * 0.3), h * (0.2 + k.rand() * 0.3)];
      k.dab(c, 5 + k.rand() * Math.min(w, h) * 0.1, "#b48d55", { alpha: 0.012, layers: 10, spread: 0.45, edge: 0.05 });
    }) : "";
    const defs = `<clipPath id="${id}c"><path d="${shape}"/></clipPath>${grainFilter(`${id}g`, seed, speck, strength)}`
      + `<radialGradient id="${id}a" cx="0.5" cy="0.5" r="0.72"><stop offset="0.5" stop-color="${tone}" stop-opacity="0"/><stop offset="1" stop-color="${tone}" stop-opacity="${age}"/></radialGradient>`
      + `<filter id="${id}e" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/></filter>`
      + inkFilter(`${id}p`, seed + 2, { roughen: 0.35, holes: 1 });
    const body = `<path d="${shape}" fill="${fill}" filter="url(#${id}e)"/><g clip-path="url(#${id}c)"><rect width="${w}" height="${h}" filter="url(#${id}g)"/><rect width="${w}" height="${h}" fill="url(#${id}a)"/>${stain ? `<image href="${stain}" width="${w}" height="${h}"/>` : ""}</g>`;
    return { id, defs, body, print: (inner) => `<g filter="url(#${id}p)">${inner}</g>` };
  }
  const perforation = (x1, y1, x2, y2, color, step = 4) => {
    const count = Math.max(1, Math.floor(Math.hypot(x2 - x1, y2 - y1) / step));
    let out = "";
    for (let i = 0; i <= count; i += 1) out += `<circle cx="${n(x1 + ((x2 - x1) * i) / count)}" cy="${n(y1 + ((y2 - y1) * i) / count)}" r="0.7"/>`;
    return `<g fill="${color}" opacity="0.5">${out}</g>`;
  };
  // A date pressed by hand with a rubber stamp: a little crooked, inked unevenly.
  function stampedDate(x, y, date, rotation, seed, color = "#5b4b8a") {
    const id = nextId();
    const width = Math.max(50, ems(date) * 7.4 + 12);
    return {
      defs: inkFilter(id, seed, { roughen: 0.8, holes: 2 }),
      body: `<g transform="translate(${x} ${y}) rotate(${rotation})" filter="url(#${id})" opacity="0.82"><rect x="${n(-width / 2)}" y="-7.5" width="${n(width)}" height="15" rx="2.2" fill="none" stroke="${color}" stroke-width="0.9"/>${text(0, 2.8, date, { size: 7.4, font: MONO, fill: color, anchor: "middle", weight: 600 })}</g>`,
    };
  }

  // ---- 复古票据与邮戳 ------------------------------------------------------------------------------

  function cinemaTicket(v) {
    const W = 160;
    const H = 66;
    const shape = roundedShape(W, H, 3, 5);
    const paper = oldPaper(W, H, shape, "#f1e4c8", 11);
    const stamp = stampedDate(44, 54.5, v.date, -4, 12);
    const red = "#a8452f";
    const printed = `<path d="${roundedShape(W - 8, H - 8, 1.5, 5, (H - 8) / 2)}" transform="translate(4 4)" fill="none" stroke="${red}" stroke-width="0.6" opacity="0.75"/>`
      + perforation(118, 9, 118, 57, red)
      + text(12, 18, "CINEMA · 电影院", { size: 6.6, fill: red, spacing: 1.6 })
      + text(12, 32, v.title, { size: 13, font: SONG, fill: "#33302c", spacing: 0.5, max: 98 })
      + text(12, 41.5, `${v.seat} · ${v.time}`, { size: 6.3, font: SANS, fill: "#5d564e", max: 98 })
      + text(138, 27, "ADMIT", { size: 7, fill: red, anchor: "middle", spacing: 1.4 })
      + text(138, 36, "ONE", { size: 7, fill: red, anchor: "middle", spacing: 1.4 })
      + text(138, 52, "No.0042", { size: 5.5, font: MONO, fill: "#8a7f72", anchor: "middle" });
    return svg(W, H, paper.body + paper.print(printed) + stamp.body, paper.defs + stamp.defs);
  }

  function trainTicket(v) {
    const W = 164;
    const H = 64;
    const shape = roundedShape(W, H, 4);
    const paper = oldPaper(W, H, shape, "#d8e3e6", 12, { grain: "0.2 0.32 0.38", strength: 0.2, tone: "#6b7a6a", age: 0.16, stains: 0 });
    const id = nextId();
    const defs = `${paper.defs}<pattern id="${id}w" width="12" height="5" patternUnits="userSpaceOnUse"><path d="M0 2.5Q3 0 6 2.5T12 2.5" fill="none" stroke="rgba(70,112,128,0.2)" stroke-width="0.5"/></pattern>`;
    const ink = "#26343b";
    const printed = `<rect width="${W}" height="${H}" fill="url(#${id}w)" clip-path="url(#${paper.id}c)"/>`
      + text(9, 12, "Z 0042", { size: 6.5, font: MONO, fill: "#b0413a", spacing: 0.4 })
      + text(155, 12, "硬座", { size: 5.5, font: SONG, fill: "#5c6f77", anchor: "end", spacing: 1 })
      + text(37, 32, v.from, { size: 15, font: SONG, fill: ink, anchor: "middle", spacing: 2, max: 56 })
      + text(37, 41, "始 发", { size: 4.8, font: SANS, fill: "#5c6f77", anchor: "middle", spacing: 1 })
      + `<path d="M69 27H95M91.5 24.6L95.6 27L91.5 29.4" fill="none" stroke="${ink}" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>`
      + text(127, 32, v.to, { size: 15, font: SONG, fill: ink, anchor: "middle", spacing: 2, max: 56 })
      + text(127, 41, "到 达", { size: 4.8, font: SANS, fill: "#5c6f77", anchor: "middle", spacing: 1 })
      + `<path d="M9 46.5H155" stroke="#7d949c" stroke-width="0.5" stroke-dasharray="1.6 1.6"/>`
      + text(9, 55, `${v.date}  ${v.time} 开`, { size: 6.3, font: MONO, fill: ink, max: 86 })
      + text(155, 55, v.seat, { size: 6.3, font: SANS, fill: ink, anchor: "end", max: 56 })
      + text(155, 61.2, "限乘当日当次车", { size: 4.4, font: SANS, fill: "#6c7d84", anchor: "end" });
    return svg(W, H, paper.body + paper.print(printed), defs);
  }

  function museumTicket(v) {
    const W = 80;
    const H = 124;
    const shape = roundedShape(W, H, 3, 4.5, 108);
    const paper = oldPaper(W, H, shape, "#efeadf", 13);
    const stamp = stampedDate(40, 99.5, v.date, 3, 14, "#8a3b34");
    const dark = "#2e2d2b";
    // An engraved façade: pediment with a roundel, entablature, four fluted columns, steps.
    let columns = "";
    [22, 32.6, 47.4, 58].forEach((x) => {
      columns += `<path d="M${x - 2.6} 61.2H${x + 2.6}M${x - 2} 62.2V77M${x + 2} 62.2V77M${x - 0.7} 63V76.4M${x + 0.7} 63V76.4M${x - 2.6} 77.6H${x + 2.6}"/>`;
    });
    const printed = `<rect width="${W}" height="36" fill="${dark}" clip-path="url(#${paper.id}c)"/>`
      + text(40, 17, "MUSEUM", { size: 9, fill: "#f3efe6", anchor: "middle", spacing: 3 })
      + text(40, 29, v.name, { size: 6.8, font: SONG, fill: "#d9d2c3", anchor: "middle", spacing: 0.6, max: 68 })
      + `<g fill="none" stroke="${dark}" stroke-width="0.55" stroke-linecap="round" stroke-linejoin="round">`
      + '<path d="M16 54L40 42.5L64 54Z"/><path d="M20.5 52.6L40 43.8L59.5 52.6"/><circle cx="40" cy="49.4" r="2.2"/>'
      + '<path d="M15 55.4H65M15.5 57.6H64.5M16 59.8H64"/>'
      + `<path d="M17 56.5H63" stroke-dasharray="0.7 1.1"/>${columns}`
      + '<path d="M15 78.8H65M13 80.8H67M11 82.8H69"/></g>'
      + text(40, 89, "ADMISSION · 入场券", { size: 5, fill: "#5d574d", anchor: "middle", spacing: 0.8 })
      + perforation(8, 108, 72, 108, dark)
      + text(40, 118.5, "No. 0217", { size: 5, font: MONO, fill: "#8a8375", anchor: "middle" });
    return svg(W, H, paper.body + paper.print(printed) + stamp.body, paper.defs + stamp.defs);
  }

  function concertTicket(v) {
    const W = 152;
    const H = 58;
    const shape = roundedShape(W, H, 3, 5);
    const paper = oldPaper(W, H, shape, "#2f4a40", 14, { grain: "0.9 0.85 0.7", strength: 0.14, tone: "#1c2b25", age: 0.35, stains: 0 });
    const gold = "#dcc48e";
    const printed = `<path d="${roundedShape(W - 8, H - 8, 1.5, 5, (H - 8) / 2)}" transform="translate(4 4)" fill="none" stroke="${gold}" stroke-width="0.5" opacity="0.6"/>`
      + perforation(110, 9, 110, 49, gold)
      + text(12, 16, "LIVE · 现场", { size: 6.5, fill: gold, spacing: 1.8 })
      + text(12, 32, v.title, { size: 12, font: SONG, fill: "#f1e6c8", spacing: 0.4, max: 90 })
      + text(12, 42.5, `${v.time} 开场 · 站席自由`, { size: 5.8, font: SANS, fill: "#cbb98d", max: 90 })
      + text(12, 51, v.date, { size: 5.8, font: MONO, fill: "#cbb98d" })
      + text(131, 22, "ROW", { size: 6, fill: gold, anchor: "middle", spacing: 1.5 })
      + text(131, 35, v.seat, { size: 11, fill: "#f1e6c8", anchor: "middle", max: 30 })
      + `<path d="M131 42.5l1 2.2 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3Z" fill="${gold}"/>`;
    return svg(W, H, paper.body + paper.print(printed), paper.defs);
  }

  // A perforated stamp whose picture is a small watercolour.
  function perforatedStamp(seed, ground, paintPictureFn, print) {
    const W = 60;
    const H = 72;
    const id = nextId();
    let bites = "";
    for (let x = 2.5; x <= W; x += 5) bites += `<circle cx="${x}" cy="0" r="1.9"/><circle cx="${x}" cy="${H}" r="1.9"/>`;
    for (let y = 2.5; y <= H; y += 5) bites += `<circle cx="0" cy="${y}" r="1.9"/><circle cx="${W}" cy="${y}" r="1.9"/>`;
    const art = picture(`stamp-${seed}`, 50, 62, seed, paintPictureFn);
    const defs = `<mask id="${id}m"><rect width="${W}" height="${H}" fill="#fff"/><g fill="#000">${bites}</g></mask>`
      + grainFilter(`${id}g`, seed, "0.42 0.34 0.24", 0.2) + inkFilter(`${id}p`, seed + 1, { roughen: 0.3, holes: 0.9 });
    const body = `<g mask="url(#${id}m)"><rect width="${W}" height="${H}" fill="#fbf7ee"/><rect width="${W}" height="${H}" filter="url(#${id}g)"/></g>`
      + `<rect x="5" y="5" width="50" height="62" fill="${ground}"/><image href="${art}" x="5" y="5" width="50" height="62"/>`
      + `<g filter="url(#${id}p)">${print}</g><rect x="5" y="5" width="50" height="62" fill="none" stroke="rgba(60,58,53,0.22)" stroke-width="0.4"/>`;
    return svg(W, H, body, defs);
  }

  const mountainStamp = () => perforatedStamp(21, "#f6ecd6", (k) => {
    k.wash([[0, 0], [50, 0], [50, 40], [0, 40]], k.gradient([0, 0], [0, 40], "#f3dcb4", "#f0c9a0"), { layers: 10, alpha: 0.12, spread: 0.06, step: 6, edge: 0 });
    k.dab([33, 21], 6, "#e08356", { alpha: 0.12, layers: 14 });
    const ridge = (base, peaks, seed) => {
      const r = rng(seed);
      const pts = [[-2, base]];
      peaks.forEach(([x, y]) => pts.push([x - 6 - r() * 3, (base + y) / 2 + r() * 2], [x, y], [x + 5 + r() * 3, (base + y) / 2 + r() * 2]));
      return [...pts, [52, base], [52, 64], [-2, 64]];
    };
    k.wash(ridge(44, [[10, 34], [31, 25], [46, 33]], 3), k.gradient([0, 25], [0, 50], "#a8b9c0", "#d7dfdc"), { layers: 14, alpha: 0.1, spread: 0.14, step: 2.4 });
    k.wash(ridge(52, [[4, 43], [22, 37], [40, 42]], 4), k.gradient([0, 37], [0, 56], "#8fa995", "#c8d4c0"), { layers: 14, alpha: 0.11, spread: 0.14, step: 2.4 });
    k.wash([[0, 46], [50, 46], [50, 50], [0, 50]], "#ffffff", { layers: 8, alpha: 0.08, spread: 0.3, step: 3, edge: 0 });
    k.wash(ridge(60, [[14, 50], [36, 47]], 5), k.gradient([0, 47], [0, 62], "#4f6d5d", "#7f9a83"), { layers: 15, alpha: 0.12, spread: 0.14, step: 2.4 });
    [[9, 52], [12, 51], [41, 49], [44, 50.5]].forEach(([x, y]) => {
      k.wash([[x, y - 5], [x + 2, y + 1], [x - 2, y + 1]], "#3e5a4b", { layers: 10, alpha: 0.13, spread: 0.1, step: 0.8 });
    });
    k.pen([[13, 15], [15, 13.6], [17, 15]], 0.32, { alpha: 0.6, wobble: 0 });
    k.pen([[18.5, 11.6], [20.2, 10.6], [21.9, 11.6]], 0.28, { alpha: 0.55, wobble: 0 });
  }, text(9, 13.5, "开页邮政", { size: 5.5, font: SONG, fill: "#3c3a35", spacing: 0.4 })
    + text(46.5, 63.5, "80", { size: 10, fill: "#fbf8f1", anchor: "end" })
    + text(47.5, 63.5, "分", { size: 4.6, font: SONG, fill: "#fbf8f1" }));

  const camelliaStamp = () => perforatedStamp(22, "#efe7d6", (k) => {
    const cx = 25;
    const cy = 32;
    [[[0.62, 0.78], 21, 10.5], [[-0.72, 0.69], 19, 9.6], [[0.95, -0.25], 15, 8]].forEach(([d, length, width], i) => {
      k.leaf([cx + (i === 1 ? -3 : 3), cy + (i === 2 ? -2 : 5)], d, length, width, { light: "#7f9b7c", dark: "#2f4d3a", shade: 0.08, midrib: 0.3, outline: 0.3, veins: 3 });
    });
    for (let ringIndex = 0; ringIndex < 2; ringIndex += 1) {
      const count = ringIndex ? 5 : 6;
      for (let i = 0; i < count; i += 1) {
        const a = i * (360 / count) - 90 + ringIndex * 30 + (k.rand() - 0.5) * 10;
        const d = unit(a);
        const R = ringIndex ? 5.4 : 8;
        const p = along([cx, cy], d, R * 0.7);
        const shape = ellipsePoints(along(p, d, R * 0.25), R * 0.95, R * 0.8, a, 0, 360, 24).slice(0, -1);
        k.wash(shape, k.gradient([cx, cy], along([cx, cy], d, R * 1.8), ringIndex ? "#a5302e" : "#b83b37", ringIndex ? "#cf6159" : "#e38a7f"), { layers: 14, alpha: 0.11, spread: 0.2, step: 1.2 });
        k.pen(ellipsePoints(along(p, d, R * 0.25), R * 0.95, R * 0.8, a, -60, 70, 14), 0.24, { alpha: 0.4, wobble: 0.04 });
      }
    }
    k.dab([cx, cy], 3.2, "#efcf63", { alpha: 0.15 });
    for (let i = 0; i < 11; i += 1) {
      const a = (i / 11) * 360;
      const p = along([cx, cy], unit(a), 2.6);
      k.pen([[cx, cy], p], 0.18, { alpha: 0.4, start: 0, end: 0, wobble: 0 });
      k.dab(p, 0.5, "#b07a1e", { alpha: 0.3, layers: 5 });
    }
  }, text(9, 14, "山茶", { size: 6, font: SONG, fill: "#3c3a35", spacing: 1 })
    + text(46.5, 63.5, "1.20", { size: 8, fill: "#3c3a35", anchor: "end" })
    + text(47.5, 63.5, "元", { size: 4.6, font: SONG, fill: "#3c3a35" }));

  // A round date stamp: the town along the top, a line of the writer's along the bottom, the date
  // across the middle, and the wavy cancellation beside it.
  function postmark(v) {
    const W = 120;
    const H = 66;
    const id = nextId();
    const cx = 33;
    const cy = 33;
    const ink = "#39414f";
    const arcFit = (value, radius, span, size, spacing) => {
      const room = (radius * span * Math.PI) / 180;
      const width = ems(value, spacing, size) * size;
      return width > room ? Math.max(3.4, (size * room) / width) : size;
    };
    const topSize = arcFit(v.place, 22.6, 150, 6.4, 1.2);
    const bottomSize = arcFit(v.note, 26.4, 120, 5.8, 1.6);
    const defs = `<path id="${id}t" d="M${cx - 22.6} ${cy}A22.6 22.6 0 0 1 ${cx + 22.6} ${cy}"/><path id="${id}b" d="M${cx - 26.4} ${cy}A26.4 26.4 0 0 0 ${cx + 26.4} ${cy}"/>`
      + inkFilter(`${id}r`, 5, { roughen: 0.8, holes: 2.2 });
    const waves = [17, 26, 35, 44].map((y, i) => {
      let d = `M64 ${y}`;
      for (let x = 64; x < 116; x += 12) d += `Q${x + 3} ${y - 2.4 + (i % 2) * 0.4} ${x + 6} ${y}T${x + 12} ${y}`;
      return d;
    }).join("");
    const chord = Math.sqrt(21 * 21 - 5.5 * 5.5);
    const body = `<g filter="url(#${id}r)" opacity="0.86">`
      + `<circle cx="${cx}" cy="${cy}" r="28" fill="none" stroke="${ink}" stroke-width="1.3"/><circle cx="${cx}" cy="${cy}" r="21" fill="none" stroke="${ink}" stroke-width="0.8"/>`
      + `<text font-family="${SONG}" font-size="${n(topSize)}" fill="${ink}" letter-spacing="${n(1.2 * (topSize / 6.4))}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(v.place)}</textPath></text>`
      + `<text font-family="${SONG}" font-size="${n(bottomSize)}" fill="${ink}" letter-spacing="${n(1.6 * (bottomSize / 5.8))}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${esc(v.note)}</textPath></text>`
      + `<path d="M${n(cx - chord)} ${cy - 5.5}H${n(cx + chord)}M${n(cx - chord)} ${cy + 5.5}H${n(cx + chord)}" stroke="${ink}" stroke-width="0.6"/>`
      + text(cx, cy + 2.4, v.date, { size: 6.6, font: MONO, fill: ink, anchor: "middle", weight: 600, max: 40 })
      + text(cx, cy - 9.5, "✦", { size: 5, fill: ink, anchor: "middle" })
      + text(cx, cy + 14.5, v.hour, { size: 5, font: MONO, fill: ink, anchor: "middle", max: 20 })
      + `<path d="${waves}" fill="none" stroke="${ink}" stroke-width="1.1" stroke-linecap="round"/></g>`;
    return svg(W, H, body, defs);
  }

  function airmail() {
    const W = 112;
    const H = 32;
    const id = nextId();
    const paper = oldPaper(W, H, roundedShape(W, H, 1.5), "#fbf7ee", 23, { stains: 0, age: 0.12 });
    const defs = `${paper.defs}<pattern id="${id}s" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="16" fill="#b4433b"/><rect x="8" width="4" height="16" fill="#2d4f86"/></pattern>`;
    const blue = "#2d4f86";
    const printed = `<path d="M0 0H${W}V${H}H0Z M4 4V${H - 4}H${W - 4}V4Z" fill="url(#${id}s)" fill-rule="evenodd" clip-path="url(#${paper.id}c)"/>`
      + text(44, 19.8, "PAR AVION", { size: 9, fill: blue, anchor: "middle", italic: true, spacing: 0.6 })
      + `<path d="M75 10.5V21.5" stroke="${blue}" stroke-width="0.5"/>`
      + text(90, 19.6, "航空", { size: 9, font: SONG, fill: blue, anchor: "middle", spacing: 2 });
    return svg(W, H, paper.body + paper.print(printed), defs);
  }

  function receipt(v) {
    const W = 86;
    const H = 124;
    let edge = "";
    for (let x = W; x > 0; x -= 4) edge += `L${x - 2} ${H}L${x - 4} ${H - 5}`;
    const shape = `M0 0H${W}V${H - 5}${edge}Z`;
    const paper = oldPaper(W, H, shape, "#fbfaf4", 15, { grain: "0.4 0.38 0.34", strength: 0.14, age: 0.1 });
    const ink = "#3a3631";
    const r = rng(9);
    let bars = "";
    for (let x = 20; x < 66;) {
      const w = 0.6 + Math.floor(r() * 3) * 0.6;
      bars += `<rect x="${n(x)}" y="104" width="${n(w)}" height="7"/>`;
      x += w + 0.6 + Math.floor(r() * 2) * 0.7;
    }
    const row = (y, name, qty, price) => text(8, y, name, { size: 6, font: SANS, fill: ink, max: 40 })
      + text(56, y, qty, { size: 6, font: MONO, fill: ink, anchor: "end" })
      + text(78, y, price, { size: 6, font: SANS, fill: ink, anchor: "end" });
    const dash = (y) => `<path d="M7 ${y}H79" stroke="#9a9286" stroke-width="0.5" stroke-dasharray="1.5 1.5"/>`;
    const printed = text(43, 14, v.shop, { size: 8, font: SONG, fill: "#2f2c28", anchor: "middle", spacing: 1, max: 70 })
      + text(43, 21, "THANK YOU · RECEIPT", { size: 4.4, fill: "#8a8378", anchor: "middle", spacing: 0.8 })
      + dash(27)
      + row(38, v.item1, "×1", "18")
      + row(48, v.item2, "×1", "—")
      + row(58, v.item3, "×1", "免费")
      + dash(65)
      + text(8, 76, "合计", { size: 6.5, font: SANS, fill: ink })
      + text(78, 76, "★★★", { size: 6, fill: "#b0453a", anchor: "end" })
      + text(8, 87.5, `${v.date}  ${v.time}`, { size: 5.4, font: MONO, fill: "#6b645a", max: 70 })
      + text(43, 98, "谢谢光临 · 欢迎再写", { size: 5.4, font: SANS, fill: "#6b645a", anchor: "middle" })
      + `<g fill="${ink}">${bars}</g>`;
    return svg(W, H, paper.body + paper.print(printed), paper.defs);
  }

  function specimenLabel(v) {
    const W = 132;
    const H = 80;
    const shape = roundedShape(W, H, 1.5);
    const paper = oldPaper(W, H, shape, "#f5f0e3", 16, { strength: 0.2, age: 0.16 });
    const ink = "#4a4339";
    const blue = "#2c4a78";
    const sprig = picture("label-sprig", 30, 36, 61, (k) => {
      const stem = quad([24, 34], [16, 20], [8, 3]);
      const tangent = tangentOf(stem);
      k.stem(sample(stem), 1, "#9a8466", 0.3);
      [0.2, 0.4, 0.6, 0.8].forEach((t, i) => k.leaf(stem(t), turn(tangent(t), (i % 2 ? 1 : -1) * 40), 9, 2.8, { light: "#c4cca9", dark: "#7c8c63", outline: 0.2, midrib: 0.18, layers: 10 }));
    });
    const rule = (y, from) => `<path d="M${from} ${y}H120" stroke="${ink}" stroke-width="0.4" opacity="0.7"/>`;
    const printed = `<path d="${shape}" fill="none" stroke="#8b7d66" stroke-width="0.8"/><rect x="4" y="4" width="${W - 8}" height="${H - 8}" fill="none" stroke="#8b7d66" stroke-width="0.4"/>`
      + text(66, 19, "HERBARIUM", { size: 8, fill: ink, anchor: "middle", spacing: 3 })
      + text(66, 29, "植 物 标 本", { size: 6.4, font: SONG, fill: "#6c6457", anchor: "middle", spacing: 1 })
      + text(12, 45, "名称", { size: 6, font: SONG, fill: ink }) + rule(46.5, 32)
      + text(12, 57, "日期", { size: 6, font: SONG, fill: ink }) + rule(58.5, 32)
      + text(12, 69, "采集地", { size: 6, font: SONG, fill: ink }) + rule(70.5, 38);
    const written = '<g transform="rotate(-1.2 66 56)">'
      + text(35, 44.6, v.name, { size: 8.6, font: HAND, fill: blue, max: 84 })
      + text(35, 56.6, v.date, { size: 7.4, font: HAND, fill: blue, max: 84 })
      + text(41, 68.6, v.place, { size: 8, font: HAND, fill: blue, max: 78 }) + "</g>";
    return svg(W, H, paper.body + paper.print(printed) + `<image href="${sprig}" x="96" y="6" width="30" height="36"/>` + written, paper.defs);
  }

  function pressedFern(v) {
    const W = 108;
    const H = 150;
    const shape = roundedShape(W, H, 1.5);
    const paper = oldPaper(W, H, shape, "#f3eddf", 17, { strength: 0.22, age: 0.18 });
    const fern = picture("pressed-fern", 96, 140, 3, (k) => {
      drawFern(k);
      [[59.5 - 10, 109.4 - 6, -18, 41], [51.7 - 10, 29 - 6, 14, 42]].forEach(([x, y, rotation, seed]) => {
        const r = rng(seed);
        const pts = [];
        for (let yy = 0; yy < 10; yy += 1.6) pts.push([28 - r() * 1.6, yy]);
        pts.push([28 - r() * 1.6, 10]);
        for (let yy = 10; yy > 0; yy -= 1.6) pts.push([r() * 1.6, yy]);
        within(k, x / 0.86, y / 0.86, rotation, 1, () => {
          k.g.translate(-14, -5);
          k.wash(pts, "#d2bb8f", { layers: 10, alpha: 0.12, spread: 0.05, step: 1.6, edge: 0.2 });
        });
      });
    });
    const body = paper.body + `<path d="${shape}" fill="none" stroke="#d9cfbd" stroke-width="0.6"/>`
      + `<image href="${fern}" x="10" y="6" width="${n(96 * 0.86)}" height="${n(140 * 0.86)}"/>`
      + '<rect x="58" y="126" width="44" height="18" fill="#fbf8ef" stroke="#8b7d66" stroke-width="0.5"/>'
      + `<g transform="rotate(-1.5 80 135)">${text(61.5, 134, v.name, { size: 6.8, font: HAND, fill: "#2c4a78", max: 38 })}${text(61.5, 141.4, v.date, { size: 5.2, font: HAND, fill: "#2c4a78", max: 38 })}</g>`;
    return svg(W, H, body, paper.defs);
  }

  // ---- 和纸胶带 · 四季 ------------------------------------------------------------------------------
  // Each roll is painted along its whole length, so no two motifs repeat; washi fibres run along it.

  function tornPoints(w, h, seed, depth = 3) {
    const r = rng(seed);
    const right = [];
    for (let y = 0; y < h; y += 2.3) right.push([w - r() * depth, y]);
    right.push([w - r() * depth, h]);
    const left = [];
    for (let y = h; y > 0; y -= 2.3) left.push([r() * depth, y]);
    left.push([r() * depth, 0]);
    return [...right, ...left];
  }
  function petalPoints(c, angle, length, width) {
    const d = unit(angle);
    const [left, right] = leafSides(c, d, length, width, (q) => Math.pow(Math.sin(Math.PI * Math.min(q, 0.94)), 0.75) * (q > 0.94 ? (1 - q) / 0.06 : 1), 14);
    const notch = along(c, d, length * 0.86);
    return [...left.slice(0, -1), notch, ...[...right].reverse().slice(1, -1)];
  }
  function blossom(k, c, size, rotation, deep) {
    for (let i = 0; i < 5; i += 1) {
      const a = rotation + i * 72;
      k.wash(petalPoints(c, a, size, size * 0.95), k.gradient(c, along(c, unit(a), size), deep ? "#df8592" : "#eeb4b8", deep ? "#f4c6ca" : "#fdf1ef"), { layers: 12, alpha: 0.13, spread: 0.18, step: 0.9 });
    }
    for (let i = 0; i < 6; i += 1) {
      const p = along(c, unit(rotation + 36 + i * 60), size * 0.32);
      k.pen([c, p], 0.14, { alpha: 0.5, color: "#b4535f", start: 0, end: 0.4, wobble: 0 });
      k.dab(p, 0.36, "#d1a43c", { alpha: 0.35, layers: 4 });
    }
  }
  function mapleLeaf(k, c, s, rotation, light, dark) {
    const point = (deg, r) => along(c, unit(deg + rotation), r * s);
    const tips = [[158, 0.58], [218, 0.88], [270, 1], [322, 0.88], [382, 0.58]];
    const valleys = [[124, 0.22], [188, 0.36], [244, 0.42], [296, 0.42], [352, 0.36], [416, 0.22]];
    const points = [point(90, 0.16)];
    tips.forEach(([a, r], i) => {
      points.push(point(valleys[i][0], valleys[i][1]));
      points.push(point(a - 11, r * 0.72), point(a - 5, r * 0.86), point(a, r), point(a + 5, r * 0.86), point(a + 11, r * 0.72));
    });
    points.push(point(valleys[5][0], valleys[5][1]));
    k.wash(points, k.gradient(point(90, 0.4), point(270, 1), dark, light), { layers: 12, alpha: 0.11, spread: 0.12, step: 0.9 });
    tips.forEach(([a, r]) => k.pen([c, point(a, r * 0.78)], 0.16, { alpha: 0.4, color: dark, start: 0, end: 0.6, wobble: 0 }));
    k.pen([point(90, 0.1), point(90, 0.7)], 0.3, { alpha: 0.6, color: dark, wobble: 0 });
  }

  const TAPES = {
    sakura: { ground: "#f7e9e4", paint(k) {
      const r = k.rand;
      for (let x = 8; x < 166; x += 15 + r() * 8) {
        const y = 7 + r() * 18;
        blossom(k, [x, y], 5.4 + r() * 2.4, r() * 72, r() > 0.5);
        if (r() > 0.35) k.wash(petalPoints([x + 9 + r() * 4, 4 + r() * 24], r() * 360, 2.8 + r(), 2.4), "#f0b9bc", { layers: 8, alpha: 0.12, spread: 0.2, step: 0.8 });
      }
    } },
    wakakusa: { ground: "#f0f2e3", paint(k) {
      for (let x = -2; x < 170; x += 12) k.wash([[x, -2], [x + 6, -2], [x + 6, 34], [x, 34]], "#97ad6c", { layers: 7, alpha: 0.05, spread: 0.06, step: 3, edge: 0.06 });
      for (const y of [2, 14, 26]) k.wash([[-2, y], [170, y], [170, y + 6], [-2, y + 6]], "#97ad6c", { layers: 7, alpha: 0.05, spread: 0.04, step: 3, edge: 0.06 });
      for (let x = 9; x < 170; x += 12) k.pen([[x, 0], [x, 32]], 0.2, { alpha: 0.35, color: "#ffffff", wobble: 0.2, start: 0, end: 0 });
    } },
    seigaiha: { ground: "#e6edf1", paint(k) {
      for (let row = 0, y = -2; y <= 38; y += 5, row += 1) {
        for (let x = (row % 2) * 8 - 8; x < 176; x += 16) {
          k.g.save();
          k.g.fillStyle = "#e6edf1";
          k.g.beginPath();
          k.g.arc(x, y, 8, 0, Math.PI * 2);
          k.g.fill();
          k.g.restore();
          if ((x + row * 3) % 5 === 0) k.wash(ellipsePoints([x, y], 7.4, 7.4, 0, 180, 360, 16), "#9fb7cf", { layers: 6, alpha: 0.07, spread: 0.1, edge: 0 });
          [7.3, 5, 2.7].forEach((rad, i) => k.pen(ellipsePoints([x, y], rad, rad, 0, 184, 356, 16), 0.62 - i * 0.08, { alpha: 0.72, color: "#55779a", start: 0.12, end: 0.12, wobble: 0.1 }));
        }
      }
    } },
    ajisai: { ground: "#eeedf4", paint(k) {
      const r = k.rand;
      const colors = [["#8a9ccf", "#c3cdea"], ["#a395d1", "#d5cdec"], ["#84a6cb", "#c6d8ea"], ["#b4a6d8", "#e0d9f0"]];
      for (let x = 14; x < 160; x += 27 + r() * 8) {
        const y = 10 + r() * 12;
        if (r() > 0.45) k.leaf([x + 5, y + 5], unit(30 + r() * 40), 15, 8.4, { light: "#c3d2b0", dark: "#7c9a6e", outline: 0.2, midrib: 0.2, veins: 2 });
        for (let i = 0; i < 11; i += 1) {
          const c = [x + (r() - 0.5) * 15, y + (r() - 0.5) * 13];
          const [dark, light] = pick(r, colors);
          const s = 2.6 + r();
          const rot = r() * 90;
          for (let j = 0; j < 4; j += 1) {
            const d = unit(rot + j * 90);
            k.wash(ring(leafSides(c, d, s, s * 0.95, (q) => Math.pow(Math.sin(Math.PI * q), 0.6), 8)), k.gradient(c, along(c, d, s), dark, light), { layers: 7, alpha: 0.14, spread: 0.14, step: 0.7 });
          }
          k.dab(c, 0.38, "#ffffff", { alpha: 0.4, layers: 4 });
        }
      }
    } },
    momiji: { ground: "#f5ead2", paint(k) {
      const r = k.rand;
      const tones = [["#e9a24f", "#c6533a"], ["#efbd62", "#d6823a"], ["#e58a5c", "#b5402e"], ["#f0c875", "#cc8b3a"]];
      for (let x = 12; x < 162; x += 19 + r() * 9) {
        const [light, dark] = pick(r, tones);
        mapleLeaf(k, [x, 8 + r() * 16], 5 + r() * 2.8, -40 + r() * 80, light, dark);
      }
    } },
    akikusa: { ground: "#f2eadb", paint(k) {
      const r = k.rand;
      for (let x = 4; x < 166; x += 6 + r() * 8) {
        const lean = (r() - 0.5) * 16;
        const blade = sample(quad([x, 34], [x + lean * 0.2, 20], [x + lean, 4 + r() * 12]), 0, 1, 14);
        k.stem(blade, 1.1, pick(r, ["#c5b088", "#b9a57a", "#a6b08a"]), 0.32);
        if (r() > 0.65) {
          const tip = blade[blade.length - 1];
          k.wash(ring(leafSides(tip, [0, 1], 8, 3.4, (q) => Math.pow(Math.sin(Math.PI * q), 0.6), 10)), "#d9c7a2", { layers: 8, alpha: 0.12, spread: 0.3, step: 0.8 });
        }
        if (r() > 0.72) {
          const b = [x + 3 + r() * 4, 6 + r() * 10];
          [[0, 0], [2.2, -1.4], [1.4, 1.8]].forEach(([dx, dy]) => k.dab([b[0] + dx, b[1] + dy], 1.2, k.gradient([b[0] - 1, b[1] - 1], [b[0] + 2, b[1] + 2], "#d77555", "#a8432f"), { alpha: 0.15, layers: 10 }));
        }
      }
    } },
    matsu: { ground: "#e5ebee", paint(k) {
      const r = k.rand;
      for (let x = 10; x < 160; x += 30 + r() * 10) {
        const base = [x, 30];
        const twig = sample(quad(base, [x + 6, 18], [x + 14 + r() * 6, 6 + r() * 6]), 0, 1, 16);
        k.stem(twig, 1.2, "#8a7058", 0.35);
        [twig[6], twig[11], twig[16]].forEach((p, b) => {
          const heading = b === 2 ? -70 + r() * 20 : (b ? 1 : -1) * (50 + r() * 20) - 90;
          k.dab(p, 4.2, "#9db8a2", { alpha: 0.05, layers: 8, spread: 0.4, edge: 0 });
          for (let j = 0; j < 11; j += 1) {
            const d = unit(heading - 60 + j * 12 + (r() - 0.5) * 6);
            k.pen([p, along(p, d, 6 + r() * 3)], 0.3, { alpha: 0.78, color: pick(r, ["#4f735f", "#5d8269", "#3f6352"]), start: 0.05, end: 0.7, wobble: 0.08 });
          }
        });
        if (r() > 0.4) k.dab(along(twig[twig.length - 1], [0, 1], 3), 2, k.gradient([x, 0], [x + 4, 6], "#b48760", "#7f5b3d"), { squash: 1.3, alpha: 0.14 });
      }
      for (let i = 0; i < 26; i += 1) k.dab([r() * 168, r() * 32], 0.5 + r() * 0.7, "#ffffff", { alpha: 0.28, layers: 5, spread: 0.2 });
    } },
    tartan: { ground: "#ddd5c4", paint(k) {
      for (let x = -4; x < 170; x += 22) {
        k.wash([[x, -2], [x + 8, -2], [x + 8, 34], [x, 34]], "#56735e", { layers: 8, alpha: 0.06, spread: 0.05, step: 3, edge: 0.05 });
        k.pen([[x + 13, -2], [x + 13, 34]], 1.2, { alpha: 0.45, color: "#a8463c", start: 0, end: 0, wobble: 0.1 });
      }
      for (const y of [0, 22]) k.wash([[-2, y], [170, y], [170, y + 8], [-2, y + 8]], "#56735e", { layers: 8, alpha: 0.06, spread: 0.04, step: 3, edge: 0.05 });
      k.pen([[-2, 13.3], [170, 13.3]], 1.2, { alpha: 0.45, color: "#a8463c", start: 0, end: 0, wobble: 0.1 });
      for (let x = 2; x < 170; x += 22) k.pen([[x + 16.5, -2], [x + 16.5, 34]], 0.35, { alpha: 0.4, color: "#f5f0e4", start: 0, end: 0, wobble: 0.1 });
    } },
  };

  function tape(kind, seed) {
    const W = 168;
    const H = 32;
    const spec = TAPES[kind];
    const url = picture(`tape-${kind}`, W, H, seed, (k, g) => {
      const torn = tornPoints(W, H, seed);
      g.save();
      trace(g, torn);
      g.clip();
      g.globalAlpha = 0.92;
      g.fillStyle = spec.ground;
      g.fillRect(0, 0, W, H);
      g.globalAlpha = 1;
      spec.paint(k);
      // Kozo fibres caught in the paper, running along the roll.
      const r = rng(seed + 5);
      g.lineCap = "round";
      for (let i = 0; i < 70; i += 1) {
        const x = r() * W;
        const y = r() * H;
        const length = 4 + r() * 16;
        g.strokeStyle = r() > 0.3 ? "rgba(255,255,255,0.32)" : "rgba(120,100,70,0.08)";
        g.lineWidth = 0.15 + r() * 0.3;
        g.beginPath();
        g.moveTo(x, y);
        g.quadraticCurveTo(x + length / 2, y + (r() - 0.5) * 2, x + length, y + (r() - 0.5) * 1.5);
        g.stroke();
      }
      g.restore();
      g.save();
      g.strokeStyle = "rgba(255,255,255,0.5)";
      g.lineWidth = 0.6;
      trace(g, torn);
      g.stroke();
      g.restore();
    });
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><image href="${url}" width="${W}" height="${H}"/></svg>`;
  }

  // ---- 丝带书签 · 坠饰 -----------------------------------------------------------------------------

  const RIBBON_STYLES = {
    // Coloured by the app to suit the cover: it passes { base, light, dark } in place of an id.
    theme: { name: "随封面", free: true, base: "#b46c62", light: "#d39488", dark: "#8a4b43", texture: "satin" },
    mist: { name: "雾绿缎带", free: true, base: "#7f9686", light: "#aabdaf", dark: "#5d7264", texture: "satin" },
    claret: { name: "酒红丝绒", base: "#74303a", light: "#94505a", dark: "#4e1d25", texture: "velvet" },
    navy: { name: "藏青罗纹", base: "#33425e", light: "#4c5c7a", dark: "#222d42", texture: "grosgrain" },
    oat: { name: "燕麦亚麻", base: "#cbbb9c", light: "#ddd0b6", dark: "#a8987a", texture: "linen" },
    rose: { name: "玫瑰金缎", base: "#c99b8c", light: "#efcfc1", dark: "#a2786a", texture: "satin" },
    noir: { name: "墨黑金线", base: "#2b2c2f", light: "#505157", dark: "#18191b", texture: "satin", thread: "#c9a65c" },
  };
  const RIBBON_CHARMS = {
    cut: { name: "燕尾剪口", free: true },
    leaf: { name: "黄铜叶片" },
    moon: { name: "月牙" },
    star: { name: "星星" },
    key: { name: "小钥匙" },
    pearl: { name: "珍珠" },
    tassel: { name: "流苏" },
  };

  // The ribbon leaves the gutter at the head of the page (x = 5 in its own box), settles 11px into
  // the right page's inner margin and lies down to `length`, catching the light as it turns a little
  // along the way. A charm hangs from its end; the plain end is cut into a swallowtail.
  function ribbon(styleId, charmId, length) {
    const style = typeof styleId === "object" && styleId ? { texture: "satin", ...styleId } : RIBBON_STYLES[styleId] || RIBBON_STYLES.mist;
    const charm = RIBBON_CHARMS[charmId] ? charmId : "cut";
    const L = Math.max(30, Math.round(length));
    const W = 34;
    const H = L + (charm === "cut" ? 2 : 34);
    const id = nextId();
    const r = rng(L);
    const center = (y) => {
      const u = Math.min(1, y / 44);
      return 5 + 11 * u * u * (3 - 2 * u) + Math.sin(y / 90) * 0.6;
    };
    const halfAt = (y) => 4.6 * (1 - 0.05 * Math.sin(y / 53 + 1));
    const left = [];
    const right = [];
    for (let y = 0; y < L; y += y < 48 ? 3 : 8) {
      left.push([center(y) - halfAt(y), y]);
      right.push([center(y) + halfAt(y), y]);
    }
    left.push([center(L) - halfAt(L), L]);
    right.push([center(L) + halfAt(L), L]);
    const tail = charm === "cut" ? [[center(L), L - 6.5]] : [];
    const shape = closed([...left, ...tail, ...right.reverse()]);
    const stops = {
      satin: [[0, style.dark], [0.2, style.base], [0.42, style.light], [0.6, style.base], [1, style.dark]],
      velvet: [[0, style.dark], [0.32, style.base], [0.5, style.light], [0.68, style.base], [1, style.dark]],
      grosgrain: [[0, style.dark], [0.18, style.base], [0.5, style.light], [0.82, style.base], [1, style.dark]],
      linen: [[0, style.dark], [0.2, style.base], [0.5, style.light], [0.8, style.base], [1, style.dark]],
    }[style.texture];
    let sheen = "";
    for (let y = 0.05; y < 1; y += 0.12 + r() * 0.12) sheen += `<stop offset="${Math.round(y * 100) / 100}" stop-color="${r() > 0.5 ? "#fff" : "#000"}" stop-opacity="${Math.round((0.04 + r() * 0.06) * 100) / 100}"/>`;
    const tip = center(L);
    let defs = `<linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="${n(16 - 4.6)}" y1="0" x2="${n(16 + 4.6)}" y2="0">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`
      + `<linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.12"/>${sheen}<stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>`
      + `<linearGradient id="${id}b" gradientUnits="userSpaceOnUse" x1="9" y1="${L + 4}" x2="23" y2="${L + 32}"><stop offset="0" stop-color="#f1d98f"/><stop offset="0.5" stop-color="#c49a4a"/><stop offset="1" stop-color="#8c6a2c"/></linearGradient>`
      + `<filter id="${id}s" x="-40%" y="-2%" width="180%" height="104%"><feDropShadow dx="0.8" dy="1" stdDeviation="0.9" flood-color="#2c241b" flood-opacity="0.26"/></filter>`;
    let texture = "";
    if (style.texture === "grosgrain") {
      defs += `<pattern id="${id}r" width="4" height="1.5" patternUnits="userSpaceOnUse"><rect width="4" height="0.55" fill="rgba(0,0,0,0.2)"/></pattern>`;
      texture = `<path d="${shape}" fill="url(#${id}r)"/>`;
    } else if (style.texture === "velvet" || style.texture === "linen") {
      const strength = style.texture === "velvet" ? "0.32 -0.1" : "0.42 -0.12";
      defs += `<filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${style.texture === "linen" ? "1.1 0.6" : "1.4"}" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${strength}"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
      texture = `<path d="${shape}" fill="#000" filter="url(#${id}n)"/>`;
    }
    const thread = style.thread ? `<path d="${line(left.map(([x, y]) => [x + halfAt(y), y]))}" fill="none" stroke="${style.thread}" stroke-width="0.7" opacity="0.9"/>` : "";
    const frays = charm === "cut" ? `<path d="M${n(tip - 4)} ${L}l-0.6 1.6M${n(tip - 2.4)} ${n(L - 2.6)}l-0.4 1.5M${n(tip + 4)} ${L}l0.5 1.7M${n(tip + 2.2)} ${n(L - 2.8)}l0.5 1.4" stroke="${style.base}" stroke-width="0.35" stroke-linecap="round"/>` : "";
    const metal = `url(#${id}b)`;
    const edge = "#7d5f27";
    const top = L + 5;
    const charms = {
      cut: "",
      leaf: `<path d="${closed(ring(leafSides([16, top], [0, 1], 21, 10.5, (q) => Math.pow(Math.sin(Math.PI * q), 0.8))))}" fill="${metal}" stroke="${edge}" stroke-width="0.4"/><path d="M16 ${top + 1}V${top + 18}M16 ${top + 7}l-3 3M16 ${top + 7}l3 3M16 ${top + 12}l-2.4 2.4M16 ${top + 12}l2.4 2.4" stroke="${edge}" stroke-width="0.4" fill="none"/>`,
      moon: `<path d="M16 ${top}A8.5 8.5 0 0 0 16 ${top + 17}A10 10 0 0 1 16 ${top}Z" fill="${metal}" stroke="${edge}" stroke-width="0.4"/>`,
      star: `<path d="${closed(Array.from({ length: 10 }, (_, i) => { const a = (-90 + i * 36) * (Math.PI / 180); const rad = i % 2 ? 3.6 : 8.4; return [16 + Math.cos(a) * rad, top + 8.6 + Math.sin(a) * rad]; }))}" fill="${metal}" stroke="${edge}" stroke-width="0.4"/>`,
      key: `<g fill="none" stroke="${metal}" stroke-linecap="round"><circle cx="16" cy="${top + 4.6}" r="3.8" stroke-width="1.7"/><path d="M16 ${top + 8.4}V${top + 27}" stroke-width="1.7"/><path d="M16 ${top + 22}H20V${top + 24.2}M16 ${top + 26}H19.4" stroke-width="1.4"/></g>`,
      pearl: `<radialGradient id="${id}p" cx="0.36" cy="0.32" r="0.75"><stop offset="0" stop-color="#fffdf8"/><stop offset="0.55" stop-color="#efe5d8"/><stop offset="1" stop-color="#c9bba9"/></radialGradient><circle cx="16" cy="${top + 6.5}" r="6.4" fill="url(#${id}p)" stroke="rgba(0,0,0,0.1)" stroke-width="0.4"/><ellipse cx="14" cy="${top + 4.2}" rx="1.6" ry="1" fill="#fff" opacity="0.85"/>`,
      tassel: `<rect x="13" y="${top - 1}" width="6" height="5" rx="1.4" fill="${metal}"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${n(13.6 + i * 0.48)} ${top + 4}L${n(10.5 + i * 1.1)} ${top + 27}" stroke="${style.base}" stroke-width="0.7"/>`).join("")}<path d="M12.6 ${top + 8}H19.4" stroke="${style.dark}" stroke-width="1"/>`,
    }[charm];
    const ringLoop = charm === "cut" ? "" : `<circle cx="16" cy="${L + 2.4}" r="2.3" fill="none" stroke="${metal}" stroke-width="0.9"/>`;
    const body = `<g filter="url(#${id}s)"><path d="${shape}" fill="url(#${id}g)"/>${texture}<path d="${shape}" fill="url(#${id}l)"/>${thread}${frays}<path d="${shape}" fill="none" stroke="${style.dark}" stroke-width="0.35" opacity="0.6"/>${ringLoop}${charms}</g>`;
    return svg(W, H, body, defs);
  }

  // ---- 活页环 -------------------------------------------------------------------------------------

  const RING_FINISHES = {
    silver: { name: "银色活页环", free: true, light: "#fbfcfd", mid: "#bfc4ca", dark: "#767d86" },
    gold: { name: "金色活页环", light: "#fbeec0", mid: "#d6ae5c", dark: "#8f6a27" },
    rose: { name: "玫瑰金活页环", light: "#fbe4da", mid: "#d6a38f", dark: "#94604f" },
    black: { name: "哑黑活页环", light: "#8b8e93", mid: "#45484d", dark: "#1c1d20" },
  };
  // Rings through both pages at the gutter (`two`), or along the binding edge of a single page. Each
  // ring is a metal loop from the hole in one page over to the other, with the punched holes and a
  // soft shadow on the paper; `height` is the spread's.
  function rings(height, two, finishId) {
    const finish = RING_FINISHES[finishId] || RING_FINISHES.silver;
    const W = two ? 72 : 38;
    const cx = two ? 36 : 0;
    const count = Math.max(4, Math.round((height - 80) / 74) + 1);
    const top = 46;
    const step = (height - top * 2) / (count - 1);
    const id = nextId();
    const reach = two ? 18 : 16;
    let holes = "";
    let loops = "";
    for (let i = 0; i < count; i += 1) {
      const y = n(top + step * i);
      const ends = two ? [cx - reach, cx + reach] : [reach];
      ends.forEach((x) => {
        holes += `<ellipse cx="${x}" cy="${y}" rx="3.8" ry="4.6" fill="#2b2620" opacity="0.5"/><ellipse cx="${x}" cy="${n(y + 0.6)}" rx="2.9" ry="3.7" fill="#1d1a16" opacity="0.55"/>`;
      });
      const d = two
        ? `M${cx - reach} ${y}C${cx - reach + 2} ${n(y - 14)} ${cx + reach - 2} ${n(y - 14)} ${cx + reach} ${y}`
        : `M-2 ${n(y - 7)}C6 ${n(y - 9)} ${reach - 1} ${n(y - 6)} ${reach} ${y}`;
      loops += `<path d="${d}" fill="none" stroke="rgba(30,24,18,0.28)" stroke-width="5.2" stroke-linecap="round" transform="translate(0.8 2.4)" filter="url(#${id}b)"/>`
        + `<path d="${d}" fill="none" stroke="url(#${id}m)" stroke-width="4.2" stroke-linecap="round"/>`
        + `<path d="${d}" fill="none" stroke="${finish.light}" stroke-width="0.9" stroke-linecap="round" opacity="0.85" transform="translate(0 -0.9)"/>`;
    }
    const defs = `<linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${finish.light}"/><stop offset="0.45" stop-color="${finish.mid}"/><stop offset="1" stop-color="${finish.dark}"/></linearGradient>`
      + `<filter id="${id}b" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.2"/></filter>`;
    return svg(W, Math.round(height), holes + loops, defs);
  }

  // ---- The catalogue -----------------------------------------------------------------------------

  const PACK_LIST = [
    { id: "washi", name: "和纸胶带 · 四季", blurb: "春樱、夏浪、秋叶、冬松。八卷水彩和纸胶带，半透明，贴上去还能透出纸上的格子。", price: "¥3" },
    { id: "ribbon", name: "丝带书签 · 活页环", blurb: "夹在本子中缝里的丝带书签：五种料子、六枚坠饰；还有金色、玫瑰金、哑黑三种活页环。随时可以换。", price: "¥3" },
    { id: "ticket", name: "复古票据与邮戳", blurb: "邮戳、车票、电影票、门票和收据。地点、站名、片名、日期都能改成你自己的。", price: "¥3" },
    { id: "flora", name: "花草 · 水彩", blurb: "郁金香、玫瑰、雏菊、花环、小花束……十张钢笔淡彩的花草贴纸，加一张标本签、一张压花卡。", price: "¥3" },
  ];
  const BUNDLE = { id: "all", name: "四套合集", price: "¥9" };

  const field = (key, label, value, max = 12) => ({ key, label, value, max });
  const DATE = field("date", "日期", "", 12);
  const item = (pack, label, w, h, art, fields = []) => ({ pack, label, w, h, art, fields });
  const ITEMS = {
    "washi-sakura": item("washi", "春 · 樱", 168, 32, () => tape("sakura", 101)),
    "washi-wakakusa": item("washi", "春 · 若草格", 168, 32, () => tape("wakakusa", 102)),
    "washi-seigaiha": item("washi", "夏 · 青海波", 168, 32, () => tape("seigaiha", 103)),
    "washi-ajisai": item("washi", "夏 · 紫阳花", 168, 32, () => tape("ajisai", 104)),
    "washi-momiji": item("washi", "秋 · 红叶", 168, 32, () => tape("momiji", 105)),
    "washi-akikusa": item("washi", "秋 · 秋草", 168, 32, () => tape("akikusa", 106)),
    "washi-matsu": item("washi", "冬 · 松与雪", 168, 32, () => tape("matsu", 107)),
    "washi-tartan": item("washi", "冬 · 格纹", 168, 32, () => tape("tartan", 108)),
    "ticket-postmark": item("ticket", "邮戳", 120, 66, postmark, [field("place", "地点（上圈）", "开页 · 杭州", 10), field("note", "落款（下圈）", "寄给自己", 8), DATE, field("hour", "时刻", "16", 4)]),
    "ticket-train": item("ticket", "车票", 164, 64, trainTicket, [field("from", "出发", "此地", 5), field("to", "到达", "远方", 5), DATE, field("time", "发车", "08:05", 6), field("seat", "座位", "03 车 07 号", 9)]),
    "ticket-cinema": item("ticket", "电影票", 160, 66, cinemaTicket, [field("title", "片名", "今晚的电影", 10), field("seat", "座位", "7 排 12 座", 9), field("time", "场次", "19:30", 6), DATE]),
    "ticket-museum": item("ticket", "美术馆门票", 80, 124, museumTicket, [field("name", "馆名", "安静之物美术馆", 9), DATE]),
    "ticket-concert": item("ticket", "音乐会门票", 152, 58, concertTicket, [field("title", "演出", "一个人的音乐会", 9), field("time", "开场", "晚 7:30", 7), field("seat", "座位", "E · 08", 6), DATE]),
    "ticket-receipt": item("ticket", "收据", 86, 124, receipt, [field("shop", "店名", "喫茶 · 开页", 8), field("item1", "第一行", "热咖啡", 6), field("item2", "第二行", "一页日记", 6), field("item3", "第三行", "好天气", 6), DATE, field("time", "时间", "15:20", 6)]),
    "ticket-stamp-mountain": item("ticket", "邮票 · 远山", 60, 72, mountainStamp),
    "ticket-stamp-camellia": item("ticket", "邮票 · 山茶", 60, 72, camelliaStamp),
    "ticket-airmail": item("ticket", "航空签条", 112, 32, airmail),
    "flora-bouquet": item("flora", "小花束", ...floraSize(100, 150), flora(100, 150, 201, drawBouquet)),
    "flora-vase": item("flora", "玻璃瓶插花", ...floraSize(80, 136), flora(80, 136, 211, drawVase)),
    "flora-tulips": item("flora", "郁金香", ...floraSize(84, 140), flora(84, 140, 221, drawTulips)),
    "flora-rose": item("flora", "玫瑰", ...floraSize(86, 140), flora(86, 140, 231, drawRose)),
    "flora-daisy": item("flora", "雏菊", ...floraSize(80, 140), flora(80, 140, 111, drawDaisies)),
    "flora-wreath": item("flora", "花环", ...floraSize(112, 112), flora(112, 112, 241, drawWreath)),
    "flora-pot": item("flora", "小盆栽", ...floraSize(70, 98), flora(70, 98, 251, drawPot)),
    "flora-eucalyptus": item("flora", "尤加利", ...floraSize(80, 140), flora(80, 140, 21, drawEucalyptus)),
    "flora-lavender": item("flora", "薰衣草", ...floraSize(76, 140), flora(76, 140, 41, drawLavender)),
    "flora-ginkgo": item("flora", "银杏", ...floraSize(96, 108), flora(96, 108, 91, drawGinkgo)),
    "flora-label": item("flora", "标本签", 132, 80, specimenLabel, [field("name", "名称", "蕨 Pteridium", 12), field("place", "采集地", "后山的小路", 10), DATE]),
    "flora-pressed": item("flora", "压花卡", 108, 150, pressedFern, [field("name", "名称", "蕨 · 压花", 7), DATE]),
  };

  // The words an item is drawn with: its defaults, then the writer's own.
  function valuesFor(type, values = {}) {
    const entry = ITEMS[type];
    const out = {};
    (entry?.fields || []).forEach((f) => {
      const own = values[f.key];
      out[f.key] = typeof own === "string" && own.trim() ? own.trim().slice(0, f.max * 2) : f.value;
    });
    return out;
  }

  return {
    list: PACK_LIST,
    bundle: BUNDLE,
    items: ITEMS,
    ribbonStyles: RIBBON_STYLES,
    ribbonCharms: RIBBON_CHARMS,
    ringFinishes: RING_FINISHES,
    rings,
    valuesFor,
    art(type, values = {}) {
      const entry = ITEMS[type];
      return entry ? entry.art(valuesFor(type, values)) : "";
    },
    ribbon,
    // Drawing tools, for trying new series in dev/ before they join the catalogue.
    lab: { rng, kit, paintPicture, brush, sample, quad, cubic, ellipsePoints, leafSides, ring, along, unit, turn, closed, trace, SCALE },
  };
})();
