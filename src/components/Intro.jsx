import { INTRO } from "../data/content";

/**
 * Intro — static editorial statement: two framed images beside a
 * centred headline and body copy. No pinning, no scrub.
 */
export default function Intro() {
  return (
    <section className="intro" id="intro" aria-label="Introduction statement">
      <div className="intro__stage">
        <div className="intro__img1">
          <img src={INTRO.image} alt={INTRO.imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="intro__img2">
          <img src={INTRO.image2} alt={INTRO.image2Alt} loading="lazy" decoding="async" />
        </div>
        <div className="intro__content">
          <span className="label intro__label">{INTRO.label}</span>
          <h2 className="intro__title">
            {INTRO.lines.map((line, i) => (
              <span className="tr-line" key={line}>
                <span className="tr-inner" style={i === 1 ? { color: "var(--bronze)", fontStyle: "italic", fontSize: "0.55em" } : undefined}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="intro__body">{INTRO.body}</p>
        </div>
      </div>
    </section>
  );
}
