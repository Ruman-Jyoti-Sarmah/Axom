import { INTRO } from "@/data/site/hero.js";
import { useContent } from "@/lib/useContent";

/** Intro — headline + body follow the site language. */
export default function Intro() {
  const { intro } = useContent();
  const lines = [intro.l1, intro.l2, intro.l3];
  return (
    <section className="intro" id="intro" aria-label="Introduction statement" data-reveal>
      <div className="intro__stage">
        <div className="intro__img1">
          <img src={INTRO.image} alt={INTRO.imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="intro__img2">
          <img src={INTRO.image2} alt={INTRO.image2Alt} loading="lazy" decoding="async" />
        </div>
        <div className="intro__content">
          <span className="label intro__label">{intro.label}</span>
          <h2 className="intro__title">
            {lines.map((line, i) => (
              <span className="tr-line" key={line}>
                <span className="tr-inner" style={i === 1 ? { color: "var(--bronze)", fontStyle: "italic", fontSize: "0.55em" } : undefined}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="intro__body">{intro.body}</p>
        </div>
      </div>
    </section>
  );
}
