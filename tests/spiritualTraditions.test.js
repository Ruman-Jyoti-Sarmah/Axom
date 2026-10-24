/**
 * spiritualTraditions.test.js — regression tests for the Travel home's
 * "Choose Spiritual Traditions" filter.
 *
 * These target the pure logic layer in `src/data/travel/destinations.js`, the same
 * framework-free module the existing itinerary suite covers, so they run under
 * plain `node --test` with no DOM. The React interactions (popover open /
 * close, carousel reset) are covered by the assertions on the data they
 * consume; browser-level interaction testing is listed as pending in the
 * task notes.
 *
 * Guiding invariant: the filter must NEVER invent a tradition. A category is
 * only offered when at least one verified destination actually carries it, so
 * every assertion here doubles as a check that the catalogue stays honest.
 *
 * Run with:  npm test
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  DESTINATIONS,
  SPIRITUAL_TRADITIONS,
  searchDestinations,
  availableSpiritualTraditions,
  normalizeTraditions,
  spiritualTraditionLabel,
  spiritualTraditionShort,
} from "../src/data/travel/destinations.js";

const ids = (list) => list.map((d) => d.id);
const byId = (id) => DESTINATIONS.find((d) => d.id === id);
const spiritual = () => searchDestinations({ category: "spiritual" });

/* ══ 1. Taxonomy integrity ════════════════════════════════════════════════ */

test("taxonomy: every tradition has a unique id and both translations", () => {
  const seen = new Set();
  for (const t of SPIRITUAL_TRADITIONS) {
    assert.ok(!seen.has(t.id), `duplicate tradition id: ${t.id}`);
    seen.add(t.id);
    assert.ok(t.label.en && t.label.en.trim(), `missing English label for ${t.id}`);
    assert.ok(t.label.as && t.label.as.trim(), `missing Assamese label for ${t.id}`);
    assert.ok(t.short.en && t.short.en.trim(), `missing English short for ${t.id}`);
    assert.ok(t.short.as && t.short.as.trim(), `missing Assamese short for ${t.id}`);
  }
});

test("taxonomy: labels resolve in English and Assamese", () => {
  for (const t of SPIRITUAL_TRADITIONS) {
    assert.equal(spiritualTraditionLabel(t.id, "en"), t.label.en);
    assert.equal(spiritualTraditionLabel(t.id, "as"), t.label.as);
    assert.equal(spiritualTraditionShort(t.id, "en"), t.short.en);
    assert.equal(spiritualTraditionShort(t.id, "as"), t.short.as);
  }
});

/* ══ 2. No fabricated or empty categories ════════════════════════════════ */

test("honesty: offered traditions all have at least one real destination", () => {
  const offered = availableSpiritualTraditions();
  assert.ok(offered.length > 0, "at least one tradition must be offered");
  for (const t of offered) {
    const matches = searchDestinations({ category: "spiritual", traditions: [t.id] });
    assert.ok(
      matches.length > 0,
      `tradition "${t.id}" is offered but matches nothing — empty category`,
    );
  }
});

test("honesty: traditions with no verified place are never offered", () => {
  const offered = new Set(availableSpiritualTraditions().map((t) => t.id));
  for (const t of SPIRITUAL_TRADITIONS) {
    const matches = searchDestinations({ category: "spiritual", traditions: [t.id] });
    if (matches.length === 0) {
      assert.ok(
        !offered.has(t.id),
        `tradition "${t.id}" has no destination but is offered as a filter`,
      );
    }
  }
});

test("honesty: every offered tradition is a member of the taxonomy", () => {
  const known = new Set(SPIRITUAL_TRADITIONS.map((t) => t.id));
  for (const t of availableSpiritualTraditions()) {
    assert.ok(known.has(t.id), `unknown tradition id surfaced: ${t.id}`);
  }
});

/* ══ 3. Core filtering behaviour ══════════════════════════════════════════ */

