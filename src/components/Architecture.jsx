import { useLayoutEffect, useRef } from "react";
import { ARCHITECTURE } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { registerDepth } from "../lib/pointer";
import TextReveal from "./TextReveal";
import DepthImage from "./DepthImage";

/**
 * SCENE 03 — Architecture. A clip-path window expands to full-bleed as
 * the inner image counter-parallaxes; the detail image floats on a
 * nearer plane and passes the camera.
 */
export default function Architecture() {
  const root = useRef(null);
  const frame = useRef(null);
  const detail = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        frame.current,
        { clipPath: "inset(18% 26% 18% 26% round 2px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 12%", scrub: 1 },
        }
      );
      gsap.fromTo(
        detail.current,
        { yPercent: 46, rotate: 2.5, opacity: 0 },
        {
          yPercent: -14,
          rotate: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.fromTo(
        ".arch__caption",
        { y: 90, opacity: 0 },
        {
          y: -40, opacity: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "center 45%", scrub: 1 },
        }
      );
      gsap.utils.toArray(".arch__facts > div").forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: i * 0.12,
          scrollTrigger: { trigger: ".arch__facts", start: "top 85%" },
        });
      });
    }, root);
    const unD = registerDepth(detail.current, { depth: 14 });
    return () => { ctx.revert(); unD(); };
  }, []);

  return (
    <section ref={root} className="arch scene" id="architecture" aria-label="The Palace architecture">
      <div className="arch__media">
        <div ref={frame} className="arch__frame">
          <DepthImage src={ARCHITECTURE.image} alt={ARCHITECTURE.alt} depth={34} mouseDepth={4} imgClassName="arch__img" />
        </div>
        <div ref={detail} className="arch__detail">
          <img src={ARCHITECTURE.detail} alt={ARCHITECTURE.detailAlt} loading="lazy" decoding="async" />
        </div>
        <div className="arch__caption">
          <span className="label">{ARCHITECTURE.label}</span>
          <TextReveal as="h3" lines={ARCHITECTURE.title} start="top 65%" />
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
