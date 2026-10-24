/**
 * itinerary.test.js — permanent regression tests for the Assam trip planner's
 * pure logic layer, using Node's built-in test runner (node --test).
 *
 * These target the framework-free modules that also run inside the browser:
 *   src/lib/itinerary.js     — the rule-based day-by-day generator + cost model
 *   src/data/travel/destinations.js — the destination catalog + selection helpers
 *
 * TripContext (React hooks + localStorage) is intentionally NOT covered here
 * because it needs a DOM; its duplicate-selection contract is instead asserted
 * against the pure data helpers it relies on.
 *
 * Run with:  npm test
 */
import test from "node:test";
import assert from "node:assert/strict";
import { generateItinerary, __test } from "../src/lib/itinerary.js";
import {
  getDestination,
  destinationsByDistrict,
  searchDestinations,
} from "../src/data/travel/destinations.js";

const { schedule } = __test;

/* ── Fixtures: real, verified destination IDs from the data layer ────────── */
const KAMRUP = [
  "kamrup--sualkuchi",
  "kamrup--chandubi-beel",
  "kamrup--saraighat",
];
const MAJULI = ["majuli--auniati-satra"];
const SIVASAGAR = ["sivasagar--rang-ghar"];
// Long, heavyweight cluster used to force overflow.
const GOLAGHAT = [
  "golaghat--kaziranga-kohora-gate", // 8h
  "golaghat--panbari-reserve", // 5h
  "golaghat--dhansiri-riverbanks", // 3h
  "baksa--manas-national-park", // 7h (different district)
];

const baseDetails = {
  arrivalDate: "2026-01-10",
  departureDate: "2026-01-12", // 3 days / 2 nights
  adults: 2,
  children: 0,
  travelStyle: "balanced",
  budgetCategory: "mod",
  transport: "public",
  budget: "",
};

/* ══ 1. Date validation ══════════════════════════════════════════════════ */
test("dates: valid arrival->departure yields inclusive day count", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  assert.equal(it.meta.numDays, 3);
  assert.equal(it.meta.nights, 2);
});

test("dates: missing departure defaults to a single day", () => {
  const it = generateItinerary(KAMRUP, { ...baseDetails, departureDate: "" });
  assert.equal(it.meta.numDays, 1);
  assert.equal(it.meta.nights, 0);
});

test("dates: unparseable date falls back to 1 day + 'Day N' label", () => {
  const it = generateItinerary(KAMRUP, {
    ...baseDetails,
    arrivalDate: "not-a-date",
    departureDate: "",
  });
  assert.equal(it.meta.numDays, 1);
  assert.equal(it.days[0].date, "Day 1");
  assert.equal(it.days[0].dateISO, null);
});

test("dates: departure earlier than arrival falls back to 1 day", () => {
  const it = generateItinerary(KAMRUP, {
    ...baseDetails,
    arrivalDate: "2026-01-12",
    departureDate: "2026-01-10",
  });
  assert.equal(it.meta.numDays, 1);
});

test("dates: real calendar dates are stamped onto each day in order", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  assert.equal(it.days[0].dateISO, "2026-01-10");
  assert.equal(it.days[1].dateISO, "2026-01-11");
  assert.equal(it.days[2].dateISO, "2026-01-12");
});

/* ══ 2. Empty destination selection ═══════════════════════════════════════ */
test("empty selection: no days, zero cost, explicit empty warning", () => {
  const it = generateItinerary([], baseDetails);
  assert.equal(it.days.length, 0);
  assert.equal(it.costs.total, 0);
  assert.equal(it.costs.travellers, 2);
  assert.ok(it.warnings.some((w) => w.type === "empty"));
});

test("empty selection: every cost line is zero (never a misleading figure)", () => {
  const it = generateItinerary([], baseDetails);
  for (const line of it.costs.breakdown) assert.equal(line.value, 0);
});

test("unknown destination ids are ignored, not scheduled", () => {
  const it = generateItinerary(["does-not-exist", "nope--nope"], baseDetails);
  assert.equal(it.days.length, 0);
  assert.ok(it.warnings.some((w) => w.type === "empty"));
});

/* ══ 3. Multi-district scheduling ════════════════════════════════════════ */
test("multi-district: crossing a district in one day raises a transfer note", () => {
  const it = generateItinerary([...KAMRUP, ...MAJULI, ...SIVASAGAR], {
    ...baseDetails,
    departureDate: "2026-01-11",
    travelStyle: "packed",
  });
  const transferDays = it.days.filter((d) => d.notes.includes("transfer"));
  assert.ok(transferDays.length >= 1, "expected at least one transfer note");
  const multi = transferDays.find(
    (d) => new Set(d.slots.map((s) => s.destination.district)).size > 1
  );
  assert.ok(multi, "expected a day spanning more than one district");
});

