import { useLayoutEffect, useRef } from "react";
import { FINALE } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { registerDepth } from "../lib/pointer";

/**
 * SCENE 09 — Finale. A sticky full-screen image slowly dollies out
 * while the closing typography rises from depth, then the booking
 * CTA surfaces — the final shot of the film.
 */
export default function Finale() {
  const root = useRef(null);
  const bg = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      tl.fromTo(bg.current, { scale: 1.28 }, { scale: 1, ease: "none", duration: 6 }, 0)
        .fromTo(".finale__content h2 .tr-inner", { yPercent: 130, scale: 1.12 }, { yPercent: 0, scale: 1, stagger: 1, duration: 2.4, ease: "power2.out" }, 0.6)
        .fromTo(".finale__cta", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.6 }, 4.2)
        .to(".finale__veil", { opacity: 0.2, duration: 6 }, 0);
    }, root);
    const un = registerDepth(bg.current, { depth: -8 });
    return () => { ctx.revert(); un(); };
  }, []);

  return (
    <section ref={root} className="finale" id="finale" aria-label="Book your stay">
      <div className="finale__stage">
        <div ref={bg} className="finale__bg" style={{ backgroundImage: `url(${FINALE.image})` }} role="img" aria-label={FINALE.alt} />
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
