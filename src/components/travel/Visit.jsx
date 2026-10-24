import { MapPin, CalendarCheck, Phone, Mail, Leaf } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { LOCATION, FINALE } from "@/data/culture/site/experiences.js";
import BookingForm from "@/pages/Travel/BookingForm";

/**
 * STANDALONE PAGE (#/visit) — Plan Your Visit.
 * Hero + travel info (how to reach, best season) + booking form.
 */
export default function Visit() {
  const { t } = useApp();
  return (
    <section className="visit" id="top" aria-label={t("book_title")}>
      {/* page hero */}
      <div className="visit__hero" data-reveal>
        <div
          className="visit__bg"
          style={{ backgroundImage: `url(${FINALE.image})` }}
          role="img"
          aria-label={FINALE.alt}
        />
        <div className="visit__veil" />
        <div className="visit__hero-content">
          <a className="label visit__back" href="#top">{t("visit_back")}</a>
          <span className="label">{t("visit_kicker", t("nav_visit"))}</span>
          <h1 className="visit__title">
            <span className="tr-line"><span className="tr-inner">{t("visit_l1")}</span></span>
            <span className="tr-line"><span className="tr-inner"><em>{t("visit_l2")}</em></span></span>
          </h1>
          <p className="visit__tag">{t("book_sub")}</p>
        </div>
      </div>

      {/* travel info cards */}
      <div className="visit__info" data-reveal>
        <div className="visit__card visit__card--feature">
          <MapPin size={18} aria-hidden="true" />
          <h3>{t("visit_reach")}</h3>
          <ul>
            {LOCATION.facts.slice(0, 3).map((f) => (
              <li key={f.k}><span className="label">{f.k}</span><span>{f.v}</span></li>
            ))}
          </ul>
          <a className="btn btn--ghost visit__cardbtn" href="#booking">{t("visit_directions")}</a>
        </div>
        <div className="visit__card visit__card--feature">
          <CalendarCheck size={18} aria-hidden="true" />
          <h3>{t("visit_season")}</h3>
          <p className="visit__season">{LOCATION.facts[3]?.v}</p>
          <ul className="visit__ticks">
            {t("visit_festivals").map((f) => <li key={f}><i />{f}</li>)}
          </ul>
        </div>
        <div className="visit__card visit__card--feature">
          <Leaf size={18} aria-hidden="true" />
          <h3>{t("visit_know")}</h3>
          <ul className="visit__ticks">
            <li><i />{t("book_gamosa")}</li>
            <li><i />{t("book_safari")}</li>
            <li><i />{t("date")} — {t("book_flex")}</li>
          </ul>
          <div className="visit__contactmini">
            <a href="mailto:namaskar@axom.example"><Mail size={14} aria-hidden="true" /> namaskar@axom.example</a>
            <a href="tel:+913610000000"><Phone size={14} aria-hidden="true" /> +91 361 000 0000</a>
          </div>
        </div>
      </div>

      {/* the enquiry form */}
      <BookingForm standalone />

      {/* back strip */}
      <div className="visit__contact" data-reveal>
        <a className="btn btn--ghost" href="#top">{t("visit_home")}</a>
        <a className="btn btn--solid" href="#/districts">{t("visit_districts")}</a>
      </div>
    </section>
  );
}
