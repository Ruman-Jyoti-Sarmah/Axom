import { useApp } from "@/store/AppContext";
import { PART1 } from "@/data/culture/cultureCredits1";
import { PART2 } from "@/data/culture/cultureCredits2";
import CULTURE_IMG from "@/data/culture/cultureImages";

/** ImageCredits — every local Culture photo with author + licence links. */
export function ImageCreditsContent() {
  const { t } = useApp();
  const all = [...PART1, ...PART2];
  const imgFor = (file) => {
    const hit = Object.values(CULTURE_IMG).find((p) => p.endsWith("/" + file));
    if (hit) return hit;
    return "/images/artists/" + file;
  };

  return (
    <section className="page" id="top">
      <div className="page__body page__body--wide">
        <span className="label">{t("credits_kicker")}</span>
        <h1 className="page__title">{t("credits_title")}</h1>
        <p className="page__tagline">{t("credits_intro")}</p>
        <div className="credits__list">
          {all.map((c) => (
            <article key={c.file} className="credits__row" data-reveal>
              <div className="credits__thumb">
                <img src={imgFor(c.file)} alt={c.file} loading="lazy" decoding="async" />
              </div>
              <div>
                <h3>{c.file}</h3>
                <p>Photo: {c.author}</p>
                <p>
                  <a href={c.source} target="_blank" rel="noreferrer">Source</a>
                  {" · "}
                  <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
