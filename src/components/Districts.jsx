import { useState } from "react";
import { DISTRICTS, slugify } from "../data/districts";

const DIVISIONS = ["All", "Lower Assam", "North Assam", "Upper Assam", "Central Assam", "Barak Valley"];

/**
 * STANDALONE PAGE (#/districts) — all 35 districts at once.
 * Hero + division filter chips + responsive card grid; every card opens
 * its district page. Grid filters instantly (CSS transitions only).
 */
export default function Districts() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? DISTRICTS : DISTRICTS.filter((d) => d.division === filter);

  return (
    <section className="dlist" id="top" aria-label="All 35 districts of Assam">
      {/* page hero */}
      <div className="dlist__hero">
        <a className="label dlist__back" href="#top">← Home</a>
        <span className="label">AXOM · ASSAM · EXPLORE</span>
        <h1 className="dlist__title">
          <span className="tr-line"><span className="tr-inner">ALL 35</span></span>
          <span className="tr-line"><span className="tr-inner"><em>DISTRICTS</em></span></span>
        </h1>
        <p className="dlist__intro">
          From the Barak valley to the Bhutan foothills — every district of Assam with its seat,
          its story, its images and its tourist treasures. Pick a region, open a district.
        </p>
        <div className="dlist__stats">
          <div><strong>35</strong><span className="label">Districts</span></div>
          <div><strong>05</strong><span className="label">Divisions</span></div>
          <div><strong>140+</strong><span className="label">Tourist Spots</span></div>
          <div><strong>01</strong><span className="label">Axomiya Soul</span></div>
        </div>
      </div>

      {/* division filters */}
      <div className="dlist__filters" role="tablist" aria-label="Filter districts by division">
        {DIVISIONS.map((div) => (
          <button
            key={div}
            role="tab"
            aria-selected={filter === div}
            className={`dlist__chip ${filter === div ? "dlist__chip--active" : ""}`}
            onClick={() => setFilter(div)}
          >
            {div === "All" ? "All Districts" : div}
          </button>
        ))}
      </div>

      {/* card grid — division groups on "All" (carousels on mobile),
          single filtered row otherwise */}
      {filter === "All" ? (
        DIVISIONS.slice(1).map((div) => {
          const items = DISTRICTS.filter((d) => d.division === div);
          return (
            <div className="dlist__group" key={div}>
              <div className="dlist__group-head">
                <span className="label">{div}</span>
                <i className="dlist__rule" aria-hidden="true" />
                <span className="label">{String(items.length).padStart(2, "0")} districts</span>
              </div>
              <div className="dlist__grid">
                {items.map((d, i) => (
                  <a
                    className="dlist__card"
                    key={d.no}
                    href={`#/district/${slugify(d.name)}`}
                    aria-label={`Open ${d.name} district page`}
                  >
                    <div className="dlist__media">
                      <img src={d.image} alt={d.alt} loading={i < 6 ? "eager" : "lazy"} decoding="async" />
                      <span className="dlist__num">{String(d.no).padStart(2, "0")}</span>
                    </div>
                    <div className="dlist__body">
                      <span className="label dlist__division">{d.division}</span>
                      <h3>{d.name}</h3>
                      <p className="dlist__hq"><span>Seat</span> {d.hq}</p>
                      <p className="dlist__about">{d.about}</p>
                      <span className="dlist__cta">Open district <em>→</em></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="dlist__grid dlist__grid--all">
          {list.map((d, i) => (
            <a
              className="dlist__card"
              key={d.no}
              href={`#/district/${slugify(d.name)}`}
              aria-label={`Open ${d.name} district page`}
            >
              <div className="dlist__media">
                <img src={d.image} alt={d.alt} loading={i < 6 ? "eager" : "lazy"} decoding="async" />
                <span className="dlist__num">{String(d.no).padStart(2, "0")}</span>
              </div>
              <div className="dlist__body">
                <span className="label dlist__division">{d.division}</span>
                <h3>{d.name}</h3>
                <p className="dlist__hq"><span>Seat</span> {d.hq}</p>
                <p className="dlist__about">{d.about}</p>
                <span className="dlist__cta">Open district <em>→</em></span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="dlist__foot">
        <a className="btn btn--ghost" href="#top">← Back to the main page</a>
        <a className="btn btn--solid" href="#finale">Plan Your Stay</a>
      </div>
    </section>
  );
}

