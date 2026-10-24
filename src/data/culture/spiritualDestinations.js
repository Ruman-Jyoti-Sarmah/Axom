/**
 * spiritualDestinations.js — Assam's shared sacred geography.
 *
 * The single, verified source of truth behind the "Spiritual Destinations"
 * experience: the Culture-home strip and the dedicated route
 * `#/culture/experiences/spiritual`.
 *
 * EVERY record below was checked against a citable source before it was
 * written: Government of Assam district administration portals
 * (*.assam.gov.in), Archaeological Survey of India reports (cited by the
 * Wikipedia articles that reference them), and English/Assamese Wikipedia.
 * The `source` field names that provenance so the page can show it.
 *
 * Rules honoured here (please don't "improve" by adding unverified detail):
 *   • No opening hours, prices, addresses, visitor restrictions, booking
 *     availability or festival dates are recorded — none are asserted.
 *   • A place is listed under EVERY tradition it genuinely belongs to. Hajo's
 *     hill and Surya Pahar are shared by three faiths each and are labelled so.
 *   • Photographs are verified local files stored under
 *     public/images/culture/ (downloaded from their Wikimedia Commons source
 *     page). Every `image` below is a literal `/images/culture/...` path —
 *     `src/` never invents an image path.
 *   • `tradition` ids drive the filter bar. Traditions with no matching place
 *     are never rendered, so no empty or misleading category can appear.
 *
 * The static catalogue now lives in ./spiritualDestinations.json. This module
 * remains as a compatibility wrapper so existing imports keep working
 * unchanged — the seven public export names and every helper's behaviour are
 * preserved exactly.
 */

import data from "./spiritualDestinations.json" with { type: "json" };

/* ── Static data ─────────────────────────────────────────────────────────── */

/**
 * The tradition taxonomy.
 *
 * This order is topical, deliberately NOT a ranking — no tradition is
 * presented as more important than another. `all` always comes first.
 */
export const TRADITIONS = data.TRADITIONS;

/**
 * The verified catalogue.
 *
 * Field contract — `name`, `place`, `kind`, `about`, `image` keep the exact
 * shape of the older `SPIRITUAL` array so every existing consumer still works:
 *   id         stable slug
 *   name       { en, as }
 *   place      { en, as } — district + the actual locality
 *   district   { en, as } — administrative district
 *   slug       existing district-detail route this place belongs to, or null
 *   kind       { en, as } — the heritage label printed on the card
 *   tradition  ids from TRADITIONS (never "all"); several are allowed
 *   about      { en, as } — concise, factual description
 *   image      local path under /images/culture/
 *   alt        { en, as }
 *   source     provenance, shown on the detail card
 */
export const SPIRITUAL_DESTINATIONS = data.SPIRITUAL_DESTINATIONS;

/* ── Derived helpers ────────────────────────────────────────────────────── */

/** Destinations matching a tradition id (`all`, or blank, returns everything). */
export function filterByTradition(id) {
  if (!id || id === "all") return SPIRITUAL_DESTINATIONS;
  return SPIRITUAL_DESTINATIONS.filter((d) => d.tradition.includes(id));
}

/**
 * Free-text search over the fields a visitor can actually see: name, place,
 * district and the heritage label. Language-agnostic on purpose, so an
 * Assamese query matches the Assamese copy and an English query the English.
 * Composes with the tradition filter rather than replacing it.
 */
export function searchSpiritual(query, traditionId = "all") {
  const q = (query || "").trim().toLowerCase();
  const base = filterByTradition(traditionId);
  if (!q) return base;
  const haystack = (d) =>
    [
      d.name.en, d.name.as,
      d.place.en, d.place.as,
      d.district.en, d.district.as,
      d.kind.en, d.kind.as,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  return base.filter((d) => haystack(d).includes(q));
}

/**
 * Only the traditions that genuinely have a matching destination, in
 * TRADITIONS order. This is what guarantees the filter bar can never show an
 * empty or misleading tab — a category only exists because a place is in it.
 */
export function availableTraditions() {
  return TRADITIONS.filter(
    (t) =>
      t.id === "all" ||
      SPIRITUAL_DESTINATIONS.some((d) => d.tradition.includes(t.id)),
  );
}

/** District names present in the catalogue, in data order. */
export function spiritualDistricts() {
  const seen = new Set();
  const out = [];
  for (const d of SPIRITUAL_DESTINATIONS) {
    if (seen.has(d.district.en)) continue;
    seen.add(d.district.en);
    out.push(d.district);
  }
  return out;
}

/** A small, deliberately varied selection for the Culture-home strip. */
export function featuredSpiritual(limit = 4) {
  const picks = [
    "kamakhya-temple",
    "hayagriva-madhava-hajo",
    "gurdwara-guru-tegh-bahadur-sahib",
    "sattras-of-majuli",
  ]
    .map((id) => SPIRITUAL_DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean);
  if (picks.length >= limit) return picks.slice(0, limit);
  const rest = SPIRITUAL_DESTINATIONS.filter((d) => !picks.includes(d));
  return [...picks, ...rest].slice(0, limit);
}
