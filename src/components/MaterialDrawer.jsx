import { stamps, groupStamps } from "../data/stamps.js";
import { tapes } from "../data/tapes.js";
import { stickers } from "../data/stickers.js";
import StampIcon from "./StampIcon.jsx";

export default function MaterialDrawer({ onAddMaterial, onStamp }) {
  const grouped = groupStamps();
  return (
    <aside className="material-drawer">
      <h2>素材抽屉</h2>
      <section>
        <h3>印章</h3>
        <div className="material-grid">
          {Object.entries(grouped).map(([group, items]) =>
            items.map((stamp) => (
              <button key={stamp.id} onClick={() => onStamp(stamp.id)} title={`${group}: ${stamp.label}`}>
                <StampIcon stamp={stamp} />
              </button>
            ))
          )}
        </div>
      </section>
      <section>
        <h3>和纸胶带</h3>
        <div className="material-grid">
          {tapes.map((tape) => (
            <button key={tape.id} style={{ background: tape.css }} onClick={() => onAddMaterial(tape.id, "tape")}>
              {tape.label}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3>贴纸</h3>
        <div className="material-grid">
          {stickers.map((sticker) => (
            <button key={sticker.id} style={{ background: sticker.color }} onClick={() => onAddMaterial(sticker.id, "sticker")}>
              {sticker.text}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
