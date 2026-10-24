/**
 * Credits part 2: cuisine, spiritual, reused verified files.
 *
 * Data now lives in ./cultureCredits2.json. This module remains as a
 * compatibility wrapper so existing imports (AssamCulture) keep working
 * unchanged.
 */
import data from "./cultureCredits2.json" with { type: "json" };

export const PART2 = data.PART2;
