/**
 * Finds files that nothing in the project references.
 *
 * Builds the real import graph (resolving every import specifier against
 * the filesystem), then walks it from the entry points to find files that
 * are unreachable. Also reports components that are imported via lazy()
 * but never rendered in JSX.
 *
 * Run:  node scripts/find-unused.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_DIRS = ["src", "server", "tests", "scripts"];
const TEXT_EXT = new Set([".js", ".jsx", ".mjs", ".cjs", ".json", ".css", ".html", ".xml", ".webmanifest", ".md", ".py", ".ps1"]);
const ASSET_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4", ".webm", ".ico"]);
const CODE_EXT = new Set([".js", ".jsx", ".mjs", ".cjs"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/* ── 1. Collect every text file ────────────────────────────────────────── */
const corpus = [];
for (const dir of SCAN_DIRS) {
  for (const f of walk(path.join(root, dir))) {
    if (TEXT_EXT.has(path.extname(f).toLowerCase())) corpus.push(f);
  }
}
for (const f of walk(path.join(root, "public"))) {
  if (TEXT_EXT.has(path.extname(f).toLowerCase())) corpus.push(f);
}
for (const f of ["index.html", "README.md", "vite.config.js", "package.json"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) corpus.push(p);
}

const haystack = corpus.map((f) => fs.readFileSync(f, "utf8")).join("\n").toLowerCase();

/* ── 2. Build the import graph ─────────────────────────────────────────── */
const SPEC_RE = /(?:import\s+(?:[\s\S]*?)\s*from\s*|import\s*|export\s+(?:\*|\{[\s\S]*?\})\s*from\s*|require\s*\(\s*|import\s*\(\s*)["']([^"']+)["']/g;

const importGraph = new Map();

function resolveSpec(fromFile, spec) {
  if (!spec.startsWith(".") && !spec.startsWith("/")) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  const cands = [
    base,
    base + ".js", base + ".jsx", base + ".mjs", base + ".cjs",
    path.join(base, "index.js"), path.join(base, "index.jsx"),
    base + ".json", base + ".css", base + ".png", base + ".jpg", base + ".webp", base + ".svg",
  ];
  for (const c of cands) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return path.resolve(c);
  }
  return null;
}

for (const f of corpus) {
  const text = fs.readFileSync(f, "utf8");
  const deps = new Set();
  let m;
  SPEC_RE.lastIndex = 0;
  while ((m = SPEC_RE.exec(text))) {
    const r = resolveSpec(f, m[1]);
    if (r) deps.add(r);
  }
  importGraph.set(path.resolve(f), deps);
}

/* ── 3. Reachability from the entry points ─────────────────────────────── */
const ENTRY_POINTS = [
  path.join(root, "src/main.jsx"),
  path.join(root, "server/src/index.js"),
  path.join(root, "server/scripts/seed.mjs"),
].filter((e) => fs.existsSync(e));

const reachable = new Set();
const queue = ENTRY_POINTS.map((e) => path.resolve(e));
for (const e of queue) reachable.add(e);
while (queue.length) {
  const cur = queue.shift();
  for (const d of importGraph.get(cur) || []) {
    if (!reachable.has(d)) { reachable.add(d); queue.push(d); }
  }
}
/* test files are roots too — they import things nothing else does */
for (const t of walk(path.join(root, "tests"))) {
  const r = path.resolve(t);
  if (!reachable.has(r)) { reachable.add(r); queue.push(r); }
}
while (queue.length) {
  const cur = queue.shift();
  for (const d of importGraph.get(cur) || []) {
    if (!reachable.has(d)) { reachable.add(d); queue.push(d); }
  }
}

/* ── 4. Asset name index (assets are referenced by URL, not by import) ──── */
const basenameHits = new Set();
const allFiles = [];
for (const dir of ["src", "public", "scripts", "server", "tests"]) {
  for (const f of walk(path.join(root, dir))) allFiles.push(f);
}
for (const f of allFiles) {
  const base = path.basename(f).toLowerCase();
  const stem = base.replace(/\.[^.]+$/, "");
  if (stem.length >= 6 && haystack.includes(stem)) basenameHits.add(base);
  if (base.length >= 6 && haystack.includes(base)) basenameHits.add(base);
}

/* ── 5. Report unreachable files ───────────────────────────────────────── */
function isReferenced(abs) {
  /* Code files are only ever referenced by an import specifier, so the import
   * graph is authoritative — no fuzzy matching (which produces false
   * negatives when a dead file's name happens to appear in a comment). */
  if (CODE_EXT.has(path.extname(abs).toLowerCase())) {
    return reachable.has(path.resolve(abs));
  }
  if (reachable.has(path.resolve(abs))) return true;
  const base = path.basename(abs).toLowerCase();
  const stem = base.replace(/\.[^.]+$/, "");
  if (basenameHits.has(base)) return true;
  if (stem.length >= 8 && haystack.includes(stem)) return true;
  return false;
}

const report = [];
for (const dir of ["src", "public", "scripts", "server", "tests"]) {
  for (const f of walk(path.join(root, dir))) {
    const ext = path.extname(f).toLowerCase();
    if (!TEXT_EXT.has(ext) && !ASSET_EXT.has(ext)) continue;
    if (!isReferenced(f)) report.push(path.relative(root, f));
  }
}

console.log(`Scanned ${corpus.length} text files, ${reachable.size} reachable.\n`);
console.log(`Potentially unreferenced (${report.length}):\n`);
for (const r of report.sort()) console.log("  " + r);

/* ── 6. Reverse index: who imports what ────────────────────────────────── */
const importers = new Map();
for (const [file, deps] of importGraph) {
  for (const d of deps) {
    if (!importers.has(d)) importers.set(d, []);
    importers.get(d).push(path.relative(root, file));
  }
}
console.log(`\n\n─── Importers of each DEAD file ───\n`);
for (const r of report.sort()) {
  const imp = importers.get(path.resolve(root, r)) || [];
  console.log(`${r}`);
  console.log(`   imported by: ${imp.length ? imp.join(", ") : "(nobody)"}`);
}

/* ── 7. Imported but NEVER RENDERED ───────────────────────────────────── */
/* A component imported by a lazy() call but never placed in JSX is dead
 * weight: it is code-split into a chunk nobody ever loads. */
console.log(`\n\n─── Imported but never rendered ───\n`);

const JSX_USE = /<([A-Z][A-Za-z0-9_]*)\b/g;
const LAZY_IMPORT = /const\s+([A-Za-z_$][\w$]*)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\s*\(\s*["']([^"']+)["']/g;

for (const [file] of importGraph) {
  const text = fs.readFileSync(file, "utf8");
  const used = new Set();
  let j;
  JSX_USE.lastIndex = 0;
  while ((j = JSX_USE.exec(text))) used.add(j[1]);

  let lz;
  LAZY_IMPORT.lastIndex = 0;
  while ((lz = LAZY_IMPORT.exec(text))) {
    const local = lz[1];
    const target = resolveSpec(file, lz[2]);
    if (!target) continue;
    if (!used.has(local)) {
      console.log(
        `${path.relative(root, target)}  —  lazy '${local}' in ` +
          `${path.relative(root, file)} but never rendered`,
      );
    }
  }
}

