import CULTURE_IMG from "./cultureImages";

/**
 * Culture homepage editorial data — BELOW the existing hero.
 * All images are local verified photographs in public/images/culture/.
 * Drawn only from verified project data. No invented dates/prices/addresses.
 */

export const LIVING_HERITAGE_FEATURE = {
  image: CULTURE_IMG.rangGhar,
  alt: { en: "Rang Ghar, Sivasagar — Ahom-era pavilion", as: "ৰংঘৰ, শিৱসাগৰ — আহোম যুগৰ পেভিলিয়ন" },
};

export const HERITAGE_ROWS = [
  {
    id: "ahom",
    image: CULTURE_IMG.talatalGhar,
    kicker: { en: "Ahom legacy · Sivasagar", as: "আহোম ঐতিহ্য · শিৱসাগৰ" },
    title: { en: "Six centuries of the Ahom kingdom", as: "ছয় শতিকাৰ আহোম ৰাজ্য" },
    body: {
      en: "The Ahom dynasty ruled the Brahmaputra heartland for six centuries. Its capital Sivasagar still holds Rang Ghar, Talatal Ghar, the Joysagar tank and the Shiva dol.",
      as: "আহোম ৰাজবংশে ব্ৰহ্মপুত্ৰৰ হৃদয়ভূমি ছয় শতিকা শাসন কৰিছিল।",
    },
    href: "#/heritage",
  },
  {
    id: "sattras",
    image: CULTURE_IMG.majuliRiver,
    kicker: { en: "Majuli · Vaishnavite tradition", as: "মাজুলী · বৈষ্ণৱ পৰম্পৰা" },
    title: { en: "The sattras of Majuli", as: "মাজুলীৰ সাত্ৰসমূহ" },
    body: {
      en: "Monastic homes of the Brahmaputra islands where Sattriya dance and ritual music still live — the legacy of 15th-century saint-scholar Srimanta Sankardev.",
      as: "ব্ৰহ্মপুত্ৰ দ্বীপৰ মঠবাসী ঘৰ, য'ত সাত্ৰীয় নৃত্য এতিয়াও জীয়াই আছে।",
    },
    href: "#/heritage",
  },
  {
    id: "kamakhya",
    image: CULTURE_IMG.kamakhyaTemple,
    kicker: { en: "Nilachal Hill · Shakti pitha", as: "নীলাচল পাহাৰ · শক্তি পীঠ" },
    title: { en: "Kamakhya Devi", as: "কামাখ্যা দেৱী" },
    body: {
      en: "The temple of Kamakhya atop Nilachal Hill — one of the oldest Shakti shrines of India.",
      as: "নীলাচল পাহাৰৰ মূৰত কামাখ্যা মন্দিৰ — ভাৰতৰ পুৰণি শক্তি মন্দিৰসমূহৰ এটা।",
    },
    href: "#/culture/experiences/spiritual",
  },
  {
    id: "hajo",
    image: CULTURE_IMG.hayagrivaMadhava,
    kicker: { en: "Hajo · Sualkuchi", as: "হাজো · চুৱালকুছি" },
    title: { en: "Where faiths meet, where silk is woven", as: "য'ত ধৰ্ম মিলে, য'ত ৰেশম বোৱা হয়" },
    body: {
      en: "The holy town of Hajo where faiths meet, and nearby Sualkuchi — the muga-silk village on the Brahmaputra.",
      as: "হাজোৰ পবিত্ৰ নগৰ আৰু ওচৰৰ চুৱালকুছি — ব্ৰহ্মপুত্ৰৰ তীৰৰ মুগা-ৰেশম গাঁও।",
    },
    href: "#/handicrafts",
  },
];

