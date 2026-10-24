/**
 * rivers.js — documented rivers of Assam, bilingual EN/AS.
 *
 * Source authority:
 * - Government of Assam Water Resources, "Brahmaputra River System" —
 *   north-bank tributaries Subansiri, Ronganadi, Dikrong, Buroi, Borgong,
 *   Jiabharali, Dhansiri (North), Puthimari, Manas, Beki, Aie, Sonkosh;
 *   south-bank Noadehing, Buridehing, Desang, Dikhow, Bhogdoi, Dhansiri
 *   (South), Kopilli, Kulsi, Krishnai, Dhdhnoi, Jinjiram
 * - Government of Assam Water Resources, "Barak River System" —
 *   Katakhal, Jiri, Chiri, Modhura, Longai, Sonai, Rukni, Singla
 * - District/photograph locations carry only what each image page or
 *   official river-system page verifies. Anything else is kept out
 *   deliberately: this is a catalogue of major documented rivers, not
 *   an inventory of every minor stream.
 */
export const RIVERS = [
  {
    id: "brahmaputra",
    name: { en: "Brahmaputra", as: "ব্ৰহ্মপুত্ৰ" },
    aliases: { en: ["Brahmapootra"], as: ["ব্ৰহ্মপুত্ৰ"] },
    system: "brahmaputra",
    side: "main",
    region: { en: "Tibet · Arunachal Pradesh · Assam · Bangladesh", as: "তিব্বত · অৰুণাচল প্ৰদেশ · অসম · বাংলাদেশ" },
    place: { en: "The Red River — from Kobo to Dhubri", as: "ৰঙা নদী — কবোৰ পৰা ধুবুৰীলৈ" },
    description: {
      en: "One of the largest rivers in the world — fifth by average discharge — which enters Assam valley from Kobo and leaves at Dhubri, braiding across an average width of 5.46 Km.",
      as: "বিশ্বৰ আটাইতকৈ ডাঙৰ নদীসমূহৰ এটা — গড় হাৰ্মিন প্ৰৱাহৰ ওপৰত পঞ্চম — কবৰ পৰা অসমৰ উপত্যকাত সোমাই ধুবুৰীত ওলায়, গড় প্ৰস্থ ৫.৪৬ কিলোমিটাৰ বান্ধি।",
    },
    image: "/images/rivers/brahmaputra-guwahati.jpg",
    alt: { en: "Brahmaputra river in Guwahati", as: "গুৱাহাটীত ব্ৰহ্মপুত্ৰ" },
  },
  {
    id: "barak",
    name: { en: "Barak", as: "বৰাক" },
    aliases: { en: [], as: [] },
    system: "barak",
    side: "main",
    region: { en: "Barak Valley · Silchar", as: "বৰাক উপত্যকা · শিলচৰ" },
    place: { en: "Barak Valley · Silchar, Assam", as: "বৰাক উপত্যকা · শিলচৰ, অসম" },
    description: {
      en: "The Barak is the principal river of southern Assam, flowing through Silchar and the Barak valley and draining the Dima Hasao foothills and hill catchments.",
      as: "বৰাক হৈছে অসমৰ দক্ষিণ অঞ্চলৰ প্ৰধান নদী, শিলচৰ আৰু বৰাক উপত্যকাৰ মাজেৰে বৈ ডিমা হাছাওৰ পাহাৰ আৰু পানীবোৰ নিষ্কাশন কৰে।",
    },
    image: "/images/rivers/barak-silchar.jpg",
    alt: { en: "Barak river at Silchar", as: "শিলচৰত বৰাক নদী" },
  },
  {
    id: "subansiri",
    name: { en: "Subansiri", as: "সোৱণশিৰি" },
    aliases: { en: [], as: [] },
    system: "brahmaputra",
    side: "north",
    region: { en: "Arunachal Pradesh · Lakhimpur", as: "অৰুণাচল প্ৰদেশ · লখিমপুৰ" },
    place: { en: "Northern Assam · Lakhimpur", as: "উত্তৰ অসম · শিৱসাগৰ" },
    description: {
      en: "A major Himalayan tributary that joins the Brahmaputra from the north bank — a celebrated river of rafting and rafting tourism.",
      as: "হিমালয়ৰৰ এটা প্ৰধান উপনদী, উত্তৰ তীৰত ব্ৰহ্মপুত্ৰক মিলে — ৰাফটিং আৰু ৰাফটিং পৰ্যটনৰ বাবে খ্যাত নদী।",
    },
    image: "/images/rivers/subansiri-lakhimpur.jpg",
    alt: { en: "Subansiri river from the Lakhimpur side", as: "লখিমপুৰ দিশৰ পৰা সোৱণশিৰি" },
  },
  {
    id: "jia-bharali",
    name: { en: "Jia Bharali", as: "জিয়া ভৰালি" },
    aliases: { en: ["Jiabharali"], as: [] },
    system: "brahmaputra",
    side: "north",
    region: { en: "Sonitpur · Nameri", as: "শোণিতপুৰ · নামেৰী" },
    place: { en: "Nameri National Park side", as: "নামেৰী ৰাষ্ট্ৰীয় উদ্যানৰ দিশ" },
    description: {
      en: "A spirited Himalayan tributary that sweeps past Tezpur and Nameri — the valley's angling and adventure river.",
      as: "তেজপুৰ আৰু নামেৰীৰ কাষেৰে বৈ যোৱা এক উৎসাহী হিমালয় উপনদী — উপত্যকাৰ মাছ ধৰা আৰু দুঃসাহসীকৰ্মৰ নদী।",
    },
    image: "/images/rivers/jia-bharali-nameri.jpg",
    alt: { en: "Jia Bharali river in Nameri National Park", as: "নামেৰী ৰাষ্ট্ৰীয় উদ্যানত জিয়া ভৰালি" },
  },
  {
    id: "manas",
    name: { en: "Manas", as: "মানস" },
    aliases: { en: [], as: [] },
    system: "brahmaputra",
    side: "north",
    region: { en: "Manas National Park · Bhutan border", as: "মানস ৰাষ্ট্ৰীয় উদ্যান · ভূটান সীমান্ত" },
    place: { en: "Manas National Park side", as: "মানস ৰাষ্ট্ৰীয় উদ্যানৰ দিশ" },
    description: {
      en: "A trans-boundary Himalayan river that gives Manas National Park its name — a sanctuary stretch where river, grassland and elephant forest meet.",
      as: "মানস ৰাষ্ট্ৰীয় উদ্যানৰ নাম দিয়ে — এখন অভয়াৰণৰ অংশ য’ত নদী, তৃণভূমি আৰু হাতীৰ বন মিলে।",
    },
    image: "/images/rivers/manas-river.jpg",
    alt: { en: "Manas river inside Manas National Park", as: "মানস ৰাষ্ট্ৰীয় উদ্যানত মানস নদী" },
  },
  {
    id: "kopili",
    name: { en: "Kopili", as: "কপিলী" },
    aliases: { en: ["Kopilli"], as: [] },
    system: "brahmaputra",
    side: "south",
    region: { en: "Dima Hasao · Karbi Anglong · Nagaon", as: "ডিমা হাছাও · কাৰ্বি আংলং · নগাঁও" },
    place: { en: "Hill district side", as: "পাহাৰীয়া জিলা" },
    description: {
      en: "A hill-born river of Dima Hasao and Karbi Anglong that powers the Kopili hydel project and feeds the valley's irrigation.",
      as: "ডিমা হাছাও আৰু কাৰ্বি আংলঙৰ পাহাৰীয়া নদী যি কপিলী জলবিদ্যুৎ প্ৰকল্পক শক্তি দিয়ে আৰু উপত্যকাৰ জলসিঞ্চন পোষণ কৰে।",
    },
    image: "/images/rivers/kopili-river.jpg",
    alt: { en: "Kopili river, Assam", as: "কপিলী নদী, অসম" },
  },
];
export const RIVERS_EXTRA = [
  {
    id: "kulsi",
    name: { en: "Kulsi", as: "কুলশী" },
    aliases: { en: [], as: [] },
    system: "brahmaputra",
    side: "south",
    region: { en: "Kamrup · Chandubi", as: "কামৰূপ · চান্দুবি" },
    place: { en: "Chandubi Lake side, Kamrup", as: "চান্দুবি হ্ৰদৰ দিশ, কামৰূপ" },
    description: {
      en: "A gentle southern tributary remembered for its clear flow near Chandubi lake — a welcoming river of Kamrup's riverine villages.",
      as: "চান্দুবি হ্ৰদৰ কাষত পৰিষ্কাৰ প্ৰৱাহৰ বাবে স্মৰণ কৰা এক শান্ত দক্ষিণ উপনদী — কামৰূপৰ নদীয় গাঁৱৰ এখন স্বাগত নদী।",
    },
    image: "/images/rivers/kulsi-chandubi.jpg",
    alt: { en: "Kulsi river near Chandubi lake, Kamrup", as: "কামৰূপত চান্দুবি হ্ৰদৰ কাষৰ কুলশী" },
  },
  {
    id: "dikhow",
    name: { en: "Dikhow", as: "দিখৌ" },
    aliases: { en: [], as: [] },
    system: "brahmaputra",
    side: "south",
    region: { en: "Sivasagar", as: "শিৱসাগৰ" },
    place: { en: "Sivasagar side", as: "শিৱসাগৰ দিশ" },
    description: {
      en: "A storied river of upper Assam that flows through Sivasagar — the Ahom capital's river, lined with ghats and temple towns.",
      as: "শিৱসাগৰ মাজেৰে বৈ যোৱা ঐতিহাসিক নদী — আহোম ৰাজধানীৰ নদী, ঘাট আৰু মন্দিৰ নগৰেৰে সজোৱা।",
    },
    image: "/images/rivers/dikhow-sivasagar.jpg",
    alt: { en: "Dikhow river, Sivasagar", as: "দিখৌ নদী, শিৱসাগৰ" },
  },
  {
    id: "beki",
    name: { en: "Beki", as: "বেকী" },
    aliases: { en: [], as: [] },
    system: "brahmaputra",
    side: "north",
    region: { en: "Barpeta", as: "বৰপেটা" },
    place: { en: "Bhasighat, Barpeta", as: "ভাষীঘাট, বৰপেটা" },
    description: {
      en: "A low-land river of the western Brahmaputra valley — at Bhasighat in Barpeta its sunset reach is a beloved riverside landmark.",
      as: "পশ্চিম ব্ৰহ্মপুত্ৰ উপত্যকাৰ এখন নিম্ন-ভূমি নদী — বৰপেটাৰ ভাষীঘাটত ইয়াৰ বসন্তৰ পৰা এটা প্ৰিয় নদীৰ দৃশ্য।",
    },
    image: "/images/rivers/beki-river.jpg",
    alt: { en: "Beki river at Bhasighat, Barpeta", as: "বৰপেটাৰ ভাষীঘাটত বেকী" },
  },
];

