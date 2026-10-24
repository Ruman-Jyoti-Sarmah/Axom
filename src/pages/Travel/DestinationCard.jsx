import { Check, Plus, MapPin, Clock } from "lucide-react";
import { useTrip } from "@/store/TripContext";
import { categoryLabel } from "@/data/travel/destinations";

/**
 * DestinationCard — the reusable card used across the Travel homepage, trip
 * cart and district pages. Shows image, name, district, category, a factual
 * one-liner and an "Add to My Trip" / "Added" toggle with a visible selected
 * state. Purely presentational + the trip toggle; all data comes pre-resolved.
 */
export default function DestinationCard({
  destination,
  onOpen,
  compact = false,
}) {
  const { isSelected, toggleDestination } = useTrip();
  const selected = isSelected(destination.id);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDestination(destination.id);
  };

  return (
    <article
      className={`dcard ${selected ? "dcard--selected" : ""} ${compact ? "dcard--compact" : ""}`}
      data-reveal
      data-category={destination.category}
    >
      <button
        type="button"
        className="dcard__media"
        onClick={onOpen}
        aria-label={`Explore details for ${destination.name}`}
      >
        <img
          src={destination.image}
          alt={destination.alt || destination.name}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="dcard__cat">{categoryLabel(destination.category)}</span>
        {selected && (
          <span className="dcard__selected-flag" aria-hidden="true">
            <Check size={13} /> In your trip
          </span>
        )}
      </button>

      <div className="dcard__body">
        <span className="label dcard__district">
          <MapPin size={12} aria-hidden="true" /> {destination.districtName}
        </span>
        <h3 className="dcard__name">
          {onOpen ? (
            <button type="button" className="dcard__namebtn" onClick={onOpen}>
              {destination.name}
            </button>
          ) : (
            destination.name
          )}
        </h3>
        {!compact && <p className="dcard__summary">{destination.summary}</p>}
        <div className="dcard__meta">
          <span className="dcard__dur">
            <Clock size={12} aria-hidden="true" /> ~{destination.visitHours}h (est.)
          </span>
        </div>
        <div className="dcard__actions">
          <button
            type="button"
            className={`dcard__add ${selected ? "is-on" : ""}`}
            onClick={toggle}
            aria-pressed={selected}
          >
            {selected ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
            {selected ? "Added to My Trip" : "Add to My Trip"}
          </button>
          {onOpen && (
            <button type="button" className="dcard__details" onClick={onOpen}>
              Explore Details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
