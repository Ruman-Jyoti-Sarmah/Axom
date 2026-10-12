import { useApp } from "../store/AppContext";
import { HERO } from "../data/content";
import { assamArtists } from "../data/content";

/**
 * Assam Artists — the makers of Assamese music, cinema and theatre.
 * Written with Zubeen Garg's voice, the music of Bhupen Hazarika and
 * a living chain that runs from the poet-folk of the past into today.
 */
export function ArtistsPage() {
  const { t, pick } = useApp();
  return (
    <section className="artists" id="top">
      <div className="artists__hero">
        <div className="artists__bg">
          <img src={HERO.image} alt="" />
        </div>
        <div className="artists__veil"></div>
        <div className="artists__content">
          <p className="artists__kicker">{t("artists_kicker")}</p>
          <h1 className="artists__title">{t("artists_title")}</h1>
          <p className="artists__sub">{t("artists_sub")}</p>
        </div>
      </div>

      <div className="artists__body">
        <div className="artists__head">
          <span className="label">{t("artists_head_label")}</span>
          <h2 className="artists__headline">{t("artists_headline")}</h2>
          <p className="artists__intro">{t("artists_intro")}</p>
        </div>

        <div className="artists__grid">
        {assamArtists.map((a) => (
          <article className="artists__card" key={a.name}>
            <div className="artists__card-img">
              <img src={a.image} alt={pick(a.name)} loading="lazy" />
              <div className="artists__card-img-veil"></div>
              <span className="label">{pick(a.name)}</span>
            </div>
            <div className="artists__card-body">
              <p className="artists__card-years">{a.born} — {a.died || t("artists_living")}</p>
              <h3 className="artists__card-name">{pick(a.name)}</h3>
              <p className="artists__card-known">{pick(a.knownFor)}</p>
              <p className="artists__card-bio">{pick(a.bio)}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
