import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, Compass, MapPinned, BedDouble, CalendarRange, Route,
  Leaf, ChevronLeft, ChevronRight, Star, Camera, Train, Sun, Users, Landmark,
} from "lucide-react";
import { useApp } from "../store/AppContext";
import { DISTRICTS, slugify } from "../data/districts";
import { STAYS } from "../data/stays";
import SectionSwitcher from "./SectionSwitcher";

const DIVISIONS = ["Lower Assam", "North Assam", "Upper Assam", "Central Assam", "Barak Valley"];

/**
 * TravelHub — TRAVEL part ka 1-number HOME.
 * hero (video) → tools → division-wise district rails (sirf Travel!) →
 * seasons → 5-day starter → Culture nudge. Site default Culture hi hai.
 */
export default function TravelHub() {
  const { t, pick } = useApp();

  const tools = [
    { id: "journey", Icon: Route, title: t("menu_journey"), desc: t("journey_hero_sub"), href: "#/journey", tag: "Most loved" },
    { id: "stays", Icon: BedDouble, title: t("stays_title"), desc: t("stays_sub"), href: "#/stays", tag: "87+ stays" },
    { id: "guide", Icon: CalendarRange, title: t("menu_guide"), desc: t("page_guide_intro"), href: "#/guide", tag: "Seasons & routes" },
    { id: "visit", Icon: Compass, title: t("menu_visit"), desc: t("book_sub"), href: "#/visit", tag: "Book now" },
  ];

  const totalStays = Object.values(STAYS).reduce((n, arr) => n + arr.length, 0);

  return (
    <div className="thub thub--home" id="top">
      <section className="thub__hero">
        <div className="thub__hero-media">
          <video className="thub__video" poster="/img/hero-brahmaputra.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
            <source src="/video/hero-2.mp4" type="video/mp4" />
          </video>
          <img src="/img/hero-brahmaputra.jpg" alt="" aria-hidden="true" className="thub__poster" loading="eager" decoding="async" />
          <div className="thub__veil" aria-hidden="true" />
        </div>
        <div className="thub__hero-inner">
          <span className="thub__kicker"><Compass size={14} aria-hidden="true" /> {t("switch_to_travel")} · Assam trip planner</span>
          <h1 className="thub__title">
            Travel Assam,<br /><em>district by district.</em>
          </h1>
          <p className="thub__sub">{t("journey_hero_sub")}</p>
          <div className="thub__cta">
            <a className="thub__btn thub__btn--solid" href="#/journey">
              {t("menu_journey")} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="thub__btn thub__btn--ghost" href="#districts-rail">
              <MapPinned size={15} aria-hidden="true" /> {t("culture_all_districts")}
            </a>
            <a className="thub__btn thub__btn--ghost" href="#/stays">
              <BedDouble size={15} aria-hidden="true" /> {t("stays_title")}
            </a>
            <a className="thub__btn thub__btn--ghost" href="#/visit">
              <Compass size={15} aria-hidden="true" /> {t("menu_visit")}
            </a>
          </div>
          <div className="thub__stats">
            <div><strong>35</strong><span className="label">{t("dlist_stat_districts")}</span></div>
            <div><strong>{totalStays}</strong><span className="label">{t("stays_title")}</span></div>
            <div><strong>5</strong><span className="label">{t("dlist_stat_divisions")}</span></div>
            <div><strong>4.9<Star size={12} aria-hidden="true" /></strong><span className="label">Traveller rating</span></div>
          </div>
        </div>
      </section>

      <section className="thub__tools" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Route size={14} aria-hidden="true" /> Plan in 4 steps</span>
          <h2 className="thub__sec-title">Everything for the road</h2>
        </div>
        <div className="thub__tool-grid">
          {tools.map((tl) => (
            <a key={tl.id} className="tool-card tool-card--travel" href={tl.href} data-reveal>
              <span className="tool-card__tag">{tl.tag}</span>
              <span className="tool-card__icon" aria-hidden="true"><tl.Icon size={20} /></span>
              <h3 className="tool-card__title">{tl.title}</h3>
              <p className="tool-card__desc">{tl.desc}</p>
              <span className="tool-card__cta">{t("culture_explore_more")} →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="thub__districts" id="districts-rail" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Leaf size={14} aria-hidden="true" /> {t("famous")} · only here in Travel</span>
          <h2 className="thub__sec-title">35 districts, 5 regions — slide sideways</h2>
        </div>
        {DIVISIONS.map((div) => (
          <DistrictRail key={div} division={div} />
        ))}
        <a className="thub__all-link" href="#/districts">
          {t("culture_all_districts")} <ArrowRight size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="thub__seasons" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Sun size={14} aria-hidden="true" /> When to go</span>
          <h2 className="thub__sec-title">Pick your season</h2>
        </div>
        <div className="thub__season-grid">
          <article className="season-card" data-reveal>
            <span className="season-card__icon" aria-hidden="true"><Sun size={20} /></span>
            <h3>Oct – Mar</h3>
            <p>Best weather — safaris open, Bihu rehearsals, river cruises glide.</p>
          </article>
          <article className="season-card" data-reveal>
            <span className="season-card__icon" aria-hidden="true"><Camera size={20} /></span>
            <h3>Apr – May</h3>
            <p>Rongali Bihu — dance, drums and feasts in every village.</p>
          </article>
          <article className="season-card" data-reveal>
            <span className="season-card__icon" aria-hidden="true"><Train size={20} /></span>
            <h3>Jun – Sep</h3>
            <p>Monsoon magic — lush tea gardens, Majuli at its greenest.</p>
          </article>
        </div>
      </section>

      <section className="thub__plan" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Users size={14} aria-hidden="true" /> First trip? Start here</span>
          <h2 className="thub__sec-title">A perfect 5-day starter</h2>
        </div>
        <ol className="thub__steps">
          <li className="thub__step" data-reveal>
            <span className="thub__day">Day 1</span>
            <div><h3>Guwahati</h3><p>Kamakhya at dawn → Umananda ferry → Brahmaputra sunset cruise.</p></div>
          </li>
          <li className="thub__step" data-reveal>
            <span className="thub__day">Day 2–3</span>
            <div><h3>Kaziranga</h3><p>Two jeep safaris + one elephant ride — rhino, swamp deer, hornbills.</p></div>
          </li>
          <li className="thub__step" data-reveal>
            <span className="thub__day">Day 4–5</span>
            <div><h3>Majuli &amp; Sivasagar</h3><p>Satra mornings, mask-makers, then Rang Ghar &amp; Shiva Dol.</p></div>
          </li>
        </ol>
        <div className="thub__plan-cta">
          <a className="thub__btn thub__btn--solid thub__btn--dark" href="#/journey">
            {t("menu_journey")} <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a className="thub__btn thub__btn--outline" href="#/guide">
            {t("menu_guide")} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="thub__culture" data-reveal>
        <div className="thub__culture-inner">
          <div>
            <span className="thub__sec-kicker"><Landmark size={14} aria-hidden="true" /> {t("switch_to_culture")}</span>
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

/** Side-slide district rail — one per division, Travel only. */
function DistrictRail({ division }) {
  const { t, pick } = useApp();
  const trackRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);
  const items = DISTRICTS.filter((d) => d.division === division);
  const upd = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 6;
    setCanL(el.scrollLeft > 6);
    setCanR(max > 6 && el.scrollLeft < max);
  }, []);
  useEffect(() => {
    upd();
    const el = trackRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    const id = setTimeout(upd, 500);
    return () => {
      el.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      clearTimeout(id);
    };
  }, [upd, division]);
  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".trail-card");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  if (!items.length) return null;
  return (
    <div className="trail" data-reveal>
      <div className="trail__head">
        <h3>{pick(division)}</h3>
        <div className="trail__arrows">
          <button className="trail__arrow" onClick={() => slide(-1)} disabled={!canL} aria-label={`${division} left`}>
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
          <button className="trail__arrow" onClick={() => slide(1)} disabled={!canR} aria-label={`${division} right`}>
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="trail__track" ref={trackRef} tabIndex={0} role="region" aria-label={`${division} slider`}>
        {items.map((d) => (
          <a key={d.no} className="trail-card" href={`#/district/${slugify(d.name)}`} draggable={false}>
            <span className="trail-card__media">
              <img src={d.image} alt={d.alt} loading="lazy" decoding="async" width="600" height="400" draggable={false} />
              <span className="trail-card__num">{String(d.no).padStart(2, "0")}</span>
            </span>
            <span className="trail-card__body">
              <strong>{pick(d.name)}</strong>
              <span>{pick(d.hq)}</span>
              <em>{pick(d.tag)}</em>
            </span>
          </a>
        ))}
      </div>
      <p className="trail__count">{items.length} {t("dlist_stat_districts")} · {pick(division)}</p>
    </div>
  );
}
