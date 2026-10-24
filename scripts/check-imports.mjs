/**
 * Resolves every relative import inside src/ and reports the ones that do
 * not point at an existing file. Catches wrong directory depth (e.g. a file
 * moved from src/components/ to src/pages/Culture/ while keeping its old
 * `../data/...` specifier) and wrong filename casing.
 *
 * Run:  node scripts/check-imports.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");

const EXTS = [".js", ".jsx", ".ts", ".tsx", ".json"];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function resolve(spec, fromFile) {
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [
    base,
    ...EXTS.map((e) => base + e),
    ...EXTS.map((e) => path.join(base, "index" + e)),
  ];
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

const problems = [];
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, "utf8");
  const re = /(?:from|import)\s*["'](\.[^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) {
    if (!resolve(m[1], file)) {
      problems.push({
        file: path.relative(root, file),
        spec: m[1],
      });
    }
  }
}

if (problems.length) {
  console.error(`FAIL — ${problems.length} unresolvable relative import(s):\n`);
  for (const p of problems) console.error(`  ${p.file}  ->  ${p.spec}`);
  process.exit(1);
}
console.log("OK — every relative import in src/ resolves.");
