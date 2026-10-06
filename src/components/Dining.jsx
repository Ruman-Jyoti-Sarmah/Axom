import { useLayoutEffect, useRef } from "react";
import { DINING } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { registerDepth } from "../lib/pointer";
import TextReveal from "./TextReveal";

/**
 * SCENE 05 — Dining. The scene opens as a narrow cinematic band that
 * expands to full-bleed; overlay text parallaxes independently; a plated
 * dish floats in on a nearer plane and departs past the camera.
 */
export default function Dining() {
  const root = useRef(null);
  const media = useRef(null);
  const inset = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        media.current,
        { clipPath: "inset(0% 0% 62% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "top 15%", scrub: 1 },
        }
      );
      gsap.fromTo(
        ".dining__content",
        { y: 120 },
        {
          y: -80, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.fromTo(
        inset.current,
        { yPercent: 40, opacity: 0, scale: 1.15 },
        {
          yPercent: -18, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 40%", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.fromTo(".dining__list li", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".dining__list", start: "top 88%" },
      });
    }, root);
    const unI = registerDepth(inset.current, { depth: 16, rot: -6 });
    return () => { ctx.revert(); unI(); };
  }, []);

  return (
    <section ref={root} className="dining scene" id="dining" aria-label="Dining">
      <div className="dining__stage">
        <div ref={media} className="dining__media">
          <img src={DINING.image} alt={DINING.alt} loading="lazy" decoding="async" />
        </div>
        <div className="dining__overlay">
          <div className="dining__content">
            <span className="label">{DINING.label}</span>
            <TextReveal as="h2" lines={DINING.title} start="top 70%" />
            <p>{DINING.body}</p>
            <ul className="dining__list">
              {DINING.menuHighlights.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </div>
        <div ref={inset} className="dining__inset" data-cursor="view">
          <img src={DINING.image2} alt={DINING.image2Alt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
