import { DISTRICTS, slugify } from "./districts.js";
import { DISTRICT_DETAILS } from "./districtDetails.js";

/**
 * DESTINATIONS — a data-driven layer over the project's verified district data.
 *
 * Every destination is generated from a real attraction that already exists in
 * `districtDetails.js` (name + factual `about`), so nothing here is invented.
 * We only ENRICH each attraction with:
 *   - a stable id, district, division
 *   - a category (wildlife / nature / culture / spiritual / river / adventure / heritage)
 *   - an estimated visit duration (clearly an ESTIMATE — see UI copy)
 *   - a best season + practical travel notes
 *   - a photograph (Wikimedia Commons, same source as the rest of the app)
 *
 * The `FEATURED` list is a curated subset with hand-picked, accurate photos for
 * the "Popular Destinations" gallery. All other attractions fall back to their
 * district hero image so every place is still addable to a trip.
 *
 * Notes / best-season are plain strings; the app's `pick()` translates chrome via
 * the asData dictionary and otherwise falls back to the English source, so we
 * never fabricate translations.
 */

const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Canonical travel categories used by filters + the itinerary engine. */
export const CATEGORIES = [
  { id: "all", label: { en: "All", as: "সকলো" } },
  { id: "wildlife", label: { en: "Wildlife", as: "বন্যপ্ৰাণী" } },
  { id: "nature", label: { en: "Nature", as: "প্ৰকৃতি" } },
  { id: "heritage", label: { en: "Heritage", as: "ঐতিহ্য" } },
  { id: "spiritual", label: { en: "Spiritual", as: "আধ্যাত্মিক" } },
  { id: "culture", label: { en: "Culture", as: "সংস্কৃতি" } },
  { id: "river", label: { en: "River", as: "নদী" } },
  { id: "adventure", label: { en: "Adventure", as: "দুঃসাহস" } },
];

/** Stable id for a destination derived from a district attraction. */
export const destId = (districtSlug, name) =>
  `${districtSlug}--${slugify(name)}`;

/* ── Spiritual tradition taxonomy ───────────────────────────────────────── */
/*
 * A second, finer axis than `category`, used by the Travel home's
 * "Choose Spiritual Traditions" filter. It exists because `category:
 * "spiritual"` lumps every kind of sacred place together — a gurdwara, a
 * namghar and a dargah are all "spiritual", but they are not
 * interchangeable for a visitor looking for one particular tradition.
 *
 * Stable IDENTIFIERS are used, never free-text matching on names, districts
 * or descriptions: a place is tagged through SPIRITUAL_TRADITION_TAGS below,
 * which is keyed by destination id and asserted against the project's own
 * verified attraction copy. Nothing here is inferred from a photograph or a
 * district, and nothing is defaulted to "hindu".
 *
 * A place may carry SEVERAL tags when it genuinely belongs to several
 * traditions — Hajo's hilltop shrine is Hindu, Buddhist and Muslim at once,
 * and is recorded as all three.
 *
 * A place whose affiliation could not be verified is deliberately left
 * untagged (empty array). An untagged destination never appears under a
 * tradition filter, but still shows under "All traditions".
 * availableSpiritualTraditions() hides any tradition with no match, so the
 * UI can never present an empty or misleading category.
 */
