import { SUITES } from "../data/content";
import { useContent } from "../lib/useContent";

/** Rooms & Suites — header follows the site language. */
export default function Rooms() {
  const { t } = useContent();
  return (
    <section className="rooms" id="suites" aria-label="Rooms and suites" data-reveal>
      <div className="rooms__header">
        <span className="label">{t("rooms_label")}</span>
        <h2>{t("rooms_title")}</h2>
      </div>
      <div className="rooms__grid">
        {SUITES.map((s) => (
          <article className="room" key={s.id}>
            <div className="room__img">
              <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
            </div>
            <div className="room__meta">
              <div>
                <h3 className="room__name">{s.name}</h3>
                <p className="room__kind">{s.kind}</p>
              </div>
              <span className="room__num">{s.id}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
