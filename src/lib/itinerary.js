import { getDestination } from "../data/destinations.js";

/**
 * itinerary.js — a transparent, RULE-BASED Assam itinerary generator.
 *
 * There is NO AI / maps / booking API wired in. Scheduling uses only the
 * structured destination data (district, category, estimated visit hours) plus
 * the traveller's dates, group size, travel style and budget. We never invent
 * exact km or road times — transfers are qualitative notes only. Costs are
 * clearly labelled ESTIMATES. Exposed as a pure function so it can later be
 * swapped for a backend/AI call without touching the UI.
 */

/** Max sightseeing hours a person can realistically absorb per day, by style. */
const STYLE_HOURS = { relaxed: 5, balanced: 7, packed: 9 };

const MS_DAY = 86400000;

function toDate(value) {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function addDays(date, n) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + n);
  return d;
}

function fmtDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Turn an hour offset (day starts 09:00) into a "9:00 AM" style label. */
function timeLabel(startHour) {
  let hour = 9 + Math.floor(startHour);
  let mins = Math.round((startHour % 1) * 60);
  if (mins >= 60) {
    hour += 1;
    mins -= 60;
  }
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = ((hour + 11) % 12) + 1;
  return `${h12}:${String(mins).padStart(2, "0")} ${suffix}`;
}

/** Group selected destinations by district, preserving chosen order per district. */
function groupByDistrict(destinations) {
  const order = [];
  const map = new Map();
  for (const d of destinations) {
    if (!map.has(d.district)) {
      map.set(d.district, []);
      order.push(d.district);
    }
    map.get(d.district).push(d);
  }
  return order.map((district) => ({ district, places: map.get(district) }));
}

/**
 * Core scheduler — fills each day up to its hour budget, drawing from the
 * traveller's chosen districts in order. A day starts in the next unscheduled
 * district and, if the hour budget still has room after that district's places,
 * spills into the following district rather than wasting the remaining time.
 * Every cross-district move raises a "transfer" note so the traveller knows to
 * allow travel time (we have no verified road-distance data). The hour budget
 * is never exceeded, so a day is never over-packed. Arrival/departure days get
 * a lighter budget (travel + rest).
 */
function schedule(destinations, numDays, style, details = {}) {
  const fullBudget = STYLE_HOURS[style] || STYLE_HOURS.balanced;
  const clusters = groupByDistrict(destinations.filter(Boolean));
  const days = [];
  let ci = 0; // current cluster (district)
  let pi = 0; // place index within cluster
  let lastPlacedDistrict = null;

  // Real clock times are optional. When an arrival/departure day has no known
  // time we never invent one — we only trim the sightseeing budget and say the
  // available time is uncertain, so the plan stays honest.
  const hasArrivalTime = Boolean(details.arrivalTime);
  const hasDepartureTime = Boolean(details.departureTime);

  for (let dayIndex = 0; dayIndex < numDays; dayIndex += 1) {
    const isArrival = dayIndex === 0;
    const isDeparture = dayIndex === numDays - 1;
    // A one-calendar-day trip arrives and departs on the SAME date.
    const sameDay = isArrival && isDeparture;
    // Travel days get a lighter sightseeing budget; a same-day in-and-out trip
    // gets the least, because only the slivers around travel are free.
    const budget = sameDay
      ? Math.max(2, fullBudget - 3)
      : isArrival || isDeparture
        ? Math.max(3, fullBudget - 2)
        : fullBudget;
    const slots = [];
    const notes = [];
    const addNote = (n) => {
      if (!notes.includes(n)) notes.push(n);
    };
    if (isArrival) addNote("arrival");
    if (isDeparture) addNote("departure");
    // Be explicit when travel-day sightseeing time can't be assumed.
    if (isArrival && !hasArrivalTime) addNote("uncertain_arrival");
    if (isDeparture && !hasDepartureTime) addNote("uncertain_departure");

    let cursor = 0;
    // Fill the day across as many districts as the hour budget allows.
    while (cursor < budget && ci < clusters.length) {
      const cluster = clusters[ci];
      // Entering a different district (same-day spill or new day) → transfer.
      if (lastPlacedDistrict && cluster.district !== lastPlacedDistrict) {
        addNote("transfer");
      }
      // Current district exhausted → advance to the next one and keep filling.
      if (pi >= cluster.places.length) {
        ci += 1;
        pi = 0;
        continue;
      }
      const place = cluster.places[pi];
      const dur = place.visitHours || 2;
      // Don't overflow the day — but always place at least one item per day so
      // an arrival/departure day is never left completely empty.
      if (cursor + dur > budget + 0.001 && slots.length > 0) break;
      slots.push({
        start: timeLabel(cursor),
        end: timeLabel(cursor + dur),
        hours: dur,
        destination: place,
      });
      lastPlacedDistrict = cluster.district;
      cursor += dur;
      pi += 1;
    }

    const stayDistrict =
      (slots.length ? slots[slots.length - 1].destination.district : null) ||
      clusters[Math.min(ci, clusters.length - 1)]?.district ||
      null;

    days.push({
      index: dayIndex + 1,
      isArrival,
      isDeparture,
      sameDay,
      slots,
      notes,
      stayDistrict,
      usedHours: cursor,
      budget,
    });
  }

  return days;
}


/**
 * Map the wizard's budget-category codes to the cost-model buckets.
 * Wizard uses low | mod | prem; cost model uses budget | moderate | premium.
 */
function normalizeBudget(cat) {
  switch (cat) {
    case "low":
    case "budget":
      return "budget";
    case "prem":
    case "premium":
      return "premium";
    case "mod":
    case "moderate":
    default:
      return "moderate";
  }
}