export const SPIRITUAL_TRADITIONS = [
  {
    id: "hindu",
    label: { en: "Hindu temples & pilgrimage", as: "হিন্দু মন্দিৰ আৰু তীৰ্থস্থান" },
    short: { en: "Hindu", as: "হিন্দু" },
  },
  {
    id: "islam",
    label: { en: "Islamic heritage — mosques & dargahs", as: "ইছলামিক ঐতিহ্য — মছজিদ আৰু দৰ্গাহ" },
    short: { en: "Islamic", as: "ইছলামিক" },
  },
  {
    id: "sikh",
    label: { en: "Sikh heritage — gurdwaras", as: "শিখ ঐতিহ্য — গুৰুদুৱাৰা" },
    short: { en: "Sikh", as: "শিখ" },
  },
  {
    id: "christian",
    label: { en: "Christian heritage — churches", as: "খ্ৰীষ্টান ঐতিহ্য — গীৰ্জা" },
    short: { en: "Christian", as: "খ্ৰীষ্টান" },
  },
  {
    id: "buddhist",
    label: { en: "Buddhist sites & monasteries", as: "বৌদ্ধ স্থান আৰু বিহাৰ" },
    short: { en: "Buddhist", as: "বৌদ্ধ" },
  },
  {
    id: "jain",
    label: { en: "Jain religious sites", as: "জৈন ধৰ্মীয় স্থান" },
    short: { en: "Jain", as: "জৈন" },
  },
  {
    id: "vaishnavite",
    label: { en: "Vaishnavite satras & namghars", as: "বৈষ্ণৱ সাত্ৰ আৰু নামঘৰ" },
    short: { en: "Satras & Namghars", as: "সাত্ৰ আৰু নামঘৰ" },
  },
  {
    id: "indigenous",
    label: { en: "Indigenous & community sacred sites", as: "আদিবাসী আৰু সামাজিক পবিত্ৰ স্থান" },
    short: { en: "Community", as: "সামাজিক" },
  },
];

/** Valid tradition ids — the whitelist used to sanitise any selection. */
const TRADITION_IDS = new Set(SPIRITUAL_TRADITIONS.map((t) => t.id));

/**
 * Tradition tags keyed by stable destination id.
 *
 * Every assignment below is supported by the destination's own verified
 * `about` copy in districtDetails.js (and, where one exists, its curated
 * note) — no affiliation is guessed. Multi-faith places carry every
 * tradition they genuinely serve.
 */
const SPIRITUAL_TRADITION_TAGS = {
  /* ── Hindu ───────────────────────────────────────────────────────────── */
  [destId("kamrup-metropolitan", "Kamakhya Temple")]: ["hindu"],
  [destId("dhubri", "Dhubri Devi Temple")]: ["hindu"],
  [destId("nalbari", "Daul Mandir")]: ["hindu"],
  [destId("south-salmara-mankachar", "Mankachar Kamakhya Shrine")]: ["hindu"],
  [destId("biswanath", "Biswanath Ghat & Shiva Temple")]: ["hindu"],
  [destId("sonitpur", "Mahabhairav Temple")]: ["hindu"],
  [destId("bajali", "Tukraibleswar Than")]: ["hindu"],
  [destId("sivasagar", "Joysagar")]: ["hindu"],

  /* ── Assam's Vaishnavite tradition (satras & namghars) ───────────────── */
  [destId("barpeta", "Barpeta Satra")]: ["vaishnavite"],
  [destId("barpeta", "Bata Kamala Kshetra")]: ["vaishnavite"],
  [destId("barpeta", "Barpeta Town")]: ["vaishnavite"],
  [destId("bajali", "Baradiha Satra")]: ["vaishnavite"],
  [destId("nalbari", "Ghosha Satras & Naamghars")]: ["vaishnavite"],
  [destId("lakhimpur", "Basudeva Than")]: ["vaishnavite"],
  [destId("majuli", "Auniati Satra")]: ["vaishnavite"],
  [destId("majuli", "Kamalabari Satra")]: ["vaishnavite"],
  [destId("nagaon", "Batadrava Than")]: ["vaishnavite"],

  /* ── Islamic ─────────────────────────────────────────────────────────── */
  [destId("kamrup", "Powa Makkah, Hajo")]: ["islam"],

  /* ── Sikh ────────────────────────────────────────────────────────────── */
  [destId("dhubri", "Sri Sri Gurdwara")]: ["sikh"],

  /* ── Shared by several traditions ────────────────────────────────────── */
  /* Hajo's hilltop shrine is revered by Hindus, Buddhists and Muslims
     alike — the destination's own copy says so, so all three are recorded. */
  [destId("kamrup", "Hayagriva Madhava Temple, Hajo")]: ["hindu", "buddhist", "islam"],
};

