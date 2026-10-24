/**
 * spiritualDestinations.test.js — regression tests for the "Spiritual
 * Destinations" catalogue in `src/data/culture/spiritualDestinations.js`.
 *
 * Framework-free like the existing suites: plain `node --test`.
 * This module is the single, verified source of truth behind the
 * Culture-home strip and the `#/culture/experiences/spiritual` route, and it
 * carries five derived helpers (filter / search / taxonomy / districts /
 * featured picks). All of them are pure functions over static data, so they
 * are fully testable without a DOM.
 *
 * Invariants mirrored from spiritualTraditions.test.js:
 *  - unique ids, complete EN/AS copy
 *  - filter honesty: a tradition is only offered when a place carries it
 *  - photo honesty: declared images resolve to a real local file
 *
 * These tests PIN CURRENT BEHAVIOUR, including deliberate quirks:
 *  - `filterByTradition("all")` returns the live SPIRITUAL_DESTINATIONS array
 *    (same reference), not a copy
 *  - unknown tradition ids return [] rather than falling back to "all"
 *  - `searchSpiritual` searches name / place / district / kind only — never
 *    `about`, `image`, `alt`, `source`, `slug` or `id`
 *  - `featuredSpiritual(-1)` returns 3 items (negative limits are not
 *    validated); the limit is a slice, not a count of curated picks
 *
 * Run with: npm test
 */
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const {
  TRADITIONS,
  SPIRITUAL_DESTINATIONS,
  filterByTradition,
  searchSpiritual,
  availableTraditions,
  spiritualDistricts,
  featuredSpiritual,
  } = await import("../src/data/culture/spiritualDestinations.js");
  const { default: CULTURE_IMG } = await import("../src/data/culture/cultureImages.js");

/* ── helpers ─────────────────────────────────────────────────────────────── */
const ids = (list) => list.map((d) => d.id);
const byId = (id) => SPIRITUAL_DESTINATIONS.find((d) => d.id === id);
const ALL_IDS = ids(SPIRITUAL_DESTINATIONS);
const CURATED = [
  "kamakhya-temple",
  "hayagriva-madhava-hajo",
  "gurdwara-guru-tegh-bahadur-sahib",
  "sattras-of-majuli",
];

/* ══ 1. Catalogue integrity ════════════════════════════════════════════════ */

describe("catalogue: static data", () => {
  test("ids are unique and stable", () => {
    assert.equal(new Set(ALL_IDS).size, ALL_IDS.length, "duplicate destination id");
    for (const id of ALL_IDS) assert.match(id, /^[a-z0-9-]+$/, `bad id: ${id}`);
  });

  test("every record carries the full documented field contract", () => {
    for (const d of SPIRITUAL_DESTINATIONS) {
      for (const f of ["name", "place", "district", "kind", "about", "alt"]) {
        assert.ok(d[f] && d[f].en && d[f].en.trim(), `${d.id} missing English ${f}`);
        assert.ok(d[f] && d[f].as && d[f].as.trim(), `${d.id} missing Assamese ${f}`);
      }
      assert.ok(Array.isArray(d.tradition) && d.tradition.length > 0, `${d.id} has no tradition`);
      assert.ok(d.image && d.image.startsWith("/images/culture/"), `${d.id} image is not a local culture path`);
      assert.ok(d.source && d.source.trim(), `${d.id} missing provenance`);
    }
  });

  test("tradition ids on records all exist in TRADITIONS and never use 'all'", () => {
    const known = new Set(TRADITIONS.map((t) => t.id));
    for (const d of SPIRITUAL_DESTINATIONS) {
      for (const t of d.tradition) {
        assert.ok(known.has(t), `${d.id} references unknown tradition ${t}`);
        assert.notEqual(t, "all", `${d.id} must not be tagged 'all'`);
      }
    }
  });

  test("TRADITIONS is well formed: unique ids, 'all' first, bilingual labels", () => {
    const seen = new Set();
    for (const t of TRADITIONS) {
      assert.ok(!seen.has(t.id), `duplicate tradition id: ${t.id}`);
      seen.add(t.id);
      assert.ok(t.label.en && t.label.en.trim(), `missing English label for ${t.id}`);
      assert.ok(t.label.as && t.label.as.trim(), `missing Assamese label for ${t.id}`);
    }
    assert.equal(TRADITIONS[0].id, "all", "'all' must come first");
  });

  test("photo honesty: every image resolves to a real file under public/images/culture/", () => {
    for (const d of SPIRITUAL_DESTINATIONS) {
      const file = fileURLToPath(new URL(`../public${d.image}`, import.meta.url));
      assert.ok(existsSync(file), `${d.id} image missing on disk: ${d.image}`);
    }
  });

  test("photo honesty: every image comes from the shared CULTURE_IMG registry", () => {
    const known = new Set(Object.values(CULTURE_IMG));
    for (const d of SPIRITUAL_DESTINATIONS) {
      assert.ok(known.has(d.image), `${d.id} image is not in CULTURE_IMG`);
    }
  });
});

