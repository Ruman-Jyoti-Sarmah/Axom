/**
 * State food of Assam — signature dishes of the Brahmaputra belt.
 *
 * Data now lives in ./food.json. This module remains as a compatibility
 * wrapper so existing imports (AssamFacts, content.js) keep working
 * unchanged.
 */
import data from "./food.json" with { type: "json" };

export const ASSAM_FOOD = data.ASSAM_FOOD;
