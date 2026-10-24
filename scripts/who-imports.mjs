/**
 * Prints every import specifier that mentions a given module basename.
 *
 * Usage:  node scripts/who-imports.mjs stays cultureHome
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const names = process.argv.slice(2);

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
for (const d of ["src", "tests", "server", "scripts"]) {
  for (const f of walk(path.join(root, d))) {
    if (/\.(js|jsx|mjs|cjs)$/.test(f)) files.push(f);
  }
}

for (const name of names) {
  const re = new RegExp(`["']([^"']*${name}[^"']*)["']`, "g");
  const hits = [];
  for (const f of files) {
    const s = fs.readFileSync(f, "utf8");
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(s))) {
      hits.push(`  ${path.relative(root, f)}  ->  ${m[1]}`);
    }
  }
  console.log(`\n=== ${name} ===`);
  console.log(hits.length ? hits.join("\n") : "  (no references anywhere)");
}
