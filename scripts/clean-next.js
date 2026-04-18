/**
 * Removes `.next` so dev never loads a half-written or mixed Webpack/Turbopack build
 * (fixes MODULE_NOT_FOUND for `./chunks/vendor-chunks/next.js` / webpack-runtime on Windows).
 *
 * Set SKIP_CLEAN_NEXT=1 to skip (faster restarts; risk of stale chunks if the dev server crashed).
 */
const fs = require('fs');
const path = require('path');

if (process.env.SKIP_CLEAN_NEXT === '1') {
  process.exit(0);
}

const dir = path.join(process.cwd(), '.next');
try {
  fs.rmSync(dir, { recursive: true, force: true });
} catch {
  /* ignore */
}
