/**
 * Culture homepage editorial data — BELOW the existing hero.
 * All images are local verified photographs in public/images/culture/.
 * Drawn only from verified project data. No invented dates/prices/addresses.
 *
 * The JSON file keeps long editorial copy separate from the named exports used
 * by the page components.
 */
import data from "./cultureHome.json" with { type: "json" };

export const LIVING_HERITAGE_FEATURE = data.LIVING_HERITAGE_FEATURE;

export const HERITAGE_ROWS = data.HERITAGE_ROWS;

export const FESTIVAL_STRIP = data.FESTIVAL_STRIP;

export const CRAFT_FEATURES = data.CRAFT_FEATURES;

export const PERFORMANCE_WIDE = data.PERFORMANCE_WIDE;

export const PERFORMANCE_CARDS = data.PERFORMANCE_CARDS;

export const CUISINE_BAND = data.CUISINE_BAND;

export const EXPLORE_TILES = data.EXPLORE_TILES;