const WILDLIFE_BEST = "Nov – Apr (park open)";
const DEFAULT_BEST = "Oct – Mar";

/** Map an attraction `kind` string onto one of the canonical categories. */
function classify(kind = "") {
  const k = kind.toLowerCase();
  if (/national park|sanctuary|wildlife|rhino|gibbon|reserve/.test(k)) return "wildlife";
  if (/waterfall|lake|landscape|hill|beel|valley|tea country|scenic|foothill|garden/.test(k))
    return "nature";
  if (/river|island|jetty|ferry|ghat|confluence|riverfront|port|boat|beach/.test(k)) return "river";
  if (/temple|shakti|pilgrimage|satra|vaishnav|shrine|ashram|sikh|gurdwara|naamghar|than|mandir|devalaya/.test(k))
    return "spiritual";
  if (/palace|royal|heritage|amphitheatre|archaeolog|fort|memorial|museum|ruins|engineering|unesco|refinery|industrial|battlefield|tank|necropolis|cave/.test(k))
    return "heritage";
  if (/safari|journey|trail|adventure|hill railway|falls/.test(k)) return "adventure";
  if (/festival|living culture|culture|mask|silk|town|craft|estate|research|music/.test(k)) return "culture";
  return "culture";
}

/** Default estimated visit duration (hours) by category — ESTIMATES only. */
function defaultHours(category) {
  switch (category) {
    case "wildlife":
      return 5;
    case "adventure":
      return 4;
    case "nature":
    case "river":
      return 3;
    case "spiritual":
    case "heritage":
    case "culture":
      return 2;
    default:
      return 2;
  }
}

/**
 * Curated overrides for notable destinations — accurate photos (Wikimedia files
 * already used elsewhere in this project), refined durations and travel notes.
 * Keyed by destination id (`districtSlug--slug`). Notes/best are plain English
 * strings (translated via asData or shown as-is).
 */
