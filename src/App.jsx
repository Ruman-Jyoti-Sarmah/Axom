import { Suspense, useEffect, useState } from "react";
import { getDistrict } from "@/data/travel/districtDetails";
import { AppProvider, useApp } from "@/store/AppContext";
import { TripProvider } from "@/store/TripContext";
import CultureHeader from "@/pages/Culture/CultureHeader";
import SectionDock from "@/components/common/SectionDock";
import Footer from "@/components/common/Footer";
import { useRevealRoot } from "@/lib/useReveal";
import { getSection } from "@/lib/section";
import { getRoute } from "@/app/routes";

/** #/district/kamrup -> "kamrup", anything else -> null */
const slugFromHash = (hash) =>
  (hash || "").match(/^#\/district\/([a-z0-9-]+)/)?.[1] || null;

function Shell() {
  const { t, lang, pick } = useApp();
  // lightweight hash router: main site / districts / district / journey / artists / wildlife
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const route = getRoute(hash);
  const slug = route.slug || slugFromHash(hash);
  const section = getSection(hash);
  const riverTitleKey = route.riverSlug
    ? ({ brahmaputra: "title_rivers_brahmaputra", barak: "title_rivers_barak" }[route.riverSlug] ?? null)
    : null;


  // route changes: page title + native scroll (no animation engine)
  useEffect(() => {
    const detail = slug ? getDistrict(slug) : null;
    const d = detail ? `${pick(detail.name)} ${t("title_district_suffix")}` : null;
    const routeTitle = riverTitleKey ? t(riverTitleKey) : route.titleKey ? t(route.titleKey) : null;
    document.title = d || routeTitle || t("title_home");

    const timeoutId = setTimeout(() => {
      // Anchor scroll only for plain in-page hashes (#dining, #gallery…).
      // "#/districts" style route hashes are NOT valid CSS selectors —
      // querying them throws and breaks the scroll effect ("glitch").
      if (hash && !hash.startsWith("#/")) {
        try {
          document.querySelector(hash)?.scrollIntoView();
          return;
        } catch {}
      }
      if (route.name !== "unknown" || hash === "#top" || !hash) {
        window.scrollTo(0, 0);
      }
    }, 60);
    return () => clearTimeout(timeoutId);
  }, [slug, hash, t, lang, pick, route.name, riverTitleKey]);

  // scroll progress indicator
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-reveal: any [data-reveal] child animates in once via CSS.
  // The dep MUST change for every route — including #/district/* — otherwise the
  // IntersectionObserver is never rebuilt and newly mounted [data-reveal]
  // sections stay stuck at opacity: 0 (invisible blank gaps on the page).
  const revealDep = slug ? `district:${slug}` : hash || "home";
  const revealRef = useRevealRoot(revealDep);
  const { Component: Page, ...pageProps } = route;

  return (
    <main ref={revealRef} data-section={section}>
      <a className="skip-link" href="#home-content">Skip to content</a>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {/* One shared header for BOTH sections (Incredible-India style).
          Accents/buttons auto-flip to the section colour via --accent, so
          Travel keeps its blue buttons while sharing Culture's navbar. */}
      <CultureHeader section={section} isCultureHome={route.name === "culture-home"} />
      <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page">…</div>}>
      <Page {...pageProps} key={route.name} />
      </Suspense>
      <SectionDock section={section} />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <TripProvider>
        <Shell />
      </TripProvider>
    </AppProvider>
  );
}
