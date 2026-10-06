import { useLayoutEffect, useRef } from "react";
import { EXPERIENCES } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import DepthImage from "./DepthImage";
import TextReveal from "./TextReveal";

/**
 * SCENE 06 — Experiences. An asymmetric editorial grid; each card lives
 * on its own depth plane (scroll parallax alternates direction).
 */
export default function Experiences() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".exp__card").forEach((card, i) => {
        gsap.fromTo(card, { y: 90 * (i % 2 ? -0.6 : 1), opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
        gsap.fromTo(card.querySelector("img"), { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="exp scene" id="experiences" aria-label="Experiences">
      <div className="exp__grid">
        <div className="exp__head">
          <span className="label">CHAPTER 04 · EXPERIENCES</span>
          <TextReveal as="h2" lines={["DAYS MEASURED", "IN WONDER"]} start="top 80%" />
        </div>
        {EXPERIENCES.map((e, i) => (
          <figure className="exp__card" key={e.name}>
            <DepthImage
              src={e.image}
              alt={e.alt}
              depth={i % 2 ? -26 : 26}
              mouseDepth={i % 2 ? 4 : 10}
              className="exp__imgwrap"
              imgClassName="exp__img"
            />
            <figcaption>
              <h3>{e.name}</h3>
              <p>{e.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
