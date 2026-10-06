import { ArrowUpRight } from "lucide-react";
import { BRAND, NAV, FOOTER } from "../data/content";

/** SCENE 10 — Minimal premium footer. */
export default function Footer() {
  const go = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#/") || window.location.hash.startsWith("#/district")) {
      window.location.hash = href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__top">
        <div>
          <p className="footer__logo">{BRAND.name}</p>
          <p className="label footer__tag">{BRAND.tagline}</p>
        </div>
        <div className="footer__cols">
          <nav className="footer__col" aria-label="Footer navigation">
            <h4 className="label">Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="footer__col">
            <h4 className="label">Reservations</h4>
            <ul>
              {FOOTER.contact.map((c) => (
                <li key={c}><a href={c.includes("@") ? `mailto:${c}` : `tel:${c.replace(/\s/g, "")}`}>{c}</a></li>
              ))}
            </ul>
            <address style={{ marginTop: "1.4rem" }}>{FOOTER.address}</address>
          </div>
          <div className="footer__col">
            <h4 className="label">Follow</h4>
            <ul>
              {FOOTER.social.map((s) => (
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
        <span>{BRAND.established}</span>
        <span>{FOOTER.legal}</span>
      </div>
    </footer>
  );
}
