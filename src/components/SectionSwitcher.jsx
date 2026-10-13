import { Landmark, Compass } from "lucide-react";
import { useApp } from "../store/AppContext";
import { CULTURE, TRAVEL, SECTION_HOME } from "../lib/section";

/**
 * SectionSwitcher — the navbar control that flips the whole site between its
 * two parts: CULTURE (the cultural portal, opens first) and TRAVEL (trip
 * planning). It is a clear two-state segmented toggle with icons + labels so
 * the current section is obvious at a glance, on desktop and mobile alike.
 *
 * Clicking the *inactive* half switches to that section's landing page.
 */
export default function SectionSwitcher({ section, compact = false }) {
  const { t } = useApp();
  const go = (target) => {
    if (target === section) return;
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
    <div
      className={`switch ${compact ? "switch--compact" : ""}`}
      role="tablist"
      aria-label={t("switch_section")}
      data-section={section}
    >
      <span className="switch__thumb" aria-hidden="true" data-pos={section} />
      {items.map(({ id, label, hint, Icon }) => {
        const active = section === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`${label} — ${hint}`}
            title={hint}
            className={`switch__btn ${active ? "is-active" : ""}`}
            onClick={() => go(id)}
          >
            <Icon size={15} aria-hidden="true" />
            <span className="switch__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
