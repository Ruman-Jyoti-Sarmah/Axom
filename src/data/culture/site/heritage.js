/**
 * Ahom legacy chapter, the room/suite catalogue and the dining chapter.
 *
 * Data now lives in ./heritage.json. This module remains as a compatibility
 * wrapper so existing imports (Architecture, Rooms, Dining, content.js)
 * keep working unchanged.
 */
import data from "./heritage.json" with { type: "json" };

export const ARCHITECTURE = data.ARCHITECTURE;
export const SUITES = data.SUITES;
export const DINING = data.DINING;
