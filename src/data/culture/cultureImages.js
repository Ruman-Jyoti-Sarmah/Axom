/**
 * cultureImages.js — local Culture photo library.
 *
 * Every entry points at a photograph stored under public/images/culture/
 * that was downloaded from its verified Wikimedia Commons source page.
 * No hotlinked Commons thumbnails, no AI images, no generic stock.
 * See cultureImageCredits.js for title / author / licence per file.
 *
 * The named export is useful for tests and the default export keeps image
 * lookups concise inside Culture components.
 */
import data from "./cultureImages.json" with { type: "json" };

export const CULTURE_IMG = data.CULTURE_IMG;

export default CULTURE_IMG;
