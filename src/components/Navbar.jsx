import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, Globe, MoreHorizontal } from "lucide-react";
import { BRAND } from "../data/content";
import { useApp } from "../store/AppContext";
import { pick } from "../lib/pick";
import { DISTRICTS, slugify } from "../data/districts";
import { ThreeDots } from "./ThreeDots";

const LINKS = (t) => [
  { label: t("home"), href: "#home" },
  { label: t("nav_stays"), href: "#/stays" },
  { label: t("nav_districts"), href: "#/districts" },
  { label: t("nav_visit"), href: "#/visit" },
  { label: t("nav_journey"), href: "#/journey" },
  { label: t("nav_artists"), href: "#/artists" },
  { label: t("nav_wildlife"), href: "#/wildlife" },
];

export default function Navbar() {
  const { t, lang, toggleLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showResults, setShowResults] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setShowResults(false);
    setQ("");
    if (href === "#home") {
      if (window.location.hash) {
        window.location.hash = "";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("#/") || window.location.hash.startsWith("#/district")) {
      window.location.hash = href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const query = q.trim().toLowerCase();
  // Search both languages: English source + Assamese translation.
  const find = (v) => {
    const en = String(v ?? "").toLowerCase();
    const asv = String(pick(v, lang) ?? "").toLowerCase();
    return en.includes(query) || asv.includes(query);
  };
  const results =
    query.length < 2
      ? []
      : DISTRICTS.filter((d) => find(d.name) || find(d.hq) || find(d.tag) || find(d.division)).slice(0, 6);

  const navLinks = LINKS(t);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#top" className="nav__logo" onClick={(e) => go(e, "#top")} aria-label={`${pick(BRAND.name, lang)} — ${t("home")}`}>
          {pick(BRAND.name, lang)}
        </a>
        <nav aria-label={t("a11y_primary")}>
          <ul className="nav__links">
            {navLinks.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__tools">
          <div className="nav__search" ref={boxRef}>
            <Search size={15} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              placeholder={t("search_placeholder")}
              aria-label={t("search_placeholder")}
            />
            {showResults && results.length > 0 && (
              <ul className="nav__results" role="listbox" aria-label={t("a11y_district_results")}>
                {results.map((d) => (
                  <li key={d.no}>
                    <a
                      href={`#/district/${slugify(d.name)}`}
                      onClick={(e) => go(e, `#/district/${slugify(d.name)}`)}
                    >
                      <strong>{pick(d.name, lang)}</strong>
                      <span>{pick(d.hq, lang)} · {pick(d.division, lang)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="nav__lang" onClick={toggleLang} aria-label={lang === "en" ? "অসমীয়া — switch to Assamese" : "EN — switch to English"} title="EN / অসমীয়া">
            <Globe size={14} aria-hidden="true" /> {lang === "en" ? "অসমীয়া" : "EN"}
          </button>
          <a href="#/visit" className="nav__book" onClick={(e) => go(e, "#/visit")}>{t("reserve")}</a>
          <button
            className="three-dots-toggle"
            aria-label={t("menu")}
            title={t("menu")}
            onClick={() => setDotsOpen(true)}
          >
            <MoreHorizontal size={18} aria-hidden="true" />
          </button>
        </div>
        <button
          className="nav__toggle"
          aria-label={open ? t("a11y_close_menu") : t("a11y_open_menu")}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </header>
      {open && (
        <nav className="nav__menu" aria-label={t("a11y_mobile")}>
          <div className="nav__search nav__search--mobile">
            <Search size={15} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search_placeholder")}
              aria-label={t("search_placeholder")}
            />
          </div>
          {query.length >= 2 && results.map((d) => (
            <a key={d.no} href={`#/district/${slugify(d.name)}`} onClick={(e) => go(e, `#/district/${slugify(d.name)}`)}>
              {pick(d.name, lang)}
            </a>
          ))}
          {navLinks.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>
          ))}
          <a href="#/visit" onClick={(e) => go(e, "#/visit")}>{t("reserve")}</a>
          <button className="btn btn--ghost" onClick={toggleLang}>
            {lang === "en" ? "অসমীয়াত চাওক" : "View in English"}
          </button>
        </nav>
      )}
      <ThreeDots t={t} pick={(v) => pick(v, lang)} open={dotsOpen} onClose={() => setDotsOpen(false)} />
    </>
  );
}

