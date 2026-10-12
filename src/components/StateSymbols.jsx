import { useApp } from "../store/AppContext";
import { STATE_SYMBOLS } from "../data/stateSymbols";
import DepthImage from "./DepthImage";

/**
 * State Symbols of Assam — a dedicated page. Every official state symbol
 * (animal, bird, flower, tree, fruit, festival, dance, song, motto, language,
 * seal) gets its own detailed card with an image, its official name, and why
 * it is the state symbol.
 */
export function StateSymbols() {
  const { t, pick } = useApp();
  return (
    <section className="symbols" id="top">
      <div className="symbols__hero">
        <div className="symbols__bg">
          <img src={STATE_SYMBOLS[0].image} alt="" />
        </div>
        <div className="symbols__veil"></div>
        <div className="symbols__content">
          <p className="symbols__kicker">{t("symbols_kicker")}</p>
          <h1 className="symbols__title">{t("symbols_title")}</h1>
          <p className="symbols__sub">{t("symbols_sub")}</p>
        </div>
      </div>

      <div className="symbols__body">
        <div className="symbols__grid">
          {STATE_SYMBOLS.map((s, i) => (
            <article className="symbol" key={s.key} data-reveal>
              <div className="symbol__media">
                <DepthImage
                  src={s.image}
                  alt={`${pick(s.name)} — ${pick(s.kind)} of Assam`}
                  depth={22}
                  mouseDepth={5}
                  imgClassName="symbol__img"
                />
                <span className="symbol__icon" aria-hidden="true">{s.icon}</span>
              </div>
              <div className="symbol__body">
                <span className="label symbol__kind">{pick(s.kind)}</span>
                <h2 className="symbol__name">{pick(s.name)}</h2>
                <p className="symbol__official">{s.official}</p>
                <p className="symbol__why">{pick(s.why)}</p>
                <p className="symbol__detail">{pick(s.detail)}</p>
                <span className="symbol__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="symbols__cta">
          <a className="btn btn--ghost" href="#/facts">{t("symbols_more")}</a>
          <a className="btn btn--solid" href="#/journey">{t("reserve")}</a>
        </div>
      </div>
    </section>
  );
}
