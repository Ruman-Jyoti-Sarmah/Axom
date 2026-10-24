import { Trash2, ArrowRight, ArrowLeft, MapPin, Tag, Clock, Moon } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { useTrip } from "@/store/TripContext";
import { categoryLabel } from "@/data/travel/destinations";

/**
 * TripCart — "My Trip" (route #/trip). Lists selected destinations with their
 * district/category/duration, allows removal and a confirmed clear-all, shows
 * an estimated nights hint, and continues to the travel-details wizard.
 */
export default function TripCart() {
  const { t } = useApp();
  const { selected, count, removeDestination, clearTrip, itinerary } = useTrip();

  const totalHours = selected.reduce((n, d) => n + (d.visitHours || 0), 0);
  const districts = [...new Set(selected.map((d) => d.districtName))];
  const suggestedNights = Math.max(1, districts.length + 1);

  const onClear = () => {
    if (window.confirm(t("trip_clear_confirm"))) clearTrip();
  };

  return (
    <section className="trip" id="top">
      <div className="trip__head">
        <a className="label trip__back" href="#/travel">← {t("itin_back_travel")}</a>
        <span className="label trip__kicker">{t("trip_kicker")}</span>
        <h1 className="trip__title">{t("trip_title")}</h1>
        <p className="trip__sub">{t("trip_sub")}</p>
      </div>

      {count === 0 ? (
        <div className="trip__empty" data-reveal>
          <MapPin size={30} aria-hidden="true" />
          <h2>{t("trip_empty_title")}</h2>
          <p>{t("trip_empty_body")}</p>
          <a className="btn btn--solid" href="#/travel">{t("trip_empty_cta")}</a>
        </div>
      ) : (
        <>
          <div className="trip__summary" data-reveal>
            <div className="trip__stat"><strong>{count}</strong><span className="label">{t("trip_col_place")}</span></div>
            <div className="trip__stat"><strong>{districts.length}</strong><span className="label">{t("itin_districts")}</span></div>
            <div className="trip__stat"><strong>~{totalHours}h</strong><span className="label">{t("trip_col_duration")}</span></div>
            <div className="trip__stat">
              <strong>~{suggestedNights}<Moon size={14} aria-hidden="true" /></strong>
              <span className="label">{t("trip_est_nights")}</span>
            </div>
          </div>

          <ul className="trip__list">
            {selected.map((d) => (
              <li key={d.id} className="trip__row" data-reveal>
                <img className="trip__thumb" src={d.image} alt={d.alt || d.name} loading="lazy" decoding="async" />
                <div className="trip__info">
                  <h3>{d.name}</h3>
                  <span className="label trip__meta">
                    <MapPin size={12} aria-hidden="true" /> {d.districtName}
                    <Tag size={12} aria-hidden="true" /> {categoryLabel(d.category)}
                    <Clock size={12} aria-hidden="true" /> ~{d.visitHours}h
                  </span>
                </div>
                <button
                  type="button" className="trip__remove"
                  onClick={() => removeDestination(d.id)}
                  aria-label={`${t("trip_remove")} ${d.name}`}
                >
                  <Trash2 size={16} aria-hidden="true" /> {t("trip_remove")}
                </button>
              </li>
            ))}
          </ul>

          <div className="trip__actions">
            <button type="button" className="btn btn--ghost" onClick={onClear}>
              <Trash2 size={15} aria-hidden="true" /> {t("trip_clear")}
            </button>
            <a className="btn btn--solid" href="#/trip/plan">
              {t("trip_continue")} <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          {itinerary && (
            <div className="trip__actions trip__actions--sub">
              <a className="btn btn--ghost" href="#/trip/itinerary">
                <ArrowLeft size={15} aria-hidden="true" /> {t("itin_title")}
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
}
