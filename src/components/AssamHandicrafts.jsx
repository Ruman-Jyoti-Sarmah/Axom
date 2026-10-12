import { useApp } from "../store/AppContext";
import { ASSAM_HANDICRAFTS } from "../data/content";

const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Assam Handicrafts & Textiles — silk, gamosa, bell metal and more. */
export function AssamHandicrafts() {
  const { t, pick } = useApp();
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={W("Manchester of Assam- Sualkuchi.jpg", 1400)} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_handicrafts")}</span>
          <h1 className="page__title">{t("page_handicrafts_title")}</h1>
          <p className="page__tagline">{t("page_handicrafts_intro")}</p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__handicrafts">
          <h2 className="page__headline">{t("handicrafts_headline")}</h2>
          <div className="page__culture-grid">
            {ASSAM_HANDICRAFTS.map((h) => (
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
