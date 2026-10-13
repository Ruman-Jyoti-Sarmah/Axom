import { ArrowLeft } from "lucide-react";
import { useApp } from "../store/AppContext";
import {
  EXPERIENCES, SPIRITUAL, CUISINE, ADVENTURE, WELLNESS,
} from "../data/cultureSections";

/**
 * CultureExperience — a detail page for the culture-only experiences that
 * don't already have a full page: spiritual, cuisine, adventure, yoga.
 * Each is an editorial hero + an intro + a card list, matching the tone of
 * the rest of the portal. Unknown ids fall back to the Spiritual page.
 */
export default function CultureExperience({ kind = "spiritual" }) {
  const { t, pick } = useApp();

  const meta = EXPERIENCES.find((e) => e.id === kind) || EXPERIENCES[1];

  const views = {
    spiritual: {
      title: t("culture_spiritual_title"),
      lead: pick({
        en: "Assam is a land where faiths meet — Shakti on Nilachal Hill, Vaishnava in the river-island sattras, Sufi shrines at Hajo and Buddhist relics at Surya Pahar.",
        as: "অসম এনে দেশ য'ত সমস্থ ধৰ্ম মিলে — নীলাচলত শক্তি, নদীয় দ্বীপৰ সাত্ৰত বৈষ্ণৱ, হাজোত চুফি মজাৰ আৰু সূৰ্য পাহাৰত বৌদ্ধ ৰেলিক।",
      }),
      items: SPIRITUAL,
      fields: { sub: "place", about: "about" },
    },
    cuisine: {
      title: t("culture_cuisine_title"),
      lead: pick(CUISINE.intro),
      items: CUISINE.dishes,
      fields: { sub: "kind", about: "about" },
    },
    adventure: {
      title: t("culture_adventure_title"),
      lead: pick({
        en: "From white water on the Brahmaputra to the misty Barail ranges and the dawn jeep trails of Kaziranga — Assam is an open-air adventure.",
        as: "ব্ৰহ্মপুত্ৰৰ সাদা পানীৰ পৰা বাৰাইলৰ ধূসৰ পৰ্বতমালা আৰু কাজিৰংগাৰ ৰাতিপুৱাৰ জীপ পথলৈকে — অসম এজীৱন দুঃসাহসৰ ময়দান।",
      }),
      items: ADVENTURE,
      fields: { sub: "place", about: "about" },
    },
    yoga: {
      title: t("culture_wellness_title"),
      lead: pick({
        en: "Wellness in Assam is quiet and rooted — a dawn Borgeet in the naamghar, yoga on a Mising stilt-house, herbal retreats in the tea gardens.",
        as: "অসমৰ সুস্থতা শান্ত আৰু মূলত — নামঘৰত ৰাতিপুৱাৰ বৰগীত, মিচিং বढ়েল-ঘৰত যোগ, চাহবাগাৰ ঔষধী আশ্ৰয়।",
      }),
      items: WELLNESS,
      fields: { sub: "place", about: "about" },
    },
  };

  const view = views[kind] || views.spiritual;

  return (
    <section className="cexp" id="top">
      <div className="cexp__hero">
        <img src={meta.image} alt={pick(meta.name)} />
        <div className="cexp__veil" aria-hidden="true" />
        <div className="cexp__hero-content">
          <a className="label cexp__back" href="#/culture">{t("culture_back_hub")}</a>
          <span className="cexp__icon" aria-hidden="true">{meta.icon}</span>
          <h1 className="cexp__title">{view.title}</h1>
          <p className="cexp__tagline">{pick(meta.kind)}</p>
        </div>
      </div>

      <div className="cexp__body">
        <p className="cexp__lead">{view.lead}</p>
        <div className="cexp__grid">
          {view.items.map((it) => (
            <article className="cexp__card" key={pick(it.name)} data-reveal>
              <div className="cexp__card-media">
                <img src={it.image} alt={pick(it.name)} loading="lazy" decoding="async" />
              </div>
              <div className="cexp__card-body">
                <span className="label">{pick(it[view.fields.sub])}</span>
                <h3 className="cexp__card-name">{pick(it.name)}</h3>
                <p className="cexp__card-about">{pick(it.about)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="cexp__foot">
          <a className="btn btn--ghost" href="#/culture">
            <ArrowLeft size={15} aria-hidden="true" /> {t("culture_back_hub")}
          </a>
          <a className="btn btn--solid" href="#/travel">{t("switch_to_travel")}</a>
        </div>
      </div>
    </section>
  );
}
