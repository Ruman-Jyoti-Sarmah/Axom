import { useCallback, useEffect, useRef, useState } from "react";
import { DISTRICTS, slugify } from "../data/districts";
import { useApp } from "../store/AppContext";

// Assam's headline attractions — imagery via Wikimedia Commons
// (Special:FilePath), matching the convention used in data/districts.js.
// Filenames below are confirmed already in use elsewhere in the app so the
// photos resolve reliably without extra assets.
const W = (file, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const ATTRACTIONS = [
  { name: "Kaziranga National Park", note: "One-horned rhinos", image: W("Kaziranga National Park, Assam, India.jpg"), alt: "A one-horned rhinoceros grazing in the grasslands of Kaziranga National Park, Assam" },
  { name: "Kamakhya Temple", note: "Nilachal Hill", image: W("Kamakhya Temple - DEV 8829.jpg"), alt: "Kamakhya Temple crowning Nilachal Hill in Guwahati, Assam" },
  { name: "Majuli", note: "River island", image: W("Doriya River of Majuli.jpg"), alt: "A river channel winding through the island of Majuli, Assam" },
  { name: "Sivasagar", note: "Ahom heritage", image: W("Shiva Dol.jpg"), alt: "The Shiva Dol temple complex at Sivasagar, Assam" },
  { name: "Manas National Park", note: "UNESCO wild", image: W("Manas National Park.jpg"), alt: "Forest and hills inside Manas National Park, Assam" },
  { name: "Pobitora", note: "Rhino wetlands", image: W("Baby Indian Rhino at Pobitora Wildlife Sanctuary.jpg"), alt: "A young one-horned rhino at Pobitora Wildlife Sanctuary, Assam" },
  { name: "Haflong", note: "Blue hills", image: W("Barail Range in Dima Hasao district.jpg"), alt: "The Barail hill ranges near Haflong, Assam" },
  { name: "Hajo", note: "Where faiths meet", image: W("Hayagriva Madhava Temple, Hajo.jpg"), alt: "Hayagriva Madhava Temple on the hill of Hajo, Assam" },
];

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="attr__arrow-icon">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="attr__arrow-icon">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Attractions() {
  const { pick } = useApp();
  const trackRef = useRef(null);
  const distRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);
  const [dCanL, setDCanL] = useState(false);
  const [dCanR, setDCanR] = useState(true);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // Advance roughly one card + gap so it feels like a page step.
    const card = el.querySelector(".attr__card");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollDist = (dir) => {
    const el = distRef.current;
    if (!el) return;
    const card = el.querySelector(".attr__dist-card");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const watch = useCallback((ref, setL, setR) => {
    const el = ref.current;
    if (!el) return () => {};
    const upd = () => {
      const max = el.scrollWidth - el.clientWidth - 6;
      setL(el.scrollLeft > 6);
      setR(max > 6 && el.scrollLeft < max);
    };
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    const id = setTimeout(upd, 500);
    return () => {
      el.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      clearTimeout(id);
    };
  }, []);

  useEffect(() => watch(trackRef, setCanL, setCanR), [watch]);
  useEffect(() => watch(distRef, setDCanL, setDCanR), [watch]);

  useEffect(() => {
    const cleanups = [trackRef, distRef].map((ref) => {
      const el = ref.current;
      if (!el) return () => {};
      let down = false, sx = 0, sl = 0, moved = false;
      const dn = (e) => {
        if (e.button !== 0) return;
        down = true; moved = false; sx = e.pageX; sl = el.scrollLeft;
      };
      const mv = (e) => {
        if (!down) return;
        const dx = e.pageX - sx;
        if (Math.abs(dx) > 6) { moved = true; el.scrollLeft = sl - dx; }
      };
      const up = () => { down = false; };
      const cap = (e) => {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      };
      el.addEventListener("mousedown", dn);
      window.addEventListener("mousemove", mv);
      window.addEventListener("mouseup", up);
      el.addEventListener("click", cap, true);
      return () => {
        el.removeEventListener("mousedown", dn);
        window.removeEventListener("mousemove", mv);
        window.removeEventListener("mouseup", up);
        el.removeEventListener("click", cap, true);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
    <section className="attr" id="attractions" aria-label="Top attractions of Assam">
      <div className="attr__head">
        <h2 className="attr__title">Attractions</h2>
        <p className="attr__tagline"><span className="attr__dash" aria-hidden="true" /> worth a thousand stories <span className="attr__dash" aria-hidden="true" /></p>
      </div>

      <div className="attr__viewport">
        <div
          className="attr__track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Top attractions slider"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-1); }
          }}
        >
          {ATTRACTIONS.map((a) => (
            <a key={a.name} href="#/districts" className="attr__card" aria-label={`Explore ${a.name}`} draggable={false}>
              <div className="attr__media">
                <img src={a.image} alt={a.alt} loading="lazy" decoding="async" width="800" height="1000" draggable={false} />
                <div className="attr__veil" aria-hidden="true" />
              </div>
              <div className="attr__caption">
                <h3 className="attr__name">{a.name}</h3>
                <p className="attr__note">{a.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="attr__controls">
        <div className="attr__arrows">
          <button className="attr__arrow" onClick={() => scrollBy(-1)} disabled={!canL} aria-label="Scroll attractions left">
            <ArrowLeft />
          </button>
          <button className="attr__arrow" onClick={() => scrollBy(1)} disabled={!canR} aria-label="Scroll attractions right">
            <ArrowRight />
          </button>
        </div>
        <a className="attr__more" href="#/districts">
          Discover more
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="attr__more-icon" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>

    <section className="attr attr__districts" aria-label="All districts of Assam">
      <div className="attr__head">
        <h2 className="attr__title">Districts</h2>
        <p className="attr__tagline"><span className="attr__dash" aria-hidden="true" /> all 35 — slide sideways <span className="attr__dash" aria-hidden="true" /></p>
      </div>
      <div className="attr__viewport">
        <div
          className="attr__track attr__dist-track"
          ref={distRef}
          tabIndex={0}
          role="region"
          aria-label="All districts slider"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollDist(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollDist(-1); }
          }}
        >
          {DISTRICTS.map((d) => (
            <a key={d.no} href={`#/district/${slugify(d.name)}`} className="attr__dist-card" aria-label={`Open ${d.name}`} draggable={false}>
              <span className="attr__dist-media">
                <img src={d.image} alt={d.alt} loading="lazy" decoding="async" width="600" height="400" draggable={false} />
                <span className="attr__dist-num">{String(d.no).padStart(2, "0")}</span>
                <span className="attr__veil" aria-hidden="true" />
              </span>
              <span className="attr__dist-body">
                <strong>{pick(d.name)}</strong>
                <span>{pick(d.hq)} · {pick(d.division)}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="attr__controls">
        <div className="attr__arrows">
          <button className="attr__arrow" onClick={() => scrollDist(-1)} disabled={!dCanL} aria-label="Slide districts left">
            <ArrowLeft />
          </button>
          <button className="attr__arrow" onClick={() => scrollDist(1)} disabled={!dCanR} aria-label="Slide districts right">
            <ArrowRight />
          </button>
        </div>
        <a className="attr__more" href="#/districts">
          All 35 districts
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="attr__more-icon" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
    </>
  );
}
