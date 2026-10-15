import { useApp } from "../store/AppContext";
import { assamArtists } from "../data/content";

/**
 * Assam Artists — the makers of Assamese music, cinema and theatre.
 * Written with Zubeen Garg's voice, the music of Bhupen Hazarika and
 * a living chain that runs from the poet-folk of the past into today.
 */
export function ArtistsPage() {
  const { t, pick } = useApp();
  const [lead, ...rest] = assamArtists;
  return (
    <section className="artists" id="top">
      <div className="artists__hero">
        {lead.image ? (
        <div className="artists__bg">
          <img src={lead.image} alt={typeof lead.name === "string" ? lead.name : pick(lead.name)} />
        </div>
        ) : null}
        <div className="artists__veil"></div>
        <div className="artists__content">
          <p className="artists__kicker">{t("artists_kicker")}</p>
          <h1 className="artists__title">{t("artists_title")}</h1>
          <p className="artists__sub">{t("artists_sub")}</p>
        </div>
      </div>

      <div className="artists__body">
        <div className="artists__head" data-reveal>
          <span className="label">{t("artists_head_label")}</span>
          <h2 className="artists__headline">{t("artists_headline")}</h2>
          <p className="artists__intro">{t("artists_intro")}</p>
        </div>

        <article className="artists__lead" data-reveal>
          {lead.image ? (
          <div className="artists__lead-media">
            <img src={lead.image} alt={typeof lead.name === "string" ? lead.name : pick(lead.name)} loading="lazy" decoding="async" />
          </div>
          ) : null}
          <div className="artists__lead-body">
            <p className="artists__card-years">{lead.born} — {lead.died || t("artists_living")}</p>
            <h3 className="artists__card-name">{typeof lead.name === "string" ? lead.name : pick(lead.name)}</h3>
            <p className="artists__card-known">{typeof lead.knownFor === "string" ? lead.knownFor : pick(lead.knownFor)}</p>
            <p className="artists__card-bio">{typeof lead.bio === "string" ? lead.bio : pick(lead.bio)}</p>
          </div>
        </article>

        <div className="artists__rows">
        {rest.map((a) => (
          <article className={`artists__row${a.image ? "" : " artists__row--text"}`} key={typeof a.name === "string" ? a.name : a.name.en} data-reveal>
            {a.image ? (
            <div className="artists__row-media">
              <img src={a.image} alt={typeof a.name === "string" ? a.name : pick(a.name)} loading="lazy" decoding="async" />
            </div>
            ) : null}
            <div className="artists__row-body">
              <p className="artists__card-years">{a.born} — {a.died || t("artists_living")}</p>
              <h3 className="artists__card-name">{typeof a.name === "string" ? a.name : pick(a.name)}</h3>
              <p className="artists__card-known">{typeof a.knownFor === "string" ? a.knownFor : pick(a.knownFor)}</p>
              <p className="artists__card-bio">{typeof a.bio === "string" ? a.bio : pick(a.bio)}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