export const FESTIVAL_STRIP = [
  {
    image: CULTURE_IMG.bihuDance,
    name: { en: "Bihu dance", as: "বিহু নাচ" },
    about: {
      en: "Dhol, pepa and gagana set the pace — the spring-time dance of the Assamese people.",
      as: "ঢোল, পেঁপা আৰু গগনাই তাল দিয়ে — অসমীয়া মানুহৰ বসন্তকালৰ নাচ।",
    },
    href: "#/culture",
  },
  {
    image: CULTURE_IMG.aliAyeLigang,
    name: { en: "Ali-Aye-Ligang · Mising", as: "আলি-আয়ে-লৃগাং · মিচিং" },
    about: {
      en: "The Mising community's spring festival — dancing to Oinitom songs.",
      as: "মিচিং সমাজৰ বসন্ত উৎসৱ — ঐনিতম গীতৰ সুৰত নৃত্য।",
    },
    href: "#/culture",
  },
  {
    image: CULTURE_IMG.sattriyaPerformance,
    name: { en: "Sattriya", as: "সাত্ৰীয়া" },
    about: {
      en: "One of the eight classical dances of India, born in the sattras of Assam.",
      as: "অসমৰ সাত্ৰত জন্মা ভাৰতৰ শাস্ত্ৰীয় নৃত্যসমূহৰ এটা।",
    },
    href: "#/artists",
  },
  {
    image: CULTURE_IMG.ambubachiMela,
    name: { en: "Ambubachi Mela · Kamakhya", as: "অম্বুবাচী মেলা · কামাখ্যা" },
    about: {
      en: "The monsoon festival at Kamakhya Temple on Nilachal Hill.",
      as: "নীলাচল পাহাৰৰ কামাখ্যা মন্দিৰত বাৰিষাৰ উৎসৱ।",
    },
    href: "#/culture/experiences/spiritual",
  },
];
export const CRAFT_FEATURES = [
  {
    image: CULTURE_IMG.sualkuchiHandloom,
    kicker: { en: "Golden muga", as: "সোণীয় মুগা" },
    title: { en: "Eri, Muga and Pat", as: "এৰি, মুগা আৰু পাট" },
    body: {
      en: "Muga silk — treasured since the Ahom era — grows deeper in lustre with every wash. Eri and Pat complete the loom's trinity, woven into gamosa and mekhela sador.",
      as: "আহোম যুগৰ পৰা মূল্যবান মুগা ৰেশম — প্ৰতিটো ধোৱাৰ লগে লগে উজ্জ্বলতা বাঢ়ে।",
    },
    href: "#/handicrafts",
  },
  {
    image: CULTURE_IMG.gamosa,
    kicker: { en: "Honour & craft", as: "সন্মান আৰু শিল্প" },
    title: { en: "Gamosa, Jaapi and bell metal", as: "গামোচা, জাপি আৰু কাঁহ-পিতল" },
    body: {
      en: "The handwoven gamosa honours guests, the jaapi crowns Bihu dancers, and Sarthebari's bell-metal workers hammer heirlooms for naamghars.",
      as: "হাতে-বোৱা গামোচাই অতিথিক সন্মান দিয়ে, জাপিয়ে বিহু নাচনীক মুকুট পিন্ধায়।",
    },
    href: "#/handicrafts",
  },
];

export const PERFORMANCE_WIDE = {
  image: CULTURE_IMG.bihuDanceAlt,
  kicker: { en: "Music · Dance · Performance", as: "সংগীত · নৃত্য · প্ৰদৰ্শন" },
  title: { en: "A stage the whole valley shares", as: "সমগ্ৰ উপত্যকাই ভাগ কৰা মঞ্চ" },
  body: {
    en: "Bihu drums in spring, Sattriya in the prayer hall, Bhaona under festival lamps — Assam performs its memory.",
    as: "বসন্তত বিহুৰ ঢোল, প্ৰাৰ্থনাগৃহত সাত্ৰীয়া, উৎসৱৰ চাকিৰ তলত ভাওনা।",
  },
};

