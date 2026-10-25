import { useApp } from "@/store/AppContext";
import { ASSAM_HERITAGE } from "@/data/culture/assam/culture.js";
import CULTURE_IMG from "@/data/culture/cultureImages";

const IMAGES = [
  CULTURE_IMG.rangGhar,
  CULTURE_IMG.talatalGhar,
  CULTURE_IMG.majuliRiver,
  CULTURE_IMG.kamakhyaTemple,
  CULTURE_IMG.shivaDol,
  CULTURE_IMG.sualkuchiHandloom,
];

/** Assam Heritage — feature + ledger rows, distinct from other pages. Routes unchanged. */
export function HeritageAndKingsContent() {
  const { t, pick } = useApp();
  const [first, ...rest] = ASSAM_HERITAGE;
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={CULTURE_IMG.rangGhar} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_heritage")}</span>
          <h1 className="page__title">{t("page_heritage_title")}</h1>
          <p className="page__tagline">{t("page_heritage_intro")}</p>
        </div>
      </div>
      <div className="page__body page__body--wide">
        <div className="herit2">
          <h2 className="page__headline" data-reveal>{t("heritage_headline")}</h2>
          <article className="herit2__feature" data-reveal>
            <div className="herit2__feature-media">
              <img src={IMAGES[0]} alt={pick(first.name)} loading="lazy" decoding="async" />
            </div>
            <div className="herit2__feature-body">
              <span className="page__culture-kind">{pick(first.kind)}</span>
              <h3>{pick(first.name)}</h3>
              <p>{pick(first.about)}</p>
            </div>
          </article>
          <div className="herit2__ledger">
            {rest.map((h, idx) => (
              <article key={h.name} className="herit2__row" data-reveal>
                <div className="herit2__thumb">
                  <img src={IMAGES[idx + 1]} alt={pick(h.name)} loading="lazy" decoding="async" />
                </div>
                <div>
                  <span className="page__culture-kind">{pick(h.kind)}</span>
                  <h3>{pick(h.name)}</h3>
                  <p>{pick(h.about)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
