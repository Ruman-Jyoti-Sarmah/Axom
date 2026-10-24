import { useApp } from "@/store/AppContext";
import { ZUBEEN_GARG } from "@/data/culture/site/artists.js";

/** Assam's Voice — Zubeen Garg bio section at the top of the home page. */
export function ZubeenGarg() {
  const { t, pick } = useApp();
  return (
    <section className="zubeen" id="zubeen" aria-label={t("zubeen_section")}>
      <div className="zubeen__hero">
        <div className="zubeen__img">
          <img src={ZUBEEN_GARG.image} alt={pick(ZUBEEN_GARG.alt)} loading="eager" />
          <div className="zubeen__veil"></div>
        </div>
        <div className="zubeen__card">
          <span className="label">{t("zubeen_label")}</span>
          <h1 className="zubeen__name">{pick(ZUBEEN_GARG.name)}</h1>
          <p className="zubeen__role">{t("zubeen_role")}</p>
          <dl className="zubeen__meta">
            <div className="zubeen__meta-row">
              <dt>{t("zubeen_born")}</dt>
              <dd>{pick(ZUBEEN_GARG.born)} · {pick(ZUBEEN_GARG.bornAt)}</dd>
            </div>
            <div className="zubeen__meta-row">
              <dt>{t("zubeen_died")}</dt>
              <dd>{pick(ZUBEEN_GARG.died)} · {pick(ZUBEEN_GARG.diedAt)}</dd>
            </div>
            <div className="zubeen__meta-row">
              <dt>{t("zubeen_age")}</dt>
              <dd>{ZUBEEN_GARG.age}</dd>
            </div>
          </dl>
          <p className="zubeen__bio">{pick(ZUBEEN_GARG.legacy)}</p>
          <div className="zubeen__tags">
            {ZUBEEN_GARG.roles.map((r) => (
              <span key={r} className="label">{pick(r)}</span>
            ))}
          </div>
          <div className="zubeen__songs">
            {ZUBEEN_GARG.songs.map((s) => (
              <span key={s} className="label">{pick(s)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
