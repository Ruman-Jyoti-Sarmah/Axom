import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "../store/AppContext";
import {
  searchRivers,
  filterRiversBySystem,
  availableRiverSides,
  riverSystemLabel,
} from "../data/rivers";
import RiversAtlas from "./RiversAtlas";

const sideLabel = (s, lang = "en") =>
  s === "main" ? "Main river" : s === "north" ? "North-bank tributary" : s === "south" ? "South-bank tributary" : "Barak Valley tributary";

export default function RiversPage() {
  const { t, pick } = useApp();
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [side, setSide] = useState("all");

  const base = useMemo(
    () => filterRiversBySystem(system === "all" ? undefined : system),
    [system]
  );
  const filtered = useMemo(() => {
    const searched = new Set(searchRivers(query).map((r) => r.id));
    return base.filter((r) => searched.has(r.id) && (side === "all" || r.side === side));
  }, [query, side, base]);
  const groups = useMemo(() => {
    const order = ["main", "north", "south", "valley"];
    const out = [];
    for (const s of order) {
      const rows = filtered.filter((r) => r.side === s);
      if (rows.length) out.push({ side: s, rows });
    }
    return out;
  }, [filtered]);
  const systems = useMemo(() => new Set(filtered.map((r) => r.system)), [filtered]);
  const hasFilters = query !== "" || system !== "all" || side !== "all";
  const systemsList = ["brahmaputra", "barak"];

  return (
    <div className="rivers" id="top">
      <div className="rivers__hero">
        <img className="rivers__hero-bg" src="/images/rivers/brahmaputra-guwahati.jpg" alt="" aria-hidden="true" />
        <div className="rivers__veil" />
        <div className="rivers__hero-content">
          <p className="label">{t("rivers_hero_kicker")}</p>
          <h1 className="rivers__title">{t("rivers_title")}</h1>
          <p className="rh-sub">{t("rivers_intro")}</p>
        </div>
      </div>

      <div className="rivers__body">
        <p className="rivers__headline">{t("rivers_headline")}</p>
        <p className="rivers__subsume">{t("rivers_intro2")}</p>

        <div className="rivers__row">
          <div className="rivers__tools">
            <div className="rivers__search-wrap">
              <label htmlFor="rivers-search" className="visually-hidden">{t("rivers_search_label")}</label>
              <input id="rivers-search" className="rivers__search" type="search" placeholder={t("rivers_search_placeholder")} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="rivers__filters">
              <button type="button" className="rivers__filter" aria-selected={system === "all"} onClick={() => setSystem("all")}>{t("rivers_all_systems")}</button>
              {systemsList.map((s) => <button key={s} type="button" className="rivers__filter" aria-selected={system === s} onClick={() => setSystem(s)}>{pick(riverSystemLabel(s, "en"))}</button>)}
            </div>
            <div className="rivers__filters">
              <button type="button" className="rivers__filter" aria-selected={side === "all"} onClick={() => setSide("all")}>{t("rivers_all_banks")}</button>
              {availableRiverSides({ system }).map((s) => <button key={s} type="button" className="rivers__filter" aria-selected={side === s} onClick={() => setSide(s)}>{pick(sideLabel(s, "en"))}</button>)}
            </div>
          </div>

          <div className="rivers__cards">
            {hasFilters ? <p className="rivers__result-count">{pick(t("rivers_results", { count: filtered.length }))}</p> : null}
            {groups.length === 0 ? <p className="rivers__empty">{pick(t("rivers_empty"))}</p> : null}
            {groups.map((g) => (
              <div key={g.side} className="rivers__group">
                <p className="rivers__group-title">{pick(sideLabel(g.side, "en"))}</p>
                <div className="rivers__grid">
                  {g.rows.map((r) => (
                    <article className="rh-card" key={r.id}>
                      <img className="rh-card-media" src={r.image} alt={pick(r.alt, "en")} loading="lazy" />
                      <div className="rh-card-body">
                        <h3 className="rh-card-name">{pick(r.name, "en")}</h3>
                        {(r.aliases?.en?.[0] || r.aliases?.as?.[0]) ? <p className="rh-card-aliases">{pick(r.aliases.en[0] || r.aliases.as[0])}</p> : null}
                        <span className="rh-card-side">{pick(sideLabel(r.side, "en"))}</span>
                        <span className="rh-card-system">{pick(riverSystemLabel(r.system, "en"))}</span>
                        <a className="rh-card-link" href={`#/river/${r.id}`}>{t("rivers_view")}: {pick(r.name, "en")} <ArrowRight size={14} aria-hidden="true" /></a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filtered.some((r) => r.system === "brahmaputra") || filtered.some((r) => r.system === "barak") ? (
          <div className="rivers__map">
            <RiversAtlas systems={[...systems]} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
