import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";

/**
 * SCENE 07 — Gallery. An asymmetric, overlapping editorial flow.
 * Images enter from alternating depth planes; a premium lightbox with
 * keyboard navigation opens on click.
 */
export default function Gallery() {
  const root = useRef(null);
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gitem").forEach((item, i) => {
        gsap.fromTo(item, { y: 110, opacity: 0, scale: 0.94 }, {
          y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 90%" },
        });
        gsap.fromTo(item, { yPercent: i % 2 ? 10 : -10 }, {
          yPercent: i % 2 ? -10 : 10, ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1.4 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback((d) => setIndex((i) => (i + d + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  return (
    <section ref={root} className="gallery scene" id="gallery" aria-label="Gallery">
      <div className="gallery__head">
        <span className="label">CHAPTER 05 · GALLERY</span>
        <h2>Moments, Kept</h2>
      </div>
      <div className="gallery__flow">
        {GALLERY.map((g, i) => (
          <figure className={`gitem gitem--${i + 1}`} key={g.caption}>
            <button
              onClick={() => setIndex(i)}
              data-cursor="view"
              aria-label={`View image: ${g.caption}`}
            >
              <img src={g.image} alt={g.alt} loading="lazy" decoding="async" />
            </button>
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div
        className={`lightbox ${open ? "lightbox--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        aria-hidden={!open}
        onClick={close}
      >
        <button className="lightbox__close" onClick={close} aria-label="Close viewer">
          Close <X size={14} aria-hidden="true" />
        </button>
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); step(-1); }}
        >
          <ChevronLeft size={26} aria-hidden="true" />
        </button>
        <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
          {open && <img src={GALLERY[index].image.replace("w=1000", "w=2000")} alt={GALLERY[index].alt} />}
          {open && <p className="label lightbox__caption">{GALLERY[index].caption}</p>}
        </div>
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); step(1); }}
        >
          <ChevronRight size={26} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
