/**
 * riverImageCredits.js — Rivers of Assam photo registry.
 *
 * Data now lives in ./riverImageCredits.json. This module remains as a
 * compatibility wrapper so existing imports (RiverDetail, RiversHome)
 * keep working unchanged — both the RIVER_CREDITS export and the
 * riverCreditFor helper are preserved.
 */
import data from "./riverImageCredits.json" with { type: "json" };

export const RIVER_CREDITS = data.RIVER_CREDITS;

export function riverCreditFor(file) {
  return RIVER_CREDITS.find((c) => c.file === file) || null;
}
