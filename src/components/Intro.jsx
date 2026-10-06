import { useLayoutEffect, useRef } from "react";
import { INTRO } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { registerDepth } from "../lib/pointer";

/**
 * SCENE 02 — Pinned editorial statement. Text starts distant (scale up
 * toward viewer as you scroll), images fly in from two depth planes,
 * then the whole scene recedes.
 */
export default function Intro() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      tl.fromTo(".intro__label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .fromTo(
          ".intro__title .tr-inner",
          { yPercent: 120, scale: 1.15, filter: "blur(6px)" },
          { yPercent: 0, scale: 1, filter: "blur(0px)", stagger: 0.6, duration: 2 },
          0
        )
        .fromTo(".intro__img1", { opacity: 0, xPercent: 30, scale: 1.3, rotate: 3 }, { opacity: 1, xPercent: 0, scale: 1, rotate: 0, duration: 2.4 }, 1.2)
        .fromTo(".intro__img2", { opacity: 0, xPercent: -30, scale: 1.3 }, { opacity: 1, xPercent: 0, scale: 1, duration: 2.4 }, 1.6)
        .fromTo(".intro__body", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 3.4)
        // scene recedes toward the next
        .to(".intro__content", { scale: 0.86, opacity: 0.25, filter: "blur(3px)", duration: 2.4 }, 4.6)
        .to(".intro__img1", { yPercent: -40, scale: 1.12, duration: 2.4 }, 4.6)
        .to(".intro__img2", { yPercent: 46, scale: 1.12, duration: 2.4 }, 4.6);
    }, root);
    const un = registerDepth(root.current.querySelector(".intro__title"), { depth: -10 });
    return () => { ctx.revert(); un(); };
  }, []);

  return (
    <section ref={root} className="intro" id="intro" aria-label="Introduction statement">
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
