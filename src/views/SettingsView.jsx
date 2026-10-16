export default function SettingsView({ onExport, onImport }) {
  return (
    <section className="paper-page settings-view">
      <h2 className="title-mincho">备份与同步</h2>
      <p>数据默认保存在本机 IndexedDB。同步是可选能力，未来可接 WebDAV 或自托管服务。</p>
      <button onClick={onExport}>导出 JSON 备份</button>
      <label>
        导入 JSON
        <input type="file" accept="application/json" onChange={(event) => onImport(event.target.files?.[0])} />
      </label>
    </section>
  );
}
