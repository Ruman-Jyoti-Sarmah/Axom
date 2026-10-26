import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useApp } from "@/store/AppContext";
import CULTURE_IMG from "@/data/culture/cultureImages";
import ASSAM_HANDICRAFTS from "@/data/culture/assam/handicrafts";

function DetailList({ title, items }) {
  return (
    <div className="handicraft-card__detail-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function CraftImage({ item, className = "" }) {
  return (
    <img
      className={className}
      src={item.image}
      alt={item.name}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function HandicraftsAndSilkPage() {
  const { t } = useApp();
  const [expandedId, setExpandedId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedId((currentId) => currentId === id ? null : id);
  };

  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={CULTURE_IMG.sualkuchiHandloom} alt="" />
        <div className="page__veil" />
        <div className="page__hero-content">
          <span className="label">{t("page_handicrafts")}</span>
          <h1 className="page__title">{t("page_handicrafts_title")}</h1>
          <p className="page__tagline">{t("page_handicrafts_intro")}</p>
        </div>
      </div>

      <div className="page__body page__body--wide">
        <section className="handicrafts" aria-labelledby="handicrafts-title">
          <div className="handicrafts__head">
            <span className="label">Assam · made by hand</span>
            <h2 id="handicrafts-title">The craft of the Brahmaputra</h2>
            <p>
              From golden muga silk and the welcoming gamosa to bamboo, bell metal and Majuli masks, Assam's crafts are part of daily life. Open each card to see how it is made, how it is used and where to experience it.
            </p>
          </div>

          <div className="handicrafts__list">
            {ASSAM_HANDICRAFTS.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <article className={`handicraft-card${isExpanded ? " is-expanded" : ""}`} key={item.id}>
                  <div className="handicraft-card__image-wrap">
                    <CraftImage item={item} className="handicraft-card__image" />
                  </div>

                  <div className="handicraft-card__body">
                    <span className="page__culture-kind">{item.region}</span>
                    <h3>{item.name}</h3>
                    <p className="handicraft-card__summary">{item.summary}</p>
                    <p className="handicraft-card__materials">{item.materials.join(" · ")}</p>

                    <button
                      className="btn btn--ghost handicraft-card__button"
                      type="button"
                      onClick={() => toggleDetails(item.id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Less" : "More"}
                      <ChevronDown size={15} aria-hidden="true" />
                    </button>

                    {isExpanded ? (
                      <div className="handicraft-card__details">
                        <div className="handicraft-card__detail-hero">
                          <div className="handicraft-card__detail-image-wrap">
                            <CraftImage item={item} className="handicraft-card__detail-image" />
                          </div>
                          <div>
                            <span className="page__culture-kind">The story behind the craft</span>
                            <p className="handicraft-card__story">{item.story}</p>
                          </div>
                        </div>

                        <div className="handicraft-card__detail-columns">
                          <DetailList title="How it is made" items={item.process} />
                          <DetailList title="What it is used for" items={item.uses} />
                          <DetailList title="Living traditions" items={item.traditions} />
                        </div>

                        <DetailList title="Where to experience it" items={item.places} />

                        <a
                          className="handicraft-card__source"
                          href={item.imageSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          More images on Google <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
