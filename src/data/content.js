/**
 * Public content barrel used by the API fallback and a few legacy pages.
 *
 * Prefer importing the focused modules directly:
 *   site/brand.js · site/hero.js · site/heritage.js · site/experiences.js
 *   site/artists.js · assam/highlights.js · assam/food.js · assam/culture.js
 *   assam/guide.js
 */

/* site */
export { BRAND, NAV, FOOTER } from "./site/brand.js";
export { HERO, INTRO } from "./site/hero.js";
export { ARCHITECTURE, SUITES, DINING } from "./culture/site/heritage.js";
export { EXPERIENCES, GALLERY, LOCATION, FINALE } from "./culture/site/experiences.js";
export { ZUBEEN_GARG, assamArtists } from "./culture/site/artists.js";

/* assam */
export { assamHighlights, assamFamous, ASSAM_WORK } from "./culture/assam/highlights.js";
export { ASSAM_FOOD } from "./culture/assam/food.js";
export { ASSAM_CULTURE, ASSAM_HANDICRAFTS, ASSAM_HERITAGE } from "./culture/assam/culture.js";
export { ASSAM_GUIDE } from "./travel/assam/guide.js";
