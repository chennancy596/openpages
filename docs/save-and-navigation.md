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
- Explicit Save and Ctrl/Cmd+S capture the current form and write immediately.
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

## Recently Deleted

Deleting a page moves it to `state.trash` for 30 days. Restoring returns it to
its original date: it replaces a blank page there, otherwise it is added as a
new page group. Trash is included in JSON backups.

## Verification

`node --test tests/*.test.mjs` covers save transitions, failed writes, retry,
timestamps, shortcut dispatch, unload handling, unchanged blur, journal indexing,
linked plans, responsive handwriting ratios and offline resource lookup.

Browser checks use a separate local test origin, not the user's journal data.
