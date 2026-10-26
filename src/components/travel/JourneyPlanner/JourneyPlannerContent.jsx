import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react";
import { DISTRICTS, slugify } from "@/data/travel/districts";
import { getStays } from "@/data/travel/stays";
import { HERO } from "@/data/site/hero";
import { useApp } from "@/store/AppContext";
import { useLocalStorage } from "@/lib/storage";
import {
  buildJourneyStops,
  estimateJourneyStayTotal,
} from "@/lib/journeyPlan";
import { StayCard } from "@/components/travel/Stays/StaysContent";

const todayISO = () => new Date().toISOString().slice(0, 10);

function displayDate(value) {
  if (!value) return "—";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Book Your Assam Journey — choose a route in order, set days at every stop,
 * then see the stays and registered nightly tariffs for that exact route.
 */
export function JourneyPlanner() {
  const { t, pick } = useApp();
  const [savedPlan, setSavedPlan] = useLocalStorage("axom:journey:plan", null);
  const [step, setStep] = useState(1);
  const [firstDistrict, setFirstDistrict] = useState("");
  const [extraDistricts, setExtraDistricts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [stayDays, setStayDays] = useState({});
  const [selectedStays, setSelectedStays] = useState({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const steps = [
    { no: 1, title: t("journey_step1"), desc: t("journey_choose_first") },
    { no: 2, title: t("journey_step2"), desc: t("journey_choose_more") },
    { no: 3, title: t("journey_step3"), desc: t("journey_where") },
    { no: 4, title: t("journey_step4"), desc: t("journey_summary") },
  ];

  const nameOf = (slug) =>
    pick(DISTRICTS.find((district) => slugify(district.name) === slug)?.name || "");
  const districtOf = (slug) =>
    DISTRICTS.find((district) => slugify(district.name) === slug);
  const staysOf = (slug) => getStays(slug);
  const activeExtra = extraDistricts.filter((slug) => slug !== firstDistrict);
  const allSelected = firstDistrict ? [firstDistrict, ...activeExtra] : [];
  const stops = buildJourneyStops(allSelected, startDate, stayDays);
  const lodgingTotal = estimateJourneyStayTotal(stops, selectedStays);

  const chooseFirstDistrict = (slug) => {
    setFirstDistrict(slug);
    setExtraDistricts((current) => current.filter((item) => item !== slug));
  };

  const toggleDistrict = (slug) => {
    setExtraDistricts((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  const moveExtra = (slug, direction) => {
    setExtraDistricts((current) => {
      const index = current.indexOf(slug);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const setDays = (slug, value) => {
    setStayDays((current) => ({
      ...current,
      [slug]: Math.min(30, Math.max(1, Number(value) || 1)),
    }));
  };

  const selectStay = (slug, stay) => {
    setSelectedStays((current) => ({ ...current, [slug]: stay }));
  };

  const savePlan = () => {
    setSavedPlan({
      savedAt: new Date().toISOString(),
      startDate,
      stops: stops.map((stop) => ({
        ...stop,
        district: nameOf(stop.slug),
        stay: selectedStays[stop.slug]?.name || null,
      })),
      lodgingTotal,
      notes,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  };

  return (
    <section className="journey" id="top">
      <div className="journey__hero">
        <img src={HERO.image} alt="" fetchpriority="high" decoding="async" />
        <div className="journey__veil" aria-hidden="true"></div>
        <div className="journey__hero-content">
          <p className="journey__kicker">{t("journey_kicker")}</p>
          <h1 className="journey__title">{t("journey_hero_title")}</h1>
          <p className="journey__sub">{t("journey_hero_sub")}</p>
        </div>
      </div>

      <div className="journey__steps" role="list">
        {steps.map((item) => (
          <div
            key={item.no}
            role="listitem"
            aria-current={step === item.no ? "step" : undefined}
            className={`journey__step-wrap ${step === item.no ? "is-active" : ""}`}
          >
            <div className="journey__step-num" aria-hidden="true">{item.no}</div>
            <h3 className="journey__step-title">{item.title}</h3>
            <p className="journey__step-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="journey__label journey__progress">{t("journey_step_of", step, 4)}</p>

      <div className="journey__content">
        {step === 1 && (
          <div className="journey__step">
            <h2 className="journey__step-title">{steps[0].title}</h2>
            <p className="journey__step-desc">{steps[0].desc}</p>
            <label className="journey__label" htmlFor="journey-first">
              {t("journey_first_district")}
            </label>
            <select
              id="journey-first"
              className="journey__select"
              value={firstDistrict}
              onChange={(event) => chooseFirstDistrict(event.target.value)}
            >
              <option value="">{t("journey_choose_first")}</option>
              {DISTRICTS.map((district) => (
                <option key={district.no} value={slugify(district.name)}>
                  {pick(district.name)} — {pick(district.hq)}
                </option>
              ))}
            </select>
            {firstDistrict && (
              <p className="journey__hint">
                <MapPin size={14} aria-hidden="true" />
                {t("journey_first_hint", nameOf(firstDistrict))}
              </p>
            )}
            <label className="journey__label" htmlFor="journey-start-date">
              <CalendarDays size={13} aria-hidden="true" /> {t("journey_start_date")}
            </label>
            <input
              id="journey-start-date"
              className="journey__select"
              type="date"
              min={todayISO()}
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              disabled={!firstDistrict}
            />
            <div className="journey__step-nav">
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => setStep(2)}
                disabled={!firstDistrict || !startDate}
              >
                <ArrowRight size={15} /> {t("journey_next")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="journey__step">
            <h2 className="journey__step-title">{steps[1].title}</h2>
            <p className="journey__step-desc">{steps[1].desc}</p>
            <p className="journey__hint">{t("journey_order_hint")}</p>
            <p className="journey__label">{t("journey_selected", allSelected.length)}</p>

            <div className="journey__ordered" aria-label={t("journey_ordered_route")}>
              {allSelected.map((slug, index) => (
                <div className="journey__order-row" key={slug}>
                  <span className="journey__order-number">{index + 1}</span>
                  <strong>{nameOf(slug)}</strong>
                  <span className="journey__order-actions">
                    <button
                      type="button"
                      className="journey__icon-btn"
                      onClick={() => moveExtra(slug, -1)}
                      disabled={index === 0 || index === 1}
                      aria-label={t("journey_move_up")}
                    >
                      <ChevronUp size={15} />
                    </button>
                    <button
                      type="button"
                      className="journey__icon-btn"
                      onClick={() => moveExtra(slug, 1)}
                      disabled={index === 0 || index === allSelected.length - 1}
                      aria-label={t("journey_move_down")}
                    >
                      <ChevronDown size={15} />
                    </button>
                    {index > 0 && (
                      <button
                        type="button"
                        className="journey__icon-btn journey__icon-btn--remove"
                        onClick={() => toggleDistrict(slug)}
                        aria-label={`${t("journey_remove")} ${nameOf(slug)}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <ul className="journey__list">
              {DISTRICTS.map((district) => {
                const slug = slugify(district.name);
                const isFirst = slug === firstDistrict;
                const on = isFirst || extraDistricts.includes(slug);
                return (
                  <li className="journey__chip-row" key={district.no}>
                    <span className="journey__chip-wrap">
                      <button
                        type="button"
                        aria-pressed={on}
                        disabled={isFirst}
                        className={`journey__chip ${on ? "is-active" : ""}`}
                        onClick={() => toggleDistrict(slug)}
                      >
                        <span className="journey__chip-name">{pick(district.name)}</span>
                        <span className="journey__chip-count">
                          {isFirst
                            ? t("journey_first_badge")
                            : t("stays_count", staysOf(slug).length)}
                        </span>
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="journey__step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                <ArrowLeft size={15} aria-hidden="true" /> {t("journey_back")}
              </button>
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => setStep(3)}
                disabled={allSelected.length === 0}
              >
                {t("journey_next")} <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="journey__step journey__step--wide">
            <h2 className="journey__step-title">{steps[2].title}</h2>
            <p className="journey__step-desc">{steps[2].desc}</p>
            <div className="journey__stays">
              {stops.map((stop) => {
                const district = districtOf(stop.slug);
                const stays = staysOf(stop.slug);
                const chosen = selectedStays[stop.slug];
                const nextStop = stops[stop.position];
                return (
                  <section
                    key={stop.slug}
                    className="journey__stop"
                    aria-labelledby={`journey-stop-${stop.slug}`}
                  >
                    <div className="journey__stop-head">
                      <span className="journey__stop-number">{stop.position}</span>
                      <div>
                        <span className="label">{t("journey_stop_label", stop.position)}</span>
                        <h3 id={`journey-stop-${stop.slug}`}>{pick(district?.name)}</h3>
                      </div>
                    </div>
                    <div className="journey__stop-details">
                      <div className="journey__arrival">
                        <CalendarDays size={15} aria-hidden="true" />
                        <span>{t("journey_arrival")}</span>
                        <strong>{displayDate(stop.arrivalDate)}</strong>
                      </div>
                      <label className="journey__days">
                        <Clock size={15} aria-hidden="true" />
                        <span>{t("journey_stay_days")}</span>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={stayDays[stop.slug] || 1}
                          onChange={(event) => setDays(stop.slug, event.target.value)}
                        />
                      </label>
                    </div>
                    <p className="journey__hint">
                      {nextStop
                        ? t("journey_next_arrival", displayDate(nextStop.arrivalDate))
                        : t("journey_final_stop")}
                    </p>
                    <p className="journey__registered-note">
                      <BedDouble size={14} aria-hidden="true" /> {t("journey_registered_note")}
                    </p>
                    {stays.length === 0 ? (
                      <div className="journey__empty">{t("journey_no_stays")}</div>
                    ) : (
                      <div className="stays__grid">
                        {stays.map((stay) => (
                          <StayCard
                            key={stay.name}
                            stay={stay}
                            t={t}
                            district={pick(district?.name)}
                            selected={chosen?.name === stay.name}
                            onSelect={(item) => selectStay(stop.slug, item)}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
            <div className="journey__step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                <ArrowLeft size={15} /> {t("journey_back")}
              </button>
              <button type="button" className="btn btn--solid" onClick={() => setStep(4)}>
                {t("journey_next")} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="journey__step journey__step--wide">
            <h2 className="journey__step-title">{steps[3].title}</h2>
            <p className="journey__step-desc">{steps[3].desc}</p>
            <div className="journey__summary">
              {stops.map((stop) => (
                <div className="journey__summary-row" key={stop.slug}>
                  <h3>{stop.position}. {nameOf(stop.slug)}</h3>
                  <p>
                    {displayDate(stop.arrivalDate)} · {stop.days} {t("journey_days_short")} ·{" "}
                    {selectedStays[stop.slug]?.name || t("journey_stay_not_selected")}
                    {selectedStays[stop.slug] && (
                      <span className="journey__summary-price">
                        {` · ₹${selectedStays[stop.slug].registeredPrice.toLocaleString("en-IN")}/${t("journey_night_short")}`}
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <div className="journey__summary-row journey__summary-row--total">
                <h3>{t("journey_lodging_total")}</h3>
                <p>₹{lodgingTotal.toLocaleString("en-IN")}</p>
              </div>
              {savedPlan && <div className="journey__summary-row"><h3>{t("journey_last_saved")}</h3><p>{displayDate(savedPlan.savedAt?.slice(0, 10))}</p></div>}
            </div>
            <label className="journey__label" htmlFor="journey-notes">
              {t("journey_notes")}
            </label>
            <textarea
              id="journey-notes"
              className="journey__textarea"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder={t("journey_notes_hint")}
            />
            <div className="journey__step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(3)}>
                <ArrowLeft size={15} aria-hidden="true" /> {t("journey_back")}
              </button>
              <button type="button" className="btn btn--solid" onClick={savePlan}>
                {t("journey_save_plan")} <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
            {saved && <p className="journey__hint">{t("journey_plan_saved")}</p>}
            <p className="journey__plannote">{t("journey_plan_note")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
