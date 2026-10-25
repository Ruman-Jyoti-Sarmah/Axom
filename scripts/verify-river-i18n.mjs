import { readFileSync } from "node:fs";
import { STRINGS } from "../src/data/i18n.js";

const files = [
  ["RiversPage", "../src/pages/Travel/RiversPage.jsx"],
  ["RiverDetail", "../src/pages/Travel/RiverDetail.jsx"],
  ["RiversHome", "../src/components/culture/Home/RiversHome.jsx"],
  ["RiversAtlas", "../src/components/travel/RiversPage/RiversAtlas.jsx"],
];
const missing = [];
for (const [name, file] of files) {
  const s = readFileSync(new URL(file, import.meta.url), "utf8");
  for (const m of s.matchAll(/\bt\("([^"]+)"/g)) {
    const k = m[1];
    if (!(k in STRINGS.en)) missing.push(`${name}: ${k} (en)`);
    if (!(k in STRINGS.as)) missing.push(`${name}: ${k} (as)`);
  }
}
console.log("missing keys:", missing.length ? missing : "NONE");
console.log("river keys in STRINGS.en:", Object.keys(STRINGS.en).filter((k) => k.startsWith("rivers_") || k.startsWith("title_rivers")).length);
