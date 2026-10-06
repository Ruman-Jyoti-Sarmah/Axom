import { useLayoutEffect, useRef } from "react";
import { DISTRICTS } from "../data/districts";
import { gsap, prefersReducedMotion } from "../lib/motion";
import DepthImage from "./DepthImage";
import TextReveal from "./TextReveal";

/**
 * SCENE 07 — The 35 Districts. A long editorial scroll: each district rises
 * from depth as it enters the viewport (section by section), its image
 * counter-parallaxes, and division dividers mark the five regions of Assam.
 */
export default function Districts() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".district").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 110, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
        // number drifts slightly faster than the card — depth plane
        gsap.fromTo(
          card.querySelector(".district__num"),
          { xPercent: i % 2 ? 8 : -8 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "center center", scrub: 1.4 },
          }
        );
      });
      gsap.utils.toArray(".districts__division").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // group districts by division so the five regions read as chapters
  const divisions = [];
  DISTRICTS.forEach((d) => {
    const last = divisions[divisions.length - 1];
    if (last && last.name === d.division) last.items.push(d);
    else divisions.push({ name: d.division, items: [d] });
  });

  return (
    <section ref={root} className="districts scene" id="districts" aria-label="All 35 districts of Assam">
      <div className="districts__head">
        <span className="label">CHAPTER 06 · THE 35 DISTRICTS</span>
        <TextReveal as="h2" lines={["THIRTY-FIVE DISTRICTS,", "ONE AXOMIYA SOUL"]} start="top 85%" />
        <p className="districts__intro">
          From the Barak valley to the Bhutan foothills — scroll through every district of Assam,
          from Charaideo's royal maidams to Majuli's river islands, each with its seat, its story
          and its soul.
        </p>
      </div>

      <div className="districts__list">
        {divisions.map((div) => (
          <div className="districts__group" key={div.name}>
            <div className="districts__division">
              <span className="label">{div.name} Division</span>
              <i className="districts__rule" aria-hidden="true" />
              <span className="label">{String(div.items.length).padStart(2, "0")} districts</span>
            </div>

            {div.items.map((d, i) => (
              <article
                className={`district ${div.items.indexOf(d) % 2 ? "district--alt" : ""}`}
                key={d.no}
                data-cursor="view"
              >
                <div className="district__media">
                  <DepthImage
                    src={d.image}
                    alt={d.alt}
                    depth={30}
                    mouseDepth={6}
                    className="district__imgwrap"
                    imgClassName="district__img"
                  />
                </div>
                <div className="district__body">
                  <span className="district__num" aria-hidden="true">
                    {String(d.no).padStart(2, "0")} <em>/ 35</em>
                  </span>
                  <span className="label district__division-tag">{d.division}</span>
                  <h3 className="district__name">{d.name}</h3>
                  <p className="district__meta">
                    <span>Seat</span> {d.hq}
                  </p>
                  <p className="district__tag">{d.tag}</p>
                  <p className="district__about">{d.about}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
