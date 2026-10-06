import { ArrowDown } from "lucide-react";
import { BRAND, HERO } from "../data/content";

/**
 * Hero — static cinematic cover. No scroll animation; content sits
 * confidently in place with CSS-only hover transitions.
 */
export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__bg" style={{ backgroundImage: `url(${HERO.image})` }} role="img" aria-label={HERO.alt} />
      <div className="hero__veil" />
      <div className="hero__content">
        <p className="label hero__est">{HERO.established ?? BRAND.established}</p>
        <h1 className="hero__title">
          {HERO.headline.map((l, i) => (
            <span className="tr-line" key={l}>
              <span className="tr-inner">{i === 1 ? <em>{l}</em> : l}</span>
            </span>
          ))}
        </h1>
        <div className="hero__bottom">
          <p className="hero__support">{HERO.support}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <a className="btn hero__cta" href="#intro">Discover</a>
            <span className="hero__scroll">
              Scroll <span className="hero__scroll-line" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
      <ArrowDown size={16} style={{ position: "absolute", bottom: 18, left: "50%", zIndex: 2, opacity: 0.4 }} aria-hidden="true" />
    </section>
  );
}
