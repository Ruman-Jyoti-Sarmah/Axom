import { useApp } from "../store/AppContext";
import { ASSAM_GUIDE } from "../data/content";

const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Assam Travel Guide — how to reach, the best season, and where to stay. */
export function AssamTravelGuide() {
  const { t, pick } = useApp();
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={W("Guwahati citysky.jpg", 1400)} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_guide")}</span>
          <h1 className="page__title">{t("page_guide_title")}</h1>
          <p className="page__tagline">{t("page_guide_intro")}</p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__guide">
          <h2 className="page__headline">{t("guide_headline")}</h2>
          <div className="page__culture-grid">
            {ASSAM_GUIDE.map((g) => (
              <div key={g.name} className="page__culture-card">
                <span className="page__culture-name">{pick(g.name)}</span>
                <p className="page__culture-about">{pick(g.about)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
