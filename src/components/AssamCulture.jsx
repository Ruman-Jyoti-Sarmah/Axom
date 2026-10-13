import { useApp } from "../store/AppContext";
import { ASSAM_CULTURE } from "../data/content";

/** Assam Culture & Festivals — Bihu, Sattriya, Borgeet and more. */
export function AssamCulture() {
  const { t, pick } = useApp();
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <video
          src="/video/hero-3.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_culture")}</span>
          <h1 className="page__title">{t("page_culture_title")}</h1>
          <p className="page__tagline">{t("page_culture_intro")}</p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__culture">
          <h2 className="page__headline">{t("culture_headline")}</h2>
          <div className="page__culture-grid">
            {ASSAM_CULTURE.map((c) => (
              <div key={c.name} className="page__culture-card">
                <span className="page__culture-name">{pick(c.name)}</span>
                <span className="page__culture-kind">{pick(c.kind)}</span>
                <p className="page__culture-about">{pick(c.about)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
