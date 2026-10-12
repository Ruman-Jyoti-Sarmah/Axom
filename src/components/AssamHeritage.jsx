import { useApp } from "../store/AppContext";
import { ASSAM_HERITAGE } from "../data/content";

const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Assam Heritage & Kings — Ahom dynasty, Sankardev, Satras, Kamakhya. */
export function AssamHeritage() {
  const { t, pick } = useApp();
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={W("Rang Ghar 1.jpg", 1400)} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_heritage")}</span>
          <h1 className="page__title">{t("page_heritage_title")}</h1>
          <p className="page__tagline">{t("page_heritage_intro")}</p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__heritage">
          <h2 className="page__headline">{t("heritage_headline")}</h2>
          <div className="page__culture-grid">
            {ASSAM_HERITAGE.map((h) => (
              <div key={h.name} className="page__culture-card">
                <span className="page__culture-name">{pick(h.name)}</span>
                <span className="page__culture-kind">{pick(h.kind)}</span>
                <p className="page__culture-about">{pick(h.about)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
