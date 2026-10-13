/**
 * CULTURE section — information architecture modelled on Incredible India
 * (incredibleindia.gov.in). Their taxonomy is three pillars:
 *   Destinations · Experiences · Culture
 * We map every pillar onto authentic Assam content (no fabricated copy).
 * The rich detail pages that already exist (Districts, Heritage, Artists,
 * Wildlife, Handicrafts, State Symbols, Facts) become the linked destinations,
 * so this hub is a curated front-door over real pages — nothing is lost.
 *
 * Images: Wikimedia Commons (Special:FilePath), same pattern as the rest of
 * the app. All copy is bilingual { en, as }.
 */
const W = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/* ── The three mega-menu pillars ─────────────────────────────────────── */
export const PILLARS = {
  destinations: {
    id: "destinations",
    label: { en: "Destinations", as: "গন্তব্যস্থান" },
    blurb: {
      en: "From sacred hills to river islands — the places that hold Assam's story.",
      as: "পৱিত্ৰ পাহাৰৰ পৰা নদীয় দ্বীপলৈ — অসমৰ কাহিনী ধৰণি ৰখা ঠাইসমূহ।",
    },
  },
  experiences: {
    id: "experiences",
    label: { en: "Experiences", as: "অভিজ্ঞতা" },
    blurb: {
      en: "Heritage, spirituality, art, cuisine and the wild — ways to truly meet Assam.",
      as: "ঐতিহ্য, আধ্যাত্মিকতা, শিল্প, ৰন্ধনশৈলী আৰু বন্যপ্ৰকৃতি — অসমক প্ৰকৃততে জানিবলৈ পথ।",
    },
  },
  culture: {
    id: "culture",
    label: { en: "Culture", as: "সংস্কৃতি" },
    blurb: {
      en: "The people, festivals and living traditions of the Red River.",
      as: "ৰঙা নদীৰ মানুহ, উৎসৱ আৰু জীয়ন্ত পৰম্পৰা।",
    },
  },
  travel: {
    id: "travel",
    label: { en: "Travel", as: "ভ্ৰমণ" },
    blurb: {
      en: "Plan your journey — where to go, where to stay and how to reach.",
      as: "আপোনাৰ যাত্ৰা পৰিকল্পনা কৰক — ক'ত যাব, ক'ত থাকিব আৰু কেনেকৈ পাব।",
    },
  },
};

