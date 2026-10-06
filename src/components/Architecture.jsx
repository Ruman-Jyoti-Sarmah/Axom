import { ARCHITECTURE } from "../data/content";
import TextReveal from "./TextReveal";
import DepthImage from "./DepthImage";

/**
 * Architecture — static full-bleed feature with floating detail image
 * and a facts row. No clip-path reveals, no parallax.
 */
export default function Architecture() {
  return (
    <section className="arch scene" id="architecture" aria-label="The Heritage architecture">
      <div className="arch__media">
        <div className="arch__frame">
          <DepthImage src={ARCHITECTURE.image} alt={ARCHITECTURE.alt} imgClassName="arch__img" eager />
        </div>
        <div className="arch__detail">
          <img src={ARCHITECTURE.detail} alt={ARCHITECTURE.detailAlt} loading="lazy" decoding="async" />
        </div>
        <div className="arch__caption">
          <span className="label">{ARCHITECTURE.label}</span>
          <TextReveal as="h3" lines={ARCHITECTURE.title} />
        </div>
      </div>
      <div className="arch__facts">
        {ARCHITECTURE.paragraphs.map((p, i) => (
          <div key={i}>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
