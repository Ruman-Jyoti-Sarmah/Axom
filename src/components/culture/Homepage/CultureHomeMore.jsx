import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { PERFORMANCE_WIDE, PERFORMANCE_CARDS } from "@/data/culture/cultureHome";
import { CUISINE_BAND, EXPLORE_TILES } from "@/data/culture/cultureHome";
import ScrollHint from "@/components/common/ScrollHint";

export function Performance() {
  const { t, pick } = useApp();
  const trioRef = useRef(null);
  return (
    <section className="chome chome--perf">
      <div className="chome__head">
        <div className="chome__eyebrow">
          <span className="chome__kicker chome__kicker--light">{pick(PERFORMANCE_WIDE.kicker)}</span>
        </div>
        <h2 className="chome__title">{pick(PERFORMANCE_WIDE.title)}</h2>
        <p className="chome__sub">{pick(PERFORMANCE_WIDE.body)}</p>
      </div>
      <a className="chome__wide" href="#/artists" data-reveal>
        <img src={PERFORMANCE_WIDE.image} alt={pick(PERFORMANCE_WIDE.title)} loading="lazy" decoding="async" />
        <span className="chome__wide-veil" aria-hidden="true" />
        <span className="chome__wide-copy">
          <span className="chome__wide-cta">{t("menu_artists")} <ArrowRight size={15} aria-hidden="true" /></span>
        </span>
      </a>
      <div className="chome__trio" ref={trioRef}>
        {PERFORMANCE_CARDS.map((c, idx) => (
          <article key={pick(c.name)} className="chome__trio-card" data-reveal style={{ "--d": `${Math.min(idx, 2) * 70}ms` }}>
            <div className="chome__trio-media">
              <img src={c.image} alt={pick(c.name)} loading="lazy" decoding="async" />
            </div>
            <h3>{pick(c.name)}</h3>
            <p>{pick(c.about)}</p>
          </article>
        ))}
      </div>
      <ScrollHint targetRef={trioRef} />
    </section>
  );
}

export function Cuisine() {
  const { t, pick } = useApp();
  const bandRef = useRef(null);
  return (
    <section className="chome chome--food chome--major">
      <div className="chome__head">
        <div className="chome__eyebrow">
          <span className="chome__kicker">{t("culture_food_kicker")}</span>
        </div>
        <h2 className="chome__title chome__title--major">{t("culture_food_title")}</h2>
        <p className="chome__sub">{t("culture_food_sub")}</p>
      </div>
      <div className="chome__band" ref={bandRef}>
        {CUISINE_BAND.map((c, idx) => (
          <article key={pick(c.name)} className="chome__band-card" data-reveal style={{ "--d": `${Math.min(idx, 2) * 70}ms` }}>
            <div className="chome__band-media">
              <img src={c.image} alt={pick(c.name)} loading="lazy" decoding="async" />
            </div>
            <div className="chome__band-body">
              <span className="chome__band-num" aria-hidden="true">0{idx + 1}</span>
              <h3>{pick(c.name)}</h3>
              <p>{pick(c.about)}</p>
            </div>
          </article>
        ))}
      </div>
      <ScrollHint targetRef={bandRef} />
      <a className="chome__band-link" href="#/culture/experiences/cuisine">
        {t("culture_cuisine_title")} <ArrowRight size={15} aria-hidden="true" />
      </a>
    </section>
  );
}

export function Explore() {
  const { t, pick } = useApp();
  return (
    <section className="chome chome--explore chome--major">
      <div className="chome__head">
        <div className="chome__eyebrow">
          <span className="chome__kicker">{t("culture_explore_kicker")}</span>
        </div>
        <h2 className="chome__title chome__title--major">{t("culture_explore_title")}</h2>
        <p className="chome__sub">{t("culture_explore_sub")}</p>
      </div>
      <div className="chome__mosaic">
        {EXPLORE_TILES.map((tile, idx) => (
          <a key={tile.href + tile.label.en} href={tile.href} className={`chome__tile chome__tile--${idx}`} data-reveal style={{ "--d": `${Math.min(idx, 4) * 60}ms` }}>
            <img src={tile.image} alt={pick(tile.label)} loading="lazy" decoding="async" />
            <span className="chome__tile-veil" aria-hidden="true" />
            <span className="chome__tile-copy">
              <span className="chome__tile-sub">{pick(tile.sub)}</span>
              <span className="chome__tile-label">{pick(tile.label)}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="chome__cta">
        <p>{t("culture_cta_line")}</p>
        <div className="chome__cta-actions">
          <a className="btn btn--solid" href="#/heritage">{t("culture_cta_primary")}</a>
          <a className="btn btn--ghost" href="#/travel">{t("switch_to_travel")}</a>
        </div>
      </div>
    </section>
  );
}
