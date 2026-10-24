import { useApp } from "@/store/AppContext";
import { ASSAM_HANDICRAFTS } from "@/data/culture/assam/culture.js";
import CULTURE_IMG from "@/data/culture/cultureImages";

/** Assam Handicrafts — image-led alternating rows (no repeated grids). */
export function AssamHandicrafts() {
  const { t, pick } = useApp();
  // Each craft row gets a photo of its actual subject: Muga loom work,
  // Sualkuchi weaving, Gamosa cloth, Jaapi hats, cane/bamboo, Majuli masks.
  const IMAGES = [
    CULTURE_IMG.sualkuchiHandloom,
    CULTURE_IMG.gamosa,
    CULTURE_IMG.jaapi,
    CULTURE_IMG.caneBamboo,
    CULTURE_IMG.majuliMaskMaking,
    CULTURE_IMG.samaguriMasks,
    CULTURE_IMG.sualkuchiHandloom,
  ];
  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={CULTURE_IMG.sualkuchiHandloom} alt="" />
        <div className="page__veil"></div>
        <div className="page__hero-content">
          <span className="label">{t("page_handicrafts")}</span>
          <h1 className="page__title">{t("page_handicrafts_title")}</h1>
          <p className="page__tagline">{t("page_handicrafts_intro")}</p>
        </div>
      </div>
      <div className="page__body page__body--wide">
        <div className="craft2">
          <h2 className="page__headline" data-reveal>{t("handicrafts_headline")}</h2>
          <div className="craft2__list">
            {ASSAM_HANDICRAFTS.map((h, idx) => (
              <article key={h.name} className={`craft2__row${idx % 2 ? " craft2__row--flip" : ""}`} data-reveal>
                <div className="craft2__media">
                  <img src={IMAGES[idx % IMAGES.length]} alt={pick(h.name)} loading="lazy" decoding="async" />
                </div>
                <div className="craft2__body">
                  <span className="page__culture-kind">{pick(h.kind)}</span>
                  <h3>{pick(h.name)}</h3>
                  <p>{pick(h.about)}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="craft2__honest" data-reveal>{pick({ en: "Shown only where the project's verified data documents a craft — no invented shops, prices or makers.", as: "প্ৰকল্পৰ প্ৰমাণিত তথ্যত নথিভুক্ত শিল্পহে দেখুওৱা হৈছে — কোনো উদ্ভাৱিত দোকান, দাম বা শিল্পী নাই।" })}</p>
        </div>
      </div>
    </section>
  );
}
