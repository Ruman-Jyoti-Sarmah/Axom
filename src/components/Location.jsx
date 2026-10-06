import { LOCATION } from "../data/content";
import TextReveal from "./TextReveal";
import DepthImage from "./DepthImage";

/** Location — static two-column composition with a stylized map. */
export default function Location() {
  return (
    <section className="location scene" id="location" aria-label="Location">
      <div className="location__inner">
        <div className="location__title">
          <span className="label">CHAPTER 06 · DESTINATION</span>
          <TextReveal as="h2" lines={LOCATION.title} />
          <p className="location__body">{LOCATION.body}</p>
          <a className="btn" href="#finale">Plan Your Arrival</a>
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
