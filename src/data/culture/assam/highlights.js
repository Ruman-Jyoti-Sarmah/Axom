/**
 * State symbols at a glance, famous places of Assam, and the state at work.
 *
 * Data now lives in ./highlights.json. This module remains as a compatibility
 * wrapper so existing imports (AssamAtAGlance, AssamFacts, HomeFacts,
 * content.js) keep working unchanged.
 */
import data from "./highlights.json" with { type: "json" };

export const assamHighlights = data.assamHighlights;
export const assamFamous = data.assamFamous;
export const ASSAM_WORK = data.ASSAM_WORK;
