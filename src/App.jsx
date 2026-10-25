import { Suspense, useEffect, useState } from "react";
import { getDistrict } from "@/data/travel/districtDetails";
import { AppProvider, useApp } from "@/store/AppContext";
import { TripProvider } from "@/store/TripContext";
import CultureHeader from "@/components/common/CultureHeader";
import SectionDock from "@/components/common/SectionDock";
import Footer from "@/components/common/Footer";
import { useRevealRoot } from "@/lib/useReveal";
import { getSection } from "@/lib/section";
import { getRoute } from "@/app/routes";

const RIVER_TITLE_KEYS = {
  brahmaputra: "title_rivers_brahmaputra",
  barak: "title_rivers_barak",
};

function useCurrentHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash;
}

function getDistrictSlug(hash) {
  return (hash || "").match(/^#\/district\/([a-z0-9-]+)/)?.[1] || null;
}

function getRiverTitleKey(route) {
  return route.riverSlug ? RIVER_TITLE_KEYS[route.riverSlug] || null : null;
}

function getPageTitle({ route, districtSlug, riverTitleKey, t, pick }) {
  const district = districtSlug ? getDistrict(districtSlug) : null;

  if (district) {
    return `${pick(district.name)} ${t("title_district_suffix")}`;
  }

  if (riverTitleKey) return t(riverTitleKey);
  if (route.titleKey) return t(route.titleKey);
  return t("title_home");
}

function scrollAfterRouteChange(hash, routeName) {
  const isPageAnchor = hash && !hash.startsWith("#/");

  if (isPageAnchor) {
    try {
      document.querySelector(hash)?.scrollIntoView();
      return;
    } catch {
      // Invalid CSS selectors should not break route changes.
    }
  }

  if (routeName !== "unknown" || hash === "#top" || !hash) {
    window.scrollTo(0, 0);
  }
}

function useRouteEffects({ hash, route, districtSlug, riverTitleKey, t, lang, pick }) {
  useEffect(() => {
    document.title = getPageTitle({ route, districtSlug, riverTitleKey, t, pick });

    const timeoutId = setTimeout(() => {
      scrollAfterRouteChange(hash, route.name);
    }, 60);

    return () => clearTimeout(timeoutId);
  }, [hash, route.name, route.titleKey, districtSlug, riverTitleKey, t, lang, pick]);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const page = document.documentElement;
      const scrollableHeight = page.scrollHeight - page.clientHeight;
      const nextProgress = scrollableHeight > 0
        ? page.scrollTop / scrollableHeight
        : 0;

      setProgress(nextProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

function Shell() {
  const { t, lang, pick } = useApp();
  const hash = useCurrentHash();
  const route = getRoute(hash);
  const districtSlug = route.slug || getDistrictSlug(hash);
  const section = getSection(hash);
  const riverTitleKey = getRiverTitleKey(route);
  const progress = useScrollProgress();

  useRouteEffects({ hash, route, districtSlug, riverTitleKey, t, lang, pick });

  // Change this value on every route so newly mounted reveal sections are observed.
  const revealKey = districtSlug ? `district:${districtSlug}` : hash || "home";
  const revealRef = useRevealRoot(revealKey);
  const { Component: Page, ...pageProps } = route;

  return (
    <main ref={revealRef} data-section={section}>
      <a className="skip-link" href="#home-content">Skip to content</a>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <CultureHeader section={section} isCultureHome={route.name === "culture-home"} />
      <Suspense
        fallback={
          <div className="route-loading" role="status" aria-label="Loading page">
            …
          </div>
        }
      >
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
