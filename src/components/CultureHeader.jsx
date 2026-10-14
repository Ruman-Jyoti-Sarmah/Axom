import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  User,
  Landmark,
  MapPin,
} from "lucide-react";
import { BRAND } from "../data/content";
import { useApp } from "../store/AppContext";
import { useTrip } from "../store/TripContext";
import { pick } from "../lib/pick";
import { PILLARS } from "../data/cultureSections";
import SectionSwitcher from "./SectionSwitcher";

/* ── Top utility strip (like Incredible India) ─────────────────────── */
const UTILITY = [
  { en: "Travel for LiFE", as: "Travel for LiFE" },
  { en: "Colours of Assam", as: "অসমৰ ৰঙ" },
  { en: "FAQs", as: "সাধাৰণ প্ৰশ্ন" },
  { en: "Contact Us", as: "যোগাযোগ" },
  { en: "Privacy Policy", as: "গোপনীয়তা নীতি" },
  { en: "Terms of Use", as: "ব্যৱহাৰৰ চৰ্ত" },
];

/* ── Language selector (Incredible India offers many; we ship EN + অসমীয়া) ── */
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
];

/* ── Mega-menu columns (rich, region-grouped like the real site) ────── */
function buildColumns() {
  return {
    destinations: [
      {
        heading: { en: "By Interest", as: "আকৰ্ষণ অনুসৰি" },
        links: [
          {
            label: { en: "Popular Destinations", as: "জনপ্ৰিয় গন্তব্যস্থান" },
            href: "#/travel",
          },
          {
            label: { en: "Spiritual", as: "আধ্যাত্মিক" },
            href: "#/culture/experiences/spiritual",
          },
          { label: { en: "Heritage", as: "ঐতিহ্য" }, href: "#/heritage" },
          {
            label: { en: "Nature & Wildlife", as: "প্ৰকৃতি আৰু বন্যপ্ৰাণী" },
            href: "#/wildlife",
          },
        ],
      },
      {
        heading: { en: "Regions of Assam", as: "অসমৰ অঞ্চল" },
        links: [
          { label: { en: "Lower Assam", as: "তলত অসম" }, href: "#/travel" },
          {
            label: { en: "North Assam", as: "উত্তৰ অসম" },
            href: "#/travel",
          },
          { label: { en: "Upper Assam", as: "উপৰ অসম" }, href: "#/travel" },
          {
            label: { en: "Central Assam", as: "মধ্য অসম" },
            href: "#/travel",
          },
          {
            label: { en: "Barak Valley", as: "বৰাক উপত্যকা" },
            href: "#/travel",
          },
          {
            label: { en: "All 35 districts", as: "সকলো ৩৫ জিলা" },
            href: "#/travel",
          },
        ],
      },
    ],
    experiences: [
      {
        heading: { en: "Immersive", as: "নিমজ্জন" },
        links: [
          { label: { en: "Heritage", as: "ঐতিহ্য" }, href: "#/heritage" },
          {
            label: { en: "Art & Artists", as: "শিল্প আৰু শিল্পী" },
            href: "#/artists",
          },
          {
            label: { en: "Handicrafts & Shopping", as: "হস্তশিল্প আৰু বজাৰ" },
            href: "#/handicrafts",
          },
        ],
      },
      {
        heading: { en: "Senses", as: "ইন্দ্ৰিয়" },
        links: [
          {
            label: { en: "Food & Cuisine", as: "খাদ্য আৰু ৰন্ধনশৈলী" },
            href: "#/culture/experiences/cuisine",
          },
          {
            label: { en: "Spiritual", as: "আধ্যাত্মিক" },
            href: "#/culture/experiences/spiritual",
          },
          {
            label: { en: "Yoga & Wellness", as: "যোগ আৰু সুস্থতা" },
            href: "#/culture/experiences/yoga",
          },
          {
            label: { en: "Adventure", as: "দুঃসাহস" },
            href: "#/culture/experiences/adventure",
          },
        ],
      },
    ],
    travel: [
      {
        heading: { en: "Plan Your Visit", as: "দৰ্শনৰ পৰিকল্পনা" },
        links: [
          {
            label: { en: "Journey Planner", as: "যাত্ৰা পৰিকল্পনা" },
            href: "#/journey",
          },
          { label: { en: "Where to Stay", as: "ক'ত থাকিব" }, href: "#/stays" },
          {
            label: { en: "Travel Guide", as: "ভ্ৰমণ নিৰ্দেশনা" },
            href: "#/guide",
          },
          { label: { en: "Book / Enquire", as: "বুকিং কৰক" }, href: "#/visit" },
        ],
      },
    ],
  };
}
const COLUMNS = buildColumns();

