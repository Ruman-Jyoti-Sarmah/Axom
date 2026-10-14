/**
 * section.js — the app is split into TWO parts:
 *   CULTURE  (Incredible-India style cultural portal) — opens first
 *   TRAVEL   (trip planning across Assam) — reached via the navbar switcher
 *
 * A "section" is derived purely from the URL hash so both the router and the
 * navbar always agree, and the choice survives reloads & back/forward.
 */
export const CULTURE = "culture";
export const TRAVEL = "travel";

/** Routes that belong to the TRAVEL section (trip planning). */
const TRAVEL_HASHES = new Set([
  "#/travel",
  "#/trip",
  "#/trip/plan",
  "#/trip/itinerary",
  "#/districts",
  "#/stays",
  "#/journey",
  "#/visit",
  "#/guide",
]);

/** Routes that belong to the CULTURE section (what Assam is). */
const CULTURE_HASHES = new Set([
  "#/culture",
  "#/heritage",
  "#/artists",
  "#/handicrafts",
  "#/symbols",
  "#/facts",
  "#/wildlife",
]);

/**
 * Which section does a given hash belong to?
 * District pages and experience pages resolve by prefix. Anything unknown
 * (including the empty hash that lands on the home/culture hub) is CULTURE,
 * so the very first screen a visitor sees is the Culture portal.
 */
export function getSection(hash) {
  const h = (hash || "").trim();
  if (!h || h === "#" || h === "#top" || h === "#home" || h === "#/") return CULTURE;
  if (h.startsWith("#/culture")) return CULTURE;
  if (h.startsWith("#/travel")) return TRAVEL;
  if (h.startsWith("#/district/")) return TRAVEL; // district detail = travel
  if (TRAVEL_HASHES.has(h)) return TRAVEL;
  if (CULTURE_HASHES.has(h)) return CULTURE;
  // Legacy culture-ish pages default to culture; everything else to culture.
  return CULTURE;
}

/** The landing hash for each section (where the switcher sends you). */
export const SECTION_HOME = {
  [CULTURE]: "#/culture",
  [TRAVEL]: "#/travel",
};

/** The opposite section — used by the switcher toggle. */
export const otherSection = (section) => (section === CULTURE ? TRAVEL : CULTURE);
