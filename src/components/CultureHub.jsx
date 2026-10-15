import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPin,
  Play,
  Users,
  Compass,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useApp } from "../store/AppContext";
import { CULTURE_HERO, HERO_SLIDES, SPIRITUAL } from "../data/cultureSections";
import { assamArtists } from "../data/content";
import SectionSwitcher from "./SectionSwitcher";
import ScrollHint from "./ScrollHint";
import CultureHomeSections from "./CultureHomeSections";
import RiversHome from "./RiversHome";
import { Cuisine, Explore } from "./CultureHomeMore";

/**
 * CultureHub — CULTURE section ka home (jaise hai waisa hi rahega).
 * NOTE: districts yahan NAHI — districts sirf TRAVEL part me hain.
 *   1) full-bleed video hero with overlay headline + stats
 *   2) editorial lede
 *   3) editorial heritage / festival / craft / performance sections
 *   4) Cuisine band
 *   5) "Spiritual destinations" highlight strip
 *   6) "People & Culture" (artists) + Explore tiles
 *   7) a nudge into the Travel section
 *
 * The "Experiences" category grid is intentionally NOT rendered here (it
 * duplicated the dedicated experience pages). ExperiencesHub itself is
 * untouched and still powers the legacy HomeFacts shell.
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

      {/* ── 3. New editorial sections (below preserved hero + lede) ── */}
      <CultureHomeSections />
      <RiversHome />

      {/* ── 4. Cuisine band ─────────────────────────────────────────── */}
      {/* The "Experiences" category grid deliberately does NOT appear on
          the Culture home any more: it duplicated the dedicated experience
          pages (Heritage, Spiritual, Cuisine…) that each have their own
          route. The editorial sections above and the Cuisine / Spiritual /
          People / Explore sections below now sit directly against each
          other, so there is no gap where it used to be.
          NOTE: ExperiencesHub is still used by the legacy HomeFacts shell —
          the component and its routes are untouched. */}
      <Cuisine />

      {/* ── 5. Spiritual destinations ───────────────────────────────── */}
      <Spiritual />

      {/* ── 6. People & Culture (artists) ───────────────────────────── */}
      <People />

      {/* ── 7. Explore tiles + restrained CTA (end of culture home) ─── */}
      <Explore />

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

/* ── Spiritual destinations — cinematic horizontal photo rail ─────────── */
function Spiritual() {
  const { t, pick } = useApp();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  const reducedMotion = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // track scroll position -> enable/disable end-cap controls
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const refresh = () => {
      setCanPrev(el.scrollLeft > 2);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    };
    refresh();
    window.addEventListener("resize", refresh);
    el.addEventListener("scroll", refresh, { passive: true });
    return () => {
      window.removeEventListener("resize", refresh);
      el.removeEventListener("scroll", refresh);
    };
  }, []);

  // smooth horizontal pan (flat when reduced motion is preferred)
  const go = useCallback(
    (dir) => {
      const el = trackRef.current;
      if (!el) return;
      const unit = el.querySelector(".sp-card");
      const gap = parseFloat(getComputedStyle(el).gap) || 16;
      const step = (unit?.offsetWidth ?? el.clientWidth) + gap;
      el.scrollBy({ left: dir * step, behavior: reducedMotion() ? "auto" : "smooth" });
    },
    [reducedMotion],
  );

  //drag-to-scroll for mice (mirrors the project's side-slide-rail pattern)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startL = 0;
    let moved = false;
    const onDown = (e) => {
      if (e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.pageX;
      startL = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 6) {
        moved = true;
        el.scrollLeft = startL - dx;
      }
    };
    const onUp = () => {
      down = false;
    };
    const onCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("click", onCapture, true);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("click", onCapture, true);
    };
  }, []);

  return (
    <section className="chub__spiritual" data-reveal>
      <div className="chub__head">
        <span className="chub__sec-kicker">
          <Landmark size={14} aria-hidden="true" />
          {t("culture_spiritual_kicker")}
        </span>
        <h2 className="chub__sec-title">{t("culture_spiritual_title")}</h2>
        <p className="chub__sec-sub">{t("culture_spiritual_sub")}</p>
      </div>

      <div className="chub__srail-wrap">
        <div
          ref={trackRef}
          className="chub__srail-track"
          role="region"
          aria-label={t("culture_spiritual_rail")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            }
          }}
        >
          {SPIRITUAL.map((s) => (
            <a
              key={s.id}
              className="sp-card"
              href={`#/district/${s.slug}`}
              aria-label={`${pick(s.name)} — ${pick(s.place)} — ${t("culture_spiritual_card_explore")}`}
            >
              <img
                src={s.image}
                alt={pick(s.alt)}
                loading="lazy"
                decoding="async"
              />
              <span className="sp-card__shade" aria-hidden="true" />
              <span className="sp-card__body">
                <span className="sp-card__kind">{pick(s.kind)}</span>
                <span className="sp-card__name">{pick(s.name)}</span>
                <span className="sp-card__place">{pick(s.place)}</span>
              </span>
              <span className="sp-card__go" aria-hidden="true">
                <ArrowRight size={12} aria-hidden="true" />
                {t("culture_spiritual_go")}
              </span>
            </a>
          ))}
        </div>

        <div className="chub__ctrl-row">
          <button
            type="button"
            className="chub__ctrl chub__ctrl--prev"
            aria-label={t("culture_spiritual_prev")}
            disabled={!canPrev}
            onClick={() => go(-1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="chub__ctrl chub__ctrl--next"
            aria-label={t("culture_spiritual_next")}
            disabled={!canNext}
            onClick={() => go(1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="chub__rail-cta-row">
          <a className="chub__cta" href="#/culture/experiences/spiritual">
            {t("culture_spiritual_cta")}
            <ArrowRight size={16} className="arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── People & Culture — the artists ────────────────────────────────── */
function People() {
  const { t, pick } = useApp();
  const featured = assamArtists.slice(0, 6);
  const railRef = useRef(null);
  return (
    <section className="chub__people" data-reveal>
      <div className="chub__head">
        <span className="chub__sec-kicker">
          <Users size={14} aria-hidden="true" /> {t("culture_people_title")}
        </span>
        <h2 className="chub__sec-title">{t("culture_people_sub")}</h2>
      </div>
      <div className="chub__people-grid" ref={railRef}>
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
      <ScrollHint targetRef={railRef} />
      <a className="chub__all-link" href="#/artists">
        {t("culture_people_cta")} <ArrowRight size={15} className="arrow" aria-hidden="true" />
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
