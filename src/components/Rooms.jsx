import { useLayoutEffect, useRef } from "react";
import { SUITES } from "../data/content";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";
import { initVelocity, onVelocity } from "../lib/interaction";

/**
 * SCENE 04 — Rooms & Suites. Vertical scroll drives a horizontal track.
 * Off-center rooms recede (scale down, dim, slight rotateY) so the
 * active suite feels nearest to the viewer; images counter-parallax.
 */
export default function Rooms() {
  const root = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const rooms = gsap.utils.toArray(".room", track.current);
      rooms.forEach((room) => {
        const img = room.querySelector("img");
        gsap.fromTo(img, { xPercent: -8 }, {
          xPercent: 8, ease: "none",
          scrollTrigger: { trigger: room, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
        // depth: distance from viewport center controls scale/rotation/dim
        const setScale = gsap.quickTo(room, "scale", { duration: 0.7, ease: "power3.out" });
        const setRot = gsap.quickTo(room, "rotationY", { duration: 0.7, ease: "power3.out" });
        const setOp = gsap.quickTo(room, "opacity", { duration: 0.7, ease: "power3.out" });
        const update = () => {
          const r = room.getBoundingClientRect();
          const d = Math.min(Math.abs(r.left + r.width / 2 - window.innerWidth / 2) / (window.innerWidth * 0.6), 1);
          setScale(1 - d * 0.16);
          setRot(d * -5);
          setOp(1 - d * 0.45);
        };
        ScrollTrigger.create({ trigger: room, containerAnimation: tween, start: "left right", end: "right left", onUpdate: update, onRefresh: update });
      });

      gsap.to(progress.current, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.6}`, scrub: true },
      });

      // velocity energy on the track
      initVelocity();
      const xTo = gsap.quickTo(track.current, "skewX", { duration: 0.6, ease: "power2.out" });
      const unV = onVelocity((n) => xTo(n * 1.6 - n * n * 1.2));
      return () => unV();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="rooms" id="suites" aria-label="Rooms and suites">
      <div className="rooms__viewport" style={{ perspective: "1200px" }}>
        <div className="rooms__header">
          <span className="label">CHAPTER 02 · SUITES</span>
          <h2>Rooms &amp; Suites</h2>
        </div>
        <div ref={track} className="rooms__track" style={{ transformStyle: "preserve-3d" }}>
          {SUITES.map((s) => (
            <article className="room" key={s.id} data-cursor="view">
              <div className="room__img">
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
              </div>
              <div className="room__meta">
                <div>
                  <h3 className="room__name">{s.name}</h3>
                  <p className="room__kind">{s.kind}</p>
                </div>
                <span className="room__num">{s.id}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="rooms__progress" aria-hidden="true"><i ref={progress} /></div>
      </div>
    </section>
  );
}
