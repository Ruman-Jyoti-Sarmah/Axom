import { useApp } from "@/store/AppContext";
import { assamHighlights, assamFamous } from "@/data/culture/assam/highlights.js";

/** "Assam at a Glance" — state symbols + famous places on the home page. */
export function AssamAtAGlance() {
  const { t, pick } = useApp();
  return (
    <section className="assam-at-a-glance" aria-label={t("assam_at_a_glance")}>
      <div className="assam-at-a-glance__inner">
        <div className="assam-at-a-glance__head">
          <span className="label">{t("assam_label")}</span>
          <h2>{t("assam_at_a_glance_l1")}</h2>
          <p className="assam-at-a-glance__sub">{t("assam_at_a_glance_l2")}</p>
        </div>

        <div className="assam-at-a-glance__facts">
          {assamHighlights.map((h) => (
            <div className="assam-at-a-glance__fact" key={h.text}>
              <span className="assam-at-a-glance__fact-icon">{h.icon}</span>
              <h3 className="assam-at-a-glance__fact-name">{h.text.split(" — ")[0]}</h3>
              <p className="assam-at-a-glance__fact-text">{h.text}</p>
            </div>
          ))}
        </div>

        <div className="assam-at-a-glance__famous">
          <h3 className="assam-at-a-glance__famous-title">{t("assam_famous")}</h3>
          <div className="assam-at-a-glance__famous-grid">
            {assamFamous.map((f) => (
              <div className="assam-at-a-glance__famous-card" key={f.name}>
                <h4 className="assam-at-a-glance__famous-name">{pick(f.name)}</h4>
                <p className="assam-at-a-glance__famous-div">{t("dpage_division")}: {pick(f.division)}</p>
                <p className="assam-at-a-glance__famous-one">{pick(f.oneLiner)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
