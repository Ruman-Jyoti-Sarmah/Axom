import { useEffect, useState } from "react";
import { useApp } from "../store/AppContext";
import { riverById, riverSystemLabel, riverSideLabel } from "../data/rivers";
import { riverCreditFor } from "../data/riverImageCredits";
import RiversAtlas from "./RiversAtlas";

export default function RiverDetail({ id: defaultId }) {
  const { t, pick } = useApp();
  const [id, setId] = useState(defaultId || "");
  const [Leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    const m = window.location.hash.match(/^#\/rivers?\/([a-z0-9-]+)/);
    if (m) setId(m[1]);
  }, []);

  const river = riverById(id);
  const credit = river ? riverCreditFor(river.image.split("/").pop()) : null;

  useEffect(() => {
    (async () => {
      try {
        const mod = await import("leaflet");
        setLeaflet(mod.default || mod);
      } catch {
        /* non-blocking */
      }
    })();
  }, []);

  return (
    <div className="rivers" id="top">
      <div className="rivers__hero">
        {river ? (
          <>
            <img className="rivers__hero-bg" src={river.image} alt="" aria-hidden="true" />
            <div className="rivers__veil" />
          </>
        ) : null}
        <div className="rivers__hero-content">
          {river ? (
            <>
              <p className="label">{pick(riverSystemLabel(river.system, "en"))}</p>
              <h1 className="rivers__title">{pick(river.name, "en")}</h1>
              <p className="rh-sub">{pick(riverSideLabel(river.side, "en"))}</p>
            </>
          ) : (
            <>
              <p className="label">{t("rivers_hero_kicker")}</p>
              <h1 className="rivers__title">{t("rivers_title")}</h1>
              <p className="rh-sub">{t("rivers_not_found")}</p>
            </>
          )}
        </div>
      </div>

      <div className="rivers__body">
        <p><a className="rh-card-link" href="#/rivers">← {t("rivers_title")}</a></p>
        {!river ? (
          <p className="rivers__empty">{t("rivers_not_found")}</p>
        ) : (
          <>
            <p className="rivers__headline">{pick(river.name, "en")}</p>
            <p className="rivers__subsume">{pick(river.region, "en")}</p>

            <section className="rivers__section" aria-labelledby="river-place-label">
              <h2 id="river-place-label" className="rivers__section-title">{t("rivers_place")}</h2>
              <p className="rivers__text">{pick(river.place, "en")}</p>
            </section>

            <section className="rivers__section" aria-labelledby="river-desc-label">
              <h2 id="river-desc-label" className="rivers__section-title">{t("rivers_description")}</h2>
              <p className="rivers__text">{pick(river.description, "en")}</p>
            </section>

            <section className="rivers__section" aria-labelledby="river-credits-label">
              <h2 id="river-credits-label" className="rivers__section-title">{t("rivers_credits")}</h2>
              {credit ? (
                <dl className="rivers__credits">
                  <div><dt>{t("rivers_artist")}</dt><dd>{credit.author}</dd></div>
                  <div><dt>{t("rivers_source")}</dt><dd>
                    <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.source}</a>
                  </dd></div>
                  <div><dt>{t("rivers_license")}</dt><dd>
                    <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a>
                  </dd></div>
                  <div><dt>{t("rivers_alterations")}</dt><dd>{credit.alterations}</dd></div>
                </dl>
              ) : (
                <p>{t("rivers_no_credits")}</p>
              )}
            </section>

            <section className="rivers__section" aria-labelledby="river-atlas-label">
              <h2 id="river-atlas-label" className="rivers__section-title">{t("rivers_atlas")}</h2>
              <div className="rivers__map">
                {Leaflet ? <RiversAtlas systems={[river.system]} /> : <p className="rivers__map-empty">{t("rivers_load_map")}</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
