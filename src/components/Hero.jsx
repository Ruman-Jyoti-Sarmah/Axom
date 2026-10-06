import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { BRAND, HERO } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { useTilt } from "../lib/interaction";

/**
 * SCENE 01 — Cinematic hero. Load-in: image scale reveal, headline
 * mask reveals, staggered UI. Scroll: background pulls back (dolly-out),
 * foreground text parallaxes faster and fades past the camera.
 */
export default function Hero() {
  const root = useRef(null);
  const bg = useRef(null);
  const tiltRef = useTilt(2.2, 6);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".hero__bg, .hero__content > *, .nav", { clearProps: "all" });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(bg.current, { scale: 1.18 }, { scale: 1.04, duration: 2.6 }, 0)
        .fromTo(".hero__veil", { opacity: 1 }, { opacity: 1, duration: 0.01 }, 0)
        .fromTo(".hero__est", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.7)
        .fromTo(".hero__title .tr-inner", { yPercent: 118 }, { yPercent: 0, duration: 1.6, stagger: 0.14 }, 0.9)
        .fromTo(".hero__support, .hero__cta, .hero__scroll", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, stagger: 0.1 }, 1.5)
        .fromTo("header.nav", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 1.7);

      // camera dolly-out + text passes camera
      gsap.to(bg.current, {
        scale: 1.22,
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero__content", {
        yPercent: -34,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top" aria-label="Introduction">
      <div ref={tiltRef} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        <div ref={bg} className="hero__bg" style={{ backgroundImage: `url(${HERO.image})` }} role="img" aria-label={HERO.alt} />
      </div>
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
