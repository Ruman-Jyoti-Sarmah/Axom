import { lazy } from "react";

import Homepage from "@/pages/Culture/Homepage";

const SpiritualDestinations = lazy(() => import("@/pages/Culture/SpiritualDestinations"));
const FoodAndCuisine = lazy(() => import("@/pages/Culture/FoodAndCuisine"));
const Adventure = lazy(() => import("@/pages/Culture/Adventure"));
const YogaAndWellness = lazy(() => import("@/pages/Culture/YogaAndWellness"));
const CultureAndFestivals = lazy(() => import("@/pages/Culture/CultureAndFestivals"));
const ImageCredits = lazy(() => import("@/pages/Culture/ImageCredits"));
const HeritageAndKings = lazy(() => import("@/pages/Culture/HeritageAndKings"));
const AssamCommunities = lazy(() => import("@/pages/Culture/AssamCommunities"));
const AssamArtists = lazy(() => import("@/pages/Culture/AssamArtists"));
const AssamFacts = lazy(() => import("@/pages/Culture/AssamFacts"));
const StateSymbols = lazy(() => import("@/pages/Culture/StateSymbols"));

const TravelHomepage = lazy(() => import("@/pages/Travel/Homepage"));
const DistrictDetails = lazy(() => import("@/pages/Travel/DistrictDetails"));
const Districts = lazy(() => import("@/pages/Travel/Districts"));
const Stays = lazy(() => import("@/pages/Travel/Stays"));
const Visit = lazy(() => import("@/pages/Travel/Visit"));
const Admin = lazy(() => import("@/components/common/Admin"));
const JourneyPlanner = lazy(() => import("@/pages/Travel/JourneyPlanner"));
const Wildlife = lazy(() => import("@/pages/Travel/Wildlife"));
const TravelGuide = lazy(() => import("@/pages/Travel/TravelGuide"));
const MyTrip = lazy(() => import("@/pages/Travel/MyTrip"));
const TravelDetails = lazy(() => import("@/pages/Travel/TravelDetails"));
const Itinerary = lazy(() => import("@/pages/Travel/Itinerary"));
const Rivers = lazy(() => import("@/pages/Travel/Rivers"));
const RiverDetails = lazy(() => import("@/pages/Travel/RiverDetails"));

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
  if (HOME_HASHES.has(currentHash)) return route("culture-home", Homepage, { titleKey: "title_culture_hub" });

  const cultureExperience = currentHash.match(/^#\/culture\/experiences\/([a-z-]+)/);
  if (cultureExperience) {
    const pages = {
      spiritual: SpiritualDestinations,
      cuisine: FoodAndCuisine,
      adventure: Adventure,
      yoga: YogaAndWellness,
    };
    const Page = pages[cultureExperience[1]] || SpiritualDestinations;
    return route("culture-experience", Page, { titleKey: "title_culture_experience" });
  }

  if (currentHash === "#/culture/festivals") return route("culture-festivals", CultureAndFestivals, { titleKey: "title_culture" });
  if (currentHash === "#/credits") return route("credits", ImageCredits, { titleKey: "title_culture" });

  if (currentHash === "#/trip/itinerary") return route("trip-itinerary", Itinerary, { titleKey: "itin_title" });
  if (currentHash === "#/trip/plan") return route("trip-plan", TravelDetails, { titleKey: "plan_title" });
  if (currentHash === "#/trip") return route("trip-cart", MyTrip, { titleKey: "trip_title" });
  if (currentHash === "#/travel" || currentHash === "#/travel/") return route("travel-home", TravelHomepage, { titleKey: "title_journey" });

  if (currentHash === "#/visit") return route("visit", Visit, { titleKey: "title_visit" });

  const district = currentHash.match(/^#\/district\/([a-z0-9-]+)/);
  if (district) return route("district-detail", DistrictDetails, { slug: district[1] });

  if (currentHash === "#/districts") return route("districts", Districts, { titleKey: "title_districts" });
  if (currentHash === "#/stays") return route("stays", Stays, { titleKey: "title_stays" });
  if (currentHash === "#/journey") return route("journey", JourneyPlanner, { titleKey: "title_journey" });
  if (currentHash === "#/artists") return route("artists", AssamArtists, { titleKey: "title_artists" });
  if (currentHash === "#/wildlife") return route("wildlife", Wildlife, { titleKey: "title_wildlife" });
  if (currentHash === "#/facts") return route("facts", AssamFacts, { titleKey: "title_facts" });
  if (currentHash === "#/communities" || currentHash === "#/handicrafts") {
    return route("communities", AssamCommunities, { titleKey: "title_communities" });
  }
  if (currentHash === "#/guide") return route("guide", TravelGuide, { titleKey: "title_guide" });
  if (currentHash === "#/heritage") return route("heritage", HeritageAndKings, { titleKey: "title_heritage" });
  if (currentHash === "#/symbols") return route("symbols", StateSymbols, { titleKey: "title_symbols" });

  const river = currentHash.match(/^#\/rivers?\/([a-z0-9-]+)/);
  if (river) return route("river-detail", RiverDetails, { riverSlug: river[1] });
  if (currentHash === "#/rivers" || currentHash === "#/rivers/") return route("rivers", Rivers, { titleKey: "title_rivers" });

  // Preserve the old fallback: an unknown hash opens the Culture home.
  return route("culture-home", Homepage, { titleKey: "title_home" });
}
