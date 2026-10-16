# Navigation and Saving

## Interface Responsibilities

- Sidebar: current notebook, all records, collapsible date browser, settings.
- Header: selected date and daily / weekly / monthly record scope.
- Editing toolbar: active input side, formatting, materials and page layout.
- Footer: date and page-group position, continuation, bookmark and saving.

The footer is reserved layout space, not a floating overlay on the paper. Below
720px it uses separate navigation and saving rows. The storage detail disclosure
opens upward and closes on Escape or an outside pointer action.

## Save Contract

- An edit immediately enters the pending state. Autosave is debounced by 180ms.
- Only a successful localStorage write changes the indicator to saved.
- The successful timestamp is serialized with the data, never advanced on failure.
- Ctrl/Cmd+S captures the current form and writes immediately. The Save button
  is hidden while saving works (autosave makes it redundant, as in Notes and
  Pages) and appears as Retry after a failed write.
- Failure leaves an enduring status and Retry action. The memory copy remains
  available for retry or the existing full JSON export.
- Closing a page with pending changes attempts a final write. On failure, the
  browser's standard unsaved-changes confirmation is requested.
- Unchanged blur and backgrounding with no pending edits do not trigger a write.

Storage is local to the current browser/origin. It is not cloud synchronization
and cannot survive clearing that browser's site data without a separate backup.

## Media Storage

- Photo data URLs, legacy ink images and handwriting stroke arrays larger than
  2 KB are written to the `openpages-media` IndexedDB store, keyed by a content
  hash. localStorage keeps the journal with `opmedia:v1:<id>` references.
- Media is written first; the localStorage save follows only after it is stored,
  so a reference never points at missing media. Until then the indicator stays
  on saving and closing the page asks for confirmation.
- On launch, references are loaded back into memory before the first render.
  Rendering, snapshots and JSON export always see full values, so backups stay
  compatible with older versions.
- Inline media from older versions moves to IndexedDB on the first launch.
- Media no longer referenced by the last successful save is deleted 8 seconds
  after that save. Cleanup is skipped for the session if media could not be read.
- Without IndexedDB, the previous inline format is used unchanged.
- A stored journal that cannot be parsed is copied to
  `openpages.state.v1.unreadable-<time>` instead of being deleted.

## Deleting and Undo

Deleting a page asks no confirmation. The page moves to 最近删除 and the toast
offers 撤销 for 8 seconds (paused while hovered or focused), which puts it back
at its original position.

## Recently Deleted

Deleting a page moves it to `state.trash` for 30 days. Restoring returns it to
its original date: it replaces a blank page there, otherwise it is added as a
new page group. Trash is included in JSON backups.

## Several Windows

Tabs and the installed PWA of the same origin share one journal. Every save
carries `lastSavedAt`; each window remembers the revision it last read or wrote.

- When another window saves, the `storage` event delivers the new journal. Its
  media is loaded from IndexedDB first, then this window adopts it while keeping
  its own selected date. If the page shown here changed, it is reloaded with a
  notice.
- A window with unsaved edits keeps the pages it edited since its last write
  (and its trash items) and writes them on top of the adopted journal.
- Before every write the stored revision is compared again, so a window that
  missed the event (frozen in the background) merges instead of overwriting.
  Returning to a window (`visibilitychange`, `pageshow`) also checks.
- Media cleanup never deletes an item referenced by the journal currently in
  localStorage, even if this window has not seen that save.

Two windows editing the same page within the same moment still resolve to the
last write for that page.

## Page History

Each page group keeps `versions`:

- `auto`: the content before the first edit of a written page, at most once
  every 30 minutes per page. The 6 most recent are kept, each for 30 days.
- `manual`: saved from the save details or the Plus panel; the last 12 are kept.
- `restore`: the content just before a restore, so a restore can be undone.

Versions hold text, layout, tasks, metrics and handwriting strokes; photos and
stickers are left as they are. The list is in the save details under 本页历史.

## Cover

`coverDisplay` decides when the cover is shown: `daily` (first launch each day,
the default), `always` or `never`. The last opening day is stored per device in
`openpages.cover.openedOn`, outside the journal and its backups.

## Verification

`node --test tests/*.test.mjs` covers save transitions, failed writes, retry,
timestamps, shortcut dispatch, unload handling, unchanged blur, journal indexing,
several-window merges, page history, cover display,
linked plans, responsive handwriting ratios and offline resource lookup.

Browser checks use a separate local test origin, not the user's journal data.