/* ── Experience categories (the "Experiences" grid) ──────────────────── */
export const EXPERIENCES = [
  {
    id: "heritage",
    icon: "🏛️",
    name: { en: "Heritage", as: "ঐতিহ্য" },
    kind: { en: "Six centuries of Ahoms", as: "ছয় শতিকাৰ আহোম" },
    blurb: {
      en: "Rang Ghar, Talatal Ghar and the Ahom capital of Sivasagar.",
      as: "ৰংঘৰ, তলাতাল ঘৰ আৰু শিৱসাগৰৰ আহোম ৰাজধানী।",
    },
    image: W("Rang Ghar 1.jpg", 1000),
    href: "#/heritage",
  },
  {
    id: "spiritual",
    icon: "🕉️",
    name: { en: "Spiritual", as: "আধ্যাত্মিক" },
    kind: { en: "Shakti, Vaishnava & Sufi", as: "শক্তি, বৈষ্ণৱ আৰু চুফি" },
    blurb: {
      en: "Kamakhya, Umananda, Hajo and the sattras of Majuli.",
      as: "কামাখ্যা, উমানন্দা, হাজো আৰু মাজুলীৰ সাত্ৰ।",
    },
    image: W("Kamakhya Temple, Guwahati, Assam.jpg", 1000),
    href: "#/culture/experiences/spiritual",
  },
  {
    id: "art",
    icon: "🎭",
    name: { en: "Art & Artists", as: "শিল্প আৰু শিল্পী" },
    kind: { en: "Sattriya · Borgeet · Cinema", as: "সাত্ৰীয় · বৰগীত · ছবি" },
    blurb: {
      en: "The voices and makers who carried Assam to the world.",
      as: "অসমক বিশ্বলৈ গৈছিল স্বৰ আৰু সৃষ্টিকৰ্তা।",
    },
    image: W("Krishnakahi Kashyap performing Sattriya Dance.jpg", 1000),
    href: "#/artists",
  },
  {
    id: "cuisine",
    icon: "🍽️",
    name: { en: "Food & Cuisine", as: "খাদ্য আৰু ৰন্ধনশৈলী" },
    kind: { en: "Khar · Tenga · Pitha", as: "খাৰ · টেঙা · পিঠা" },
    blurb: {
      en: "Sour, smoky and herbaceous — the Assamese table on bell-metal.",
      as: "টক, ধোঁৱাৰ আৰু তেজপাতাৰ — কাহৰত অসমীয়া টেবুল।",
    },
    image: W("Assamese Thali (Jorhat).JPG", 1000),
    href: "#/culture/experiences/cuisine",
  },
  {
    id: "wildlife",
    icon: "🦏",
    name: { en: "Nature & Wildlife", as: "প্ৰকৃতি আৰু বন্যপ্ৰাণী" },
    kind: { en: "Kaziranga · Manas", as: "কাজিৰংগা · মানস" },
    blurb: {
      en: "Home of the one-horned rhino and the golden langur.",
      as: "একালো গঁড়ৰাগী আৰু সোণালি হানুহৰ নিজৰা স্থান।",
    },
    image: W("Kaziranga National Park, Assam, India.jpg", 1000),
    href: "#/wildlife",
  },
  {
    id: "crafts",
    icon: "🧵",
    name: { en: "Handicrafts & Shopping", as: "হস্তশিল্প আৰু বজাৰ" },
    kind: { en: "Muga · Jaapi · Bell metal", as: "মুগা · জাপী · কাহাৰ" },
    blurb: {
      en: "Golden muga silk, jaapi hats and terracotta of the looms.",
      as: "সোণীয় মুগা ৰেশম, জাপী টুপী আৰু মাটিৰ শিল্প।",
    },
    image: W("Manchester of Assam- Sualkuchi.jpg", 1000),
    href: "#/handicrafts",
  },
  {
    id: "festivals",
    icon: "🎊",
    name: { en: "Festivals & Events", as: "উৎসৱ আৰু অনুষ্ঠান" },
    kind: { en: "Bihu · Ambubachi · Raas", as: "বিহু · আম্বুবাচী · ৰাচ" },
    blurb: {
      en: "The three Bihus and the rites of the Brahmaputra year.",
      as: "তিনিটা বিহু আৰু ব্ৰহ্মপুত্ৰ বৰ্ষৰ আচাৰ।",
    },
    image: W("Bihu Dance , Festival of India.jpg", 1000),
    href: "#/culture/festivals",
  },
  {
    id: "adventure",
    icon: "🏞️",
    name: { en: "Adventure", as: "দুঃসাহস" },
    kind: { en: "River · Hills · Forest", as: "নদী · পাহাৰ · বন" },
    blurb: {
      en: "Raft the Brahmaputra, trek the Barail, cycle the tea hills.",
      as: "ব্ৰহ্মপুত্ৰত ৰাফটিং, বাৰাইলত ভ্ৰমণ, চাহবাগাত চক্ৰ।",
    },
    image: W("Barail Range in Dima Hasao district.jpg", 1000),
    href: "#/culture/experiences/adventure",
  },
  {
    id: "yoga",
    icon: "🧘",
    name: { en: "Yoga & Wellness", as: "যোগ আৰু সুস্থতা" },
    kind: { en: "Sattra calm", as: "সাত্ৰৰ শান্তি" },
    blurb: {
      en: "Meditative stillness of the naamghars and river islands.",
      as: "নামঘৰ আৰু নদীয় দ্বীপৰ ধ্যানময় শান্তি।",
    },
    image: W("Doriya River of Majuli.jpg", 1000),
    href: "#/culture/experiences/yoga",
  },
];