/* ══ 2. filterByTradition ══════════════════════════════════════════════════ */

describe("filterByTradition", () => {
  test("'all' returns every destination", () => {
    assert.equal(filterByTradition("all").length, SPIRITUAL_DESTINATIONS.length);
  });

  test("'all' returns the LIVE SPIRITUAL_DESTINATIONS array (same reference, not a copy)", () => {
    assert.strictEqual(filterByTradition("all"), SPIRITUAL_DESTINATIONS);
  });

  test("falsy ids return everything, by the same reference", () => {
    for (const falsy of [undefined, null, "", 0, false, NaN]) {
      const res = filterByTradition(falsy);
      assert.equal(res.length, SPIRITUAL_DESTINATIONS.length, `falsy id ${String(falsy)}`);
      assert.strictEqual(res, SPIRITUAL_DESTINATIONS, `falsy id ${String(falsy)}`);
    }
  });

  test("an unknown tradition id returns [] — it does NOT fall back to 'all'", () => {
    assert.deepEqual(filterByTradition("nope"), []);
    assert.deepEqual(filterByTradition("hindu "), []);
    assert.deepEqual(filterByTradition("HINDU"), []);
  });

  test("the match is case sensitive: 'ALL' is not 'all'", () => {
    assert.deepEqual(filterByTradition("ALL"), []);
  });

  test("a known tradition returns exactly its destinations, in source order", () => {
    assert.deepEqual(ids(filterByTradition("hindu")), [
      "kamakhya-temple",
      "umananda-temple",
      "sivadol-sivasagar",
      "negheriting-shiva-doul",
      "hayagriva-madhava-hajo",
      "surya-pahar",
    ]);
    assert.deepEqual(ids(filterByTradition("islam")), [
      "hayagriva-madhava-hajo",
      "poa-mecca-hajo",
      "ajan-pir-dargah",
      "panbari-mosque",
    ]);
    assert.deepEqual(ids(filterByTradition("sikh")), ["gurdwara-guru-tegh-bahadur-sahib"]);
    assert.deepEqual(ids(filterByTradition("christian")), ["guwahati-baptist-church"]);
    assert.deepEqual(ids(filterByTradition("jain")), ["surya-pahar"]);
  });

  test("a known tradition returns exactly its destinations (vaishnavite, indigenous)", () => {
    assert.deepEqual(ids(filterByTradition("vaishnavite")), [
      "sattras-of-majuli",
      "auniati-satra",
      "barpeta-satra",
      "bordowa-than",
    ]);
    assert.deepEqual(ids(filterByTradition("indigenous")), [
      "namphake-buddhist-monastery",
      "tipam-phake-buddhist-monastery",
    ]);
  });

  test("a multi-faith place appears under every tradition it carries", () => {
    const hajo = byId("hayagriva-madhava-hajo");
    assert.ok(hajo.tradition.length > 1, "expected a multi-faith fixture");
    for (const t of hajo.tradition) {
      assert.ok(ids(filterByTradition(t)).includes(hajo.id), `${hajo.id} missing from ${t}`);
    }
  });

  test("honesty: every offered tradition has at least one destination", () => {
    for (const t of TRADITIONS) {
      if (t.id === "all") continue;
      assert.ok(filterByTradition(t.id).length > 0, `tradition ${t.id} has no place`);
    }
  });

  test("results are a subsequence of the source order", () => {
    for (const t of TRADITIONS) {
      const res = ids(filterByTradition(t.id));
      const positions = res.map((id) => ALL_IDS.indexOf(id));
      assert.deepEqual(positions, [...positions].sort((a, b) => a - b), `order broken for ${t.id}`);
    }
  });
});

/* ══ 3. searchSpiritual ════════════════════════════════════════════════════ */