export const RIVERS_EXTRA_2 = [
  {
    id: "burhi-dihing",
    name: { en: "Burhi Dihing", as: "বুৰহি দিহিং" },
    aliases: { en: ["Buridehing"], as: [] },
    system: "brahmaputra",
    side: "south",
    region: { en: "Dibrugarh", as: "ডিব্ৰুগড়" },
    place: { en: "Dibrugarh district side", as: "ডিব্ৰুগড় জিলা" },
    description: {
      en: "A meandering southern tributary — from the air its floodplain unfolds in broad silver loops across Dibrugarh.",
      as: "খনখনিয়া দক্ষিণ উপনদী — আকাশৰ পৰা ডিব্ৰুগড়ত ইয়াৰ প্লাবনভূমি ৰূপালী বাক্যত খোল খায়।",
    },
    image: "/images/rivers/burhi-dihing-dibrugarh.jpg",
    alt: { en: "Aerial view of the Burhi Dihing floodplain, Dibrugarh", as: "ডিব্ৰুগড়ত বুৰহি দিহিঙৰ প্লাবনভূমি" },
  },
  {
    id: "dhansiri",
    name: { en: "Dhansiri", as: "ধানশিৰি" },
    aliases: { en: ["North Dhansiri", "South Dhansiri"], as: [] },
    system: "brahmaputra",
    side: "north",
    region: { en: "Bhairabkunda", as: "ভৈৰবকুণ্ড" },
    place: { en: "Bhairabkunda, Assam", as: "ভৈৰবকুণ্ড, অসম" },
    description: {
      en: "The Dhansiri rises in the hills and meets the Brahmaputra at Bhairabkunda, where an irrigation barrage holds back its flow.",
      as: "ধানশিৰি পাহাৰত উৎপন্ন হৈ ভৈৰবকুণ্ডত ব্ৰহ্মপুত্ৰক মিলে, য’ত এখন সিঞ্চন বাঁধে ইয়াৰ প্ৰৱাহ ধৰি ৰাখে।",
    },
    image: "/images/rivers/dhansiri-bhairabkunda.jpg",
    alt: { en: "Dhansiri river at Bhairabkunda", as: "ভৈৰবকুণ্ডত ধানশিৰি" },
  },
  {
    id: "longai",
    name: { en: "Longai", as: "লংগাই" },
    aliases: { en: [], as: [] },
    system: "barak",
    side: "valley",
    region: { en: "Karimganj", as: "কৰিমগঞ্জ" },
    place: { en: "Karimganj town side", as: "কৰিমগঞ্জ নগৰৰ দিশ" },
    description: {
      en: "A Barak Valley workhorse river seen from Karimganj — ferry ghats, sand banks and the everyday trade of the southern districts.",
      as: "কৰিমগঞ্জৰ পৰা দেখা বৰাক উপত্যকাৰ কামিয়া নদী — ফেৰী ঘাট, বালিৰ তীৰ আৰু দক্ষিণ জিলাৰ দৈনন্দিন বাণিজ্য।",
    },
    image: "/images/rivers/longai-karimganj.jpg",
    alt: { en: "Longai river at Karimganj", as: "কৰিমগঞ্জত লংগাই নদী" },
  },
];

