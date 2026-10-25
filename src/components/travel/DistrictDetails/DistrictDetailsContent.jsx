import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { DISTRICTS, slugify } from "@/data/travel/districts";
import { getDistrict } from "@/data/travel/districtDetails";
import { useApp } from "@/store/AppContext";
import { DistrictStays } from "@/components/travel/Stays/StaysContent";
import DepthImage from "@/components/common/DepthImage";
import TextReveal from "@/components/common/TextReveal";

/**
 * DYNAMIC District page — favourites, prev/next navigation,
 * related districts in the same division, attraction search.
 */
export default function DistrictDetail({ slug }) {
  const { t, pick, isFav, toggleFav } = useApp();
  const d = getDistrict(slug);

  if (!d) {
    return (
      <section className="dpage dpage--missing" id="top">
        <span className="label">{t("dpage_missing")}</span>
        <h1>{t("dpage_missing")}</h1>
        <a className="btn" href="#/districts">{t("dpage_missing_back")}</a>
      </section>
    );
  }

  const nameDisplay = pick(d.name);
  const titleLines = [nameDisplay.toUpperCase()];
  const idx = DISTRICTS.findIndex((x) => slugify(x.name) === slug);
  const prev = idx > 0 ? DISTRICTS[idx - 1] : null;
  const next = idx >= 0 && idx < DISTRICTS.length - 1 ? DISTRICTS[idx + 1] : null;
  const related = DISTRICTS.filter((x) => x.division === d.division && slugify(x.name) !== slug).slice(0, 3);
  const fav = isFav(slug);
  if (nameDisplay.length > 12 && /[A-Za-z]/.test(nameDisplay)) {
    const words = nameDisplay.toUpperCase().split(" ");
    if (words.length > 1) {
      titleLines.splice(0, titleLines.length, words.slice(0, -1).join(" "), words[words.length - 1]);
    }
  }

  return (
    <section className="dpage" id="top" aria-label={`${nameDisplay} district`}>
      {/* hero — same cinematic language as the main site */}
      <div className="dpage__hero">
        <div className="dpage__bg" style={{ backgroundImage: `url(${d.images[0]})` }} role="img" aria-label={d.alt} />
        <div className="dpage__veil" />
        <div className="dpage__hero-content">
          <a className="label dpage__back" href="#/districts">{t("dpage_back")}</a>
          <div className="dpage__hero-meta">
            <span className="label">
              {t("dpage_division")} · {pick(d.division)}
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
            <p className="dpage__tag">{pick(d.tag)}</p>
            <p className="dpage__hq"><span>{t("seat")}</span> {pick(d.hq)}</p>
            <button
              className={`favbtn favbtn--big ${fav ? "favbtn--on" : ""}`}
              onClick={() => toggleFav(slug)}
              aria-pressed={fav}
            >
              <Heart size={16} aria-hidden="true" fill={fav ? "currentColor" : "none"} />
              {fav ? t("fav_remove") : t("fav_add")}
            </button>
          </div>
        </div>
      </div>

      {/* history */}
      <div className="dpage__history scene">
        <span className="label">{t("dpage_history_kicker", nameDisplay)}</span>
        <TextReveal as="h2" lines={[t("dpage_hist_l1"), t("dpage_hist_l2")]} start="top 80%" />
        <div className="dpage__prose">
          <p>{pick(d.history)}</p>
          <p>{t("dpage_texture", nameDisplay)}</p>
        </div>
        <div className="dpage__facts">
          <div className="dpage__fact"><span className="label">{t("dpage_no")}</span><span>{t("dpage_of35", String(d.no).padStart(2, "0"))}</span></div>
          <div className="dpage__fact"><span className="label">{t("dpage_division")}</span><span>{pick(d.division)}</span></div>
          <div className="dpage__fact"><span className="label">{t("dpage_hq")}</span><span>{pick(d.hq)}</span></div>
          <div className="dpage__fact"><span className="label">{t("dpage_known")}</span><span>{pick(d.tag)}</span></div>
        </div>
      </div>

      {/* gallery */}
      <div className="dpage__gallery">
        {d.images.map((img, i) => (
          <figure className={`dpage__shot dpage__shot--${i + 1}`} key={img}>
            <DepthImage src={img} alt={`${nameDisplay} — view ${i + 1}`} depth={26} mouseDepth={6} imgClassName="dpage__shotimg" />
            <figcaption className="label">{nameDisplay} · {String(i + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>

      {/* tourist attractions */}
      <div className="dpage__spots scene">
        <div className="dpage__spots-head">
          <span className="label">{t("dpage_spots_kicker")}</span>
          <TextReveal as="h2" lines={[t("dpage_spots_l1"), t("dpage_spots_l2", nameDisplay)]} start="top 82%" />
          <p className="dpage__spots-intro">{t("dpage_spots_intro", d.attractions.length, nameDisplay)}</p>
        </div>
        <ol className="dpage__list">
          {d.attractions.map((a, i) => (
            <li className="dpage__spot" key={a.name}>
              <span className="dpage__spotnum">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="label dpage__spotkind">{pick(a.kind)}</span>
                <h3>{pick(a.name)}</h3>
                <p>{pick(a.about)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* district stays — this district's own hotels/resorts/lodges */}
      <DistrictStays slug={slug} />

      {/* return CTA + prev/next + related */}
      <div className="dpage__cta">
        <a className="btn btn--ghost" href="#/districts">{t("dpage_explore")}</a>
        <a className="btn btn--solid" href="#/visit">{t("dpage_plan")}</a>
      </div>

      <nav className="dpage__pager" aria-label="More districts">
        {prev ? (
          <a className="dpage__pagebtn" href={`#/district/${slugify(prev.name)}`}>
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="label">{t("prev")}</span>
            <strong>{pick(prev.name)}</strong>
          </a>
        ) : (
          <a className="dpage__pagebtn dpage__pagebtn--dim" href="#/districts">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="label">{t("prev")}</span>
            <strong>{t("all_districts")}</strong>
          </a>
        )}
        {next ? (
          <a className="dpage__pagebtn dpage__pagebtn--next" href={`#/district/${slugify(next.name)}`}>
            <span className="label">{t("next")}</span>
            <strong>{pick(next.name)}</strong>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        ) : (
          <a className="dpage__pagebtn dpage__pagebtn--next dpage__pagebtn--dim" href="#/visit">
            <span className="label">{t("next")}</span>
            <strong>{t("dpage_plan")}</strong>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        )}
      </nav>

      {related.length > 0 && (
        <div className="dpage__related" data-reveal>
          <span className="label">{t("related")} — {pick(d.division)}</span>
          <div className="dpage__relgrid">
            {related.map((r) => (
              <a key={r.no} className="dpage__relcard" href={`#/district/${slugify(r.name)}`}>
                <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
                <div>
                  <strong>{pick(r.name)}</strong>
                  <span className="label">{pick(r.hq)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
