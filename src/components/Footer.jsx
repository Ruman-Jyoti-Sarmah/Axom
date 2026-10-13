import { ArrowUpRight } from "lucide-react";
import { BRAND } from "../data/content";
import { useApp } from "../store/AppContext";
import { pick } from "../lib/pick";
import Newsletter from "./Newsletter";

const LINKS = (t) => [
  { label: t("nav_heritage"), href: "#architecture" },
  { label: t("nav_stays"), href: "#/stays" },
  { label: t("nav_cuisine"), href: "#dining" },
  { label: t("nav_experiences"), href: "#experiences" },
  { label: t("nav_districts"), href: "#/districts" },
  { label: t("nav_gallery"), href: "#gallery" },
  { label: t("nav_visit"), href: "#/visit" },
  { label: t("nav_journey"), href: "#/journey" },
  { label: t("nav_artists"), href: "#/artists" },
  { label: t("nav_wildlife"), href: "#/wildlife" },
];

/** Footer — dynamic nav + newsletter signup + saved favourites count. */
export default function Footer() {
  const { t, favourites, lang } = useApp();
  const NAV = LINKS(t);
  const go = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#/") || window.location.hash.startsWith("#/district")) {
      window.location.hash = href;
      return;
    }
    try {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } catch {}
  };
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__top">
        <div>
          <p className="footer__logo">{pick(BRAND.name, lang)}</p>
          <p className="label footer__tag">{pick(BRAND.tagline, lang)}</p>
          <div style={{ marginTop: "1.6rem", maxWidth: "22rem" }}>
            <Newsletter />
          </div>
        </div>
        <div className="footer__cols">
          <nav className="footer__col" aria-label="Footer navigation">
            <h4 className="label">{t("foot_explore")}</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="footer__col">
            <h4 className="label">{t("favourites")} ({favourites.length})</h4>
            <ul>
              {favourites.length === 0 && <li><span style={{ opacity: 0.55 }}>—</span></li>}
              {favourites.slice(0, 5).map((s) => (
                <li key={s}><a href={`#/district/${s}`} style={{ textTransform: "capitalize" }}>{pick(s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), lang)}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="label">{t("foot_follow")}</h4>
            <ul>
              {(lang === "as" ? ["ইনস্টাগ্ৰাম", "পিনতাৰেস্ট", "জাৰ্নেল"] : ["Instagram", "Pinterest", "Journal"]).map((s) => (
                <li key={s}>
                  <a href="#top" onClick={(e) => go(e, "#top")} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    {s} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>{pick(BRAND.established, lang)}</span>
        <span>{t("foot_legal")}</span>
      </div>
    </footer>
  );
}
