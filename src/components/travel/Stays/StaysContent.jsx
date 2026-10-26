import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { DISTRICTS, slugify } from "@/data/travel/districts";
import { getStays, bookingUrl, agodaUrl, googleUrl } from "@/data/travel/stays";
import { useApp } from "@/store/AppContext";

/** One stay card — type badge + area + registered tariff + live booking links. */
export function StayCard({ stay, t, district, onSelect, selected = false }) {
  return (
    <article className={`stay ${selected ? "stay--selected" : ""}`}>
      {district && <span className="label stay__district">{district}</span>}
      <span className="label stay__type">{t(`type_${stay.type}`)}</span>
      <h3 className="stay__name">{stay.name}</h3>
      <p className="stay__area">{stay.area}</p>
      <p className="stay__price">
        <strong>₹{Number(stay.registeredPrice || 0).toLocaleString("en-IN")}</strong>
        <span>{t("stay_registered_price")}</span>
      </p>
      {onSelect && (
        <button
          type="button"
          className={`stay__select ${selected ? "is-selected" : ""}`}
          onClick={() => onSelect(stay)}
          aria-pressed={selected}
        >
          {selected ? t("stay_selected") : t("stay_choose")}
        </button>
      )}
      <div className="stay__links">
        <a className="stay__link stay__link--booking" href={bookingUrl(stay)} target="_blank" rel="noopener noreferrer">
          Booking.com <ExternalLink size={11} aria-hidden="true" />
        </a>
        <a className="stay__link stay__link--agoda" href={agodaUrl(stay)} target="_blank" rel="noopener noreferrer">
          Agoda <ExternalLink size={11} aria-hidden="true" />
        </a>
        <a className="stay__link stay__link--google" href={googleUrl(stay)} target="_blank" rel="noopener noreferrer">
          Google <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

/** Home section — pick a district, see its stays (replaces old Rooms & Suites). */
export function StaysExplorer() {
  const { t, pick } = useApp();
  const [slug, setSlug] = useState("kamrup-metropolitan");
  const district = DISTRICTS.find((d) => slugify(d.name) === slug);
  const stays = getStays(slug);

  return (
    <section className="stays" id="suites" aria-label={t("stays_title")} data-reveal>
      <div className="stays__head">
        <span className="label">{t("stays_label")}</span>
        <h2>{t("stays_title")}</h2>
        <p className="stays__sub">{t("stays_sub")}</p>
        <label className="stays__pick">
          <span className="label">{t("stays_pick")}</span>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} aria-label={t("stays_pick")}>
            {[...DISTRICTS]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((d) => (
                <option key={d.no} value={slugify(d.name)}>
                  {pick(d.name)} — {pick(d.hq)}
                </option>
              ))}
          </select>
        </label>
        <p className="label stays__meta">
          {pick(district?.name)} · {t("stays_count", stays.length)}
        </p>
      </div>
      <div className="stays__grid" key={slug}>
        {stays.map((s) => (
          <StayCard key={s.name} stay={s} t={t} />
        ))}
      </div>
      <p className="stays__note">{t("stays_live")}</p>
      <div className="dlist__foot">
        <a className="btn btn--solid" href="#/stays">
          {t("stays_view_all")}
        </a>
      </div>
    </section>
  );
}

/** District page section — that district's own stays. */
export function DistrictStays({ slug }) {
  const { t, pick } = useApp();
  const district = DISTRICTS.find((d) => slugify(d.name) === slug);
  const stays = getStays(slug);
  if (!district || stays.length === 0) return null;
  return (
    <section className="stays stays--district" id="stays" aria-label={t("stays_title_d")} data-reveal>
      <div className="stays__head">
        <span className="label">{t("stays_kicker", pick(district.name))}</span>
        <h2>{t("stays_title_d")}</h2>
        <p className="stays__sub">{t("stays_sub_d", stays.length, pick(district.name))}</p>
      </div>
      <div className="stays__grid">
        {stays.map((s) => (
          <StayCard key={s.name} stay={s} t={t} />
        ))}
      </div>
      <p className="stays__note">{t("stays_live")}</p>
      <div className="dlist__foot">
        <a className="btn btn--ghost" href="#/districts">
          {t("dpage_explore")}
        </a>
        <a className="btn btn--solid" href="#/stays">
          {t("stays_view_all")}
        </a>
      </div>
    </section>
  );
}

export default StaysExplorer;
