// Official state symbols of Assam — accredited by the Government of Assam.
// Source: https://en.wikipedia.org/wiki/List_of_Assam_state_symbols
// Images via Wikimedia Commons (Special:FilePath — reliable, no arbitrary thumb widths).

const W = (file, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/**
 * Each symbol: key, icon, kind ("State X"), name, official (scientific/Assamese
 * name), image (Commons), why (one line), detail (a fuller paragraph).
 */
export const STATE_SYMBOLS = [
  {
    key: "animal",
    icon: "🦏",
    kind: "State Animal",
    name: "Greater one-horned rhinoceros",
    official: "Rhinoceros unicornis · এশিঙীয়া গঁড় (Ekhingiya Gorh)",
    image: W("Greater one-horned Rhinoceros from Kaziranga, Assam.jpg"),
    why: "The rhino is the living emblem of Assam's wild grasslands.",
    detail:
      "The Indian rhinoceros is inseparably tied to Kaziranga National Park, which shelters the majority of the world's wild population. A symbol of strength and survival, it draws visitors from across the globe to the floodplains of the Brahmaputra. Classified Vulnerable by the IUCN, it is both Assam's pride and a global conservation responsibility.",
  },
  {
    key: "bird",
    icon: "🦆",
    kind: "State Bird",
    name: "White-winged wood duck",
    official: "Asarcornis scutulata · দেওহাঁহ (Deohah)",
    image: W("White-winged Duck (Asarcornis scutulata), Nameri NP, Assam.jpg"),
    why: "A rare forest waterfowl of Assam's evergreen wetlands.",
    detail:
      "The white-winged duck — or deohah — is a large, secretive duck of Assam's tropical evergreen forests and slow rivers, seen at Nameri and the foothill wetlands. Dark-bodied with a striking whitish head, it is among the most endangered waterfowl in the world, listed Critically Endangered by the IUCN and protected under CITES Appendix I.",
  },
  {
    key: "flower",
    icon: "🌸",
    kind: "State Flower",
    name: "Foxtail orchid (Kopou phul)",
    official: "Rhynchostylis retusa · কপৌ ফুল",
    image: W("Rhynchostylis retusa (Foxtail orchid).jpg"),
    why: "The bloom that heralds Rongali Bihu across the state.",
    detail:
      "The Kopou phul, with its fragrant, densely packed purple-white inflorescences, is woven into the hair of Bihu dancers each spring. Symbolising love, joy and renewal, it is the floral emblem of Assam — its appearance marks the arrival of the Assamese new year.",
  },
  {
    key: "tree",
    icon: "🌳",
    kind: "State Tree",
    name: "Hollong",
    official: "Dipterocarpus macrocarpus · হলং",
    image: W("Sapling of Hollong tree (Dipterocarpus macrocarpus), the state tree of Assam.jpg"),
    why: "The royal hardwood of Assam's evergreen forests.",
    detail:
      "Hollong is a towering tropical hardwood, 20–30 metres tall, that dominates Assam's evergreen and semi-evergreen forests. Valued for its durable timber, it is sacred to the Moran community and stands as a symbol of the state's forest wealth and ecological heritage.",
  },
  {
    key: "fruit",
    icon: "🍋",
    kind: "State Fruit",
    name: "Kaji Nemu (Assam lemon)",
    official: "Citrus limon · কাজী নেমু",
    image: W("Kaji nemu or Assam Nemu.jpg"),
    why: "The GI-tagged lemon declared the state fruit in 2024.",
    detail:
      "Kaji Nemu is a slender, seedless variety of lemon indigenous to Assam. Declared the state fruit by cabinet decision on 12 February 2024, it is a Geographical Indication (GI) tagged treasure — used in the famous Khar, in the aromatic 'Masor Tenga', and served to guests after every Assamese meal.",
  },
  {
    key: "festival",
    icon: "🎊",
    kind: "State Festival",
    name: "Bihu",
    official: "বিহু",
    image: W("Bihu Dance , Festival of India.jpg"),
    why: "The three-fold festival of Assam's agricultural year.",
    detail:
      "Bihu is celebrated three times a year — Rongali (Bohag) Bihu in April, Kongali (Kati) Bihu in October, and Bhogali (Magh) Bihu in January — marking the sowing, growing and harvest of the rice. With the dhol, pepa and gogona, and the woven gamosa, it is the heartbeat of Assamese life.",
  },
  {
    key: "dance",
    icon: "💃",
    kind: "State Dance",
    name: "Bihu Dance",
    official: "বিহু নাচ",
    image: W("Bihu Dance 2.jpg"),
    why: "The state dance, performed at Rongali Bihu.",
    detail:
      "The Bihu dance, performed to the rhythm of the dhol and the bamboo clatter of the gogona, is the official state dance of Assam. Danced in circling groups with brisk steps and swaying hips, it is the joyful expression of the Assamese new year — women in muga mekhela-sador, men in dhoti and gamosa.",
  },
  {
    key: "song",
    icon: "🎵",
    kind: "State Song",
    name: "O Mur Apunar Dekh",
    official: "অ' মোৰ আপোনাৰ দেশ — 'O My Endearing Country'",
    image: W("Laksminath Bezbaruah.jpg"),
    why: "The beloved state anthem of Assam.",
    detail:
      "Written by Lakshminath Bezbaroa — the great Assamese poet and novelist — 'O Mur Apunar Dekh' is Assam's official state song. Sung at the start of every official function and assembly, its opening words are a love-letter to the land: 'O my endearing country, the land of red hills and blue rivers.'",
  },
  {
    key: "motto",
    icon: "🪷",
    kind: "State Motto",
    name: "Joi Aai Axom",
    official: "জয় আই অসম — 'Hail Mother Assam'",
    image: W("The Prime Minister, Shri Narendra Modi being presented Jaapi, a traditional hat from Assam, at the 85th Annual Conference of Srimanta Sankaradeva Sangha, at Sibasagar, Assam on February 05, 2016.jpg"),
    why: "The invocation to Assam personified as a mother goddess.",
    detail:
      "'Joi Aai Axom' — Hail Mother Assam — is the officially accredited motto of the state. It invokes Assam as a mother goddess, a land of nurture and pride, and is the resounding greeting of Assamese identity and belonging.",
  },
  {
    key: "language",
    icon: "অ",
    kind: "State Language",
    name: "Assamese",
    official: "অসমীয়া (Axomiya)",
    image: W("Bihu Dance-This photo crosses 28000 Views.jpg"),
    why: "The easternmost Indo-Aryan language, written in its own script.",
    detail:
      "Assamese (Axomiya) is the official language of Assam and the easternmost of the Indo-Aryan languages, written in the Assamese–Bengali abugida. Carried by the poetry of Sankardev, the Borgeets and the literature of the Assam Sahitya Sabha, it is the voice of a distinct civilisational identity in the Northeast.",
  },
  {
    key: "seal",
    icon: "🦅",
    kind: "State Seal",
    name: "Emblem of Assam",
    official: "অসম চৰকাৰ — Government of Assam",
    image: W("Seal of Assam.svg"),
    why: "The official seal carried on the state's correspondence.",
    detail:
      "The state seal of Assam is carried on the official correspondence of the Government of Assam and listed on the state's portal as the 'State Seal'. Assam does not have an officially recognised flag; instead a banner displaying the state seal on a plain field represents the Government of Assam.",
  },
];
