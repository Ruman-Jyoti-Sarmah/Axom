import { useApp } from "@/store/AppContext";
import { pick } from "@/lib/pick";
import { assamHighlights } from "@/data/culture/assam/highlights.js";
import { ASSAM_FOOD } from "@/data/culture/assam/food.js";
import { ASSAM_CULTURE } from "@/data/culture/assam/culture.js";

const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Assam Facts & Symbols — state animal, state food, state symbols and more. */
export function AssamFacts() {
  const { t, lang } = useApp();
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={W("Kamakhya Temple, Guwahati.jpg", 1400)} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_facts")}</span>
          <h1 className="page__title">{t("page_facts_title")}</h1>
          <p className="page__tagline">{t("page_facts_intro")}</p>
        </div>
      </div>

      <div className="page__body">
        <div className="page__facts">
          {assamHighlights.map((h) => (
            <div key={h.icon} className="page__fact">
              <span className="page__fact-icon">{h.icon}</span>
              <span className="page__fact-text">{pick(h.text, lang)}</span>
            </div>
          ))}
        </div>

        <div className="page__food">
          <h2 className="page__headline">{t("food_headline")}</h2>
          <div className="page__food-grid">
            {ASSAM_FOOD.map((f) => (
              <div key={f.name} className="page__food-card">
                <span className="page__food-name">{pick(f.name, lang)}</span>
                <span className="page__food-kind">{pick(f.sort, lang)}</span>
                <p className="page__food-about">{pick(f.about, lang)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="page__culture">
          <h2 className="page__headline">{t("culture_headline")}</h2>
          <div className="page__culture-grid">
            {ASSAM_CULTURE.map((c) => (
              <div key={c.name} className="page__culture-card">
                <span className="page__culture-name">{pick(c.name, lang)}</span>
                <span className="page__culture-kind">{pick(c.kind, lang)}</span>
                <p className="page__culture-about">{pick(c.about, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
