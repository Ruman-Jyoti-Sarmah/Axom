/**
 * Finds every static asset URL referenced in the source that does not exist
 * in public/ (the Vite static root). These are 404s at runtime.
 *
 * Usage:  node scripts/check-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(root, "public");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = [];
for (const d of ["src", "tests", "server"]) {
  for (const f of walk(path.join(root, d))) {
    if (/\.(js|jsx|mjs|css|html)$/.test(f)) files.push(f);
  }
}
for (const f of ["index.html"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) files.push(p);
}

/* root-relative asset URLs: "/img/x.jpg", "/video/y.mp4", "/homehero.png" */
const URL_RE = /["'(](\/(?:img|images|video)\/[^"')]+|\/[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|svg|gif|mp4|webm|ico|json|webmanifest|xml))["')]/g;

const seen = new Map();
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  let m;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(text))) {
    const url = m[1];
    if (!seen.has(url)) seen.set(url, new Set());
    seen.get(url).add(path.relative(root, f));
  }
}

const missing = [];
for (const [url, refs] of seen) {
  const target = path.join(PUBLIC, url.replace(/^\//, ""));
  if (!fs.existsSync(target)) missing.push({ url, refs: [...refs] });
}

console.log(`Checked ${seen.size} distinct asset URLs.\n`);
if (!missing.length) {
  console.log("All referenced assets exist in public/. ✔");
} else {
  console.log(`MISSING (${missing.length}):\n`);
  for (const m of missing) {
    console.log(`  ${m.url}`);
    for (const r of m.refs) console.log(`      ${r}`);
  }
}