const CURATED = {
  [destId("golaghat", "Kaziranga — Kohora Gate")]: {
    image: W("Kaziranga National Park, Assam, India 01.jpg"),
    alt: "One-horned rhinoceros in Kaziranga National Park",
    category: "wildlife",
    hours: 8,
    best: WILDLIFE_BEST,
    notes:
      "Jeep & elephant safaris are booked at the Kohora range office; carry photo ID. The park may close in peak monsoon.",
  },
  [destId("baksa", "Manas National Park")]: {
    image: W("Manas National Park.jpg"),
    alt: "Grasslands and forest of Manas National Park",
    category: "wildlife",
    hours: 7,
    best: WILDLIFE_BEST,
    notes: "UNESCO site on the Bhutan border; river rafting on the Manas runs in the winter season only.",
  },
  [destId("kamrup-metropolitan", "Kamakhya Temple")]: {
    image: W("Kamakhya Temple, Guwahati, Assam.jpg"),
    alt: "Kamakhya Temple atop Nilachal Hill, Guwahati",
    category: "spiritual",
    hours: 3,
    best: DEFAULT_BEST,
    notes: "Ancient shakti pitha; the Ambubachi mela each June draws lakhs of pilgrims — expect crowds.",
  },
  [destId("kamrup-metropolitan", "Umananda Island")]: {
    image: W("Umananda Island, Guwahati (4).jpg"),
    alt: "Umananda river island with its Shiva temple, Guwahati",
    category: "river",
    hours: 3,
    best: DEFAULT_BEST,
    notes: "Reached by country boat from Guwahati's Kachari ghat; the world's smallest inhabited river island.",
  },
  [destId("majuli", "Samaguri Satra")]: {
    image: W("A huge mask at Samaguri satra Majuli.jpg"),
    alt: "Bamboo-and-clay Bhaona masks at Samaguri Satra, Majuli",
    category: "culture",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Watch mask-makers at work; reach Majuli by ferry from Nimati ghat (Jorhat), about 1.5 hrs across the Brahmaputra.",
  },
  [destId("kamrup", "Sualkuchi")]: {
    image: W("Manchester of Assam- Sualkuchi.jpg"),
    alt: "Muga silk looms in Sualkuchi weaving village",
    category: "culture",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Silk village on a Brahmaputra island; buy muga & pat silk directly from weavers.",
  },
  [destId("morigaon", "Pobitora Wildlife Sanctuary")]: {
    image: W("Indian Rhino in Pobitora.jpg"),
    alt: "One-horned rhino at Pobitora Wildlife Sanctuary",
    category: "wildlife",
    hours: 4,
    best: WILDLIFE_BEST,
    notes: "Highest rhino density in Assam; about an hour from Guwahati — an easy day trip.",
  },
  [destId("sivasagar", "Rang Ghar")]: {
    image: W("Ranghar - Assam.jpg"),
    alt: "Rang Ghar, the Ahom royal amphitheatre at Sivasagar",
    category: "heritage",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Asia's oldest surviving amphitheatre; part of Sivasagar's open-air Ahom museum.",
  },
  [destId("sivasagar", "Shiva Dol")]: {
    image: W("Shiva Dol.jpg"),
    alt: "Shiva Dol, the tallest Shiva temple of Assam, Sivasagar",
    category: "heritage",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Tallest Shiva temple in the state, on the bank of the Sivasagar tank.",
  },
  [destId("charaideo", "Charaideo Maidams")]: {
    image: W("Charaideo Maidam.jpg"),
    alt: "Ahom royal maidam burial mounds at Charaideo",
    category: "heritage",
    hours: 3,
    best: DEFAULT_BEST,
    notes: "UNESCO World Heritage (2024); the pyramid-like tombs of the Ahom kings.",
  },
  [destId("kamrup", "Hayagriva Madhava Temple, Hajo")]: {
    image: W("Hayagriva Madhava Temple, Hajo.jpg"),
    alt: "Hayagriva Madhava Temple on the hill at Hajo",
    category: "spiritual",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Hilltop shrine revered by Hindus, Buddhists and Muslims alike; near the Powa Makkah.",
  },
  [destId("goalpara", "Surya Pahar")]: {
    image: W("Sri Surya Mandir at Sri Surya Pahar, Goalpara.jpg"),
    alt: "Rock-cut sun shrine at Surya Pahar, Goalpara",
    category: "heritage",
    hours: 3,
    best: DEFAULT_BEST,
    notes: "A hill strewn with rock-cut Buddhist, Jain and Hindu relics — Assam's hidden archaeological page.",
  },
  [destId("sonitpur", "Nameri National Park")]: {
    image: W("NAMERI NATIONAL PARK.jpg"),
    alt: "Jia Bhoroli river through Nameri National Park",
    category: "wildlife",
    hours: 6,
    best: WILDLIFE_BEST,
    notes: "Hornbill & golden mahseer country on the Assam–Arunachal border; river rafting in season.",
  },
  [destId("dima-hasao", "Haflong Lake")]: {
    image: W("Haflong Lake.jpg"),
    alt: "Haflong Lake in the hills of Dima Hasao",
    category: "nature",
    hours: 3,
    best: DEFAULT_BEST,
    notes: "Assam's only hill-station lake; reached via the scenic Lumding–Haflong hill railway.",
  },
  [destId("tinsukia", "Digboi Refinery & Centenary Museum")]: {
    image: W("Digboi Centenary Museum 04.JPG"),
    alt: "Digboi Centenary Museum at Asia's oldest oil refinery",
    category: "heritage",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Asia's oldest operating refinery (est. 1901), with a museum of drills and photographs.",
  },
  [destId("dibrugarh", "Bogibeel Bridge")]: {
    image: W("Bogibeel Bridge, Dibrugarh.jpg"),
    alt: "Bogibeel rail-road bridge over the Brahmaputra, Dibrugarh",
    category: "heritage",
    hours: 1,
    best: DEFAULT_BEST,
    notes: "India's longest rail-cum-road bridge; a dramatic river crossing at dawn or dusk.",
  },
  [destId("jorhat", "Tocklai Tea Research Institute")]: {
    image: W("Plucking tea in a tea garden of Assam.jpg"),
    alt: "Tea pluckers in an Assam tea garden near Jorhat",
    category: "nature",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Century-old heart of tea science; pair with a stay in the Jorhat tea-garden bungalows.",
  },
  [destId("biswanath", "Biswanath Ghat & Shiva Temple")]: {
    image: W("Biswanath Temple, Biswanath ghat.JPG"),
    alt: "Biswanath Shiva temple on the river ghat, Biswanath",
    category: "spiritual",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "The riverside 'second Kashi' of Assam — an ASI-protected Shiva temple on the Brahmaputra ghat.",
  },
  [destId("barpeta", "Barpeta Satra")]: {
    image: W("Barpeta Satra, Barpeta.jpg"),
    alt: "Barpeta Satra, the great neo-Vaishnavite estate",
    category: "spiritual",
    hours: 2,
    best: DEFAULT_BEST,
    notes: "Founded by Srimanta Sankardev; the grandest satra of Assam and home of the Borgeet.",
  },
};