for (const r of RIVERS_EXTRA) RIVERS.push(r);
for (const r of RIVERS_EXTRA_2) RIVERS.push(r);

export const RIVER_SYSTEMS = [
  {
    id: "brahmaputra",
    label: { en: "Brahmaputra River System", as: "ব্ৰহ্মপুত্ৰ নদী প্ৰণালী" },
    short: { en: "Brahmaputra", as: "ব্ৰহ্মপুত্ৰ" },
  },
  {
    id: "barak",
    label: { en: "Barak River System", as: "বৰাক নদী প্ৰণালী" },
    short: { en: "Barak", as: "বৰাক" },
  },
];

export function riverById(id) {
  return RIVERS.find((r) => r.id === id) || null;
}

export function riverSystemLabel(id, lang = "en") {
  const hit = RIVER_SYSTEMS.find((s) => s.id === id);
  return hit ? hit.label[lang] || hit.label.en : id;
}

export function riverSystemShort(id, lang = "en") {
  const hit = RIVER_SYSTEMS.find((s) => s.id === id);
  return hit ? hit.short[lang] || hit.short.en : id;
}

export function riverSideLabel(side, lang = "en") {
  const labels = {
    main: { en: "Main river", as: "মুখ্য নদী" },
    north: { en: "North-bank tributary", as: "উত্তৰ তীৰৰ উপনদী" },
    south: { en: "South-bank tributary", as: "দক্ষিণ তীৰৰ উপনদী" },
    valley: { en: "Barak Valley tributary", as: "বৰাক উপত্যকাৰ উপনদী" },
  };
  const hit = labels[side];
  return hit ? hit[lang] || hit.en : side;
}

