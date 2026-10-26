import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ASSAM_COMMUNITIES from "@/data/culture/assam/communities";
import { useApp } from "@/store/AppContext";

function CommunityImage({ community, className = "" }) {
  const [src, setSrc] = useState(community.imageUrl);

  return (
    <img
      className={className}
      src={src}
      alt={community.name}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        if (event.currentTarget.src !== community.fallbackImage) {
          setSrc(community.fallbackImage);
        }
      }}
    />
  );
}

function DetailList({ title, items }) {
  return (
    <div className="community-card__detail-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function AssamCommunitiesSection({ compact = false }) {
  const { t } = useApp();
  const isCarousel = compact;
  const [expandedCommunityId, setExpandedCommunityId] = useState(null);
  const trackRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateSliderButtons = useCallback(() => {
    if (!isCarousel) return;

    const track = trackRef.current;
    if (!track) return;

    setCanGoBack(track.scrollLeft > 4);
    setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
  }, [isCarousel]);

  useEffect(() => {
    if (!isCarousel) return undefined;

    const track = trackRef.current;
    if (!track) return undefined;

    updateSliderButtons();
    track.addEventListener("scroll", updateSliderButtons, { passive: true });
    window.addEventListener("resize", updateSliderButtons);

    return () => {
      track.removeEventListener("scroll", updateSliderButtons);
      window.removeEventListener("resize", updateSliderButtons);
    };
  }, [isCarousel, updateSliderButtons]);

  const moveSlider = (direction) => {
    if (!isCarousel) return;

    const track = trackRef.current;
    const firstCard = track?.querySelector(".community-card");
    if (!track || !firstCard) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const cardsToMove = window.matchMedia("(max-width: 600px)").matches ? 1 : 3;

    track.scrollBy({
      left: direction * (cardWidth * cardsToMove + gap * (cardsToMove - 1)),
      behavior: "smooth",
    });
  };

  const toggleDetails = (communityId) => {
    setExpandedCommunityId((currentId) => currentId === communityId ? null : communityId);
  };

  return (
    <section className={`communities${compact ? " communities--compact" : ""}`} id="assam-communities">
      <div className="communities__head">
        <span className="label">{t("culture_communities_kicker")}</span>
        <h2 className="communities__title">{t("culture_communities_title")}</h2>
        <p className="communities__intro">{t("culture_communities_sub")}</p>
      </div>

      {isCarousel ? (
        <div className="communities__controls" aria-label="Community carousel controls">
          <button
            type="button"
            className="communities__control"
            onClick={() => moveSlider(-1)}
            disabled={!canGoBack}
            aria-label="Previous communities"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="communities__control"
            onClick={() => moveSlider(1)}
            disabled={!canGoForward}
            aria-label="Next communities"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <div
        ref={trackRef}
        className={`communities__grid ${isCarousel ? "communities__grid--carousel" : "communities__grid--stacked"}`}
        role="region"
        aria-label={isCarousel ? "Communities of Assam carousel" : "Communities of Assam list"}
        tabIndex={isCarousel ? 0 : undefined}
      >
        {ASSAM_COMMUNITIES.map((community) => (
          <article
            className={`community-card ${expandedCommunityId === community.id ? "is-expanded" : ""}`}
            key={community.id}
          >
            <div className="community-card__image-wrap">
              <CommunityImage community={community} className="community-card__image" />
            </div>
            <div className="community-card__body">
              <span className="page__culture-kind">{community.region}</span>
              <h3>{community.name}</h3>
              <p>{community.summary}</p>
              <p className="community-card__craft">{community.craft}</p>
              {compact ? (
                <a className="btn btn--ghost community-card__button" href="#/communities">
                  Explore community <ArrowRight size={15} aria-hidden="true" />
                </a>
              ) : (
                <button
                  className="btn btn--ghost community-card__button"
                  type="button"
                  onClick={() => toggleDetails(community.id)}
                  aria-expanded={expandedCommunityId === community.id}
                >
                  {expandedCommunityId === community.id ? "Less" : "More"}
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
              )}

              {!compact && expandedCommunityId === community.id ? (
                <div className="community-card__details">
                  <div className="community-card__detail-hero">
                    <div className="community-card__detail-image-wrap">
                      <CommunityImage community={community} className="community-card__detail-image" />
                    </div>
                    <div>
                      <span className="page__culture-kind">Inside the community</span>
                      <p className="community-card__story">{community.story}</p>
                    </div>
                  </div>
                  <div className="community-card__detail-columns">
                    <DetailList title="Foods and flavours" items={community.foods} />
                    <DetailList title="Languages and speech" items={community.languages} />
                    <DetailList title="Traditions" items={community.traditions} />
                  </div>
                  <DetailList title="Where to experience it" items={community.places} />
                  <a
                    className="community-card__source"
                    href={community.imageSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    More images on Google <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
