import { useApp } from "../store/AppContext";
import { pick } from "./pick";

/** Returns content.js values overridden by current language strings. */
export function useContent() {
  const { t, lang } = useApp();
  return {
    t,
    lang,
    pick: (v) => pick(v, lang),
    hero: {
      est: t("hero_est"),
      l1: t("hero_l1"),
      l2: t("hero_l2"),
      support: t("hero_support"),
      cta: t("hero_cta"),
      discover: t("hero_discover"),
    },
    intro: { label: t("intro_label"), l1: t("intro_l1"), l2: t("intro_l2"), l3: t("intro_l3"), body: t("intro_body") },
    arch: { label: t("arch_label"), l1: t("arch_l1"), l2: t("arch_l2"), p1: t("arch_p1"), p2: t("arch_p2") },
    dining: { label: t("dining_label"), l1: t("dining_l1"), l2: t("dining_l2"), body: t("dining_body"), menu: [t("dining_m1"), t("dining_m2"), t("dining_m3")] },
  };
}
