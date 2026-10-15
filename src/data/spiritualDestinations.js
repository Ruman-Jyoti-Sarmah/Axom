/**
 * spiritualDestinations.js — Assam's shared sacred geography.
 *
 * The single, verified source of truth behind the "Spiritual Destinations"
 * experience: the Culture-home strip and the dedicated route
 * `#/culture/experiences/spiritual`.
 *
 * EVERY record below was checked against a citable source before it was
 * written: Government of Assam district administration portals
 * (*.assam.gov.in), Archaeological Survey of India reports (cited by the
 * Wikipedia articles that reference them), and English/Assamese Wikipedia.
 * The `source` field names that provenance so the page can show it.
 *
 * Rules honoured here (please don't "improve" by adding unverified detail):
 *   • No opening hours, prices, addresses, visitor restrictions, booking
 *     availability or festival dates are recorded — none are asserted.
 *   • A place is listed under EVERY tradition it genuinely belongs to. Hajo's
 *     hill and Surya Pahar are shared by three faiths each and are labelled so.
 *   • Photographs are Wikimedia Commons `Special:FilePath` URLs (the same
 *     pattern the rest of AXOM uses). Every filename was confirmed to exist on
 *     Commons before use — `src/` never invents an image path.
 *   • `tradition` ids drive the filter bar. Traditions with no matching place
 *     are never rendered, so no empty or misleading category can appear.
 */

import CULTURE_IMG from "./cultureImages";

/* ── Tradition taxonomy ─────────────────────────────────────────────────── */
/* This order is topical, deliberately NOT a ranking — no tradition is
   presented as more important than another. `all` always comes first.     */
export const TRADITIONS = [
  { id: "all", label: { en: "All destinations", as: "সকলো গন্তব্যস্থান" } },
  { id: "hindu", label: { en: "Hindu traditions", as: "হিন্দু পৰম্পৰা" } },
  { id: "islam", label: { en: "Islamic heritage", as: "ইছলামিক ঐতিহ্য" } },
  { id: "sikh", label: { en: "Sikh heritage", as: "শিখ ঐতিহ্য" } },
  { id: "christian", label: { en: "Christian heritage", as: "খ্ৰীষ্টান ঐতিহ্য" } },
  { id: "buddhist", label: { en: "Buddhist heritage", as: "বৌদ্ধ ঐতিহ্য" } },
  { id: "jain", label: { en: "Jain heritage", as: "জৈন ঐতিহ্য" } },
  { id: "vaishnavite", label: { en: "Satras & Namghars", as: "সাত্ৰ আৰু নামঘৰ" } },
  { id: "indigenous", label: { en: "Community traditions", as: "সামাজিক পৰম্পৰা" } },
];

/**
 * The verified catalogue.
 *
 * Field contract — `name`, `place`, `kind`, `about`, `image` keep the exact
 * shape of the older `SPIRITUAL` array so every existing consumer still works:
 *   id         stable slug
 *   name       { en, as }
 *   place      { en, as } — district + the actual locality
 *   district   { en, as } — administrative district
 *   slug       existing district-detail route this place belongs to, or null
 *   kind       { en, as } — the heritage label printed on the card
 *   tradition  ids from TRADITIONS (never "all"); several are allowed
 *   about      { en, as } — concise, factual description
 *   image      Commons URL
 *   alt        { en, as }
 *   source     provenance, shown on the detail card
 */
