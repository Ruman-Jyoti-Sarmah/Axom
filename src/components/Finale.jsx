import { FINALE } from "../data/content";
import { useContent } from "../lib/useContent";

/** Finale — closing CTA follows the site language. */
export default function Finale() {
  const { t } = useContent();
  return (
    <section className="finale" id="finale" aria-label="Book your stay">
      <div className="finale__stage">
        <div className="finale__bg" style={{ backgroundImage: `url(${FINALE.image})` }} role="img" aria-label={FINALE.alt} />
        <div className="finale__veil" />
        <div className="finale__content">
          <h2>
            <span className="tr-line">
              <span className="tr-inner">{t("finale_l1")}</span>
            </span>
            <span className="tr-line">
              <span className="tr-inner"><em>{t("finale_l2")}</em></span>
            </span>
          </h2>
          <a className="btn btn--solid finale__cta" href="#/visit">
            {t("finale_cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
