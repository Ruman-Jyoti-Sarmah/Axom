import { useApp } from "../store/AppContext";
import { ASSAM_CULTURE } from "../data/content";

import { PART1 } from "../data/cultureCredits1";
import { PART2 } from "../data/cultureCredits2";
import CULTURE_IMG from "../data/cultureImages";

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

/** ImageCredits — every local Culture photo with author + licence links. */
export function ImageCredits() {
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