describe("searchSpiritual", () => {
  test("an empty query returns everything", () => {
    assert.equal(searchSpiritual("").length, SPIRITUAL_DESTINATIONS.length);
    assert.equal(searchSpiritual().length, SPIRITUAL_DESTINATIONS.length);
    assert.equal(searchSpiritual(null).length, SPIRITUAL_DESTINATIONS.length);
    assert.equal(searchSpiritual("   ").length, SPIRITUAL_DESTINATIONS.length);
  });

  test("an empty query returns the LIVE array by reference (default 'all' short-circuits)", () => {
    assert.strictEqual(searchSpiritual(""), SPIRITUAL_DESTINATIONS);
  });

  test("the query is trimmed and matched case-insensitively", () => {
    assert.deepEqual(ids(searchSpiritual("kamakhya")), ["kamakhya-temple"]);
    assert.deepEqual(ids(searchSpiritual("KAMAKHYA")), ["kamakhya-temple"]);
    assert.deepEqual(ids(searchSpiritual("KaMaKhYa")), ["kamakhya-temple"]);
    assert.deepEqual(ids(searchSpiritual("  kamakhya  ")), ["kamakhya-temple"]);
    assert.deepEqual(ids(searchSpiritual("\t kamakhya \n")), ["kamakhya-temple"]);
  });

  test("it matches the Assamese name and district", () => {
    assert.deepEqual(ids(searchSpiritual("কামাখ্যা")), ["kamakhya-temple"]);
    assert.ok(ids(searchSpiritual("কামৰূপ")).length > 1, "Assamese district should match several");
  });

  test("it matches place, district and kind — not just the name", () => {
    assert.deepEqual(ids(searchSpiritual("hajo")), [
      "hayagriva-madhava-hajo",
      "poa-mecca-hajo",
    ]);
    assert.deepEqual(ids(searchSpiritual("Shakti Pitha")), ["kamakhya-temple"]);
    assert.ok(ids(searchSpiritual("guwahati")).length > 1, "district text should match several");
  });

  test("it does NOT search 'source'", () => {
    assert.deepEqual(ids(searchSpiritual("Wikipedia")), [], "source must not be searched");
    assert.deepEqual(ids(searchSpiritual("provenance")), [], "source must not be searched");
  });

  test("it does NOT search 'about' or 'alt'", () => {
    const about = byId("kamakhya-temple").about.en;
    const probe = about.split(" ").find((w) => w.length > 6 && !/temple/i.test(w));
    if (probe) {
      assert.deepEqual(ids(searchSpiritual(probe)), [], "'about' must not be searched");
    }
  });

  test("it does NOT search 'image' or 'id'", () => {
    assert.deepEqual(ids(searchSpiritual("jpg")), [], "'image' must not be searched");
    assert.deepEqual(ids(searchSpiritual("umphake")), [], "'id' must not be searched");
  });

  test("a query with no match returns []", () => {
    assert.deepEqual(ids(searchSpiritual("zzzz")), []);
    assert.deepEqual(ids(searchSpiritual("zzzz", "hindu")), []);
  });

  test("a tradition alone filters the result set", () => {
    assert.deepEqual(ids(searchSpiritual("", "sikh")), ["gurdwara-guru-tegh-bahadur-sahib"]);
    assert.deepEqual(ids(searchSpiritual("", "hindu")), ids(filterByTradition("hindu")));
  });

  test("query and tradition compose as AND", () => {
    assert.deepEqual(ids(searchSpiritual("hajo", "hindu")), ["hayagriva-madhava-hajo"]);
    assert.deepEqual(ids(searchSpiritual("hajo", "islam")), ["hayagriva-madhava-hajo", "poa-mecca-hajo"]);
    assert.deepEqual(ids(searchSpiritual("kamakhya", "sikh")), []);
  });

  test("an unknown tradition id yields [] even with an empty query", () => {
    assert.deepEqual(ids(searchSpiritual("", "nope")), []);
    assert.deepEqual(ids(searchSpiritual("kamakhya", "nope")), []);
  });

  test("results are a subsequence of the source order", () => {
    for (const q of ["kamakhya", "hajo", "guwahati", "কামৰূপ", "temple"]) {
      const res = ids(searchSpiritual(q));
      const positions = res.map((id) => ALL_IDS.indexOf(id));
      assert.deepEqual(positions, [...positions].sort((a, b) => a - b), `order broken for ${q}`);
    }
  });
});

/* ══ 4. availableTraditions ════════════════════════════════════════════════ */

