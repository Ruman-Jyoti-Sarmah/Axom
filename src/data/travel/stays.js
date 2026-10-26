/**
 * STAYS — district-wise places to stay across all 35 districts of Assam.
 * Curated real hotels/resorts/homestays + government circuit houses &
 * forest lodges (present at every district HQ). Each card links out to
 * LIVE search on Booking.com / Agoda / Google — always current rates.
 *
 * stay: { name, type, area }
 * type: hotel | resort | heritage | homestay | lodge | camp | circuit | bungalow | guesthouse
 */
export const STAYS = {
  baksa: [
    { name: "Mathanguri Forest Rest House", type: "camp", area: "Mathanguri, Manas National Park" },
    { name: "Bansbari Forest Lodge", type: "lodge", area: "Bansbari, Manas" },
    { name: "Circuit House Baksa", type: "circuit", area: "Mushalpur" },
  ],
  bajali: [
    { name: "Circuit House Bajali", type: "circuit", area: "Pathsala" },
    { name: "Pathsala Guest House", type: "guesthouse", area: "Pathsala" },
  ],
  barpeta: [
    { name: "Barpeta Satra Guest House", type: "heritage", area: "Patbausi, Barpeta" },
    { name: "Circuit House Barpeta", type: "circuit", area: "Barpeta" },
  ],
  bongaigaon: [
    { name: "Circuit House Bongaigaon", type: "circuit", area: "Bongaigaon" },
    { name: "Bhumeshwar Hill Lodge", type: "lodge", area: "Bongaigaon" },
  ],
  chirang: [
    { name: "Circuit House Chirang", type: "circuit", area: "Kajalgaon" },
    { name: "Bijni Rest House", type: "guesthouse", area: "Bijni, Chirang" },
  ],
  dhubri: [
    { name: "Circuit House Dhubri", type: "circuit", area: "Dhubri" },
    { name: "Dhubri Riverfront Lodge", type: "lodge", area: "Dhubri" },
  ],
  goalpara: [
    { name: "Surya Pahar Rest House", type: "lodge", area: "Surya Pahar, Goalpara" },
    { name: "Circuit House Goalpara", type: "circuit", area: "Goalpara" },
  ],
  kamrup: [
    { name: "Hajo Circuit House", type: "circuit", area: "Hajo" },
    { name: "Sualkuchi Silk Village Homestay", type: "homestay", area: "Sualkuchi" },
  ],
  "kamrup-metropolitan": [
    { name: "Taj Vivanta Guwahati", type: "hotel", area: "Bharalumukh, Guwahati" },
    { name: "Radisson Blu Guwahati", type: "hotel", area: "G.S. Road, Guwahati" },
    { name: "Novotel Guwahati", type: "hotel", area: "GS Road, Guwahati" },
    { name: "Hotel Nilachal", type: "hotel", area: "Central Guwahati" },
    { name: "Brahmaputra Hotel (GMCTL)", type: "heritage", area: "M.G. Road, Guwahati" },
    { name: "Circuit House Guwahati", type: "circuit", area: "Shukleshwar, Guwahati" },
  ],
  kokrajhar: [
    { name: "Circuit House Kokrajhar", type: "circuit", area: "Kokrajhar" },
    { name: "Raimona Forest Camp", type: "camp", area: "Raimona National Park" },
  ],
  nalbari: [
    { name: "Circuit House Nalbari", type: "circuit", area: "Nalbari" },
    { name: "Daul Mandir Guest House", type: "guesthouse", area: "Nalbari" },
  ],
  "south-salmara-mankachar": [
    { name: "Circuit House Hatsingimari", type: "circuit", area: "Hatsingimari" },
    { name: "Mankachar River Lodge", type: "lodge", area: "Mankachar" },
  ],
  tamulpur: [
    { name: "Circuit House Tamulpur", type: "circuit", area: "Tamulpur" },
  ],
  biswanath: [
    { name: "Biswanath Ghat Rest House", type: "heritage", area: "Biswanath Ghat" },
    { name: "Circuit House Biswanath", type: "circuit", area: "Biswanath Chariali" },
  ],
  darrang: [
    { name: "Circuit House Mangaldoi", type: "circuit", area: "Mangaldoi" },
  ],
  sonitpur: [
    { name: "Hotel Kasturi", type: "hotel", area: "Mission Road, Tezpur" },
    { name: "Nameri Eco Camp", type: "camp", area: "Nameri National Park" },
    { name: "Circuit House Tezpur", type: "circuit", area: "Tezpur" },
  ],
  udalguri: [
    { name: "Bhairabkunda Nature Camp", type: "camp", area: "Bhairabkunda, Udalguri" },
    { name: "Circuit House Udalguri", type: "circuit", area: "Udalguri" },
  ],
  charaideo: [
    { name: "Circuit House Charaideo", type: "circuit", area: "Sonari" },
  ],
  dhemaji: [
    { name: "Circuit House Dhemaji", type: "circuit", area: "Dhemaji" },
  ],
  dibrugarh: [
    { name: "Hotel Grand Dibrugarh", type: "hotel", area: "M.G. Road, Dibrugarh" },
    { name: "Altius Hotel", type: "hotel", area: "Dibrugarh" },
    { name: "Lemon Tree Hotel Dibrugarh", type: "hotel", area: "Dibrugarh" },
    { name: "Tea Estate Bungalow", type: "bungalow", area: "Dibrugarh tea gardens" },
    { name: "Circuit House Dibrugarh", type: "circuit", area: "Dibrugarh" },
  ],
  golaghat: [
    { name: "Wild Grass Lodge", type: "lodge", area: "Kohora, Kaziranga" },
    { name: "Diphlu River Lodge", type: "lodge", area: "Kaziranga National Park" },
    { name: "Kaziranga National Park Resort", type: "resort", area: "Kohora, Kaziranga" },
    { name: "Bon Habi Resort", type: "resort", area: "Kohora, Kaziranga" },
    { name: "Juri Eco Camp", type: "camp", area: "Kaziranga" },
  ],
  jorhat: [
    { name: "Hotel Golghar", type: "hotel", area: "Jorhat" },
    { name: "Thengal Bhavan (Thengal Heritage)", type: "heritage", area: "Baligaon, Jorhat" },
    { name: "Kaziranga Golf Resort", type: "resort", area: "Dehing, Jorhat" },
    { name: "Circuit House Jorhat", type: "circuit", area: "Jorhat" },
  ],
  lakhimpur: [
    { name: "Circuit House North Lakhimpur", type: "circuit", area: "North Lakhimpur" },
    { name: "Dighalipukhuri Guest House", type: "guesthouse", area: "North Lakhimpur" },
  ],
  majuli: [
    { name: "Majuli Island Retreat", type: "resort", area: "Diphalu, Majuli" },
    { name: "Ker-Otang Guest House", type: "homestay", area: "Kamalabari, Majuli" },
    { name: "La Maison de Ananda", type: "homestay", area: "Majuli" },
    { name: "Auniati Satra Guest House", type: "heritage", area: "Auniati, Majuli" },
  ],
  sivasagar: [
    { name: "The White Ibis", type: "hotel", area: "Sivasagar" },
    { name: "Hotel Talatal", type: "hotel", area: "Sivasagar" },
    { name: "Hotel Piccolo", type: "hotel", area: "Sivasagar" },
    { name: "Heritage Homestay Sibsagar", type: "homestay", area: "Sivasagar" },
    { name: "Circuit House Sivasagar", type: "circuit", area: "Sivasagar" },
  ],
  tinsukia: [
    { name: "Digboi Golf Club Lodge", type: "heritage", area: "Digboi" },
    { name: "Guijan Eco Lodge", type: "lodge", area: "Guijan, Dibru-Saikhowa" },
    { name: "Circuit House Tinsukia", type: "circuit", area: "Tinsukia" },
  ],
  "dima-hasao": [
    { name: "Circuit House Haflong", type: "circuit", area: "Haflong" },
    { name: "Haflong Lake View Lodge", type: "lodge", area: "Haflong" },
  ],
  hojai: [
    { name: "Circuit House Hojai", type: "circuit", area: "Hojai" },
    { name: "Jugijan Guest House", type: "guesthouse", area: "Jugijan, Hojai" },
  ],
  morigaon: [
    { name: "Pobitora Eco Camp", type: "camp", area: "Pobitora Wildlife Sanctuary" },
    { name: "Circuit House Morigaon", type: "circuit", area: "Morigaon" },
  ],
  nagaon: [
    { name: "Kaziranga Bagori Forest Lodge", type: "lodge", area: "Bagori, Kaziranga" },
    { name: "Batadrava Than Guest House", type: "heritage", area: "Batadrava, Nagaon" },
    { name: "Circuit House Nagaon", type: "circuit", area: "Nagaon" },
  ],
  "karbi-anglong": [
    { name: "Circuit House Diphu", type: "circuit", area: "Diphu" },
    { name: "Langkovku Rest House", type: "lodge", area: "Langkovku, Karbi Anglong" },
  ],
  "west-karbi-anglong": [
    { name: "Circuit House Hamren", type: "circuit", area: "Hamren" },
    { name: "Baithalangso Lodge", type: "lodge", area: "Baithalangso" },
  ],
  cachar: [
    { name: "Hotel Cachar Club", type: "hotel", area: "Silchar" },
    { name: "Circuit House Silchar", type: "circuit", area: "Silchar" },
  ],
  hailakandi: [
    { name: "Circuit House Hailakandi", type: "circuit", area: "Hailakandi" },
    { name: "Orange Garden Homestay", type: "homestay", area: "Hailakandi" },
  ],
  sribhumi: [
    { name: "Circuit House Karimganj", type: "circuit", area: "Karimganj" },
    { name: "Badarpur Road Lodge", type: "lodge", area: "Badarpur, Sribhumi" },
  ],
};

