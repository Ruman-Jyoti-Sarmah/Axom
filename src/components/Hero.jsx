import { ArrowDown } from "lucide-react";
import { BRAND, HERO } from "../data/content";
import { useContent } from "../lib/useContent";

/** Hero — LCP image is a real <img> with fetchpriority=high (not CSS bg).
 *  Mobile gets the 24KB -sm variant via srcset/sizes; desktop keeps full-res. */
export default function Hero() {
  const { hero } = useContent();
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <img
        className="hero__bg-img"
        src="/homehero.png"
        srcSet="/homehero.png 1600w"
        sizes="100vw"
        alt={HERO.alt}
        fetchpriority="high"
        decoding="async"
        width="1600"
        height="900"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__content">
        <p className="label hero__est">{hero.est}</p>
        <h1 className="hero__title">
          <span className="tr-line">
            <span className="tr-inner">{hero.l1}</span>
          </span>
          <span className="tr-line">
            <span className="tr-inner">
              <em>{hero.l2}</em>
            </span>
          </span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__support">{hero.support}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <a className="btn hero__cta" href="#intro">
              {hero.discover}
            </a>
            <span className="hero__scroll">
              {hero.scroll}{" "}
              <span className="hero__scroll-line" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
      <ArrowDown
        size={16}
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          zIndex: 2,
          opacity: 0.4,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
