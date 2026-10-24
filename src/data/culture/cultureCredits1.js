/**
 * Credits part 1: heritage, festivals, crafts, performance.
 *
 * Data now lives in ./cultureCredits1.json. This module remains as a
 * compatibility wrapper so existing imports (AssamCulture) keep working
 * unchanged.
 */
import data from "./cultureCredits1.json" with { type: "json" };

export const PART1 = data.PART1;
