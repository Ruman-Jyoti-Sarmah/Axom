import { Suspense, lazy, useEffect, useState } from "react";
import { getDistrict } from "./data/districtDetails";
import { AppProvider, useApp } from "./store/AppContext";
import { TripProvider } from "./store/TripContext";
import CultureHeader from "./components/CultureHeader";
import SectionDock from "./components/SectionDock";
import CultureHub from "./components/CultureHub";
import CultureExperience from "./components/CultureExperience";
import Footer from "./components/Footer";
import { useRevealRoot } from "./lib/useReveal";
import { getSection } from "./lib/section";

// Route-level code splitting: home shell stays tiny (~React + CSS), every
// other route loads on demand. This fixes "Reduce unused JavaScript" +
// "Minimize main-thread work" + "Avoid enormous network payloads".
const DistrictDetail = lazy(() => import("./components/DistrictDetail"));
const Districts = lazy(() => import("./components/Districts"));
const StaysExplorer = lazy(() => import("./components/StaysPage"));
const Location = lazy(() => import("./components/Location"));
const Visit = lazy(() => import("./components/Visit"));
const Admin = lazy(() => import("./components/Admin"));
const Finale = lazy(() => import("./components/Finale"));
const Intro = lazy(() => import("./components/Intro"));
const Architecture = lazy(() => import("./components/Architecture"));
const Stays = lazy(() => import("./components/Stays"));
const Dining = lazy(() => import("./components/Dining"));
const Experiences = lazy(() => import("./components/Experiences"));
const Gallery = lazy(() => import("./components/Gallery"));
const JourneyPlanner = lazy(() => import("./components/JourneyPlanner").then((m) => ({ default: m.JourneyPlanner })));
const ArtistsPage = lazy(() => import("./components/ArtistsPage").then((m) => ({ default: m.ArtistsPage })));
const WildlifePage = lazy(() => import("./components/WildlifePage").then((m) => ({ default: m.WildlifePage })));
const AssamFacts = lazy(() => import("./components/AssamFacts").then((m) => ({ default: m.AssamFacts })));
const AssamCulture = lazy(() => import("./components/AssamCulture").then((m) => ({ default: m.AssamCulture })));
const ImageCredits = lazy(() => import("./components/AssamCulture").then((m) => ({ default: m.ImageCredits })));
const AssamHandicrafts = lazy(() => import("./components/AssamHandicrafts").then((m) => ({ default: m.AssamHandicrafts })));
const AssamTravelGuide = lazy(() => import("./components/AssamTravelGuide").then((m) => ({ default: m.AssamTravelGuide })));
const TripCart = lazy(() => import("./components/TripCart"));
const TripPlanner = lazy(() => import("./components/TripPlanner"));
const ItineraryView = lazy(() => import("./components/ItineraryView"));
const TravelHome = lazy(() => import("./components/TravelHome"));
const AssamHeritage = lazy(() => import("./components/AssamHeritage").then((m) => ({ default: m.AssamHeritage })));
const StateSymbols = lazy(() => import("./components/StateSymbols").then((m) => ({ default: m.StateSymbols })));
const RiversPage = lazy(() => import("./components/RiversPage").then((m) => ({ default: m.RiversPage })));
const RiverDetail = lazy(() => import("./components/RiverDetail").then((m) => ({ default: m.RiverDetail })));

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

  const slug = slugFromHash(hash);
  const onDistrictsPage = hash === "#/districts";
  const onStaysPage = hash === "#/stays";
  const onJourneyPage = hash === "#/journey";
  const onArtistsPage = hash === "#/artists";
  const onWildlifePage = hash === "#/wildlife";
  const onVisitPage = hash === "#/visit";
  const onAdminPage = hash === "#/admin";

  const onFactsPage = hash === "#/facts";
  const onCulturePage = hash === "#/culture";
  const onHandicraftsPage = hash === "#/handicrafts";
  const onGuidePage = hash === "#/guide";
  const onHeritagePage = hash === "#/heritage";
  const onSymbolsPage = hash === "#/symbols";

  // ── Travel trip-planning routes ──
  const onTravelHome = hash === "#/travel" || hash === "#/travel/";
  const onTripPage = hash === "#/trip";
  const onTripPlanPage = hash === "#/trip/plan";
  const onTripItineraryPage = hash === "#/trip/itinerary";

  // ── Two-section routing ──
  // CULTURE hub (#/culture) is the landing; #/culture/experiences/:kind are its
  // detail pages; TRAVEL hub (#/travel) is reached via the navbar switcher.
  const section = getSection(hash);
  const cultureKind = (hash || "").match(/^#\/culture\/experiences\/([a-z-]+)/)?.[1] || null;
  const onCultureHub =
    hash === "#/culture" || hash === "#/culture/" || !hash || hash === "#" || hash === "#top" || hash === "#home" || hash === "#/";
  const onCultureExperience = hash?.startsWith("#/culture/experiences/") && cultureKind;
  const onCultureFestivals = hash === "#/culture/festivals";
  const onCreditsPage = hash === "#/credits";
  const onRiversPage = hash === "#/rivers" || hash === "#/rivers/";
  // Matches both "#/river/<id>" and "#/rivers/<id>" — "#/rivers" alone (no slug) is the index.
  const riverSlug = (hash || "").match(/^#\/rivers?\/([a-z0-9-]+)/)?.[1] || null;
  const onRiverDetail = riverSlug !== null;
  const riverTitle = onRiverDetail ? ({ brahmaputra: "riversBrahmaputra", barak: "riversBarak" }[riverSlug] ?? null) : null;


  // route changes: page title + native scroll (no animation engine)
  useEffect(() => {
    const detail = slug ? getDistrict(slug) : null;
    const d = detail ? `${pick(detail.name)} ${t("title_district_suffix")}` : null;
    const T = {
      detail: d,
      districts: t("title_districts"),
      stays: t("title_stays"),
      journey: t("title_journey"),
      artists: t("title_artists"),
      wildlife: t("title_wildlife"),
      visit: t("title_visit"),
      facts: t("title_facts"),
      culture: t("title_culture"),
      handicrafts: t("title_handicrafts"),
      guide: t("title_guide"),
      heritage: t("title_heritage"),
      symbols: t("title_symbols"),
      admin: t("title_admin"),
      home: t("title_home"),
      rivers: t("title_rivers"),
      riversBrahmaputra: t("title_rivers_brahmaputra"),
      riversBarak: t("title_rivers_barak"),
      cultureHub: t("title_culture_hub"),
      cultureExperience: t("title_culture_experience"),
      cultureFestivals: t("title_culture"),
      travelHub: t("title_journey"),
      tripCart: t("trip_title"),
      tripPlan: t("plan_title"),
      tripItinerary: t("itin_title"),
    };
    document.title =
      (slug ? T.detail : null) ||
      (onCultureHub ? T.cultureHub : null) ||
      (onCultureExperience ? T.cultureExperience : null) ||
      (onCultureFestivals ? T.cultureFestivals : null) ||
      (onTravelHome ? T.travelHub : null) ||
      (onTripPage ? T.tripCart : null) ||
      (onTripPlanPage ? T.tripPlan : null) ||
      (onTripItineraryPage ? T.tripItinerary : null) ||
      (onDistrictsPage ? T.districts : null) ||
      (onStaysPage ? T.stays : null) ||
      (onJourneyPage ? T.journey : null) ||
      (onArtistsPage ? T.artists : null) ||
      (onWildlifePage ? T.wildlife : null) ||
      (onVisitPage ? T.visit : null) ||
      (onAdminPage ? T.admin : null) ||
      (onFactsPage ? T.facts : null) ||
      (onCulturePage ? T.culture : null) ||
      (onHandicraftsPage ? T.handicrafts : null) ||
      (onGuidePage ? T.guide : null) ||
      (onHeritagePage ? T.heritage : null) ||
      (onSymbolsPage ? T.symbols : null) ||
      (onRiversPage ? T.rivers : null) ||
      (onRiverDetail ? (riverTitle ? T[riverTitle] : null) : null) ||
      T.home;

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
      if (
        slug || onDistrictsPage || onStaysPage || onJourneyPage || onArtistsPage ||
        onWildlifePage || onVisitPage || onAdminPage || onFactsPage || onCulturePage ||
        onHandicraftsPage || onGuidePage || onHeritagePage || onSymbolsPage ||
        onCultureHub || onCultureExperience || onCultureFestivals || onTravelHome ||
        onTripPage || onTripPlanPage || onTripItineraryPage ||
        hash === "#top" || !hash
      ) {
        window.scrollTo(0, 0);
      }
    }, 60);
    return () => clearTimeout(timeoutId);
  }, [slug, hash, t, lang, pick, onDistrictsPage, onStaysPage, onJourneyPage, onArtistsPage, onWildlifePage, onVisitPage, onAdminPage, onFactsPage, onCulturePage, onHandicraftsPage, onGuidePage, onHeritagePage, onSymbolsPage, onCultureHub, onCultureExperience, onCultureFestivals, onTravelHome, onTripPage, onTripPlanPage, onTripItineraryPage]);

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

  return (
    <main ref={revealRef} data-section={section}>
      <a className="skip-link" href="#home-content">Skip to content</a>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {/* One shared header for BOTH sections (Incredible-India style).
          Accents/buttons auto-flip to the section colour via --accent, so
          Travel keeps its blue buttons while sharing Culture's navbar. */}
      <CultureHeader section={section} isCultureHome={onCultureHub} />
      <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page">…</div>}>
      {onAdminPage ? (
        <Admin key="admin" />
      ) : onCultureHub ? (
        <CultureHub key="culture-hub" />
      ) : onCultureExperience ? (
        <CultureExperience kind={cultureKind} key={`cexp-${cultureKind}`} />
      ) : onCultureFestivals ? (
        <AssamCulture key="culture-festivals" />
      ) : onCreditsPage ? (
        <ImageCredits key="credits" />
      ) : onTripItineraryPage ? (
        <ItineraryView key="itinerary" />
      ) : onTripPlanPage ? (
        <TripPlanner key="trip-plan" />
      ) : onTripPage ? (
        <TripCart key="trip-cart" />
      ) : onTravelHome ? (
        <TravelHome key="travel-hub" />
      ) : onVisitPage ? (
        <Visit key="visit" />
      ) : slug ? (
        <DistrictDetail slug={slug} key={slug} />
      ) : onDistrictsPage ? (
        <Districts key="districts-page" />
      ) : onStaysPage ? (
        <StaysExplorer key="stays-explorer" />
      ) : onJourneyPage ? (
        <JourneyPlanner key="journey" />
      ) : onArtistsPage ? (
        <ArtistsPage key="artists" />
      ) : onWildlifePage ? (
        <WildlifePage key="wildlife" />
      ) : onFactsPage ? (
        <AssamFacts key="facts" />
      ) : onCulturePage ? (
        <AssamCulture key="culture" />
      ) : onHandicraftsPage ? (
        <AssamHandicrafts key="handicrafts" />
      ) : onGuidePage ? (
        <AssamTravelGuide key="guide" />
      ) : onHeritagePage ? (
        <AssamHeritage key="heritage" />
      ) : onSymbolsPage ? (
        <StateSymbols key="symbols" />
      ) : onRiverDetail ? (
        <RiverDetail key={riverSlug || "river-detail"} />
      ) : onRiversPage ? (
        <RiversPage key="rivers" />
      ) : (
        <CultureHub key="culture-default" />
      )}
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
