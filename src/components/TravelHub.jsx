import { ArrowRight, Compass, MapPinned, BedDouble, CalendarRange, Route, Leaf } from "lucide-react";
import { useApp } from "../store/AppContext";
import { DISTRICTS, slugify } from "../data/districts";
import SectionSwitcher from "./SectionSwitcher";

/**
 * TravelHub — the landing of the TRAVEL section. It is the trip-planning
 * front-door: a bold hero, quick planning tools (journey planner, stays,
 * visit/booking), and a curated set of featured districts that link straight
 * into the existing district pages. Everything routes to the real travel
 * pages that already exist, so no content is duplicated.
 */
export default function TravelHub() {
  const { t, pick } = useApp();

  const tools = [
    { id: "journey", Icon: Route, title: t("menu_journey"), desc: t("journey_hero_sub"), href: "#/journey" },
    { id: "stays", Icon: BedDouble, title: t("stays_title"), desc: t("stays_sub"), href: "#/stays" },
    { id: "guide", Icon: CalendarRange, title: t("menu_guide"), desc: t("page_guide_intro"), href: "#/guide" },
    { id: "visit", Icon: Compass, title: t("menu_visit"), desc: t("book_sub"), href: "#/visit" },
  ];

  const featured = DISTRICTS.filter((d) =>
    ["Kamrup Metropolitan", "Majuli", "Sivasagar", "Karbi Anglong", "Cachar", "Morigaon"].includes(d.name)
  );

  return (
    <div className="thub" id="top">
      <section className="thub__hero">
        <div className="thub__hero-media">
          <img src="/homehero.png" alt={t("switch_travel_hint")} className="thub__poster" fetchPriority="high" decoding="async" />
          <div className="thub__veil" aria-hidden="true" />
        </div>
        <div className="thub__hero-inner">
          <span className="thub__kicker"><Compass size={14} aria-hidden="true" /> {t("switch_to_travel")}</span>
          <h1 className="thub__title">
            {t("journey_hero_title")}
          </h1>
          <p className="thub__sub">{t("journey_hero_sub")}</p>
          <div className="thub__cta">
            <a className="thub__btn thub__btn--solid" href="#/journey">
              {t("menu_journey")} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="thub__btn thub__btn--ghost" href="#/travel/home">
              {t("home")} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="thub__btn thub__btn--ghost" href="#/districts">
              <MapPinned size={15} aria-hidden="true" /> {t("culture_all_districts")}
            </a>
          </div>
          <div className="thub__stats">
            <div><strong>35</strong><span className="label">{t("dlist_stat_districts")}</span></div>
            <div><strong>87</strong><span className="label">{t("stays_title")}</span></div>
            <div><strong>5</strong><span className="label">{t("dlist_stat_divisions")}</span></div>
          </div>
        </div>
      </section>

      <section className="thub__tools" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Route size={14} aria-hidden="true" /> {t("switch_to_travel")}</span>
          <h2 className="thub__sec-title">{t("journey_kicker")}</h2>
        </div>
        <div className="thub__tool-grid">
          {tools.map((tl) => (
            <a key={tl.id} className="tool-card" href={tl.href} data-reveal>
              <span className="tool-card__icon" aria-hidden="true"><tl.Icon size={20} /></span>
              <h3 className="tool-card__title">{tl.title}</h3>
              <p className="tool-card__desc">{tl.desc}</p>
              <span className="tool-card__cta">{t("culture_explore_more")} →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="thub__featured" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Leaf size={14} aria-hidden="true" /> {t("famous")}</span>
          <h2 className="thub__sec-title">{t("culture_destinations_sub")}</h2>
        </div>
        <div className="thub__feat-grid">
          {featured.map((d, i) => (
            <a key={d.no} className="feat-card" href={`#/district/${slugify(d.name)}`} style={{ "--d": `${0.05 + i * 0.05}s` }} data-reveal>
              <div className="feat-card__media">
                <img src={d.image} alt={d.alt} loading="lazy" decoding="async" />
              </div>
              <div className="feat-card__body">
                <h3>{pick(d.name)}</h3>
                <span className="label">{pick(d.tag)}</span>
              </div>
            </a>
          ))}
        </div>
        <a className="thub__all-link" href="#/districts">
          {t("culture_all_districts")} <ArrowRight size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="thub__culture" data-reveal>
        <div className="thub__culture-inner">
          <div>
            <span className="thub__sec-kicker">{t("switch_to_culture")}</span>
            <h2 className="thub__culture-title">{t("switch_culture_hint")}</h2>
          </div>
          <div className="thub__culture-actions">
            <a className="thub__btn thub__btn--ghost" href="#/culture">{t("switch_to_culture")}</a>
            <SectionSwitcher section="travel" />
          </div>
        </div>
      </section>
    </div>
  );
}