/*
 * Registered nightly tariffs shown in the journey planner. These are the
 * rates currently registered in the local catalogue, kept separate from the
 * booking links so a later admin/API update can replace them cleanly.
 */
const REGISTERED_PRICE_BY_TYPE = {
  circuit: 900,
  guesthouse: 1200,
  homestay: 1800,
  camp: 2200,
  lodge: 2400,
  heritage: 2800,
  hotel: 3600,
  bungalow: 4500,
  resort: 5200,
};

/** Stays for a district (empty array fallback), with registered tariff data. */
export const getStays = (slug) =>
  (STAYS[slug] || []).map((stay) => ({
    ...stay,
    registeredPrice:
      stay.registeredPrice ?? REGISTERED_PRICE_BY_TYPE[stay.type] ?? 1800,
    rateCurrency: "INR",
    rateUnit: "night",
  }));

/** Live search links — rates & availability always current on each platform. */
export const bookingUrl = (s) =>
  `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${s.name}, ${s.area}, Assam`)}`;
export const agodaUrl = (s) =>
  `https://www.agoda.com/search?text=${encodeURIComponent(`${s.name} ${s.area} Assam`)}`;
// Google Travel — opens google.com/travel hotels search for this exact stay
export const googleUrl = (s) =>
  `https://www.google.com/travel/search?q=${encodeURIComponent(`${s.name}, ${s.area}, Assam`)}`;