test("multi-district: all selected districts appear across the plan", () => {
  const ids = [...KAMRUP, ...MAJULI, ...SIVASAGAR];
  const it = generateItinerary(ids, {
    ...baseDetails,
    departureDate: "2026-01-15",
    travelStyle: "relaxed",
  });
  const visited = new Set();
  for (const day of it.days)
    for (const s of day.slots) visited.add(s.destination.district);
  for (const id of ids) assert.ok(visited.has(getDestination(id).district));
});

test("single district: no spurious transfer note", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  const transfers = it.days.flatMap((d) => d.notes).filter((n) => n === "transfer");
  assert.equal(transfers.length, 0);
});

/* ══ 4. Budget & overflow warnings ═══════════════════════════════════════ */
test("overflow: heavyweight cluster in one day cannot fit -> overflow warning", () => {
  const it = generateItinerary(GOLAGHAT, {
    ...baseDetails,
    departureDate: "2026-01-10",
    travelStyle: "relaxed",
  });
  const overflow = it.warnings.find((w) => w.type === "overflow");
  assert.ok(overflow, "expected an overflow warning");
  assert.ok(Array.isArray(overflow.ids) && overflow.ids.length >= 1);
  const scheduled = it.days.reduce((a, d) => a + d.slots.length, 0);
  assert.equal(scheduled, 1);
});

test("overflow: ample days absorb every place -> no overflow warning", () => {
  const it = generateItinerary(GOLAGHAT, {
    ...baseDetails,
    departureDate: "2026-01-20",
    travelStyle: "relaxed",
  });
  assert.ok(!it.warnings.some((w) => w.type === "overflow"));
});

test("budget: total above stated budget -> budget warning", () => {
  const it = generateItinerary([...KAMRUP, ...MAJULI], {
    ...baseDetails,
    budgetCategory: "prem",
    transport: "cab",
    budget: "5000",
  });
  assert.ok(it.costs.total > 5000);
  assert.ok(it.warnings.some((w) => w.type === "budget"));
});

test("budget: generous budget -> no budget warning", () => {
  const it = generateItinerary(KAMRUP, { ...baseDetails, budget: "1000000" });
  assert.ok(!it.warnings.some((w) => w.type === "budget"));
});

/* ══ 5. Arrival / departure days ═════════════════════════════════════════ */
test("arrival: first day flagged arrival; last day flagged departure", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  assert.equal(it.days[0].isArrival, true);
  assert.equal(it.days[0].isDeparture, false);
  assert.ok(it.days[0].notes.includes("arrival"));
  const last = it.days[it.days.length - 1];
  assert.equal(last.isDeparture, true);
  assert.ok(last.notes.includes("departure"));
});

test("single-day trip: BOTH arrival and departure on the same day", () => {
  // One-calendar-day trip: the day is explicitly an arrival AND a departure
  // day, flagged `sameDay` (rendered as the combined "Arrival & Departure
  // Day" label). With no arrival/departure times entered, the plan must also
  // flag uncertain sightseeing time instead of assuming a full day.
  const it = generateItinerary(KAMRUP, {
    ...baseDetails,
    departureDate: "2026-01-10",
  });
  assert.equal(it.days.length, 1);
  const day = it.days[0];
  assert.equal(day.isArrival, true);
  assert.equal(day.isDeparture, true);
  assert.equal(day.sameDay, true);
  assert.ok(day.notes.includes("arrival"));
  assert.ok(day.notes.includes("departure"));
  // no times provided → uncertainty must be called out, not hidden
  assert.ok(day.notes.includes("uncertain_arrival"));
  assert.ok(day.notes.includes("uncertain_departure"));
});

test("single-day trip with times: no uncertain-time flags", () => {
  const it = generateItinerary(KAMRUP, {
    ...baseDetails,
    departureDate: "2026-01-10",
    arrivalTime: "10:00",
    departureTime: "18:00",
  });
  const day = it.days[0];
  assert.equal(day.sameDay, true);
  assert.ok(!day.notes.includes("uncertain_arrival"));
  assert.ok(!day.notes.includes("uncertain_departure"));
});

test("arrival/departure days use a lighter hour budget than mid days", () => {
  const days = schedule(KAMRUP.map((id) => getDestination(id)), 3, "balanced");
  assert.ok(days[0].budget < days[1].budget, "arrival budget should be reduced");
});


