import Hero from "./Hero";
import { useApp } from "../store/AppContext";
import { assamHighlights, assamFamous, ASSAM_WORK } from "../data/content";

/** Home page — Assam facts only: Zubeen bio at top, state animal/food/symbols,
 *  celebrated places, then the "Book your Assam journey" call to action.
 *  All above-the-fold imagery is self-hosted (/img/*) so no third-party
 *  cookies or cache penalties hit the home-page Lighthouse score. */
export function HomeFacts() {
  const { t, pick } = useApp();
  return (
    <>
      <Hero />

      <section className="zubeen" id="zubeen" aria-label={t("zubeen_section")}>
        <div className="zubeen__hero">
          <div className="zubeen__img">
            <img
              src="https://share.google/NrSgkTFABziPncX2x"
              srcSet="https://share.google/NrSgkTFABziPncX2x 760w, https://share.google/NrSgkTFABziPncX2x 1400w"
              sizes="(max-width: 700px) 100vw, 50vw"
              alt={"Zubeen Garg — " + t("zubeen_label")}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <div className="zubeen__veil"></div>
          </div>
          <div className="zubeen__card">
            <span className="label">{t("zubeen_label")}</span>
            <h2 className="zubeen__name">{pick("Zubeen Garg")}</h2>
            <p className="zubeen__role">{t("zubeen_role")}</p>
            <dl className="zubeen__meta">
              <div className="zubeen__meta-row"><dt>{t("zubeen_born")}</dt><dd>{pick("18 November 1972")} · {pick("Tura, Meghalaya, India")}</dd></div>
              <div className="zubeen__meta-row"><dt>{t("zubeen_died")}</dt><dd>{pick("19 September 2025")} · {pick("Singapore")}</dd></div>
              <div className="zubeen__meta-row"><dt>{t("zubeen_age")}</dt><dd>52</dd></div>
            </dl>
            <p className="zubeen__bio">{t("zubeen_bio")}</p>
            <div className="zubeen__tags">
              {[pick("Singer"), pick("Composer"), pick("Actor"), pick("Filmmaker")].map((r) => <span key={r} className="label">{r}</span>)}
            </div>
            <div className="zubeen__songs">
              {[pick("Mayabini"), "Ya Ali", pick("Boku Duru Duru")].map((s) => <span key={s} className="label">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="facts" id="facts" aria-label={t("facts_label")}>
        <div className="facts__head"> 
          <span className="label">{t("facts_kicker")}</span>
          <h2 className="facts__title" id="home-content" tabIndex={-1}>{t("facts_title")}</h2>
          <p className="facts__intro">{t("facts_intro")}</p>
        </div>

        <div className="facts__grid">
          <article className="facts__card">
            <div className="facts__card-img">
            <img
              src="/img/rhino-kaziranga-sm.jpg"
              srcSet="/img/rhino-kaziranga-sm.webp 760w, /img/rhino-kaziranga.webp 1400w"
              sizes="(max-width: 700px) 100vw, 50vw"
              alt={t("state_animal")}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
              <div className="facts__card-img-veil"></div>
            </div>
            <div className="facts__card-body">
              <span className="label">{t("state_animal")}</span>
              <h3 className="facts__card-name">Greater one-horned rhinoceros</h3>
              <p className="facts__card-desc">{t("state_animal_desc")}</p>
            </div>
          </article>

          <article className="facts__card">
            <div className="facts__card-img">
              <img
                src="/img/assamese-thali-sm.jpg"
                srcSet="/img/assamese-thali-sm.webp 760w, /img/assamese-thali.webp 1400w"
                sizes="(max-width: 700px) 100vw, 50vw"
                alt={t("state_food")}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="facts__card-img-veil"></div>
            </div>
            <div className="facts__card-body">
              <span className="label">{t("state_food")}</span>
              <h3 className="facts__card-name">Assamese thali · Khar</h3>
              <p className="facts__card-desc">{t("state_food_desc")}</p>
            </div>
          </article>

          <article className="facts__card">
            <div className="facts__card-img">
              <img
                src="/img/kopou-flower-sm.jpg"
                srcSet="/img/kopou-flower-sm.webp 760w, /img/kopou-flower.webp 1400w"
                sizes="(max-width: 700px) 100vw, 50vw"
                alt={t("state_flower")}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="facts__card-img-veil"></div>
            </div>
            <div className="facts__card-body">
              <span className="label">{t("state_flower")}</span>
              <h3 className="facts__card-name">Foxtail orchids (Kopou phul)</h3>
              <p className="facts__card-desc">{t("state_flower_desc")}</p>
            </div>
          </article>

        </div>

        <div className="facts__row">
          <a className="facts__symbols-link" href="#/symbols">
            <span className="label">{t("state_symbols")}</span>
            <span className="facts__symbols-cta">{t("symbols_view_all")} →</span>
          </a>
          <div className="facts__symbol-grid">
            {assamHighlights.map((h) => (
              <div key={h.icon} className="facts__symbol">
                <span className="facts__symbol-icon">{h.icon}</span>
                <span className="facts__symbol-text">{pick(h.text)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="facts__row">
          <span className="label">{t("famous")}</span>
          <div className="facts__famous-grid">
            {assamFamous.map((f) => (
              <div key={f.name} className="facts__famous">
                <div className="facts__famous-icon">★</div>
                <span className="facts__famous-name">{pick(f.name)}</span>
                <span className="facts__famous-division">{pick(f.division)} · {pick(f.oneLiner)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="facts__row facts__row-work">
          <span className="label">{t("work_kicker")}</span>
          <div className="facts__work-grid">
            {ASSAM_WORK.map((w) => (
              <div key={w.icon} className="facts__work">
                <span className="facts__work-icon">{w.icon}</span>
                <span className="facts__work-text">{pick(w.text)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="home__book">
        <a className="btn btn--solid" href="#/journey">
          <span className="btn__label">Book your Assam journey</span>
          <span className="btn__arrow">→</span>
        </a>
        <p className="home__book-note">{t("book_note")}</p>
      </div>
    </>
  );
}
