/**
 * rivers.test.js — regression tests for the Rivers of Assam data layer.
 *
 * Framework-free like the existing suites: plain `node --test`.
 * Invariants mirrored from spiritualTraditions.test.js:
 *  - unique ids, complete EN/AS copy, no placeholder text
 *  - filter honesty: offered groups only when a river carries them
 *  - photo honesty: declared images resolve to the credit registry
 *
 * Run with: npm test
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  RIVERS,
  RIVER_SYSTEMS,
  riverById,
  riverSystemLabel,
  riverSystemShort,
  riverSideLabel,
  searchRivers,
  filterRiversBySystem,
  availableRiverSides,
} from "../src/data/rivers.js";
import { RIVER_CREDITS, riverCreditFor } from "../src/data/riverImageCredits.js";

const ids = (list) => list.map((r) => r.id);

/* ══ 1. Catalogue integrity ═══════════════════════════════════════════════ */

test("catalogue: ids are unique and stable", () => {
  assert.ok(RIVERS.length >= 12, "should document the featured set");
  assert.equal(new Set(ids(RIVERS)).size, RIVERS.length, "duplicate river ids");
  for (const r of RIVERS) assert.match(r.id, /^[a-z0-9-]+$/, `bad id: ${r.id}`);
});

test("catalogue: every river has complete EN/AS copy", () => {
  for (const r of RIVERS) {
    for (const f of ["name", "region", "place", "description", "alt"]) {
      assert.ok(r[f] && r[f].en && r[f].en.trim(), `${r.id} missing English ${f}`);
      assert.ok(r[f] && r[f].as && r[f].as.trim(), `${r.id} missing Assamese ${f}`);
    }
    assert.ok(
      !/\bTODO\b|\bTBD\b|\blorem\b/i.test(r.description.en + r.description.as),
      `${r.id} carries placeholder copy`,
    );
  }
});

test("catalogue: system + side taxonomy is closed", () => {
  const systems = new Set(RIVER_SYSTEMS.map((s) => s.id));
  const sides = new Set(["main", "north", "south", "valley"]);
  for (const r of RIVERS) {
    assert.ok(systems.has(r.system), `${r.id} unknown system: ${r.system}`);
    assert.ok(sides.has(r.side), `${r.id} unknown side: ${r.side}`);
  }
});

test("taxonomy: labels resolve in English and Assamese", () => {
  for (const s of RIVER_SYSTEMS) {
    assert.equal(riverSystemLabel(s.id, "en"), s.label.en);
    assert.equal(riverSystemLabel(s.id, "as"), s.label.as);
    assert.equal(riverSystemShort(s.id, "en"), s.short.en);
    assert.equal(riverSystemShort(s.id, "as"), s.short.as);
  }
  assert.equal(riverSideLabel("north", "en"), "North-bank tributary");
  assert.equal(riverSideLabel("north", "as"), "উত্তৰ তীৰৰ উপনদী");
});

/* ══ 2. Search + filter honesty ═══════════════════════════════════════════ */

test("search: empty query returns the full catalogue", () => {
  assert.equal(searchRivers("").length, RIVERS.length);
  assert.equal(searchRivers().length, RIVERS.length);
});

test("search: matches aliases and regions", () => {
  assert.ok(ids(searchRivers("Jiabharali")).includes("jia-bharali"));
  assert.ok(ids(searchRivers("karimganj")).includes("longai"));
  assert.ok(ids(searchRivers("কপিলী")).includes("kopili"));
});

test("search: unknown query returns empty, not everything", () => {
  assert.equal(searchRivers("zzzz-no-such-river").length, 0);
});

test("filter: unknown filters impose no constraint", () => {
  assert.equal(filterRiversBySystem("bogus").length, RIVERS.length);
  assert.deepEqual(
    ids(filterRiversBySystem("bogus")),
    ids(filterRiversBySystem("all")),
  );
});

test("filter: system slices partition the catalogue without loss", () => {
  const seen = new Set([
    ...ids(filterRiversBySystem("brahmaputra")),
    ...ids(filterRiversBySystem("barak")),
  ]);
  assert.equal(seen.size, RIVERS.length, "system slices must cover all rivers");
});

test("filter: offered sides only when a river carries them", () => {
  const offered = availableRiverSides();
  for (const s of offered) {
    assert.ok(RIVERS.some((r) => r.side === s), `side "${s}" offered but empty`);
  }
  const offeredBarak = availableRiverSides({ system: "barak" });
  assert.ok(offeredBarak.length > 0);
  for (const s of offeredBarak) {
    assert.ok(
      filterRiversBySystem("barak").some((r) => r.side === s),
      `side "${s}" offered for Barak but empty`,
    );
  }
});

test("lookup: riverById returns the record or null", () => {
  assert.equal(riverById("brahmaputra").name.en, "Brahmaputra");
  assert.equal(riverById("no-such-river"), null);
});

/* ══ 3. Photo + credit honesty ════════════════════════════════════════════ */

test("credits: one registry row per delivered file", () => {
  const files = new Set(RIVERS.filter((r) => r.image).map((r) => r.image.split("/").pop()));
  for (const f of files) {
    const c = riverCreditFor(f);
    assert.ok(c, `no credit row for ${f}`);
    assert.ok(c.author && c.author.trim(), `${f} missing author`);
    assert.ok(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(c.source), `${f} bad source`);
    assert.ok(/^https:\/\/creativecommons\.org\//.test(c.licenseUrl), `${f} bad license url`);
    assert.ok(c.alterations && c.alterations.trim(), `${f} missing alterations note`);
  }
  assert.ok(RIVER_CREDITS.length >= files.size, "registry must cover all files");
});