function validDate(value) {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime());
}

function addDays(value, days) {
  if (!validDate(value)) return "";
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Build the stops in the exact order chosen by the traveller.
 * Each stop's next arrival is calculated from its stay length, so the plan
 * never quietly sends someone to the next district before their current stay
 * is over.
 */
export function buildJourneyStops(order, startDate, stayDays = {}) {
  let arrivalDate = validDate(startDate) ? startDate : "";

  return order.map((slug, index) => {
    const days = Math.max(1, Number(stayDays[slug]) || 1);
    const nights = Math.max(0, days - 1);
    const stop = {
      slug,
      position: index + 1,
      arrivalDate,
      days,
      nights,
    };

    if (arrivalDate) arrivalDate = addDays(arrivalDate, days);
    return stop;
  });
}

export function estimateJourneyStayTotal(stops, selectedStays = {}) {
  return stops.reduce((total, stop) => {
    const stay = selectedStays[stop.slug];
    return total + (stay?.registeredPrice || 0) * stop.nights;
  }, 0);
}

export const __test = { addDays, validDate };