/* ── Spiritual destinations ──────────────────────────────────────────── */
export const SPIRITUAL = [
  {
    name: { en: "Kamakhya Temple", as: "কামাখ্যা মন্দিৰ" },
    place: { en: "Guwahati · Nilachal Hill", as: "গুৱাহাটী · নীলাচল পাহাৰ" },
    kind: { en: "Shakti Pitha", as: "শক্তি পীঠ" },
    about: {
      en: "Among the oldest of the 51 Shakti pithas, Kamakhya atop Nilachal Hill is the heart of Tantric Shakti worship, drawing pilgrims through the Ambubachi Mela each June.",
      as: "৫১টাও শক্তি পীঠৰ মাজত আটাইতকৈ পুৰণি, নীলাচল পাহাৰৰ কামাখ্যা তান্ত্ৰিক শক্তি-পূজাৰ হৃদয় — প্ৰতি জুনই আম্বুবাচী মেলাত যজমানে আকৰ্ষিত হয়।",
    },
    image: W("Kamakhya Temple - DEV 8829.jpg", 900),
  },
  {
    name: { en: "Umananda Island", as: "উমানন্দা দ্বীপ" },
    place: { en: "Guwahati · Brahmaputra", as: "গুৱাহাটী · ব্ৰহ্মপুত্ৰ" },
    kind: { en: "Shiva shrine", as: "শিৱ মন্দিৰ" },
    about: {
      en: "The world's smallest inhabited river island, reached by ferry, holds a Shiva temple built by the Ahom king Gadadhar Singha in 1694, and is home to the rare golden langur.",
      as: "বোটে গৈ পোৱা জগতৰ আটাইতকৈ সৰু জনবসতি নদীয় দ্বীপত আহোম ৰাজা গদাধৰ সিংহে ১৬৯৪ চনত শিৱ মন্দিৰ বাসালে আৰু এই ঠাইত দুৰ্লভ সোণালি হানুহ পোৱা যায়।",
    },
    image: W("Umananda Island temple.JPG", 900),
  },
  {
    name: { en: "Hayagriva Madhava, Hajo", as: "হয়গ্ৰীৱ মাধৱ, হাজো" },
    place: { en: "Hajo · Kamrup", as: "হাজো · কামৰূপ" },
    kind: { en: "Where faiths meet", as: "ধৰ্ম মিলা স্থান" },
    about: {
      en: "On one hill at Hajo, a Vishnu temple, a Muslim shrine of Pir Giyasuddin Auliya and a Buddhist stupa stand together — a living symbol of Assam's shared sanctity.",
      as: "হাজোৰ একেটা পাহাৰত বিষ্ণু মন্দিৰ, মুছলমান সূফি পীৰ গিয়াসুদ্দীন আউলিয়াৰ মজাৰ আৰু বৌদ্ধ স্তুপা একেলগে থিয় হয় — অসমৰ যুক্ত বিশ্বাসৰ জীৱন্ত প্ৰতীক।",
    },
    image: W("Hayagriva Madhava Temple, Hajo.jpg", 900),
  },
  {
    name: { en: "The Sattras of Majuli", as: "মাজুলীৰ সাত্ৰ" },
    place: { en: "Majuli · Upper Assam", as: "মাজুলী · উপৰ অসম" },
    kind: { en: "Vaishnavite estates", as: "বৈষ্ণৱ পীঠ" },
    about: {
      en: "Majuli's monastic sattras — Auniati, Dakhinpat, Samaguri — are the living homes of Sattriya dance, mask-making and the Borgeet tradition founded by Srimanta Sankardev.",
      as: "মাজুলীৰ আউনিয়াটি, দক্ষিণপাট, সমাগুৰি সাত্ৰ সাত্ৰীয় নৃত্য, মুখৌটা শিল্প আৰু স্ৰীমন্ত শঙ্কৰদেৱে স্থাপিত বৰগীত পৰম্পৰাৰ জীৱন্ত ঘৰ।",
    },
    image: W("Doriya River of Majuli.jpg", 900),
  },
];

