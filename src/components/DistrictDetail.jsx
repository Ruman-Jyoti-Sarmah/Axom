import { getDistrict } from "../data/districtDetails";
import DepthImage from "./DepthImage";
import TextReveal from "./TextReveal";

/**
 * District page template (single design, per-district data).
 * Route: #/district/<slug> — content comes from the districtDetails
 * "backend": history, gallery images and every tourist attraction.
 * Fully static — no scroll animation.
 */
export default function DistrictDetail({ slug }) {
  const d = getDistrict(slug);

  if (!d) {
    return (
      <section className="dpage dpage--missing" id="top">
        <span className="label">NOT FOUND</span>
        <h1>District not found</h1>
        <a className="btn" href="#/districts">Back to all 35 districts</a>
      </section>
    );
  }

  const titleLines = [d.name.toUpperCase()];
  if (d.name.length > 12) {
    const words = d.name.toUpperCase().split(" ");
    if (words.length > 1) {
      titleLines.splice(0, titleLines.length, words.slice(0, -1).join(" "), words[words.length - 1]);
    }
  }

  return (
    <section className="dpage" id="top" aria-label={`${d.name} district`}>
      {/* hero — same cinematic language as the main site */}
      <div className="dpage__hero">
        <div className="dpage__bg" style={{ backgroundImage: `url(${d.images[0]})` }} role="img" aria-label={d.alt} />
        <div className="dpage__veil" />
        <div className="dpage__hero-content">
          <a className="label dpage__back" href="#/districts">← All 35 Districts</a>
          <div className="dpage__hero-meta">
            <span className="label">
              District {String(d.no).padStart(2, "0")} / 35 · {d.division} Division
            </span>
            <h1 className="dpage__title">
              {titleLines.map((l, i) => (
                <span className="tr-line" key={l + i}>
                  <span className="tr-inner">
                    {i === titleLines.length - 1 && titleLines.length > 1 ? <em>{l}</em> : l}
                  </span>
                </span>
              ))}
            </h1>
            <p className="dpage__tag">{d.tag}</p>
            <p className="dpage__hq"><span>Seat</span> {d.hq}</p>
          </div>
        </div>
      </div>

      {/* history */}
      <div className="dpage__history scene">
        <span className="label">CHAPTER · HISTORY OF {d.name.toUpperCase()}</span>
        <TextReveal as="h2" lines={["STONES THAT", "REMEMBER"]} start="top 80%" />
        <div className="dpage__prose">
          <p>{d.history}</p>
          <p>
            Beyond the record, {d.name} lives in its daily texture — the morning bell of its naamghars,
            its markets, its river light and its festivals, carried from one generation to the next
            across {d.division} Assam.
          </p>
        </div>
        <div className="dpage__facts">
          <div className="dpage__fact"><span className="label">District No.</span><span>{String(d.no).padStart(2, "0")} of 35</span></div>
          <div className="dpage__fact"><span className="label">Division</span><span>{d.division}</span></div>
          <div className="dpage__fact"><span className="label">Headquarters</span><span>{d.hq}</span></div>
          <div className="dpage__fact"><span className="label">Known For</span><span>{d.tag}</span></div>
        </div>
      </div>

      {/* gallery */}
      <div className="dpage__gallery">
        {d.images.map((img, i) => (
          <figure className={`dpage__shot dpage__shot--${i + 1}`} key={img}>
            <DepthImage src={img} alt={`${d.name} — view ${i + 1}`} depth={26} mouseDepth={6} imgClassName="dpage__shotimg" />
            <figcaption className="label">{d.name} · {String(i + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>

      {/* tourist attractions */}
      <div className="dpage__spots scene">
        <div className="dpage__spots-head">
          <span className="label">CHAPTER · TOURIST ATTRACTIONS</span>
          <TextReveal as="h2" lines={["PLACES TO VISIT", `IN ${d.name.toUpperCase()}`]} start="top 82%" />
          <p className="dpage__spots-intro">
            {d.attractions.length} attractions across {d.name} — temples, trails, wildlife and living festivals.
          </p>
        </div>
        <ol className="dpage__list">
          {d.attractions.map((a, i) => (
            <li className="dpage__spot" key={a.name}>
              <span className="dpage__spotnum">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="label dpage__spotkind">{a.kind}</span>
                <h3>{a.name}</h3>
                <p>{a.about}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* return CTA */}
      <div className="dpage__cta">
        <a className="btn btn--ghost" href="#/districts">← Explore all 35 districts</a>
        <a className="btn btn--solid" href="#finale">Plan Your Stay</a>
      </div>
    </section>
  );
}
