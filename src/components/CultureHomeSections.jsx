import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useApp } from "../store/AppContext";
import { HERITAGE_ROWS, LIVING_HERITAGE_FEATURE } from "../data/cultureHome";
import { FESTIVAL_STRIP, CRAFT_FEATURES } from "../data/cultureHome";
import ScrollHint from "./ScrollHint";

import { Cuisine, Explore, Performance } from "./CultureHomeMore";
import RiversHome from "./RiversHome";

export default function CultureHomeSections() {
  return (
    <>
      <LivingHeritage />
      <Festivals />
      <Crafts />
      <Performance />
      <RiversHome />
    </>
  );
}
export { Cuisine, Explore, RiversHome };

function Kicker({ children }) {
  return <span className="chome__kicker">{children}</span>;
}

function NumberedHead({ index, kicker, title, sub, major }) {
  return (
    <div className="chome__head">
      <div className="chome__eyebrow">
        <span className="chome__index" aria-hidden="true">{index}</span>
        <Kicker>{kicker}</Kicker>
      </div>
      <h2 className={`chome__title${major ? " chome__title--major" : ""}`}>{title}</h2>
      {sub ? <p className="chome__sub">{sub}</p> : null}
    </div>
  );
}

export function LivingHeritage() {
  const { t, pick } = useApp();
  const rowsRef = useRef(null);
  return (
    <section className="chome chome--heritage chome--major">
      <NumberedHead index="01" kicker={t("culture_heritage_kicker")} title={t("culture_heritage_title")} sub={t("culture_heritage_sub")} major />
      <div className="chome__heritage-grid">
        <figure className="chome__feature" data-reveal>
          <img src={LIVING_HERITAGE_FEATURE.image} alt={pick(LIVING_HERITAGE_FEATURE.alt)} loading="lazy" decoding="async" />
          <figcaption><span>{pick({ en: "Rang Ghar · Sivasagar", as: "ৰংঘৰ · শিৱসাগৰ" })}</span></figcaption>
        </figure>
        <div className="chome__rows" ref={rowsRef}>
          {HERITAGE_ROWS.map((r, idx) => (
            <article key={r.id} className="chome__row" data-reveal style={{ "--d": `${Math.min(idx, 3) * 70}ms` }}>
              <div className="chome__row-media">
                <img src={r.image} alt={pick(r.title)} loading="lazy" decoding="async" />
              </div>
              <div className="chome__row-body">
                <span className="chome__row-kicker">{pick(r.kicker)}</span>
                <h3>{pick(r.title)}</h3>
                <p>{pick(r.body)}</p>
                <a className="chome__link" href={r.href}>{t("culture_discover")} <ArrowRight size={14} aria-hidden="true" /> {pick(r.title)}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ScrollHint targetRef={rowsRef} />
    </section>
  );
}

export function Festivals() {
  const { t, pick } = useApp();
  const stripRef = useRef(null);
  return (
    <section className="chome chome--fest">
      <div className="chome__head chome__head--split">
        <div>
          <div className="chome__eyebrow">
            <span className="chome__index" aria-hidden="true">02</span>
            <Kicker>{t("culture_fest_kicker")}</Kicker>
          </div>
          <h2 className="chome__title">{t("culture_fest_title")}</h2>
        </div>
        <p className="chome__sub">{t("culture_fest_sub")}</p>
      </div>
      <div className="chome__strip" role="list" ref={stripRef}>
        {FESTIVAL_STRIP.map((f, idx) => (
          <a key={pick(f.name)} href={f.href} role="listitem" className="chome__strip-card" data-reveal style={{ "--d": `${Math.min(idx, 3) * 70}ms` }}>
            <div className="chome__strip-media">
              <img src={f.image} alt={pick(f.name)} loading="lazy" decoding="async" />
            </div>
            <div className="chome__strip-body">
              <h3>{pick(f.name)}</h3>
              <p>{pick(f.about)}</p>
            </div>
          </a>
        ))}
      </div>
      <ScrollHint targetRef={stripRef} />
    </section>
  );
}

export function Crafts() {
  const { t, pick } = useApp();
  const splitRef = useRef(null);
  return (
    <section className="chome chome--craft">
      <NumberedHead index="03" kicker={t("culture_craft_kicker")} title={t("culture_craft_title")} sub={t("culture_craft_sub")} />
      <div className="chome__split" ref={splitRef}>
        {CRAFT_FEATURES.map((c) => (
          <article key={pick(c.title)} className="chome__split-card" data-reveal>
            <div className="chome__split-media">
              <img src={c.image} alt={pick(c.title)} loading="lazy" decoding="async" />
            </div>
            <div className="chome__split-body">
              <span className="chome__row-kicker">{pick(c.kicker)}</span>
              <h3>{pick(c.title)}</h3>
              <p>{pick(c.body)}</p>
              <a className="chome__link" href={c.href}>{t("culture_discover")} <ArrowUpRight size={14} aria-hidden="true" /> {pick(c.title)}</a>
            </div>
          </article>
        ))}
      </div>
      <ScrollHint targetRef={splitRef} />
    </section>
  );
}