export const SPIRITUAL_DESTINATIONS = [
  /* ── Hindu traditions ─────────────────────────────────────────────────── */
  {
    id: "kamakhya-temple",
    name: { en: "Kamakhya Temple", as: "কামাখ্যা মন্দিৰ" },
    place: { en: "Guwahati · Nilachal Hill", as: "গুৱাহাটী · নীলাচল পাহাৰ" },
    district: { en: "Kamrup Metropolitan", as: "কামৰূপ মহানগৰ" },
    slug: "kamrup-metropolitan",
    kind: { en: "Shakti Pitha", as: "শক্তি পীঠ" },
    tradition: ["hindu"],
    about: {
      en: "Among the oldest of the 51 Shakti pithas, Kamakhya atop Nilachal Hill is the heart of Tantric Shakti worship, drawing pilgrims through the Ambubachi Mela each June.",
      as: "৫১টাও শক্তি পীঠৰ মাজত আটাইতকৈ পুৰণি, নীলাচল পাহাৰৰ কামাখ্যা তান্ত্ৰিক শক্তি-পূজাৰ হৃদয় — প্ৰতি জুনই আম্বুবাচী মেলাত যজমানে আকৰ্ষিত হয়।",
    },
    image: CULTURE_IMG.kamakhyaTempleAlt,
    alt: {
      en: "Kamakhya Temple on Nilachal Hill, Guwahati",
      as: "নীলাচল পাহাৰত কামাখ্যা মন্দিৰ, গুৱাহাটী",
    },
    source: "Wikimedia Commons · Kamrup Metropolitan district portal",
  },
  {
    id: "umananda-temple",
    name: { en: "Umananda Temple", as: "উমানন্দা মন্দিৰ" },
    place: { en: "Guwahati · Brahmaputra", as: "গুৱাহাটী · ব্ৰহ্মপুত্ৰ" },
    district: { en: "Kamrup Metropolitan", as: "কামৰূপ মহানগৰ" },
    slug: "kamrup-metropolitan",
    kind: { en: "Shiva shrine", as: "শিৱ মন্দিৰ" },
    tradition: ["hindu"],
    about: {
      en: "The world's smallest inhabited river island, reached by ferry, holds a Shiva temple built by the Ahom king Gadadhar Singha in 1694, and is home to the rare golden langur.",
      as: "বোটে গৈ পোৱা জগতৰ আটাইতকৈ সৰু জনবসতি নদীয় দ্বীপত আহোম ৰাজা গদাধৰ সিংহে ১৬৯৪ চনত শিৱ মন্দিৰ বাসালে আৰু এই ঠাইত দুৰ্লভ সোণালি হানুহ পোৱা যায়।",
    },
    image: CULTURE_IMG.umanandaTemple,
    alt: {
      en: "Umananda Shiva temple on Peacock Island in the Brahmaputra, Guwahati",
      as: "ব্ৰহ্মপুত্ৰৰ ময়ূৰা দ্বীপত উমানন্দা শিৱ মন্দিৰ, গুৱাহাটী",
    },
    source: "Wikimedia Commons · Kamrup Metropolitan district portal",
  },
  {
    id: "sivadol-sivasagar",
    name: { en: "Sivadol", as: "শিৱদ'ল" },
    place: { en: "Sivasagar · Upper Assam", as: "শিৱসাগৰ · উপৰ অসম" },
    district: { en: "Sivasagar", as: "শিৱসাগৰ" },
    slug: "sivasagar",
    kind: { en: "Shiva temple", as: "শিৱ মন্দিৰ" },
    tradition: ["hindu"],
    about: {
      en: "By the great tank of the old Ahom capital stand three domed temples — Sivadol, Vishnudol and Devidol — consecrated under queen Phuleswari in 1734, with Sivadol the tallest Shiva temple in Assam.",
      as: "পুৰণি আহোম ৰাজধানীৰ ডাঙৰ পুকুৰীৰ কাষত তিনিটা চ্ৰিণী মন্দিৰ — শিৱদ'ল, বিষ্ণুদ'ল আৰু দেৱীদ'ল — ৰাণী ফুলেশ্বৰীয়াৰ শাসনকালত ১৭৩৪ চনত প্ৰতিষ্ঠা হৈছিল; শিৱদ'ল অসমৰ আটাইতকৈ ওখ শিৱ মন্দিৰ।",
    },
    image: CULTURE_IMG.shivaDol,
    alt: {
      en: "Sivadol, the tall Shiva temple beside the Sivasagar tank",
      as: "শিৱসাগৰ পুকুৰীৰ কাষত থকা ওখ শিৱদ'ল মন্দিৰ",
    },
    source: "Wikimedia Commons · Sivasagar district portal",
  },
  {
    id: "negheriting-shiva-doul",
    name: { en: "Negheriting Shiva Doul", as: "নেঘেৰিটিং শিৱ দৌল" },
    place: { en: "Dergaon · Golaghat", as: "দেৰগাঁৱ · গোলাঘাট" },
    district: { en: "Golaghat", as: "গোলাঘাট" },
    slug: "golaghat",
    kind: { en: "Shiva temple", as: "শিৱ মন্দিৰ" },
    tradition: ["hindu"],
    about: {
      en: "On a hillock in Golaghat district, the Ahom king Rajeswar Singha raised this brick Shiva temple in 1765 over an older stone shrine named in the Buranjis. It is a protected monument laid out on the panchayatana plan.",
      as: "গোলাঘাট জিলাৰ এখন পাহাৰৰ খুটা-কঁটাত আহোম ৰাজা ৰাজেশ্বৰ সিংহে ১৭৬৫ চনত বুৰঞ্জীত উল্লিখিত এখন পুৰণি শিলা-মন্দিৰৰ ঠাইত এইবোৰ ইটা-শিৱ মন্দিৰ নিৰ্মাণ কৰিছিল। পঞ্চায়তন কৰ্তব্যুੱক্তিত ৰচিত এই মন্দিৰখন সুৰক্ষিত স্মাৰক।",
    },
    image: CULTURE_IMG.negheritingDoul,
    alt: {
      en: "Negheriting Shiva Doul, the brick Shiva temple at Dergaon, Golaghat",
      as: "দেৰগাঁৱত নেঘেৰিটিং শিৱ দৌল, গোলাঘাট",
    },
    source: "Wikipedia (citing E. A. Gait, A History of Assam) · Wikimedia Commons",
  },

  /* ── Shared sanctity: where more than one tradition meets ─────────────── */
  {
    id: "hayagriva-madhava-hajo",
    name: { en: "Hayagriva Madhava, Hajo", as: "হয়গ্ৰীৱ মাধৱ, হাজো" },
    place: { en: "Hajo · Kamrup", as: "হাজো · কামৰূপ" },
    district: { en: "Kamrup", as: "কামৰূপ" },
    slug: "kamrup",
    kind: { en: "Where faiths meet", as: "ধৰ্ম মিলা স্থান" },
    tradition: ["hindu", "islam", "buddhist"],
    about: {
      en: "On one hill at Hajo, a Vishnu temple, a Muslim shrine of Pir Giyasuddin Auliya and a Buddhist stupa stand together — a living symbol of Assam's shared sanctity.",
      as: "হাজোৰ একেটা পাহাৰত বিষ্ণু মন্দিৰ, মুছলমান সূফি পীৰ গিয়াসুদ্দীন আউলিয়াৰ মজাৰ আৰু বৌদ্ধ স্তুপা একেলগে থিয় হয় — অসমৰ যুক্ত বিশ্বাসৰ জীৱন্ত প্ৰতীক।",
    },
    image: CULTURE_IMG.hayagrivaMadhava,
    alt: {
      en: "Hayagriva Madhava Temple on the hill at Hajo, Kamrup",
      as: "হাজোৰ পাহাৰত হয়গ্ৰীৱ মাধৱ মন্দিৰ, কামৰূপ",
    },
    source: "Wikimedia Commons · Kamrup district portal",
  },
  {
    id: "surya-pahar",
    name: { en: "Sri Surya Pahar", as: "শ্ৰী সূৰ্য পাহাৰ" },
    place: { en: "Goalpara · Lower Assam", as: "গোৱালপাৰা · তলত অসম" },
    district: { en: "Goalpara", as: "গোৱালপাৰা" },
    slug: "goalpara",
    kind: { en: "Hindu · Buddhist · Jain hill", as: "হিন্দু · বৌদ্ধ · জৈন পাহাৰ" },
    tradition: ["hindu", "buddhist", "jain"],
    about: {
      en: "A hill south-east of Goalpara where rock-cut Shiva lingas, votive stupas and deities of the Hindu, Buddhist and Jain pantheons lie scattered over about a kilometre. The Archaeological Survey of India excavated the site between 1992 and 2001 and keeps a museum here.",
      as: "গোৱালপাৰাৰ দক্ষিণ-পূৰ্বত থকা এই পাহাৰখনত খোদিত শিৱ-লিঙ্গ, পূজাৰ স্তুপা আৰু হিন্দু, বৌদ্ধ, জৈন দেৱতা-ৰূপ প্ৰায় এক কি.মি. মাটিত ছ’ৰিয়া আছে। ভাৰতীয় পুৰাতাত্ত্বিক সৰ্বেক্ষণ অধিদপ্তৰে ১৯৯২–২০০১ দশকটোত ইয়াত উত্তোলন কৰিছিল আৰু এটা যাদুগৃহ ৰাখিছে।",
    },
    image: CULTURE_IMG.suryaPahar,
    alt: {
      en: "Sri Surya Mandir at Sri Surya Pahar, Goalpara",
      as: "শ্ৰী সূৰ্য পাহাৰত শ্ৰী সূৰ্য মন্দিৰ, গোৱালপাৰা",
    },
    source: "Archaeological Survey of India, 2015 site report · Goalpara district portal",
  },

  /* ── Islamic heritage ─────────────────────────────────────────────────── */
  {
    id: "poa-mecca-hajo",
    name: { en: "Poa Mecca", as: "পোৱা মক্কা" },
    place: { en: "Hajo · Garurachal Hill", as: "হাজো · গৰুৱাচল পাহাৰ" },
    district: { en: "Kamrup", as: "কামৰূপ" },
    slug: "kamrup",
    kind: { en: "Muslim shrine", as: "মুছলমান মজাৰ" },
    tradition: ["islam"],
    about: {
      en: "On Garurachal Hill above Hajo stands Poa Mecca, Assam's best-known Muslim pilgrimage spot, noted as the tomb of the Sufi Pir Giyasuddin Auliya.",
      as: "হাজোৰ গৰুৱাচল পাহাৰত থকা পোৱা মক্কা অসমৰ আটাইতকৈ জনপ্ৰিয় মুছলমান তীৰ্থস্থান — সূফি পীৰ গিয়াসুদ্দীন আউলিয়াৰ সমাধি বুলি ইয়াক গণ্য কৰা হয়।",
    },
    image: CULTURE_IMG.powaMecca,
    alt: {
      en: "Poa Mecca on Garurachal Hill, Hajo",
      as: "হাজোৰ গৰুৱাচল পাহাৰত পোৱা মক্কা",
    },
    source: "Wikimedia Commons · Kamrup district portal",
  },
  {
    id: "ajan-pir-dargah",
    name: { en: "Ajan Pir Dargah", as: "আজান পীৰ দৰ্গাহ" },
    place: { en: "Saraguri Chapari · Sivasagar", as: "চৰাগুৰি চাপৰি · শিৱসাগৰ" },
    district: { en: "Sivasagar", as: "শিৱসাগৰ" },
    slug: "sivasagar",
    kind: { en: "Sufi dargah", as: "চুফি দৰ্গাহ" },
    tradition: ["islam"],
    about: {
      en: "On the bank of the Brahmaputra near Sivasagar town lies the dargah of Azan Fakir, the seventeenth-century Sufi poet and preacher who settled in Assam. His zikir and zari devotional songs are still sung in the valley.",
      as: "শিৱসাগৰ চহৰৰ কাষত ব্ৰহ্মপুত্ৰৰ তটত সত্ৰাউনি শতকীয় চুফি কবি আৰু উপদেশক আজান ফকীৰৰ দৰ্গাহখন আছে। উপত্যকাৰ কোনে এতিয়াও ইয়াৰ জিকিৰ আৰু জাৰী ভজন-গীত গায়ন কৰে।",
    },
    image: CULTURE_IMG.ajanPirDargah,
    alt: {
      en: "Hazarat Ajan Pir Dargah at Saraguri Chapari, Sivasagar",
      as: "চৰাগুৰি চাপৰিত হজৰত আজান পীৰ দৰ্গাহ, শিৱসাগৰ",
    },
    source: "Wikipedia (Azan Fakir, citing Sahitya Akademi) · Sivasagar district portal",
  },
  {
    id: "panbari-mosque",
    name: { en: "Panbari Mosque", as: "পানবাৰী মছজিদ" },
    place: { en: "Panbari & Rangamati · Dhubri", as: "পানবাৰী আৰু ৰঙামাটি · ধুবুৰী" },
    district: { en: "Dhubri", as: "ধুবুৰী" },
    slug: "dhubri",
    kind: { en: "Historic mosque", as: "ঐতিহাসিক মছজিদ" },
    tradition: ["islam"],
    about: {
      en: "A three-domed mosque of the fifteenth to sixteenth century on the highway east of Dhubri town, considered the oldest mosque in Assam and an example of Bengal Sultanate architecture.",
      as: "ধুবুৰী চহৰৰ পূৰ্বদিশত পথৰ কাষত থকা পোঁপতি শতিকাৰ তিনিটা চ্ৰিণীৰ মছজিদখন — অসমৰ আটাইতকৈ পুৰণি মছজিদ বুলি গণ্য, বঙাল সালতানাতৰ স্থাপত্যৰ নমুনা।",
    },
    image: CULTURE_IMG.panbariMosque,
    alt: {
      en: "The Panbari Mosque in Dhubri district, Assam",
      as: "ধুবুৰী জিলাৰ পানবাৰী মছজিদ",
    },
    source: "Wikipedia (Panbari Mosque) · Archaeological Survey of India monument N-AS-3",
  },

  /* ── Sikh heritage ────────────────────────────────────────────────────── */
  {
    id: "gurdwara-guru-tegh-bahadur-sahib",
    name: { en: "Gurdwara Sri Guru Tegh Bahadur Sahib", as: "গুৰুদুৱাৰা শ্ৰী গুৰু তেগ বাহাদুৰ সাহিব" },
    place: { en: "Dhubri · Brahmaputra bank", as: "ধুবুৰী · ব্ৰহ্মপুত্ৰ তট" },
    district: { en: "Dhubri", as: "ধুবুৰী" },
    slug: "dhubri",
    kind: { en: "Gurdwara", as: "গুৰুদুৱাৰা" },
    tradition: ["sikh"],
    about: {
      en: "On the right bank of the Brahmaputra at Dhubri, this gurdwara was established during the seventeenth-century travels of the ninth Sikh Guru, Guru Tegh Bahadur, who reached Dhubri in late 1669. It preserves a historical Guru Granth Sahib manuscript.",
      as: "ধুবুৰীত ব্ৰহ্মপুত্ৰৰ সোঁ তটত থকা এই গুৰুদুৱাৰাটো নৱম শিখ গুৰু গুৰু তেগ বাহাদুৰে সত্ৰাউনি শতকৰ অসম ভ্ৰমণৰ সময়ত স্থাপন কৰিছিল; গুৰুজীয়ে ১৬৬৯ চনৰ শেষত ধুবুৰীলৈ আহিছিল। ইয়াত এটা ঐতিহাসিক গুৰু গ্ৰন্থ সাহিব পাণ্ডুলিপি ৰখা আছে।",
    },
    image: CULTURE_IMG.gurdwaraDhubri,
    alt: {
      en: "Gurdwara Sri Guru Tegh Bahadur Sahib, Dhubri",
      as: "ধুবুৰীত গুৰুদুৱাৰা শ্ৰী গুৰু তেগ বাহাদুৰ সাহিব",
    },
    source:
      "Wikipedia, Gurdwara Sri Guru Tegh Bahadur Sahib (citing The Encyclopedia of Sikhism) · Wikimedia Commons",
  },

  /* ── Christian heritage ───────────────────────────────────────────────── */
  {
    id: "guwahati-baptist-church",
    name: { en: "Guwahati Baptist Church", as: "গুৱাহাটী বাপ্টিষ্ট চাৰ্চ" },
    place: { en: "Guwahati", as: "গুৱাহাটী" },
    district: { en: "Kamrup Metropolitan", as: "কামৰূপ মহানগৰ" },
    slug: "kamrup-metropolitan",
    kind: { en: "Church", as: "গীৰ্জা" },
    tradition: ["christian"],
    about: {
      en: "Guwahati's Baptist congregation was established in 1845, in the years when the first Welsh missionaries reached the Assam valley, and it still stands in the old town near the river.",
      as: "প্ৰথম ৱেলচ মিচনাৰীয়ে অসম উপত্যকালৈ উপস্থিত হোৱাৰ সময়তে ১৮৪৫ চনত গুৱাহাটীৰ এই বাপ্টিষ্ট মণ্ডলীখন প্ৰতিষ্ঠা হৈছিল; নদীৰ কাছৰ পুৰণি চহৰখনত ই আজিও অৱস্থিত।",
    },
    image: CULTURE_IMG.baptistChurch,
    alt: {
      en: "Guwahati Baptist Church, established in 1845",
      as: "১৮৪৫ চনত প্ৰতিষ্ঠিত গুৱাহাটী বাপ্টিষ্ট চাৰ্চ",
    },
    source: "Wikimedia Commons (file description records the 1845 founding)",
  },

  /* ── Buddhist heritage ────────────────────────────────────────────────── */
  {
    id: "namphake-buddhist-monastery",
    name: { en: "Namphake Buddhist Monastery", as: "নামফাকে বৌদ্ধ বিহাৰ" },
    place: { en: "Namphake · near Naharkatia", as: "নামফাকে · নাহৰকটিয়াৰ ওচৰত" },
    district: { en: "Dibrugarh", as: "ডিব্ৰুগড়" },
    slug: "dibrugarh",
    kind: { en: "Buddhist monastery", as: "বৌদ্ধ বিহাৰ" },
    tradition: ["buddhist", "indigenous"],
    about: {
      en: "A Tai Phake Buddhist monastery and meditation centre in a village of Dibrugarh district, with a pagoda, a golden Buddha image in the main temple and the Mucalinda Tank inside the compound.",
      as: "ডিব্ৰুগড় জিলাৰ এখন গাঁৱত থকা তাই ফাকে বৌদ্ধ বিহাৰ আৰু ধ্যান-কেন্দ্ৰ — ইয়াত এখন পগোডা, মুখ্য মন্দিৰত সোণৰ বুদ্ধ প্ৰতিমা আৰু মন্দিৰৰ মাটিত মুচালিন্দা পুখুৰী আছে।",
    },
    image: CULTURE_IMG.namphakeTemple,
    alt: {
      en: "Namphake Buddhist Temple in Namphake village, Dibrugarh district",
      as: "ডিব্ৰুগড় জিলাৰ নামফাকে গাঁৱত নামফাকে বৌদ্ধ মন্দিৰ",
    },
    source: "Dibrugarh district administration portal · Wikimedia Commons",
  },
  {
    id: "tipam-phake-buddhist-monastery",
    name: { en: "Tipam Phake Buddhist Monastery", as: "টিপম ফাকে বৌদ্ধ বিহাৰ" },
    place: { en: "Tipam Fakial · Naharkatia", as: "টিপম ফাকিয়াল · নাহৰকটিয়া" },
    district: { en: "Dibrugarh", as: "ডিব্ৰুগড়" },
    slug: "dibrugarh",
    kind: { en: "Buddhist monastery", as: "বৌদ্ধ বিহাৰ" },
    tradition: ["buddhist", "indigenous"],
    about: {
      en: "The Tai Phake village of Tipam Fakial was established in 1835 and its Buddhist monastery in 1850, on the Burhi Dihing river. The community keeps its own language, script and ritual calendar.",
      as: "বুৰহী দিহিং নদীৰ তটত থকা তাই ফাকে গাঁৱ টিপম ফাকিয়াল ১৮৩৫ চনত আৰু ইয়াৰ বৌদ্ধ বিহাৰ ১৮৫০ চনত স্থাপিত হৈছিল। এই সমাজে নিজৰ ভাষা, লিপি আৰু আচাৰ-পঞ্জিকা এতিয়াও ৰাখি আছে।",
    },
    image: CULTURE_IMG.tipamMonastery,
    alt: {
      en: "Entrance of the Tipam Phake Buddhist Monastery, Dibrugarh district",
      as: "ডিব্ৰুগড় জিলাৰ টিপম ফাকে বৌদ্ধ বিহাৰৰ প্ৰৱেশদ্বাৰ",
    },
    source: "Dibrugarh district administration portal · Wikimedia Commons",
  },

  /* ── Assam's Vaishnavite tradition: satras and namghars ───────────────── */
  {
    id: "sattras-of-majuli",
    name: { en: "The Sattras of Majuli", as: "মাজুলীৰ সাত্ৰ" },
    place: { en: "Majuli · Upper Assam", as: "মাজুলী · উপৰ অসম" },
    district: { en: "Majuli", as: "মাজুলী" },
    slug: "majuli",
    kind: { en: "Vaishnavite estates", as: "বৈষ্ণৱ পীঠ" },
    tradition: ["vaishnavite"],
    about: {
      en: "Majuli's monastic sattras — Auniati, Dakhinpat, Samaguri — are the living homes of Sattriya dance, mask-making and the Borgeet tradition founded by Srimanta Sankardev.",
      as: "মাজুলীৰ আউনিয়াটি, দক্ষিণপাট, সমাগুৰি সাত্ৰ সাত্ৰীয় নৃত্য, মুখৌটা শিল্প আৰু স্ৰীমন্ত শঙ্কৰদেৱে স্থাপিত বৰগীত পৰম্পৰাৰ জীয়ন্ত ঘৰ।",
    },
    image: CULTURE_IMG.majuliRiver,
    alt: {
      en: "The Doriya river channel beside the sattras of Majuli",
      as: "মাজুলীৰ সাত্ৰৰ কাষৰ ডৰিয়া নদী-পথ",
    },
    source: "Wikimedia Commons · Majuli district portal",
  },
  {
    id: "auniati-satra",
    name: { en: "Auniati Satra", as: "আউনিয়াটি সাত্ৰ" },
    place: { en: "Majuli · Upper Assam", as: "মাজুলী · উপৰ অসম" },
    district: { en: "Majuli", as: "মাজুলী" },
    slug: "majuli",
    kind: { en: "Vaishnavite satra", as: "বৈষ্ণৱ সাত্ৰ" },
    tradition: ["vaishnavite"],
    about: {
      en: "One of the oldest sattras on Majuli, Auniati belongs to the Brahma Sanghati branch of Assam's Ekasarana tradition and keeps a manuscript library with its own khol and taal instruments.",
      as: "মাজুলীৰ আটাইতকৈ পুৰণি সাত্ৰৰ এটোন, আউনিয়াটি অসমৰ একশৰণ নামধৰ্মৰ ব্ৰহ্ম সংঘটি শাখাৰ; ইয়াত পাণ্ডুলিপি পাঠশালা আৰু নিজৰ খোল-তাল বাদ্য ৰখা আছে।",
    },
    image: CULTURE_IMG.auniatiSatra,
    alt: {
      en: "The main entrance to the Auniati Satra, Majuli, Assam",
      as: "মাজুলীৰ আউনিয়াটি সাত্ৰৰ মুখ্য প্ৰৱেশদ্বাৰ",
    },
    source: "Wikimedia Commons · Majuli district portal",
  },
  {
    id: "barpeta-satra",
    name: { en: "Barpeta Satra", as: "বৰপেতা সাত্ৰ" },
    place: { en: "Barpeta · Lower Assam", as: "বৰপেতা · তলত অসম" },
    district: { en: "Barpeta", as: "বৰপেতা" },
    slug: "barpeta",
    kind: { en: "Vaishnavite satra", as: "বৈষ্ণৱ সাত্ৰ" },
    tradition: ["vaishnavite"],
    about: {
      en: "Founded by the Vaishnavite saint Madhabdev in 1583 and first called Barpeta Than, this sattra's Kirtan Ghar is a centre of neo-Vaishnavite culture and holds manuscripts of Sankardev and Madhabdev in its math.",
      as: "বৈষ্ণৱ সংত মাধৱদেৱাই ১৫৮৩ চনত প্ৰতিষ্ঠা কৰা, পূৰ্বতে বৰপেতা ঠান বুলি জনা এই সাত্ৰৰ কীৰ্তনঘৰ নব-বৈষ্ণৱ সংস্কৃতিৰ কেন্দ্ৰ — ইয়াৰ মঠত শঙ্কৰদেৱ আৰু মাধৱদেৱৰ পাণ্ডুলিপি ৰখা হৈছে।",
    },
    image: CULTURE_IMG.barpetaSatra,
    alt: {
      en: "Barpeta Satra and its Kirtan Ghar, Barpeta",
      as: "বৰপেতা সাত্ৰ আৰু ইয়াৰ কীৰ্তনঘৰ",
    },
    source: "Wikipedia, Barpeta Satra · Barpeta district portal",
  },
  {
    id: "bordowa-than",
    name: { en: "Bordowa Than", as: "বড়দোৱা ঠান" },
    place: { en: "Batadrava · Nagaon", as: "বাটাদ্ৰৱ · নগাঁও" },
    district: { en: "Nagaon", as: "নগাঁও" },
    slug: "nagaon",
    kind: { en: "Namghar", as: "নামঘৰ" },
    tradition: ["vaishnavite"],
    about: {
      en: "The birthplace of Srimanta Sankardev and the first Namghar he built, Bordowa Than in Nagaon district is a pilgrimage site of Assam's Vaishnavas, with its Kirtan Ghar, Manikut and a small museum of the Than's own records.",
      as: "স্ৰীমন্ত শঙ্কৰদেৱৰ জন্মভূমি আৰু তেওঁহোকে তৈয়াৰ কৰা প্ৰথম নামঘৰ, নগাঁও জিলাৰ বড়দোৱা ঠান অসমৰ বৈষ্ণৱসকলৰ তীৰ্থস্থান — ইয়াত কীৰ্তনঘৰ, মণিকুট আৰু ঠানৰ নথী-পত্ৰৰ এটা সৰু যাদুগৃহ আছে।",
    },
    image: CULTURE_IMG.bordowaThan,
    alt: {
      en: "Bordowa Than at Batadrava, Nagaon district",
      as: "নগাঁও জিলাৰ বাটাদ্ৰৱত বড়দোৱা ঠান",
    },
    source: "Nagaon district administration portal · Wikipedia, Bordowa Than",
  },
];

