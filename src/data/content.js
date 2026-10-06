const w = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const BRAND = {
  name: "AXOM",
  tagline: "Discover Assam — Land of the Red River & Blue Hills",
  established: "ASSAM · INDIA · OFFICIAL CULTURAL PORTAL",
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
  image: w("Sunset from the bank of Brahmaputra.jpg", 1600),
  alt: "Golden sunset over the mighty Brahmaputra river in Guwahati, Assam",
  headline: ["DISCOVER", "ASSAM"],
  support:
    "Welcome to the official cultural gateway of Assam — explore 35 districts, living heritage, tea gardens and the mighty Brahmaputra.",
  cta: "Begin the Journey",
};

export const INTRO = {
  label: "CHAPTER 01 — THE ARRIVAL · NOMOSKAR",
  lines: ["WHERE ASSAM", "MEETS", "TIMELESS SOUL"],
  image: w("Kamakhya Temple, Guwahati, Assam.jpg", 1600),
  imageAlt: "Kamakhya Temple atop Nilachal Hill — heart of Shakti worship in Assam",
  image2: w("Jaapi of Assam.jpg", 1200),
  image2Alt: "Colourful Jaapi — traditional conical hat of Assam, symbol of honour",
  body: "Every gamosa here is hand-woven with love. Every naam-ghosha still echoes from the sattras of Majuli. This is not a hotel. It is Axom — land of Bihu, tea, silk and the one-horned rhino.",
};

export const ARCHITECTURE = {
  label: "CHAPTER 02 — THE HERITAGE · AHOM LEGACY",
  title: ["CARVED BY AHOMS,", "BLESSED BY KAMAKHYA"],
  image: w("Kamakhya Temple, Guwahati.jpg", 1600),
  alt: "Kamakhya Temple complex on Nilachal Hill glowing in morning light",
  detail: w("Jaapi,Dhemaji.jpg", 1000),
  detailAlt: "Assorted traditional Jaapi hats of Dhemaji, Assam",
  paragraphs: [
    "Six hundred years of Ahom glory. Rang Ghar, Talatal Ghar, Kareng — Asia's oldest amphitheatre of kings.",
    "The estate unfolds like a satra courtyard — each threshold revealing bamboo, water, jaapi and sky, just as Srimanta Sankardev imagined.",
  ],
};

export const SUITES = [
  { id: "01", name: "The Kaziranga Den", kind: "Jungle Lodge · 120 m²", image: w("Indian rhinoceros in Kaziranga National Park March 2025 by Tisha Mukherjee 06.jpg", 1600), alt: "One-horned rhino in Kaziranga" },
  { id: "02", name: "The Majuli Retreat", kind: "River Island Cottage · 95 m²", image: w("Majuli, the river island of Assam.jpg", 1600), alt: "Wetlands of Majuli river island" },
  { id: "03", name: "The Tea Garden House", kind: "Dibrugarh Bungalow · 72 m²", image: w("Plucking tea in a tea garden of Assam.jpg", 1600), alt: "Tea pluckers in Assam garden" },
  { id: "04", name: "The Brahmaputra Suite", kind: "Riverfront Residence · 260 m²", image: w("Sunset at Lachit ghat, Guwahati.jpg", 1600), alt: "Ferry at Lachit Ghat at sunset" },
];


export const DINING = {
  label: "CHAPTER 03 — THE TABLE · AXOMIYA PAAT",
  title: ["A FEAST SERVED", "ON BANANA & BELL-METAL"],
  image: w("Assamese Thali (Jorhat).JPG", 1600),
  alt: "Traditional Assamese thali on bell-metal",
  image2: w("Assamese food thali.jpg", 1200),
  image2Alt: "Assamese cuisine on copper plate",
  body: "From sour Masor Tenga to silky Khar, duck with bamboo shoot and til-pitha — recipes from Ahom kitchens and satra refectories, served on kahor bell-metal.",
  menuHighlights: ["Khar, masor tenga & joha rice", "Haanh with bamboo shoot, Ahom duck curry", "Til-pitha, narikol laru & payas"],
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

export const FOOTER = {
  address: "Axom Heritage, Saraighat Bank, Guwahati, Assam 781001, India",
  contact: ["namaskar@axom.example", "+91 361 000 0000"],
      social: ["Instagram", "Pinterest", "Journal"],
  legal: "AXOM is a fictional brand celebrating Assam. Imagery via Wikimedia Commons. © 2026",
};


