import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "../store/AppContext";
import { RIVERS, riverSystemLabel } from "../data/rivers";
import { riverCreditFor } from "../data/riverImageCredits";
import ScrollHint from "./ScrollHint";

const sideLabel = (s, lang = "en") =>
  s === "main"
    ? "Main river"
    : s === "north"
    ? "North-bank tributary"
    : s === "south"
    ? "South-bank tributary"
    : "Barak Valley tributary";

export default function RiversHome() {
  const { t, pick } = useApp();
  const featured = useMemo(() => {
    const byId = new Map(RIVERS.map((r) => [r.id, r]));
    const order = ["brahmaputra", "barak", "jia-bharali", "manas", "beki", "subansiri", "longai"];
    return order.map((id) => byId.get(id)).filter(Boolean);
  }, []);

  return (
    <section className="chome chome--rivers" id="rivers-home-cta">
      <div className="chome__head">
        <div className="chome__eyebrow">
          <span className="chome__index" aria-hidden="true">05</span>
          <span className="chome__kicker chome__kicker--light">{t("rivers_hero_kicker")}</span>
        </div>
        <h2 className="chome__title">{t("rivers_title")}</h2>
        <p className="chome__sub">{t("rivers_intro2")}</p>
      </div>

      <div className="chome__mosaic">
        {featured.map((r, idx) => {
          const credit = riverCreditFor(r.image.split("/").pop());
          return (
            <a
              key={r.id}
              href={`#/river/${r.id}`}
              className={`chome__tile chome__tile--r${idx}`}
              data-reveal
            >
              <img src={r.image} alt={pick(r.alt, "en")} loading="lazy" decoding="async" />
              <span className="chome__tile-veil" aria-hidden="true" />
              <span className="chome__tile-copy">
                <span className="chome__tile-sub">{pick(riverSystemLabel(r.system, "en"))}</span>
                <span className="chome__tile-label">{pick(r.name, "en")}</span>
                <span className="chome__tile-meta">{pick(sideLabel(r.side, "en"))}</span>
                {credit ? (
                  <span className="chome__tile-meta">{credit.author} &middot; {credit.license}</span>
                ) : null}
              </span>
            </a>
          );
        })}
      </div>

      <ScrollHint target="rivers-home-cta">
        <div className="chome__cta">
          <p>{t("rivers_intro")}</p>
          <div className="chome__cta-actions">
            <a className="btn btn--solid" href="#/rivers">
              {t("rivers_view")}: {t("rivers_title")} <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#/travel">
              {t("switch_to_travel")}
            </a>
          </div>
        </div>
      </ScrollHint>
    </section>
  );
}
