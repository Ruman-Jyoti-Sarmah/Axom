import AS from "../data/asData";

/**
 * pick — read a value by current language.
 *   pick({en:"...", as:"..."}, lang) -> string in that language
 *   pick("English source", "as")     -> the Assamese translation from asData
 *   pick("plain string", "en")       -> the string untouched
 *   pick(["a","b"], lang)            -> the array untouched
 * District data (names, HQs, tags, histories, attractions) is stored as plain
 * English strings; when the language is Assamese we look the source text up in
 * the asData dictionary so every screen switches language with no data change.
 */
export function pick(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? "";
  }
  if (lang === "as" && typeof value === "string") {
    return AS[value] ?? value;
  }
  return value;
}
