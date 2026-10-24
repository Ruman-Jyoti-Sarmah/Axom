import { useMemo, useState, useRef, useEffect } from "react";
import {
  ArrowRight, ArrowLeft, Compass, MapPin, CalendarDays, Check, Route, Leaf, Utensils,
  Landmark, Camera, Ship, Search, Sparkles, AlertTriangle, ChevronDown,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { useTrip } from "@/store/TripContext";
import { DISTRICTS, slugify } from "@/data/travel/districts";
import {
  FEATURED, CATEGORIES, districtsWithDestinations, searchDestinations, categoryLabel,
  availableSpiritualTraditions, normalizeTraditions,
  spiritualTraditionLabel, spiritualTraditionShort,
} from "@/data/travel/destinations";
import DestinationCard from "@/pages/Travel/DestinationCard";
import SectionSwitcher from "@/components/common/SectionSwitcher";

/**
 * TravelHome — the TRAVEL section homepage (route #/travel).
 * A) hero (video) → B) explore by district → C) popular destinations
 * (filters + search + add-to-trip) → D) build-your-trip steps →
 * E) featured experiences → F) practical guide → G) final CTA → culture nudge.
 * Copy via t(); destination data is verified/enriched (see destinations.js).
 */

// Featured experience themes — each grounded in a real destination in the data
// layer. The CTA adds it to the trip; bookability is never implied.
const EXPERIENCES = [
  { Icon: Leaf, key: "wildlife", title: "Kaziranga & Manas wildlife",
    body: "Dawn jeep safaris among one-horned rhino, elephant and golden langur.",
    dest: "golaghat--kaziranga-kohora-gate" },
  { Icon: Leaf, key: "nature", title: "Assam tea gardens",
    body: "Two leaves and a bud in the gardens that made Assam famous worldwide.",
    dest: "jorhat--tocklai-tea-research-institute" },
  { Icon: Compass, key: "culture", title: "Majuli river-island life",
    body: "Satra mornings, mask-makers and Mishing stilt villages on the Luit.",
    dest: "majuli--samaguri-satra" },
  { Icon: Ship, key: "river", title: "Brahmaputra river experiences",
    body: "Sunset ferries, Umananda island and the sandbars of the great river.",
    dest: "kamrup-metropolitan--umananda-island" },
  { Icon: Landmark, key: "heritage", title: "Ahom heritage & temples",
    body: "Rang Ghar, the maidams of Charaideo and the satras of Barpeta.",
    dest: "sivasagar--rang-ghar" },
  { Icon: Camera, key: "adventure", title: "Scenic countryside & hills",
    body: "Haflong's lake, the Barail hills and lesser-known green corners.",
    dest: "dima-hasao--haflong-lake" },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

// Division filter options for the districts rail — derived from the data
// (unique, in data order), so new divisions appear automatically.
const DIVISIONS = [...new Set(DISTRICTS.map((d) => d.division))];

export default function TravelHome() {
  const { t, lang } = useApp();
  const { addDestination, count, details, updateDetails } = useTrip();

  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [category, setCategory] = useState("all");
  /* Selected spiritual traditions (ids). Only meaningful while the Spiritual
     category is active — see setCategorySafe below. */
  const [traditions, setTraditions] = useState([]);
  // Tradition dropdown open/closed (a compact popover, not a row of chips).
  const [tradOpen, setTradOpen] = useState(false);
  // Division chip selection for the districts rail ("all" = no filter).
  const [tdiv, setTdiv] = useState("all");
  // Prefill from the live trip details (preserves saved/prefilled dates).
  const [quickArrival, setQuickArrival] = useState(() => details.arrivalDate || "");
  const [quickDeparture, setQuickDeparture] = useState(() => details.departureDate || "");
  const [quickError, setQuickError] = useState("");

  /* Pause the hero video for reduced-motion users; the local poster
     image (and the global broken-media fallback in main.jsx) keeps the
     hero composed without motion. */
  useEffect(() => {
    if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const v = document.querySelector(".thub__hero .thub__video");
    if (v) { v.pause(); v.removeAttribute("autoplay"); }
  }, []);

  const districts = useMemo(() => districtsWithDestinations(), []);

  /* The tradition filter only exists for the Spiritual category. Selecting
     any other category clears it, so a tradition can never silently constrain
     an unrelated result set. */
  const spiritualActive = category === "spiritual";
  const selectCategory = (next) => {
    setCategory(next);
    if (next !== "spiritual") {
      setTraditions([]);
      setTradOpen(false);
    }
  };

  /* Traditions that genuinely have a match for the current district + query.
     Traditions with no verified place are never offered as an option. */
  const traditionOptions = useMemo(
    () => (spiritualActive ? availableSpiritualTraditions({ district, query }) : []),
    [spiritualActive, district, query]
  );

  /* Drop any selected tradition that the current district/query can no longer
     satisfy, so the selection can't strand the visitor on an empty result. */
  const activeTraditions = useMemo(() => {
    const valid = normalizeTraditions(traditions);
    const offered = new Set(traditionOptions.map((o) => o.id));
    return valid.filter((id) => offered.has(id));
  }, [traditions, traditionOptions]);

  const results = useMemo(
    () => searchDestinations({ query, district, category, traditions: activeTraditions }),
    [query, district, category, activeTraditions]
  );

  const toggleTradition = (id) =>
    setTraditions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const clearTraditions = () => setTraditions([]);

  // Close the popover on Escape or an outside click (accessible by default).
  const tradRef = useRef(null);
  useEffect(() => {
    if (!tradOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setTradOpen(false); };
    const onClick = (e) => {
      if (tradRef.current && !tradRef.current.contains(e.target)) setTradOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [tradOpen]);
  // Districts shown in the rail — filtered by the selected division chip.
  const railDistricts = useMemo(
    () => (tdiv === "all" ? DISTRICTS : DISTRICTS.filter((d) => d.division === tdiv)),
    [tdiv]
  );

  const go = (hash) => () => {
    window.location.hash = hash;
    window.scrollTo({ top: 0 });
  };

  const quickPlan = (e) => {
    e.preventDefault();
    // Validate before navigating: arrival can't be in the past, departure can't
    // precede arrival. Invalid input shows an inline error in the hero form.
    const today = todayISO();
    if (quickArrival && quickArrival < today) {
      setQuickError(t("travel_quick_err_past"));
      document.querySelector(".thub__quick")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (quickArrival && quickDeparture && quickDeparture < quickArrival) {
      setQuickError(t("travel_quick_err_order"));
      document.querySelector(".thub__quick")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setQuickError("");
    if (quickArrival || quickDeparture) {
      // Write through the trip store so the planner opens with these dates
      // (state + localStorage stay in sync — no stale read).
      const patch = {};
      if (quickArrival) patch.arrivalDate = quickArrival;
      if (quickDeparture) patch.departureDate = quickDeparture;
      updateDetails(patch);
    }
    window.location.hash = "#/trip/plan";
    window.scrollTo({ top: 0 });
  };

  /* ── District carousel — scroll-snap rail with arrows, keyboard & drag ──
     Same proven pattern as Attractions/Districts rails: native horizontal
     scrolling (touch + trackpad for free), boundary-aware arrow buttons,
     arrow-key support when the rail is focused, and pointer drag-to-scroll
     with click suppression so a drag never triggers a card navigation. */
  const railRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const railScroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector(".tdist-card");
    const step = card ? card.offsetWidth + 18 : el.clientWidth * 0.8;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto" : "smooth";
    el.scrollBy({ left: dir * step, behavior });
  };

  // Arrow boundary state — arrows disable at each end (no looping).
  // Re-runs when the division filter swaps the card set: scroll resets to
  // the first matching card and both arrows re-measure.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;
    el.scrollTo({ left: 0 });
    const upd = () => {
      const max = el.scrollWidth - el.clientWidth - 6;
      setCanPrev(el.scrollLeft > 6);
      setCanNext(max > 6 && el.scrollLeft < max);
    };
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    const id = setTimeout(upd, 500); // re-measure after images settle
    return () => {
      el.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      clearTimeout(id);
    };
  }, [railDistricts]);

  // Pointer drag-to-scroll (desktop/touchpad); suppress the click that ends
  // a real drag so cards don't navigate accidentally.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;
    let down = false, sx = 0, sl = 0, moved = false;
    const dn = (e) => {
      if (e.button !== 0) return;
      down = true; moved = false; sx = e.pageX; sl = el.scrollLeft;
    };
    const mv = (e) => {
      if (!down) return;
      const dx = e.pageX - sx;
      if (Math.abs(dx) > 6) { moved = true; el.scrollLeft = sl - dx; }
    };
    const up = () => { down = false; };
    const cap = (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    el.addEventListener("mousedown", dn);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    el.addEventListener("click", cap, true);
    return () => {
      el.removeEventListener("mousedown", dn);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("click", cap, true);
    };
  }, []);

  /* ── Destinations carousel — same rail pattern, filter-aware ──
     The cards below the filters scroll horizontally instead of stacking
     in a grid. Key difference from the district rail: any filter change
     (search / district / category) swaps the result set, so the effect
     below resets scroll to the first card and re-measures the arrow
     boundaries on every new `results` — the user is never stranded in
     empty space past the last matching card. */
  const destRailRef = useRef(null);
  const [destCanPrev, setDestCanPrev] = useState(false);
  const [destCanNext, setDestCanNext] = useState(true);

  const destScroll = (dir) => {
    const el = destRailRef.current;
    if (!el) return;
    const card = el.querySelector(".dcard");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    const unit = card.offsetWidth + gap;
    // Page by "cards fully visible − 1" (min 1): quick enough on desktop
    // where ~4 show at once, one card at a time on tablet/mobile.
    const perView = Math.max(1, Math.floor((el.clientWidth + gap) / unit));
    const step = Math.max(1, perView - 1) * unit;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto" : "smooth";
    el.scrollBy({ left: dir * step, behavior });
  };

  // Reset + boundary state whenever the filtered result set changes.
  useEffect(() => {
    const el = destRailRef.current;
    if (!el) return undefined;
    el.scrollTo({ left: 0 }); // start at the first matching card
    const upd = () => {
      const max = el.scrollWidth - el.clientWidth - 6;
      setDestCanPrev(el.scrollLeft > 6);
      setDestCanNext(max > 6 && el.scrollLeft < max);
    };
    upd(); // fixed card widths → scrollWidth is stable at commit time
    el.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    return () => {
      el.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, [results]);

  // Pointer drag-to-scroll with click suppression (mirrors the district
  // rail) — touch/trackpad use native scrolling and bypass this entirely.
  useEffect(() => {
    const el = destRailRef.current;
    if (!el) return undefined;
    let down = false, sx = 0, sl = 0, moved = false;
    const dn = (e) => {
      if (e.button !== 0) return;
      down = true; moved = false; sx = e.pageX; sl = el.scrollLeft;
    };
    const mv = (e) => {
      if (!down) return;
      const dx = e.pageX - sx;
      if (Math.abs(dx) > 6) { moved = true; el.scrollLeft = sl - dx; }
    };
    const up = () => { down = false; };
    const cap = (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    el.addEventListener("mousedown", dn);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    el.addEventListener("click", cap, true);
    return () => {
      el.removeEventListener("mousedown", dn);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("click", cap, true);
    };
  }, [results]);

  return (
    <div className="thub thub--home" id="top">
      {/* A ── HERO ─────────────────────────────────────────────── */}
      <section className="thub__hero">
        <div className="thub__hero-media">
          <video
            className="thub__video" autoPlay muted loop playsInline preload="auto"
            poster="/img/hero-brahmaputra.jpg"
            aria-hidden="true" tabIndex={-1}
          >
            <source src="/video/hero-2.mp4" type="video/mp4" />
          </video>
          <div className="thub__veil" aria-hidden="true" />
        </div>
        <div className="thub__hero-inner">
          <span className="thub__kicker"><Compass size={14} aria-hidden="true" /> {t("travel_hero_kicker")}</span>
          <h1 className="thub__title">
            {t("travel_hero_title_1")},<br /><em>{t("travel_hero_title_2")}</em>
          </h1>
          <p className="thub__sub">{t("travel_hero_sub")}</p>

          <div className="thub__cta">
            <a className="thub__btn thub__btn--solid" href="#/trip/plan" onClick={quickPlan}>
              {t("travel_cta_plan")} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="thub__btn thub__btn--ghost" href="#destinations">
              <MapPin size={15} aria-hidden="true" /> {t("travel_cta_explore")}
            </a>
          </div>

          <form className="thub__quick" onSubmit={quickPlan} noValidate>
            <div className="thub__quick-head">
              <CalendarDays size={14} aria-hidden="true" />
              <span className="thub__quick-label">{t("travel_hero_dates")}</span>
            </div>
            <div className="thub__quick-row">
              <label className="thub__quick-field">
                <span>{t("travel_arrival")}</span>
                <input
                  type="date" min={todayISO()} value={quickArrival}
                  onChange={(e) => { setQuickArrival(e.target.value); setQuickError(""); }}
                  aria-label={t("travel_arrival")}
                />
              </label>
              <label className="thub__quick-field">
                <span>{t("travel_departure")}</span>
                <input
                  type="date" min={quickArrival || todayISO()} value={quickDeparture}
                  onChange={(e) => { setQuickDeparture(e.target.value); setQuickError(""); }}
                  aria-label={t("travel_departure")}
                />
              </label>
              <button type="submit" className="thub__quick-go">
                {t("travel_go_planner")} <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
            {quickError && (
              <p className="thub__quick-err" role="alert">
                <AlertTriangle size={13} aria-hidden="true" /> {quickError}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* B ── EXPLORE BY DISTRICT ──────────────────────────────── */}
      <section className="thub__districts" id="districts-rail" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><MapPin size={14} aria-hidden="true" /> {t("travel_districts_kicker")}</span>
          <h2 className="thub__sec-title">{t("travel_districts_title")}</h2>
          <p className="thub__sec-sub">{t("travel_districts_sub")}</p>
        </div>

        {/* Division filter chips — "selected option" for the rail */}
        <div className="tdist-filters" role="group" aria-label={t("travel_filter_division")}>
          <button
            type="button"
            className={`tdist-filters__chip ${tdiv === "all" ? "is-active" : ""}`}
            onClick={() => setTdiv("all")}
            aria-pressed={tdiv === "all"}
          >
            {t("travel_all")}
          </button>
          {DIVISIONS.map((name) => (
            <button
              key={name} type="button"
              className={`tdist-filters__chip ${tdiv === name ? "is-active" : ""}`}
              onClick={() => setTdiv(name)}
              aria-pressed={tdiv === name}
            >
              {name}
            </button>
          ))}
        </div>

        <div
          className="tdist-rail"
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label={t("travel_districts_title")}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); railScroll(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); railScroll(-1); }
          }}
        >
          {railDistricts.map((d) => (
            <a
              key={d.no}
              className="tdist-card"
              href={`#/district/${slugify(d.name)}`}
              draggable={false}
              aria-label={`${d.name} — ${d.tag}`}
            >
              <img src={d.image} alt={d.alt} loading="lazy" decoding="async" draggable={false} />
              <span className="tdist-card__veil" aria-hidden="true" />
              <span className="tdist-card__body">
                <span className="tdist-card__division">{d.division}</span>
                <strong className="tdist-card__name">{d.name}</strong>
                <span className="tdist-card__tag">{d.tag}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="trail-controls">
          <button
            type="button" className="trail-arrow"
            onClick={() => railScroll(-1)} disabled={!canPrev}
            aria-label={t("travel_rail_prev")}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button" className="trail-arrow"
            onClick={() => railScroll(1)} disabled={!canNext}
            aria-label={t("travel_rail_next")}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="tdist-rail-cta">
          <a className="thub__btn thub__btn--dark" href="#/districts">
            {t("travel_explore_all")} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>


      {/* C ── POPULAR DESTINATIONS ─────────────────────────────── */}
      <section className="thub__popular" id="destinations" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Sparkles size={14} aria-hidden="true" /> {t("travel_popular_kicker")}</span>
          <h2 className="thub__sec-title">{t("travel_popular_title")}</h2>
          <p className="thub__sec-sub">{t("travel_popular_sub")}</p>
        </div>

        <div className="tfilters">
          <label className="tfilters__search">
            <Search size={15} aria-hidden="true" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={t("travel_search")} aria-label={t("travel_search")}
            />
          </label>
          <label className="tfilters__select">
            <span>{t("travel_filter_district")}</span>
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="all">{t("travel_all")}</option>
              {districts.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </select>
          </label>
          <div className="tfilters__cats" role="group" aria-label={t("travel_filter_category")}>
            {CATEGORIES.map((c) => (
              <button
                key={c.id} type="button"
                className={`tfilters__cat ${category === c.id ? "is-active" : ""}`}
                onClick={() => selectCategory(c.id)}
                aria-pressed={category === c.id}
              >
                {categoryLabel(c.id, lang)}
              </button>
            ))}
          </div>

          {/* Spiritual tradition filter — appears only for the Spiritual
              category. A compact popover keeps the control to one row on
              mobile instead of squeezing eight chips side by side. */}
          {spiritualActive && (
            <div className="tfilters__trad" ref={tradRef}>
              <span className="tfilters__trad-label" id="tfilters-trad-label">
                {t("travel_tradition_label")}
              </span>
              <div className="tfilters__trad-control">
                <button
                  type="button"
                  className="tfilters__trad-btn"
                  onClick={() => setTradOpen((o) => !o)}
                  aria-expanded={tradOpen}
                  aria-haspopup="true"
                  aria-labelledby="tfilters-trad-label"
                  aria-controls="tfilters-trad-menu"
                >
                  <span className="tfilters__trad-value">
                    {activeTraditions.length === 0
                      ? t("travel_tradition_all")
                      : activeTraditions.length === 1
                        ? spiritualTraditionShort(activeTraditions[0], lang)
                        : activeTraditions.map((id) => spiritualTraditionShort(id, lang)).join(", ")}
                  </span>
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`tfilters__trad-chev ${tradOpen ? "is-open" : ""}`}
                  />
                </button>

                {tradOpen && (
                  <div
                    className="tfilters__trad-menu"
                    id="tfilters-trad-menu"
                    role="group"
                    aria-label={t("travel_tradition_group")}
                  >
                    {traditionOptions.length === 0 ? (
                      <p className="tfilters__trad-empty">
                        {t("travel_tradition_none_available")}
                      </p>
                    ) : (
                      <>
                        {/* "All traditions" — the explicit way back. */}
                        <button
                          type="button"
                          className={`tfilters__trad-opt ${activeTraditions.length === 0 ? "is-active" : ""}`}
                          onClick={clearTraditions}
                          aria-pressed={activeTraditions.length === 0}
                        >
                          <span className="tfilters__trad-box" aria-hidden="true">
                            {activeTraditions.length === 0 && <Check size={12} />}
                          </span>
                          {t("travel_tradition_all")}
                        </button>

                        <div className="tfilters__trad-sep" role="presentation" />

                        {traditionOptions.map((o) => {
                          const on = activeTraditions.includes(o.id);
                          return (
                            <button
                              key={o.id}
                              type="button"
                              className={`tfilters__trad-opt ${on ? "is-active" : ""}`}
                              onClick={() => toggleTradition(o.id)}
                              aria-pressed={on}
                            >
                              <span className="tfilters__trad-box" aria-hidden="true">
                                {on && <Check size={12} />}
                              </span>
                              {spiritualTraditionLabel(o.id, lang)}
                            </button>
                          );
                        })}

                        {activeTraditions.length > 0 && (
                          <>
                            <div className="tfilters__trad-sep" role="presentation" />
                            <button
                              type="button"
                              className="tfilters__trad-clear"
                              onClick={clearTraditions}
                            >
                              {t("travel_tradition_clear")}
                            </button>
                          </>
                        )}

                        <p className="tfilters__trad-hint">{t("travel_tradition_hint")}</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Selected-state summary for screen readers and quick scanning. */}
              {activeTraditions.length > 0 && (
                <span className="tfilters__trad-count">
                  {activeTraditions.length === 1
                    ? t("travel_tradition_selected_one")
                    : t("travel_tradition_selected", activeTraditions.length)}
                </span>
              )}
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <p className="tempty">
            {spiritualActive && activeTraditions.length > 0
              ? t("travel_tradition_empty")
              : t("travel_no_match")}
          </p>
        ) : (
          <>
            <div
              className="ddest-rail"
              ref={destRailRef}
              tabIndex={0}
              role="region"
              aria-label={t("travel_popular_title")}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); destScroll(1); }
                if (e.key === "ArrowLeft") { e.preventDefault(); destScroll(-1); }
              }}
            >
              {results.slice(0, 24).map((d) => (
                <DestinationCard
                  key={d.id} destination={d}
                  onOpen={go(`#/district/${d.district}`)}
                />
              ))}
            </div>
            <div className="trail-controls">
              <button
                type="button" className="trail-arrow"
                onClick={() => destScroll(-1)} disabled={!destCanPrev}
                aria-label={t("travel_dest_rail_prev")}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button" className="trail-arrow"
                onClick={() => destScroll(1)} disabled={!destCanNext}
                aria-label={t("travel_dest_rail_next")}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </section>

      {/* D ── BUILD YOUR OWN TRIP ──────────────────────────────── */}
      <section className="tbuild" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Route size={14} aria-hidden="true" /> {t("travel_build_kicker")}</span>
          <h2 className="thub__sec-title">{t("travel_build_title")}</h2>
        </div>
        <ol className="tbuild__steps">
          {[
            { n: 1, title: t("travel_build_step1"), desc: t("travel_build_step1d") },
            { n: 2, title: t("travel_build_step2"), desc: t("travel_build_step2d") },
            { n: 3, title: t("travel_build_step3"), desc: t("travel_build_step3d") },
            { n: 4, title: t("travel_build_step4"), desc: t("travel_build_step4d") },
          ].map((s) => (
            <li key={s.n} className="tbuild__step" data-reveal>
              <span className="tbuild__num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
        <div className="tbuild__cta">
          <a className="thub__btn thub__btn--dark" href="#/trip/plan" onClick={quickPlan}>
            {t("travel_build_cta")} <ArrowRight size={16} aria-hidden="true" />
          </a>
          {count > 0 && (
            <a className="thub__btn thub__btn--outline" href="#/trip">
              {t("nav_my_trip")} <span className="tbuild__count">{count}</span>
            </a>
          )}
        </div>
      </section>


      {/* E ── FEATURED EXPERIENCES ─────────────────────────────── */}
      <section className="texp" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><Compass size={14} aria-hidden="true" /> {t("travel_exp_kicker")}</span>
          <h2 className="thub__sec-title">{t("travel_exp_title")}</h2>
          <p className="thub__sec-sub">{t("travel_exp_sub")}</p>
        </div>
        <div className="texp__grid">
          {EXPERIENCES.map((x) => (
            <article key={x.key} className="texp__card" data-reveal>
              <span className="texp__icon" aria-hidden="true"><x.Icon size={20} /></span>
              <h3>{x.title}</h3>
              <p>{x.body}</p>
              <button
                type="button" className="texp__add"
                onClick={() => { addDestination(x.dest); window.location.hash = "#/trip"; }}
              >
                <Check size={14} aria-hidden="true" /> {t("dcard_add")}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* F ── PRACTICAL TRAVEL GUIDE ───────────────────────────── */}
      <section className="tguide" data-reveal>
        <div className="thub__head">
          <span className="thub__sec-kicker"><CalendarDays size={14} aria-hidden="true" /> {t("travel_guide_kicker")}</span>
          <h2 className="thub__sec-title">{t("travel_guide_title")}</h2>
        </div>
        <div className="tguide__grid">
          <div className="tguide__card"><h3>{t("travel_guide_season")}</h3><p>{t("travel_guide_season_body")}</p></div>
          <div className="tguide__card"><h3>{t("travel_guide_transport")}</h3><p>{t("travel_guide_transport_body")}</p></div>
          <div className="tguide__card"><h3>{t("travel_guide_duration")}</h3><p>{t("travel_guide_duration_body")}</p></div>
          <div className="tguide__card"><h3>{t("travel_guide_tips")}</h3><p>{t("travel_guide_tips_body")}</p></div>
          <div className="tguide__card"><h3>{t("travel_guide_budget")}</h3><p>{t("travel_guide_budget_body")}</p></div>
        </div>
      </section>

      {/* G ── FINAL CTA ────────────────────────────────────────── */}
      <section className="tfinal" data-reveal>
        <div className="tfinal__inner">
          <span className="thub__sec-kicker"><Sparkles size={14} aria-hidden="true" /> {t("itin_kicker")}</span>
          <h2 className="tfinal__title">{t("travel_final_title")}</h2>
          <p className="tfinal__sub">{t("travel_final_sub")}</p>
          <a className="thub__btn thub__btn--solid" href="#/trip/plan" onClick={quickPlan}>
            {t("travel_final_cta")} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Culture nudge */}
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
