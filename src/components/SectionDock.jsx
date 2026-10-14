import { Landmark, Compass } from "lucide-react";
import { useApp } from "../store/AppContext";
import { CULTURE, TRAVEL, SECTION_HOME } from "../lib/section";

/**
 * SectionDock — premium floating Culture ⟷ Travel switch.
 *
 * A single reusable control rendered once in App.jsx. The active section is
 * derived from the `section` prop (which App derives from the URL hash via
 * getSection), so there is no duplicate navigation state — back/forward,
 * reloads and nested routes (#/district/*, #/culture/experiences/*) all
 * resolve through the same source of truth as the header switcher.
 *
 * Routing reuses the exact handler from SectionSwitcher: set the section
 * landing hash and scroll to top. Links keep real hrefs so middle-click,
 * keyboard and assistive tech work natively.
 */
export default function SectionDock({ section = CULTURE }) {
  const { t } = useApp();

  const go = (e, target) => {
    if (target === section) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    e.preventDefault();
    window.location.hash = SECTION_HOME[target];
    window.scrollTo({ top: 0 });
  };

  const items = [
    {
      id: CULTURE,
      label: t("switch_to_culture"),
      hint: t("switch_culture_hint"),
      Icon: Landmark,
    },
    {
      id: TRAVEL,
      label: t("switch_to_travel"),
      hint: t("switch_travel_hint"),
      Icon: Compass,
    },
  ];

  return (
    <nav
      className="section-dock"
      aria-label={t("switch_section")}
      data-section={section}
    >
      <span className="section-dock__eyebrow" aria-hidden="true">
        Axom · {t("switch_section")}
      </span>
      <span className="section-dock__track" role="presentation">
        <span
          className="section-dock__thumb"
          aria-hidden="true"
          data-pos={section}
        />
        {items.map(({ id, label, hint, Icon }) => {
          const active = section === id;
          return (
            <a
              key={id}
              href={SECTION_HOME[id]}
              onClick={(e) => go(e, id)}
              aria-current={active ? "page" : undefined}
              aria-label={`${label} — ${hint}`}
              title={hint}
              className={`section-dock__btn section-dock__btn--${id} ${
                active ? "is-active" : ""
              }`}
            >
              <span
                className="section-dock__icon"
                aria-hidden="true"
              >
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <span className="section-dock__text">
                <span className="section-dock__label">{label}</span>
                <span className="section-dock__hint">{hint}</span>
              </span>
            </a>
          );
        })}
      </span>
    </nav>
  );
}
