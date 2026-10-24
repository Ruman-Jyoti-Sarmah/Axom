/**
 * Culture, handicrafts and heritage chapters for the Assam section.
 *
 * Data now lives in ./culture.json. This module remains as a compatibility
 * wrapper so existing imports (AssamFacts, AssamCulture, AssamHandicrafts,
 * AssamHeritage, ExperiencesHub, content.js) keep working unchanged.
 */
import data from "./culture.json" with { type: "json" };

export const ASSAM_CULTURE = data.ASSAM_CULTURE;
export const ASSAM_HANDICRAFTS = data.ASSAM_HANDICRAFTS;
export const ASSAM_HERITAGE = data.ASSAM_HERITAGE;