/* ── Cuisine (Food & Cuisine experience) ─────────────────────────────── */
export const CUISINE = {
  intro: {
    en: "Assamese cuisine is defined by two notes — khar (alkaline) and tenga (sour). Rice is the centre and the meal is finished with a slice of kaji nemu. Little oil, bold herbs and the smoke of bamboo shoot give it a character entirely its own.",
    as: "অসমীয়া ৰন্ধনশৈলী দুটা সূৰৰ দ্বাৰা চিনিব পৰা যায় — খাৰ আৰু টেঙা। ভাতেই কেন্দ্ৰ আৰু খাদ্য শেষ হয় কাজী নেমুৰ এটা টুকুৰাই। কম তেল, বদ্ধ জাদু টুকা আৰু বাঁহৰ কঁৰাৰ ধোঁৱাই ইয়াৰ স্বত্বশ্ৰেণীবোধ গঢ়ি তোলে।",
  },
  dishes: [
    {
      name: { en: "Khar", as: "খাৰ" },
      kind: { en: "Alkaline elixir", as: "ক্ষাৰীয় তিতাস" },
      about: {
        en: "Raw papaya and pulses cooked with filtered plantain-ash water — the signature first course of every Assamese meal.",
        as: "কাঁচা ওঁবাৰ আৰু ডাল চুটি কৰা কলপাতীৰ ছাঁৰ পানী মিহি কৰি — প্ৰতিটো অসমীয়া খাদ্যৰ প্ৰথম পথ।",
      },
      image: W("Assamese food thali.jpg", 700),
    },
    {
      name: { en: "Masor Tenga", as: "মাছৰ টেঙা" },
      kind: { en: "Sour fish", as: "টক মাছ" },
      about: {
        en: "Rohu or catfish in a light, tangy broth of ou tenga (elephant apple) or tomato.",
        as: "ঔ টেঙা (কাঠ এলেং) বা বিলাহীৰ হালকা টক ঝোলত ৰুহী মাছ।",
      },
      image: W("Masor Tenga Assam.jpg", 700),
    },
    {
      name: { en: "Kharoli", as: "খাৰলি" },
      kind: { en: "Mustard chutney", as: "সৰিয়হ চাটনী" },
      about: {
        en: "Toasted mustard flour whipped with khar water into a smoky, pungent dip for rice.",
        as: "ভাজা সৰিয়হৰ পিঠা খাৰৰ পানীৰ সৈতে মিহি কৰি তৈয়াৰি ধোঁৱাৰ টক চাটনী।",
      },
      image: W("Kharoli.jpg", 700),
    },
    {
      name: { en: "Duck with Bamboo Shoot", as: "বাঁহৰ কঁৰাৰ হাঁহ" },
      kind: { en: "Ahom classic", as: "আহোম পৰম্পৰা" },
      about: {
        en: "Slow-cooked duck with tender bamboo shoot and ash gourd — an Ahom kitchen heirloom.",
        as: "বাঁহৰ কঁৰা আৰু কুমুড়াৰ সৈতে লাহে লাহে ৰন্ধা হাঁহ — আহোম ৰান্ধিঘৰৰ ঐতিহ্য।",
      },
      image: W("Assamese Thali (Jorhat).JPG", 700),
    },
    {
      name: { en: "Pitha", as: "পিঠা" },
      kind: { en: "Rice cakes", as: "চৌলৰ পিঠা" },
      about: {
        en: "Til (sesame), narikol (coconut) and ghila pitha — the sweets of Magh Bihu and every welcome.",
        as: "তিল, নাৰিকল আৰু ঘিলা পিঠা — মাঘ বিহু আৰু প্ৰতিটো সদৰখুৰাৰ মিঠাই।",
      },
      image: W("Til Pitha.jpg", 700),
    },
    {
      name: { en: "Assam Tea", as: "অসম চাহ" },
      kind: { en: "World's tea heart", as: "বিশ্বৰ চাহ হৃদয়" },
      about: {
        en: "Strong, malty and golden — from the Brahmaputra's floodplains that grow over half of India's tea.",
        as: "বলীয়, মল্টী আৰু সোণীয় — ব্ৰহ্মপুত্ৰৰ লাহেটা ভূমিৰ পৰা, য'ত ভাৰতৰ আধিৰো অধিক চাহ জন্মে।",
      },
      image: W("Cup of Assam tea.jpg", 700),
    },
  ],
};

