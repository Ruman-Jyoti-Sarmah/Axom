import { SUITES } from "../data/content";

/**
 * Rooms & Suites — static responsive card grid (was a pinned horizontal
 * scroll track). Cards zoom their image gently on hover.
 */
export default function Rooms() {
  return (
    <section className="rooms" id="suites" aria-label="Rooms and suites">
      <div className="rooms__header">
        <span className="label">CHAPTER 02 · STAYS</span>
        <h2>Rooms &amp; Suites</h2>
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