/**
 * CultureHeader — the CULTURE section navbar, rebuilt to mirror the
 * incredibleindia.gov.in header: a slim top utility strip (Travel for LiFE,
 * FAQs, Contact, Privacy, Terms + language picker) sitting above a clean white
 * main bar with the logo, the Destinations · Experiences · Travel mega-menu,
 * a search field, a language dropdown and an account control. The section
 * switcher lives at the right so Culture ⟷ Travel is always one tap away.
 */
export default function CultureHeader({ section }) {
  const { t, lang, toggleLang } = useApp();
  const { count: tripCount } = useTrip();
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash);
  const [openPillar, setOpenPillar] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [q, setQ] = useState("");
  const closeTimer = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the route so the flat Travel nav links can show an active state.
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  /** Is a flat Travel link the current route? (#/district/… counts as Districts) */
  const isLinkActive = (href) =>
    hash === href ||
    (href === "#/districts" && hash.startsWith("#/district/"));

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpenPillar(null);
    setMobileOpen(false);
    if (href === "#top") {
      if ((window.location.hash || "") !== "#top") {
        window.location.hash = "#top";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    window.location.hash = href;
  };
  const enterPillar = (id) => {
    clearTimeout(closeTimer.current);
    setOpenPillar(id);
  };
  const leavePillar = () => {
    closeTimer.current = setTimeout(() => setOpenPillar(null), 150);
  };

  const pillars = [
    PILLARS.destinations,
    PILLARS.experiences,
    PILLARS.travel,
  ].filter(Boolean);
  const activeLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // TRAVEL section: simple flat links (pehle jaisa) instead of the Culture mega-menu.
  const TRAVEL_LINKS = [
    { label: t("home"), href: "#/travel" },
    { label: t("nav_districts"), href: "#/districts" },
    { label: t("nav_visit"), href: "#/visit" },
    { label: t("nav_journey"), href: "#/journey" },
  ];

  return (
    <header className={`chead ${scrolled ? "chead--scrolled" : ""}`}>
      {/* ── Top utility strip ─────────────────────────────────────── */}
      <div className="chead__strip">
        <div className="chead__strip-inner">
          <a
            className="chead__strip-brand"
            href="#/culture"
            onClick={(e) => go(e, "#/culture")}
          >
            <Landmark size={13} aria-hidden="true" />
            <span>{pick(BRAND.name, lang)}</span>
          </a>
          <nav className="chead__strip-links" aria-label="Utility">
            {UTILITY.map((u) => (
              <a key={u.en} href="#top" onClick={(e) => go(e, "#top")}>
                {pick(u, lang)}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Main white header ─────────────────────────────────────── */}
      <div className="chead__bar">
        <a
          className="chead__logo"
          href="#/culture"
          onClick={(e) => go(e, "#/culture")}
          aria-label={`${pick(BRAND.name, lang)} — ${t("switch_to_culture")}`}
        >
          <span className="chead__logo-mark" aria-hidden="true">
            <Landmark size={18} />
          </span>
          <span className="chead__logo-text">
            <strong>{pick(BRAND.name, lang)}</strong>
            <em>{t("switch_to_culture")}</em>
          </span>
        </a>

        <nav
          className="chead__nav"
          aria-label={t("a11y_primary")}
          onMouseLeave={leavePillar}
        >
          {section === "travel" ? (
            <ul className="chead__menu chead__menu--flat">
              {TRAVEL_LINKS.map((l) => (
                <li key={l.href} className="chead__item">
                  <a
                    className={`chead__link ${isLinkActive(l.href) ? "is-active" : ""}`}
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    aria-current={isLinkActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="chead__menu">
              {pillars.map((p) => {
                const isOpen = openPillar === p.id;
                return (
                  <li
                    key={p.id}
                    className={`chead__item ${isOpen ? "is-open" : ""}`}
                    onMouseEnter={() => enterPillar(p.id)}
                  >
                    <button
                      type="button"
                      className="chead__trigger"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenPillar(isOpen ? null : p.id)}
                    >
                      <span>{pick(p.label, lang)}</span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className="chead__chev"
                      />
                    </button>

                    {isOpen && (
                      <div
                        className="chead__panel"
                        role="menu"
                        onMouseEnter={() => enterPillar(p.id)}
                      >
                        <p className="chead__panel-blurb">
                          {pick(p.blurb, lang)}
                        </p>
                        <div className="chead__cols">
                          {COLUMNS[p.id].map((col) => (
                            <div key={col.heading.en} className="chead__col">
                              <span className="chead__col-head">
                                {pick(col.heading, lang)}
                              </span>
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.label.en}>
                                    <a
                                      href={l.href}
                                      onClick={(e) => go(e, l.href)}
                                      role="menuitem"
                                    >
                                      {pick(l.label, lang)}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div className="chead__tools">
          <div className="chead__search">
            <Search size={16} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search_placeholder")}
              aria-label={t("search_placeholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMobileOpen(false);
                  window.location.hash = "#/districts";
                }
              }}
            />
          </div>

          {/* My Trip — persistent link with selected-place count */}
          <a className="chead__trip" href="#/trip" aria-label={`${t("nav_my_trip")} (${tripCount})`}>
            <MapPin size={16} aria-hidden="true" />
            <span className="chead__trip-label">{t("nav_my_trip")}</span>
            <span className="chead__trip-count" data-empty={tripCount === 0 ? "true" : "false"}>
              {tripCount}
            </span>
          </a>

          {/* language dropdown */}
          <div className="chead__lang" ref={langRef}>
            <button
              className="chead__lang-btn"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <Globe size={15} aria-hidden="true" />
              <span>{activeLang.native}</span>
              <ChevronDown size={13} aria-hidden="true" />
            </button>
            {langOpen && (
              <ul className="chead__lang-menu" role="listbox">
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={l.code === lang}
                      className={l.code === lang ? "is-active" : ""}
                      onClick={() => {
                        if (l.code !== lang) toggleLang();
                        setLangOpen(false);
                      }}
                    >
                      <span>{l.native}</span>
                      <em>{l.label}</em>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* account */}
          <button
            className="chead__account"
            aria-label="Login / Register"
            title="Login / Register"
          >
            <User size={16} aria-hidden="true" />
            <span>Login</span>
          </button>

          <SectionSwitcher section={section} compact />

          <button
            className="chead__burger"
            aria-label={mobileOpen ? t("a11y_close_menu") : t("a11y_open_menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <nav className="chead__mobile" aria-label={t("a11y_mobile")}>
          {pillars.map((p) => (
            <div key={p.id} className="chead__mgroup">
              <span className="chead__mghead">{pick(p.label, lang)}</span>
              {COLUMNS[p.id].map((col) => (
                <div key={col.heading.en} className="chead__mcol">
                  <span className="chead__mcolhead">
                    {pick(col.heading, lang)}
                  </span>
                  {col.links.map((l) => (
                    <a
                      key={l.label.en}
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                    >
                      {pick(l.label, lang)}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="chead__mfoot">
            <SectionSwitcher section={section} />
            <a className="chead__mtrip" href="#/trip" onClick={(e) => { go(e, "#/trip"); setMobileOpen(false); }}>
              <MapPin size={15} aria-hidden="true" />
              {t("nav_my_trip")}
              <span className="chead__trip-count" data-empty={tripCount === 0 ? "true" : "false"}>
                {tripCount}
              </span>
            </a>
            <button className="chead__maccount" aria-label="Login / Register">
              <User size={15} aria-hidden="true" /> Login
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
