import { DISTRICTS, slugify } from "./districts.js";

const W = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/**
 * Per-district "backend" content for the shared district page template.
 * Each entry: history (paragraph), extra (additional images), attractions
 * (tourist spots — name, kind, about). Keyed by district slug.
 */
export const DISTRICT_DETAILS = {
  "baksa": {
    history:
      "Named after the Baksa river, the district was carved out in 2003 from Goalpara and Kamrup. Its hills form the southern rampart of the Manas landscape, home to Bodo, Mech and Katha villages whose Bwisagu spring festival opens the Assamese new year with drum, dance and gamosa.",
    extra: [W("Manas landscape rhino.jpg")],
    attractions: [
      { name: "Manas National Park", kind: "UNESCO World Heritage", about: "Tiger, elephant, one-horned rhino and golden langur on the Bhutan border — among India's first World Heritage sites." },
      { name: "Mathanguri", kind: "Forest Retreat", about: "Deep-inside Manas camp on the Bholigaon river where rescued elephants are rehabilitated." },
      { name: "Khoirabari", kind: "Border Village", about: "The last Assamese village on the Bhutan road — gateway to Manas and Bhutan's Nariphung." },
      { name: "Bwisagu Villages", kind: "Living Culture", about: "Bodo hamlets where the spring Bwisagu dance rolls on the kham drum and sipa flute." },
    ],
  },
  "bajali": {
    history:
      "Assam's smallest district, Bajali is the parishad of Bhattadev — the 'second Sankardev' — whose Baradiha satra gave Assam its first prose in the Assamese language. Elevated to a district in the 2020s, it remains a fertile cluster of naamghars and scholarly satras on the Barpeta plain.",
    extra: [],
    attractions: [
      { name: "Baradiha Satra", kind: "Vaishnavite Estate", about: "The satra founded by Bhattadev, where Assamese prose and the puthi tradition were born." },
      { name: "Tukraibleswar Than", kind: "Temple", about: "Ancient Shiva shrine beside Pathsala drawn in Assam's own temple idiom." },
      { name: "Pathsala", kind: "Cultural Town", about: "Town of libraries, colleges and naamghars — the scholarly heart of Bajali." },
    ],
  },
  "barpeta": {
    history:
      "In 1583 Srimanta Sankardev raised his Kamala Kshetra at Bata, and Barpeta grew into the greatest seat of neo-Vaishnavism after the saint settled his satra here. The district's Fakir singers carried Borgeet across the region, and its bell-metal workshops still turn the lamps of every naamghar.",
    extra: [],
    attractions: [
      { name: "Barpeta Satra", kind: "Neo-Vaishnavite Estate", about: "The grandest satra of Assam, where Sankardev's Barpeta bhakti and puthi culture flourish." },
      { name: "Bata Kamala Kshetra", kind: "Pilgrimage", about: "Sankardev's first monastery on the bank of the Bharalu — the womb of the faith." },
      { name: "Fakir Satra", kind: "Heritage", about: "Seat of the Fakir brothers who composed the Borgeet sung across Assam." },
      { name: "Barpeta Town", kind: "Temple Town", about: "Bell-metal lamps, naamghar processions and the Mehleng fair on the eve of Magh." },
    ],
  },
  "bongaigaon": {
    history:
      "Jogighopa on the Manas was the ancient port of Kamarupa where Bhaskaravarman received the Chinese pilgrim Xuanzang in the 7th century. Modern Bongaigaon, laid out beside the old Egarosimha ghat, is the youngest town of western Assam, facing rocky Bhumeshwar hill across the Manas.",
    extra: [],
    attractions: [
      { name: "Jogighopa", kind: "Ancient Port", about: "Kamarupa's river port where Xuanzang landed — rock-cut caves still face the Manas." },
      { name: "Bhumeshwar Hill", kind: "Sacred Hill", about: "Rocky hill of old shrines and caves overlooking the Brahmaputra's northern bank." },
      { name: "Egarosimha Ghat", kind: "Heritage", about: "The old river ghat that carries the town's medieval name into the present." },
    ],
  },
  "chirang": {
    history:
      "The seat of the Koch kings of Bijni until 1839, Chirang takes its name from the Chiri river. Within the Bodoland Territorial Region its Bodo, Mech and Bengali villages share the Bhutan foothill forests, where Bwisagu and Bathou worship still mark the turning of the year.",
    extra: [],
    attractions: [
      { name: "Bijni Palace Ruins", kind: "Royal Heritage", about: "Mounds and gateways of the Koch capital at Dewkurapaar, swallowed by forest and time." },
      { name: "Kajalgaon", kind: "District Town", about: "The administrative seat at the edge of the Bhutan foothills, market for the Bodo plains." },
      { name: "Chiri River Country", kind: "Landscape", about: "Forest ridges and paddy islands along the river that names the district." },
    ],
  },
  "dhubri": {
    history:
      "One of the oldest towns of the Northeast, Dhubri was the headquarters of Goalpara district under the British and a port where Guru Gobind Singh rested in 1671. Its riverbank shrines and ferry ghats still gather the whole western Brahmaputra for mela and samagam.",
    extra: [],
    attractions: [
      { name: "Sri Sri Gurdwara", kind: "Sikh Shrine", about: "Seventeenth-century shrine marking the Guru's stay — Assam's holiest Gurdwara." },
      { name: "Dhubri Devi Temple", kind: "Temple", about: "Clifftop goddess shrine above the Brahmaputra, lit up during the winter mela." },
      { name: "Brahmaputra Ferry Rides", kind: "River Experience", about: "Country-boat crossings to the sandbars — the everyday theatre of the Luit." },
      { name: "Chapar", kind: "Town", about: "Western market town of silk, jute and the Bodo-Bengali countryside." },
    ],
  },
  "goalpara": {
    history:
      "Goalpara's hills preserve one of Assam's strangest archaeological pages — Surya Pahar, chiselled with hundreds of Buddhist stupas and sun discs between the 8th and 12th centuries. The town was long the headquarters of Goalpara district, the gateway by which the British entered the Brahmaputra valley.",
    extra: [],
    attractions: [
      { name: "Surya Pahar", kind: "Archaeological Site", about: "A hill of rock-cut stupas, Jain figures and sun-shrines — Assam's hidden Buddhist page." },
      { name: "Dudhnoi", kind: "River Town", about: "Fast water town on the Dudhnoi river below the Meghalaya hills." },
      { name: "Brahmaputra Riverfront", kind: "Landscape", about: "Sunset ghats and sand islands facing the widest reach of the Luit." },
    ],
  },
  "kamrup": {
    history:
      "Kamrup is the sacred geography of Assam: Hajo, where Hayagriva Madhava crowns a hill shared by Hindus, Buddhists and Sikhs; Sualkuchi, weaving muga and pat silk since the Ahom kings; and Saraighat, where Lachit's flotilla broke the Mughal fleet in 1671.",
    extra: [W("Sualkuchi Budhram Madhab Satradhikar College.jpg")],
    attractions: [
      { name: "Hayagriva Madhava Temple, Hajo", kind: "Temple", about: "Triple-faith hilltop shrine where the Buddha is worshipped as an avatar of Vishnu." },
      { name: "Powa Makkah, Hajo", kind: "Shrine", about: "The 'lesser Mecca' of the Northeast, drawn by Sufi pilgrims for four centuries." },
      { name: "Sualkuchi", kind: "Silk Village", about: "The muga-silk weaving village on a Brahmaputra island — looms of the Ahom court." },
      { name: "Chandubi Beel", kind: "Lake", about: "Earthquake-born lake fringed by tea gardens — a weekend of rowing and fish." },
      { name: "Saraighat", kind: "Battlefield", about: "Site of Lachit's 1671 victory over the Mughals, marked at the bridge over the Luit." },
    ],
  },
  "kamrup-metropolitan": {
    history:
      "Guwahati grew beneath Nilachal, where the Kamakhya yoni-shrine drew shakti worshippers before the Kamarupa kings. The capital city is the gateway to the entire Northeast — a river port turned metropolis, still circling Umananda's peacock island each morning.",
    extra: [W("Umananda Island, Guwahati (4).jpg")],
    attractions: [
      { name: "Kamakhya Temple", kind: "Shakti Pitha", about: "Eighth-century shakti pith atop Nilachal — mother goddess of the Kamarupas and Ambubachi mela." },
      { name: "Umananda Island", kind: "River Island", about: "The world's smallest inhabited river island, crowned by a Shiva temple mid-stream." },
      { name: "Deepor Beel", kind: "Wetland", about: "Ramsar lake on the city's edge where whistling teals roost by the thousand." },
      { name: "Assam State Zoo", kind: "Wildlife", about: "Botanical garden and zoo holding black panthers, pelicans and the state's faunal roll." },
      { name: "Basistha Ashram", kind: "Heritage", about: "Forested ashram of the sage Basistha where three rivers meet the city's green fringe." },
    ],
  },
  "kokrajhar": {
    history:
      "Headquarters of the Bodoland Territorial Region, Kokrajhar district was carved from Goalpara in 2003 for the Bodo people. Raimona, declared a national park in 2020, guards the golden-langur country on the Bhutan fringe — and the Bodo Gwcwra society still meets in its wooden houses.",
    extra: [W("Wild elephant Raimona National Park.jpg")],
    attractions: [
      { name: "Raimona National Park", kind: "National Park", about: "Golden langurs, elephants and hornbills in the Bhutan foothill forests declared a park in 2020." },
      { name: "Chakrasila Wildlife Sanctuary", kind: "Sanctuary", about: "Langur-haunted sal forest on the Dhansiri — a quiet sister to Manas." },
      { name: "Bodos of Kokrajhar", kind: "Living Culture", about: "Bwisagu, Baibanga and the Gwcwra paddy-hall council of the Bodo world." },
    ],
  },
  "nalbari": {
    history:
      "Nalbari's Ghosha family and its network of naamghars kept the Naam Dharma alive through four centuries. Daul Mandir rises from a hillock in the town's centre, and the district's mango gardens and river Burhanguri still set the calendar of its fairs.",
    extra: [],
    attractions: [
      { name: "Daul Mandir", kind: "Temple", about: "Hillock shrine of Shakti in the heart of Nalbari town, lit through the Durga mela." },
      { name: "Ghosha Satras & Naamghars", kind: "Vaishnavite Heritage", about: "The scholarly estates of the Ghosha family where Naam Dharma was preserved." },
      { name: "Burhanguri Riverbanks", kind: "Landscape", about: "Sandbars and village ghats of the river that threads the district's mango country." },
    ],
  },
  "south-salmara-mankachar": {
    history:
      "Assam's westernmost district, formed in 2016 from Dhubri, is a world of chars and ghatas between the Brahmaputra and Bangladesh. Every monsoon redraws its islands — and Mankachar's Kamakhya shrine still draws boatloads from both banks of the border river.",
    extra: [],
    attractions: [
      { name: "Mankachar Kamakhya Shrine", kind: "Temple", about: "Riverside copy of Nilachal's goddess, worshipped by the border boatmen." },
      { name: "Hatsingimari Ghat", kind: "River Port", about: "The district's seat on the Brahmaputra — ferries, fish market and evening light." },
      { name: "Char Island Life", kind: "River Culture", about: "Sandbar villages of the Luit where houses move when the river does." },
    ],
  },
  "tamulpur": {
    history:
      "Formed in 2021 from northern Baksa, Tamulpur sits where the Bhutan foothills meet the Manas plain. Bodo, Bengali and Garo villages share its paddy fields and forested ridges along the old Rangia–Bhutan road.",
    extra: [],
    attractions: [
      { name: "Bhutan Foothill Forests", kind: "Landscape", about: "Sal and chir pine ridges rising behind the paddy — leopard and hornbill country." },
      { name: "Bodo Villages", kind: "Living Culture", about: "Huts where Bwisagu songs and the arnai welcome still open every door." },
      { name: "Rangia–Bhutan Road", kind: "Heritage Route", about: "The old highway threading Tamulpur's markets toward the Bhutan gate." },
    ],
  },
  "biswanath": {
    history:
      "Biswanath Ghat, once called the 'second Kashi', drew pilgrims to its Shiva temple on the Brahmaputra. The 2016 district wraps that holy ghat in tea estates and the northern grasslands of Kaziranga, where rhinos graze within sight of the river.",
    extra: [],
    attractions: [
      { name: "Biswanath Ghat & Shiva Temple", kind: "Temple Town", about: "The ASI Shiva temple on the old river ghat — Assam's riverside Kashi." },
      { name: "Biswanath Tea Estates", kind: "Tea Country", about: "Colonial-era gardens and bungalows between the ghat and the Kaziranga fringe." },
      { name: "Kaziranga's Northern Range", kind: "Wildlife", about: "Rhinos crossing to the north bank grasslands — the quieter gate of the park." },
    ],
  },
  "darrang": {
    history:
      "Patharighat in Darrang is where Assamese peasants drew their line against the 1905 Partition — remembered in the Swahid Stambha. The district's plain, watered by the Barnadi, remains one of Assam's granaries, its naamghars full on every kati punhi.",
    extra: [],
    attractions: [
      { name: "Patharighat Swahid Stambha", kind: "Memorial", about: "Martyrs' column honouring the peasants who resisted the Partition of Bengal." },
      { name: "Mangaldoi", kind: "District Town", about: "The seat of Darrang, ringed by sattras, mustard fields and Bihu grounds." },
      { name: "Barnadi River Country", kind: "Landscape", about: "Paddy and mustard horizons under the wide North Assam sky." },
    ],
  },
  "sonitpur": {
    history:
      "Tezpur's name — 'city of blood' — comes from the Usha–Aniruddha legend of love and war. Mahabhairav crowns the town, Agnigarh remembers the fire, and beyond the Brahmaputra the forests of Nameri keep hornbills in the Bhutan foothills.",
    extra: [W("Agnigarh Hill, Tezpur.JPG")],
    attractions: [
      { name: "Mahabhairav Temple", kind: "Temple", about: "Ancient Shiva shrine on the hillock above Tezpur, rebuilt by the Ahoms." },
      { name: "Agnigarh", kind: "Legend Site", about: "The 'fort of fire' park on a mound tied to the Usha–Aniruddha story." },
      { name: "Nameri National Park", kind: "National Park", about: "Hornbill, gaur and white-winged duck country on the Bhairabkunda edge." },
      { name: "Bhairabkunda", kind: "Waterfalls", about: "Cascade gorge where Assam meets Bhutan over forested limestone." },
    ],
  },
  "udalguri": {
    history:
      "The Bodo hills of Udalguri grew up around the old Udalguri subdivision, now part of the Bodoland region. Its name is heard in the stone legends of Kukurakata and its valleys carry the Bhutanese border streams down to the Brahmaputra.",
    extra: [],
    attractions: [
      { name: "Bhairabkunda", kind: "Waterfalls", about: "Border gorge of thundering water and picnic lawns at the Bhutan gate." },
      { name: "Kukurakata Hill", kind: "Landscape", about: "Round hill of duranta fruit and Bodo stories, rising over the Udalguri plain." },
      { name: "Paneri Tea Gardens", kind: "Tea Country", about: "Estates rolling to the foothills — the leaf that built this district." },
    ],
  },
  "charaideo": {
    history:
      "Charaideo was the first Ahom capital, chosen by Sukapha in 1228 at the head of the Patkai passes. Its maidams — vaulted burials of kings and queens beneath mounded earth — were inscribed by UNESCO in 2024 as the necropolis of the Ahom dynasty.",
    extra: [],
    attractions: [
      { name: "Charaideo Maidams", kind: "UNESCO World Heritage", about: "Ahom pyramid-mounds of kings, queens and queens' guards, ringed by guardian stones." },
      { name: "Sonari", kind: "District Town", about: "The seat of Charaideo, base for maidam trails toward the Patkai hills." },
      { name: "Ahom Burial Trails", kind: "Heritage Walk", about: "Paths threading the mounds where the 'gods' of the Ahoms are still honoured." },
    ],
  },
  "dhemaji": {
    history:
      "Carved from Lakhimpur in 1989, Dhemaji stands where the Subansiri meets the Brahmaputra. Floods have shaped its life and its faith — its sattras carried Vaishnavism out to the chars, and its Raas and Monati fairs are the calendar of the northern plain.",
    extra: [],
    attractions: [
      { name: "Naamghars & Raas", kind: "Living Faith", about: "Thatch-and-bamboo naamghars staging Raas leela with khol and cymbal each Kartik." },
      { name: "Gogamukh", kind: "Confluence Town", about: "Riverside town and fairground where the northern hills' waters reach the Luit." },
      { name: "Chars & Paddy Fields", kind: "Landscape", about: "Shifting sandbars and green plains — the flood-born geography of Dhemaji." },
    ],
  },
  "dibrugarh": {
    history:
      "Dibrugarh was the administrative seat of Upper Assam after the Treaty of Yandaboo, and grew into the tea capital of India. The Bogibeel bridge now stitches its north-bank world to the rest of the country, while Dehing's sattras keep the old rites of the river.",
    extra: [W("Dibru Saikhuwa National Park.jpg")],
    attractions: [
      { name: "Bogibeel Bridge", kind: "Engineering", about: "India's longest rail-road bridge, spanning the Brahmaputra to the Assamese north bank." },
      { name: "Heritage Tea Estates", kind: "Tea Country", about: "Thika gardens and bungalows where Assam's first tea bushes still flush." },
      { name: "Dibru-Saikhowa National Park", kind: "National Park", about: "Swamp forest of feral horses, white-winged ducks and river dolphins at the park's western gate." },
      { name: "Dehing Satrai", kind: "Festival", about: "The annual assembly of sattras on the Dehing — naam, kirtan and mask drama." },
    ],
  },
  "golaghat": {
    history:
      "Golaghat's name recalls its old ghat of golah (granary huts) on the Dhansiri. The Kohora gate of Kaziranga opens inside the district, and its tea gardens — planted from the 1870s — still pour the leaf that made Assam famous worldwide.",
    extra: [],
    attractions: [
      { name: "Kaziranga — Kohora Gate", kind: "National Park", about: "The central range of the UNESCO park: rhinos, buffaloes and the elephant safari at dawn." },
      { name: "Panbari Reserve", kind: "Wildlife", about: "Patch of elephant and tiger forest between Dhansiri and the park." },
      { name: "Bokakhat", kind: "Town", about: "Tea-town base for Kaziranga and the eastern river ferries." },
      { name: "Dhansiri Riverbanks", kind: "Landscape", about: "The valley's green river, lined with tea houses and winter birds." },
    ],
  },
  "jorhat": {
    history:
      "Jorhat was the last capital of the Ahoms, founded in 1794 after the Tai king moved from Sivasagar. A century later it became the tea research capital of the world — and today its Nimati ghat sends the first boat of the morning to Majuli's sattras.",
    extra: [],
    attractions: [
      { name: "Hollongapar Gibbon Sanctuary", kind: "Wildlife", about: "India's only sanctuary named for the hoolock gibbon, among old silk-cotton trees." },
      { name: "Tocklai Tea Research Institute", kind: "Tea Heritage", about: "The century-old institute where the science of the Assam leaf was written." },
      { name: "Nimati Ghat", kind: "River Jetty", about: "Launch point of the Majuli ferry at sunrise, flocked by island commuters." },
      { name: "Tea Garden Bungalows", kind: "Tea Country", about: "Planter-era bungalows in the Jorhat gardens — verandahs, whistling cups and rains." },
    ],
  },
  "lakhimpur": {
    history:
      "North Lakhimpur keeps the memory of Lachit Borphukan — his tomb at Sissiborgaon and the Dighalupukhuri tank said to have been dug by his order. Beyond the Subansiri, the district's plains run to the Arunachal foothills and the old Patkai trails.",
    extra: [],
    attractions: [
      { name: "Dighalupukhuri", kind: "Heritage Tank", about: "The royal pond of Lakhimpur tied to Lachit's legend, ringed by ghat and grove." },
      { name: "Lachit Borphukan's Tomb", kind: "Memorial", about: "Samadhi of Assam's greatest general at Jingra, Sissiborgaon, honoured each 24 November." },
      { name: "Basudeva Than", kind: "Temple", about: "Old Vaishnavite shrine and mela ground of the Subansiri plain." },
    ],
  },
  "majuli": {
    history:
      "After a great Brahmaputra flood, Madhavdev brought Sankardev's legacy to Majuli, and the island became the Vatican of neo-Vaishnavism — more than twenty sattras still keep its rites. India's first river- island district (2016), it floats between two channels of the Luit.",
    extra: [W("Majuli - The largest river island.jpg")],
    attractions: [
      { name: "Auniati Satra", kind: "Neo-Vaishnavite Estate", about: "Island's premier satra, keeper of the alankaar traditions and the Auniati brass." },
      { name: "Kamalabari Satra", kind: "Neo-Vaishnavite Estate", about: "Seat of the Sankari (Sankardev) faith on the island's northern bank." },
      { name: "Samaguri Satra", kind: "Mask-Making", about: "Workshop of bamboo-and-clay Bhaona masks worn across Majuli's stage plays." },
      { name: "Mishing Stilt Villages", kind: "Living Culture", about: "Opera houses (odala) of the Mishing people raised above the flood on bamboo." },
      { name: "Raas Mahotsav", kind: "Festival", about: "The island's grandest festival — Raas leela lit by lamps on every satra ground." },
    ],
  },
  "sivasagar": {
    history:
      "For 420 years the Ahoms ruled from here — Rang Ghar, Asia's oldest surviving amphitheatre; Talatal Ghar, with its secret tunnels; Joysagar, the largest tank of Assam; and the Shiva Dol, tallest of its kind. The district is an open-air museum of a dynasty.",
    extra: [W("Ranghar - Assam.jpg"), W("Talatal Ghar in Sivasagar, Assam.jpg")],
    attractions: [
      { name: "Rang Ghar", kind: "Royal Amphitheatre", about: "The two-storey pavilion where Ahom kings watched bazi and buffalo fights." },
      { name: "Talatal Ghar", kind: "Palace", about: "Masonry palace of tunnels and wells — the most elaborate of the Ahom Karengs." },
      { name: "Joysagar", kind: "Tank & Temples", about: "The largest man-made tank of Assam, ringed by shrines built by Queen Ambika." },
      { name: "Shiva Dol", kind: "Temple", about: "Tallest Shiva temple of the region on the sivadol ghat of Sivasagar tank." },
    ],
  },
  "tinsukia": {
    history:
      "Digboi, in Tinsukia, holds Asia's oldest operating refinery — oil struck in 1889 and refined since 1901, 'the place where they said: dig, boy, dig'. The district is also where the Stilwell Road once ran to China, and where Dibru-Saikhowa keeps its feral horses.",
    extra: [W("Digboi Centenary Museum 04.JPG")],
    attractions: [
      { name: "Digboi Refinery & Centenary Museum", kind: "Industrial Heritage", about: "The oldest operating refinery in Asia, with its museum of drills and photographs." },
      { name: "Digboi War Cemetery", kind: "Memorial", about: "IMCW cemetery of the airmen and soldiers who died on the Burma front." },
      { name: "Lekhapani — Stilwell Road", kind: "History Trail", about: "The last milestone of the WWII Stilwell Road that once ran on to Kunming." },
      { name: "Dibru-Saikhowa", kind: "National Park", about: "The park's great swamp forest of feral horses, dolphins and cap-chin monkeys." },
    ],
  },
  "dima-hasao": {
    history:
      "The hill district of Assam, seat of the Dimasa Kacharis whose kingdom once ruled from Maibang. Haflong — 'land of the white squirrel' in Dimasa — holds the lake and the hill railway, while Jatinga keeps its strange nightly rite of falling birds.",
    extra: [],
    attractions: [
      { name: "Haflong Lake", kind: "Landscape", about: "Hill lake of Haflong town, ringed by gardens and the Barail skyline." },
      { name: "Jatinga", kind: "Mystery Site", about: "The village where birds descend on dark, moonless nights — studied since the 1900s." },
      { name: "Maibang", kind: "Dimasa Heritage", about: "Old capital of the Dimasa kingdom with its rock-cut stone plinth and museum." },
      { name: "The Hill Railway", kind: "Journey", about: "The Lumding–Haflong line climbing the Barail with tunnels and waterfall views." },
    ],
  },
  "hojai": {
    history:
      "Carved from Nagaon in 2016, Hojai is India's agarwood capital — the oudh distilled at Jugijan reaches perfume houses of the world. Its hills at the Karbi fringe hold old tin-base shrines, and its markets smell of smoke, musk and monsoon wood.",
    extra: [],
    attractions: [
      { name: "Jugijan Oudh Distilleries", kind: "Craft Trail", about: "Cottage distilleries drawing the precious oudh oil from agarwood chips." },
      { name: "Lanka", kind: "Town", about: "Railhead market town of Hojai, gateway to the agarwood belt." },
      { name: "Agarwood Forest Fringe", kind: "Landscape", about: "Shaded hills where agar (aquilaria) grows to be smoked into incense and oil." },
    ],
  },
  "morigaon": {
    history:
      "Morigaon takes its name from a 'mora' (bent) stream on the southern bank of the Brahmaputra. Its soil carries two reputations — the rhinos of Pobitora and the medicine-folk of Mayang, whose village lore still draws visitors from across the state.",
    extra: [W("Indian Rhino in Pobitora.jpg")],
    attractions: [
      { name: "Pobitora Wildlife Sanctuary", kind: "Wildlife", about: "Compact wetland holding one of Assam's densest rhino populations — an hour from Guwahati." },
      { name: "Mayang", kind: "Living Lore", about: "The village famed for traditional medicine and the old stories of witchcraft." },
      { name: "Jagiroad", kind: "Town", about: "Paper-mill town and railhead at the foot of the Mikir hills." },
    ],
  },
  "nagaon": {
    history:
      "At Batadrava in Nagaon, Srimanta Sankardev was born in 1449 — and the district remains the cradle of Vaishnavism. Around it spread Assam's rice bowl, with Kaziranga's Agoratoli range breaking the green on the north-eastern edge.",
    extra: [],
    attractions: [
      { name: "Batadrava Than", kind: "Pilgrimage", about: "Birthplace of Srimanta Sankardev — naamghar, tank and the annual birth festival." },
      { name: "Agoratoli Range, Kaziranga", kind: "Wildlife", about: "The quiet eastern gate of Kaziranga, best for birding and jeep encounters." },
      { name: "Nagaon's Paddy Bowl", kind: "Landscape", about: "The granary of Assam — river-fed fields turning gold each Bihu." },
    ],
  },
  "karbi-anglong": {
    history:
      "The Karbi highlands — 'anglong' meaning land of hills — were long ruled by chiefships before Diphu became their seat. The Rongker and Bor Boruwa festivals still open the agricultural year here, and the forests around Langkovku fall through monsoon mist.",
    extra: [W("Diphu hills.JPG")],
    attractions: [
      { name: "Langkovku Waterfall", kind: "Waterfalls", about: "The cascading falls of Manjha, Karbi Anglong's most-visited shower of green." },
      { name: "Diphu", kind: "District Town", about: "Pine-scented hill headquarters with the Karbi Heritage Museum and Rongker grounds." },
      { name: "Rongker Festival", kind: "Living Culture", about: "The spring festival of the Karbi clans — dhol, gong and songs of sowing." },
    ],
  },
  "west-karbi-anglong": {
    history:
      "Carved from Karbi Anglong in 2016, West Karbi Anglong is the younger hill district — Hamren's ridges, Baithalangso's pine slopes and the Garo-Karbi border forests. Its people raise jhum on the slopes and meet in the pachong council halls.",
    extra: [],
    attractions: [
      { name: "Baithalangso", kind: "Hill Retreat", about: "Pine-backed slopes and stone Karbi houses on the district's western ridge." },
      { name: "Hamren", kind: "District Town", about: "Ridge-top headquarters with views over the Garo border forests." },
      { name: "Umswai Valley", kind: "Valley", about: "Tiwa villages and paddy terraces along the Umswai stream." },
    ],
  },
  "cachar": {
    history:
      "The Barak valley's Khaspur was capital of the Khasi kings until the British annexed Cachar in the 1830s; Silchar then grew into the cultured river-port of the south. Tea and orange still rule its estates, and the Barak sets the pace of its towns.",
    extra: [],
    attractions: [
      { name: "Khaspur Ruins", kind: "Royal Heritage", about: "Stone gateways and carved remains of the last Khasi capital of Cachar." },
      { name: "Silchar Riverfront", kind: "Town", about: "The 'Island of Peace' on the Barak — ghats, ferries and book-shop streets." },
      { name: "Barak Valley Tea Estates", kind: "Tea Country", about: "Southern Assam gardens rolling from the Manipur hills to the river." },
      { name: "Lakendua & the Barak", kind: "River Experience", about: "Island picnics and country-boat rides on Assam's other great river." },
    ],
  },
  "hailakandi": {
    history:
      "The garden district of the Barak valley, Hailakandi took shape as a British outpost in the 1870s and grew rich on orange and pineapple. Its Katkhal hills look toward Mizoram, and its Bengali-Christian villages ring with Christmas hymns each winter.",
    extra: [],
    attractions: [
      { name: "Katkhal Hills", kind: "Landscape", about: "Forest hills on the Mizoram road — the green wall behind the town." },
      { name: "Orange & Pineapple Orchards", kind: "Agro-Tourism", about: "Hillside gardens where the winter citrus of Barak valley ripens." },
      { name: "Barak River Ghats", kind: "Riverfront", about: "Ferry ghats and evening promenades along Assam's southern river." },
    ],
  },
  "sribhumi": {
    history:
      "Karimganj was renamed Sribhumi in 2024 — 'the land of Shri'. Its old riverside fort at Badarpur watched the Barak for centuries, and its canals still carry country boats between islands that answer to both bank and tide.",
    extra: [],
    attractions: [
      { name: "Badarpur Fort", kind: "Historic Fort", about: "Walls and bastions of the old fort guarding the Barak at Badarpur." },
      { name: "Barak River & Islands", kind: "River Experience", about: "Canal rides between the island wards of Sribhumi town." },
      { name: "Patharkandi", kind: "Town", about: "Eastern market town among hills and tea — base for the Barak border country." },
    ],
  },
};

/** Merge base district record with its detail content for the page template. */
export function getDistrict(slug) {
  const base = DISTRICTS.find((d) => slugify(d.name) === slug);
  if (!base) return null;
  const det = DISTRICT_DETAILS[slug] || {};
  return {
    ...base,
    slug,
    history: det.history || "",
    attractions: det.attractions || [],
    images: [base.image, ...(det.extra || [])],
  };
}
