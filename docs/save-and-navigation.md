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
This change does not migrate storage or alter native platform integrations.

## Verification

`node --test tests/*.test.mjs` covers save transitions, failed writes, retry,
timestamps, shortcut dispatch, unload handling, unchanged blur, journal indexing,
linked plans, responsive handwriting ratios and offline resource lookup.

Browser checks use a separate local test origin, not the user's journal data.
