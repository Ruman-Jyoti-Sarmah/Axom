import { useRef } from "react";

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
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // Advance roughly one card + gap so it feels like a page step.
    const card = el.querySelector(".attr__card");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="attr" id="attractions" aria-label="Top attractions of Assam" data-reveal>
      <div className="attr__head">
        <h2 className="attr__title">Attractions</h2>
        <p className="attr__tagline"><span className="attr__dash" aria-hidden="true" /> worth a thousand stories <span className="attr__dash" aria-hidden="true" /></p>
      </div>

      <div className="attr__viewport">
        <div className="attr__track" ref={trackRef}>
          {ATTRACTIONS.map((a) => (
            <a key={a.name} href="#/districts" className="attr__card" aria-label={`Explore ${a.name}`}>
              <div className="attr__media">
                <img src={a.image} alt={a.alt} loading="lazy" decoding="async" width="800" height="1000" />
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
          <button className="attr__arrow" onClick={() => scrollBy(-1)} aria-label="Scroll attractions left">
            <ArrowLeft />
          </button>
          <button className="attr__arrow" onClick={() => scrollBy(1)} aria-label="Scroll attractions right">
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
  );
}
