import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DISTRICTS } from "../data/districts";
import { getStays, STAYS } from "../data/stays";
import { HERO } from "../data/content";
import { useApp } from "../store/AppContext";
import { useDebounce } from "../lib/useDebounce";

const DIVISIONS = ["Lower Assam", "North Assam", "Upper Assam", "Central Assam", "Barak Valley"];

/**
 * Standalone page: STAYS ACROSS ASSAM
 * All 35 districts' stays in one searchable, filterable, bookable hub.
 */

export function StaysPage() {
  const { t, pick } = useApp();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const debouncedQ = useDebounce(q, 250);

  // flattened stays with district context (35/35 districts confirmed: 87 stays)
  const allStays = useMemo(() => {
    return DISTRICTS.map((d) =>
      getStays(d.slug).map((s) => ({ ...s, district: d.name, division: d.division }))
    ).flat();
  }, []);

  const filtered = useMemo(() => {
    const k = debouncedQ.trim().toLowerCase();
    return allStays.filter((s) => {
      if (type !== "all" && s.type !== type) return false;
      if (!k) return true;
      const hay = `${s.name} ${s.area} ${s.district} ${pick(s.district)} ${s.hq} ${s.division} ${pick(s.division)}`.toLowerCase();
      return hay.includes(k);
    });
  }, [allStays, type, debouncedQ, pick]);

  const isGrouped = !debouncedQ.trim() && type === "all";
  const groups = useMemo(() => {
    if (!isGrouped) return [];
    const by = {};
    filtered.forEach((s) => {
      (by[s.division] = by[s.division] || []).push(s);
    });
    return DIVISIONS.filter((d) => by[d]).map((d) => ({ division: d, stays: by[d] }));
  }, [filtered, isGrouped]);

  return (
    <section className="stays-page" id="top">
      {/* Hero */}
      <div className="visit__hero">
        <div className="visit__bg">
          <img src={HERO.image} alt="" />
        </div>
        <div className="visit__veil"></div>
        <div className="visit__hero-content">
          <div className="visit__hero-ctl">
            <a className="btn btn--ghost" href="#top">
              {t("visit_back")}
            </a>
          </div>
          <p className="visit__kicker">{t("stays_page_kicker")}</p>
          <h1 className="visit__title">{t("stays_page_l1")}</h1>
          <p className="visit__tag">{t("stays_page_l2")}</p>
          <p className="visit__sub">{t("stays_page_intro")}</p>
        </div>
      </div>

      <div className="dlist">
        {/* Intro */}
        <div className="dlist__intro">
          <span className="label">{t("stays_page_kicker")}</span>
          <h2>{t("stays_page_l1")}</h2>
          <p className="dlist__sub">{t("stays_page_intro")}</p>
        </div>

        {/* Stats */}
        <div className="dlist__stats">
          <span>{t("dlist_stat_districts")} <strong>35</strong></span>
          <span>{t("dlist_stat_divisions")} <strong>5</strong></span>
          <span>{t("stays_count", 87)}</span>
          <span>Stays live on <strong>Booking · Agoda · Google</strong></span>
        </div>

        {/* Toolbar */}
        <div className="dlist__toolbar">
          <div className="dlist__search">
            <Search size={14} />
            <input
              className="dlist__search-in"
              type="search"
              placeholder={t("stays_search")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label={t("stays_search")}
            />
            {q && (
              <button
                type="button"
                className="dlist__search-x"
                onClick={() => setQ("")}
                aria-label={t("clear")}
              >
                ×
              </button>
            )}
          </div>
          <div className="dlist__sort">
            <label className="label">{t("stays_any_type")}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label={t("stays_any_type")}
            >
              <option value="all">{t("stays_any_type")}</option>
              <option value="hotel">{t("type_hotel")}</option>
              <option value="resort">{t("type_resort")}</option>
              <option value="heritage">{t("type_heritage")}</option>
              <option value="homestay">{t("type_homestay")}</option>
              <option value="lodge">{t("type_lodge")}</option>
              <option value="camp">{t("type_camp")}</option>
              <option value="circuit">{t("type_circuit")}</option>
              <option value="bungalow">{t("type_bungalow")}</option>
              <option value="guesthouse">{t("type_guesthouse")}</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {isGrouped ? (
          groups.length === 0 ? (
            <div className="dlist__empty">
              <p className="dlist__empty-label">{t("stays_page_l1")}</p>
              <p className="dlist__empty-sub">{t("no_results")}</p>
            </div>
          ) : (
            groups.map((g) => (
              <div className="dlist__group" key={g.division}>
                <div className="dlist__group-head">
                  <span className="dlist__devider"></span>
                  <h3 className="dlist__gtitle">{pick(g.division)}</h3>
                  <p className="dlist__gsub">{g.stays.length} {t("stays_count", g.stays.length)}</p>
                </div>
                <div className="stays__grid">
                  {g.stays.map((s) => (
                    <StayCard key={s.name} stay={s} t={t} district={pick(s.district)} />
                  ))}
                </div>
              </div>
            ))
          )
        ) : filtered.length === 0 ? (
          <div className="dlist__empty">
            <p className="dlist__empty-label">{t("stays_page_l1")}</p>
            <p className="dlist__empty-sub">{t("no_results")}</p>
          </div>
        ) : (
          <div className="stays__grid">
            {filtered.map((s) => (
              <StayCard key={s.name} stay={s} t={t} district={pick(s.district)} />
            ))}
          </div>
        )}

        {/* Foot */}
        <div className="dlist__foot">
          <a className="btn btn--ghost" href="#top">
            {t("visit_back")}
          </a>
          <a className="btn btn--solid" href="#suites">
            {t("stays_view_all")}
          </a>
        </div>
      </div>
    </section>
  );
}

