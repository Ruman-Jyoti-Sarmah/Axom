import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const districtsSrc = path.join(__dirname, "..", "..", "src", "data", "districts.js");
const out = path.join(__dirname, "..", "..", "data", "db.json");

// Parse the static DISTRICTS array without executing Wikimedia helpers:
// extract each { no, name, division, hq, tag, about, image: W("..."), alt } block.
const raw = fs.readFileSync(districtsSrc, "utf8");
const W = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const districts = [];
const re = /\{\s*no:\s*(\d+),\s*name:\s*"([^"]+)",\s*division:\s*"([^"]+)",\s*hq:\s*"([^"]+)",\s*tag:\s*"([^"]+)",\s*about:\s*"([^"]+)",\s*image:\s*W\("([^"]+)"\)(?:,\s*\d+)?,\s*alt:\s*"([^"]+)"\s*\}/g;
let m;
while ((m = re.exec(raw))) {
  districts.push({
    no: Number(m[1]),
    name: m[2],
    division: m[3],
    hq: m[4],
    tag: m[5],
    about: m[6],
    image: W(m[7]),
    alt: m[8],
  });
}

if (!districts.length) {
  console.error("Seed failed: parsed 0 districts");
  process.exit(1);
}

fs.mkdirSync(path.dirname(out), { recursive: true });
const db = {
  districts,
  content: { note: "Extend with hero/dining/experiences overrides here" },
  bookings: [],
  newsletter: [],
};
fs.writeFileSync(out, JSON.stringify(db, null, 2));
console.log(`Seeded ${districts.length} districts -> ${out}`);
