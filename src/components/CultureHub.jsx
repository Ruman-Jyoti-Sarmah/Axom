import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Users,
  Compass,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useApp } from "../store/AppContext";
import {
  CULTURE_HERO,
  HERO_SLIDES,
  SPIRITUAL,
} from "../data/cultureSections";
import { assamArtists } from "../data/content";
import SectionSwitcher from "./SectionSwitcher";
import ExperiencesHub from "./ExperiencesHub";

/**
 * CultureHub — CULTURE section ka home (jaise hai waisa hi rahega).
 * NOTE: districts yahan NAHI — districts sirf TRAVEL part me hain.
 *   1) full-bleed video hero with overlay headline + stats
 *   2) editorial lede
 *   3) "Experiences" category grid
 *   4) "Spiritual destinations" highlight strip
 *   5) "People & Culture" (artists) + a nudge into the Travel section
 */
export default function CultureHub() {
  const { t, pick } = useApp();
  return (
    <div className="chub" id="top">
      {/* ── 1. Rotating video hero (full-bleed, Incredible-India style) ── */}
      <HeroCarousel />

      {/* ── 2. Editorial lede ───────────────────────────────────────── */}
      <section className="chub__lede" id="home-content" tabIndex={-1}>
        <span className="label chub__lede-kicker">
          {t("culture_hub_kicker")}
        </span>
        <p className="chub__lede-text">{t("culture_hub_lede")}</p>
      </section>

      {/* ── 3. Experiences grid ─────────────────────────────────────── */}
      <ExperiencesHub />

      {/* ── 4. Spiritual destinations ───────────────────────────────── */}
      <Spiritual />

      {/* ── 6. People & Culture (artists) ───────────────────────────── */}
      <People />

      {/* ── Nudge into the Travel section ───────────────────────────── */}
      <TravelNudge />
    </div>
  );
}

