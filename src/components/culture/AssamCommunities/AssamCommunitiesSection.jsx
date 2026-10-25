import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useApp } from "@/store/AppContext";
import ASSAM_COMMUNITIES from "@/data/culture/assam/communities";

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
    <div className="community-drawer__group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function CommunityDrawer({ community, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="community-drawer__backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        className="community-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-drawer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="community-drawer__close" type="button" onClick={onClose} aria-label="Close details">
          <X size={20} aria-hidden="true" />
        </button>

        <div className="community-drawer__image-wrap">
          <CommunityImage key={community.id} community={community} className="community-drawer__image" />
        </div>

        <div className="community-drawer__body">
          <span className="page__culture-kind">{community.region}</span>
          <h2 id="community-drawer-title">{community.name}</h2>
          <p className="community-drawer__craft">{community.craft}</p>
          <p className="community-drawer__story">{community.story}</p>

          <div className="community-drawer__columns">
            <DetailList title="Foods and flavours" items={community.foods} />
            <DetailList title="Traditions" items={community.traditions} />
          </div>

          <DetailList title="Where to experience it" items={community.places} />

          <a
            className="btn btn--ghost community-drawer__source"
            href={community.imageSearchUrl}
            target="_blank"
            rel="noreferrer"
          >
            More images on Google <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </aside>
    </div>
  );
}

export default function AssamCommunitiesSection({ compact = false }) {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <section className={`communities${compact ? " communities--compact" : ""}`} id="assam-communities">
      <div className="communities__head">
        <span className="label">Assam · living culture</span>
        <h2 className="communities__title">Communities of Assam</h2>
        <p className="communities__intro">
          Assam is not one single tradition. Its textiles, foods, festivals and everyday objects are shaped by many communities, each with its own voice.
        </p>
      </div>

      <div className="communities__grid">
        {ASSAM_COMMUNITIES.map((community) => (
          <article className="community-card" key={community.id} data-reveal>
            <div className="community-card__image-wrap">
              <CommunityImage community={community} className="community-card__image" />
            </div>
            <div className="community-card__body">
              <span className="page__culture-kind">{community.region}</span>
              <h3>{community.name}</h3>
              <p>{community.summary}</p>
              <p className="community-card__craft">{community.craft}</p>
              <button className="btn btn--ghost community-card__button" type="button" onClick={() => setSelectedCommunity(community)}>
                Explore community <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedCommunity ? (
        <CommunityDrawer community={selectedCommunity} onClose={() => setSelectedCommunity(null)} />
      ) : null}
    </section>
  );
}
