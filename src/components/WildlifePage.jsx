import { useApp } from "../store/AppContext";
import { HERO } from "../data/content";

const W = (file, width = 800) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/**
 * Assam — Nature & Wildlife — a page about the wild heart of the state:
 * Kaziranga, Manas and Pobitora, the sanctuaries that hold the rhino, tiger & deer.
 */
export function WildlifePage() {
  const { t, pick } = useApp();
  const wildlife = [
    {
      image: w("Kaziranga National Park, Assam, India.jpg", 800),
      name: "Kaziranga National Park",
      division: "North Assam",
      oneLiner: "UNESCO World Heritage Site — home to the highest concentration of the one-horned rhinoceros on Earth.",
      facts: ["2,200+ Indian rhinoceros", "Over 70 tiger", "Elephant, wild water buffalo, swamp deer", "430+ bird species"],
    },
    {
      image: w("Manas National Park.jpg", 800),
      name: "Manas National Park",
      division: "North Assam",
      oneLiner: "A UNESCO-listed wilderness on the Bhutan border — the last refuge of the golden langur & pygmy hog.",
      facts: ["Golden langur & pygmy hog", "Royal Bengal tiger & elephant", "Over 400 bird species"],
    },
    {
      image: w("Baby Indian Rhino at Pobitora Wildlife Sanctuary.jpg", 800),
      name: "Pobitora Wildlife Sanctuary",
      division: "North Assam",
      oneLiner: "The highest density of one-horned rhinoceros in the world — a rhino park only 30 minutes from the city.",
      facts: ["World's highest rhino density", "Elephant & wild water buffalo", "Part of the Upper Assam landscape"],
    },
  ];

  return (
    <section className="wildlife" id="top">
      <div className="wildlife__hero">
        <div className="wildlife__bg">
          <img src={HERO.image} alt="" />
        </div>
        <div className="wildlife__veil"></div>
        <div className="wildlife__content">
          <p className="wildlife__kicker">{t("wildlife_kicker")}</p>
          <h1 className="wildlife__title">{t("wildlife_title")}</h1>
          <p className="wildlife__sub">{t("wildlife_sub")}</p>
        </div>
      </div>

      <div className="wildlife__grid">
        {wildlife.map((m) => (
          <article className="wildlife__card" key={m.name}>
            <img src={m.image} alt={m.name} loading="lazy" />
            <div className="wildlife__card-body">
              <span className="label">{t("wildlife_division")} · {pick(m.division)}</span>
              <h3 className="wildlife__card-name">{pick(m.name)}</h3>
              <p className="wildlife__card-one">{pick(m.oneLiner)}</p>
              <ul className="wildlife__card-facts">
                {m.facts.map((f) => (
                  <li key={f}>{pick(f)}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