/* ── Adventure ───────────────────────────────────────────────────────── */
export const ADVENTURE = [
  {
    name: { en: "Brahmaputra Rafting", as: "ব্ৰহ্মপুত্ৰ ৰাফটিং" },
    place: { en: "Guwahati – Tezpur", as: "গুৱাহাটী – তেজপুৰ" },
    about: {
      en: "River-running and kayaking across Asia's great river, with picnic beaches on its sandbars (chars).",
      as: "এছিয়াৰ মহানদীত নদী-ভাগ আৰু কায়াকিং, বালিছল (চৰ)ত পিকনিক ছন্দীৰ সৈতে।",
    },
    image: W("Brahmaputra river rafting.jpg", 900),
  },
  {
    name: { en: "Barail & Karbi Treks", as: "বাৰাইল আৰু কৰ্বী পথ" },
    place: { en: "Dima Hasao · Karbi Anglong", as: "ডিমা হাসাও · কৰ্বী অংলং" },
    about: {
      en: "Misty hill trails of the Barail range and the Langhovku waterfalls above Diphu.",
      as: "বাৰাইল পৰ্বতমালাৰ ধূসৰ পাহাৰী পথ আৰু দিফুৰ ওপৰৰ লংভকু জলপ্ৰপাত।",
    },
    image: W("Langkovku waterfall in Manjha, Karbi Anglong.jpg", 900),
  },
  {
    name: { en: "Tea-Garden Cycling", as: "চাহবাগাত চক্ৰযাত্ৰা" },
    place: { en: "Jorhat · Dibrugarh", as: "জোৰহাট · ডিব্ৰুগড়" },
    about: {
      en: "Cycle the flat green rows of the world's largest tea-growing region at first-flush dawn.",
      as: "প্ৰথম-বৰষুণৰ ৰাতিপুৱা বিশ্বৰ আটাইতকৈ ডাঙৰ চাহ-উৎপাদন অঞ্চলৰ সবুজ শাৰীত চক্ৰচালন।",
    },
    image: W("Plucking tea in a tea garden of Assam.jpg", 900),
  },
  {
    name: { en: "Rhino Safari", as: "গঁড়ৰাগী সাফাৰী" },
    place: { en: "Kaziranga · Pobitora", as: "কাজিৰংগা · পবিতৰা" },
    about: {
      en: "Elephant-back and jeep safaris through elephant grass to meet the great one-horned rhino.",
      as: "হাতী আৰু জীপৰ সাফাৰীত হাতী-ঘাহৰ মাজেদি গৈ ডাঙৰ কালো গঁড়ৰাগীৰ সাক্ষাৎ।",
    },
    image: W("Kaziranga National Park, Assam, India.jpg", 900),
  },
];

