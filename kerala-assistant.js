(() => {
    'use strict';

    const root = typeof window !== 'undefined' ? window : globalThis;
    const ROUTE_CORE = root.KeralaRouteCore || (typeof module === 'object' && module.exports ? require('./route-planner-core.js') : null);
    const PLAN_DATA = root.KeralaPlanData || (typeof module === 'object' && module.exports ? require('./kerala-plan-data.js') : null);

    const DESTINATIONS = {
        kochi: {
            name: 'Kochi', aliases: ['kochi', 'cochin', 'ernakulam'], page: 'destination-kochi.html', days: '1-2 days',
            summary: 'Kerala\'s best-connected central gateway, combining harbour heritage, city comforts and easy onward travel.',
            interests: ['culture', 'food', 'heritage'], cost: 2, family: 3, senior: 3, monsoon: 3,
            stay: 'Fort Kochi suits heritage walks; central Kochi or Ernakulam is more practical for rail connections and quick transfers.',
            stays: ["Tissa's Inn", 'Forte Kochi', 'Brunton Boatyard'],
            food: 'Try appam with stew, puttu and kadala, seafood, biryani and cafés around Fort Kochi.',
            access: 'Cochin International Airport and the Ernakulam railway stations are the main gateways.'
        },
        'fort-kochi': {
            name: 'Fort Kochi', aliases: ['fort kochi', 'fortcochi'], page: 'destination-kochi.html', days: '1 full day',
            summary: 'A walkable waterfront quarter of colonial-era streets, art spaces, churches and Chinese fishing nets.',
            interests: ['culture', 'food', 'heritage', 'photography'], cost: 2, family: 3, senior: 2, monsoon: 3,
            stay: 'Stay within Fort Kochi for walkable heritage sights; confirm lifts or ground-floor rooms if mobility matters.',
            stays: ["Tissa's Inn", 'Forte Kochi', 'Brunton Boatyard'], food: 'Cafés, seafood and Kerala breakfasts are easy to find around the heritage quarter.',
            access: 'Reach it by road or ferry from central Kochi; the nearest major rail stations are in Ernakulam.'
        },
        mattancherry: {
            name: 'Mattancherry', aliases: ['mattancherry', 'mattanchery', 'jew town'], page: 'destination-kochi.html', days: 'Half to one day',
            summary: 'Kochi\'s historic trading quarter, known for spice streets, Jew Town and layered port history.',
            interests: ['culture', 'food', 'heritage', 'shopping'], cost: 2, family: 3, senior: 2, monsoon: 3,
            stay: 'Base in Fort Kochi or Mattancherry for easy access to the old-city sights.', stays: ["Tissa's Inn", 'Forte Kochi', 'Brunton Boatyard'],
            food: 'Look for Kerala meals, spice shops, cafés and coastal dishes; ask for mild spice when needed.',
            access: 'Use a short road transfer or local ferry connection from central Kochi.'
        },
        munnar: {
            name: 'Munnar', aliases: ['munnar', 'munar'], page: 'destination-munnar.html', days: '2-3 days',
            summary: 'A highland tea region with plantation views, cool air and winding Western Ghats roads.',
            interests: ['hills', 'nature', 'photography', 'tea'], cost: 2, family: 3, senior: 2, monsoon: 2,
            stay: 'Town-side hotels simplify meals and transfers; plantation resorts and homestays trade convenience for quieter views.',
            stays: ['KTDC Tea County', 'The Panoramic Getaway', 'Fragrant Nature Munnar'],
            food: 'Kerala breakfasts, South Indian vegetarian meals, tea and simple child-friendly dishes are widely available.',
            access: 'Munnar has no railway station or airport; road transfer from Kochi, Aluva or another Kerala base is required.'
        },
        thekkady: {
            name: 'Thekkady / Periyar', aliases: ['thekkady', 'thekady', 'periyar', 'kumily'], page: 'destination-thekkady.html', days: '1-2 days',
            summary: 'A compact spice-and-wildlife base beside the Periyar landscape, suited to guided nature activities.',
            interests: ['wildlife', 'nature', 'spices', 'culture'], cost: 2, family: 3, senior: 2, monsoon: 2,
            stay: 'Kumily and Thekkady offer the easiest access to spice gardens and booked Periyar-area activities.',
            stays: ['KTDC Periyar House', 'Greenwoods Resort', 'Spice Village'],
            food: 'Try spice-influenced Kerala dishes, appam, local cardamom tea and mild hotel meals when travelling with children.',
            access: 'Thekkady has no direct rail or airport access; use a road transfer, commonly from Munnar, Kottayam or Kochi.'
        },
        alappuzha: {
            name: 'Alappuzha', aliases: ['alappuzha', 'alleppey', 'allepy', 'alepy'], page: 'destination-alappuzha.html', days: '1-2 days',
            summary: 'Kerala\'s classic houseboat centre, surrounded by canals, paddy fields and Vembanad backwaters.',
            interests: ['backwaters', 'houseboat', 'photography', 'relaxed'], cost: 2, family: 3, senior: 2, monsoon: 2,
            stay: 'Choose town or canal-side hotels for flexibility, a resort for a slower stay, or a carefully verified houseboat for one night.',
            stays: ['Time Square Boutique Hotel', 'Punnamada Resort', 'Uday Backwater Resort'],
            food: 'Backwater meals often feature rice, fish curry and vegetable sides; confirm menus and allergies with the boat or stay.',
            access: 'Alappuzha has a railway station and good road links from Kochi, Kumarakom and Kollam.'
        },
        kumarakom: {
            name: 'Kumarakom', aliases: ['kumarakom', 'kumarakum'], page: 'destination-kumarakom.html', days: '1-2 days',
            summary: 'A quieter Vembanad Lake base for waterfront resorts, birdlife and relaxed daytime cruises.',
            interests: ['backwaters', 'birds', 'wellness', 'relaxed'], cost: 3, family: 3, senior: 3, monsoon: 2,
            stay: 'Lakefront resorts suit slow stays; choose Kottayam-side access if rail convenience matters.',
            stays: ['KTDC Waterscapes', 'Coconut Lagoon', 'Kumarakom Lake Resort'],
            food: 'Resorts commonly offer Kerala meals, fish dishes and vegetarian options; smaller local choices are less concentrated than in Kochi.',
            access: 'Kottayam is the practical rail gateway, followed by a road transfer to the lake.'
        },
        varkala: {
            name: 'Varkala', aliases: ['varkala', 'varkla'], page: 'destination-varkala-kovalam.html', days: '1-3 days',
            summary: 'A cliff-backed coastal town with beach time, sea views, cafés and an independent traveller atmosphere.',
            interests: ['beaches', 'wellness', 'food', 'photography'], cost: 2, family: 2, senior: 1, monsoon: 1,
            stay: 'The North Cliff is lively and walkable but involves steps; quieter areas suit longer stays and visitors avoiding crowds.',
            stays: ['InDa Hotel', 'Gateway Varkala', 'Taj Green Cove Resort & Spa'],
            food: 'Cliff cafés offer seafood, vegetarian, vegan and less-spicy choices alongside Kerala dishes.',
            access: 'Varkala Sivagiri railway station is nearby; Thiruvananthapuram is the closest major airport gateway.'
        },
        kovalam: {
            name: 'Kovalam', aliases: ['kovalam', 'kovlam'], page: 'destination-varkala-kovalam.html', days: '1-2 days',
            summary: 'An established lighthouse-beach area close to Thiruvananthapuram, with resort-style stays and easier airport access.',
            interests: ['beaches', 'wellness', 'family'], cost: 3, family: 3, senior: 2, monsoon: 1,
            stay: 'Lighthouse Beach is active; resort areas can provide more self-contained comfort for families and seniors.',
            stays: ['InDa Hotel', 'Gateway Varkala', 'Taj Green Cove Resort & Spa'],
            food: 'Seafood, Kerala meals and hotel dining are common; ask restaurants to reduce chilli for children or sensitive travellers.',
            access: 'Use Thiruvananthapuram airport or railway station, followed by a short road transfer.'
        },
        thiruvananthapuram: {
            name: 'Thiruvananthapuram', aliases: ['thiruvananthapuram', 'trivandrum', 'tvm', 'padmanabhaswamy', 'padmanabhaswamy temple', 'padmanabha swamy', 'sree padmanabhaswamy temple'], page: 'destination-thiruvananthapuram.html', days: '1-2 days',
            summary: 'Kerala\'s capital, combining museums, heritage, major transport links and access to the southern coast.',
            interests: ['culture', 'heritage', 'food'], cost: 2, family: 3, senior: 3, monsoon: 3,
            stay: 'Central city hotels work for museums and rail access; beach-side stays suit travellers continuing to Kovalam or Poovar.',
            stays: ['Apollo Dimora', 'Hycinth Hotels', 'Hilton Garden Inn Trivandrum'],
            food: 'Try Kerala breakfasts, vegetarian meals, seafood and city restaurants with broad menu choices.',
            access: 'The city has an international airport, a major railway station and strong road connections.'
        },
        wayanad: {
            name: 'Wayanad', aliases: ['wayanad', 'waynad', 'wynad'], page: 'destination-wayanad.html', days: '2-3 days',
            summary: 'A broad northern hill district of forests, plantations, caves and waterfalls rather than one compact town.',
            interests: ['wildlife', 'hills', 'nature', 'adventure'], cost: 2, family: 2, senior: 1, monsoon: 1,
            stay: 'Choose one base near the sights you value; changing sides of the district adds road time.',
            stays: ['KTDC Pepper Grove', 'Vythiri Village', 'Wayanad Wild'],
            food: 'Look for Malabar dishes, Kerala breakfasts, plantation produce and homestay meals; confirm allergy handling directly.',
            access: 'Wayanad has no railway station; Kozhikode rail/airport access requires a substantial hill-road transfer.'
        },
        kadamakkudy: {
            name: 'Kadamakkudy', aliases: ['kadamakkudy', 'kadamakkudi', 'kadamakudy'], page: 'destination-kadamakkudy.html', days: 'Half to one day',
            summary: 'A quiet island-and-wetland landscape just beyond Kochi, best for village roads, birdlife and sunset.',
            interests: ['offbeat', 'backwaters', 'birds', 'photography'], cost: 1, family: 2, senior: 2, monsoon: 1,
            stay: 'Most visitors keep Kochi as their base; nearby island or Bolgatty stays are alternatives.',
            stays: ['PJ Princess Regency', 'Nihara Resort & Spa', 'Grand Hyatt Kochi Bolgatty'],
            food: 'Plan meals around Kochi or confirm simple local options before travelling through the islands.',
            access: 'Use a road transfer from Kochi; local transport is less frequent than in the city.'
        },
        'munroe-island': {
            name: 'Munroe Island', aliases: ['munroe island', 'munro island', 'munroe', 'munro'], page: 'destination-munroe-island.html', days: '1 day or 1 night',
            summary: 'An offbeat village island where small canoes pass through narrow canals and coconut groves.',
            interests: ['offbeat', 'backwaters', 'culture', 'photography'], cost: 1, family: 2, senior: 2, monsoon: 1,
            stay: 'Homestays offer the strongest local experience; ask about canoe boarding, meals and station pickup.',
            stays: ['Munroe Inn Homestay', 'Munroe Vision Panakkattu', 'Lake N River Resort'],
            food: 'Homestay meals are a highlight; tell the host early about vegetarian, allergy or spice preferences.',
            access: 'Munroturuttu rail access is useful, while road transfers connect the island with Kollam and Varkala.'
        },
        poovar: {
            name: 'Poovar', aliases: ['poovar', 'poover', 'poovar island'], page: 'destination-poovar.html', days: 'Half to one day',
            summary: 'A southern estuary of mangroves, river channels and a boat-access sandbar near the coast.',
            interests: ['backwaters', 'beaches', 'offbeat', 'nature'], cost: 2, family: 3, senior: 2, monsoon: 1,
            stay: 'Estuary resorts suit slow stays; day visits work from Kovalam or Thiruvananthapuram.',
            stays: ['Havelia Island Resort', 'Poovar Island Resort', 'Estuary Sarovar Premiere'],
            food: 'Resort and coastal menus usually include seafood and Kerala dishes; confirm outside meal options before an island stay.',
            access: 'Reach Poovar by road from Thiruvananthapuram or Kovalam, with boats used for local estuary experiences.'
        },
        valiyaparamba: {
            name: 'Valiyaparamba', aliases: ['valiyaparamba', 'valiya paramba', 'valiyaparamba backwaters'], page: 'destination-valiyaparamba.html', days: '1 day or 1 night',
            summary: 'A quiet north Kerala backwater region of islands, estuaries and village boat journeys.',
            interests: ['backwaters', 'offbeat', 'nature', 'photography'], cost: 2, family: 2, senior: 2, monsoon: 1,
            stay: 'Small retreats and nearby coastal resorts are more practical than expecting a large hotel cluster.',
            stays: ['Valiyaparamba Retreat', 'Kanan Beach Resort', 'Neeleshwar Hermitage'],
            food: 'Expect Malabar-style seafood and local meals; pre-arrange dietary needs at smaller stays.',
            access: 'Payyanur is a practical rail gateway; Kannur airport still requires a road transfer.'
        },
        bekal: {
            name: 'Bekal', aliases: ['bekal', 'bekal fort'], page: 'destination-bekal.html', days: '1-2 days',
            summary: 'A quieter northern coast centred on a sea-facing fort, beaches and resort stays.',
            interests: ['beaches', 'heritage', 'photography', 'relaxed'], cost: 3, family: 3, senior: 3, monsoon: 1,
            stay: 'Choose a fort-area homestay for value or a coastal resort for a slower, self-contained stay.',
            stays: ['Bekal Village Homestay', 'Kanan Beach Resort', 'Taj Bekal Resort & Spa'],
            food: 'Try Malabar seafood, pathiri and biryani; resort menus provide easier mild and vegetarian alternatives.',
            access: 'Bekal Fort and Kasaragod rail links are useful; Kannur airport needs a longer road transfer.'
        },
        kannur: {
            name: 'Kannur', aliases: ['kannur', 'cannanore'], page: 'destination-kannur.html', days: '1-2 days',
            summary: 'A Malabar coastal city associated with Theyyam, forts, beaches and handloom traditions.',
            interests: ['culture', 'beaches', 'heritage', 'food'], cost: 2, family: 3, senior: 2, monsoon: 2,
            stay: 'City hotels simplify rail access; beach resorts suit a quieter extension.',
            stays: ['KTDC Loom Land', 'Mascot Beach Resort', 'The Malabar Beach Resort'],
            food: 'Explore Malabar biryani, pathiri, seafood and snacks such as unnakaya.',
            access: 'Kannur has both a railway station and an international airport with road transfer into the city.'
        },
        kozhikode: {
            name: 'Kozhikode', aliases: ['kozhikode', 'calicut', 'kozhikhode'], page: 'destination-kozhikode.html', days: '1-2 days',
            summary: 'A Malabar food-and-history city on the coast and the main southern gateway to Wayanad.',
            interests: ['food', 'culture', 'heritage', 'beaches'], cost: 2, family: 3, senior: 3, monsoon: 2,
            stay: 'Central or beach-road hotels work for a short city visit and onward Wayanad transfer.',
            stays: ['Grand Plaza Suites', 'The Gateway Hotel Beach Road', 'The Raviz Calicut'],
            food: 'Kozhikode is known for Malabar biryani, seafood, halwa, pathiri and rich snack traditions.',
            access: 'Kozhikode railway station and Calicut International Airport provide the main connections.'
        },
        thrissur: {
            name: 'Thrissur', aliases: ['thrissur', 'trichur'], page: 'destinations.html', days: '1 day',
            summary: 'Kerala\'s cultural centre, known for temples, museums, festivals and a strong performing-arts identity.',
            interests: ['culture', 'festivals', 'heritage', 'food'], cost: 2, family: 3, senior: 3, monsoon: 3,
            stay: 'A central-city hotel is practical for a one-night cultural stop; this site does not maintain a local stay shortlist.',
            stays: [], food: 'Try Kerala meals, snacks and vegetarian dishes around the city centre.',
            access: 'Thrissur is well connected by rail and road; Kochi airport is a common air gateway.'
        },
        athirappilly: {
            name: 'Athirappilly', aliases: ['athirappilly', 'athirapilly', 'athirapalli'], page: 'destinations.html', days: 'Half to one day',
            summary: 'A powerful forest-edge waterfall destination usually visited as a road excursion from Kochi or Thrissur.',
            interests: ['nature', 'waterfalls', 'photography'], cost: 2, family: 2, senior: 1, monsoon: 1,
            stay: 'A day trip is simplest; this site does not maintain a verified local hotel shortlist.', stays: [],
            food: 'Carry water and use established restaurants on the approach; do not rely on isolated roadside options.',
            access: 'Road transport is required; slippery paths and changing water conditions need extra care in rainy periods.'
        },
        vagamon: {
            name: 'Vagamon', aliases: ['vagamon', 'wagamon'], page: 'destinations.html', days: '1-2 days',
            summary: 'A quieter hill area of rolling grasslands, pine landscapes and winding roads.',
            interests: ['hills', 'nature', 'offbeat', 'adventure'], cost: 2, family: 2, senior: 1, monsoon: 1,
            stay: 'A central hill stay reduces repeated driving; this site does not maintain a verified local shortlist.', stays: [],
            food: 'Expect simple Kerala and South Indian food; confirm meal availability at remote stays.',
            access: 'Road access is required, and hill-road travel can be slow in rain or fog.'
        },
        idukki: {
            name: 'Idukki', aliases: ['idukki'], page: 'destinations.html', days: '1-2 days',
            summary: 'A large hill district of dams, forests, spice country and mountain roads rather than one compact attraction.',
            interests: ['hills', 'nature', 'wildlife', 'offbeat'], cost: 2, family: 2, senior: 1, monsoon: 1,
            stay: 'Choose a base close to the exact sights you plan to visit; this site does not maintain a district-wide shortlist.', stays: [],
            food: 'Plantation and homestay meals can be rewarding; arrange dietary requirements before remote visits.',
            access: 'Most Idukki journeys require private road transport and careful route planning.'
        },
        kollam: {
            name: 'Kollam', aliases: ['kollam', 'quilon'], page: 'destination-munroe-island.html', days: '1 day',
            summary: 'A southern backwater city and transport base for Ashtamudi Lake and Munroe Island.',
            interests: ['backwaters', 'culture', 'food'], cost: 2, family: 3, senior: 3, monsoon: 2,
            stay: 'Use central Kollam for rail convenience or Munroe Island for a quieter village stay.', stays: [],
            food: 'Seafood, Kerala meals and cashew-related local trade are part of the city\'s identity.',
            access: 'Kollam has strong rail and road links between Alappuzha and Thiruvananthapuram.'
        }
    };

    const PLANS = PLAN_DATA?.plans || [];
    const ATTRACTIONS = PLAN_DATA?.attractions || {};
    const PADMANABHASWAMY = ATTRACTIONS.padmanabhaswamy || null;

    const PHRASES = {
        hello: { triggers: ['hello', 'greeting', 'namaskaram'], english: 'Hello / Greetings', malayalam: 'നമസ്കാരം', transliteration: 'Namaskaram', audio: 'audio/malayalam/namaskaram.mp3' },
        thanks: { triggers: ['thank you', 'thanks', 'nanni'], english: 'Thank you', malayalam: 'നന്ദി', transliteration: 'Nanni', audio: 'audio/malayalam/nandi.mp3' },
        'how-are-you': { triggers: ['how are you', 'sukhamaano'], english: 'How are you?', malayalam: 'സുഖമാണോ?', transliteration: 'Sukhamaano?', audio: 'audio/malayalam/sukhamaano.mp3' },
        please: { triggers: ['please', 'dayavaai', 'dayavaayi'], english: 'Please', malayalam: 'ദയവായി', transliteration: 'Dayavaai', audio: 'audio/malayalam/dayavaai.mp3' },
        sorry: { triggers: ['sorry', 'excuse me', 'kshamikkanam'], english: 'Sorry / Excuse me', malayalam: 'ക്ഷമിക്കണം', transliteration: 'Kshamikkanam', audio: 'audio/malayalam/kshamikkanam.mp3' },
        where: { triggers: ['where is', 'evideyaanu'], english: 'Where is...?', malayalam: 'എവിടെയാണ്?', transliteration: 'Evideyaanu?', audio: 'audio/malayalam/evideyaanu.mp3' },
        price: { triggers: ['ask the price', 'how much is this', 'ithu ethra'], english: 'How much is this?', malayalam: 'ഇത് എത്ര?', transliteration: 'Ithu ethra?', audio: 'audio/malayalam/ithu-ethra.mp3' },
        help: { triggers: ['help', 'please help', 'help me', 'sahaayikkoo'], english: 'Help!', malayalam: 'സഹായിക്കൂ!', transliteration: 'Sahaayikkoo!', audio: 'audio/malayalam/sahaayikkoo.mp3' },
        tea: { triggers: ['tea', 'chaya'], english: 'Tea', malayalam: 'ചായ', transliteration: 'Chaya', audio: 'audio/malayalam/chaya.mp3' },
        water: { triggers: ['water', 'vellam'], english: 'Water', malayalam: 'വെള്ളം', transliteration: 'Vellam', audio: 'audio/malayalam/vellam.mp3' },
        food: { triggers: ['food', 'word for food', 'bhakshanam'], english: 'Food', malayalam: 'ഭക്ഷണം', transliteration: 'Bhakshanam', audio: 'audio/malayalam/bhakshanam.mp3' },
        shop: { triggers: ['shop', 'word for shop', 'kada'], english: 'Shop', malayalam: 'കട', transliteration: 'Kada', audio: 'audio/malayalam/kada.mp3' },
        bathroom: { triggers: ['bathroom', 'toilet', 'washroom'], english: 'Where is the bathroom?', malayalam: 'ബാത്ത്റൂം എവിടെയാണ്?', transliteration: 'Bathroom evideyaanu?', audio: null }
    };

    const MONTHS = {
        january: { name: 'January', season: 'winter', note: 'Usually one of the most comfortable overall months, with cooler hills and drier conditions, but popular places can be busy.' },
        february: { name: 'February', season: 'winter', note: 'Generally dry and comfortable, with good touring conditions before summer heat builds.' },
        march: { name: 'March', season: 'summer', note: 'Warmer on the coast and plains, while hill stations remain comparatively cooler.' },
        april: { name: 'April', season: 'summer', note: 'Hotter and more humid in lowland Kerala; start outdoor sightseeing early and prioritise hills where practical.' },
        may: { name: 'May', season: 'summer', note: 'Often hot and humid with pre-monsoon showers; build in shade, hydration and flexible timing.' },
        june: { name: 'June', season: 'monsoon', note: 'The main monsoon usually brings lush scenery, rain disruption and rougher sea conditions.' },
        july: { name: 'July', season: 'monsoon', note: 'Expect lush landscapes and frequent rain; hill visibility, roads, boats and beaches need flexible plans and current checks.' },
        august: { name: 'August', season: 'monsoon', note: 'Rain can remain significant, though conditions vary; keep indoor alternatives and avoid rigid transfer schedules.' },
        september: { name: 'September', season: 'transition', note: 'A transitional month that can remain wet while conditions gradually improve.' },
        october: { name: 'October', season: 'transition', note: 'Post-monsoon rain is still possible, but the landscape is green and the main visitor season is beginning.' },
        november: { name: 'November', season: 'winter', note: 'Generally a strong touring month with improving weather and rising visitor demand.' },
        december: { name: 'December', season: 'winter', note: 'Popular for comfortable weather, but Christmas and New Year can raise demand and prices.' }
    };

    const INTENT_PATTERNS = {
        help: /\b(help|what can you|what do you know|questions can i ask)\b/,
        recall: /\b(what did i tell|remember|earlier|what do you know about my trip)\b/,
        live: /\b(tomorrow|right now|currently|current weather|raining now|open today|open now|running tomorrow|live price|current(?:\s+\w+){0,2}\s+(?:price|fare)|availability today|traffic right now)\b/,
        comparison: /\b(vs|versus|compare|compared|or|which one|which is|better|cheaper|other one)\b/,
        budget: /\b(budget|cost|price|prices|money|how much|expensive|cheap|cheaper|cheapest|affordable|save money|reduce the cost|include flights|under\s+\d+|value|comfortable|premium)\b/,
        transport: /\b(how do (i|we) get|how to get|travel from|travel between|how far|distance|how long|how many (?:hours|km|kilometres|kilometers|road legs|legs)|travel time|stops? on (?:the )?way|recommended stops?|take breaks?|where should we stop|where should we take breaks|train|rail|flight|fly|airport|bus|taxi|cab|car|hire a car|drive|backtracking|fly out|road|what transport|how should i travel|why not (?:train|flight|car|cab)|which leg|longest (?:leg|drive)|route tiring|too tiring|comfortable for seniors|kids handle|map it|show (?:it|this|that|the route|this trip) on (?:the )?map|open (?:it|this|that|the route)(?: on (?:the )?map)?|map link|my route now)\b/,
        stay: /\b(hotel|hotels|stay|stays|resort|homestay|hostel|room|accommodation|houseboat stay)\b/,
        food: /\b(food|eat|breakfast|vegetarian|vegan|seafood|sadya|malabar|snack|spicy|allerg|cuisine|meal)\b/,
        culture: /\b(kathakali|kalaripayattu|theyyam|onam|vishu|thrissur pooram|boat race|temple etiquette|church|mosque|architecture|handicraft|spice|festival|culture)\b/,
        language: /\b(malayalam|how do i say|how to say|phrase|pronounce|translation|say hello|say thank)\b/,
        weather: /\b(weather|season|monsoon|rain|raining|climate|december|january|february|march|april|may|june|july|august|september|october|november)\b/,
        safety: /\b(safe|safety|danger|kids safe|senior safe|sea condition|life jacket|emergency|alone at night)\b/,
        plan: /\b(plan|plans|trip|itinerary|itineraries|vacation plan|package|recommend|where should|days|day trip|add|remove|skip|change that|dont want|do not want|what happens on day|which day|last day|hotel changes|overnight bases?)\b/
    };

    const INTEREST_PATTERNS = {
        hills: /\b(hill|hills|mountain|mountains|tea|plantation)\b/,
        backwaters: /\b(backwater|backwaters|canal|canals|houseboat|canoe)\b/,
        beaches: /\b(beach|beaches|coast|coastal|sea)\b/,
        wildlife: /\b(wildlife|forest|animals|periyar|bird|birds)\b/,
        culture: /\b(culture|heritage|kathakali|theyyam|temple|festival|history)\b/,
        food: /\b(food|cuisine|eat|seafood|vegetarian|malabar|sadya)\b/,
        wellness: /\b(wellness|ayurveda|spa|relaxation)\b/,
        offbeat: /\b(offbeat|quiet|hidden|less crowded|village|island)\b/,
        adventure: /\b(adventure|trek|hike|active)\b/,
        photography: /\b(photo|photography|pictures|sunrise|sunset)\b/
    };

    const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14 };
    const DEFAULT_SUGGESTIONS = ['choose-plan', 'compare', 'budget', 'weather'];
    const SUGGESTIONS = {
        'choose-plan': { label: 'Choose my plan', prompt: 'We have 7 days. Which Kerala plan should we choose?' },
        compare: { label: 'Compare places', prompt: 'Munnar or Wayanad for a family?' },
        budget: { label: 'Trip budget', prompt: 'How can I estimate our Kerala trip budget?' },
        weather: { label: 'Best travel season', prompt: 'What is Kerala like in July?' },
        hotels: { label: 'Where to stay', prompt: 'Where should I stay in Munnar?' },
        transport: { label: 'Plan a transfer', prompt: 'How do I get from Kochi to Munnar?' },
        food: { label: 'Kerala food', prompt: 'What food should I try in Kerala?' },
        phrases: { label: 'Malayalam phrases', prompt: 'How do I say thank you in Malayalam?' },
        safety: { label: 'Travel safety', prompt: 'How should a family travel safely in Kerala?' },
        offbeat: { label: 'Quiet Kerala', prompt: 'Which offbeat places should I visit?' }
    };

    const normaliseText = value => String(value || '')
        .toLowerCase()
        .replace(/₹/g, ' inr ')
        .replace(/&/g, ' and ')
        .replace(/[’']/g, '')
        .replace(/[^a-z0-9\s+-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const freshContext = () => ({
        version: 6,
        destinations: [],
        activeRoute: [],
        routeSource: null,
        activePlanId: null,
        basePlanId: null,
        currentDestination: null,
        currentAttraction: null,
        duration: null,
        travellerType: null,
        adults: null,
        children: null,
        seniors: null,
        infants: null,
        totalTravellers: null,
        budget: null,
        month: null,
        interests: [],
        pace: null,
        avoidLongDrives: false,
        transportPreference: null,
        accommodationPreference: null,
        previousTopic: null,
        previousComparison: [],
        previousPlanComparison: [],
        planComparisonWinner: null,
        comparisonWinner: null,
        lastComparisonReason: null,
        lastIntent: null,
        lastPlanId: null,
        studentAgeGroup: null,
        pendingPlanDestination: null,
        turnCount: 0
    });

    const cleanContext = raw => {
        const clean = { ...freshContext(), ...(raw && typeof raw === 'object' ? raw : {}) };
        clean.destinations = Array.isArray(clean.destinations) ? clean.destinations.filter(id => DESTINATIONS[id]).slice(-8) : [];
        clean.activeRoute = Array.isArray(clean.activeRoute) ? [...new Set(clean.activeRoute.filter(id => ROUTE_CORE?.destinations?.[id]))].slice(0, 8) : [];
        clean.interests = Array.isArray(clean.interests) ? [...new Set(clean.interests.filter(Boolean))].slice(0, 8) : [];
        clean.previousComparison = Array.isArray(clean.previousComparison) ? clean.previousComparison.filter(id => DESTINATIONS[id]).slice(0, 2) : [];
        clean.previousPlanComparison = Array.isArray(clean.previousPlanComparison) ? clean.previousPlanComparison.filter(id => PLAN_DATA?.byId?.[id]).slice(0, 2) : [];
        if (!DESTINATIONS[clean.currentDestination]) clean.currentDestination = null;
        if (!PLAN_DATA?.byId?.[clean.activePlanId]) clean.activePlanId = null;
        if (!PLAN_DATA?.byId?.[clean.basePlanId]) clean.basePlanId = null;
        if (!PLAN_DATA?.byId?.[clean.lastPlanId]) clean.lastPlanId = null;
        if (!['published-plan', 'custom-user-route', 'transport-query'].includes(clean.routeSource)) clean.routeSource = null;
        if (!DESTINATIONS[clean.pendingPlanDestination]) clean.pendingPlanDestination = null;
        if (!ATTRACTIONS[clean.currentAttraction]) clean.currentAttraction = null;
        clean.version = 6;
        return clean;
    };

    const aliasEntries = Object.entries(DESTINATIONS)
        .flatMap(([id, destination]) => destination.aliases.map(alias => ({ id, alias: normaliseText(alias) })))
        .sort((a, b) => b.alias.length - a.alias.length);

    const containsPhrase = (text, phrase) => new RegExp(`(^|\\s)${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=\\s|$)`).test(text);

    const detectDestinations = normalized => {
        const matches = [];
        aliasEntries.forEach(({ id, alias }) => {
            let index = normalized.indexOf(alias);
            while (index >= 0) {
                const before = index === 0 || normalized[index - 1] === ' ';
                const afterIndex = index + alias.length;
                const after = afterIndex === normalized.length || normalized[afterIndex] === ' ';
                if (before && after) matches.push({ id, index, length: alias.length });
                index = normalized.indexOf(alias, index + 1);
            }
        });

        matches.sort((a, b) => a.index - b.index || b.length - a.length);
        const accepted = [];
        matches.forEach(match => {
            if (accepted.some(existing => match.index >= existing.index && match.index + match.length <= existing.index + existing.length)) return;
            if (!accepted.some(existing => existing.id === match.id)) accepted.push(match);
        });
        return accepted.map(match => match.id);
    };

    const extractDuration = normalized => {
        const numeric = normalized.match(/\b(1[0-4]|[1-9])\s*-?\s*(?:day|days)\b/);
        if (numeric) return Number(numeric[1]);
        for (const [word, number] of Object.entries(NUMBER_WORDS)) {
            if (new RegExp(`\\b${word}\\s*-?\\s*(?:day|days)\\b`).test(normalized)) return number;
        }
        if (/\bone week\b/.test(normalized)) return 7;
        if (/\btwo weeks\b/.test(normalized)) return 14;
        return null;
    };

    const detectPlanIds = normalized => {
        const found = [];
        const add = id => {
            if (PLAN_DATA?.byId?.[id] && !found.includes(id)) found.push(id);
        };
        const hasPlanLanguage = /\b(plan|plans|trip|itinerary|itineraries|package|route)\b/.test(normalized);

        const hasPublishedDuration = /\b(?:3|5|7|10|three|five|seven|ten)\s*-?\s*(?:day|days)\b/.test(normalized);
        if (/\b(?:student|students|college|school)\s+(?:kerala\s+)?(?:plan|trip|itinerary)\b|\b(?:plan|trip|itinerary)\s+(?:for\s+)?(?:student|students)\b/.test(normalized)
            || (!hasPublishedDuration && /\bbest plan for students?\b|\bwhere do students stay\b/.test(normalized))) add('student');
        if (/\b(?:senior|senior friendly|senior-friendly|easy paced|easy-paced)\s+(?:kerala\s+)?(?:plan|trip|itinerary)\b|\b(?:plan|trip|itinerary)\s+(?:for\s+)?(?:senior|seniors)\b/.test(normalized)
            || (!hasPublishedDuration && /\bbest plan for seniors?\b/.test(normalized))) add('senior');
        if (/\b(?:5|five)\s*-?\s*(?:day|days)\b/.test(normalized) && /\b(student|students|college group|school group)\b/.test(normalized)) add('student');
        if (/\b(?:5|five)\s*-?\s*(?:day|days)\b/.test(normalized) && /\b(senior|seniors|senior couple)\b/.test(normalized)) add('senior');
        if (/\b(?:normal|standard|regular)\s*(?:five|5)(?:\s*-?\s*day)?(?:\s+(?:plan|trip|itinerary))?\b|\b(?:five|5)(?:\s*-?\s*day)?\s+(?:normal|standard|regular)(?:\s+(?:plan|trip|itinerary))?\b/.test(normalized)) add('five-day');

        const durationMatches = [];
        const numericPattern = /\b(3|5|7|10)\s*-?\s*(?:day|days)\b/g;
        let match;
        while ((match = numericPattern.exec(normalized))) durationMatches.push(Number(match[1]));
        const words = { three: 3, five: 5, seven: 7, ten: 10 };
        Object.entries(words).forEach(([word, days]) => {
            if (new RegExp(`\\b${word}\\s*-?\\s*(?:day|days)\\b`).test(normalized)) durationMatches.push(days);
        });
        [...new Set(durationMatches)].forEach(days => {
            if (days === 3) add('three-day');
            if (days === 5 && !found.some(id => ['student', 'senior'].includes(id)) && !/\b(student|senior)\b/.test(normalized)) add('five-day');
            if (days === 5 && /\b(?:normal|standard|regular)\b/.test(normalized)) add('five-day');
            if (days === 7) add('seven-day');
            if (days === 10) add('ten-day');
        });

        if (/\b3\s*(?:or|vs|versus)\s*5\s*(?:day|days)?\b/.test(normalized)) { add('three-day'); add('five-day'); }
        if (/\b5\s*(?:or|vs|versus)\s*7\s*(?:day|days)?\b/.test(normalized)) { add('five-day'); add('seven-day'); }
        if (/\b7\s*(?:or|vs|versus)\s*10\s*(?:day|days)?\b/.test(normalized)) { add('seven-day'); add('ten-day'); }
        return found;
    };

    const extractDayRequest = normalized => {
        const range = normalized.match(/\bdays?\s*(\d{1,2})\s*(?:to|-|through)\s*(?:day\s*)?(\d{1,2})\b/);
        if (range) return { day: null, range: [Number(range[1]), Number(range[2])], last: false };
        const day = normalized.match(/\bday\s*(\d{1,2})\b/);
        return { day: day ? Number(day[1]) : null, range: null, last: /\b(last|final) day\b/.test(normalized) };
    };

    const extractMoney = normalized => {
        const compact = normalized.match(/(?:inr|rs|rupees?)?\s*(\d+(?:\.\d+)?)\s*k\b/);
        if (compact) return Math.round(Number(compact[1]) * 1000);
        const amount = normalized.match(/(?:inr|rs|rupees?)\s*(\d[\d,]*)|\b(\d[\d,]*)\s*(?:inr|rs|rupees?)\b/);
        if (!amount) return null;
        const value = Number((amount[1] || amount[2]).replace(/,/g, ''));
        return Number.isFinite(value) && value >= 1000 ? value : null;
    };

    const extractCount = (normalized, expressions) => {
        for (const expression of expressions) {
            const match = normalized.match(new RegExp(`\\b(\\d{1,2})\\s*(?:${expression})\\b`));
            if (match) return Number(match[1]);
        }
        return null;
    };

    const extractEntities = (question, rawContext = freshContext()) => {
        const context = cleanContext(rawContext);
        const normalized = normaliseText(question);
        let attraction = /\b(?:sree )?padmanabha\s*swamy(?: temple)?\b|\bpadmanabhaswamy(?: temple)?\b/.test(normalized) ? 'padmanabhaswamy' : null;
        const activePlanIncludesTemple = PADMANABHASWAMY?.planIds.includes(context.activePlanId || context.basePlanId || context.lastPlanId);
        if (!attraction && activePlanIncludesTemple && /\b(the )?temple(?: day| visit)?\b/.test(normalized)) attraction = 'padmanabhaswamy';
        let destinations = detectDestinations(normalized);
        const planIds = detectPlanIds(normalized);
        const dayRequest = extractDayRequest(normalized);
        const referencesThere = /\b(there|that place|that destination|it)\b/.test(normalized);
        const referencesOther = /\b(other one|the other|other place)\b/.test(normalized);

        if (!destinations.length && context.pendingPlanDestination && /\b(remove|skip|drop) (?:it|that|this)\b/.test(normalized)) {
            destinations = [context.pendingPlanDestination];
        }

        if (referencesOther && context.previousComparison.length === 2) {
            const alternative = context.previousComparison.find(id => id !== context.currentDestination) || context.previousComparison[1];
            destinations = [alternative];
        } else if (referencesThere && context.currentDestination && !destinations.includes(context.currentDestination)) {
            destinations.push(context.currentDestination);
        } else if (!destinations.length && context.currentDestination && /\b(how many days|hotels?|stays?|cheaper|food|eat|safe|july|monsoon|weather|how do (i|we) get|how far|there)\b/.test(normalized)) {
            destinations = [context.currentDestination];
        }

        const duration = extractDuration(normalized);
        const budget = extractMoney(normalized);
        const monthKey = Object.keys(MONTHS).find(month => containsPhrase(normalized, month));
        const adults = extractCount(normalized, ['adult', 'adults']);
        const children = extractCount(normalized, ['kid', 'kids', 'child', 'children']);
        const seniors = extractCount(normalized, ['senior', 'seniors', 'grandparent', 'grandparents']);
        const infants = extractCount(normalized, ['infant', 'infants', 'baby', 'babies']);
        let travellerType = null;
        if (/\b(parents?).*\b(children|kids?).*\b(grandparents?|seniors?)\b|\b(grandparents?|seniors?).*\b(children|kids?)\b/.test(normalized)) travellerType = 'family';
        else if (/\b(senior|seniors|elderly|older travellers?|grandparents?|senior couple)\b/.test(normalized)) travellerType = 'senior';
        else if (/\b(student|students|friends|college group)\b/.test(normalized)) travellerType = 'students';
        else if (/\b(couple|honeymoon|partners?)\b/.test(normalized)) travellerType = 'couple';
        else if (/\b(solo|alone|by myself)\b/.test(normalized)) travellerType = 'solo';
        else if (/\b(family|families|kids?|children|parents)\b/.test(normalized)) travellerType = 'family';
        const studentAgeGroup = /\b(school students?|school group|minors?|under 18|children students?)\b/.test(normalized)
            ? 'school'
            : /\b(college students?|college group|adult students?|university students?)\b/.test(normalized) ? 'college' : null;

        const familyOf = normalized.match(/\bfamily of (\d{1,2}|one|two|three|four|five|six|seven|eight)\b/);
        const familySize = familyOf ? (Number(familyOf[1]) || NUMBER_WORDS[familyOf[1]]) : null;
        const peopleNumeric = normalized.match(/\b(\d{1,2})\s*(?:people|persons?|travellers?|travelers?)\b/);
        let peopleWords = null;
        if (!peopleNumeric) {
            const word = Object.keys(NUMBER_WORDS).find(numberWord => new RegExp(`\\b${numberWord}\\s+(?:people|persons?|travellers?|travelers?)\\b`).test(normalized));
            if (word) peopleWords = NUMBER_WORDS[word];
        }
        const totalTravellers = familySize || (peopleNumeric ? Number(peopleNumeric[1]) : peopleWords);
        const interests = Object.entries(INTEREST_PATTERNS).filter(([, pattern]) => pattern.test(normalized)).map(([interest]) => interest);
        let pace = null;
        if (/\b(relaxed|slow|easy paced|easy-paced|not rushed|hate long drives|avoid long drives|dont want too many long drives)\b/.test(normalized)) pace = 'relaxed';
        else if (/\b(active|fast paced|fast-paced|adventure)\b/.test(normalized)) pace = 'active';
        else if (/\b(balanced|moderate pace)\b/.test(normalized)) pace = 'balanced';

        let transportPreference = null;
        if (/\b(train|rail)\b/.test(normalized)) transportPreference = 'train';
        else if (/\b(flight|fly|airport)\b/.test(normalized)) transportPreference = 'flight';
        else if (/\b(bus|ksrtc)\b/.test(normalized)) transportPreference = 'bus';
        else if (/\b(car|taxi|cab|driver)\b/.test(normalized)) transportPreference = 'car';

        const transportModes = [];
        if (/\b(car|taxi|cab|driver)\b/.test(normalized)) transportModes.push(/\b(taxi|cab)\b/.test(normalized) ? (normalized.match(/\b(taxi|cab)\b/)?.[1] || 'car') : 'car');
        if (/\b(train|rail)\b/.test(normalized)) transportModes.push('train');
        if (/\b(flight|fly|flying)\b/.test(normalized)) transportModes.push('flight');
        if (/\b(bus|ksrtc)\b/.test(normalized)) transportModes.push('bus');
        const modeComparison = /\b(car|train|flight|bus|taxi|cab)\s+(?:or|vs|versus)\s+(car|train|flight|bus|taxi|cab)\b/.test(normalized);
        const planComparison = planIds.length >= 2 && /\b(or|vs|versus|compare|which|better|difference)\b/.test(normalized);
        const routeQuestion = destinations.length >= 2 && (/\b(from|to|between|route|travel|drive|road|map|fly|flight|train|car|cab)\b/.test(normalized) || destinations.length >= 3);

        let accommodationPreference = null;
        if (/\b(homestay|home stay)\b/.test(normalized)) accommodationPreference = 'homestay';
        else if (/\b(resort)\b/.test(normalized)) accommodationPreference = 'resort';
        else if (/\b(hostel)\b/.test(normalized)) accommodationPreference = 'hostel';
        else if (/\b(houseboat)\b/.test(normalized)) accommodationPreference = 'houseboat';
        else if (/\b(hotel)\b/.test(normalized)) accommodationPreference = 'hotel';

        const intents = Object.entries(INTENT_PATTERNS).filter(([, pattern]) => pattern.test(normalized)).map(([intent]) => intent);
        if (modeComparison) {
            const comparisonIndex = intents.indexOf('comparison');
            if (comparisonIndex >= 0) intents.splice(comparisonIndex, 1);
            if (!intents.includes('transport')) intents.push('transport');
        }
        if (budget && !intents.includes('budget')) intents.push('budget');
        if (destinations.length >= 2 && /\bto\b|\bhow\b/.test(normalized) && !/\b(or|vs|versus|compare)\b/.test(normalized) && !intents.includes('transport')) intents.push('transport');
        if ((pace || /\bhate long drives\b/.test(normalized)) && !intents.includes('plan')) intents.push('plan');
        if (monthKey && !intents.includes('weather')) intents.push('weather');
        if (destinations.length && !intents.length) intents.push('destination');
        if (!modeComparison && destinations.length >= 2 && /\b(or|vs|versus|compare|better|cheaper|which)\b/.test(normalized) && !intents.includes('comparison')) intents.push('comparison');
        if (planIds.length || dayRequest.day || dayRequest.range || dayRequest.last || /\b(which plans?|does (?:it|this|the .*plan)|where do we stay each night|hotel changes|overnight bases?|which day|when do we|when is|why (?:does|doesnt|is|isnt)|map the .*plan|show the .*plan)\b/.test(normalized)) {
            if (!intents.includes('plan')) intents.push('plan');
        }
        if (planComparison) {
            const comparisonIndex = intents.indexOf('comparison');
            if (comparisonIndex >= 0) intents.splice(comparisonIndex, 1);
        }
        if (!intents.length && /\b(hi|hello|hey|namaste|bro|brother)\b/.test(normalized)) intents.push('help');

        return { normalized, attraction, destinations, planIds, planComparison, dayRequest, duration, budget, month: monthKey || null, adults, children, seniors, infants, familySize, totalTravellers, travellerType, studentAgeGroup, interests, pace, transportPreference, transportModes, modeComparison, routeQuestion, accommodationPreference, intents, referencesThere, referencesOther };
    };

    const mergeEntitiesIntoContext = (rawContext, entities) => {
        const context = cleanContext(rawContext);
        const removingDestination = /\b(remove|skip|drop)\b/.test(entities.normalized);
        const addingDestination = /\badd\b/.test(entities.normalized)
            || (/\binclude\b/.test(entities.normalized) && !/\b(does|which|plan|it|this|that)\b/.test(entities.normalized));
        const routeDestinations = entities.destinations.filter(id => ROUTE_CORE?.destinations?.[id]);
        const editingPlanRoute = (removingDestination || addingDestination) && routeDestinations.length && ['published-plan', 'custom-user-route'].includes(context.routeSource);

        if (removingDestination && routeDestinations.length && context.activeRoute.length) {
            context.activeRoute = context.activeRoute.filter(id => !routeDestinations.includes(id));
        } else if (addingDestination && routeDestinations.length && context.activeRoute.length >= 2) {
            context.activeRoute = [...new Set([...context.activeRoute, ...routeDestinations])].slice(0, 8);
        } else if (routeDestinations.length >= 2 && (entities.routeQuestion || entities.intents.includes('transport') || routeDestinations.length >= 3)) {
            context.activeRoute = [...new Set(routeDestinations)].slice(0, 8);
            context.routeSource = 'transport-query';
            context.activePlanId = null;
        }

        if (editingPlanRoute) {
            context.basePlanId = context.activePlanId || context.basePlanId || context.lastPlanId;
            context.activePlanId = null;
            context.routeSource = 'custom-user-route';
            context.pendingPlanDestination = null;
        }

        if (entities.destinations.length) {
            if (removingDestination) {
                context.destinations = context.destinations.filter(id => !entities.destinations.includes(id));
                if (entities.destinations.includes(context.currentDestination)) context.currentDestination = context.destinations.at(-1) || null;
            } else {
                context.destinations = [...new Set([...context.destinations, ...entities.destinations])].slice(-8);
                context.currentDestination = entities.destinations.at(-1);
            }
        }
        if (entities.attraction) context.currentAttraction = entities.attraction;
        if (entities.duration) context.duration = entities.duration;
        if (entities.travellerType) context.travellerType = entities.travellerType;
        if (entities.studentAgeGroup) context.studentAgeGroup = entities.studentAgeGroup;
        if (entities.adults !== null) context.adults = entities.adults;
        if (entities.children !== null) context.children = entities.children;
        if (entities.seniors !== null) context.seniors = entities.seniors;
        if (entities.infants !== null) context.infants = entities.infants;
        if (entities.totalTravellers) context.totalTravellers = entities.totalTravellers;
        if (entities.familySize && context.adults === null && context.children === null) {
            context.adults = Math.min(2, entities.familySize);
            context.children = Math.max(0, entities.familySize - context.adults);
        }
        if (entities.budget) context.budget = entities.budget;
        if (entities.month) context.month = entities.month;
        if (entities.pace) context.pace = entities.pace;
        if (/\b(hate long drives|avoid long drives|dont want too many long drives|do not want (?:too many )?long drives)\b/.test(entities.normalized)) context.avoidLongDrives = true;
        if (entities.transportPreference) context.transportPreference = entities.transportPreference;
        if (entities.accommodationPreference) context.accommodationPreference = entities.accommodationPreference;

        if (/\b(skip|remove|without|dont want|do not want|hate)\b/.test(entities.normalized)) {
            context.interests = context.interests.filter(interest => !entities.interests.includes(interest));
        } else if (addingDestination || entities.interests.length) {
            context.interests = [...new Set([...context.interests, ...entities.interests])].slice(0, 8);
        }
        context.turnCount += 1;
        return context;
    };

    const destinationNames = ids => ids.map(id => DESTINATIONS[id]?.name).filter(Boolean);
    const formatList = items => items.length < 2 ? (items[0] || '') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
    const formatMoney = value => `₹${Number(value).toLocaleString('en-IN')}`;
    const mapLink = ids => {
        const valid = [...new Set(ids.filter(id => ROUTE_CORE?.destinations?.[id]))];
        if (valid.length > 2) {
            const route = valid.map(id => encodeURIComponent(id)).join(',');
            return [`map.html?mode=multi&route=${route}`, 'Open this multi-city road trip on the map'];
        }
        return valid.length === 2
            ? [`map.html?from=${encodeURIComponent(ROUTE_CORE.destinations[valid[0]].name)}&to=${encodeURIComponent(ROUTE_CORE.destinations[valid[1]].name)}`, 'Open this route on the map']
            : ['map.html', 'Open the Kerala journey planner'];
    };
    const result = (id, text, link = null, related = DEFAULT_SUGGESTIONS, audio = null) => ({ id, text, link, related, audio });

    const routeNames = ids => ids.map(id => ROUTE_CORE?.destinations?.[id]?.name || DESTINATIONS[id]?.name).filter(Boolean);
    const routeLine = ids => routeNames(ids).join(' → ');
    const modeName = mode => ({ taxi: 'Car', cab: 'Car', car: 'Car', train: 'Train', flight: 'Flight', bus: 'Bus' }[mode] || mode);
    const flightUnavailableReason = reason => ({
        'same-airport-region': 'Both places use the same practical airport region, so flying would not remove the road transfer.',
        'airports-too-close': 'Airport check-in and transfers would take longer than the time saved.',
        'rail-more-direct': 'Rail is more direct once airport transfers and check-in time are included.'
    }[reason] || 'No practical airport pairing meaningfully reduces this journey.');

    const describePointMode = (mode, summary) => {
        const name = modeName(mode);
        const { route, recommendation } = summary;
        if (name === 'Car') {
            const warning = route.minutes >= 360 ? ' It is a long driving day, so plan breaks or divide the journey.' : '';
            return `Car is practical for this ${route.distance} km route and takes approximately ${ROUTE_CORE.formatDuration(route.minutes)} by road.${warning}`;
        }
        if (name === 'Train') {
            if (!recommendation.rail.available) return 'Train is not practical because one or both places need a substantial road transfer to reach a useful railway station.';
            const transfer = recommendation.rail.requiresRoadTransfer ? ' Local road transfers are still required at one or both ends.' : '';
            return `Train is practical via ${recommendation.rail.fromStation} to ${recommendation.rail.toStation}, subject to current services.${transfer}`;
        }
        if (name === 'Flight') {
            if (!recommendation.flight.available) return `Flight is not practical here. ${flightUnavailableReason(recommendation.flight.reason)}`;
            return `Flight is practical via ${recommendation.flight.fromCode} to ${recommendation.flight.toCode}, followed by road transfers where required. Approximate door-to-door planning time is ${ROUTE_CORE.formatDuration(recommendation.approximateMinutes)}; verify current operations and fares.`;
        }
        if (name === 'Bus') return `A bus may cover part or all of this road route, but this static guide does not verify live services. Compare the ${route.distance} km road journey in the planner and confirm the current operator and connections.`;
        return '';
    };

    const monthAdvice = (monthKey, destination) => {
        const month = MONTHS[monthKey];
        if (!month) return '';
        let extra = '';
        if (month.season === 'monsoon' && destination) {
            if (destination.interests.includes('beaches')) extra = ' Do not assume the sea is safe: follow flags and lifeguards, and keep a non-beach backup.';
            else if (destination.interests.includes('hills')) extra = ' Allow extra road time, expect mist or reduced views, and check current road and weather notices.';
            else if (destination.interests.includes('backwaters')) extra = ' Confirm boat operation and boarding conditions shortly before travel.';
        }
        return `${month.name}: ${month.note}${extra}`;
    };

    const groupSummary = context => {
        const parts = [];
        if (context.adults !== null) parts.push(`${context.adults} adult${context.adults === 1 ? '' : 's'}`);
        if (context.children !== null) parts.push(`${context.children} child${context.children === 1 ? '' : 'ren'}`);
        if (context.seniors !== null) parts.push(`${context.seniors} senior${context.seniors === 1 ? '' : 's'}`);
        if (context.infants !== null) parts.push(`${context.infants} infant${context.infants === 1 ? '' : 's'}`);
        if (!parts.length && context.totalTravellers) parts.push(`${context.totalTravellers} travellers`);
        return parts.length ? formatList(parts) : context.travellerType ? `${context.travellerType} travellers` : null;
    };

    const buildRecallReply = context => {
        const remembered = [];
        if (context.duration) remembered.push(`${context.duration} days`);
        const group = groupSummary(context);
        if (group) remembered.push(group);
        if (context.destinations.length) remembered.push(`places: ${formatList(destinationNames(context.destinations))}`);
        if (context.activeRoute.length >= 2) remembered.push(`active route: ${routeLine(context.activeRoute)}`);
        if (context.activePlanId) remembered.push(`active plan: ${planById(context.activePlanId)?.name}`);
        else if (context.routeSource === 'custom-user-route' && context.basePlanId) remembered.push(`modified from: ${planById(context.basePlanId)?.name}`);
        if (context.interests.length) remembered.push(`interests: ${formatList(context.interests)}`);
        if (context.month) remembered.push(`travel month: ${MONTHS[context.month].name}`);
        if (context.budget) remembered.push(`planning ceiling: ${formatMoney(context.budget)}`);
        if (context.pace) remembered.push(`${context.pace} pace`);
        if (context.avoidLongDrives) remembered.push('fewer long drives');
        return remembered.length
            ? result('recall', `You told me ${formatList(remembered)}. I will keep using those details in this conversation; tell me what you want to change.`, ['itineraries.html#trip-finder-title', 'Use these ideas in the Plan Finder'])
            : result('recall-empty', 'You have not given me trip details yet. Start with your number of days, traveller group, interests or one Kerala destination.', ['itineraries.html#trip-finder-title', 'Open the Plan Finder']);
    };

    const comparisonWinner = (left, right, entities, context) => {
        if (/\b(cheap|cheaper|budget|affordable)\b/.test(entities.normalized)) {
            if (left.cost === right.cost) return { winner: null, reason: 'Their stay costs overlap; route length and accommodation type will matter more than the destination name.' };
            const winner = left.cost < right.cost ? left : right;
            return { winner, reason: `${winner.name} usually offers the lower-cost style in this comparison, but dates and the chosen stay can reverse it.` };
        }
        if (entities.travellerType === 'family' || /\b(kids?|children)\b/.test(entities.normalized)) {
            const winner = left.family === right.family ? null : (left.family > right.family ? left : right);
            return { winner, reason: winner ? `${winner.name} is the easier family fit based on access and activity flexibility.` : 'Both can work with children; choose by route convenience and the activities your family prefers.' };
        }
        if (entities.travellerType === 'senior' || context.travellerType === 'senior') {
            const winner = left.senior === right.senior ? null : (left.senior > right.senior ? left : right);
            return { winner, reason: winner ? `${winner.name} is the gentler fit based on access and walking demands.` : 'Both need property-level accessibility checks, so route pace and room access should decide.' };
        }
        if ((entities.month && MONTHS[entities.month].season === 'monsoon') || /\bmonsoon\b/.test(entities.normalized)) {
            const winner = left.monsoon === right.monsoon ? null : (left.monsoon > right.monsoon ? left : right);
            return { winner, reason: winner ? `${winner.name} has better rainy-day flexibility in this pairing.` : 'Both need flexible monsoon planning and current road or activity checks.' };
        }
        return { winner: null, reason: 'Neither is universally better; the right choice depends on scenery, route position and pace.' };
    };

    const knownComparisonNote = (leftId, rightId) => {
        const pair = new Set([leftId, rightId]);
        if (pair.has('munnar') && pair.has('wayanad')) return 'Munnar is a more compact tea-hill stop on the classic south/central route; Wayanad is a larger northern district with forests, caves and longer internal drives.';
        if (pair.has('varkala') && pair.has('kovalam')) return 'Varkala offers cliff scenery and an independent café atmosphere; Kovalam offers established resorts and easier access from Thiruvananthapuram.';
        if (pair.has('alappuzha') && pair.has('kumarakom')) return 'Alappuzha is the classic houseboat hub and feels busier; Kumarakom is quieter and stronger for lake resorts and a slow stay.';
        if (pair.has('alappuzha') && pair.has('munroe-island')) return 'Alappuzha suits a classic overnight houseboat; Munroe Island suits a smaller canoe-and-village experience with less tourism infrastructure.';
        if (pair.has('kochi') && pair.has('thiruvananthapuram')) return 'Kochi is the central heritage and arrival hub; Thiruvananthapuram is the capital and southern gateway for Kovalam and Poovar.';
        if (pair.has('thekkady') && pair.has('wayanad')) return 'Thekkady is a compact wildlife-and-spice stop on the Munnar route; Wayanad is a broader northern nature region needing more travel time.';
        return null;
    };

    const buildComparisonReply = (entities, context) => {
        const ids = entities.destinations.length >= 2 ? entities.destinations.slice(0, 2) : context.previousComparison.slice(0, 2);
        if (ids.length < 2) return result('comparison-clarify', 'I can compare them. Which two Kerala places, stays or plans do you mean?', ['destinations.html', 'Browse destinations'], ['compare', 'choose-plan', 'hotels']);
        const [leftId, rightId] = ids;
        const left = DESTINATIONS[leftId];
        const right = DESTINATIONS[rightId];
        const decision = comparisonWinner(left, right, entities, context);
        const difference = knownComparisonNote(leftId, rightId) || `${left.name} is best for ${formatList(left.interests.slice(0, 2))}; ${right.name} is best for ${formatList(right.interests.slice(0, 2))}.`;
        const month = entities.month ? ` ${monthAdvice(entities.month, decision.winner || left)}` : '';
        context.previousComparison = ids;
        context.comparisonWinner = decision.winner ? ids.find(id => DESTINATIONS[id] === decision.winner) : null;
        context.lastComparisonReason = `${difference} ${decision.reason}`;
        context.destinations = context.destinations.filter(id => !ids.includes(id));
        if (context.comparisonWinner) {
            context.currentDestination = context.comparisonWinner;
            context.destinations.push(context.comparisonWinner);
        }
        return result('comparison', `${difference} ${decision.reason}${month}`, mapLink(ids), ['transport', 'hotels', 'choose-plan']);
    };

    const planById = id => PLAN_DATA?.byId?.[id] || null;

    const choosePlan = context => {
        const duration = context.duration;
        if (duration === 5 && context.travellerType === 'students') return planById('student');
        if (duration === 5 && context.travellerType === 'senior') return planById('senior');
        if (duration === 5 && context.avoidLongDrives) return planById('senior');
        return PLANS.find(plan => plan.days === duration && !['student', 'senior'].includes(plan.id)) || null;
    };

    const setPublishedPlan = (context, plan) => {
        context.duration = plan.days;
        context.activePlanId = plan.id;
        context.basePlanId = plan.id;
        context.lastPlanId = plan.id;
        context.routeSource = 'published-plan';
        context.activeRoute = [...plan.route];
        context.destinations = [...plan.route];
        context.currentDestination = plan.route.at(-1) || null;
        context.pendingPlanDestination = null;
        return plan;
    };

    const resolvePlan = (entities, context) => {
        if (entities.planIds.length === 1) return planById(entities.planIds[0]);
        return planById(context.activePlanId) || planById(context.basePlanId) || planById(context.lastPlanId) || choosePlan(context);
    };

    const planMetrics = plan => {
        if (!plan || !ROUTE_CORE) return null;
        if (plan.route.length === 2) {
            const point = ROUTE_CORE.pointSummary(plan.route[0], plan.route[1]);
            return point ? { distance: point.route.distance, minutes: point.route.minutes, longestLeg: { fromId: plan.route[0], toId: plan.route[1], route: point.route }, comfort: plan.driveLoad } : null;
        }
        const excluded = new Set((plan.nonRoadTransfers || []).map(item => `${item.from}:${item.to}`));
        if (!excluded.size) return ROUTE_CORE.multiSummary(plan.route);
        const legs = [];
        for (let index = 0; index < plan.route.length - 1; index += 1) {
            const fromId = plan.route[index];
            const toId = plan.route[index + 1];
            if (excluded.has(`${fromId}:${toId}`)) continue;
            const point = ROUTE_CORE.pointSummary(fromId, toId);
            if (point) legs.push({ fromId, toId, route: point.route });
        }
        const longestLeg = legs.reduce((longest, leg) => !longest || leg.route.minutes > longest.route.minutes ? leg : longest, null);
        return {
            distance: legs.reduce((sum, leg) => sum + leg.route.distance, 0),
            minutes: legs.reduce((sum, leg) => sum + leg.route.minutes, 0),
            longestLeg,
            comfort: plan.driveLoad,
            nonRoadTransfers: plan.nonRoadTransfers
        };
    };

    const planMapLink = (plan, route = plan?.route || []) => {
        const link = mapLink(route);
        if (plan && link) link[1] = `Open the ${plan.name} route on the map`;
        return link;
    };

    const planDay = (plan, number) => plan?.dayByDay.find(item => item.days.includes(number)) || null;
    const planRouteForDays = (plan, fromDay, toDay) => {
        const included = new Set(plan.dayByDay.filter(item => item.days.some(day => day >= fromDay && day <= toDay)).flatMap(item => item.destinations));
        return plan.route.filter(id => included.has(id));
    };

    const planDayText = (plan, number) => {
        const entry = planDay(plan, number);
        if (!entry) return `The ${plan.name} has no Day ${number}; it runs for ${plan.days} days.`;
        if (entry.days.length > 1) {
            const specific = entry.perDay?.[number];
            return specific
                ? `Day ${number} is part of ${entry.label}, ${entry.title}: ${specific}`
                : `Day ${number} is part of the grouped ${entry.label} section, ${entry.title}. ${entry.summary}`;
        }
        return `${entry.label} - ${entry.title}: ${entry.summary}`;
    };

    const compactPlanSummary = plan => {
        const days = plan.dayByDay.map(item => `${item.label}: ${item.title}`).join('; ');
        return `${plan.name}. Route: ${routeLine(plan.route)}. Pace: ${plan.pace}. Best for ${formatList(plan.bestFor.slice(0, 2))}. ${days}.`;
    };

    const planComparisonDecision = (left, right, text, context) => {
        const leftMetrics = planMetrics(left);
        const rightMetrics = planMetrics(right);
        if (/\b(less|least|fewer) driv|shorter transfer|less tiring|more relaxed|fewer hotel changes\b/.test(text)) {
            const leftScore = (leftMetrics?.minutes || 9999) + (left.overnightBases.length * 30);
            const rightScore = (rightMetrics?.minutes || 9999) + (right.overnightBases.length * 30);
            return leftScore <= rightScore ? left : right;
        }
        const interest = Object.keys(INTEREST_PATTERNS).find(key => new RegExp(`\\b${key.replace(/s$/, '')}s?\\b`).test(text));
        if (interest) {
            const leftHas = left.interests.includes(interest);
            const rightHas = right.interests.includes(interest);
            if (leftHas !== rightHas) return leftHas ? left : right;
        }
        if (/\b(beach|beaches)\b/.test(text)) return left.interests.includes('beaches') !== right.interests.includes('beaches') ? (left.interests.includes('beaches') ? left : right) : null;
        if (context.travellerType === 'senior') return [left, right].find(plan => plan.id === 'senior') || null;
        if (context.travellerType === 'students') return [left, right].find(plan => plan.id === 'student') || null;
        return null;
    };

    const buildPlanComparisonReply = (entities, context) => {
        const ids = entities.planIds.length >= 2 ? entities.planIds.slice(0, 2) : context.previousPlanComparison.slice(0, 2);
        if (ids.length < 2) return result('plan-comparison-clarify', 'Which two published plans should I compare?', ['itineraries.html', 'View all plans'], ['choose-plan', 'budget']);
        const [left, right] = ids.map(planById);
        context.previousPlanComparison = ids;
        const winner = planComparisonDecision(left, right, entities.normalized, context);
        context.planComparisonWinner = winner?.id || null;

        let difference;
        if (new Set(ids).has('student') && new Set(ids).has('five-day')) difference = 'The student plan uses Kochi, Munnar and Alappuzha with shared, value-conscious choices; the standard 5-day plan adds Thekkady and an overnight houseboat for the classic first-time circuit.';
        else if (new Set(ids).has('senior') && new Set(ids).has('five-day')) difference = 'The senior plan uses Kochi, Kumarakom and Thiruvananthapuram with private transfers, protected rest and a daytime cruise; the standard 5-day plan adds Munnar, Thekkady and an overnight houseboat, with more hill driving.';
        else if (new Set(ids).has('five-day') && new Set(ids).has('seven-day')) difference = 'The 5-day plan is the compact classic Kochi-Munnar-Thekkady-Alappuzha circuit. The 7-day plan adds Kadamakkudy, replaces Alappuzha with Munroe Island, and finishes through Varkala and Thiruvananthapuram heritage.';
        else if (new Set(ids).has('seven-day') && new Set(ids).has('ten-day')) difference = 'Both plans include Thiruvananthapuram heritage. The 7-day plan finishes there after Varkala; the 10-day plan continues north by an overnight rail-and-road connection to Wayanad, Valiyaparamba and Bekal.';
        else difference = `${left.name} is ${left.pace} with ${left.overnightBases.length} bases; ${right.name} is ${right.pace} with ${right.overnightBases.length} bases.`;

        const decision = winner ? ` For this question, ${winner.name} is the stronger fit.` : ' Neither is universally better; choose by available days, preferred pace and the experiences you value most.';
        return result('plan-comparison', `${difference}${decision}`, [winner?.page || 'itineraries.html', winner ? `View ${winner.name}` : 'Compare all plans'], ['choose-plan', 'budget', 'transport']);
    };

    const plansMatchingQuestion = entities => {
        const text = entities.normalized;
        if (/\b(least driving|fewest hotel changes|most relaxed|most offbeat|best for first timers?|best plan for seniors?|best plan for students?)\b/.test(text)) return null;
        const destination = entities.destinations[0];
        return PLANS.filter(plan => {
            if (destination) return plan.route.includes(destination) || plan.dayByDay.some(day => day.destinations.includes(destination));
            if (/\bhouseboat\b/.test(text)) return plan.waterExperience === 'overnight houseboat';
            if (/\bbackwaters?\b/.test(text)) return plan.interests.includes('backwaters');
            if (/\b(beach|beaches)\b/.test(text)) return plan.interests.includes('beaches');
            if (/\bwildlife\b/.test(text)) return plan.interests.includes('wildlife');
            if (/\boffbeat\b/.test(text)) return plan.interests.includes('offbeat');
            return false;
        });
    };

    const buildPlanSearchReply = (entities, context) => {
        const text = entities.normalized;
        if (/\bbest plan for seniors?\b/.test(text)) {
            const plan = setPublishedPlan(context, planById('senior'));
            return result('plan-feature-search', `The ${plan.name} is the best starting point: three planned bases, private transfers, late starts, protected rest and a daytime cruise. Day 4 is the longest transfer; confirm step-free access and boat boarding directly.`, [plan.page, 'View the senior plan'], ['budget', 'transport']);
        }
        if (/\bbest plan for students?\b/.test(text)) {
            const plan = setPublishedPlan(context, planById('student'));
            const caution = context.studentAgeGroup === 'school' ? ' School groups and minors need supervised accommodation; hostel age and group policies must be checked.' : '';
            return result('plan-feature-search', `The ${plan.name} is designed for an active, value-conscious group of friends using shared choices.${caution}`, [plan.page, 'View the student plan'], ['budget', 'transport']);
        }
        if (/\bbest plan for first timers?\b/.test(text)) return result('plan-feature-search', 'For a short first visit choose the 3-day plan; for the classic hills-and-houseboat circuit choose 5 days; for the fullest first trip with a beach finish choose 7 days.', ['itineraries.html', 'Compare first-time plans'], ['choose-plan', 'budget']);
        if (/\bmost relaxed\b/.test(text)) return result('plan-feature-search', 'The 5-Day Easy-Paced Senior Plan is the most relaxed published route: protected rest, private transfers, short activities and a light final heritage day.', ['plan-5-days-seniors.html', 'View the relaxed plan'], ['budget', 'transport']);
        if (/\bmost offbeat\b/.test(text)) return result('plan-feature-search', 'The 10-Day Kerala Deep Dive contains the most offbeat places: Kadamakkudy, Munroe Island and Valiyaparamba, but it also has the heaviest driving load.', ['plan-10-days.html', 'View the 10-day plan'], ['transport', 'budget']);
        if (/\bfewest hotel changes\b/.test(text)) return result('plan-feature-search', 'The 3-Day Kochi + Backwaters plan and the 5-Day Easy-Paced Senior Plan each use only two overnight bases, so both require just one hotel or stay change.', ['itineraries.html', 'Compare all plans'], ['choose-plan']);
        if (/\bleast driving\b/.test(text)) return result('plan-feature-search', 'The 3-Day Kochi + Backwaters plan has the least total driving. The senior plan is paced more gently, but now includes a longer Kumarakom-to-Thiruvananthapuram transfer on Day 4.', ['plan-3-days.html', 'View the shortest route'], ['transport']);

        const matches = plansMatchingQuestion(entities) || [];
        const feature = entities.destinations[0] ? DESTINATIONS[entities.destinations[0]].name : /\bhouseboat\b/.test(text) ? 'an overnight houseboat' : entities.interests[0] || 'that feature';
        if (!matches.length) return result('plan-feature-search', `None of the six published plans clearly includes ${feature}. A custom route may be needed.`, ['itineraries.html#trip-finder-title', 'Open the Plan Finder'], ['choose-plan']);
        return result('plan-feature-search', `${formatList(matches.map(plan => plan.name))} ${matches.length === 1 ? 'includes' : 'include'} ${feature}.`, [matches[0].page, `View ${matches[0].name}`], ['choose-plan', 'budget']);
    };

    const generatedRoute = context => {
        const interests = new Set(context.interests);
        const days = context.duration || 5;
        if (context.destinations.length) return context.destinations.slice();
        if (context.travellerType === 'senior' || context.avoidLongDrives) {
            if (days <= 3) return ['kochi', 'alappuzha'];
            if (days <= 6) return ['kochi', interests.has('hills') ? 'munnar' : 'kumarakom'];
            return ['kochi', 'kumarakom', 'munroe-island', 'varkala'];
        }
        const route = ['kochi'];
        if (interests.has('hills') || days >= 4) route.push('munnar');
        if (interests.has('wildlife') && days >= 5) route.push('thekkady');
        if (interests.has('backwaters') || days >= 3) route.push(days >= 7 && interests.has('offbeat') ? 'munroe-island' : 'alappuzha');
        if (interests.has('beaches') && days >= 6) route.push('varkala');
        if ((interests.has('offbeat') || interests.has('nature')) && days >= 9) route.push('wayanad');
        return [...new Set(route)];
    };

    const routeIsRushed = (ids, days) => {
        if (!days || ids.length < 2) return false;
        const north = new Set(['wayanad', 'kozhikode', 'kannur', 'valiyaparamba', 'bekal']);
        const south = new Set(['kollam', 'munroe-island', 'varkala', 'kovalam', 'poovar', 'thiruvananthapuram']);
        const spansState = ids.some(id => north.has(id)) && ids.some(id => south.has(id));
        return ids.length > Math.max(2, Math.ceil(days / 1.7)) || (spansState && days < 8);
    };

    const buildAttractionReply = (entities, context) => {
        if (!PADMANABHASWAMY) return result('attraction-unavailable', 'The temple information is temporarily unavailable. Please use the Thiruvananthapuram guide and verify current visitor guidance before travel.', ['destination-thiruvananthapuram.html', 'Open the Thiruvananthapuram guide']);
        const text = entities.normalized;
        const plan = entities.planIds.length === 1
            ? planById(entities.planIds[0])
            : planById(context.activePlanId) || planById(context.basePlanId) || planById(context.lastPlanId);
        if (plan && entities.planIds.length === 1) setPublishedPlan(context, plan);
        const includedPlans = PADMANABHASWAMY.planIds.map(planById).filter(Boolean);
        const sourceLink = [PADMANABHASWAMY.officialSource, 'Check official temple guidance'];

        if (/\b(?:which|what) plans?\b|\bwhich itineraries?\b/.test(text)) {
            return result('attraction-plans', `${PADMANABHASWAMY.name} is included in the ${formatList(includedPlans.map(item => item.name))}. It is not included in the regular 3-day or 5-day plan or the student plan.`, ['itineraries.html', 'Compare all plans'], ['choose-plan']);
        }
        if (plan && !/\b(tiring|seniors?|elderly|accessible|walking|queue)\b/.test(text) && /\b(does|is|include|included|has|part of)\b/.test(text)) {
            const day = PADMANABHASWAMY.planDays[plan.id];
            return day
                ? result('attraction-plan-inclusion', `Yes. The ${plan.name} includes ${PADMANABHASWAMY.name} on Day ${day} in Thiruvananthapuram.`, [plan.page, 'View the full itinerary'], ['transport'])
                : result('attraction-plan-inclusion', `No. The published ${plan.name} does not include ${PADMANABHASWAMY.name}. It is included only in the 7-day, 10-day and easy-paced senior plans.`, [plan.page, 'View this itinerary'], ['choose-plan']);
        }
        if (plan && /\b(which day|what day|when|day is it)\b/.test(text)) {
            const day = PADMANABHASWAMY.planDays[plan.id];
            return result('attraction-plan-day', day ? `${PADMANABHASWAMY.name} is scheduled on Day ${day} of the ${plan.name}.` : `The published ${plan.name} does not schedule this temple.`, [plan.page, 'View the day-by-day plan'], ['transport']);
        }
        if (/\b(where|location|which city)\b/.test(text)) return result('attraction-location', `${PADMANABHASWAMY.name} is in Thiruvananthapuram's historic East Fort area.`, ['destination-thiruvananthapuram.html', 'Open the city guide'], ['transport']);
        if (/\b(non hindu|not hindu|everyone|who can enter|entry|dress|clothes|rules?|timings?)\b/.test(text)) return result('attraction-entry', `${PADMANABHASWAMY.entryNote} ${PADMANABHASWAMY.timingNote}`, sourceLink, ['safety']);
        if (/\b(cant enter|cannot enter|cannot go|alternative|instead|prefer not)\b/.test(text)) return result('attraction-alternative', `${PADMANABHASWAMY.alternative.summary} Verify current opening details before visiting.`, ['destination-thiruvananthapuram.html', 'Open the Thiruvananthapuram guide'], ['culture']);
        if (/\b(tiring|seniors?|elderly|accessible|walking|queue)\b/.test(text)) {
            const seniorDay = PADMANABHASWAMY.planDays.senior;
            return result('attraction-access', `The easy-paced senior plan keeps this as a light Day ${seniorDay} visit after a relaxed breakfast, followed by lunch, rest and departure. ${PADMANABHASWAMY.accessibilityNote}`, ['plan-5-days-seniors.html', 'View the senior plan'], ['safety']);
        }
        return result('attraction-overview', `${PADMANABHASWAMY.summary} ${PADMANABHASWAMY.entryNote} ${PADMANABHASWAMY.timingNote}`, sourceLink, ['culture', 'choose-plan']);
    };

    const buildPlanReply = (entities, context) => {
        const text = entities.normalized;
        const explicitPlan = entities.planIds.length === 1 ? planById(entities.planIds[0]) : null;
        let plan = explicitPlan || resolvePlan(entities, context);
        if (plan?.id === 'five-day' && context.avoidLongDrives && !/\b(normal|standard|regular)\b/.test(entities.normalized)) plan = planById('senior');
        const editingRoute = /\b(add|include|remove|skip|drop)\b/.test(text) && entities.destinations.length;
        const requestsMap = /\b(map it|map this|show .* on (?:the )?map|open .* on (?:the )?map|map the|show .* route)\b/.test(text);

        if ((entities.planComparison || (context.previousTopic === 'plan-comparison' && context.previousPlanComparison.length === 2 && /\b(which one|which|less|more|cheaper|better|beaches?|backwaters?|driving|choose that one)\b/.test(text)))) {
            if (/\bchoose that one\b/.test(text) && context.planComparisonWinner) {
                plan = setPublishedPlan(context, planById(context.planComparisonWinner));
                return result('plan-recommendation', `Choose the ${plan.name}. I have made it the active plan, so you can now ask about a day, overnight stay, budget or map route.`, [plan.page, 'View the full plan'], ['budget', 'transport', 'hotels']);
            }
            return buildPlanComparisonReply(entities, context);
        }

        if (/\bwhich plans?|which plan|best plan for|least driving|most relaxed|most offbeat|fewest hotel changes\b/.test(text) && !/\bdoes\b/.test(text)) return buildPlanSearchReply(entities, context);

        if (editingRoute && context.activeRoute.length >= 2) {
            const basePlan = planById(context.basePlanId) || planById(context.lastPlanId) || choosePlan(context) || PLANS[1];
            const route = context.activeRoute;
            const warning = routeIsRushed(route, context.duration) ? ' This version is rushed for the selected duration, so add time or remove another base.' : ' This gives more time to the remaining stops, but the daily schedule must be rebuilt around the new route.';
            return result('custom-plan-adjusted', `Updated: your modified ${context.duration || basePlan.days}-day route is now ${routeLine(route)}.${warning} It is no longer the untouched ${basePlan.name}.`, mapLink(route), ['transport', 'budget', 'hotels']);
        }

        if (entities.destinations.length >= 2 && /\b(plan|trip|days?)\b/.test(text)) {
            const days = context.duration || explicitPlan?.days || 5;
            const route = entities.destinations.filter(id => ROUTE_CORE?.destinations?.[id]);
            const basePlan = explicitPlan || (days < 7 ? planById('five-day') : days < 10 ? planById('seven-day') : planById('ten-day'));
            context.activePlanId = null;
            context.basePlanId = basePlan.id;
            context.lastPlanId = basePlan.id;
            context.activeRoute = [...route];
            context.routeSource = 'custom-user-route';
            context.destinations = [...route];
            if (routeIsRushed(route, days)) return result('plan-too-rushed', `${routeLine(route)} is too rushed for ${days} days because it needs too many base changes or a long north-south transfer. Remove a base or add days.`, mapLink(route), ['transport', 'choose-plan']);
            return result('custom-plan', `For ${days} days, your custom route is ${routeLine(route)}. Review every road leg before assigning overnight stops; the ${basePlan.name} is the closest published itinerary to adapt.`, mapLink(route), ['transport', 'budget', 'hotels']);
        }

        if (!plan && entities.duration) {
            if (context.routeSource === 'custom-user-route' && context.activeRoute.length >= 2) {
                return result('custom-plan', `Your custom route remains ${routeLine(context.activeRoute)} with the new ${context.duration}-day limit. I have kept it because you built it manually; ask me to replace it with the published ${context.duration}-day plan if preferred.`, mapLink(context.activeRoute), ['transport', 'budget']);
            }
            plan = choosePlan(context);
        }

        if (plan && (entities.duration || explicitPlan) && !editingRoute && (!context.activePlanId || context.activePlanId !== plan.id || context.routeSource !== 'published-plan')) setPublishedPlan(context, plan);

        if (plan && /\b(where does .* start|where .* starts?|starting (?:city|point)|start in|reach the starting point|how do (?:i|we) reach the start)\b/.test(text)) {
            const start = DESTINATIONS[plan.arrivalAt || plan.route[0]]?.name || DESTINATIONS[plan.route[0]]?.name;
            return result('plan-start', `The ${plan.name} starts in ${start}. Its Transport section compares practical ways to reach that starting city; current flights, trains and buses must be verified before travel.`, [`${plan.page}#transport`, 'Open arrival transport options'], ['transport']);
        }

        if (plan && requestsMap) {
            if (context.routeSource === 'custom-user-route' && context.activeRoute.length >= 2) {
                return result('plan-map', `Opening your modified ${context.duration || plan.days}-day route: ${routeLine(context.activeRoute)}.`, mapLink(context.activeRoute), ['transport', 'budget']);
            }
            let route = plan.route;
            const range = entities.dayRequest.range || (/\bfirst half\b/.test(text) ? [1, Math.ceil(plan.days / 2)] : null);
            if (range) route = planRouteForDays(plan, range[0], range[1]);
            if (route.length < 2) return result('plan-map-limited', `${range ? `Days ${range[0]}-${range[1]}` : 'That section'} contains only one mapped base, so open the full itinerary route instead.`, planMapLink(plan), ['transport']);
            return result('plan-map', `Opening ${range ? `Days ${range[0]}-${range[1]} of ` : ''}${plan.name}: ${routeLine(route)}.`, planMapLink(plan, route), ['transport', 'budget']);
        }

        if (plan && !/^why\b/.test(text) && !/\b(dont want|do not want|without|skip)\b/.test(text) && /\bdoes\b|\binclude|\bhas? (?:a |an )?(?:houseboat|beach|wildlife|backwater)/.test(text)) {
            const destination = entities.destinations[0];
            let feature = destination ? DESTINATIONS[destination].name : /\bhouseboat\b/.test(text) ? 'an overnight houseboat' : /\b(beach|beaches)\b/.test(text) ? 'a beach' : /\bwildlife\b/.test(text) ? 'wildlife' : /\bbackwaters?\b/.test(text) ? 'backwaters' : entities.interests[0];
            const included = destination ? plan.route.includes(destination) || plan.dayByDay.some(day => day.destinations.includes(destination))
                : /\bhouseboat\b/.test(text) ? plan.waterExperience === 'overnight houseboat'
                    : /\b(beach|beaches)\b/.test(text) ? plan.interests.includes('beaches')
                        : /\bwildlife\b/.test(text) ? plan.interests.includes('wildlife')
                            : /\bbackwaters?\b/.test(text) ? plan.interests.includes('backwaters') : plan.interests.includes(feature);
            let explanation = included ? `Yes. The ${plan.name} includes ${feature}.` : `No. The ${plan.name} does not include ${feature}.`;
            if (!included && plan.id === 'seven-day' && destination === 'alappuzha') explanation += ' It uses Munroe Island for a quieter small-canal canoe and village-homestay experience instead.';
            if (!included && plan.id === 'senior' && destination === 'munnar') explanation += ' It uses Kochi, Kumarakom and Thiruvananthapuram to avoid winding hill roads, with protected rest around the longer Day 4 transfer.';
            if (!included && plan.id === 'student' && destination === 'thekkady') explanation += ' The student route keeps three bases to reduce time and shared costs.';
            return result('plan-inclusion', explanation, [plan.page, 'View the full itinerary'], ['transport', 'budget']);
        }

        if (plan && (entities.dayRequest.day || entities.dayRequest.last || entities.dayRequest.range || /\bwhich day|when do we|when is|when do i|houseboat day\b/.test(text))) {
            if (entities.dayRequest.range) {
                const [from, to] = entities.dayRequest.range;
                const entries = plan.dayByDay.filter(item => item.days.some(day => day >= from && day <= to));
                return result('plan-days', `${plan.name}, Days ${from}-${to}: ${entries.map(item => `${item.label} is ${item.title}`).join('; ')}.`, [plan.page, 'View the day-by-day plan'], ['transport', 'hotels']);
            }
            if (entities.dayRequest.day || entities.dayRequest.last) {
                const number = entities.dayRequest.last ? plan.days : entities.dayRequest.day;
                return result('plan-day', planDayText(plan, number), [plan.page, 'View the day-by-day plan'], ['transport', 'hotels']);
            }
            const destination = entities.destinations[0];
            const houseboat = /\bhouseboat\b/.test(text);
            const entry = plan.dayByDay.find(item => destination ? item.destinations.includes(destination) : houseboat && /houseboat/i.test(`${item.title} ${item.summary}`));
            return entry
                ? result('plan-day-search', `${entry.label} of the ${plan.name}: ${entry.title}. ${entry.summary}`, [plan.page, 'View the day-by-day plan'], ['transport', 'hotels'])
                : result('plan-day-search', `That activity is not part of the published ${plan.name}.`, [plan.page, 'View the itinerary'], ['choose-plan']);
        }

        if (plan && /\b(where do we stay|stay each night|how many nights|hotel changes|overnight bases?|sleep on|which night|where do students stay|how many bases)\b/.test(text)) {
            const destination = entities.destinations[0];
            if (/\bhow many nights\b/.test(text) && destination) {
                const base = plan.overnightBases.find(item => item.destination === destination);
                return result('plan-overnights', base ? `The ${plan.name} stays ${base.nights} night${base.nights === 1 ? '' : 's'} in ${DESTINATIONS[destination].name}.` : `The ${plan.name} does not schedule an overnight stay in ${DESTINATIONS[destination].name}.`, [plan.page, 'View stay suggestions'], ['hotels']);
            }
            if (/\bsleep on|which night.*houseboat\b/.test(text)) {
                const houseboat = plan.overnightBases.find(item => item.type === 'houseboat');
                return result('plan-overnights', houseboat ? `Yes. The ${plan.name} sleeps on the Alappuzha houseboat on Night 2 in the 3-day plan or Night 4 in the 5-day plan.`.replace('Night 2 in the 3-day plan or Night 4 in the 5-day plan', plan.id === 'three-day' ? 'Night 2' : 'Night 4') : `No. The ${plan.name} does not include an overnight houseboat.`, [plan.page, 'View stay details'], ['hotels']);
            }
            if (/\bhotel changes\b/.test(text)) return result('plan-overnights', `The ${plan.name} uses ${plan.overnightBases.length} overnight bases, so it has about ${Math.max(0, plan.overnightBases.length - 1)} hotel or stay changes.`, [plan.page, 'View stay details'], ['hotels']);
            const stays = plan.overnightBases.map(base => `${DESTINATIONS[base.destination].name}: ${base.nights} night${base.nights === 1 ? '' : 's'} (${base.type})`);
            const caution = plan.id === 'student' ? ' Hostel age and group policies must be checked; minors need supervised accommodation.' : plan.id === 'senior' ? ' Confirm step-free rooms, bathroom access and boarding arrangements directly.' : '';
            return result('plan-overnights', `${plan.name} overnights: ${stays.join('; ')}.${caution}`, [plan.page, 'View stay suggestions'], ['hotels', 'budget']);
        }

        if (plan && /^why\b|\bwhy does|\bwhy doesnt|\bwhy is\b/.test(text)) {
            if (plan.id === 'seven-day' && (/\balappuzha\b/.test(text) || /\bmunroe\b/.test(text))) return result('plan-why', 'The 7-day plan uses Munroe Island instead of Alappuzha to provide a quieter village homestay and small-canal canoe experience rather than the classic busy houseboat corridor.', [plan.page, 'View the 7-day plan'], ['transport']);
            if (plan.id === 'senior' && /\bmunnar\b/.test(text)) return result('plan-why', 'Munnar would add winding hill roads and more walking. The senior plan instead uses Kochi, Kumarakom and Thiruvananthapuram with private transfers and protected rest; Day 4 is its longest road transfer.', [plan.page, 'View the senior plan'], ['transport']);
            if (plan.id === 'student' && /\bcheap|cheaper|cost|budget\b/.test(text)) return result('plan-why', 'The student plan controls costs through three bases, shared transport, budget-oriented stays and a shared shikara or canoe instead of automatically including a premium overnight houseboat.', [plan.page, 'View the student plan'], ['budget']);
            if (plan.id === 'ten-day') return result('plan-why', 'The 10-day plan spans south, central and north Kerala. It uses an overnight northbound rail connection after Thiruvananthapuram to avoid a giant cab transfer, but the route still has demanding road legs in north Kerala.', [plan.page, 'View the 10-day plan'], ['transport']);
            return result('plan-why', `${plan.name} is designed around ${formatList(plan.bestFor.slice(0, 2))}; its ${plan.pace} pace and ${plan.overnightBases.length} bases follow that purpose.`, [plan.page, 'View the full plan'], ['transport']);
        }

        if (plan && /\b(how much driving|longest drive|route tiring|too tiring|less driving|can seniors handle|driving is in)\b/.test(text)) {
            const metrics = planMetrics(plan);
            const longest = metrics?.longestLeg;
            const longestText = longest ? `${routeLine([longest.fromId, longest.toId])}, approximately ${longest.route.distance} km / ${ROUTE_CORE.formatDuration(longest.route.minutes)}` : 'not available in the stored route data';
            const caution = plan.id === 'ten-day' ? ' This is a very demanding route and needs light sightseeing after the longest transfers.' : plan.driveLoad === 'light' ? ' It is one of the gentler published routes.' : ' Keep transfer days lighter, especially for children or seniors.';
            return result('plan-driving', `${plan.name} has a ${plan.driveLoad} driving load. The longest mapped leg is ${longestText}.${caution}`, planMapLink(plan), ['transport', 'budget']);
        }

        if (plan && /\b(cost|budget|how much|under\s+\d+)\b/.test(text)) {
            setPublishedPlan(context, plan);
            return result('plan-budget', `Use the ${plan.name} Personalised Budget Estimator for your traveller count, ages, month, rooms and comfort level. It provides a planning estimate, not a live booking price.`, [`${plan.page}#budget`, 'Open this plan budget estimator'], ['budget', 'hotels']);
        }

        if (plan && /\b(dont want|do not want|skip|without)\b.*\bwildlife\b/.test(text) && plan.route.includes('thekkady')) {
            context.pendingPlanDestination = 'thekkady';
            return result('plan-change-offer', `Thekkady provides more than wildlife - it also adds spice country and the Periyar landscape. If none of that matters, say "Remove it" and I will turn this into a custom route with more time in the remaining stops.`, [plan.page, 'Review the current plan'], ['choose-plan']);
        }
        if (plan && /\b(dont want|do not want|skip|without)\b.*\bhouseboat\b/.test(text)) return result('plan-change-offer', `The overnight houseboat is a core part of the ${plan.name}. You can replace it with a land hotel plus a shorter day cruise, but that becomes a modified plan and the budget should be recalculated.`, [`${plan.page}#budget`, 'Recalculate this plan'], ['budget', 'hotels']);

        if (plan) {
            setPublishedPlan(context, plan);
            const studentNote = plan.id === 'student' && context.studentAgeGroup === 'school' ? ' School groups and minors need supervised accommodation; do not assume an 18+ hostel will accept them.' : '';
            const seniorNote = context.travellerType === 'senior' && plan.id !== 'senior' ? ' For seniors, use lighter sightseeing and confirm access directly.' : '';
            const longDriveNote = plan.id === 'ten-day' ? ' It is active and uses an overnight northbound rail connection after Thiruvananthapuram to avoid a giant cab transfer; current rail operation must be verified.' : context.avoidLongDrives && plan.driveLoad !== 'light' ? ' Because you want fewer long drives, consider the senior plan structure or remove one base.' : '';
            return result('plan-recommendation', `${compactPlanSummary(plan)}${studentNote}${seniorNote}${longDriveNote}`, [plan.page, 'View the full plan'], ['budget', 'transport', 'hotels']);
        }

        const days = context.duration;
        if (!days) {
            if (/\bgrandparents?\b/.test(text) && /\b(kids?|children)\b/.test(text)) return result('plan-recommendation', 'For grandparents and children, start with the easy-paced Kochi-Kumarakom-Thiruvananthapuram structure: private transfers, protected rest and a light final heritage day. Day 4 is a longer road transfer, so keep it free of sightseeing.', ['plan-5-days-seniors.html', 'View the gentle route'], ['choose-plan']);
            return result('plan-clarify', 'Tell me how many days you have, who is travelling and your top two or three interests. I can then suggest a realistic published plan or custom route.', ['itineraries.html#trip-finder-title', 'Open the Plan Finder']);
        }

        const explicitRoute = context.destinations;
        if (entities.destinations.length >= 2 && explicitRoute.length >= 2) {
            const basePlan = days < 7 ? planById('five-day') : days < 10 ? planById('seven-day') : planById('ten-day');
            context.basePlanId = basePlan.id;
            context.lastPlanId = basePlan.id;
            context.activePlanId = null;
            context.activeRoute = [...explicitRoute];
            context.routeSource = 'custom-user-route';
            if (routeIsRushed(explicitRoute, days)) return result('plan-too-rushed', `${routeLine(explicitRoute)} is too rushed for ${days} days because it needs too many base changes or a long north-south transfer. Remove a base or add days.`, mapLink(explicitRoute), ['transport', 'choose-plan']);
            return result('custom-plan', `For ${days} days, your custom route is ${routeLine(explicitRoute)}. Review every road leg before assigning overnight stops; the ${basePlan.name} is the closest detailed page to adapt.`, mapLink(explicitRoute), ['transport', 'budget', 'hotels']);
        }

        const route = generatedRoute(context);
        const basePlan = days < 3 ? planById('three-day') : days < 7 ? planById('five-day') : days < 10 ? planById('seven-day') : planById('ten-day');
        context.basePlanId = basePlan.id;
        context.lastPlanId = basePlan.id;
        context.activeRoute = [...route];
        context.routeSource = 'custom-user-route';
        return result('custom-plan', `For ${days} days, a practical custom outline is ${routeLine(route)}. Use the ${basePlan.name} as the closest published itinerary, then add rest nights rather than distant regions.`, [basePlan.page, 'Open the closest detailed plan'], ['budget', 'transport', 'hotels']);
    };

    const buildBudgetReply = (entities, context) => {
        const duration = context.duration;
        const budget = context.budget;
        const counts = [context.adults, context.children, context.seniors, context.infants].filter(value => value !== null);
        const total = counts.length ? counts.reduce((sum, value) => sum + value, 0) : context.totalTravellers;
        const explicitPlan = entities.planIds.length === 1 ? planById(entities.planIds[0]) : null;
        if (explicitPlan) setPublishedPlan(context, explicitPlan);
        const plan = explicitPlan || planById(context.activePlanId) || planById(context.basePlanId) || choosePlan(context) || (duration ? PLANS.filter(item => !['student', 'senior'].includes(item.id)).sort((a, b) => Math.abs(a.days - duration) - Math.abs(b.days - duration))[0] : null);
        const link = plan ? [`${plan.page}#budget`, 'Open the personalised budget estimator'] : ['itineraries.html', 'Choose a plan and estimate its budget'];

        if (/\b(which plan is cheapest|cheapest plan)\b/.test(entities.normalized)) {
            return result('budget-cheapest', 'The 3-Day Kochi + Backwaters plan normally has the lowest total because it has the fewest nights and transfers. The student plan can reduce shared costs for a group of friends, but its assumptions must not be used for solo or family travel.', link, ['choose-plan', 'hotels', 'transport']);
        }
        if (/\b(value vs comfortable|value or comfortable|comfortable vs value)\b/.test(entities.normalized)) {
            return result('budget-tiers', 'Value uses simpler stays and practical transport; Comfortable allows stronger hotel choices and easier transfers. Neither is a live quote: select the same group details in the plan estimator to compare the two planning ranges fairly.', link, ['choose-plan', 'hotels']);
        }
        if (/\b(skip|remove).*(houseboat)|houseboat.*(save|cheaper|reduce)\b/.test(entities.normalized)) {
            return result('budget-houseboat-saving', 'Replacing an overnight houseboat with a day cruise and a normal hotel can reduce cost, especially for small groups, but it changes the core Alappuzha experience. Recalculate the selected plan rather than subtracting a guessed amount.', link, ['hotels', 'choose-plan']);
        }
        if (/\b(reduce|save|cheaper option|cut cost|travel cheaply)\b/.test(entities.normalized)) {
            return result('budget-saving', 'To reduce cost, travel outside holiday peaks, use fewer hotel bases, choose Value stays, share an appropriate vehicle, and use a day cruise instead of an overnight boat where the itinerary allows. Do not cut safety checks, suitable rooms or realistic transfer time.', link, ['hotels', 'transport', 'choose-plan']);
        }

        if (budget && duration && total) {
            const dailyPerPerson = Math.round(budget / duration / total);
            const band = dailyPerPerson < 1800 ? 'a very tight' : dailyPerPerson < 3200 ? 'a value-conscious' : dailyPerPerson < 6000 ? 'a workable' : 'a comfortable';
            return result('budget-fit', `${formatMoney(budget)} for ${total} travellers over ${duration} days is ${band} planning ceiling: about ${formatMoney(dailyPerPerson)} per traveller per day before travel to and from Kerala. That arithmetic is not a booking quote; enter ages, month, rooms and transport needs in the estimator to test it properly.`, link, ['choose-plan', 'hotels', 'transport']);
        }
        if (budget && total && !duration) {
            return result('budget-need-duration', `I have the ${total}-traveller group and ${formatMoney(budget)} ceiling. Tell me the trip length so I can judge the daily pressure, then use the selected plan's estimator for rooms, ages, month and transport.`, link, ['choose-plan']);
        }
        if (budget && duration && !total) {
            return result('budget-need-group', `I have ${duration} days and a ${formatMoney(budget)} ceiling. Tell me how many adults, children and seniors are travelling before treating it as a realistic group budget.`, link, ['choose-plan']);
        }
        if (budget) {
            return result('budget-more-details', `${formatMoney(budget)} can only be assessed after the number of travellers and trip length are known. Tell me the adults, children or seniors and the number of days, then use the plan estimator for the actual website planning range.`, link, ['choose-plan']);
        }
        return result('budget-general', 'Every detailed plan has a Personalised Budget Estimator for Value, Comfortable and Premium travel. It estimates the entered group\'s accommodation, local Kerala transport, meals and listed experiences; travel to and from Kerala and live booking prices remain separate.', link, ['choose-plan', 'hotels', 'transport']);
    };

    const buildStayReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        if (/\b(resort or homestay|homestay or resort|hotel or homestay|homestay vs hotel)\b/.test(entities.normalized)) {
            return result('stay-comparison', 'Choose a homestay for local interaction, smaller-scale meals and often better value; choose a hotel or resort for more predictable facilities, reception support and room categories. For seniors, children or allergies, verified access and service details matter more than the label.', ['destinations.html', 'Browse destination stay shortlists'], ['budget', 'safety']);
        }
        if (!id) return result('stay-clarify', 'Which Kerala destination are you considering? I can suggest the best area and show the website\'s Value, Comfort and Premium stay shortlist where one exists.', ['destinations.html', 'Browse destination guides'], ['hotels', 'compare']);
        const destination = DESTINATIONS[id];
        const affordable = /\b(cheap|cheaper|affordable|budget|value)\b/.test(entities.normalized);
        const family = context.travellerType === 'family';
        const senior = context.travellerType === 'senior';
        let shortlist = '';
        if (destination.stays.length) {
            const pick = affordable ? destination.stays[0] : family || senior ? destination.stays[Math.min(1, destination.stays.length - 1)] : null;
            shortlist = pick ? ` The site\'s ${affordable ? 'Value' : 'Comfort'} example is ${pick}.` : ` The site lists ${formatList(destination.stays)} across different comfort levels.`;
        } else {
            shortlist = ' This project does not maintain a verified stay shortlist for that place.';
        }
        const accessNote = senior ? ' Confirm lifts, bathroom access, steps and vehicle pickup directly before booking.' : family ? ' Check room occupancy, child policy and meal flexibility before booking.' : '';
        const seasonalNote = entities.month ? ` ${monthAdvice(entities.month, destination)}` : '';
        return result('stay', `${destination.stay}${shortlist}${accessNote}${seasonalNote} Rates and availability are not live, so open the guide and verify current details with the property.`, [destination.page, `View ${destination.name} stay guidance`], ['budget', 'transport', 'safety']);
    };

    const buildFoodReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        const destination = id ? DESTINATIONS[id] : null;
        let answer = destination ? `${destination.name}: ${destination.food}` : 'Kerala favourites include appam with stew, puttu and kadala, dosa, sadya, seafood, Malabar biryani, banana chips and local snacks.';
        if (/\b(vegetarian|vegan)\b/.test(entities.normalized)) answer += ' Vegetarian food is widely available; vegan travellers should confirm coconut milk, ghee, curd and shared cooking arrangements.';
        if (/\b(kids?|children|less spicy|dont like spicy|hate spicy)\b/.test(entities.normalized) || context.travellerType === 'family') answer += ' For children or mild eaters, ask for less chilli and choose idiyappam, appam, dosa, rice, dal, fruit or simple curries.';
        if (/\ballerg/.test(entities.normalized)) answer += ' For allergies, name the ingredient clearly and confirm cross-contact directly; the guide cannot verify individual kitchens.';
        return result('food', answer, [destination?.page || 'experiences.html', destination ? `Open the ${destination.name} guide` : 'Explore Kerala experiences'], ['phrases', 'choose-plan']);
    };

    const buildTransportReply = (entities, context) => {
        const text = entities.normalized;
        const requestsMap = /\b(map it|map link|show (?:it|this|that|the route|this trip) on (?:the )?map|open (?:it|this|that|the route)|show this trip)\b/.test(text);
        const asksDistance = /\b(how far|distance|how many (?:km|kilometres|kilometers))\b/.test(text);
        const asksTime = /\b(how long|travel time|how many hours|long is the drive|does it take)\b/.test(text);
        const asksStops = /\b(stops? on the way|recommended stops?|where should we stop|where should we take breaks|take breaks|breaks? on (?:the|this) (?:way|trip)|any breaks)\b/.test(text);
        const asksLegs = /\b(how many (?:road )?legs|road leg count)\b/.test(text);
        const asksLongest = /\b(which leg|longest (?:leg|drive))\b/.test(text);
        const asksComfort = /\b(tiring|comfortable for seniors|seniors?|kids handle|children handle|family handle)\b/.test(text);
        const asksRoute = /\b(my route|route now|what is (?:the|my) route)\b/.test(text);
        const asksWhyNot = text.match(/\bwhy not (train|flight|car|cab)\b/)?.[1] || null;
        const ids = context.activeRoute.length >= 2 ? context.activeRoute.slice() : entities.destinations.filter(id => ROUTE_CORE?.destinations?.[id]);

        if (ids.length >= 3) {
            const multi = ROUTE_CORE.multiSummary(ids);
            if (!multi) return result('transport-unavailable', 'The stored planner data cannot calculate every leg reliably. Open the Journey Planner and adjust the route.', mapLink(ids), ['transport', 'safety']);
            const link = mapLink(ids);
            const longest = multi.longestLeg;
            const longestText = `${ROUTE_CORE.destinations[longest.fromId].name} → ${ROUTE_CORE.destinations[longest.toId].name} at approximately ${longest.route.distance} km / ${ROUTE_CORE.formatDuration(longest.route.minutes)}`;
            const warning = multi.warnings.length ? ` ${multi.warnings[0]}` : '';

            if (requestsMap) return result('transport-multi-map', `Opening your ${multi.destinations}-destination multi-city cab route: ${routeLine(ids)}.`, link, ['transport', 'safety']);
            if (asksLegs) return result('transport-multi-legs', `Your route has ${multi.destinations} destinations and ${multi.roadLegs} road legs. Travel mode remains Cab across the full multi-city trip.`, link, ['transport', 'safety']);
            if (asksLongest) return result('transport-multi-longest', `The longest leg is ${longestText}.${warning}`, link, ['transport', 'safety']);
            if (asksStops) {
                const usefulLegs = [...multi.legs].sort((a, b) => b.route.minutes - a.route.minutes).filter(leg => leg.stops.length).slice(0, 3);
                const stops = usefulLegs.map(leg => `${ROUTE_CORE.destinations[leg.fromId].name} → ${ROUTE_CORE.destinations[leg.toId].name}: ${leg.stops.map(stop => stop.name).join(', ')}`).join('; ');
                return result('transport-multi-stops', `Prioritise breaks on the longer legs: ${stops || 'pause for a clean meal, fuel and restroom break where needed'}.${warning}`, link, ['transport', 'safety']);
            }
            if (asksComfort) {
                const audience = /\b(senior|seniors)\b/.test(text) || context.travellerType === 'senior' ? ' For senior travellers, keep sightseeing light after that transfer and add a rest day if needed.' : /\b(kids?|children|family)\b/.test(text) || context.travellerType === 'family' ? ' For families, schedule comfort breaks and avoid major sightseeing after that transfer.' : '';
                return result('transport-multi-comfort', `This is a ${multi.comfort.toLowerCase()} route with ${multi.roadLegs} road legs and about ${ROUTE_CORE.formatDuration(multi.minutes)} of total driving. The longest leg is ${longestText}.${audience}${warning}`, link, ['transport', 'safety']);
            }
            if (asksWhyNot || entities.transportModes.some(mode => ['train', 'flight'].includes(mode)) || /\bwhat transport|how should (?:i|we) travel|train or cab|should i fly\b/.test(text)) {
                const requested = asksWhyNot || entities.transportModes.find(mode => ['train', 'flight'].includes(mode));
                const explanation = requested ? ` ${modeName(requested)} is not used because changing modes between selected trip stops would break this planner's continuous road-trip structure.` : '';
                return result('transport-multi-cab', `This is a Multi-City road trip, so the Journey Planner uses Cab only across all ${multi.roadLegs} legs.${explanation} The route totals approximately ${multi.distance} km and ${ROUTE_CORE.formatDuration(multi.minutes)} of driving.${warning}`, link, ['transport', 'safety']);
            }
            if (asksRoute) return result('transport-multi-route', `Your current route is ${routeLine(ids)}: ${multi.destinations} destinations, ${multi.roadLegs} road legs and Cab only.`, link, ['transport', 'safety']);
            return result('transport-multi-route', `${routeLine(ids)} is a Multi-City cab road trip with ${multi.roadLegs} legs, approximately ${multi.distance} km and ${ROUTE_CORE.formatDuration(multi.minutes)} of driving.${warning}`, link, ['transport', 'safety']);
        }

        if (ids.length === 2) {
            const [fromId, toId] = ids;
            const summary = ROUTE_CORE.pointSummary(fromId, toId);
            if (!summary) return result('transport-unavailable', 'The Journey Planner has no reliable stored estimate for that route. Open the map to choose another supported pair.', mapLink(ids), ['transport', 'choose-plan']);
            const fromName = ROUTE_CORE.destinations[fromId].name;
            const toName = ROUTE_CORE.destinations[toId].name;
            const link = mapLink(ids);
            if (requestsMap) return result('transport-map', `Opening ${fromName} → ${toName} in the Journey Planner.`, link, ['transport', 'safety']);
            if (asksDistance) return result('transport-distance', `${fromName} to ${toName} is approximately ${summary.route.distance} km by road. This is a stored planning estimate, not live traffic data.`, link, ['transport', 'safety']);
            if (asksTime) return result('transport-time', `${fromName} to ${toName} takes approximately ${ROUTE_CORE.formatDuration(summary.route.minutes)} by road under the planner's estimate. Traffic, weather and stops can change it.`, link, ['transport', 'safety']);
            if (asksStops) {
                const stopNames = summary.stops.map(stop => stop.name);
                return result('transport-stops', stopNames.length ? `Recommended stops between ${fromName} and ${toName}: ${formatList(stopNames)}. These are the same optional breaks shown by the Journey Planner.` : `This short route normally needs no planned stop; take a comfort break if your group needs one.`, link, ['transport', 'safety']);
            }
            if (asksComfort) {
                const long = summary.route.minutes >= 360;
                const audience = /\b(senior|seniors)\b/.test(text) || context.travellerType === 'senior' ? 'For seniors' : /\b(kids?|children|family)\b/.test(text) || context.travellerType === 'family' ? 'For families' : 'For most travellers';
                return result('transport-comfort', `${audience}, this ${ROUTE_CORE.formatDuration(summary.route.minutes)} road transfer is ${long ? 'demanding' : 'generally manageable'}${summary.stops.length ? ` with a break around ${summary.stops[0].name}` : ''}. ${long ? 'Consider dividing the journey or keeping the rest of the day light.' : 'Allow extra time for traffic, meals and comfort stops.'}`, link, ['transport', 'safety']);
            }
            const comparedModes = [...new Set(entities.transportModes.map(modeName))];
            if (entities.modeComparison && comparedModes.length >= 2) {
                const details = comparedModes.slice(0, 2).map(mode => `${mode}: ${describePointMode(mode, summary)}`).join(' ');
                return result('transport-mode-comparison', `${details} The planner's overall recommendation is ${summary.recommendation.mode} for this route.`, link, ['transport', 'safety']);
            }
            if (comparedModes.length === 1 || asksWhyNot) {
                const requested = modeName(asksWhyNot || comparedModes[0]);
                return result('transport-mode', `${fromName} → ${toName}: ${describePointMode(requested, summary)} The planner's overall recommendation is ${summary.recommendation.mode}.`, link, ['transport', 'safety']);
            }
            return result('transport-route', `${fromName} → ${toName}: the Journey Planner recommends ${summary.recommendation.mode}. Road distance is approximately ${summary.route.distance} km and road time is ${ROUTE_CORE.formatDuration(summary.route.minutes)}. ${summary.recommendation.reason}`, link, ['hotels', 'safety', 'choose-plan']);
        }

        const id = entities.destinations.find(destinationId => ROUTE_CORE?.destinations?.[destinationId]) || (ROUTE_CORE?.destinations?.[context.currentDestination] ? context.currentDestination : null);
        const requestedMode = entities.transportModes[0] ? modeName(entities.transportModes[0]) : null;
        if (id && requestedMode) {
            const access = ROUTE_CORE.transportAccess[id];
            const name = ROUTE_CORE.destinations[id].name;
            if (requestedMode === 'Flight') return result('transport-access-flight', `${name} has no airport of its own. The practical airport is ${access.airport}, followed by an approximate ${ROUTE_CORE.formatDuration(access.airportTransfer)} road transfer; tell me your starting place to judge whether flying helps.`, ['map.html', 'Open the Journey Planner'], ['transport', 'choose-plan']);
            if (requestedMode === 'Train') return result('transport-access-train', `${name} has ${access.railTransfer > 90 ? 'no nearby practical railway access' : `rail access via ${access.rail}`}. ${access.railTransfer > 90 ? `The planner allows about ${ROUTE_CORE.formatDuration(access.railTransfer)} for the road transfer to ${access.rail}.` : 'Tell me your starting place to compare the complete journey.'}`, ['map.html', 'Open the Journey Planner'], ['transport', 'choose-plan']);
        }
        if (id) return result('transport-access', `${DESTINATIONS[id].name}: ${DESTINATIONS[id].access} Tell me your starting place for a route estimate.`, ['map.html', 'Open the Kerala Journey Planner'], ['transport', 'choose-plan']);
        return result('transport-clarify', 'Tell me both places, for example “Kochi to Munnar”. I can use the Journey Planner’s stored distance, time, stops and mode logic.', ['map.html', 'Open the Kerala Journey Planner'], ['transport', 'choose-plan']);
    };

    const buildWeatherReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        const destination = id ? DESTINATIONS[id] : null;
        if (entities.intents.includes('live')) {
            return result('live-weather', `I cannot verify live weather${destination ? ` in ${destination.name}` : ''}, rain, closures or transport operation from this static guide. Check a current weather service and official/local notices before travelling; I can still explain normal seasonal conditions.`, ['travel-info.html', 'Open weather and safety guidance'], ['weather', 'safety']);
        }
        const monthKey = entities.month || context.month;
        if (monthKey) {
            const group = context.travellerType === 'family'
                ? `${destination && destination.family >= 3 ? ` ${destination.name} can work well with children when the day stays flexible.` : ' With children, simplify outdoor plans and avoid long wet transfer days.'} Keep dry clothes and an indoor backup.`
                : context.travellerType === 'senior' ? ' For seniors, avoid slippery paths and leave extra transfer time.' : '';
            return result('seasonal-weather', `${destination ? `${destination.name} in ` : ''}${monthAdvice(monthKey, destination)}${group}`, ['travel-info.html', 'Read seasonal travel guidance'], ['safety', 'choose-plan']);
        }
        return result('best-time', 'October to March is the easiest overall touring period. April and May are warmer, while June to September offers lush monsoon scenery with more rain disruption; weather still differs between the coast, hills and northern Kerala.', ['travel-info.html', 'Compare Kerala seasons'], ['safety', 'choose-plan']);
    };

    const buildSafetyReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        const destination = id ? DESTINATIONS[id] : null;
        let answer = destination ? `${destination.name} can be planned safely, but conditions and providers must still be checked.` : 'Kerala is practical for many traveller types, but normal travel precautions still matter.';
        if (destination?.interests.includes('beaches')) answer += ' Follow beach flags and lifeguards, especially during monsoon or rough-sea conditions.';
        if (destination?.interests.includes('wildlife')) answer += ' Keep distance from wildlife, use authorised activities and never feed animals.';
        if (context.travellerType === 'family') answer += ' For children, confirm life jackets, railings, road breaks and room occupancy rules.';
        if (context.travellerType === 'senior') answer += ' For seniors, confirm steps, bathrooms, lifts, boarding arrangements and medicine access directly.';
        answer += ' Use registered transport, avoid isolated places late at night and check current weather or road notices.';
        return result('safety', answer, ['travel-info.html', 'Open safety and emergency guidance'], ['weather', 'transport']);
    };

    const buildCultureReply = entities => {
        const text = entities.normalized;
        if (/\bkathakali\b/.test(text)) return result('culture-kathakali', 'Kathakali combines highly codified gesture, facial expression, costume, music and storytelling. A visitor performance in Kochi or another cultural centre is the easiest introduction; confirm the current programme and arrive early if a makeup demonstration is offered.', ['experiences.html', 'Explore culture experiences']);
        if (/\bkalaripayattu\b/.test(text)) return result('culture-kalaripayattu', 'Kalaripayattu is Kerala\'s martial tradition, presented through disciplined movement, weapons and physical training. Choose an established cultural centre and verify the current performance schedule.', ['experiences.html', 'Explore culture experiences']);
        if (/\btheyyam\b/.test(text)) return result('culture-theyyam', 'Theyyam is a living ritual tradition of north Kerala, especially associated with Kannur and Kasaragod. It is not a show with a fixed daily timetable, so verify season, date, site etiquette and photography rules locally.', ['destination-kannur.html', 'Open the Kannur guide']);
        if (/\b(onam|vishu|thrissur pooram|boat race|festival)\b/.test(text)) return result('culture-festival', 'Kerala\'s festival calendar includes Onam, Vishu, Thrissur Pooram and seasonal boat races, but exact dates and public arrangements change each year. Use official tourism and organiser information before building travel around one event.', ['travel-info.html', 'Open official planning links']);
        if (/\btemple etiquette|temple|church|mosque|religious\b/.test(text)) return result('culture-etiquette', 'Dress modestly, remove footwear where required, follow photography signs and respect areas restricted by local custom. Entry rules vary by religious site, so check the specific venue instead of assuming one Kerala-wide rule.', ['travel-info.html', 'Read responsible travel guidance']);
        return result('culture', 'Kerala culture includes Kathakali, Kalaripayattu, Theyyam, temple and church traditions, boat races, architecture, spices and handicrafts. Tell me which tradition interests you and I will narrow it down without inventing current schedules.', ['experiences.html', 'Explore culture experiences'], ['food', 'phrases']);
    };

    const buildPhraseReply = entities => {
        const phrase = Object.values(PHRASES).find(item => item.triggers.some(trigger => containsPhrase(entities.normalized, normaliseText(trigger))));
        if (phrase) return result('malayalam-phrase', `${phrase.english}: ${phrase.malayalam} — ${phrase.transliteration}.`, ['travel-info.html', 'Open the Malayalam phrase guide'], ['phrases', 'food'], phrase.audio);
        const examples = [PHRASES.hello, PHRASES.thanks, PHRASES.price, PHRASES.where];
        return result('malayalam-guide', `Start with ${examples.map(item => `${item.malayalam} (${item.transliteration}) — ${item.english}`).join('; ')}. Ask for one phrase at a time to use its available pronunciation audio.`, ['travel-info.html', 'Open all Malayalam phrases'], ['phrases', 'food']);
    };

    const buildDestinationReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        if (!id) return null;
        const destination = DESTINATIONS[id];
        let answer = `${destination.name}: ${destination.summary} Allow ${destination.days}.`;
        if (context.travellerType === 'family') answer += destination.family >= 3 ? ' It is a strong family fit with sensible pacing.' : ' It can work with children, but simplify activities and transfer days.';
        if (context.travellerType === 'senior') answer += destination.senior >= 3 ? ' It suits a gentler senior trip when access is confirmed.' : ' Seniors should check walking, steps and road time carefully.';
        if (entities.month) answer += ` ${monthAdvice(entities.month, destination)}`;
        return result('destination', answer, [destination.page, `Explore ${destination.name}`], ['hotels', 'transport', 'weather']);
    };

    const buildLiveReply = (entities, context) => {
        const id = entities.destinations.at(-1) || context.currentDestination;
        const place = id ? ` for ${DESTINATIONS[id].name}` : '';
        return result('live-information', `I cannot verify live weather, opening status, current fares, room prices or tomorrow\'s services${place} from this static guide. Use the official links and the relevant operator or property for current information; I can help with normal seasons, route logic and planning choices.`, ['travel-info.html', 'Open official travel resources'], ['weather', 'transport', 'hotels']);
    };

    const buildAcknowledgement = context => {
        const remembered = [];
        const group = groupSummary(context);
        if (group) remembered.push(group);
        if (context.duration) remembered.push(`${context.duration} days`);
        if (context.interests.length) remembered.push(formatList(context.interests));
        if (context.avoidLongDrives) remembered.push('fewer long drives');
        if (context.destinations.length) remembered.push(formatList(destinationNames(context.destinations)));
        return result('context-updated', `Got it${remembered.length ? `: ${formatList(remembered)}` : ''}. Keep adding details, or ask what I recommend when you are ready.`, null, ['choose-plan', 'budget', 'transport']);
    };

    const answerQuestion = (question, rawContext = freshContext()) => {
        const previous = cleanContext(rawContext);
        const entities = extractEntities(question, previous);
        const context = mergeEntitiesIntoContext(previous, entities);
        let reply;

        if (entities.intents.includes('recall')) reply = buildRecallReply(context);
        else if (entities.intents.includes('live')) reply = buildLiveReply(entities, context);
        else if (entities.intents.includes('language')) reply = buildPhraseReply(entities);
        else if (entities.attraction || (previous.currentAttraction === 'padmanabhaswamy' && /\b(which day|when|where is (?:it|that|the temple)|entry|enter|dress|rules?|timings?|alternative|cant|cannot|tiring|seniors?|accessible)\b/.test(entities.normalized))) reply = buildAttractionReply(entities, context);
        else if (entities.intents.includes('budget') && !entities.planComparison && (entities.budget || /\b(which plan is cheapest|cheapest plan|value vs comfortable|value or comfortable|reduce the cost|save money|trip budget|budget for|how much will .*plan|plan.*cost|under\s+\d+)\b/.test(entities.normalized))) reply = buildBudgetReply(entities, context);
        else if (entities.planComparison) reply = buildPlanReply(entities, context);
        else if (entities.planIds.length || entities.dayRequest.day || entities.dayRequest.range || entities.dayRequest.last) reply = buildPlanReply(entities, context);
        else if (entities.intents.includes('plan') && /\b(which plans?|which plan|best plan for|least driving|most relaxed|most offbeat|fewest hotel changes)\b/.test(entities.normalized)) reply = buildPlanReply(entities, context);
        else if (/\bgrandparents?\b/.test(entities.normalized) && /\b(kids?|children)\b/.test(entities.normalized)) reply = buildPlanReply(entities, context);
        else if ((previous.activePlanId || previous.basePlanId) && !entities.routeQuestion && !entities.modeComparison && (/\b(what happens|which day|when do we|when is|last day|where do we stay|stay each night|how many nights|hotel changes|overnight|sleep on|does it|does this|include|houseboat|beaches?|wildlife|why|how much driving|longest drive|route tiring|starting point|start in|reach the start|map it|show (?:it|that|this) on (?:the )?map|dont want|do not want|remove it)\b/.test(entities.normalized) || /\bwhere does .* start\b/.test(entities.normalized))) reply = buildPlanReply(entities, context);
        else if (previous.basePlanId && /\b(add|include|remove|skip|drop)\b/.test(entities.normalized) && entities.destinations.length) reply = buildPlanReply(entities, context);
        else if (previous.previousTopic === 'plan-comparison' && previous.previousPlanComparison.length === 2 && /\b(which one|which|less|more|cheaper|better|beaches?|backwaters?|driving|choose that one)\b/.test(entities.normalized)) reply = buildPlanReply(entities, context);
        else if (entities.referencesOther && entities.destinations.length === 1) reply = buildDestinationReply(entities, context);
        else if (/\bhow many days\b/.test(entities.normalized) && (entities.destinations.length || context.currentDestination)) reply = buildDestinationReply(entities, context);
        else if (entities.duration && entities.intents.includes('plan') && !entities.intents.includes('budget')) reply = buildPlanReply(entities, context);
        else if ((entities.travellerType === 'senior' || context.travellerType === 'senior') && /\bhouseboat\b/.test(entities.normalized)) reply = result('safety-houseboat-seniors', 'A houseboat can work for grandparents or senior travellers only after the operator confirms boarding steps, railings, bathroom access, cabin layout and emergency arrangements. A daytime cruise or accessible backwater resort may be easier than an overnight boat.', ['plan-5-days-seniors.html', 'Open the easy-paced senior plan'], ['safety', 'hotels']);
        else if (entities.intents.includes('comparison') && (entities.destinations.length >= 2 || context.previousComparison.length >= 2)) reply = buildComparisonReply(entities, context);
        else if (previous.previousTopic === 'comparison' && context.previousComparison.length === 2 && /\b(monsson|monsoon|during rain|during july|which|cheaper|better|easier)\b/.test(entities.normalized)) reply = buildComparisonReply(entities, context);
        else if (/^why\b/.test(entities.normalized) && context.lastComparisonReason) reply = result('comparison-why', context.lastComparisonReason, mapLink(context.previousComparison), ['transport', 'hotels']);
        else if (/\b(add|include|remove|skip|drop)\b/.test(entities.normalized) && previous.activeRoute.length >= 2) reply = buildTransportReply(entities, context);
        else if (entities.intents.includes('stay')) reply = buildStayReply(entities, context);
        else if (previous.previousTopic === 'stay' && context.currentDestination && (/\b(how much|cheap|cheaper|affordable)\b/.test(entities.normalized) || /\bwhat about\b.*\b(family|senior|kids?|children)\b/.test(entities.normalized))) reply = buildStayReply(entities, context);
        else if (entities.intents.includes('transport') && (!entities.intents.includes('budget') || context.activeRoute.length >= 2)) reply = buildTransportReply(entities, context);
        else if (entities.intents.includes('budget')) reply = buildBudgetReply(entities, context);
        else if (entities.intents.includes('weather')) reply = buildWeatherReply(entities, context);
        else if (entities.intents.includes('stay') || (previous.previousTopic === 'stay' && /\b(which|what|cheaper|family|senior)\b/.test(entities.normalized))) reply = buildStayReply(entities, context);
        else if (entities.intents.includes('food') || (previous.previousTopic === 'food' && entities.referencesThere)) reply = buildFoodReply(entities, context);
        else if (entities.intents.includes('culture')) reply = buildCultureReply(entities);
        else if (entities.intents.includes('safety')) reply = buildSafetyReply(entities, context);
        else if (entities.intents.includes('plan') || entities.duration || /\b(what do you recommend|recommend)\b/.test(entities.normalized)) reply = buildPlanReply(entities, context);
        else if (entities.intents.includes('comparison')) reply = buildComparisonReply(entities, context);
        else reply = entities.destinations.length ? buildDestinationReply(entities, context) : null;

        if (!reply && (entities.destinations.length || entities.duration || entities.travellerType || entities.interests.length || entities.budget || entities.month)) reply = buildAcknowledgement(context);
        if (!reply && entities.intents.includes('help')) reply = result('help', 'Ask about Kerala destinations, 1-14 day routes, families, seniors, budgets, stays, food, culture, weather, safety, Malayalam phrases or travel between two places. I remember useful trip details during this conversation.', ['itineraries.html#trip-finder-title', 'Open the Plan Finder'], DEFAULT_SUGGESTIONS);
        if (!reply) {
            const understood = [];
            if (context.currentDestination) understood.push(DESTINATIONS[context.currentDestination].name);
            if (context.duration) understood.push(`${context.duration} days`);
            if (context.travellerType) understood.push(context.travellerType);
            const prefix = understood.length ? `I still remember ${formatList(understood)}, but ` : '';
            reply = result('fallback', `${prefix}I am not sure which part you want to change or compare. Try asking about a route, stay, budget, season or food, or name the two options you mean.`, ['destinations.html', 'Browse Kerala destinations'], ['compare', 'choose-plan', 'hotels', 'transport']);
        }

        const topic = reply.id.startsWith('plan-comparison') ? 'plan-comparison'
            : reply.id.startsWith('stay') ? 'stay'
            : reply.id.startsWith('food') ? 'food'
                : reply.id.includes('comparison') ? 'comparison'
                    : reply.id.includes('transport') ? 'transport'
                        : reply.id.includes('budget') ? 'budget'
                            : reply.id.includes('weather') || reply.id.includes('season') ? 'weather'
                                : reply.id.includes('plan') ? 'plan'
                                    : reply.id;
        context.previousTopic = topic;
        context.lastIntent = reply.id;
        return { reply, context, entities };
    };

    const API = {
        destinations: DESTINATIONS,
        plans: PLANS,
        planData: PLAN_DATA,
        phrases: PHRASES,
        routeCore: ROUTE_CORE,
        supportedIntents: Object.keys(INTENT_PATTERNS),
        createContext: freshContext,
        extract: extractEntities,
        answer: answerQuestion,
        runSequence(questions, initialContext = freshContext()) {
            let context = cleanContext(initialContext);
            return questions.map(question => {
                const response = answerQuestion(question, context);
                context = response.context;
                return { question, ...response };
            });
        }
    };

    root.KeralaAssistantEngine = API;
    if (typeof module === 'object' && module.exports) module.exports = API;

    const initialiseWidget = () => {
        if (typeof document === 'undefined' || document.querySelector('.assistant-widget')) return;

        const assistantWidget = document.createElement('aside');
        assistantWidget.className = 'assistant-widget';
        assistantWidget.setAttribute('aria-label', 'Kerala travel assistant');
        assistantWidget.innerHTML = `
            <section class="assistant-panel" id="kerala-assistant-panel" aria-label="Kerala travel assistant" aria-live="polite">
                <header class="assistant-header"><div class="assistant-heading"><i class="fa-solid fa-compass"></i><div><strong>Kerala Travel Guide</strong><span>Places, plans, budgets, and practical tips</span></div></div><div class="assistant-header-actions"><button class="assistant-clear" type="button" title="Clear conversation" aria-label="Clear conversation"><i class="fa-regular fa-trash-can"></i></button><button class="assistant-close" type="button" title="Close assistant" aria-label="Close assistant"><i class="fa-solid fa-xmark"></i></button></div></header>
                <div class="assistant-messages" id="assistant-messages"></div>
                <div class="assistant-composer"><div class="assistant-suggestions" id="assistant-suggestions"></div><form class="assistant-form"><input id="assistant-input" type="text" placeholder="Ask about Kerala..." autocomplete="off" aria-label="Ask a Kerala travel question"><button class="assistant-send" type="submit" title="Send question" aria-label="Send question"><i class="fa-solid fa-arrow-up"></i></button></form></div>
            </section>
            <button class="assistant-toggle" id="kerala-assistant-toggle" type="button" title="Ask Kerala Travel Assistant" aria-label="Open Kerala Travel Assistant" aria-expanded="false"><i class="fa-solid fa-wand-magic-sparkles"></i></button>`;
        document.body.append(assistantWidget);

        const panel = assistantWidget.querySelector('.assistant-panel');
        const toggle = assistantWidget.querySelector('.assistant-toggle');
        const close = assistantWidget.querySelector('.assistant-close');
        const clear = assistantWidget.querySelector('.assistant-clear');
        const messages = assistantWidget.querySelector('.assistant-messages');
        const suggestions = assistantWidget.querySelector('.assistant-suggestions');
        const form = assistantWidget.querySelector('.assistant-form');
        const input = assistantWidget.querySelector('#assistant-input');
        const historyKey = 'visitKeralaAssistantHistoryV3';
        const oldHistoryKey = 'visitKeralaAssistantHistoryV2';
        const contextKey = 'visitKeralaAssistantContextV4';
        const oldContextKey = 'visitKeralaAssistantContextV3';
        let context = freshContext();
        let activeAudio = null;
        let activeAudioButton = null;

        const safeRead = (key, fallback) => {
            try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback; } catch { return fallback; }
        };
        const history = safeRead(historyKey, safeRead(oldHistoryKey, []));
        context = cleanContext(safeRead(contextKey, freshContext()));

        const saveHistory = item => {
            try {
                const current = safeRead(historyKey, []);
                sessionStorage.setItem(historyKey, JSON.stringify([...current, item].slice(-30)));
            } catch { /* The guide remains usable without storage. */ }
        };

        const stopAudio = () => {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
            }
            if (activeAudioButton) {
                activeAudioButton.classList.remove('is-speaking');
                activeAudioButton.setAttribute('aria-pressed', 'false');
                activeAudioButton.innerHTML = '<i class="fa-solid fa-volume-high" aria-hidden="true"></i>';
            }
            activeAudio = null;
            activeAudioButton = null;
        };

        const addMessage = (kind, text, link = null, persist = true, audio = null) => {
            const message = document.createElement('div');
            message.className = `assistant-message ${kind}`;
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            message.append(paragraph);

            if (link) {
                const anchor = document.createElement('a');
                anchor.href = link[0];
                anchor.textContent = link[1];
                message.append(anchor);
            }
            if (audio) {
                const audioButton = document.createElement('button');
                audioButton.type = 'button';
                audioButton.className = 'assistant-audio-button';
                audioButton.dataset.audioSrc = audio;
                audioButton.setAttribute('aria-label', 'Play Malayalam pronunciation');
                audioButton.setAttribute('aria-pressed', 'false');
                audioButton.innerHTML = '<i class="fa-solid fa-volume-high" aria-hidden="true"></i><span>Hear pronunciation</span>';
                message.append(audioButton);
            }
            messages.append(message);
            messages.scrollTop = messages.scrollHeight;
            if (persist) saveHistory({ kind, text, link, audio });
        };

        const renderSuggestions = ids => {
            suggestions.replaceChildren();
            ids.map(id => SUGGESTIONS[id]).filter(Boolean).slice(0, 4).forEach(item => {
                const button = document.createElement('button');
                button.className = 'assistant-suggestion';
                button.type = 'button';
                button.dataset.prompt = item.prompt;
                button.textContent = item.label;
                suggestions.append(button);
            });
        };

        const ask = question => {
            const cleanQuestion = String(question || '').trim();
            if (!cleanQuestion) return;
            addMessage('user', cleanQuestion);
            input.value = '';
            const typing = document.createElement('div');
            typing.className = 'assistant-message bot typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            messages.append(typing);
            messages.scrollTop = messages.scrollHeight;

            root.setTimeout(() => {
                typing.remove();
                const response = answerQuestion(cleanQuestion, context);
                context = response.context;
                try { sessionStorage.setItem(contextKey, JSON.stringify(context)); } catch { /* Continue without storage. */ }
                addMessage('bot', response.reply.text, response.reply.link, true, response.reply.audio);
                renderSuggestions(response.reply.related || DEFAULT_SUGGESTIONS);
            }, 320);
        };

        if (Array.isArray(history) && history.length) history.slice(-30).forEach(item => addMessage(item.kind, item.text, item.link, false, item.audio));
        else addMessage('bot', 'Hi. Ask about routes, budgets, stays, food, weather and safety. I will remember useful trip details during this conversation.', null, false);
        renderSuggestions(DEFAULT_SUGGESTIONS);

        toggle.addEventListener('click', () => {
            const isOpen = panel.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) input.focus();
        });
        close.addEventListener('click', () => {
            panel.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        });
        clear.addEventListener('click', () => {
            stopAudio();
            context = freshContext();
            try {
                sessionStorage.removeItem(historyKey);
                sessionStorage.removeItem(oldHistoryKey);
                sessionStorage.removeItem(contextKey);
                sessionStorage.removeItem(oldContextKey);
            } catch { /* Nothing else is needed. */ }
            messages.replaceChildren();
            addMessage('bot', 'Conversation cleared. Tell me your days, travellers, interests or a Kerala place.', null, false);
            renderSuggestions(DEFAULT_SUGGESTIONS);
            input.focus();
        });
        form.addEventListener('submit', event => {
            event.preventDefault();
            ask(input.value);
        });
        suggestions.addEventListener('click', event => {
            const button = event.target.closest('.assistant-suggestion');
            if (button) ask(button.dataset.prompt);
        });
        messages.addEventListener('click', async event => {
            const button = event.target.closest('.assistant-audio-button');
            if (!button) return;
            if (activeAudioButton === button) {
                stopAudio();
                return;
            }
            stopAudio();
            activeAudioButton = button;
            activeAudio = new Audio(new URL(button.dataset.audioSrc, document.baseURI).href);
            activeAudio.preload = 'none';
            activeAudio.playbackRate = 0.88;
            button.classList.add('is-speaking');
            button.setAttribute('aria-pressed', 'true');
            button.innerHTML = '<i class="fa-solid fa-stop" aria-hidden="true"></i><span>Stop pronunciation</span>';
            activeAudio.addEventListener('ended', stopAudio, { once: true });
            activeAudio.addEventListener('error', () => {
                stopAudio();
                addMessage('bot', 'Pronunciation audio unavailable.', null, false);
            }, { once: true });
            try { await activeAudio.play(); } catch {
                stopAudio();
                addMessage('bot', 'Pronunciation audio unavailable.', null, false);
            }
        });

        root.__keralaAssistant = {
            ...API,
            getContext: () => cleanContext(context),
            clearContext: () => { context = freshContext(); return cleanContext(context); },
            askForTest(question, state = freshContext()) { return answerQuestion(question, state); }
        };
    };

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseWidget, { once: true });
        else initialiseWidget();
    }
})();
