import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../lib/storage";
import { generateItinerary } from "../lib/itinerary";
import { getDestination } from "@/data/travel/destinations";

/**
 * TripContext — "My Trip": the selected destinations, the travel-details form
 * state, and the generated itinerary. All persisted to localStorage so the trip
 * survives refreshes and page navigation.
 *
 * The shape is deliberately backend-ready: selection is a list of destination
 * IDs, details is a plain object, and the generated itinerary is a plain object.
 * Swapping localStorage for an API later only changes this file.
 */
const TripCtx = createContext(null);

const EMPTY_DETAILS = {
  arrivalDate: "",
  departureDate: "",
  startLocation: "Guwahati",
  arrivalTime: "",
  departureTime: "",
  adults: 2,
  children: 0,
  travelStyle: "balanced",
  accessibility: "",
  budget: "",
  budgetCategory: "mod",
  transport: "undecided",
  accommodation: "undecided",
  interests: [],
  notes: "",
};

export function TripProvider({ children }) {
  const [selectedIds, setSelectedIds] = useLocalStorage("axom:trip:selected", []);
  const [details, setDetails] = useLocalStorage("axom:trip:details", EMPTY_DETAILS);
  const [itinerary, setItinerary] = useLocalStorage("axom:trip:itinerary", null);

  const isSelected = useCallback(
    (id) => selectedIds.includes(id),
    [selectedIds]
  );

  const addDestination = useCallback(
    (id) => {
      if (!getDestination(id)) return;
      setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setSelectedIds]
  );

  const removeDestination = useCallback(
    (id) => setSelectedIds((prev) => prev.filter((x) => x !== id)),
    [setSelectedIds]
  );

  const toggleDestination = useCallback(
    (id) =>
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    [setSelectedIds]
  );

  const clearTrip = useCallback(() => {
    setSelectedIds([]);
    setItinerary(null);
  }, [setSelectedIds, setItinerary]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setItinerary(null);
  }, [setSelectedIds, setItinerary]);

  const resolveSelected = useCallback(
    () => selectedIds.map((id) => getDestination(id)).filter(Boolean),
    [selectedIds]
  );

  const buildItinerary = useCallback(() => {
    const plan = generateItinerary(selectedIds, details);
    setItinerary(plan);
    return plan;
  }, [selectedIds, details, setItinerary]);

  const updateDetails = useCallback(
    (patch) => setDetails((prev) => ({ ...prev, ...patch })),
    [setDetails]
  );

  const resetDetails = useCallback(
    () => setDetails(EMPTY_DETAILS),
    [setDetails]
  );

  const value = useMemo(
    () => ({
      selectedIds,
      selected: resolveSelected(),
      count: selectedIds.length,
      isSelected,
      addDestination,
      removeDestination,
      toggleDestination,
      clearTrip,
      clearSelection,
      details,
      updateDetails,
      resetDetails,
      itinerary,
      buildItinerary,
      removeFromItinerary: (id) => {
        // A convenience: removing a place also drops the stale itinerary so the
        // traveller regenerates after editing their selection.
        removeDestination(id);
      },
    }),
    [
      selectedIds,
      resolveSelected,
      isSelected,
      addDestination,
      removeDestination,
      toggleDestination,
      clearTrip,
      clearSelection,
      details,
      updateDetails,
      resetDetails,
      itinerary,
      buildItinerary,
      removeDestination,
    ]
  );

  return <TripCtx.Provider value={value}>{children}</TripCtx.Provider>;
}

export const useTrip = () => {
  const ctx = useContext(TripCtx);
  if (!ctx) throw new Error("useTrip must be used within <TripProvider>");
  return ctx;
};
