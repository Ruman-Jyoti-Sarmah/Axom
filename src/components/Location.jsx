import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { LOCATION } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import TextReveal from "./TextReveal";
import DepthImage from "./DepthImage";

/** SCENE 08 — Location. Minimal two-column composition with a stylized map. */
export default function Location() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".location__fact", { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".location__facts", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="location scene" id="location" aria-label="Location">
      <div className="location__inner">
        <div className="location__title">
          <span className="label">CHAPTER 07 · DESTINATION</span>
          <TextReveal as="h2" lines={LOCATION.title} start="top 82%" />
          <p className="location__body">{LOCATION.body}</p>
          <a className="btn" href="#finale">Plan Your Arrival</a>
        </div>
        <div className="location__map" data-cursor="view">
          <DepthImage
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Guwahati-city-03.jpg?width=1400"
            alt="Aerial sunset view over the Brahmaputra and Guwahati, Assam"
            depth={18}
            mouseDepth={6}
            className="location__mapwrap"
            imgClassName="location__mapimg"
          />
          <span className="location__pin" aria-hidden="true">
            <MapPin size={0} style={{ display: "none" }} />
          </span>
        </div>
      </div>
      <div className="location__facts" style={{ margin: "0 var(--gutter) clamp(5rem,10vh,9rem)" }}>
        {LOCATION.facts.map((f) => (
          <div className="location__fact" key={f.k}>
            <span className="label">{f.k}</span>
            <span>{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