/** Curated popular-destination order (ids) for the homepage gallery. */
export const FEATURED_IDS = [
  destId("golaghat", "Kaziranga — Kohora Gate"),
  destId("kamrup-metropolitan", "Kamakhya Temple"),
  destId("majuli", "Samaguri Satra"),
  destId("baksa", "Manas National Park"),
  destId("kamrup-metropolitan", "Umananda Island"),
  destId("sivasagar", "Rang Ghar"),
  destId("morigaon", "Pobitora Wildlife Sanctuary"),
  destId("charaideo", "Charaideo Maidams"),
  destId("kamrup", "Sualkuchi"),
  destId("kamrup", "Hayagriva Madhava Temple, Hajo"),
  destId("goalpara", "Surya Pahar"),
  destId("sonitpur", "Nameri National Park"),
  destId("sivasagar", "Shiva Dol"),
  destId("barpeta", "Barpeta Satra"),
  destId("dima-hasao", "Haflong Lake"),
  destId("tinsukia", "Digboi Refinery & Centenary Museum"),
  destId("dibrugarh", "Bogibeel Bridge"),
  destId("biswanath", "Biswanath Ghat & Shiva Temple"),
  destId("jorhat", "Tocklai Tea Research Institute"),
];


/** Build the full destination list from verified district attraction data. */
function buildDestinations() {
  const out = [];
  for (const district of DISTRICTS) {
    const slug = slugify(district.name);
    const detail = DISTRICT_DETAILS[slug];
    const attractions = detail?.attractions || [];
    for (const a of attractions) {
      const id = destId(slug, a.name);
      const curated = CURATED[id];
      const category = curated?.category || classify(a.kind);
      // Tradition tags come only from the verified id-keyed table above.
      // Every destination gets the field (so consumers never see `undefined`),
      // but it is an empty array unless the place's affiliation is verified.
      const spiritualTraditions = SPIRITUAL_TRADITION_TAGS[id] || [];
      out.push({
        id,
        name: a.name,
        district: slug,
        districtName: district.name,
        division: district.division,
        category,
        spiritualTraditions,
        summary: a.about,
        image: curated?.image || district.image,
        alt: curated?.alt || district.alt,
        visitHours: curated?.hours || defaultHours(category),
        estimate: true,
        best: curated?.best || DEFAULT_BEST,
        notes: curated?.notes || null,
        featured: Boolean(curated),
      });
    }
  }
  return out;
}

export const DESTINATIONS = buildDestinations();

const BY_ID = new Map(DESTINATIONS.map((d) => [d.id, d]));

/** Look up a single destination by id (used by the trip + itinerary engine). */
export function getDestination(id) {
  return BY_ID.get(id) || null;
}

/** All destinations belonging to a district slug. */
export function destinationsByDistrict(districtSlug) {
  return DESTINATIONS.filter((d) => d.district === districtSlug);
}