/* ── Yoga & Wellness ─────────────────────────────────────────────────── */
export const WELLNESS = [
  {
    name: { en: "Sattra Meditation", as: "সাত্ৰৰ ধ্যান" },
    place: { en: "Majuli · Barpeta", as: "মাজুলী · বৰপেতা" },
    about: {
      en: "Sit in the naamghar at dawn as Borgeet rises — a centuries-old contemplative practice.",
      as: "ৰাতিপুৱা নামঘৰত বসলৈ বৰগীত ওলোৱা হৈছে — এশতিকাৰ পুৰণি ধ্যানমূলক আচাৰ।",
    },
    image: W("Doriya River of Majuli.jpg", 900),
  },
  {
    name: { en: "River-Island Calm", as: "নদীয় দ্বীপৰ শান্তি" },
    place: { en: "Majuli", as: "মাজুলী" },
    about: {
      en: "Yoga on the Mising stilt-houses of Asia's largest river island, cradled by the Brahmaputra.",
      as: "ব্ৰহ্মপুত্ৰে আঁতোৱা এছিয়াৰ আটাইতকৈ ডাঙৰ নদীয় দ্বীপৰ মিচিং বढ়েল-ঘৰত যোগ।",
    },
    image: W("Majuli, the river island of Assam.jpg", 900),
  },
  {
    name: { en: "Tea-Garden Wellness", as: "চাহবাগাৰ সুস্থতা" },
    place: { en: "Jorhat", as: "জোৰহাট" },
    about: {
      en: "Ayurvedic and herbal retreats among the gardens, with the first flush on your table.",
      as: "বাগানৰ মাজত আয়ুৰ্বেদিক আৰু ঔষধী আশ্ৰয়, টেবুলত প্ৰথম বৰষুণৰ চাহৰ সৈতে।",
    },
    image: W("Plucking tea in a tea garden of Assam.jpg", 900),
  },
];

/* ── Regions for the Destinations tabs (match districts.js divisions) ── */
export const REGIONS = [
  { id: "Lower Assam", en: "Lower Assam", as: "তলত অসম" },
  { id: "North Assam", en: "North Assam", as: "উত্তৰ অসম" },
  { id: "Upper Assam", en: "Upper Assam", as: "উপৰ অসম" },
  { id: "Central Assam", en: "Central Assam", as: "মধ্য অসম" },
  { id: "Barak Valley", en: "Barak Valley", as: "বৰাক উপত্যকা" },
];

/* ── Hero copy for the Culture hub ───────────────────────────────────── */
export const CULTURE_HERO = {
  kicker: { en: "Incredible · Assam", as: "অপূৰ্ব · অসম" },
  headline: [
    { en: "The Living Soul of", as: "ৰঙা নদীৰ" },
    { en: "the Red River.", as: "জীয়ন্ত আত্মা।" },
  ],
  sub: {
    en: "Six centuries of Ahoms, the sattras of Majuli, muga silk and the one-horned rhino — the culture of Assam, told through its people, places and festivals.",
    as: "ছয় শতিকাৰ আহোম, মাজুলীৰ সাত্ৰ, মুগা ৰেশম আৰু একালো গঁড়ৰাগী — অসমৰ সংস্কৃতি, ইয়াৰ মানুহ, ঠাই আৰু উৎসৱৰ মাজেদি।",
  },
  stats: [
    { value: "35", label: { en: "Districts", as: "জিলা" } },
    { value: "600", label: { en: "Years of Ahoms", as: "বৰ্ষৰ আহোম" } },
    { value: "3", label: { en: "Bihus a year", as: "বিহু প্ৰতি বৰ্ষ" } },
    { value: "11", label: { en: "State symbols", as: "ৰাজ্যিক প্ৰতীক" } },
  ],
};

/**
 * HERO_SLIDES — the rotating full-bleed video hero (Incredible-India style).
 * Each slide is one self-hosted clip in /public/video with its own category
 * chip, headline and sub. Autoplays muted + crossfades; a category bar at the
 * bottom lets visitors jump between them, with prev/next + a mute toggle.
 * All copy is authentic bilingual { en, as }.
 */
