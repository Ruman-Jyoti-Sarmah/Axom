import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { DISTRICTS, slugify } from "@/data/travel/districts";
import { STAYS } from "@/data/travel/stays";
import { HERO } from "@/data/site/hero";
import { useApp } from "@/store/AppContext";
import { StayCard } from "@/components/travel/Stays/StaysContent";

/**
 * Book Your Assam Journey — 1) first district  2) more districts  3) where to stay  4) plan
 */
export function JourneyPlanner() {
  const { t, pick } = useApp();
  const steps = [
    { no: 1, title: t("journey_step1"), desc: t("journey_choose_first") },
    { no: 2, title: t("journey_step2"), desc: t("journey_choose_more") },
    { no: 3, title: t("journey_step3"), desc: t("journey_where") },
    { no: 4, title: t("journey_step4"), desc: t("journey_summary") },
  ];
  const [step, setStep] = useState(1);
  const [firstDistrict, setFirstDistrict] = useState("");
  const [extraDistricts, setExtraDistricts] = useState([]);
  const [dates, setDates] = useState({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const nameOf = (slug) => pick(DISTRICTS.find((d) => slugify(d.name) === slug)?.name || "");
  const staysOf = (slug) => STAYS[slug] || [];
  const setDate = (slug, value) => setDates((p) => ({ ...p, [slug]: value }));

  const toggleDistrict = (slug) =>
    setExtraDistricts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const firstDistrictName = nameOf(firstDistrict);
  const activeExtra = extraDistricts.filter((s) => s !== firstDistrict);
  const allSelected = firstDistrict ? [firstDistrict, ...activeExtra] : [];

  const savePlan = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
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
        {steps.map((s) => (
          <div
            key={s.no}
            role="listitem"
            aria-current={step === s.no ? "step" : undefined}
            className={`journey__step-wrap ${step === s.no ? "is-active" : ""}`}
          >
            <div className="journey__step-num" aria-hidden="true">{s.no}</div>
            <h3 className="journey__step-title">{s.title}</h3>
            <p className="journey__step-desc">{s.desc}</p>
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
              onChange={(e) => setFirstDistrict(e.target.value)}
            >
              <option value="">{t("journey_choose_first")}</option>
              {DISTRICTS.map((d) => (
                <option key={d.no} value={slugify(d.name)}>
                  {pick(d.name)} — {pick(d.hq)}
                </option>
              ))}
            </select>
            {firstDistrict && (
              <p className="journey__hint">
                <MapPin size={14} aria-hidden="true" />
                {t("journey_first_hint", firstDistrictName)}
              </p>
            )}
            {firstDistrict && (
              <>
                <label className="journey__label" htmlFor="journey-date-1">
                  {t("journey_date_for", firstDistrictName)}
                </label>
                <input
                  id="journey-date-1"
                  className="journey__select"
                  type="date"
                  value={dates[firstDistrict] || ""}
                  onChange={(e) => setDate(firstDistrict, e.target.value)}
                />
              </>
            )}
            <div className="journey__step-nav">
              <button className="btn btn--solid" onClick={() => setStep(2)} disabled={!firstDistrict}>
                <ArrowRight size={15} /> {t("journey_next")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="journey__step">
            <h2 className="journey__step-title">{steps[1].title}</h2>
            <p className="journey__step-desc">{steps[1].desc}</p>
            <p className="journey__hint">{t("journey_choose_hint")}</p>
            <p className="journey__label">
              {t("journey_selected", allSelected.length)}
            </p>

            <ul className="journey__list">
              {DISTRICTS.map((d) => {
                const slug = slugify(d.name);
                const isFirst = slug === firstDistrict;
                const on = isFirst || extraDistricts.includes(slug);
                return (
                  <li className="journey__chip-row" key={d.no}>
                    <span className="journey__chip-wrap">
                      <button
                        type="button"
                        aria-pressed={on}
                        disabled={isFirst}
                        className={`journey__chip ${on ? "is-active" : ""}`}
                        onClick={() => toggleDistrict(slug)}
                      >
                        <span className="journey__chip-name">{pick(d.name)}</span>
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
              <button className="btn btn--ghost" onClick={() => setStep(1)}>
                <ArrowLeft size={15} aria-hidden="true" /> {t("journey_back")}
              </button>
              <button
                className="btn btn--solid"
                onClick={() => setStep(3)}
                disabled={allSelected.length === 0}
              >
                {t("journey_next")}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="journey__step">
            <h2 className="journey__step-title">{steps[2].title}</h2>
            <p className="journey__step-desc">{steps[2].desc}</p>
            {allSelected.length === 0 ? (
              <div className="journey__empty">{t("journey_empty_plan")}</div>
            ) : (
              <div className="journey__stays">
                {allSelected.map((slug) => {
                  const district = DISTRICTS.find((d) => slugify(d.name) === slug);
                  const stays = staysOf(slug);
                  return (
                    <section
                      key={slug}
                      className="stays stays--district"
                      aria-labelledby={`stays-head-${slug}`}
                    >
                      <div className="stays__head">
                        <span className="label">{t("journey_where_in", pick(district?.name))}</span>
                        <h2 id={`stays-head-${slug}`}>{pick(district?.name)}</h2>
                        <p className="stays__sub">{t("stays_count", stays.length)}</p>
                      </div>

                      <div className="journey__step">
                        <label className="journey__label" htmlFor={`journey-date-${slug}`}>
                          <CalendarDays size={13} aria-hidden="true" />{" "}
                          {t("journey_date_for", district?.name)}
                        </label>
                        <input
                          id={`journey-date-${slug}`}
                          className="journey__select"
                          type="date"
                          value={dates[slug] || ""}
                          onChange={(e) => setDate(slug, e.target.value)}
                        />
                      </div>

                      <div className="stays__grid">
                        {stays.map((s) => (
                          <StayCard key={s.name} stay={s} t={t} district={pick(district?.name)} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
            <div className="journey__step-nav">
              <button className="btn btn--ghost" onClick={() => setStep(2)}>
                <ArrowLeft size={15} /> {t("journey_back")}
              </button>
              <button
                className="btn btn--solid"
                onClick={() => setStep(4)}
                disabled={allSelected.length === 0}
              >
                {t("journey_next")}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="journey__step">
            <h2 className="journey__step-title">{steps[3].title}</h2>
            <p className="journey__step-desc">{steps[3].desc}</p>
            <div className="journey__summary">
              <div className="journey__summary-row">
                <h3>{t("journey_first")}</h3>
                <p>{firstDistrictName || t("journey_no_district")}</p>
              </div>
              <div className="journey__summary-row">
                <h3>{t("journey_more")}</h3>
                <p>
                  {activeExtra.length
                    ? activeExtra.map(nameOf).join(", ")
                    : t("journey_no_district")}
                </p>
              </div>
              <div className="journey__summary-row">
                <h3>{t("journey_dates")}</h3>
                <p>
                  {allSelected.length
                    ? allSelected
                        .map((slug) => `${nameOf(slug)}: ${dates[slug] || "—"}`)
                        .join(" · ")
                    : "—"}
                </p>
              </div>
              <div className="journey__summary-row">
                <h3>{t("journey_stays_total")}</h3>
                <p>
                  {t(
                    "stays_count",
                    allSelected.reduce((n, slug) => n + staysOf(slug).length, 0)
                  )}
                </p>
              </div>
            </div>
            <label className="journey__label" htmlFor="journey-notes">
              {t("journey_notes")}
            </label>
            <textarea
              id="journey-notes"
              className="journey__textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder={t("journey_notes_hint")}
            />
            <div className="journey__step-nav">
              <button className="btn btn--ghost" onClick={() => setStep(3)}>
                <ArrowLeft size={15} aria-hidden="true" /> {t("journey_back")}
              </button>
              <button className="btn btn--solid" onClick={savePlan}>
                {t("journey_save_plan")}
                <ArrowRight size={15} aria-hidden="true" />
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
