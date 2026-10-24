import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/store/AppContext";

/**
 * ScrollHint — the small "Scroll to explore →" line under a mobile-only
 * card carousel. It is hidden on desktop (the rails only become scrollable
 * at the ≤600px breakpoint) and whenever the rail does not actually
 * overflow, so it is never a misleading instruction.
 *
 * `targetRef` must point at the scrolling rail element.
 */
export default function ScrollHint({ targetRef }) {
  const { t } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rail = targetRef?.current;
    if (!rail) return undefined;
    const refresh = () => {
      // hidden on desktop (rail is not a scroller there) + only when there
      // is genuinely more card content to discover.
      const scrollable = rail.scrollWidth - rail.clientWidth > 8;
      const shown = !!(
        window.matchMedia?.("(max-width: 600px)").matches && scrollable
      );
      setVisible(shown);
    };
    refresh();
    window.addEventListener("resize", refresh);
    rail.addEventListener("scroll", refresh, { passive: true });
    // cards/images can change the rail width after first paint
    const mo = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(refresh)
      : null;
    mo?.observe(rail);
    if (rail.firstElementChild) mo?.observe(rail.firstElementChild);
    return () => {
      window.removeEventListener("resize", refresh);
      rail.removeEventListener("scroll", refresh);
      mo?.disconnect();
    };
  }, [targetRef]);

  if (!visible) return null;

  return (
    <p className="chome__scroll-hint" aria-hidden="true">
      {t("culture_scroll_hint")}
      <ArrowRight size={13} aria-hidden="true" />
    </p>
  );
}