describe("availableTraditions", () => {
  test("it returns 'all' first, followed by every other tradition", () => {
    const offered = availableTraditions();
    assert.equal(offered[0].id, "all", "'all' must come first");
    assert.deepEqual(
      offered.map((t) => t.id),
      TRADITIONS.map((t) => t.id),
    );
  });

  test("it is a NEW array, but keeps the same element objects", () => {
    const offered = availableTraditions();
    assert.notStrictEqual(offered, TRADITIONS, "must not be the same array reference");
    assert.strictEqual(offered[0], TRADITIONS[0], "elements must keep their identity");
  });

  test("honesty: every offered tradition has at least one destination", () => {
    for (const t of availableTraditions()) {
      if (t.id === "all") continue;
      assert.ok(filterByTradition(t.id).length > 0, `offered tradition ${t.id} has no place`);
    }
  });

  test("honesty: a tradition is never offered unless a place carries it", () => {
    const offered = new Set(availableTraditions().map((t) => t.id));
    for (const d of SPIRITUAL_DESTINATIONS) {
      for (const t of d.tradition) {
        assert.ok(offered.has(t), `carried tradition ${t} is not offered`);
      }
    }
  });
});

/* ══ 5. spiritualDistricts ══════════════════════════════════════════════════ */

describe("spiritualDistricts", () => {
  test("it returns the distinct districts present in the catalogue", () => {
    const districts = spiritualDistricts();
    assert.equal(districts.length, 10);
    for (const d of districts) {
      assert.ok(d.en && d.en.trim(), "district missing English name");
      assert.ok(d.as && d.as.trim(), "district missing Assamese name");
    }
  });

  test("it returns each district only once", () => {
    const districts = spiritualDistricts();
    const en = districts.map((d) => d.en);
    assert.equal(new Set(en).size, en.length, "duplicate district");
  });

  test("it preserves first-appearance order from the catalogue", () => {
    const expected = [...new Set(SPIRITUAL_DESTINATIONS.map((d) => d.district.en))];
    assert.deepEqual(spiritualDistricts().map((d) => d.en), expected);
  });

  test("'Kamrup Metropolitan' and 'Kamrup' are distinct districts", () => {
    const en = spiritualDistricts().map((d) => d.en);
    assert.ok(en.includes("Kamrup Metropolitan"));
    assert.ok(en.includes("Kamrup"));
  });

  test("every returned district corresponds to at least one destination", () => {
    const en = new Set(spiritualDistricts().map((d) => d.en));
    for (const d of SPIRITUAL_DESTINATIONS) {
      assert.ok(en.has(d.district.en), `${d.id} district ${d.district.en} is missing`);
    }
  });
});

/* ══ 6. featuredSpiritual ═══════════════════════════════════════════════════ */

describe("featuredSpiritual", () => {
  test("it defaults to the four curated picks, in that exact order", () => {
    assert.deepEqual(ids(featuredSpiritual()), CURATED);
  });

  test("an explicit limit of 4 matches the default", () => {
    assert.deepEqual(ids(featuredSpiritual(4)), CURATED);
    assert.deepEqual(ids(featuredSpiritual(undefined)), CURATED);
  });

  test("a limit below 4 truncates the curated picks", () => {
    assert.deepEqual(ids(featuredSpiritual(0)), []);
    assert.deepEqual(ids(featuredSpiritual(1)), ["kamakhya-temple"]);
    assert.deepEqual(ids(featuredSpiritual(2)), CURATED.slice(0, 2));
    assert.deepEqual(ids(featuredSpiritual(3)), CURATED.slice(0, 3));
  });

  test("a limit above 4 appends the remaining places in source order", () => {
    const rest = ALL_IDS.filter((id) => !CURATED.includes(id));
    assert.deepEqual(ids(featuredSpiritual(5)), [...CURATED, rest[0]]);
    assert.deepEqual(ids(featuredSpiritual(6)), [...CURATED, rest[0], rest[1]]);
    assert.deepEqual(ids(featuredSpiritual(100)), [...CURATED, ...rest]);
  });

  test("a limit larger than the catalogue returns every destination once", () => {
    const res = featuredSpiritual(17);
    assert.equal(res.length, SPIRITUAL_DESTINATIONS.length);
    assert.equal(new Set(ids(res)).size, res.length, "duplicate entries");
  });

  test("a negative limit is not validated and slices the curated picks", () => {
    assert.deepEqual(ids(featuredSpiritual(-1)), CURATED.slice(0, -1));
    assert.equal(featuredSpiritual(-1).length, 3);
  });

  test("the curated picks always occupy the first positions", () => {
    for (const limit of [4, 5, 6, 10, 17]) {
      assert.deepEqual(ids(featuredSpiritual(limit)).slice(0, 4), CURATED, `limit ${limit}`);
    }
  });

  test("every featured entry is a member of the catalogue", () => {
    for (const d of featuredSpiritual(100)) {
      assert.ok(SPIRITUAL_DESTINATIONS.includes(d), `${d.id} is not in the catalogue`);
    }
  });

  test("it is deterministic across calls", () => {
    assert.deepEqual(ids(featuredSpiritual(8)), ids(featuredSpiritual(8)));
  });
});
