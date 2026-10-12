import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../lib/storage";
import { STRINGS } from "../data/i18n";
import AS from "../data/asData";

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useLocalStorage("axom:lang", "en");
  const [favourites, setFavourites] = useLocalStorage("axom:favs", []);
  const [bookings, setBookings] = useLocalStorage("axom:bookings", []);

  // keep <html lang> in sync for accessibility + fonts
  useEffect(() => {
    document.documentElement.lang = lang === "as" ? "as" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const t = (k, ...a) => {
      const v = STRINGS[lang]?.[k] ?? STRINGS.en[k];
      return typeof v === "function" ? v(...a) : v;
    };
    // Resolve a data value for the active language.
    //  - { en, as } object -> pick the active language (English fallback).
    //  - plain string in Assamese mode -> look up the English source in the
    //    asData dictionary (English -> Assamese) so district data, attractions
    //    and history paragraphs translate too. Falls back to the source string.
    //  - plain string in English mode -> pass through untouched.
    const pick = (v) => {
      if (v && typeof v === "object" && ("en" in v || "as" in v)) {
        return (lang === "as" ? v.as ?? v.en : v.en ?? v.as) ?? "";
      }
      if (lang === "as" && typeof v === "string") {
        return AS[v] ?? v;
      }
      return v;
    };
    const toggleFav = (slug) =>
      setFavourites((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug]));
    const isFav = (slug) => favourites.includes(slug);
    const addBooking = (b) => setBookings((p) => [b, ...p]);
    return {
      lang, setLang, t, pick,
      favourites, toggleFav, isFav,
      bookings, addBooking,
      toggleLang: () => setLang((l) => (l === "en" ? "as" : "en")),
    };
  }, [lang, favourites, setLang, setFavourites, bookings, setBookings]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export const useApp = () => useContext(AppCtx);
