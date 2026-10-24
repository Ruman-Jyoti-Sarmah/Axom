/**
 * Experience cards, the image gallery, the location panel and the finale.
 *
 * Data now lives in ./experiences.json. This module remains as a compatibility
 * wrapper so existing imports (Experiences, Finale, Gallery, Location, Visit,
 * content.js) keep working unchanged.
 */
import data from "./experiences.json" with { type: "json" };

export const EXPERIENCES = data.EXPERIENCES;
export const GALLERY = data.GALLERY;
export const LOCATION = data.LOCATION;
export const FINALE = data.FINALE;
