import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../store/AppContext";
import {
  EXPERIENCES,
  SPIRITUAL,
  ADVENTURE,
  WELLNESS,
  CUISINE,
} from "../data/cultureSections";
import {
  assamArtists,
  ASSAM_CULTURE,
  ASSAM_HANDICRAFTS,
  ASSAM_HERITAGE,
} from "../data/content";

// Wikimedia Commons (Special:FilePath) — same pattern as the rest of the app.
const W = (file, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/* Nature & Wildlife detail — Kaziranga, Manas, Pobitora (mirrors WildlifePage). */
const WILDLIFE = [
  {
    image: W("Kaziranga National Park, Assam, India.jpg", 800),
    name: "Kaziranga National Park",
    division: "North Assam",
    oneLiner:
      "UNESCO World Heritage Site — home to the highest concentration of the one-horned rhinoceros on Earth.",
  },
  {
    image: W("Manas National Park.jpg", 800),
    name: "Manas National Park",
    division: "North Assam",
    oneLiner:
      "A UNESCO-listed wilderness on the Bhutan border — last refuge of the golden langur & pygmy hog.",
  },
  {
    image: W("Baby Indian Rhino at Pobitora Wildlife Sanctuary.jpg", 800),
    name: "Pobitora Wildlife Sanctuary",
    division: "North Assam",
    oneLiner:
      "The highest density of one-horned rhinoceros in the world — a rhino park only 30 minutes from the city.",
  },
];

/* Representative Commons images for the heritage detail set (reused filenames
   already present elsewhere in the app so they resolve reliably). */
const HERITAGE_IMG = {
  "The Ahom kingdom": W("Rang Ghar 1.jpg"),
  "Srimanta Sankardev": W("Sankaradeva.jpg"),
  "The sattras of Majuli": W("Doriya River of Majuli.jpg"),
  "Kamakhya Devi": W("Kamakhya Temple - DEV 8829.jpg"),
  Sivasagar: W("Shiva Dol.jpg"),
  "Hajo & Sualkuchi": W("Manchester of Assam- Sualkuchi.jpg"),
};

const CARD_ARROW = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="hexp__card-arrow"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/**
 * Experiences — Incredible-India style on the home page.
 * 1) A category grid (Heritage · Spiritual · Art · Cuisine · Wildlife · Crafts ·
 *    Festivals · Adventure · Yoga).
 * 2) Selecting a category reveals its detailed cards below.
 * All copy/imagery comes from the existing bilingual data sets — nothing is
 * fabricated. Categories whose detail data has no photos fall back to elegant
 * text cards (subtitle + name + description).
 **/
export default function Experiences() {
  const { pick } = useApp();
  const [active, setActive] = useState("spiritual");
  const categoryRail = useRef(null);
  const detailRail = useRef(null);

  const scrollOneCard = (railRef, direction) => {
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  // Normalise every category's raw data into { image?, name, sub, about } so the
  // renderer stays identical regardless of the source array's field names.
  const details = useMemo(() => {
    const hasImg = (img) => (img ? { image: img } : {});
    return {
      heritage: ASSAM_HERITAGE.map((h) => ({
        ...hasImg(HERITAGE_IMG[h.name.en]),
        name: pick(h.name),
        sub: pick(h.kind),
        about: pick(h.about),
      })),
      spiritual: SPIRITUAL.map((s) => ({
        image: s.image,
        name: pick(s.name),
        sub: pick(s.place),
        about: pick(s.about),
      })),
      art: assamArtists.map((a) => ({
        image: a.image,
        name: a.name,
        sub: a.knownFor,
        about: a.bio,
      })),
      cuisine: CUISINE.dishes.map((d) => ({
        image: d.image,
        fallbackImage: "/img/assamese-thali.webp",
        name: pick(d.name),
        sub: pick(d.kind),
        about: pick(d.about),
      })),
      wildlife: WILDLIFE.map((w) => ({
        image: w.image,
        name: w.name,
        sub: w.division,
        about: w.oneLiner,
      })),
      crafts: ASSAM_HANDICRAFTS.map((h) => ({
        ...hasImg(undefined),
        name: h.name,
        sub: pick(h.kind),
        about: pick(h.about),
      })),
      festivals: ASSAM_CULTURE.map((c) => ({
        ...hasImg(undefined),
        name: c.name,
        sub: pick(c.kind),
        about: pick(c.about),
      })),
      adventure: ADVENTURE.map((a) => ({
        image: a.image,
        name: pick(a.name),
        sub: pick(a.place),
        about: pick(a.about),
      })),
      yoga: WELLNESS.map((w) => ({
        image: w.image,
        name: pick(w.name),
        sub: pick(w.place),
        about: pick(w.about),
      })),
    };
  }, [pick]);

  const activeCat = EXPERIENCES.find((c) => c.id === active) || EXPERIENCES[0];
  const items = details[active] || [];

  return (
    <section
      className="hexp"
      id="experiences"
      aria-label="Experiences of Assam"
      data-reveal
    >
      <div className="hexp__head">
        <h2 className="hexp__title">Experiences</h2>
        <p className="hexp__tagline">
          <span className="hexp__dash" aria-hidden="true" /> ways to truly meet
          Assam <span className="hexp__dash" aria-hidden="true" />
        </p>
      </div>

      {/* Category grid */}
      <div
        className="hexp__cats"
        ref={categoryRail}
        role="tablist"
        aria-label="Experience categories"
      >
        {EXPERIENCES.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            className={`hexp__cat ${active === c.id ? "hexp__cat--active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              decoding="async"
              width="400"
              height="520"
            />
            <span className="hexp__cat-veil" aria-hidden="true" />
            <span className="hexp__cat-icon" aria-hidden="true">
              {c.icon}
            </span>
            <span className="hexp__cat-name">{pick(c.name)}</span>
          </button>
        ))}
      </div>
      <div
        className="hexp__rail-controls"
        role="group"
        aria-label="Category navigation"
      >
        <button
          className="hexp__rail-button"
          type="button"
          aria-label="Previous category"
          title="Previous category"
          onClick={() => scrollOneCard(categoryRail, -1)}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          className="hexp__rail-button"
          type="button"
          aria-label="Next category"
          title="Next category"
          onClick={() => scrollOneCard(categoryRail, 1)}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Selected category detail */}
      <div className="hexp__detail">
        <div className="hexp__detail-head">
          <div>
            <span className="hexp__detail-kicker">
              {activeCat.icon} {pick(activeCat.kind)}
            </span>
            <h3 className="hexp__detail-title">{pick(activeCat.name)}</h3>
            <p className="hexp__detail-blurb">{pick(activeCat.blurb)}</p>
          </div>
          <div className="hexp__detail-actions">
            <div
              className="hexp__rail-controls"
              role="group"
              aria-label="Experience details navigation"
            >
              <button
                className="hexp__rail-button"
                type="button"
                aria-label="Previous experience"
                title="Previous experience"
                onClick={() => scrollOneCard(detailRail, -1)}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                className="hexp__rail-button"
                type="button"
                aria-label="Next experience"
                title="Next experience"
                onClick={() => scrollOneCard(detailRail, 1)}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <a className="hexp__detail-link" href={activeCat.href}>
              View all {CARD_ARROW}
            </a>
          </div>
        </div>

        <div
          className="hexp__cards"
          ref={detailRail}
          role="region"
          aria-label="Experience details"
          tabIndex={0}
        >
          {items.map((it) => (
            <article
              key={it.name}
              className={`hexp__card ${it.image ? "" : "hexp__card--text"}`}
            >
              {it.image && (
                <div className="hexp__card-media">
                  <img
                    src={it.image}
                    alt={it.name}
                    onError={
                      it.fallbackImage
                        ? (event) => {
                            const image = event.currentTarget;
                            if (image.src.endsWith(it.fallbackImage)) return;
                            image.src = it.fallbackImage;
                            image.alt = "Assamese thali";
                          }
                        : undefined
                    }
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                  />
                </div>
              )}
              <div className="hexp__card-body">
                <span className="hexp__card-sub">{it.sub}</span>
                <h4 className="hexp__card-name">{it.name}</h4>
                <p className="hexp__card-about">{it.about}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