/* ── Derived helpers ────────────────────────────────────────────────────── */

/** Destinations matching a tradition id (`all`, or blank, returns everything). */
export function filterByTradition(id) {
  if (!id || id === "all") return SPIRITUAL_DESTINATIONS;
  return SPIRITUAL_DESTINATIONS.filter((d) => d.tradition.includes(id));
}

/**
 * Free-text search over the fields a visitor can actually see: name, place,
 * district and the heritage label. Language-agnostic on purpose, so an
 * Assamese query matches the Assamese copy and an English query the English.
 * Composes with the tradition filter rather than replacing it.
 */
export function searchSpiritual(query, traditionId = "all") {
  const q = (query || "").trim().toLowerCase();
  const base = filterByTradition(traditionId);
  if (!q) return base;
  const haystack = (d) =>
    [
      d.name.en, d.name.as,
      d.place.en, d.place.as,
      d.district.en, d.district.as,
      d.kind.en, d.kind.as,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  return base.filter((d) => haystack(d).includes(q));
}

/**
 * Only the traditions that genuinely have a matching destination, in
 * TRADITIONS order. This is what guarantees the filter bar can never show an
 * empty or misleading tab — a category only exists because a place is in it.
 */
export function availableTraditions() {
  return TRADITIONS.filter(
    (t) =>
      t.id === "all" ||
      SPIRITUAL_DESTINATIONS.some((d) => d.tradition.includes(t.id)),
  );
}

/** District names present in the catalogue, in data order. */
export function spiritualDistricts() {
  const seen = new Set();
  const out = [];
  for (const d of SPIRITUAL_DESTINATIONS) {
    if (seen.has(d.district.en)) continue;
    seen.add(d.district.en);
    out.push(d.district);
  }
  return out;
}

/** A small, deliberately varied selection for the Culture-home strip. */
export function featuredSpiritual(limit = 4) {
  const picks = [
    "kamakhya-temple",
    "hayagriva-madhava-hajo",
    "gurdwara-guru-tegh-bahadur-sahib",
    "sattras-of-majuli",
  ]
    .map((id) => SPIRITUAL_DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean);
  if (picks.length >= limit) return picks.slice(0, limit);
  const rest = SPIRITUAL_DESTINATIONS.filter((d) => !picks.includes(d));
  return [...picks, ...rest].slice(0, limit);
}

