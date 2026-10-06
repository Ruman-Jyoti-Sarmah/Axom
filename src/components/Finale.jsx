import { FINALE } from "../data/content";

/**
 * Finale — simple full-height closing CTA over a still image.
 * No sticky scrub, no dolly-out.
 */
export default function Finale() {
  return (
    <section className="finale" id="finale" aria-label="Book your stay">
      <div className="finale__stage">
        <div className="finale__bg" style={{ backgroundImage: `url(${FINALE.image})` }} role="img" aria-label={FINALE.alt} />
        <div className="finale__veil" />
        <div className="finale__content">
          <h2>
            {FINALE.title.map((l, i) => (
              <span className="tr-line" key={l}>
                <span className="tr-inner">{i === 1 ? <em>{l}</em> : l}</span>
              </span>
            ))}
          </h2>
          <a className="btn btn--solid finale__cta" href="mailto:namaskar@axom.example">
            Book Your Stay
          </a>
        </div>
      </div>
    </section>
  );
}