export const PERFORMANCE_CARDS = [
  {
    image: CULTURE_IMG.bihuDance,
    name: { en: "Bihu · Dhol · Pepa", as: "বিহু · ঢোল · পেঁপা" },
    about: {
      en: "The Bihu ensemble — drum, buffalo-horn pipe and bamboo Jew's harp.",
      as: "বিহুৰ বাদ্যদল — ঢোল, ম'হৰ শিঙৰ পেঁপা আৰু বাঁহৰ গগনা।",
    },
  },
  {
    image: CULTURE_IMG.sattriyaDance,
    name: { en: "Sattriya · Khol · Taal", as: "সাত্ৰীয়া · খোল · তাল" },
    about: {
      en: "Sattriya dance and the sattra orchestra behind Borgeet and Bhaona.",
      as: "সাত্ৰীয়া নৃত্য আৰু বৰগীত, ভাওনাৰ আঁৰৰ সাত্ৰীয় বাদ্যবৃন্দ।",
    },
  },
  {
    image: CULTURE_IMG.samaguriMasks,
    name: { en: "Bhaona · Masks · Ojapali", as: "ভাওনা · মুখা · ওজাপালি" },
    about: {
      en: "Masked Bhaona theatre and narrative Ojapali song-cycles of the naamghars.",
      as: "মুখা পিন্ধা ভাওনা আৰু নামঘৰৰ আখ্যানমূলক ওজাপালি গীতচক্ৰ।",
    },
  },
];

export const CUISINE_BAND = [
  {
    image: CULTURE_IMG.assameseThali,
    name: { en: "The Assamese thali", as: "অসমীয়া থালি" },
    about: {
      en: "Rice, dal, khar, tenga and pitika — alkaline beginnings, sour middles.",
      as: "ভাত, দালি, খাৰ, টেঙা আৰু পিটিকা — ক্ষাৰকীয় আৰম্ভণি, টেঙা মাজভাগ।",
    },
  },
  {
    image: CULTURE_IMG.assamesePitha,
    name: { en: "Pitha & Laru", as: "পিঠা আৰু লাড়ু" },
    about: {
      en: "Til pitha, ghila pitha and narikol laru — rice-flour festival sweets.",
      as: "তিল পিঠা, ঘিলা পিঠা আৰু নাৰিকল লাড়ু — চাউল-গুড়িৰ উৎসৱ মিঠাই।",
    },
  },
  {
    image: CULTURE_IMG.caneBamboo,
    name: { en: "Everyday wisdom", as: "দৈনন্দিন জ্ঞান" },
    about: {
      en: "Bamboo shoot, sesame, banana flower and river fish — field and flood.",
      as: "বাঁহগাজ, তিল, কলডিল আৰু নদীৰ মাছ — পথাৰ আৰু বানৰ ৰন্ধনশৈলী।",
    },
  },
];

export const EXPLORE_TILES = [
  { label: { en: "Heritage", as: "ঐতিহ্য" }, sub: { en: "Ahoms · Satras · Temples", as: "আহোম · সাত্ৰ · মন্দিৰ" }, href: "#/heritage", image: CULTURE_IMG.rangGhar },
  { label: { en: "Art & Artists", as: "শিল্প আৰু শিল্পী" }, sub: { en: "Sattriya · Borgeet · Cinema", as: "সাত্ৰীয় · বৰগীত · ছবি" }, href: "#/artists", image: CULTURE_IMG.sattriyaDance },
  { label: { en: "Handicrafts", as: "হস্তশিল্প" }, sub: { en: "Muga · Gamosa · Bell metal", as: "মুগা · গামোচা · কাঁহ-পিতল" }, href: "#/handicrafts", image: CULTURE_IMG.sualkuchiHandloom },
  { label: { en: "Food & Cuisine", as: "খাদ্য" }, sub: { en: "Khar · Tenga · Pitha", as: "খাৰ · টেঙা · পিঠা" }, href: "#/culture/experiences/cuisine", image: CULTURE_IMG.assameseThali },
  { label: { en: "Spiritual", as: "আধ্যাত্মিক" }, sub: { en: "Shakti · Satra · Faiths", as: "শক্তি · সাত্ৰ · ধৰ্ম" }, href: "#/culture/experiences/spiritual", image: CULTURE_IMG.kamakhyaTemple },
  { label: { en: "Festivals", as: "উৎসৱ" }, sub: { en: "Bihu · Bhaona · Dance", as: "বিহু · ভাওনা · নৃত্য" }, href: "#/culture", image: CULTURE_IMG.bihuDance },
];

