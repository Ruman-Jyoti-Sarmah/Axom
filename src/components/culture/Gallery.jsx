import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY } from "@/data/culture/site/experiences.js";
import { useContent } from "@/lib/useContent";

/** DYNAMIC Gallery — header + captions follow the site language. */
const CAP_AS = [
  "কামাখ্যা দেৱালয়, পুৱাৰ আৰতি",
  "কাজিৰঙা, পুৱা ৬:৪২",
  "কলপাতৰ ভোজ",
  "ৰঙালী বিহু, চোতাল ৪",
  "লুইত, সোণালী সময়",
  "মাজুলী, বাৰিষা",
  "জাপি, অসমৰ সন্মান",
];

export default function Gallery() {
  const { t, lang } = useContent();
  const items = GALLERY.map((g, i) => (lang === "as" ? { ...g, caption: CAP_AS[i] } : g));
  const root = useRef(null);
  const [index, setIndex] = useState(-1);
  const open = index >= 0;
  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section ref={root} className="gallery scene" id="gallery" aria-label="Gallery" data-reveal>
      <div className="gallery__head">
        <span className="label">{t("gallery_label")}</span>
        <h2>{t("gallery_title")}</h2>
        <p className="gallery__hint">{t("gallery_hint")}</p>
      </div>
      <div className="gallery__flow">
        {items.map((g, i) => (
          <figure className={`gitem gitem--${i + 1}`} key={g.caption} data-reveal>
            <button
              onClick={() => setIndex(i)}
              data-cursor="view"
              aria-label={`View image: ${g.caption}`}
              aria-haspopup="dialog"
            >
              <img src={g.image} alt={g.alt} loading="lazy" decoding="async" width="800" height="600" />
            </button>
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>

      {open && (
      <div
        className="lightbox lightbox--open"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={close}
      >
        <button className="lightbox__close" onClick={close} aria-label={t("lightbox_close")}>
          {t("lightbox_close")} <X size={14} aria-hidden="true" />
        </button>
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); step(-1); }}
        >
          <ChevronLeft size={26} aria-hidden="true" />
        </button>
        <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
          <img src={items[index].image.replace(/width=\d+/, "width=1600")} alt={items[index].alt} />
          <p className="label lightbox__caption">{index + 1} / {items.length} — {items[index].caption}</p>
          <div className="lightbox__thumbs">
            {items.map((g, i) => (
              <button
                key={g.caption}
                className={`lightbox__thumb ${i === index ? "lightbox__thumb--on" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${g.caption}`}
                aria-current={i === index ? "true" : undefined}
              >
                <img src={g.image.replace(/width=\d+/, "width=200")} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); step(1); }}
        >
          <ChevronRight size={26} aria-hidden="true" />
        </button>
      </div>
      )}
    </section>
  );
}