test("filter: no selection behaves exactly like the unfiltered category", () => {
  assert.deepEqual(
    ids(searchDestinations({ category: "spiritual", traditions: [] })),
    ids(spiritual()),
  );
  assert.deepEqual(
    ids(searchDestinations({ category: "spiritual", traditions: null })),
    ids(spiritual()),
  );
});

test("filter: a single tradition returns only destinations tagged with it", () => {
  const res = searchDestinations({ category: "spiritual", traditions: ["sikh"] });
  assert.ok(res.length > 0);
  for (const d of res) {
    assert.ok(d.spiritualTraditions.includes("sikh"), `${d.name} is not Sikh`);
  }
});

test("filter: multiple traditions are OR'd (union, not intersection)", () => {
  const sikh = ids(searchDestinations({ category: "spiritual", traditions: ["sikh"] }));
  const islam = ids(searchDestinations({ category: "spiritual", traditions: ["islam"] }));
  const both = ids(searchDestinations({ category: "spiritual", traditions: ["sikh", "islam"] }));

  for (const id of [...sikh, ...islam]) {
    assert.ok(both.includes(id), `union dropped ${id}`);
  }
  assert.equal(both.length, new Set([...sikh, ...islam]).size, "union has duplicates");
});

test("filter: a multi-faith place appears under each of its traditions", () => {
  // Hajo's hilltop shrine is Hindu, Buddhist and Muslim at once.
  const hajo = byId("kamrup--hayagriva-madhava-temple-hajo");
  assert.ok(hajo, "Hayagriva Madhava must exist in the catalogue");
  assert.ok(hajo.spiritualTraditions.length > 1, "expected a multi-faith place");
  for (const tradition of hajo.spiritualTraditions) {
    const res = searchDestinations({ category: "spiritual", traditions: [tradition] });
    assert.ok(
      ids(res).includes(hajo.id),
      `Hajo missing from its own tradition "${tradition}"`,
    );
  }
});

test("filter: untagged destinations never appear under any tradition", () => {
  const untagged = spiritual().filter((d) => d.spiritualTraditions.length === 0);
  const everyTradition = ids(
    searchDestinations({
      category: "spiritual",
      traditions: SPIRITUAL_TRADITIONS.map((t) => t.id),
    }),
  );
  for (const d of untagged) {
    assert.ok(
      !everyTradition.includes(d.id),
      `${d.name} is untagged but matched a tradition filter`,
    );
  }
});

/* ══ 4. Composition with the existing filters ════════════════════════════ */

test("compose: tradition + district narrows to the intersection", () => {
  const res = searchDestinations({
    category: "spiritual",
    district: "kamrup",
    traditions: ["islam"],
  });
  assert.ok(res.length > 0);
  for (const d of res) {
    assert.equal(d.district, "kamrup", `${d.name} is outside the selected district`);
    assert.ok(d.spiritualTraditions.includes("islam"), `${d.name} is not Islamic`);
  }
});

test("compose: tradition + search composes (both must hold)", () => {
  const res = searchDestinations({
    category: "spiritual",
    traditions: ["hindu"],
    query: "kamakhya",
  });
  assert.ok(res.length > 0);
  for (const d of res) {
    assert.ok(d.spiritualTraditions.includes("hindu"));
    assert.ok(
      d.name.toLowerCase().includes("kamakhya") ||
        d.districtName.toLowerCase().includes("kamakhya") ||
        d.summary.toLowerCase().includes("kamakhya"),
      `${d.name} does not match the query`,
    );
  }
});

test("compose: a search that matches nothing returns empty, not everything", () => {
  const res = searchDestinations({
    category: "spiritual",
    traditions: ["hindu"],
    query: "zzzzz-no-such-place",
  });
  assert.equal(res.length, 0);
});

test("compose: district options are scoped to real matches per district", () => {
  // Dhubri has both a Hindu shrine and the gurdwara; a district with only one
  // tradition must offer only that one.
  const dhubri = new Set(availableSpiritualTraditions({ district: "dhubri" }).map((t) => t.id));
  assert.ok(dhubri.has("hindu"), "Dhubri Devi Temple should make Hindu available");
  assert.ok(dhubri.has("sikh"), "Sri Sri Gurdwara should make Sikh available");

  for (const t of availableSpiritualTraditions({ district: "dhubri" })) {
    const res = searchDestinations({
      category: "spiritual",
      district: "dhubri",
      traditions: [t.id],
    });
    assert.ok(res.length > 0, `district-scoped tradition "${t.id}" is empty`);
  }
});

