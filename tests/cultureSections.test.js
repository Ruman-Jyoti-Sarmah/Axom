/**
 * cultureSections.test.js — regression tests for the Culture data catalog.
 *
 * Framework-free, like the existing suites: plain `node --test`.
 *
 * These tests PIN CURRENT BEHAVIOUR of the JSON-backed `cultureSections.js`
 * wrapper (Batch 6E-3C). Every expected value is derived from the live source
 * (captured at preflight), not guessed.
 *
 * NOTE (import resolution): the two extensionless relative imports that once
 * prevented direct `node --test` loading were resolved in Phase 6E-3B
 * (`./cultureImages` -> `./cultureImages.js`,
 * `./spiritualDestinations` -> `./spiritualDestinations.js`), and the JSON
 * migration was completed in Phase 6E-3C (`cultureSections.json` created,
 * `cultureSections.js` reduced to a compatibility wrapper). All assertions below
 * pass against the JSON-backed wrapper with no loader changes.
 *
 * Run with: npm test
 */
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  PILLARS,
  EXPERIENCES,
  SPIRITUAL,
  CUISINE,
  ADVENTURE,
  WELLNESS,
  REGIONS,
  CULTURE_HERO,
  HERO_SLIDES,
} from "../src/data/culture/cultureSections.js";
import { SPIRITUAL_DESTINATIONS } from "../src/data/culture/spiritualDestinations.js";

/* ═══ 1. Export compatibility ════════════════════════════════════════════════ */

describe("cultureSections: export compatibility", () => {
  test("exposes exactly the nine named exports and no default export", () => {
    assert.equal(
      Object.keys(csModule()).sort().join("|"),
      "ADVENTURE|CUISINE|CULTURE_HERO|EXPERIENCES|HERO_SLIDES|PILLARS|REGIONS|SPIRITUAL|WELLNESS"
    );
    assert.equal(csModule().default, undefined);
  });

  test("SPIRITUAL is reference-identical to spiritualDestinations.SPIRITUAL_DESTINATIONS (17 entries)", () => {
    const cs = csModule();
    assert.equal(cs.SPIRITUAL === SPIRITUAL_DESTINATIONS, true);
    assert.equal(cs.SPIRITUAL.length, 17);
  });
});
/* ═══ 2. Static data and ordering ══════════════════════════════════════════════ */

