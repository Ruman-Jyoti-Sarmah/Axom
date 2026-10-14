import { useState } from "react";
import { DISTRICTS, slugify } from "../data/districts";

/** Group districts by division for the three-dots menu. */
export function groupDistricts(districts) {
  const groups = {};
  for (const d of districts) {
    const div = d.division || "Other";
    (groups[div] = groups[div] || []).push(d);
  }
  return Object.keys(groups)
    .sort((a, b) => a.localeCompare(b))
    .map((div) => ({ division: div, items: groups[div] }));
}

/** The three-dots (hamburger) menu — districts + extra pages, one tap each. */
export function ThreeDots({ t, pick, onClose, open }) {
  const [q, setQ] = useState("");
  if (!open) return null;

  const query = q.trim().toLowerCase();
  const find = (v) => {
    const en = String(v ?? "").toLowerCase();
    const asv = String(pick?.(v) ?? "").toLowerCase();
    return en.includes(query) || asv.includes(query);
  };
  const groups = groupDistricts(
    query.length < 2
      ? DISTRICTS
      : DISTRICTS.filter(
          (d) => find(d.name) || find(d.hq) || find(d.division) || find(d.tag),
        ),
  );

  return (
    <div
      className="three-dots"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="three-dots__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="three-dots__panel"
        role="dialog"
        aria-label={t("menu") || "Menu"}
      >
        <div className="three-dots__head">
          <div className="three-dots__heading">
            <span className="three-dots__title">{t("menu")}</span>
            <span className="three-dots__tagline">{t("menu_tagline")}</span>
          </div>
          <button
            className="three-dots__close"
            onClick={onClose}
            aria-label={t("close")}
          >
            ✕
          </button>
        </div>

        <div className="three-dots__quick">
          {[
            { icon: "🏛️", label: t("menu_symbols"), href: "#/symbols" },
            { icon: "🍽️", label: t("menu_facts"), href: "#/facts" },
          ].map((q) => (
            <button
              key={q.href}
              type="button"
              className="three-dots__chip"
              onClick={() => {
                onClose();
                window.location.hash = q.href;
              }}
            >
              <span className="three-dots__chip-icon" aria-hidden="true">
                {q.icon}
              </span>
              <span className="three-dots__chip-label">{q.label}</span>
            </button>
          ))}
        </div>

        <div className="three-dots__search">
          <input
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_placeholder")}
            aria-label={t("search_placeholder")}
          />
        </div>

        <div className="three-dots__section">
          <h2 className="three-dots__section-title">{t("menu_districts")}</h2>
          {groups.length === 0 && (
            <p className="three-dots__empty">
              {t("no_results") || "No districts found."}
            </p>
          )}
          {groups.map((g) => (
            <div key={g.division} className="three-dots__group">
              <span className="three-dots__group-name">
                {pick ? pick(g.division) : g.division}
              </span>
              <div className="three-dots__rows">
                {g.items.map((d) => (
                  <button
                    key={d.no}
                    type="button"
                    className="three-dots__row"
                    onClick={() => {
                      onClose();
                      window.location.hash = `#/district/${slugify(d.name)}`;
                    }}
                  >
                    <span className="three-dots__row-name">
                      {pick ? pick(d.name) : d.name}
                    </span>
                    <span className="three-dots__row-sub">
                      {pick ? pick(d.hq) : d.hq} ·{" "}
                      {pick ? pick(d.division) : d.division}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="three-dots__section">
          <h2 className="three-dots__section-title">{t("menu_pages")}</h2>
          <div className="three-dots__rows">
            {[
              { label: t("menu_home"), href: "#/travel" },
              { label: t("menu_symbols"), href: "#/symbols" },
              { label: t("menu_facts"), href: "#/facts" },
              { label: t("menu_culture"), href: "#/culture" },
              { label: t("menu_handicrafts"), href: "#/handicrafts" },
              { label: t("menu_guide"), href: "#/guide" },
              { label: t("menu_heritage"), href: "#/heritage" },
              { label: t("menu_journey"), href: "#/journey" },
              { label: t("menu_visit"), href: "#/visit" },
            ].map((link) => (
              <button
                key={link.href}
                type="button"
                className="three-dots__row"
                onClick={() => {
                  onClose();
                  if (link.href.startsWith("#/"))
                    window.location.hash = link.href;
                  else
                    try {
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    } catch {}
                }}
              >
                <span className="three-dots__row-name">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="three-dots__foot">
          <a href="#/journey" className="btn btn--solid" onClick={onClose}>
            {t("reserve")}
          </a>
          <a href="#/travel" className="btn btn--ghost" onClick={onClose}>
            {t("home")}
          </a>
        </div>
      </div>
    </div>
  );
}
