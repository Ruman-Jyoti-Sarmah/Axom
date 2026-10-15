import { readFileSync } from "node:fs";
import { STRINGS } from "../src/data/i18n.js";

const files = ["RiversPage", "RiverDetail", "RiversHome", "RiversAtlas"];
const missing = [];
for (const f of files) {
  const s = readFileSync(new URL(`../src/components/${f}.jsx`, import.meta.url), "utf8");
  for (const m of s.matchAll(/t\("([^"]+)"/g)) {
    const k = m[1];
    if (!(k in STRINGS.en)) missing.push(`${f}: ${k} (en)`);
    if (!(k in STRINGS.as)) missing.push(`${f}: ${k} (as)`);
  }
}
console.log("missing keys:", missing.length ? missing : "NONE");
console.log("river keys in STRINGS.en:", Object.keys(STRINGS.en).filter((k) => k.startsWith("rivers_") || k.startsWith("title_rivers")).length);