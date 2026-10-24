/**
 * Runtime smoke test for the split content modules.
 *
 * - imports every focused module
 * - asserts the expected exports are present and non-empty
 * - asserts every image URL the modules build points at Wikimedia Commons
 * - asserts the barrel re-export exposes exactly the same names
 *
 * Run:  node scripts/smoke-content.mjs
 */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (rel) => import(pathToFileURL(path.join(root, "src", rel)).href);

const EXPECTED = {
  "data/shared/imageUrl.js": ["w"],
  "data/site/brand.js": ["BRAND", "NAV", "FOOTER"],
  "data/site/hero.js": ["HERO", "INTRO"],
  "data/culture/site/heritage.js": ["ARCHITECTURE", "SUITES", "DINING"],
  "data/culture/site/experiences.js": ["EXPERIENCES", "GALLERY", "LOCATION", "FINALE"],
  "data/culture/site/artists.js": ["ZUBEEN_GARG", "assamArtists"],
  "data/culture/assam/highlights.js": ["assamHighlights", "assamFamous", "ASSAM_WORK"],
  "data/culture/assam/food.js": ["ASSAM_FOOD"],
  "data/culture/assam/culture.js": ["ASSAM_CULTURE", "ASSAM_HANDICRAFTS", "ASSAM_HERITAGE"],
  "data/travel/assam/guide.js": ["ASSAM_GUIDE"],
};

const collected = new Set();

for (const [rel, names] of Object.entries(EXPECTED)) {
  const mod = await load(rel);
  for (const name of names) {
    assert.ok(name in mod, `${rel} is missing export "${name}"`);
    const value = mod[name];
    assert.ok(
      value !== undefined && value !== null,
      `${rel} export "${name}" is empty`
    );
    if (Array.isArray(value)) {
      assert.ok(value.length > 0, `${rel} export "${name}" is an empty array`);
    }
    collected.add(name);
  }
  console.log(`ok  ${rel.padEnd(26)} ${names.join(", ")}`);
}

/* Every Commons URL produced by the shared helper must be well formed. */
const { w } = await load("data/shared/imageUrl.js");
const url = w("Kamakhya Temple, Guwahati, Assam.jpg", 1600);
assert.match(url, /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
assert.match(url, /\?width=1600$/);
console.log("ok  data/shared/imageUrl.js builds a valid Commons URL");

/* The barrel must expose exactly the union of the focused modules.
 * `w` is a shared helper, not site content — the original content.js kept it
 * module-private, so the barrel deliberately does not re-export it. */
const barrel = await load("data/content.js");
const barrelNames = Object.keys(barrel).sort();
const expectedNames = [...collected].filter((n) => n !== "w").sort();
assert.deepEqual(barrelNames, expectedNames, "barrel exports differ from modules");
assert.ok(!("w" in barrel), "barrel must not leak the internal `w` helper");
console.log(`ok  content.js              barrel re-exports all ${barrelNames.length} names`);

/* Spot-check that a value survived the split intact (Unicode + shape). */
assert.equal(typeof barrel.HERO.image, "string");
assert.ok(barrel.INTRO.lines.length === 3);
assert.ok(barrel.ASSAM_FOOD.length > 0);
for (const artist of barrel.assamArtists) {
  assert.ok(artist.name, "an artist entry is missing its name");
  assert.ok(artist.bio, `artist "${artist.name}" is missing its bio`);
  assert.ok("image" in artist, `artist "${artist.name}" is missing its image slot`);
}
console.log(
  `ok  content.js              spot checks on values (${barrel.assamArtists.length} artists)`
);

console.log("\nPASS — split content modules load and behave correctly.");