describe("cultureSections: static data and ordering", () => {
  const cs = csModule();

  test("EXPERIENCES: length 8, ids and order unchanged", () => {
    assert.equal(cs.EXPERIENCES.length, 8);
    assert.deepEqual(cs.EXPERIENCES.map((e) => e.id), [
      "heritage", "spiritual", "art", "cuisine", "wildlife", "crafts", "festivals", "adventure",
    ]);
  });

  test("EXPERIENCES: identical keysets and positional fallback targets", () => {
    for (const e of cs.EXPERIENCES) {
      assert.deepEqual(Object.keys(e), ["id", "icon", "name", "kind", "blurb", "image", "href"]);
    }
    assert.equal(cs.EXPERIENCES[0].id, "heritage");
    assert.equal(cs.EXPERIENCES[1].id, "spiritual");
  });

  test("CUISINE: shape, dishes length 6, and image: null preserved", () => {
    assert.deepEqual(Object.keys(cs.CUISINE), ["intro", "dishes"]);
    assert.equal(cs.CUISINE.dishes.length, 6);
    assert.deepEqual(cs.CUISINE.dishes.map((d) => d.image), [
      "/images/culture/assamese-thali.jpg",
      null,
      null,
      "/images/culture/assamese-thali.jpg",
      "/images/culture/assamese-pitha.jpg",
      null,
    ]);
    for (const d of cs.CUISINE.dishes) {
      assert.deepEqual(Object.keys(d), ["name", "kind", "about", "image"]);
    }
  });

  test("ADVENTURE: length 4, no id field, Commons image URLs byte-for-byte", () => {
    assert.equal(cs.ADVENTURE.length, 4);
    for (const a of cs.ADVENTURE) {
      assert.deepEqual(Object.keys(a), ["name", "place", "about", "image"]);
    }
    assert.deepEqual(cs.ADVENTURE.map((a) => a.image), [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Brahmaputra%20river%20rafting.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Langkovku%20waterfall%20in%20Manjha%2C%20Karbi%20Anglong.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Plucking%20tea%20in%20a%20tea%20garden%20of%20Assam.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kaziranga%20National%20Park%2C%20Assam%2C%20India.jpg?width=900",
    ]);
  });

  test("WELLNESS: length 3, no id field, Commons image URLs byte-for-byte", () => {
    assert.equal(cs.WELLNESS.length, 3);
    for (const w of cs.WELLNESS) {
      assert.deepEqual(Object.keys(w), ["name", "place", "about", "image"]);
    }
    assert.deepEqual(cs.WELLNESS.map((w) => w.image), [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Doriya%20River%20of%20Majuli.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Majuli%2C%20the%20river%20island%20of%20Assam.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Plucking%20tea%20in%20a%20tea%20garden%20of%20Assam.jpg?width=900",
    ]);
  });

  test("REGIONS: length 5, order and keysets preserved (unused but kept)", () => {
    assert.equal(cs.REGIONS.length, 5);
    assert.deepEqual(cs.REGIONS.map((r) => r.id), [
      "Lower Assam", "North Assam", "Upper Assam", "Central Assam", "Barak Valley",
    ]);
    for (const r of cs.REGIONS) {
      assert.deepEqual(Object.keys(r), ["id", "en", "as"]);
    }
  });

  test("CULTURE_HERO: structure, stats (4), headline (2)", () => {
    assert.deepEqual(Object.keys(cs.CULTURE_HERO), ["kicker", "headline", "sub", "stats"]);
    assert.equal(cs.CULTURE_HERO.stats.length, 4);
    for (const s of cs.CULTURE_HERO.stats) {
      assert.deepEqual(Object.keys(s), ["value", "label"]);
    }
    assert.equal(cs.CULTURE_HERO.headline.length, 2);
    for (const h of cs.CULTURE_HERO.headline) {
      assert.deepEqual(Object.keys(h), ["en", "as"]);
    }
  });

  test("HERO_SLIDES: length 3, ids/order, em:true heterogeneity intact", () => {
    assert.equal(cs.HERO_SLIDES.length, 3);
    assert.deepEqual(cs.HERO_SLIDES.map((s) => s.id), ["wildlife", "nature", "heritage"]);
    assert.deepEqual(
      cs.HERO_SLIDES.map((s) => s.headline.map((h) => Object.keys(h).sort().join(""))),
      [["asen", "asen"], ["asen", "asemen"], ["asen", "asemen"]]
    );
    for (const s of cs.HERO_SLIDES) {
      assert.deepEqual(Object.keys(s.credit), ["author", "source", "license", "licenseUrl"]);
    }
  });

  test("PILLARS: four keys including unused culture key", () => {
    assert.deepEqual(Object.keys(cs.PILLARS), ["destinations", "experiences", "culture", "travel"]);
    assert.equal(cs.PILLARS.culture.id, "culture");
  });
});

/* ═══ 3. Unicode ══════════════════════════════════════════════════════════════ */

describe("cultureSections: Unicode", () => {
  const cs = csModule();

  test("Assamese and emoji survive unchanged", () => {
    assert.equal(cs.PILLARS.culture.label.as, "সংস্কৃতি");
    assert.equal(cs.EXPERIENCES[0].icon, "🏛️");
    assert.equal(cs.EXPERIENCES[1].icon, "🕉️");
  });
});

/* ═══ helper ══════════════════════════════════════════════════════════════════ */

function csModule() {
  return {
    PILLARS, EXPERIENCES, SPIRITUAL, CUISINE, ADVENTURE, WELLNESS, REGIONS,
    CULTURE_HERO, HERO_SLIDES,
  };
}