/** Free-text search over names + aliases + region + description (EN/AS). */
export function searchRivers(query = "") {
  const q = (query || "").trim().toLowerCase();
  if (!q) return RIVERS;
  return RIVERS.filter((r) => {
    const haystack = [
      r.name.en, r.name.as,
      ...(r.aliases?.en || []), ...(r.aliases?.as || []),
      r.region?.en, r.region?.as, r.place?.en, r.place?.as,
      r.description?.en, r.description?.as,
      riverSystemLabel(r.system, "en"), riverSystemLabel(r.system, "as"),
      riverSideLabel(r.side, "en"), riverSideLabel(r.side, "as"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

/** Filter by river system; "all" (or blank) returns everything. */
export function filterRiversBySystem(system) {
  const KNOWN_SYSTEMS = new Set(RIVER_SYSTEMS.map((s) => s.id));
  if (!system || system === "all" || !KNOWN_SYSTEMS.has(system)) return RIVERS;
  return RIVERS.filter((r) => r.system === system);
}

/** Only bank groups that genuinely have a matching river. */
export function availableRiverSides({ system = "all" } = {}) {
  const scoped = filterRiversBySystem(system);
  const order = ["main", "north", "south", "valley"];
  return order.filter((s) => scoped.some((r) => r.side === s));
}