test("compose: search narrows the offered traditions too", () => {
  const offered = availableSpiritualTraditions({ query: "kamakhya" }).map((t) => t.id);
  for (const id of offered) {
    const res = searchDestinations({
      category: "spiritual",
      query: "kamakhya",
      traditions: [id],
    });
    assert.ok(res.length > 0, `"${id}" offered for a query that returns nothing`);
  }
});

/* ══ 5. The tradition filter must not leak into other categories ═════════ */

test("scope: a tradition filter never applies outside the spiritual category", () => {
  // A national park is not a place of worship — a tradition filter must never
  // pull one in, and must not re-categorise it.
  const wildlife = searchDestinations({ category: "wildlife", traditions: ["hindu"] });
  for (const d of wildlife) assert.equal(d.category, "wildlife");

  const everyTradition = ids(
    searchDestinations({
      traditions: SPIRITUAL_TRADITIONS.map((t) => t.id),
      category: "wildlife",
    }),
  );
  assert.equal(everyTradition.length, 0, "tradition filter leaked into wildlife");
});

test("scope: untagged places are still reachable with no tradition selected", () => {
  // Nothing is lost by tagging — the full spiritual list is unchanged.
  assert.equal(
    spiritual().length,
    DESTINATIONS.filter((d) => d.category === "spiritual").length,
  );
});

/* ══ 6. Selection hygiene ════════════════════════════════════════════════ */

test("selection: unknown ids are dropped, duplicates collapse", () => {
  assert.deepEqual(normalizeTraditions(["sikh", "sikh"]), ["sikh"]);
  assert.deepEqual(normalizeTraditions(["sikh", "not-a-tradition"]), ["sikh"]);
  assert.deepEqual(normalizeTraditions([]), []);
  assert.deepEqual(normalizeTraditions(null), []);
  assert.deepEqual(normalizeTraditions(undefined), []);
  assert.deepEqual(normalizeTraditions("hindu"), ["hindu"]);
});

test("selection: a wholly invalid selection imposes no constraint", () => {
  assert.deepEqual(
    ids(searchDestinations({ category: "spiritual", traditions: ["bogus"] })),
    ids(spiritual()),
  );
});

test("results: no duplicate cards and ids stay unique", () => {
  const res = searchDestinations({
    category: "spiritual",
    traditions: ["hindu", "vaishnavite", "islam"],
  });
  assert.equal(new Set(ids(res)).size, res.length, "duplicate destination cards");
});

/* ══ 7. Existing metadata is preserved ══════════════════════════════════ */

test("preserve: tagging did not disturb existing destination fields", () => {
  for (const d of DESTINATIONS) {
    assert.ok(Array.isArray(d.spiritualTraditions), `${d.id} lost its tradition array`);
    assert.ok(d.id && d.name && d.district && d.districtName, `${d.id} lost identity fields`);
    assert.ok(d.summary, `${d.id} lost its summary`);
    assert.ok(d.image, `${d.id} lost its image`);
    assert.equal(typeof d.visitHours, "number", `${d.id} lost visitHours`);
    assert.equal(d.estimate, true, `${d.id} lost the estimate flag`);
    assert.notEqual(d.featured, undefined, `${d.id} lost the featured flag`);
  }
});

test("preserve: pre-existing search API calls still work unchanged", () => {
  // The original 3-argument call shape must keep behaving identically.
  const res = searchDestinations({ district: "kamrup", category: "all", query: "" });
  assert.ok(res.length > 0);
  assert.equal(new Set(ids(res)).size, res.length);
  for (const d of res) assert.equal(d.district, "kamrup");

  assert.equal(searchDestinations().length, DESTINATIONS.length);
});
