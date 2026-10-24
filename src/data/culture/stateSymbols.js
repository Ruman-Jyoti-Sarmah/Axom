// Official state symbols of Assam — accredited by the Government of Assam.
// Source: https://en.wikipedia.org/wiki/List_of_Assam_state_symbols
// Images via Wikimedia Commons (Special:FilePath — reliable, no arbitrary thumb widths).
//
// Data now lives in ./stateSymbols.json. The generated Commons URLs are stored
// as exact strings (width=1200, fully percent-encoded), so the original W()
// helper is no longer needed at runtime. This module remains as a
// compatibility wrapper so existing imports keep working unchanged — the
// named export STATE_SYMBOLS is preserved.
import data from "./stateSymbols.json" with { type: "json" };

export const STATE_SYMBOLS = data.STATE_SYMBOLS;
