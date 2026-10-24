import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Tag, Clock, CalendarDays } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { useTrip } from "@/store/TripContext";
import { categoryLabel } from "@/data/travel/destinations";

// Travel interests are broader than destination categories (e.g. food,
// photography, local life), so they carry their own bilingual labels.
const INTERESTS = [
  { key: "nature", label: { en: "Nature", as: "প্ৰকৃতি" } },
  { key: "wildlife", label: { en: "Wildlife", as: "বন্যপ্ৰাণী" } },
  { key: "culture", label: { en: "Culture", as: "সংস্কৃতি" } },
  { key: "heritage", label: { en: "Heritage", as: "ঐতিহাসিক" } },
  { key: "spiritual", label: { en: "Spiritual", as: "আধ্যাত্মিক" } },
  { key: "food", label: { en: "Food", as: "আহাৰ" } },
  { key: "photography", label: { en: "Photography", as: "আলেখ্যন" } },
  { key: "adventure", label: { en: "Adventure", as: "দুঃসাহস" } },
  { key: "local", label: { en: "Local life", as: "স্থানীয় জীৱন" } },
];
const todayISO = () => new Date().toISOString().slice(0, 10);

/**
 * TripPlanner — the travel-details wizard (route #/trip/plan).
 * 4 steps with visible progress: 1 dates · 2 travellers · 3 preferences ·
 * 4 review. On submit it builds the itinerary and routes to the results page.
 */
