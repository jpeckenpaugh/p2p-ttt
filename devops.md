# Development and Test Details

This document records the project-local setup for the POC in
[concept.md](concept.md). It does not select a deployment provider or add a
service.

## Browser application and packages

- Build a dependency-light static ES-module application. Browser APIs provide
  the peer connection and link handling; no connection or signaling package is
  needed.
- Vendor `sql.js` with both `sql-wasm.js` and `sql-wasm.wasm`, as in
  `../ch-poc-002/poc-browser/vendor/sql.js/`. SQLite runs in a dedicated Web
  Worker, not on the UI thread.
- Vendor a small QR-code generator for pairing links. Use the browser's native
  `CompressionStream` and `DecompressionStream` APIs to compact new signaling
  links; retain decoding support for older uncompressed links.
- Keep the UI's database calls behind a small promise-based worker client. The
  worker serializes requests, owns the sql.js database, validates game actions,
  and enables SQLite foreign keys.
- Create the small game schema locally on first use. It needs durable records
  for series, matches, and ordered moves; no seed database, browser migration
  engine, import/export feature, or shared database is required for this POC.

## Local persistence

- Store the SQLite database in the browser's Origin Private File System (OPFS)
  under a project-specific directory and filename.
- After a successful database mutation, export the in-memory database and
  replace the OPFS file. Report success only after the writable stream closes.
- If persistence fails, restore the last saved database before reporting the
  failed action. This adapts the recovery boundary in
  `../ch-poc-002/poc-browser/js/db/worker.js` and `persistence.js`.
- Initialize with `PRAGMA foreign_keys=ON` and preserve it after database
  export. Treat normal browser storage availability and quota as local-browser
  conditions, not as a remote backup promise.

## Static local development

- Serve the project as static files on `127.0.0.1` with a small Python
  standard-library server. Set the `.wasm` MIME type to `application/wasm` and
  disable caching during development, following
  `../ch-poc-002/poc-browser/serve.py`.
- Use one stable localhost origin and port for a local workspace. OPFS is
  available in a secure context, including localhost; opening HTML files
  directly is not a supported development path.
- The local server only serves files. It has no API routes, per-game state, or
  signaling behavior.

## Deploy cache busting

- Before committing a GitHub Pages deployment, run `python3 release.py` and
  commit the resulting `release.json` update with the release. The page fetches
  that manifest without using its HTTP cache, then loads application modules at
  a build-specific URL. This prevents a device from reusing a prior app module
  after a refresh, despite GitHub Pages' normal static-asset cache lifetime.
- The UI displays the loaded build identifier, so two people testing pairing
  can confirm that both devices run the same release.

## Test setup

- Require a current Chromium browser for the POC test environment, plus Node
  22+ for automated checks and Python 3 for the static server.
- Reuse the reference POC's dependency-free Node/CDP approach where practical:
  launch Chrome with an isolated temporary profile, start an owned static
  server, and verify the server/browser ports are free before starting.
- Automated checks should cover game-rule validation, worker request
  serialization, and OPFS persistence through page reload and a browser
  restart using the same temporary profile. They should also exercise the
  visible invitation, reply, connection-status, completed-history, and replay
  paths.
- The final manual acceptance check uses two independent browser profiles (or
  two browsers): exchange the invitation and reply links, connect, play a
  completed match, reload each browser, and replay the locally recorded match.
  A rematch stays in the connected series and does not repeat pairing.

## Reusable reference

The implementation should adapt—not copy—the browser-local workspace patterns
from `../ch-poc-002/poc-browser/`:

| Reference | Pattern to reuse |
| --- | --- |
| `js/db/client.js` | Promise-based UI-to-worker request boundary and storage diagnostics. |
| `js/db/worker.js` | Serialized operations, transactions, write-after-persist acknowledgment, and recovery after a failed save. |
| `js/db/persistence.js` | OPFS file replacement that commits at writable-stream close. |
| `serve.py` | Local-only static serving with WebAssembly MIME support. |
| `tests/persistence.test.mjs` and `tests/run.mjs` | Isolated static-server/Chrome lifecycle and persistence checks. |

Company Hub's domain schema, seed/import/export workflow, authentication,
artifacts, and product UI are not reused.
