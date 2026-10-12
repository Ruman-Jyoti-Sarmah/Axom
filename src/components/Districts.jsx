import { useMemo, useState } from "react";
import { Heart, Search, ArrowUpDown, X } from "lucide-react";
import { DISTRICTS, slugify } from "../data/districts";
import { useApp } from "../store/AppContext";
import { useDebouncedValue } from "../lib/storage";

const DIVISIONS = ["All", "Lower Assam", "North Assam", "Upper Assam", "Central Assam", "Barak Valley"];

/**
 * STANDALONE PAGE (#/districts) — all 35 districts at once.
 * Hero + division filter chips + responsive card grid; every card opens
 * its district page. Grid filters instantly (CSS transitions only).
 */
export default function Districts() {
  const { t, pick, favourites, toggleFav, isFav } = useApp();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("no");
  const [favOnly, setFavOnly] = useState(false);
  const q = useDebouncedValue(query.trim().toLowerCase(), 200);

  const list = useMemo(() => {
    let items = [...DISTRICTS];
    if (filter !== "All") items = items.filter((d) => d.division === filter);
    if (q) {
      // Search across both languages: the English source fields plus their
      // Assamese equivalents, so typing in either script finds the district.
      const find = (v) => {
        const en = String(v ?? "").toLowerCase();
        const asv = String(pick(v) ?? "").toLowerCase();
        return en.includes(q) || asv.includes(q);
      };
      items = items.filter((d) => find(d.name) || find(d.hq) || find(d.tag) || find(d.about) || find(d.division));
    }
    if (favOnly) items = items.filter((d) => favourites.includes(slugify(d.name)));
    items.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "division") return a.division.localeCompare(b.division) || a.no - b.no;
      return a.no - b.no;
    });
    return items;
  }, [filter, q, sort, favOnly, favourites, pick]);

  const searching = q || favOnly || filter !== "All";

  return (
    <section className="dlist" id="top" aria-label="All 35 districts of Assam">
      {/* page hero */}
      <div className="dlist__hero" data-reveal>
        <a className="label dlist__back" href="#top">← {t("home")}</a>
        <span className="label">{t("dlist_kicker")}</span>
        <h1 className="dlist__title">
          <span className="tr-line"><span className="tr-inner">{t("dlist_l1")}</span></span>
          <span className="tr-line"><span className="tr-inner"><em>{t("dlist_l2")}</em></span></span>
        </h1>
        <p className="dlist__intro">{t("dlist_intro")}</p>
        <div className="dlist__stats">
          <div><strong>35</strong><span className="label">{t("dlist_stat_districts")}</span></div>
          <div><strong>05</strong><span className="label">{t("dlist_stat_divisions")}</span></div>
          <div><strong>{favourites.length}</strong><span className="label">{t("favourites")}</span></div>
          <div><strong>01</strong><span className="label">{t("dlist_stat_soul")}</span></div>
        </div>
      </div>

      <div className="dlist__toolbar" data-reveal>
        <label className="dlist__search">
          <Search size={15} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            aria-label={t("search_placeholder")}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label={t("clear")}>
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </label>
        <label className="dlist__sort">
          <ArrowUpDown size={14} aria-hidden="true" />
          <span className="label">{t("sort_label")}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label={t("sort_label")}>
            <option value="no">{t("sort_no")}</option>
            <option value="name">{t("sort_name")}</option>
            <option value="division">{t("sort_division")}</option>
          </select>
        </label>
        <button
          className={`dlist__chip ${favOnly ? "dlist__chip--active" : ""}`}
          onClick={() => setFavOnly(!favOnly)}
          aria-pressed={favOnly}
        >
          <Heart size={13} aria-hidden="true" fill={favOnly ? "currentColor" : "none"} />
          {t("favourites_only")} ({favourites.length})
        </button>
      </div>

      <div className="dlist__filters" role="tablist" aria-label="Filter districts by division">
        {DIVISIONS.map((div) => (
          <button
            key={div}
            role="tab"
            aria-selected={filter === div}
            className={`dlist__chip ${filter === div ? "dlist__chip--active" : ""}`}
            onClick={() => setFilter(div)}
          >
            {div === "All" ? t("all_districts") : pick(div)}
          </button>
        ))}
      </div>

      <p className="label dlist__count" aria-live="polite">{t("results", list.length)}</p>

      {list.length === 0 ? (
        <div className="dlist__empty">
          <p>{t("no_results")}</p>
          <button
            className="btn btn--ghost"
            onClick={() => { setQuery(""); setFilter("All"); setFavOnly(false); }}
          >
            {t("clear")}
          </button>
        </div>
      ) : searching ? (
        <div className="dlist__grid dlist__grid--all">
          {list.map((d, i) => (
            <Card key={d.no} d={d} i={i} slug={slugify(d.name)} isFav={isFav(slugify(d.name))} onFav={() => toggleFav(slugify(d.name))} t={t} pick={pick} />
          ))}
        </div>
      ) : (
        DIVISIONS.slice(1).map((div) => {
          const items = list.filter((d) => d.division === div);
          return (
            <div className="dlist__group" key={div}>
              <div className="dlist__group-head">
                <span className="label">{pick(div)}</span>
                <i className="dlist__rule" aria-hidden="true" />
                <span className="label">{String(items.length).padStart(2, "0")} {t("dlist_stat_districts")}</span>
              </div>
              <div className="dlist__grid">
                {items.map((d, i) => (
                  <Card key={d.no} d={d} i={i} slug={slugify(d.name)} isFav={isFav(slugify(d.name))} onFav={() => toggleFav(slugify(d.name))} t={t} pick={pick} />
                ))}
              </div>
            </div>
          );
        })
      )}

      <div className="dlist__foot">
        <a className="btn btn--ghost" href="#top">← {t("dlist_back")}</a>
        <a className="btn btn--solid" href="#/visit">{t("dlist_plan")}</a>
      </div>
    </section>
  );
}

function Card({ d, i, slug, isFav, onFav, t, pick }) {
  return (
    <article className="dlist__card">
      <a className="dlist__media" href={`#/district/${slug}`} aria-label={`Open ${d.name} district page`}>
        <img src={d.image} alt={d.alt} loading={i < 6 ? "eager" : "lazy"} decoding="async" width="800" height="600" />
        <span className="dlist__num">{String(d.no).padStart(2, "0")}</span>
      </a>
      <button
        className={`favbtn favbtn--card ${isFav ? "favbtn--on" : ""}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
        aria-label={isFav ? t("fav_remove") : t("fav_add")}
        aria-pressed={isFav}
        title={isFav ? t("fav_remove") : t("fav_add")}
      >
        <Heart size={15} aria-hidden="true" fill={isFav ? "currentColor" : "none"} />
      </button>
      <div className="dlist__body">
        <span className="label dlist__division">{pick(d.division)}</span>
        <h3><a href={`#/district/${slug}`}>{pick(d.name)}</a></h3>
        <p className="dlist__hq"><span>{t("seat")}</span> {pick(d.hq)}</p>
        <p className="dlist__about">{pick(d.about)}</p>
        <a className="dlist__cta" href={`#/district/${slug}`}>{t("dlist_open")} <em>→</em></a>
      </div>
    </article>
  );
}

