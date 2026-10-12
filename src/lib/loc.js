import { useApp } from "../store/AppContext";

/**
 * useLoc — language-aware accessor for DATA content.
 *
 * Data objects store translatable text as { en: "...", as: "..." } (or keep a
 * plain string, which is language-neutral like names/emails). `L(value)`
 * returns the string for the current site language, falling back to English.
 *
 *   const { L, lang, t } = useLoc();
 *   <p>{L(item.about)}</p>
 */
export function useLoc() {
  const { t, lang } = useApp();
  const L = (v) =>
    v && typeof v === "object" && !Array.isArray(v) && ("as" in v || "en" in v)
      ? (v[lang] ?? v.en ?? "")
      : v;
  return { L, lang, t };
}
