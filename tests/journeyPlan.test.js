import test from "node:test";
import assert from "node:assert/strict";
import { buildJourneyStops, estimateJourneyStayTotal } from "../src/lib/journeyPlan.js";
import { DISTRICTS, slugify } from "../src/data/travel/districts.js";
import { getStays } from "../src/data/travel/stays.js";

test("journey stops keep the chosen district order and roll dates forward", () => {
  const stops = buildJourneyStops(
    ["kamrup-metropolitan", "majuli", "sivasagar"],
    "2026-02-10",
    { "kamrup-metropolitan": 2, majuli: 3, sivasagar: 1 },
  );

  assert.deepEqual(stops.map((stop) => stop.slug), [
    "kamrup-metropolitan",
    "majuli",
    "sivasagar",
  ]);
  assert.deepEqual(stops.map((stop) => stop.arrivalDate), [
    "2026-02-10",
    "2026-02-12",
    "2026-02-15",
  ]);
  assert.deepEqual(stops.map((stop) => stop.nights), [1, 2, 0]);
});

test("journey stay total uses the selected registered nightly prices", () => {
  const total = estimateJourneyStayTotal(
    [
      { slug: "kamrup", nights: 2 },
      { slug: "majuli", nights: 1 },
    ],
    {
      kamrup: { registeredPrice: 1800 },
      majuli: { registeredPrice: 2200 },
    },
  );

  assert.equal(total, 5800);
});

test("every listed travel stay exposes a registered nightly tariff", () => {
  const stays = DISTRICTS.flatMap((district) => getStays(slugify(district.name)));

  assert.ok(stays.length > 0);
  for (const stay of stays) {
    assert.equal(stay.rateCurrency, "INR");
    assert.equal(stay.rateUnit, "night");
    assert.ok(Number.isFinite(stay.registeredPrice) && stay.registeredPrice > 0);
  }
});
