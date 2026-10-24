/**
 * Practical travel guide — how to reach Assam, best season, where to stay.
 *
 * Data now lives in ./guide.json. This module remains as a compatibility
 * wrapper so existing imports (AssamTravelGuide, content.js) keep working
 * unchanged.
 */
import data from "./guide.json" with { type: "json" };

export const ASSAM_GUIDE = data.ASSAM_GUIDE;