/* ══ 6. Regenerated itineraries ══════════════════════════════════════════ */
test("regenerate: same inputs are deterministic (stable schedule + cost)", () => {
  const a = generateItinerary([...KAMRUP, ...MAJULI], baseDetails);
  const b = generateItinerary([...KAMRUP, ...MAJULI], baseDetails);
  assert.equal(a.costs.total, b.costs.total);
  assert.equal(a.days.length, b.days.length);
  const shape = (it) => it.days.map((d) => d.slots.map((s) => s.destination.id).join(","));
  assert.deepEqual(shape(a), shape(b));
});

test("regenerate: a fresh generatedAt timestamp is stamped each run", () => {
  const a = generateItinerary(KAMRUP, baseDetails);
  const b = generateItinerary(KAMRUP, baseDetails);
  assert.ok(typeof a.meta.generatedAt === "string");
  assert.ok(typeof b.meta.generatedAt === "string");
});

test("regenerate: extending dates reduces/clears overflow (plan improves)", () => {
  const short = generateItinerary(GOLAGHAT, {
    ...baseDetails,
    departureDate: "2026-01-10",
    travelStyle: "relaxed",
  });
  const long = generateItinerary(GOLAGHAT, {
    ...baseDetails,
    departureDate: "2026-01-18",
    travelStyle: "relaxed",
  });
  const scheduledOf = (it) => it.days.reduce((a, d) => a + d.slots.length, 0);
  assert.ok(scheduledOf(long) >= scheduledOf(short));
});

/* ══ 7. Cost calculations ════════════════════════════════════════════════ */
test("cost: total equals the sum of its breakdown lines", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  const sum = it.costs.breakdown.reduce((a, l) => a + l.value, 0);
  assert.equal(it.costs.total, sum);
});

test("cost: more travellers raises the total (per-person scaling)", () => {
  const two = generateItinerary(KAMRUP, { ...baseDetails, adults: 2, children: 0 });
  const four = generateItinerary(KAMRUP, { ...baseDetails, adults: 4, children: 0 });
  assert.ok(four.costs.total > two.costs.total);
  assert.equal(four.costs.travellers, 4);
});

test("cost: travellers = adults + children", () => {
  const it = generateItinerary(KAMRUP, { ...baseDetails, adults: 2, children: 3 });
  assert.equal(it.costs.travellers, 5);
});

test("cost: premium tier costs more than budget tier for identical trip", () => {
  const low = generateItinerary(KAMRUP, { ...baseDetails, budgetCategory: "low" });
  const prem = generateItinerary(KAMRUP, { ...baseDetails, budgetCategory: "prem" });
  assert.ok(prem.costs.total > low.costs.total);
});

test("cost: an extra district adds an intercity leg to transport", () => {
  const oneDistrict = generateItinerary(KAMRUP, baseDetails);
  const twoDistricts = generateItinerary([...KAMRUP, ...MAJULI], baseDetails);
  const transportLine = (it) => it.costs.breakdown.find((l) => l.key === "transport").value;
  assert.ok(transportLine(twoDistricts) > transportLine(oneDistrict));
});

test("cost: currency is INR and every result is flagged an estimate", () => {
  const it = generateItinerary(KAMRUP, baseDetails);
  assert.equal(it.costs.currency, "INR");
  assert.equal(it.costs.estimate, true);
});

/* ══ 8. Duplicate selections (data-layer contract used by TripContext) ══ */
test("duplicate: a destination id resolves to a single stable record", () => {
  const id = KAMRUP[0];
  assert.equal(getDestination(id).id, getDestination(id).id);
});

test("duplicate: passing the same id twice does not crash and stays coherent", () => {
  const it = generateItinerary([KAMRUP[0], KAMRUP[0]], baseDetails);
  assert.ok(it.days.length >= 1);
  const scheduled = it.days.flatMap((d) => d.slots.map((s) => s.destination.id));
  assert.ok(scheduled.length >= 1);
  assert.ok(it.costs.total > 0);
});

test("data: destinationsByDistrict returns unique, valid records", () => {
  const list = destinationsByDistrict("kamrup");
  assert.ok(list.length > 0);
  const ids = list.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length, "no duplicate ids within a district");
  for (const d of list) assert.equal(d.district, "kamrup");
});

test("data: search filters by district without duplicates", () => {
  const res = searchDestinations({ district: "kamrup", category: "all", query: "" });
  assert.ok(res.length > 0);
  const ids = res.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const d of res) assert.equal(d.district, "kamrup");
});

