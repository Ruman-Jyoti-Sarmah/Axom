import { LOCATION } from "../data/content";
import { useContent } from "../lib/useContent";
import TextReveal from "./TextReveal";
import DepthImage from "./DepthImage";

/** Location — title, body + CTA follow the site language. */
export default function Location() {
  const { t } = useContent();
  return (
    <section className="location scene" id="location" aria-label="Location" data-reveal>
      <div className="location__inner">
        <div className="location__title">
          <span className="label">{t("loc_label")}</span>
          <TextReveal as="h2" lines={[t("loc_l1"), t("loc_l2")]} />
          <p className="location__body">{t("loc_body")}</p>
          <a className="btn" href="#/visit">{t("loc_cta")}</a>
        </div>
        <div className="location__map">
          <DepthImage
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Guwahati-city-03.jpg?width=1400"
            alt="Aerial sunset view over the Brahmaputra and Guwahati, Assam"
            className="location__mapwrap"
            imgClassName="location__mapimg"
          />
          <span className="location__pin" aria-hidden="true" />
        </div>
      </div>
      <div className="location__facts" style={{ margin: "0 var(--gutter) clamp(5rem,10vh,9rem)" }}>
        {LOCATION.facts.map((f) => (
          <div className="location__fact" key={f.k}>
            <span className="label">{f.k}</span>
            <span>{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