/* ── HeroCarousel — Incredible-India style rotating video hero ──────── */
function HeroCarousel() {
  const { t, pick } = useApp();
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef([]);
  const n = HERO_SLIDES.length;

  const go = useCallback((next) => setI((cur) => (next + n) % n), [n]);

  // Auto-advance every 9s (paused on hover / reduced-motion). Only the active
  // clip plays; the others are paused to save CPU/bandwidth.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((c) => (c + 1) % n), 9000);
    return () => clearInterval(id);
  }, [paused, n]);

  // Play/pause the videos to match the active slide + mute state.
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === i) {
        v.muted = muted;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [i, muted]);

  const slide = HERO_SLIDES[i];

  return (
    <section
      className="chub__hero"
      aria-label={t("culture_hub_kicker")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="chub__hero-media">
        {HERO_SLIDES.map((s, idx) => (
          <video
            key={s.id}
            ref={(el) => (videoRefs.current[idx] = el)}
            className={`chub__hero-video ${idx === i ? "is-active" : ""}`}
            poster={s.poster}
            autoPlay={idx === 0}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={s.video} type="video/mp4" />
          </video>
        ))}
        <div className="chub__hero-veil" aria-hidden="true" />
      </div>
      <div className="chub__hero-credit">
        Video:{" "}
        <a href={slide.credit.source} target="_blank" rel="noreferrer">
          {slide.credit.author}
        </a>
        <span aria-hidden="true"> · </span>
        <a href={slide.credit.licenseUrl} target="_blank" rel="noreferrer">
          {slide.credit.license}
        </a>
        <span aria-hidden="true"> · </span>
        <span>transcoded to MP4</span>
      </div>

      {/* Side rail actions — like Incredible India */}
      <a
        className="chub__rail chub__rail--left"
        href="#/visit"
        aria-label={t("menu_visit")}
      >
        {t("menu_visit")}
      </a>
      <a
        className="chub__rail chub__rail--right"
        href="#/journey"
        aria-label={t("menu_journey")}
      >
        {t("menu_journey")}
      </a>

      <div className="chub__hero-inner">
        <span className="chub__kicker">
          <span className="chub__kicker-rule" aria-hidden="true" />
          {pick(CULTURE_HERO.kicker)}
        </span>
        {/* Animated copy keyed to the active slide */}
        <div className="chub__hero-copy" key={slide.id}>
          <span className="chub__hero-cat">{pick(slide.category)}</span>
          <h1 className="chub__hero-title">
            {slide.headline.map((l, li) => (
              <span
                className="chub__line"
                key={l.en}
                style={{ "--d": `${0.05 + li * 0.12}s` }}
              >
                {l.em ? <em>{pick(l)}</em> : pick(l)}
              </span>
            ))}
          </h1>
          <p className="chub__hero-sub">{pick(slide.sub)}</p>
          <div className="chub__hero-cta">
            <a className="chub__btn chub__btn--solid" href={slide.cta.href}>
              {pick(slide.cta.label)}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="chub__btn chub__btn--ghost" href="#experiences">
              <Play size={15} aria-hidden="true" />{" "}
              {t("culture_hero_cta_experiences")}
            </a>
          </div>
        </div>
        <dl className="chub__stats">
          {CULTURE_HERO.stats.map((s) => (
            <div key={s.label.en} className="chub__stat">
              <dt>{s.value}</dt>
              <dd>{pick(s.label)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Bottom control bar: category chips + prev/next + mute */}
      <div className="chub__hero-bar">
        <nav className="chub__hero-cats" aria-label={t("culture_hub_kicker")}>
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`chub__hero-chip ${idx === i ? "is-active" : ""}`}
              aria-current={idx === i}
              onClick={() => go(idx)}
            >
              {pick(s.category)}
            </button>
          ))}
        </nav>
        <div className="chub__hero-nav">
          <button
            type="button"
            className="chub__hero-arrow"
            onClick={() => go(i - 1)}
            aria-label={t("hero_prev")}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="chub__hero-arrow"
            onClick={() => go(i + 1)}
            aria-label={t("hero_next")}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="chub__hero-arrow"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? t("hero_unmute") : t("hero_mute")}
            aria-pressed={!muted}
          >
            {muted ? (
              <VolumeX size={18} aria-hidden="true" />
            ) : (
              <Volume2 size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Spiritual destinations highlight strip ────────────────────────── */
function Spiritual() {
  const { t, pick } = useApp();
  return (
    <section className="chub__spiritual" data-reveal>
      <div className="chub__head">
        <span className="chub__sec-kicker">
          <Users size={14} aria-hidden="true" /> {t("culture_spiritual_title")}
        </span>
        <h2 className="chub__sec-title">{t("culture_spiritual_title")}</h2>
      </div>
      <div className="chub__spiritual-grid">
        {SPIRITUAL.map((s) => (
          <article key={s.name.en} className="sp-card" data-reveal>
            <div className="sp-card__media">
              <img
                src={s.image}
                alt={pick(s.name)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sp-card__body">
              <span className="label sp-card__kind">{pick(s.kind)}</span>
              <h3 className="sp-card__name">{pick(s.name)}</h3>
              <span className="sp-card__place">{pick(s.place)}</span>
              <p className="sp-card__about">{pick(s.about)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── People & Culture — the artists ────────────────────────────────── */
function People() {
  const { t, pick } = useApp();
  const featured = assamArtists.slice(0, 6);
  return (
    <section className="chub__people" data-reveal>
      <div className="chub__head">
        <span className="chub__sec-kicker">
          <Users size={14} aria-hidden="true" /> {t("culture_people_title")}
        </span>
        <h2 className="chub__sec-title">{t("culture_people_sub")}</h2>
      </div>
      <div className="chub__people-grid">
        {featured.map((a) => (
          <a key={a.name} className="ppl-card" href="#/artists" data-reveal>
            <div className="ppl-card__media">
              <img
                src={a.image}
                alt={pick(a.name)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ppl-card__body">
              <h3 className="ppl-card__name">{pick(a.name)}</h3>
              <p className="ppl-card__known">{pick(a.knownFor)}</p>
            </div>
          </a>
        ))}
      </div>
      <a className="chub__all-link" href="#/artists">
        {t("menu_artists")} <ArrowRight size={15} aria-hidden="true" />
      </a>
    </section>
  );
}

/* ── Nudge into the Travel section ─────────────────────────────────── */
function TravelNudge() {
  const { t } = useApp();
  return (
    <section className="chub__travel" data-reveal>
      <div className="chub__travel-inner">
        <div>
          <span className="chub__sec-kicker">
            <Compass size={14} aria-hidden="true" /> {t("switch_to_travel")}
          </span>
          <h2 className="chub__travel-title">{t("switch_travel_hint")}</h2>
          <p className="chub__travel-sub">{t("book_note")}</p>
        </div>
        <div className="chub__travel-actions">
          <a className="chub__btn chub__btn--solid" href="#/travel">
            {t("switch_to_travel")} <ArrowRight size={16} aria-hidden="true" />
          </a>
          <SectionSwitcher section="culture" />
        </div>
      </div>
    </section>
  );
}