/** Featured destinations in curated order (for the homepage gallery). */
export const FEATURED = FEATURED_IDS.map((id) => BY_ID.get(id)).filter(Boolean);

/** Human label for a category id. */
export function categoryLabel(id, lang = "en") {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) return id;
  return c.label[lang] || c.label.en;
}

/**
 * Normalise a tradition selection into a clean array of known ids.
 * Accepts a single id, an array, or null/undefined. Unknown ids and duplicates
 * are dropped, so a stale or malformed selection can never silently match
 * everything (or nothing).
 */
export function normalizeTraditions(selection) {
  if (!selection) return [];
  const list = Array.isArray(selection) ? selection : [selection];
  const out = [];
  for (const id of list) {
    if (TRADITION_IDS.has(id) && !out.includes(id)) out.push(id);
  }
  return out;
}

/** Long label for a tradition id (used for the option text). */
export function spiritualTraditionLabel(id, lang = "en") {
  const t = SPIRITUAL_TRADITIONS.find((x) => x.id === id);
  if (!t) return id;
  return t.label[lang] || t.label.en;
}

/** Compact label for a tradition id (used for the selected-state chips). */
export function spiritualTraditionShort(id, lang = "en") {
  const t = SPIRITUAL_TRADITIONS.find((x) => x.id === id);
  if (!t) return id;
  return t.short[lang] || t.short.en;
}

/** Does a destination match the given tradition selection? (OR across ids.) */
function matchesTraditions(destination, traditions) {
  const wanted = normalizeTraditions(traditions);
  if (wanted.length === 0) return true; // no selection = no constraint
  const tags = destination.spiritualTraditions || [];
  return wanted.some((id) => tags.includes(id));
}

/**
 * Traditions that actually have a matching destination, in taxonomy order,
 * optionally scoped to the current district + query.
 *
 * This is what keeps the filter honest: a tradition only appears as an option
 * if choosing it would return at least one real destination. Traditions with
 * no verified place in Assam (Christian, Jain, Indigenous in the current
 * catalogue) are never shown as an empty category.
 */
export function availableSpiritualTraditions({ district = "all", query = "" } = {}) {
  const q = query.trim().toLowerCase();
  const scoped = DESTINATIONS.filter((d) => {
    if (d.category !== "spiritual") return false;
    if (district !== "all" && d.district !== district) return false;
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.districtName.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q)
    );
  });
  return SPIRITUAL_TRADITIONS.filter((t) =>
    scoped.some((d) => (d.spiritualTraditions || []).includes(t.id)),
  );
}

/**
 * Search + filter over destinations (name, district, summary, category) with
 * an optional spiritual-tradition filter on top.
 *
 * The tradition filter is deliberately applied ONLY to destinations that
 * carry tags. It never re-categorises a place, and it never applies outside
 * the spiritual category — passing `category: "wildlife"` with a tradition
 * selected returns nothing, because a tradition filter is meaningless for a
 * national park.
 *
 * `traditions` is OR'd (any selected tradition matches) and composes with the
 * existing search + district filters. Results keep their data order and every
 * destination id is unique, so no duplicate cards can appear.
 */
export function searchDestinations({
  query = "",
  district = "all",
  category = "all",
  traditions = [],
} = {}) {
  const q = query.trim().toLowerCase();
  const wanted = normalizeTraditions(traditions);
  const traditionFilterActive = wanted.length > 0;

  return DESTINATIONS.filter((d) => {
    if (district !== "all" && d.district !== district) return false;
    if (category !== "all" && d.category !== category) return false;
    if (traditionFilterActive && !matchesTraditions(d, wanted)) return false;
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.districtName.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q) ||
      d.category.includes(q)
    );
  });
}

/** Districts that actually have destinations (for filter dropdowns). */
export function districtsWithDestinations() {
  const seen = new Map();
  for (const d of DESTINATIONS) {
    if (!seen.has(d.district)) seen.set(d.district, d.districtName);
  }
  return Array.from(seen, ([slug, name]) => ({ slug, name })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

