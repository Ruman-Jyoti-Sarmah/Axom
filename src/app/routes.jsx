import { lazy } from "react";

import CultureExperience from "@/pages/Culture/CultureExperience";
import CultureHub from "@/pages/Culture/CultureHub";

const DistrictDetail = lazy(() => import("@/pages/Travel/DistrictDetail"));
const Districts = lazy(() => import("@/pages/Travel/Districts"));
const StaysPage = lazy(() =>
  import("@/pages/Travel/StaysPage").then(({ StaysPage: Page }) => ({ default: Page }))
);
const Visit = lazy(() => import("@/components/travel/Visit"));
const Admin = lazy(() => import("@/components/common/Admin"));
const JourneyPlanner = lazy(() =>
  import("@/pages/Travel/JourneyPlanner").then(({ JourneyPlanner: Page }) => ({ default: Page }))
);
const ArtistsPage = lazy(() =>
  import("@/components/culture/ArtistsPage").then(({ ArtistsPage: Page }) => ({ default: Page }))
);
const WildlifePage = lazy(() =>
  import("@/pages/Travel/WildlifePage").then(({ WildlifePage: Page }) => ({ default: Page }))
);
const AssamFacts = lazy(() =>
  import("@/components/culture/AssamFacts").then(({ AssamFacts: Page }) => ({ default: Page }))
);
const AssamCulture = lazy(() =>
  import("@/components/culture/AssamCulture").then(({ AssamCulture: Page }) => ({ default: Page }))
);
const ImageCredits = lazy(() =>
  import("@/components/culture/AssamCulture").then(({ ImageCredits: Page }) => ({ default: Page }))
);
const AssamHandicrafts = lazy(() =>
  import("@/components/culture/AssamHandicrafts").then(({ AssamHandicrafts: Page }) => ({ default: Page }))
);
const AssamTravelGuide = lazy(() =>
  import("@/components/travel/AssamTravelGuide").then(({ AssamTravelGuide: Page }) => ({ default: Page }))
);
const TripCart = lazy(() => import("@/pages/Travel/TripCart"));
const TripPlanner = lazy(() => import("@/pages/Travel/TripPlanner"));
const ItineraryView = lazy(() => import("@/pages/Travel/ItineraryView"));
const TravelHome = lazy(() => import("@/pages/Travel/TravelHome"));
const AssamHeritage = lazy(() =>
  import("@/components/culture/AssamHeritage").then(({ AssamHeritage: Page }) => ({ default: Page }))
);
const StateSymbols = lazy(() =>
  import("@/components/culture/StateSymbols").then(({ StateSymbols: Page }) => ({ default: Page }))
);
const RiversPage = lazy(() =>
  import("@/pages/Travel/RiversPage").then(({ RiversPage: Page }) => ({ default: Page }))
);
const RiverDetail = lazy(() => import("@/pages/Travel/RiverDetail"));

const HOME_HASHES = new Set(["", "#", "#top", "#home", "#/", "#/culture", "#/culture/"]);

const route = (name, Component, extra = {}) => ({ name, Component, ...extra });

/**
 * The application uses a small hash router instead of a routing dependency.
 * Keeping route matching in one place makes the page shell easy to read and
 * prevents route priority bugs when new Culture or Travel pages are added.
 */
export function getRoute(hash = "") {
  const currentHash = hash || "";

  if (currentHash === "#/admin") return route("admin", Admin, { titleKey: "title_admin" });
  if (HOME_HASHES.has(currentHash)) return route("culture-home", CultureHub, { titleKey: "title_culture_hub" });

  const cultureExperience = currentHash.match(/^#\/culture\/experiences\/([a-z-]+)/);
  if (cultureExperience) {
    return route("culture-experience", CultureExperience, {
      kind: cultureExperience[1],
      titleKey: "title_culture_experience",
    });
  }

  if (currentHash === "#/culture/festivals") return route("culture-festivals", AssamCulture, { titleKey: "title_culture" });
  if (currentHash === "#/credits") return route("credits", ImageCredits, { titleKey: "title_culture" });

  if (currentHash === "#/trip/itinerary") return route("trip-itinerary", ItineraryView, { titleKey: "itin_title" });
  if (currentHash === "#/trip/plan") return route("trip-plan", TripPlanner, { titleKey: "plan_title" });
  if (currentHash === "#/trip") return route("trip-cart", TripCart, { titleKey: "trip_title" });
  if (currentHash === "#/travel" || currentHash === "#/travel/") return route("travel-home", TravelHome, { titleKey: "title_journey" });

  if (currentHash === "#/visit") return route("visit", Visit, { titleKey: "title_visit" });

  const district = currentHash.match(/^#\/district\/([a-z0-9-]+)/);
  if (district) return route("district-detail", DistrictDetail, { slug: district[1] });

  if (currentHash === "#/districts") return route("districts", Districts, { titleKey: "title_districts" });
  if (currentHash === "#/stays") return route("stays", StaysPage, { titleKey: "title_stays" });
  if (currentHash === "#/journey") return route("journey", JourneyPlanner, { titleKey: "title_journey" });
  if (currentHash === "#/artists") return route("artists", ArtistsPage, { titleKey: "title_artists" });
  if (currentHash === "#/wildlife") return route("wildlife", WildlifePage, { titleKey: "title_wildlife" });
  if (currentHash === "#/facts") return route("facts", AssamFacts, { titleKey: "title_facts" });
  if (currentHash === "#/handicrafts") return route("handicrafts", AssamHandicrafts, { titleKey: "title_handicrafts" });
  if (currentHash === "#/guide") return route("guide", AssamTravelGuide, { titleKey: "title_guide" });
  if (currentHash === "#/heritage") return route("heritage", AssamHeritage, { titleKey: "title_heritage" });
  if (currentHash === "#/symbols") return route("symbols", StateSymbols, { titleKey: "title_symbols" });

  const river = currentHash.match(/^#\/rivers?\/([a-z0-9-]+)/);
  if (river) return route("river-detail", RiverDetail, { riverSlug: river[1] });
  if (currentHash === "#/rivers" || currentHash === "#/rivers/") return route("rivers", RiversPage, { titleKey: "title_rivers" });

  // Preserve the old fallback: an unknown hash opens the Culture home.
  return route("culture-home", CultureHub, { titleKey: "title_home" });
}
