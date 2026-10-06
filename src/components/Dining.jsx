import { DINING } from "../data/content";
import TextReveal from "./TextReveal";

/**
 * Dining — static split layout: full-height image with a dark gradient
 * panel carrying the menu story. No clip reveals.
 */
export default function Dining() {
  return (
    <section className="dining scene" id="dining" aria-label="Dining">
      <div className="dining__media">
        <img src={DINING.image} alt={DINING.alt} loading="lazy" decoding="async" />
      </div>
      <div className="dining__overlay">
        <div className="dining__content">
          <span className="label">{DINING.label}</span>
          <TextReveal as="h2" lines={DINING.title} />
          <p>{DINING.body}</p>
          <ul className="dining__list">
            {DINING.menuHighlights.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
        <div className="dining__inset">
          <img src={DINING.image2} alt={DINING.image2Alt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
