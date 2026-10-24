/**
 * CULTURE section — information architecture modelled on Incredible India
 * (incredibleindia.gov.in). Their taxonomy is three pillars:
 *   Destinations · Experiences · Culture
 * We map every pillar onto authentic Assam content (no fabricated copy).
 * The rich detail pages that already exist (Districts, Heritage, Artists,
 * Wildlife, Handicrafts, State Symbols, Facts) become the linked destinations,
 * so this hub is a curated front-door over real pages — nothing is lost.
 *
 * The JSON file stores the long arrays while this module exposes the pieces
 * used by the Culture pages.
 * Images: local verified photographs in public/images/culture/
 * (see cultureImages.js). All copy is bilingual { en, as }.
 */
import data from "./cultureSections.json" with { type: "json" };

export const PILLARS = data.PILLARS;
export const EXPERIENCES = data.EXPERIENCES;
export { SPIRITUAL_DESTINATIONS as SPIRITUAL } from "./spiritualDestinations.js";
export const CUISINE = data.CUISINE;
export const ADVENTURE = data.ADVENTURE;
export const WELLNESS = data.WELLNESS;
export const REGIONS = data.REGIONS;
export const CULTURE_HERO = data.CULTURE_HERO;
export const HERO_SLIDES = data.HERO_SLIDES;
