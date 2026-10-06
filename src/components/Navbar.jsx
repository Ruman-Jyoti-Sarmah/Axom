import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV } from "../data/content";
import { getLenis } from "../lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    getLenis()?.scrollTo(href, { offset: 0, duration: 2 });
  };

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#top" className="nav__logo" onClick={(e) => go(e, "#top")} aria-label={`${BRAND.name} home`}>
          {BRAND.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav__links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#finale" className="nav__book" onClick={(e) => go(e, "#finale")}>Reserve</a>
        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </header>
      {open && (
        <nav className="nav__menu" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>
          ))}
          <a href="#finale" onClick={(e) => go(e, "#finale")}>Reserve</a>
        </nav>
      )}
    </>
  );
}
