/**
 * Verifies that the split `src/data/*` modules export exactly the same names
 * and byte-identical values as the original aggregated `src/data/content.js`
 * (read straight from git so the check is repeatable).
 *
 * Run:  node scripts/verify-content-split.mjs
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* The pristine, pre-split module. Pinned to the base commit so the check
 * stays valid once the split itself is committed (after which HEAD's
 * content.js is the barrel, not the original aggregation). */
const BASE_REF = "70a8f62ace025d821e5d7e3940ee156552bfd4a3";

/* Materialise the original module in a temp dir so we can import it. */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "axom-content-"));
const original = execFileSync("git", ["show", `${BASE_REF}:src/data/content.js`], {
  cwd: root,
  encoding: "utf8",
});
fs.writeFileSync(path.join(tmp, "content.js"), original, "utf8");

const before = await import(pathToFileURL(path.join(tmp, "content.js")).href);
const after = await import(pathToFileURL(path.join(root, "src", "data", "content.js")).href);

const beforeNames = Object.keys(before).sort();
const afterNames = Object.keys(after).sort();

const missing = beforeNames.filter((n) => !afterNames.includes(n));
const added = afterNames.filter((n) => !beforeNames.includes(n));

let failed = false;

if (missing.length) {
  failed = true;
  console.error("MISSING exports:", missing.join(", "));
}
if (added.length) {
  failed = true;
  console.error("UNEXPECTED exports:", added.join(", "));
}

const stable = (v) => JSON.stringify(v);
for (const name of beforeNames) {
  const a = stable(before[name]);
  const b = stable(after[name]);
  if (a !== b) {
    failed = true;
    console.error(`CHANGED value for "${name}"`);
    console.error("  before:", a?.slice(0, 200));
    console.error("  after :", b?.slice(0, 200));
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

if (failed) {
  console.error("\nFAIL — split does not match the original content module.");
  process.exit(1);
}

console.log(`OK — ${beforeNames.length} exports match the original exactly:`);
console.log("  " + beforeNames.join(", "));