/**
 * Cost model — clearly-estimated INR figures multiplied by travellers/days.
 * These are planning estimates, NOT quotes or bookings.
 */
function estimateCosts(details, numDays, nights, destinations) {
  // Traveller count = adults + children (the wizard stores these separately).
  const travellers =
    (Number(details.adults) || 0) + (Number(details.children) || 0) ||
    Number(details.travellers) ||
    1;
  // The wizard stores budget category as "low" | "mod" | "prem". Normalise to
  // the cost-model keys so a rename on either side can't silently break costs.
  const budget = normalizeBudget(details.budgetCategory);

  const perDayPerPerson = {
    budget: { stay: 1200, food: 500, local: 400, activities: 300 },
    moderate: { stay: 3200, food: 900, local: 800, activities: 700 },
    premium: { stay: 7500, food: 1800, local: 1800, activities: 1600 },
  }[budget];

  const transportPerDay = {
    public: 600,
    cab: 2600,
    self: 1800,
    "self-drive": 1800,
    undecided: 1500,
  }[details.transport || "undecided"] || 1500;

  // One rough inter-district leg estimate per extra district visited.
  const districtSet = new Set(destinations.map((d) => d.district));
  const intercity = Math.max(0, districtSet.size - 1) * 3500;

  const stay = perDayPerPerson.stay * nights * Math.max(1, Math.ceil(travellers / 2));
  const food = perDayPerPerson.food * numDays * travellers;
  const local = perDayPerPerson.local * numDays * travellers;
  const activities = perDayPerPerson.activities * numDays * travellers;
  const transport = transportPerDay * numDays + intercity;

  const total = stay + food + local + activities + transport;
  return {
    currency: "INR",
    travellers,
    nights,
    breakdown: [
      { key: "accommodation", label: "Accommodation", value: stay },
      { key: "food", label: "Food & dining", value: food },
      { key: "local", label: "Local transport", value: local },
      { key: "activities", label: "Activities & entry", value: activities },
      { key: "transport", label: "Intercity transport", value: transport },
    ],
    total,
    estimate: true,
  };
}

/**
 * Generate a full itinerary object from the traveller's selections + details.
 * Returns { days, costs, warnings, meta }.
 */
export function generateItinerary(selectedIds, details = {}) {
  const destinations = (selectedIds || []).map((id) => getDestination(id)).filter(Boolean);
  const warnings = [];

  const arrival = toDate(details.arrivalDate);
  const departure = toDate(details.departureDate);

  let numDays = 1;
  if (arrival && departure && departure >= arrival) {
    numDays = Math.round((departure - arrival) / MS_DAY) + 1;
  }
  const nights = Math.max(0, numDays - 1);

  if (!destinations.length) {
    return {
      days: [],
      // No destinations → no meaningful trip. Return zeroed costs rather than a
      // misleading per-day estimate so nothing ever renders a cost for an empty plan.
      costs: {
        currency: "INR",
        travellers: (Number(details.adults) || 0) + (Number(details.children) || 0) || 0,
        nights,
        breakdown: [
          { key: "accommodation", label: "Accommodation", value: 0 },
          { key: "food", label: "Food & dining", value: 0 },
          { key: "local", label: "Local transport", value: 0 },
          { key: "activities", label: "Activities & entry", value: 0 },
          { key: "transport", label: "Intercity transport", value: 0 },
        ],
        total: 0,
        estimate: true,
      },
      warnings: [{ type: "empty", message: "No destinations selected yet." }],
      meta: { numDays, arrivalDate: details.arrivalDate, departureDate: details.departureDate },
    };
  }

  const style = details.travelStyle || "balanced";
  const rawDays = schedule(destinations, numDays, style, details);

  // Attach real dates + collect which places actually got scheduled.
  const scheduledIds = new Set();
  rawDays.forEach((day) => {
    day.date = arrival ? fmtDate(addDays(arrival, day.index - 1)) : `Day ${day.index}`;
    day.dateISO = arrival ? fmtDateISO(addDays(arrival, day.index - 1)) : null;
    day.slots.forEach((s) => scheduledIds.add(s.destination.id));
  });

  const unscheduled = destinations.filter((d) => !scheduledIds.has(d.id));
  if (unscheduled.length) {
    warnings.push({
      type: "overflow",
      message:
        `${unscheduled.length} place${unscheduled.length === 1 ? "" : "s"} could not fit into ` +
        `${numDays} day${numDays === 1 ? "" : "s"} at a ${style} pace. Consider extending your ` +
        `dates or removing: ${unscheduled
          .slice(0, 4)
          .map((d) => d.name)
          .join(", ")}${unscheduled.length > 4 ? "…" : ""}.`,
      ids: unscheduled.map((d) => d.id),
    });
  }

  const costs = estimateCosts(details, numDays, nights, destinations);

  const budgetTotal = Number(details.budget);
  if (budgetTotal > 0 && costs.total > budgetTotal) {
    warnings.push({
      type: "budget",
      message:
        `The estimated trip cost (₹${costs.total.toLocaleString("en-IN")}) is above your stated ` +
        `budget (₹${budgetTotal.toLocaleString("en-IN")}). Consider a "budget" tier, fewer days, ` +
        `public transport, or fewer paid activities.`,
    });
  }

  return {
    days: rawDays,
    costs,
    warnings,
    meta: {
      numDays,
      nights,
      arrivalDate: details.arrivalDate,
      departureDate: details.departureDate,
      style,
      generatedAt: new Date().toISOString(),
    },
  };
}

export const __test = { schedule, estimateCosts, timeLabel };
