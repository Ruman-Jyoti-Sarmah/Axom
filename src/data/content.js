const w = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const BRAND = {
  name: { en: "AXOM", as: "অসম" },
  tagline: {
    en: "Discover Assam — Land of the Red River & Blue Hills",
    as: "অসম চিনক — লাল নদী আৰু নীলা পাহাৰৰ দেশ",
  },
  established: { en: "ASSAM · INDIA · OFFICIAL CULTURAL PORTAL", as: "অসম · ভাৰত · আনুষ্ঠানিক সাংস্কৃতিক পোৰ্টাল" },
};

export const NAV = [
  { label: "The Heritage", href: "#architecture" },
  { label: "Stays", href: "#suites" },
  { label: "Cuisine", href: "#dining" },
  { label: "Experiences", href: "#experiences" },
  { label: "Districts", href: "#/districts" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#location" },
];

export const HERO = {
  image: "/img/hero-brahmaputra.jpg",
  alt: {
    en: "Golden sunset over the mighty Brahmaputra river in Guwahati, Assam",
    as: "গুৱাহাটী, অসমৰ প্ৰবল ব্ৰহ্মপুত্ৰ নদীয়ে সোণৰাস্তাৰ ৰূপ",
  },
  headline: [{ en: "DISCOVER", as: "চিনক" }, { en: "ASSAM", as: "অসম" }],
  support: {
    en:
      "Welcome to the official cultural gateway of Assam — explore 35 districts, living heritage, tea gardens and the mighty Brahmaputra.",
    as:
      "অসমৰ আনুষ্ঠানিক সাংস্কৃতিক সোমাইদুৱাৰলৈ স্বাগতম — ৩৫ জিলা, জীৱন্ত ঐতিহ্য, চাহ বাগান আৰু প্ৰবল ব্ৰহ্মপুত্ৰ অন্বেষণ কৰক।",
  },
  cta: { en: "Begin the Journey", as: "যাত্ৰা আৰম্ভ কৰক" },
};

export const INTRO = {
  label: { en: "CHAPTER 01 — THE ARRIVAL · NOMOSKAR", as: "অধ্যায় ০১ — আগমন · নমস্কাৰ" },
  lines: [
    { en: "WHERE ASSAM", as: "য'ত অসম" },
    { en: "MEETS", as: "মিলে" },
    { en: "TIMELESS SOUL", as: "কালজয়ী আত্মা" },
  ],
  image: w("Kamakhya Temple, Guwahati, Assam.jpg", 1600),
  imageAlt: {
    en: "Kamakhya Temple atop Nilachal Hill — heart of Shakti worship in Assam",
    as: "নীলাচল পাহাৰৰ মূৰত কামাখ্যা মন্দিৰ — অসমৰ শক্তি-পূজাৰ হৃদয়",
  },
  image2: w("Jaapi of Assam.jpg", 1200),
  image2Alt: {
    en: "Colourful Jaapi — traditional conical hat of Assam, symbol of honour",
    as: "ৰঙাৰ জাপী — অসমৰ পৰম্পৰাগত শঙালী টুপী, সন্মানৰ প্ৰতীক",
  },
  body: {
    en: "Every gamosa here is hand-woven with love. Every naam-ghosha still echoes from the sattras of Majuli. This is not a hotel. It is Axom — land of Bihu, tea, silk and the one-horned rhino.",
    as: "ইয়াত প্ৰতিজন গামোচা প্ৰেমেৰে হাতেৰে বোৱা। মাজুলীৰ সাত্ৰসমূহৰ পৰা এতিয়াও প্ৰতিটো নামঘোষা গুঞ্জুৰি আহে। এইটো হোটেল নহয়। এই অসম — বিহু, চাহ, ৰেশম আৰু একালো গঁড়ৰাগীৰ দেশ।",
  },
};

export const ARCHITECTURE = {
  label: { en: "CHAPTER 02 — THE HERITAGE · AHOM LEGACY", as: "অধ্যায় ০২ — ঐতিহ্য · আহোম ঐতিহ্য" },
  title: [
    { en: "CARVED BY AHOMS,", as: "আহোমসকলে খোদিত," },
    { en: "BLESSED BY KAMAKHYA", as: "কামাখ্যায়ে আশীৰ্বাদপ্ৰাপ্ত" },
  ],
  image: w("Kamakhya Temple, Guwahati.jpg", 1600),
  alt: {
    en: "Kamakhya Temple complex on Nilachal Hill glowing in morning light",
    as: "নীলাচল পাহাৰত ৰাতিপুৱাৰ পোহৰতে জিলিকিয়া কামাখ্যা মন্দিৰ পৰিযাল",
  },
  detail: w("Jaapi,Dhemaji.jpg", 1000),
  detailAlt: { en: "Assorted traditional Jaapi hats of Dhemaji, Assam", as: "ধেমাজী, অসমৰ বিভিন্ন পৰম্পৰাগত জাপী" },
  paragraphs: [
    {
      en: "Six hundred years of Ahom glory. Rang Ghar, Talatal Ghar, Kareng — Asia's oldest amphitheatre of kings.",
      as: "ছয়শ বছৰৰ আহোম ঐতিহ্য। ৰংঘৰ, তলাতাল ঘৰ, কাৰেং — এছিয়াৰ আটাইতকৈ পুৰণি ৰাজাসকলৰ অম্ফিথিয়েটাৰ।",
    },
    {
      en: "The estate unfolds like a satra courtyard — each threshold revealing bamboo, water, jaapi and sky, just as Srimanta Sankardev imagined.",
      as: "এই স্থান সাত্ৰৰ পোहৰৰ দৰে খোলে — প্ৰতিটো প্ৰৱেশদ্বাৰে বাঁহ, পানী, জাপী আৰু আকাশ প্ৰকাশ কৰে, ঠিক স্ৰীমন্ত শঙ্কৰদেৱে কল্পনা কৰা দৰে।",
    },
  ],
};

export const SUITES = [
  { id: "01", name: { en: "The Kaziranga Den", as: "কাজিৰংগাৰ গুহা" }, kind: { en: "Jungle Lodge · 120 m²", as: "জংগল লজ · ১২০ বৰ মিটাৰ" }, image: w("Indian rhinoceros in Kaziranga National Park March 2025 by Tisha Mukherjee 06.jpg", 1600), alt: { en: "One-horned rhino in Kaziranga", as: "কাজিৰংগাৰ একালো গঁড়ৰাগী" } },
  { id: "02", name: { en: "The Majuli Retreat", as: "মাজুলীৰ আশ্ৰয়" }, kind: { en: "River Island Cottage · 95 m²", as: "নদীয় দ্বীপৰ কুটী · ৯৫ বৰ মিটাৰ" }, image: w("Majuli, the river island of Assam.jpg", 1600), alt: { en: "Wetlands of Majuli river island", as: "মাজুলী নদীয় দ্বীপৰ জল-ভূমি" } },
  { id: "03", name: { en: "The Tea Garden House", as: "চাহ বাগানৰ ঘৰ" }, kind: { en: "Dibrugarh Bungalow · 72 m²", as: "ডিব্ৰুগড় বংগলা · ৭২ বৰ মিটাৰ" }, image: w("Plucking tea in a tea garden of Assam.jpg", 1600), alt: { en: "Tea pluckers in Assam garden", as: "অসম বাগানত চাহ তোলা কামৰী" } },
  { id: "04", name: { en: "The Brahmaputra Suite", as: "ব্ৰহ্মপুত্ৰ ছুইট" }, kind: { en: "Riverfront Residence · 260 m²", as: "নদীয় কিনাৰৰ নিবাস · ২৬০ বৰ মিটাৰ" }, image: w("Sunset at Lachit ghat, Guwahati.jpg", 1600), alt: { en: "Ferry at Lachit Ghat at sunset", as: "ৰূপ অৱস্থাত লাচিট ঘাটত বোট" } },
];


export const DINING = {
  label: { en: "CHAPTER 03 — THE TABLE · AXOMIYA PAAT", as: "অধ্যায় ০৩ — টেবুল · অসমীয়া পাত" },
  title: [
    { en: "A FEAST SERVED", as: "পৰিৱেশন কৰা" },
    { en: "ON BANANA & BELL-METAL", as: "কলিপাত আৰু কাহৰত" },
  ],
  image: w("Assamese Thali (Jorhat).JPG", 1600),
  alt: { en: "Traditional Assamese thali on bell-metal", as: "কাহৰত পৰম্পৰাগত অসমীয়া থলী" },
  image2: w("Assamese food thali.jpg", 1200),
  image2Alt: { en: "Assamese cuisine on copper plate", as: "তামাৰ প্লেটত অসমীয়া ৰন্ধনশৈলী" },
  body: {
    en: "From sour Masor Tenga to silky Khar, duck with bamboo shoot and til-pitha — recipes from Ahom kitchens and satra refectories, served on kahor bell-metal.",
    as: "টক মাছৰ টেঙাৰ পৰা মুঘলীয়া খাৰলৈ, বাঁহৰ কঁৰাৰ হাঁহ আৰু তিল-পিঠা — আহোম ৰান্ধিঘৰ আৰু সাত্ৰৰ ভজনাগাৰৰ ৰেছিপি, কাহৰ বেল-মেটেলত পৰিৱেশন কৰা হয়।",
  },
  menuHighlights: [
    { en: "Khar, masor tenga & joha rice", as: "খাৰ, মাছৰ টেঙা আৰু জোৱা চাউল" },
    { en: "Haanh with bamboo shoot, Ahom duck curry", as: "বাঁহৰ কঁৰাৰ হাঁহ, আহোম হাঁহৰ তৰকাৰী" },
    { en: "Til-pitha, narikol laru & payas", as: "তিল-পিঠা, নাৰিকলৰ লাৰু আৰু পায়স" },
  ],
};

export const EXPERIENCES = [
  { name: "The Bihu Courtyard", detail: "Rongali rhythms — dhol, pepa, gogona", image: w("Bihu-Dance-assam.jpg", 1200), alt: "Bihu dancers in muga silk" },
  { name: "The Kaziranga Safari", detail: "Dawn trails to meet the one-horned greats", image: w("Indian rhinoceros in Kaziranga National Park March 2025 by Tisha Mukherjee 10.jpg", 1200), alt: "Rhino in Kaziranga grasslands" },
  { name: "The Masks of Majuli", detail: "Sattriya dance and sattras mask-makers", image: w("The Masks of Majuli (94770).jpg", 1200), alt: "Bhaona masks of Majuli" },
  { name: "The Tea Garden Morning", detail: "Pluck two leaves and a bud with garden family", image: w("Female workers at a tea Garden of Assam.jpg", 1200), alt: "Tea workers plucking leaves" },
  { name: "The Brahmaputra Cruise", detail: "Sunset ferry past Saraighat and Umananda", image: w("This scenic sunset view is captured over the Brahmaputra River in Guwahati, Assam, India.jpg", 1200), alt: "Sunset over Brahmaputra Guwahati" },
  { name: "The Gamosa Atelier", detail: "Muga, eri & pat silk on taat-xaal loom", image: w("Taat xaal 2.jpg", 1200), alt: "Taat-xaal handloom of Assam" },
];

export const GALLERY = [
  { image: w("Kamakhya Temple, Guwahati, Assam.jpg", 1400), alt: "Kamakhya Temple", caption: "Kamakhya Devalaya, Dawn Aarti" },
  { image: w("Indian rhinoceros in Kaziranga National Park March 2025 by Tisha Mukherjee 06.jpg", 1000), alt: "Rhino Kaziranga", caption: "Kaziranga, 6:42 AM" },
  { image: w("Assamese Thali (Jorhat).JPG", 1400), alt: "Assamese thali", caption: "The Banana-Leaf Feast" },
  { image: w("Bihu dance.jpg", 1000), alt: "Bihu celebration", caption: "Rongali Bihu, Courtyard IV" },
  { image: w("This scenic sunset view is captured over the Brahmaputra River in Guwahati.jpg", 1400), alt: "Brahmaputra sunset", caption: "The Luit, Golden Hour" },
  { image: w("Majuli, the river island of Assam.jpg", 1000), alt: "Majuli wetlands", caption: "Majuli, Monsoon" },
  { image: w("Jaapi of Assam.jpg", 1200), alt: "Jaapi craft", caption: "Jaapi, Honour of Axom" },
];

export const LOCATION = {
  title: ["FORTY MINUTES FROM", "THE BRAHMAPUTRA"],
  body: "Axom rests on the Saraighat banks in Guwahati — forty minutes from the airport and five centuries deep in Ahom memory, facing Umananda island.",
  facts: [
    { k: "BY AIR", v: "Gopinath Bordoloi Airport (GAU) · 25 km" },
    { k: "BY ROAD", v: "Private ferry + transfer via Saraighat" },
    { k: "COORDINATES", v: "26.18° N · 91.75° E — Guwahati" },
    { k: "BEST SEASON", v: "October — March · Bihu in April" },
  ],
};

export const FINALE = {
  image: w("Indian rhinoceros in Kaziranga National Park March 2025 by Tisha Mukherjee 02.jpg", 1600),
  alt: "One-horned rhino at dusk in Kaziranga — pride of Assam",
  title: ["PLAN YOUR", "VISIT TO ASSAM"],
};


export const ZUBEEN_GARG = {
  image: w(
    "Portrait of Zubeen Garg the Legendary Singer, Composer, Actor, Music Director, Poet of Assam by Sanjib Borah Artist.jpg",
    800
  ),
  alt: "Zubeen Garg — Assam's legendary singer",
  name: "Zubeen Garg",
  subtitle: "The Voice of Assam",
  born: "18 November 1972",
  bornAt: "Tura, Meghalaya, India",
  died: "19 September 2025",
  diedAt: "Singapore",
  age: 52,
  roles: ["Singer", "Composer", "Lyricist", "Actor", "Director", "Musician"],
  albums: ["Anamika (1992)", "Mayabini", "Ujan Piriti", "Mission China (2017)"],
  songs: ["Ya Ali (Gangster, 2006)", "Dil Tu Hi Bataa (Krrish 3)", "Mayabini", "Boku Duru Duru", "Gaane Ki Aane"],
  award: "National Film Award — Best Male Playback (Mayabini)",
  legacy:
    "A defining cultural figure of modern Assam, spanning Assamese popular music, Bihu, Bengali and Hindi cinema for over three decades.",
  diedNote:
    "Died in Singapore on 19 September 2025, aged 52, while performing at the Northeast Festival — an unprecedented wave of mourning across Assam.",
};

export const assamArtists = [
  {
    image: w("Dr. Bhupen Hazarika, Assam, India.jpg", 700),
    name: "Bhupen Hazarika",
    born: "1926",
    died: "2011",
    knownFor: "Singer · Songwriter · Filmmaker · National Poet of Assam",
    bio: "Mahapurush Bhupen Hazarika is Assam's most celebrated cultural icon. Composer of 'Jiyori', 'O Mor Apunar Dekh' and 'Bhey Bhikhari', he carried Assam's pain and pride to the nation and beyond.",
  },
  {
    image: w("Bishnu Prasad Rabha 2009 stamp of India.jpg", 700),
    name: "Bishnu Prasad Rabha",
    born: "1909",
    died: "1969",
    knownFor: "Singer · Composer · Actor · Sattriya revivalist",
    bio: "Rupkonwar Bishnu Prasad Rabha shaped modern Assamese culture — music, drama, the Sattriya renaissance and the Assam trunk road (BRT). A true Renaissance man of Assam.",
  },
  {
    image: w("Jyoti Prasad Agarwala.jpg", 700),
    name: "Jyoti Prasad Agarwala",
    born: "1903",
    died: "1961",
    knownFor: "Director · Playwright · Lyricist · Pioneer of Assamese cinema",
    bio: "The first filmmaker of Assam — directed, wrote and composed the first Assamese feature film 'Joymati' (1935) and wrote the classic 'Jiyori'. A colossus of Assamese literature and theatre.",
  },
  {
    image: w("Dr. Anima Choudhury.jpg", 700),
    name: "Dr. Anima Choudhury",
    born: "1932",
    died: "",
    knownFor: "Singer · Musicologist · Borgeet tradition",
    bio: "A rare living link to Assam's sacred musical heritage — a noted vocalist of Borgeets and Manipuri music, carrying forward the musical lineage of Assam's greatest tradition.",
  },
  {
    image: w(
      "Portrait of Zubeen Garg the Legendary Singer, Composer, Actor, Music Director, Poet of Assam by Sanjib Borah Artist.jpg",
      700
    ),
    name: "Zubeen Garg",
    born: "1972",
    died: "2025",
    knownFor: "Singer · Songwriter · Actor · Filmmaker · Multi-instrumentalist",
    bio: "Over three decades, Zubeen Garg defined a generation of Assamese music — from the Bihu anthem 'Mayabini' and 'Ya Ali' in Hindi cinema to Assamese films like 'Mission China'. A global voice of Assamese soul.",
  },

  {
    image: w("Sankaradeva.jpg", 700),
    name: "Srimanta Sankardev",
    born: "1449",
    died: "1568",
    knownFor: "Saint · Scholar · Dance · Music · Theatre",
    bio: "The 15th-century saint, poet and playwright who unified Assam under Vaishnavism — founder of Sattriya dance, Borgeet and the Bhaona theatre.",
  },
  {
    image: w("Krishnakahi Kashyap performing Sattriya Dance.jpg", 700),
    name: "Mahapurush Madhavdeva",
    born: "1489",
    died: "1596",
    knownFor: "Singer · Composer · Poet",
    bio: "The soul of Assamese devotional music — composed the Bhawaiya and Borgeet, and wrote the devotional play Patassara.",
  },
  {
    image: w("Laksminath Bezbaruah.jpg", 700),
    name: "Lakshminath Bezbaroa",
    born: "1864",
    died: "1938",
    knownFor: "Poet · Playwright · 'O Mur Apunar Dekh'",
    bio: "Assam's national poet, writer and journalist — author of the state song 'O Mur Apunar Dekh' and the iconic 'Joi Aai Axom'.",
  },
  {
    image: w("Bihu Dance 2.jpg", 700),
    name: "Sheila K. Bharali",
    born: "1960",
    died: "",
    knownFor: "Singer · Composer · Cultural Revivalist",
    bio: "A powerful voice of contemporary Assamese folk and patriotic songs, carrying the Bihu and folk traditions forward.",
  },
];

export const assamHighlights = [
  { icon: "🦏", text: { en: "Greater one-horned rhinoceros — the State Animal, roaming Kaziranga & Pobitora.", as: "বেশি মূৰ-একালো গঁড় — ৰাজ্যিক প্ৰাণী, কাজিৰংগা আৰু পবিতৰাত বিচৰণ কৰে।" } },
  { icon: "🦆", text: { en: "White-winged wood duck — the State Bird, a prized wetland species of Manas.", as: "বগা-পাখী শ্বেত পিছা — ৰাজ্যিক চৰাই, মানসৰ মূল্যৱান জল-অঞ্চলৰ প্ৰজাতি।" } },
  { icon: "🌸", text: { en: "Foxtail orchids (Kopou phul) — the State Flower, essential to Bihu dance offerings.", as: "কপৌ ফুল — ৰাজ্যিক ফুল, বিহু নৃত্যত অহা উৎসৱীয় নৈবেদ্য।" } },
  { icon: "🌳", text: { en: "Hollong — the State Tree, the royal tree of Assam (Dipterocarpus macrocarpus).", as: "হ'লং — ৰাজ্যিক গছ, অসমৰ ৰাজকীয় গছ (ডিপ্টেৰ'কাৰ্পাছ মেক্ৰ'কাৰ্পাছ)।" } },
  { icon: "💃", text: { en: "Bihu Dance — the State Dance, performed with Bhaonas & Bihu Garbs.", as: "বিহু নৃত্য — ৰাজ্যিক নৃত্য, ভাওনা আৰু বিহু গৰ্বৰ সৈতে নৃত্যমান।" } },
  { icon: "🎊", text: { en: "Bihu — the State Festival, Rongali Bihu marks the Assamese New Year.", as: "বিহু — ৰাজ্যিক উৎসৱ, ৰঙালী বিহুৱে অসমীয়া নববৰ্ষৰ সূচনা দিয়ে।" } },
  { icon: "🎵", text: { en: "O Mur Apunar Dekh — the State Song, penned by Lakshminath Bezbaroa.", as: "অ' মোৰ অপুনাৰ দেশ — ৰাজ্যিক গান, লক্ষ্মীনাথ বেজবৰুৱাৰ রচনা।" } },
  { icon: "✨", text: { en: "Joi Aai Axom — the State Motto, 'Hail mother Assam'.", as: "জয় আই অসম — ৰাজ্যিক আদৰ্ষ, 'জয় মা অসম'।" } },
  { icon: "🗣️", text: { en: "Assamese (Axomiya) — the State Language & Literary Society.", as: "অসমীয়া (আখমীয়া) — ৰাজ্যিক ভাষা আৰু সাহিত্য-সমাজ।" } },
  { icon: "🍲", text: { en: "Assamese thali & Khar — the State Food, Assam's iconic sour-salted cuisine.", as: "অসমীয়া থলী আৰু খাৰ — ৰাজ্যিক খাদ্য, অসমৰ পৰিচিত টক-নুনীয়া ৰন্ধনশৈলী।" } },
  { icon: "🍋", text: { en: "Kaji Nemu — the State Fruit, a GI-tagged lemon of Assam (declared 2024).", as: "কাজি নেমু — ৰাজ্যিক ফল, অসমৰ জিআই-পতাকাযুক্ত নেমু (২০২৪ ঘোষিত)।" } },
  { icon: "🏑", text: { en: "Field Hockey — the State Sport, Assam's most loved team game.", as: "ফিল্ড হকী — ৰাজ্যিক খেল, অসমৰ আটাইতকৈ প্ৰিয় দলীয় খেল।" } },
  { icon: "🌊", text: { en: "Brahmaputra — the State River, the lifeline of Assam.", as: "ব্ৰহ্মপুত্ৰ — ৰাজ্যিক নদী, অসমৰ জীৱনদায়িনী।" } },
];

export const assamFamous = [
  { name: "Kaziranga National Park", division: "North Assam", oneLiner: { en: "Home of the Indian rhinoceros — a UNESCO World Heritage Site.", as: "ভাৰতীয় গঁড়ৰাগীৰ নিজৰা স্থান — ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান।" } },
  { name: "Majuli", division: "Upper Assam", oneLiner: { en: "Asia's largest river island — the heart of Sattriya culture.", as: "এছিয়াৰ আটাইতকৈ ডাঙৰ নদীয় দ্বীপ — সাত্ৰীয় সংস্কৃতিৰ হৃদয়।" } },
  { name: "Sivasagar", division: "Upper Assam", oneLiner: { en: "The Ahom capital of the six-century Ahom dynasty.", as: "ছয় শতিকাৰ আহোম ৰাজবংশৰ ৰাজধানী।" } },
  { name: "Manas National Park", division: "North Assam", oneLiner: { en: "A UNESCO site & paradise for the Royal Bengal tiger & golden langur.", as: "এক ইউনেস্কো স্থান আৰু বেংগাল বাঘ আৰু সোণালি হানুহৰ স্বৰ্গ।" } },
  { name: "Dibru-Saikhowa", division: "Upper Assam", oneLiner: { en: "A vast monograph of wetlands, sandbars and rare wildlife.", as: "জল-ভূমি, বালিতণ আৰু দুৰ্লভ বন্য প্ৰাণীৰ বিশাল আবাস।" } },
  { name: "Nameri National Park", division: "North Assam", oneLiner: { en: "Famous for hornbills, white-winged wood ducks and terrain trails.", as: "ৰাজহংচ, বগা-পাখী আৰু প্রাকৃতিক পথৰ বাবে পৰিচিত।" } },
  { name: "Guwahati", division: "Lower Assam", oneLiner: { en: "Saraighat's city — the gateway, with Umananda & the Brahmaputra.", as: "শৰাইঘাটৰ নগৰ — উমানন্দা আৰু ব্ৰহ্মপুত্ৰৰ সৈতে সোমাইদুৱাৰ।" } },
];

/** State food of Assam — signature dishes of the Brahmaputra belt. */
export const ASSAM_FOOD = [
  {
    name: "Khar",
    sort: { en: "The soul of an Assamese meal", as: "অসমীয়া ভোজৰ আত্মা" },
    about: { en: "A plain-sour dish made with roasted salt and the alkali of shpapa leaves — served at every Assamese table, it opens the meal.", as: "পোড়া লোণ আৰু শপা-পাতৰ ক্ষাৰে তৈয়াৰিক অসমীয়া খাদ্য — প্ৰতিটো অসমীয়া টেবুলত ইয়াক ভোজ আৰম্ভ কৰি দিয়া হয়।" },
    image: "Khar.jpg",
    alt: { en: "Khar, the signature sour dish of Assamese cuisine", as: "খাৰ, অসমীয়া ৰন্ধনশৈলীৰ পৰিচিত টক খাদ্য" },
  },
  {
    name: "Masor Tenga",
    sort: { en: "The everyday classic", as: "নিত্যৰ পৰিচিত খাদ্য" },
    about: { en: "Sour curd curry — Assam's most beloved everyday dish, with milk pulled from the tea gardens.", as: "টক তেঁতা মাছৰ তৰকাৰী — চাহ বাগানৰ দুধে তৈয়াৰিক, অসমৰ আটাইতকৈ প্ৰিয় নিত্য খাদ্য।" },
    image: "Masor Tenga.jpg",
    alt: { en: "Masor Tenga, the sour curd curry of Assam", as: "মাছৰ টেঙা, অসমৰ টক তেঁতা তৰকাৰী" },
  },
  {
    name: "Pigu",
    sort: { en: "Riverine delicacy", as: "নদীয় বিবিধ স্বাদ" },
    about: { en: "Fermented fish from the riverine lowlands — a prized, deeply savoury taste of the Brahmaputra belt.", as: "নদীয় সমভূমিৰ তেমি মাছ — ব্ৰহ্মপুত্ৰৰ আঁচলৰ এটা মূল্যৱান, গভীৰ ৰুচিকৰ খাদ্য।" },
    image: "Pigu.jpg",
    alt: { en: "Pigu, fermented fish of Assam", as: "পিগু, অসমৰ তেমি মাছ" },
  },
  {
    name: "Bamboo shoot (Khoa / Khoi)",
    sort: { en: "Seasonal hill staple", as: "ঋতুগত পাহাৰীৰ খাদ্য" },
    about: { en: "Stewed tender bamboo shoot, fragrant with mustard oil — the taste of Assam's hills at every meal.", as: "সাৰিয়েই তেলেৰ সুগন্ধে ৰান্ধা কোমল বাঁহ — অসমৰ পাহাৰৰ স্বাদ প্ৰতিটো ভোজত।" },
    image: "Bamboo shoot.jpg",
    alt: { en: "Stewed bamboo shoot of Assam", as: "অসমৰ ৰান্ধা বাঁহৰ কঁৰা" },
  },
  {
    name: "Til-pitha · Narikol laru · Payas",
    sort: { en: "Sweet tradition", as: "মিঠাৰ পৰম্পৰা" },
    about: { en: "Steamed sweets on banana leaves for Bihu and every celebration — rice, coconut and milk in every guise.", as: "বিহু আৰু প্ৰতিটো উৎসৱত কলিপাতত বাপৰা মিঠাই — চাউল, নাৰিকল আৰু গাখীৰৰ বিভিন্ন ৰূপ।" },
    image: "Til pitha.jpg",
    alt: { en: "Assamese sweets on banana leaves", as: "কলিপাতত অসমীয়া মিঠাই" },
  },
  {
    name: "Assamese Thali",
    sort: { en: "The full feast", as: "সম্পূৰ্ণ ভোজ" },
    about: { en: "Khar, masor tenga, duck with bamboo shoot and rice served on banana leaf — the complete Assamese table.", as: "খাৰ, মাছৰ টেঙা, বাঁহৰ কঁৰাৰ হাঁহ আৰু ভাত কলিপাতত পৰিৱেশন — সম্পূৰ্ণ অসমীয়া ভোজ।" },
    image: "Assamese Thali (Jorhat).JPG",
    alt: { en: "The traditional Assamese thali on banana leaf", as: "কলিপাতত পাৰম্পৰিক অসমীয়া থলী" },
  },
];

export const ASSAM_CULTURE = [
  { name: "Rongali Bihu (Bohag Bihu)", kind: { en: "Spring · April", as: "বসন্ত · এপ্ৰিল" }, about: { en: "The Assamese New Year — drum, dance and the gamosa, celebrated for seven days across the state.", as: "অসমীয়া নববৰ্ষ — ঢোল, নৃত্য আৰু গামোচাৰ সৈতে ৰাজ্যজুৰে সাত দিনৰ উৎসৱ।" } },
  { name: "Kati Bihu", kind: { en: "Autumn · October", as: "শৰৎ · অক্টোবৰ" }, about: { en: "A festival of light for the standing crops, with the kamdi puja and flickering earthen lamps.", as: "থিয় হৈ থকা শস্যৰ বাবে পোহৰৰ উৎসৱ — কাঁদি পূজা আৰু জ্বলি থকা মাটিৰ চকী সহিত।" } },
  { name: "Magh Bihu", kind: { en: "Winter · January", as: "শীত · জানুৱাৰী" }, about: { en: "The harvest festival with bigeti (cane rice), curd rice and the feast that ends the season.", as: "শস্যৰ উৎসৱ — বিঘেটি (বাঁহৰ ভাত), দই-ভাত আৰু ঋতু শেষ কৰা ভোজ।" } },
  { name: "Sattriya — the State Dance", kind: { en: "Living tradition", as: "জীৱন্ত পৰম্পৰা" }, about: { en: "Born in the sattras of Majuli, a classical dance-drama of Srimanta Sankardev, performed here still.", as: "মাজুলীৰ সাত্ৰত জন্মাৰ বোধ কৰা, স্ৰীমন্ত শঙ্কৰদেৱৰ শাস্ত্ৰীয় নৃত্য-নাটক, এতিয়াও ইয়াত উপস্থাপিত হয়।" } },
  { name: "Borgeet & Kirtan", kind: { en: "Sacred music", as: "পৱিত্ৰ সংগীত" }, about: { en: "The devotional songs of Sankardev and Madhavdeva sung at naamghars and sattras across Assam.", as: "শঙ্কৰদেৱ আৰু মাধৱদেৱৰ ভক্তি গীত — অসমজুৰি নামঘৰ আৰু সাত্ৰত গাওঁকা হয়।" } },
  { name: "Ali-Ai-Ligang", kind: { en: "Spring · rural", as: "বসন্ত · গ্ৰাম্য" }, about: { en: "The spring sowing festival of the Bodo people — drum, song and the joy of the land.", as: "বড়ো জনগোষ্ঠীৰ বসন্ত বীজ বপন উৎসৱ — ঢোল, গান আৰু মাটিৰ আনন্দ।" } },
  { name: "Dogri — the Karbi festival", kind: { en: "Spring · hills", as: "বসন্ত · পাহাৰ" }, about: { en: "The new-year celebration of the Karbi folk with the bwenkavil and the rhythmic drum beat.", as: "কাৰ্বি জনগোষ্ঠীৰ নববৰ্ষ উৎসৱ — ভেঙ্কাভিল আৰু লয়বদ্ধ ঢোলৰ তালেৰ সৈতে।" } },
];

export const ASSAM_HANDICRAFTS = [
  { name: "Muga silk", kind: { en: "Golden silk", as: "সোণীয় ৰেশম" }, about: { en: "The rare gold silk of Assam, a GI-tagged treasure woven in Titabar and Nahoripathar.", as: "অসমৰ দুৰ্লভ সোণ ৰেশম — টিটাবৰ আৰু নহৰীপাথাৰত বোৱা জিআই-পতাকাযুক্ত সম্পদ।" } },
  { name: "Eri silk", kind: { en: "Peace silk", as: "শান্তি ৰেশম" }, about: { en: "The 'peace silk' of the hills — warm, creamy and used for mekhela-samel and rington.", as: "পাহাৰৰ 'শান্তি ৰেশম' — উষ্ণ, মুগ্ধ কৰা, মেখেলা-চাদৰ আৰু ৰিংচনত ব্যৱহৃত।" } },
  { name: "Pat silk", kind: { en: "Baltic silk", as: "বাল্টিক ৰেশম" }, about: { en: "Fine glossy silk from the Brahmaputra banks, worn in the Bihu and wedding ceremonies.", as: "ব্ৰহ্মপুত্ৰৰ তীৰৰ মিহলি চকমকা ৰেশম — বিহু আৰু বিয়াৰ অনুষ্ঠানে পিন্ধা হয়।" } },
  { name: "Gamosa & Jaapi", kind: { en: "Honorary cloth", as: "সন্মানৰ কাপোৰ" }, about: { en: "The white-red gamosa of honour and the conical jaapi hat — symbols of Assamese grace.", as: "সন্মানৰ বগা-ৰঙা গামোচা আৰু শঙালী জাপী টুপী — অসমীয়া মৰ্যাদাৰ প্ৰতীক।" } },
  { name: "Bell metal (Kahor)", kind: { en: "Metal craft", as: "ধাতু শিল্প" }, about: { en: "The hammered bell-metal of Assamese kitchens and sattra refectories, handed down for generations.", as: "অসমীয়া ৰান্ধিঘৰ আৰু সাত্ৰৰ ভোজনাগাৰৰ পিটা কাহৰ — পুৰুষানুপুৰুষ হাতৰ হাতত।" } },
  { name: "Bamboo & cane", kind: { en: "Weave craft", as: "বোনা শিল্প" }, about: { en: "Baskets, mats and furniture woven from the bamboo of the forests — daily craft of the villages.", as: "জাওবানৰ বাঁহৰে বোৱা টোকা, পাতীয়া আৰু ফাৰ্ণিচাৰ — গাঁৱৰ নিত্য শিল্প।" } },
  { name: "Terra-cotta & masks", kind: { en: "Art craft", as: "শিল্পকলা" }, about: { en: "Terracotta horses of Garhislal and the masks of Majuli, worn in the Bhaona dance-drama.", as: "গড়হিলালৰ মাটিৰ ঘোঁৰা আৰু মাজুলীৰ মুখৌটা — ভাওনা নৃত্য-নাটত পিন্ধা হয়।" } },
];
export const ASSAM_GUIDE = [
  { name: { en: "By air", as: "বায়ুপথে" }, about: { en: "Gopinath Bordoloi Airport (GAU), Guwahati — the gateway with direct flights to Delhi, Kolkata and Mumbai.", as: "গোপীনাথ বৰদলৈ বিমানবন্দৰ (GAU), গুৱাহাটী — দিল্লী, কলকাতা আৰু মুম্বাইলৈ পোনপটীয়া উড়ানৰ সৈতে সোমাইদুৱাৰ।" } },
  { name: { en: "By rail", as: "ৰেলপথে" }, about: { en: "Guwahati railway station connects to Delhi, Kolkata, Chennai and the North East via the far-east line.", as: "গুৱাহাটী ৰেলৱে ষ্টেচন দূৰ্বোর্ধ্ব ৰেখাৰ জৰিয়তে দিল্লী, কলকাতা, চেন্নাই আৰু উত্তৰ-পূৰ্বৰ সৈতে সংযুক্ত।" } },
  { name: { en: "By road", as: "ৰাস্তাপথে" }, about: { en: "Assam is linked to the rest of India by the Grand Trunk Road and National Highway 27; the river links the interiors.", as: "গ্রেণ্ড ট্ৰাংক ৰোড আৰু ৰাষ্ট্ৰীয় ছিংফাৰী ২৭-এ অসমক বাকী ভাৰতৰ সৈতে সংযুক্ত কৰে; নদীয়ে ভিতৰুৱা অঞ্চল সংযুক্ত কৰে।" } },
  { name: { en: "Best season", as: "শ্ৰেষ্ঠ ঋতু" }, about: { en: "October to March — cool, clear and ideal for rhino safaris; April brings the Rongali Bihu.", as: "অক্টোবৰৰ পৰা মাৰ্চলৈ — শীতল, পৰিষ্কাৰ আৰু গঁড়-চফাৰিৰ বাবে আদৰ্শ; এপ্ৰিলত ৰঙালী বিহু অহে।" } },
  { name: { en: "Inside the state", as: "ৰাজ্যৰ ভিতৰত" }, about: { en: "Buses, taxis and the river ferries move people between the districts; a private car is the easiest way.", as: "বাচ, টেক্সী আৰু নদীয় বোটেৰে মানুহ জিলাসমূহৰ মাজত আতৰাওক; ব্যক্তিগত গাড়ীয়েই আটাইতকৈ সহজ।" } },
  { name: { en: "Where to stay", as: "ক\'ত থাকিব" }, about: { en: "From Kaziranga forest camps to Guwahati hotels and Majuli satra cottages — as booked through the Journey planner.", as: "কাজিৰংগাৰ বন কেম্পৰ পৰা গুৱাহাটীৰ হোটেল আৰু মাজুলীৰ সাত্ৰ কুটীয়ালৈ — যাত্ৰা পৰিকল্পনাৰ জৰিয়তে বুক কৰক।" } },
];
export const ASSAM_HERITAGE = [
  { name: { en: "The Ahom kingdom", as: "আহোম ৰাজ্য" }, kind: { en: "Six centuries", as: "ছয় শতিকাৰ" }, about: { en: "The Ahom dynasty ruled Assam for six centuries; a kingdom of the Brahmaputra's heartland.", as: "আহোম ৰাজবংশে ছয় শতিকা অসম চালনা কৰিছিল; ব্ৰহ্মপুত্ৰৰ হৃদয়ভূমিৰ এক ৰাজ্য।" } },
  { name: { en: "Srimanta Sankardev", as: "স্ৰীমন্ত শঙ্কৰদেৱ" }, kind: { en: "The saint-scholar", as: "সাধু-পণ্ডিত" }, about: { en: "The 15th-century saint, poet and playwright who brought Vaishnavism, Sattriya and the naamghosha.", as: "১৫শ শতকৰ সাধু, কবি আৰু নাট্যকাৰ — যিয়ে বৈষ্ণৱ ধর্ম, সাত্ৰীয় আৰু নামঘোষা আনিছিল।" } },
  { name: { en: "The sattras of Majuli", as: "মাজুলীৰ সাত্ৰসমূহ" }, kind: { en: "Vaishnavite estates", as: "বৈষ্ণৱ পীঠ" }, about: { en: "Monastic homes of the Brahmaputra islands, where Sattriya and ritual music still live.", as: "ব্ৰহ্মপুত্ৰ দ্বীপৰ মঠবাসী ঘৰ, য\'ত সাত্ৰীয় আৰু আচাৰ-সংগীত এতিয়াও জীয়াই আছে।" } },
  { name: { en: "Kamakhya Devi", as: "কামাখ্যা দেৱী" }, kind: { en: "The Shakti pitha", as: "শক্তি পীঠ" }, about: { en: "The temple of Kamakhya atop Nilachal Hill, one of the oldest Shakti shrines of India.", as: "নীলাচল পাহাৰৰ মূৰত কামাখ্যা মন্দিৰ — ভাৰতৰ এটা আটাইতকৈ পুৰণি শক্তি মন্দিৰ।" } },
  { name: { en: "Sivasagar", as: "শিৱসাগৰ" }, kind: { en: "The Ahom capital", as: "আহোম ৰাজধানী" }, about: { en: "Seat of the Ahom kings — Rang Ghar, Talatal Ghar, Joysagar tank and the Shiva dol.", as: "আহোম ৰাজাসকলৰ আসন — ৰংঘৰ, তলাতাল ঘৰ, জয়সাগৰ পুখুৰী আৰু শিৱ দল।" } },
  { name: { en: "Hajo & Sualkuchi", as: "হাজো আৰু চুৱালকুছি" }, kind: { en: "Sacred silk town", as: "পৱিত্ৰ ৰেশম নগৰ" }, about: { en: "The holy town of Hajo where faiths meet, and Sualkuchi, the muga-silk village on the Brahmaputra.", as: "হাজোৰ পবিত্ৰ নগৰ, য'ত সমস্থ ধর্ম মিলে, আৰু চুৱালকুছি — ব্ৰহ্মপুত্ৰৰ তীৰৰ মুগা-ৰেশম গাঁৱ।" } },
];
export const ASSAM_WORK = [
  { icon: "🇰🇿", text: { en: "Kaziranga National Park — a UNESCO World Heritage Site and home of the one-horned rhinoceros.", as: "কাজিৰংগা ৰাষ্ট্ৰীয় উদ্যান — ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান আৰু একালো গঁড়ৰাগীৰ নিজৰা স্থান।" } },
  { icon: "🇮🇳", text: { en: "Majuli — Asia's largest river island, the heart of Sattriya culture and the sattras.", as: "মাজুলী — এছিয়াৰ আটাইতকৈ ডাঙৰ নদীয় দ্বীপ, সাত্ৰীয় সংস্কৃতি আৰু সাত্ৰসমূহৰ হৃদয়।" } },
  { icon: "🏛️", text: { en: "Sivasagar — the Ahom capital of six centuries.", as: "শিৱসাগৰ — ছয় শতিকাৰ আহোম ৰাজধানী।" } },
  { icon: "🌳", text: { en: "Manas National Park — a UNESCO site for Royal Bengal tiger, golden langur and the one-horned rhino.", as: "মানস ৰাষ্ট্ৰীয় উদ্যান — বেংগাল বাঘ, সোণালি হানুহ আৰু একালো গঁড়ৰাগীৰ বাবে ইউনেস্কো স্থান।" } },
  { icon: "🎵", text: { en: "Guwahati — Saraighat's city, the gateway with Umananda and the Brahmaputra.", as: "গুৱাহাটী — শৰাইঘাটৰ নগৰ, উমানন্দা আৰু ব্ৰহ্মপুত্ৰৰ সৈতে সোমাইদুৱাৰ।" } },
  { icon: "🍵", text: { en: "Tea gardens — Assam leads the world with the first flush and the garden family.", as: "চাহ বাগান — প্ৰথম বৰষুণ আৰু বাগান-পৰিয়ালৰ সৈতে অসম বিশ্বক আগবঢ়াই নিয়ে।" } },
  { icon: "🧵", text: { en: "Silk & gamosa — the golden muga and the honour of the jaapi.", as: "ৰেশম আৰু গামোচা — সোণীয় মুগা আৰু জাপীৰ সন্মান।" } },
];

export const FOOTER = {
  address: { en: "Axom Heritage, Saraighat Bank, Guwahati, Assam 781001, India", as: "অসম হেৰিটেজ, শৰাইঘাট বেংক, গুৱাহাটী, অসম ৭৮১০০১, ভাৰত" },
  contact: ["namaskar@axom.example", "+91 361 000 0000"],
  social: { en: ["Instagram", "Pinterest", "Journal"], as: ["ইনষ্টাগ্ৰাম", "পিন্টেৰেষ্ট", "পত্ৰিকা"] },
  legal: { en: "AXOM is a fictional brand celebrating Assam. Imagery via Wikimedia Commons. © 2026", as: "অসম এটা কাল্পনিক ব্ৰেণ্ড যিয়ে অসম মহিমান্বিত কৰে। ছবিসমূহ ৱিকিমিডিয়া কমন্সৰ জৰিয়তে। © ২০২৬" },
};