export const HERO_SLIDES = [
  {
    id: "wildlife",
    category: { en: "Wildlife", as: "বন্যপ্ৰাণী" },
    video: "/video/hero-1.mp4",
    hdVideo: "/video/hero-hd-wildlife.mp4",
    poster: "/homehero.png",
    credit: {
      author: "L. Shyamal",
      source:
        "https://commons.wikimedia.org/wiki/File:Kaziranga_morning_20231221_075150.webm",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    kicker: { en: "Kaziranga · Manas", as: "কাজিৰঙা · মানস" },
    headline: [
      { en: "Where the one-horned", as: "য'ত একালো" },
      { en: "rhino still roams.", as: "গঁড়ৰাগী বাটুৱালিয়ে।" },
    ],
    sub: {
      en: "Tall elephant grass, the mighty Brahmaputra and the great Indian rhino — the wild heart of Assam, protected since 1905.",
      as: "ডাঙৰ হাতী-ঘাহ, মাহাৰথী ব্ৰহ্মপুত্ৰ আৰু মহান ভাৰতীয় গঁড়ৰাগী — ১৯০৫ সালৰ পৰা সুৰক্ষিত অসমৰ বন্যপ্ৰকৃতিৰ হৃদয়।",
    },
    cta: {
      label: { en: "Explore wildlife", as: "বন্যপ্ৰকৃতি চাওক" },
      href: "#/wildlife",
    },
  },
  {
    id: "nature",
    category: { en: "Nature", as: "প্ৰকৃতি" },
    video: "/video/hero-2.mp4",
    hdVideo: "/video/hero-hd-nature.mp4",
    poster: "/homehero.png",
    credit: {
      author: "Joy Sagar Murmu",
      source:
        "https://commons.wikimedia.org/wiki/File:Tea_garden_Assam_India.webm",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    kicker: { en: "Brahmaputra · Blue Hills", as: "ব্ৰহ্মপুত্ৰ · নীলা পাহাৰ" },
    headline: [
      { en: "A river that is", as: "এডাল নদী" },
      { em: true, en: "a way of life.", as: "যাৰ জীৱন ধৰণ।" },
    ],
    sub: {
      en: "From the misty tea gardens of Jorhat to the river islands of Majuli — Assam's living landscape shaped by water and monsoon.",
      as: "যোৰহাটৰ ডোখৰৰ চাহ বাগানৰ পৰা মাজুলীৰ নদীয় দ্বীপলৈ — পানী আৰু বৰষূণে গঢ় লোৱা অসমৰ জীয়ন্ত ভূ-দৃশ্য।",
    },
    cta: {
      label: { en: "See destinations", as: "গন্তব্যস্থান চাওক" },
      href: "#/districts",
    },
  },
  {
    id: "heritage",
    category: { en: "Heritage", as: "ঐতিহ্য" },
    video: "/video/hero-3.mp4",
    hdVideo: "/video/hero-hd-heritage.mp4",
    poster: "/homehero.png",
    credit: {
      author: "JyotiPN",
      source:
        "https://commons.wikimedia.org/wiki/File:Rabha_Hamzar_dance_of_Assam,_where_culture,_energy_and_heritage_come_alive_in_every_step.webm",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    kicker: {
      en: "Sibsagar · Majuli · Sattras",
      as: "শিৱসাগৰ · মাজুলী · সাত্ৰ",
    },
    headline: [
      { en: "Six centuries of", as: "ছয় শতিকাৰ" },
      { em: true, en: "Ahom legacy.", as: "আহোম পৰম্পৰা।" },
    ],
    sub: {
      en: "Brick temples of the Ahom kings, the monastic sattras of Sankardeva and golden muga silk — a culture carried by its people.",
      as: "আহোম ৰাজাসকলৰ ইটা মন্দিৰ, শংকৰদেৱৰ সাত্ৰ আৰু সোণীয় মুগা ৰেশম — ইয়াৰ মানুহে বহন কৰা সংস্কৃতি।",
    },
    cta: {
      label: { en: "Discover heritage", as: "ঐতিহ্য আবিষ্কাৰ কৰক" },
      href: "#/heritage",
    },
  },
];