export default function TripPlanner() {
  const { t, pick } = useApp();
  const { selected, count, details, updateDetails, buildItinerary } = useTrip();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  const totalSteps = 4;
  const set = (patch) => updateDetails(patch);
  const travellers = (Number(details.adults) || 0) + (Number(details.children) || 0);

  function validate() {
    const errs = [];
    if (!details.arrivalDate) errs.push(t("plan_err_dates"));
    else if (details.arrivalDate < todayISO()) errs.push(t("plan_err_past"));
    if (details.departureDate && details.departureDate < details.arrivalDate)
      errs.push(t("plan_err_order"));
    if (travellers < 1) errs.push(t("plan_err_travellers"));
    setErrors(errs);
    return errs.length === 0;
  }

  const goTo = (next) => {
    if (next > step && !validate()) return;
    setStep(Math.min(Math.max(1, next), totalSteps));
    window.scrollTo({ top: 0 });
  };

  const onGenerate = () => {
    if (count === 0) {
      setErrors([t("plan_need_places")]);
      window.location.hash = "#/trip";
      return;
    }
    if (!validate()) return;
    buildItinerary();
    window.location.hash = "#/trip/itinerary";
    window.scrollTo({ top: 0 });
  };

  const toggleInterest = (key) => {
    const cur = details.interests || [];
    set({ interests: cur.includes(key) ? cur.filter((x) => x !== key) : [...cur, key] });
  };

  return (
    <section className="plan" id="top">
      <div className="plan__head">
        <a className="label plan__back" href="#/trip">← {t("trip_title")}</a>
        <span className="label plan__kicker">{t("plan_kicker")}</span>
        <h1 className="plan__title">{t("plan_title")}</h1>
      </div>

      <ol className="plan__steps" aria-label={t("plan_step_of", step, totalSteps)}>
        {[
          { n: 1, title: t("plan_step1"), desc: t("plan_step1d") },
          { n: 2, title: t("plan_step2"), desc: t("plan_step2d") },
          { n: 3, title: t("plan_step3"), desc: t("plan_step3d") },
          { n: 4, title: t("plan_step4"), desc: t("plan_step4d") },
        ].map((s) => (
          <li
            key={s.n}
            className={`plan__step ${step === s.n ? "is-active" : ""} ${step > s.n ? "is-done" : ""}`}
            aria-current={step === s.n ? "step" : undefined}
          >
            <button type="button" onClick={() => goTo(s.n)} className="plan__step-btn">
              <span className="plan__step-num">{s.n}</span>
              <span className="plan__step-text">
                <strong>{s.title}</strong>
                <em>{s.desc}</em>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="label plan__progress">{t("plan_step_of", step, totalSteps)}</p>

      {errors.length > 0 && (
        <div className="plan__errors" role="alert">
          {errors.map((e) => <p key={e}>• {e}</p>)}
        </div>
      )}

      <div className="plan__panel">
        {step === 1 && (
          <div className="plan__grid">
            <label className="plan__field">
              <span>{t("plan_arrival_date")} *</span>
              <input type="date" min={todayISO()} value={details.arrivalDate}
                onChange={(e) => set({ arrivalDate: e.target.value })} required />
            </label>
            <label className="plan__field">
              <span>{t("plan_departure_date")}</span>
              <input type="date" min={details.arrivalDate || todayISO()} value={details.departureDate}
                onChange={(e) => set({ departureDate: e.target.value })} />
            </label>
            <label className="plan__field plan__field--wide">
              <span>{t("plan_start_location")}</span>
              <input type="text" value={details.startLocation} placeholder={t("plan_start_hint")}
                onChange={(e) => set({ startLocation: e.target.value })} />
            </label>
            <label className="plan__field">
              <span>{t("plan_arrival_time")}</span>
              <input type="time" value={details.arrivalTime}
                onChange={(e) => set({ arrivalTime: e.target.value })} />
            </label>
            <label className="plan__field">
              <span>{t("plan_departure_time")}</span>
              <input type="time" value={details.departureTime}
                onChange={(e) => set({ departureTime: e.target.value })} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="plan__grid">
            <label className="plan__field">
              <span>{t("plan_adults")}</span>
              <input type="number" min="0" max="30" value={details.adults}
                onChange={(e) => set({ adults: e.target.value })} />
            </label>
            <label className="plan__field">
              <span>{t("plan_children")}</span>
              <input type="number" min="0" max="20" value={details.children}
                onChange={(e) => set({ children: e.target.value })} />
            </label>
            <fieldset className="plan__field plan__field--wide">
              <legend>{t("plan_style")}</legend>
              <div className="plan__chips">
                {["relaxed", "balanced", "packed"].map((s) => (
                  <button key={s} type="button"
                    className={`plan__chip ${details.travelStyle === s ? "is-active" : ""}`}
                    onClick={() => set({ travelStyle: s })} aria-pressed={details.travelStyle === s}>
                    {t(`plan_style_${s}`)}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="plan__field plan__field--wide">
              <span>{t("plan_accessibility")}</span>
              <input type="text" value={details.accessibility}
                onChange={(e) => set({ accessibility: e.target.value })} />
            </label>
          </div>
        )}


        {step === 3 && (
          <div className="plan__grid">
            <label className="plan__field">
              <span>{t("plan_budget")}</span>
              <input type="number" min="0" step="500" value={details.budget}
                placeholder="e.g. 60000"
                onChange={(e) => set({ budget: e.target.value })} />
            </label>
            <fieldset className="plan__field">
              <legend>{t("plan_budget_cat")}</legend>
              <div className="plan__chips">
                {["low", "mod", "prem"].map((b) => (
                  <button key={b} type="button"
                    className={`plan__chip ${details.budgetCategory === b ? "is-active" : ""}`}
                    onClick={() => set({ budgetCategory: b })} aria-pressed={details.budgetCategory === b}>
                    {t(`plan_budget_${b}`)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="plan__field">
              <legend>{t("plan_transport")}</legend>
              <div className="plan__chips">
                {["public", "cab", "self", "undecided"].map((b) => (
                  <button key={b} type="button"
                    className={`plan__chip ${details.transport === b ? "is-active" : ""}`}
                    onClick={() => set({ transport: b })} aria-pressed={details.transport === b}>
                    {t(`plan_transport_${b}`)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="plan__field">
              <legend>{t("plan_accommodation")}</legend>
              <div className="plan__chips">
                {["budget", "hotel", "premium", "homestay", "undecided"].map((a) => (
                  <button key={a} type="button"
                    className={`plan__chip ${details.accommodation === a ? "is-active" : ""}`}
                    onClick={() => set({ accommodation: a })} aria-pressed={details.accommodation === a}>
                    {t(`plan_acc_${a}`)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="plan__field plan__field--wide">
              <legend>{t("plan_interests")}</legend>
              <div className="plan__chips plan__chips--wrap">
                {INTERESTS.map((it) => {
                  const on = (details.interests || []).includes(it.key);
                  return (
                    <button key={it.key} type="button"
                      className={`plan__chip ${on ? "is-active" : ""}`}
                      onClick={() => toggleInterest(it.key)} aria-pressed={on}>
                      {pick(it.label)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="plan__field plan__field--wide">
              <span>{t("plan_notes")}</span>
              <textarea rows="3" value={details.notes}
                onChange={(e) => set({ notes: e.target.value })} />
            </label>
          </div>
        )}


        {step === 4 && (
          <div className="plan__review">
            <h2 className="plan__review-title">{t("plan_review_destinations")} ({count})</h2>
            <ul className="plan__review-list">
              {selected.map((d) => (
                <li key={d.id}>
                  <MapPin size={13} aria-hidden="true" />
                  <strong>{d.name}</strong>
                  <span className="label">{d.districtName} · {categoryLabel(d.category)}</span>
                  <span className="label"><Clock size={12} aria-hidden="true" /> ~{d.visitHours}h</span>
                </li>
              ))}
            </ul>

            <dl className="plan__summary">
              <div><dt><CalendarDays size={13} aria-hidden="true" /> {t("plan_review_dates")}</dt>
                <dd>{details.arrivalDate || "—"}{details.departureDate ? ` → ${details.departureDate}` : ""}</dd></div>
              <div><dt>{t("plan_review_travellers")}</dt>
                <dd>{travellers} ({details.adults} {t("plan_adults")} · {details.children} {t("plan_children")})</dd></div>
              <div><dt>{t("plan_review_style")}</dt><dd>{t(`plan_style_${details.travelStyle}`)}</dd></div>
              <div><dt>{t("plan_review_transport")}</dt><dd>{t(`plan_transport_${details.transport}`)}</dd></div>
              <div><dt>{t("plan_review_accommodation")}</dt><dd>{t(`plan_acc_${details.accommodation}`)}</dd></div>
              <div><dt>{t("plan_review_budget")}</dt>
                <dd>{details.budget ? `₹${Number(details.budget).toLocaleString("en-IN")}` : "—"} · {t(`plan_budget_${details.budgetCategory}`)}</dd></div>
              {(details.interests || []).length > 0 && (
                <div className="plan__summary--wide"><dt>{t("plan_review_interests")}</dt>
                  <dd>{(details.interests || []).map((k) => pick(INTERESTS.find((x) => x.key === k)?.label || { en: k })).join(" · ")}</dd></div>
              )}
              {details.startLocation && (
                <div className="plan__summary--wide"><dt>{t("itin_start")}</dt><dd>{details.startLocation}</dd></div>
              )}
            </dl>
          </div>
        )}
      </div>

      <div className="plan__nav">
        <button type="button" className="plan__navbtn plan__navbtn--back"
          onClick={() => goTo(step - 1)} disabled={step === 1}>
          <ArrowLeft size={15} aria-hidden="true" /> {t("plan_back")}
        </button>
        {step < totalSteps ? (
          <button type="button" className="plan__navbtn plan__navbtn--next"
            onClick={() => goTo(step + 1)}>
            {t("plan_next")} <ArrowRight size={15} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="plan__navbtn plan__navbtn--generate" onClick={onGenerate}>
            <Tag size={15} aria-hidden="true" /> {t("plan_generate")}
          </button>
        )}
      </div>
    </section>
  );
}
