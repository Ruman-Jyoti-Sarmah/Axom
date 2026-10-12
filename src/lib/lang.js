/**
 * Bilingual content helper.
 *
 * Every user-facing string in the data layer is stored as
 *   { en: "English…", as: "অসমীয়া…" }
 * `pick(v, lang)` returns the string for the active language (falling back to
 * `en`). Plain strings pass through untouched, so this is safe to call on any
 * value.
 */
export function pick(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if ("en" in value || "as" in value) return value[lang] ?? value.en ?? value.as ?? "";
  }
  return value;
}

/** Map a bilingual field over a whole list of items. */
export function pickAll(list, lang) {
  return list.map((item) => {
    const out = { ...item };
    for (const [k, v] of Object.entries(item)) {
      if (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "as" in v)) {
        out[k] = pick(v, lang);
      }
    }
    return out;
  });
}
