(() => {
    'use strict';

    const destinations = {
        kochi: {
            name: 'Kochi',
            coordinates: [9.9312, 76.2673],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-city',
            description: 'Kerala\'s major coastal gateway, combining city connections, harbour views and easy access to heritage quarters.',
            url: 'destination-kochi.html',
            planUrl: 'plan-3-days.html',
            rail: true,
            coast: true
        },
        'fort-kochi': {
            name: 'Fort Kochi',
            coordinates: [9.9658, 76.2421],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-landmark',
            description: 'A walkable waterfront quarter known for layered maritime history, art spaces and Chinese fishing nets.',
            url: 'destination-kochi.html',
            planUrl: 'plan-3-days.html',
            rail: false,
            coast: true
        },
        kadamakkudy: {
            name: 'Kadamakkudy',
            coordinates: [10.0583, 76.2459],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A quiet cluster of islands, wetlands and village roads just beyond central Kochi.',
            image: 'images/destinations/kadamakkudy-official.webp',
            url: 'destination-kadamakkudy.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        munnar: {
            name: 'Munnar',
            coordinates: [10.0889, 77.0595],
            category: 'Hills',
            categoryKey: 'hills',
            icon: 'fa-mountain-sun',
            description: 'Highland tea country with cool air, plantation views and winding mountain roads.',
            image: '68.jpg',
            url: 'destination-munnar.html',
            planUrl: 'plan-5-days.html',
            rail: false,
            hill: true
        },
        thekkady: {
            name: 'Thekkady',
            coordinates: [9.6031, 77.1615],
            category: 'Wildlife & nature',
            categoryKey: 'nature',
            icon: 'fa-tree',
            description: 'The gateway to Periyar landscapes, spice gardens and forest-fringed lake experiences.',
            image: 'tourists-thekkady-boating.webp',
            url: 'destination-thekkady.html',
            planUrl: 'plan-5-days.html',
            rail: false,
            hill: true
        },
        alappuzha: {
            name: 'Alappuzha',
            coordinates: [9.4981, 76.3388],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-sailboat',
            description: 'Kerala\'s classic houseboat centre, surrounded by canals, paddy fields and Vembanad backwaters.',
            url: 'destination-alappuzha.html',
            planUrl: 'plan-3-days.html',
            rail: true,
            coast: true
        },
        kumarakom: {
            name: 'Kumarakom',
            coordinates: [9.6175, 76.4301],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A relaxed Vembanad Lake village for birdlife, waterfront stays and daytime cruises.',
            url: 'destination-kumarakom.html',
            planUrl: 'plan-5-days-seniors.html',
            rail: false
        },
        'munroe-island': {
            name: 'Munroe Island',
            coordinates: [8.9946, 76.6060],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-person-swimming',
            description: 'A village island landscape where small canoe trips pass through narrow canals and coconut groves.',
            image: 'images/destinations/munroe-island-official.webp',
            url: 'destination-munroe-island.html',
            planUrl: 'plan-7-days.html',
            rail: true
        },
        varkala: {
            name: 'Varkala',
            coordinates: [8.7379, 76.7163],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-umbrella-beach',
            description: 'A cliff-backed coastal town with beach walks, sea views and a relaxed traveller atmosphere.',
            image: 'Varkala-Beach.webp',
            url: 'destination-varkala-kovalam.html',
            planUrl: 'plan-7-days.html',
            rail: true,
            coast: true
        },
        kovalam: {
            name: 'Kovalam',
            coordinates: [8.4004, 76.9787],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-umbrella-beach',
            description: 'A well-known beach area south of Thiruvananthapuram, recognised for its lighthouse coast.',
            image: 'tourists-kovalam-beach.webp',
            url: 'destination-varkala-kovalam.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        poovar: {
            name: 'Poovar',
            coordinates: [8.3214, 77.0707],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A southern estuary where the Neyyar River meets the Arabian Sea, with mangroves and a boat-access sandbar.',
            image: 'images/destinations/poovar-official.webp',
            url: 'destination-poovar.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        thiruvananthapuram: {
            name: 'Thiruvananthapuram',
            aliases: ['Trivandrum'],
            coordinates: [8.5241, 76.9366],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-building-columns',
            description: 'Kerala\'s capital and southern transport hub, close to museums, heritage areas and coastal routes.',
            url: 'destination-thiruvananthapuram.html',
            planUrl: 'plan-7-days.html',
            rail: true,
            coast: true
        },
        wayanad: {
            name: 'Wayanad',
            coordinates: [11.6087, 76.0834],
            category: 'Wildlife & nature',
            categoryKey: 'nature',
            icon: 'fa-tree',
            description: 'A forested northern plateau of plantations, waterfalls, caves and wildlife landscapes.',
            url: 'destination-wayanad.html',
            planUrl: 'plan-10-days.html',
            rail: false,
            hill: true
        },
        kozhikode: {
            name: 'Kozhikode',
            coordinates: [11.2588, 75.7804],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-city',
            description: 'A Malabar coastal city known for food traditions, historic trade and access to Wayanad.',
            url: 'destination-kozhikode.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        },
        kannur: {
            name: 'Kannur',
            coordinates: [11.8745, 75.3704],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-masks-theater',
            description: 'A northern coastal city associated with Theyyam, forts, beaches and Malabar culture.',
            url: 'destination-kannur.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        },
        valiyaparamba: {
            name: 'Valiyaparamba',
            coordinates: [12.1034, 75.1629],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A quieter north Kerala backwater region of islands, estuaries and village boat journeys.',
            image: 'images/destinations/valiyaparamba-official.webp',
            url: 'destination-valiyaparamba.html',
            planUrl: 'plan-10-days.html',
            rail: false,
            coast: true
        },
        bekal: {
            name: 'Bekal',
            coordinates: [12.3910, 75.0349],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-fort-awesome',
            description: 'A northern coastal finish centred on Bekal Fort, sea views and a quieter beach landscape.',
            url: 'destination-bekal.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        }
    };

    const airports = {
        COK: { name: 'Cochin International Airport', coordinates: [10.1520, 76.4019] },
        TRV: { name: 'Thiruvananthapuram International Airport', coordinates: [8.4821, 76.9201] },
        CCJ: { name: 'Calicut International Airport', coordinates: [11.1368, 75.9553] },
        CNN: { name: 'Kannur International Airport', coordinates: [11.9186, 75.5472] }
    };

    const transportAccess = {
        kochi: { rail: 'Ernakulam', railTransfer: 20, airport: 'COK', airportTransfer: 45 },
        'fort-kochi': { rail: 'Ernakulam', railTransfer: 50, airport: 'COK', airportTransfer: 75 },
        kadamakkudy: { rail: 'Ernakulam or Aluva', railTransfer: 60, airport: 'COK', airportTransfer: 50 },
        munnar: { rail: 'Aluva or Ernakulam', railTransfer: 240, airport: 'COK', airportTransfer: 240 },
        thekkady: { rail: 'Kottayam', railTransfer: 180, airport: 'COK', airportTransfer: 270 },
        alappuzha: { rail: 'Alappuzha', railTransfer: 15, airport: 'COK', airportTransfer: 100 },
        kumarakom: { rail: 'Kottayam', railTransfer: 35, airport: 'COK', airportTransfer: 110 },
        'munroe-island': { rail: 'Munroturuttu', railTransfer: 15, airport: 'TRV', airportTransfer: 120 },
        varkala: { rail: 'Varkala Sivagiri', railTransfer: 15, airport: 'TRV', airportTransfer: 75 },
        kovalam: { rail: 'Thiruvananthapuram Central', railTransfer: 35, airport: 'TRV', airportTransfer: 30 },
        poovar: { rail: 'Neyyattinkara or Thiruvananthapuram', railTransfer: 45, airport: 'TRV', airportTransfer: 45 },
        thiruvananthapuram: { rail: 'Thiruvananthapuram Central', railTransfer: 15, airport: 'TRV', airportTransfer: 20 },
        wayanad: { rail: 'Kozhikode', railTransfer: 150, airport: 'CCJ', airportTransfer: 180 },
        kozhikode: { rail: 'Kozhikode', railTransfer: 15, airport: 'CCJ', airportTransfer: 45 },
        kannur: { rail: 'Kannur', railTransfer: 15, airport: 'CNN', airportTransfer: 45 },
        valiyaparamba: { rail: 'Payyanur', railTransfer: 45, airport: 'CNN', airportTransfer: 90 },
        bekal: { rail: 'Bekal Fort or Kasaragod', railTransfer: 20, airport: 'CNN', airportTransfer: 150 }
    };

    const stopLibrary = {
        mattancherry: { name: 'Mattancherry', description: 'A historic trading quarter beside Fort Kochi.', why: 'Spice streets, heritage buildings and Jew Town fit naturally before the waterfront.', duration: '45-90 min' },
        vypin: { name: 'Vypin waterfront', description: 'A harbour-side island connection near old Kochi.', why: 'A useful pause for ferry views and a different perspective on the port.', duration: '30-45 min' },
        moolampilly: { name: 'Moolampilly', description: 'A small island settlement on the Kadamakkudy approach.', why: 'The wetlands and village roads signal the shift from city to island landscape.', duration: '20-30 min' },
        pizhala: { name: 'Pizhala', description: 'A low-lying island village among waterways and paddy fields.', why: 'It is a quiet place to slow down before continuing deeper into Kadamakkudy.', duration: '30-45 min' },
        varapuzha: { name: 'Varapuzha', description: 'A riverside town north of Kochi.', why: 'Convenient for a short refreshment or rest stop before the final island roads.', duration: '20-30 min' },
        cheeyappara: { name: 'Cheeyappara Waterfalls', description: 'A roadside cascade on the Kochi-Munnar climb.', why: 'It breaks the uphill journey and introduces the Western Ghats landscape.', duration: '20-30 min' },
        valara: { name: 'Valara Waterfalls', description: 'A green roadside waterfall area near the highland route.', why: 'A brief scenic pause before the steeper plantation roads.', duration: '15-25 min' },
        adimali: { name: 'Adimali', description: 'A busy plantation town below Munnar.', why: 'A practical place for food, fuel and a comfort break before the final climb.', duration: '30-45 min' },
        marari: { name: 'Marari coast', description: 'A quieter beach area north of Alappuzha.', why: 'A short coastal detour can balance the city-to-backwater journey.', duration: '45-75 min' },
        cherthala: { name: 'Cherthala', description: 'A well-connected town between Kochi and Alappuzha.', why: 'Useful for refreshments and a short rest before entering backwater country.', duration: '20-30 min' },
        vaikom: { name: 'Vaikom', description: 'A temple town and backwater gateway north of Kumarakom.', why: 'Its lake-side setting makes a natural pause on the approach to Vembanad.', duration: '45-60 min' },
        thanneermukkom: { name: 'Thanneermukkom Bund', description: 'A water-control structure across Vembanad Lake.', why: 'It offers a clear view of the scale and working landscape of the backwaters.', duration: '25-40 min' },
        kumarakomBird: { name: 'Kumarakom Bird Sanctuary area', description: 'A green wetland edge beside Vembanad Lake.', why: 'A calm introduction to local birdlife before checking into Kumarakom.', duration: '45-90 min' },
        thrissur: { name: 'Thrissur', description: 'A central Kerala cultural city on the northbound corridor.', why: 'It is a practical meal and rest stop with temples and heritage nearby.', duration: '45-90 min' },
        ponnani: { name: 'Ponnani', description: 'A historic river-and-sea town on the Malabar coast.', why: 'The estuary landscape adds a coastal pause to the long northbound drive.', duration: '30-45 min' },
        kadalundi: { name: 'Kadalundi', description: 'An estuary and bird habitat south of Kozhikode.', why: 'A peaceful nature break before entering the city.', duration: '45-75 min' },
        lockhart: { name: 'Lockhart Gap', description: 'A highland viewpoint south of Munnar.', why: 'Wide valley views make it one of the most rewarding short pauses on this route.', duration: '20-30 min' },
        pooppara: { name: 'Pooppara', description: 'A small plantation settlement among cardamom hills.', why: 'It gives the journey a quiet local stop between the better-known hill towns.', duration: '20-30 min' },
        anakkara: { name: 'Anakkara', description: 'A spice-growing village near Thekkady.', why: 'A pre-arranged spice-garden visit can introduce the region before arrival.', duration: '45-75 min' },
        kuttikkanam: { name: 'Kuttikkanam', description: 'A cool hill settlement on the descent from Thekkady.', why: 'It is a sensible tea and rest stop before the lower roads.', duration: '25-40 min' },
        kottayam: { name: 'Kottayam', description: 'A central Kerala town linking the hills and Vembanad region.', why: 'A practical meal, rail or comfort stop on longer hill-to-backwater journeys.', duration: '30-60 min' },
        champakulam: { name: 'Champakulam', description: 'A Kuttanad village beside backwater channels.', why: 'Village scenery and waterways provide a gentle introduction to Alappuzha.', duration: '45-60 min' },
        thenmala: { name: 'Thenmala', description: 'A forested area with reservoir scenery in southern Kerala.', why: 'It adds a nature break to the long descent towards Kollam district.', duration: '45-75 min' },
        punalur: { name: 'Punalur', description: 'A riverside town between the high ranges and Kollam.', why: 'A useful food and rest stop before the final lowland stretch.', duration: '30-45 min' },
        karunagappally: { name: 'Karunagappally', description: 'A coastal town between Alappuzha and Kollam.', why: 'Convenient for refreshments before turning towards Munroe Island.', duration: '20-30 min' },
        sasthamkotta: { name: 'Sasthamkotta Lake', description: 'Kerala\'s largest freshwater lake, near the Munroe approach.', why: 'A calm landscape stop that genuinely fits the backwater route.', duration: '30-45 min' },
        kollam: { name: 'Kollam', description: 'A historic port city on Ashtamudi Lake.', why: 'It is a logical meal stop and a useful transition from backwaters to coast.', duration: '45-75 min' },
        paravurLake: { name: 'Paravur Lake', description: 'A lake-and-sea landscape north of Varkala.', why: 'The water views create a gentle stop before the beach town.', duration: '30-45 min' },
        kappil: { name: 'Kappil Beach & backwaters', description: 'A narrow meeting point of lake, road and Arabian Sea.', why: 'It is a scenic, low-effort pause close to Varkala.', duration: '30-45 min' },
        anchuthengu: { name: 'Anchuthengu', description: 'A coastal heritage area south of Varkala.', why: 'The fort and fishing-village landscape add history to the beach road.', duration: '40-60 min' },
        vizhinjam: { name: 'Vizhinjam', description: 'A working coastal area beside Kovalam.', why: 'Harbour and lighthouse views make a short final coastal stop.', duration: '30-45 min' },
        vellayani: { name: 'Vellayani Lake', description: 'A freshwater lake near southern Thiruvananthapuram.', why: 'A quiet landscape break away from city traffic.', duration: '30-45 min' },
        thamarassery: { name: 'Thamarassery', description: 'The town at the foot of the Wayanad ghat road.', why: 'A practical place to pause before the winding climb.', duration: '20-30 min' },
        lakkidi: { name: 'Lakkidi View Point', description: 'A high viewpoint near the top of Thamarassery Pass.', why: 'It marks the arrival onto Wayanad\'s plateau with broad valley views.', duration: '20-30 min' },
        pookode: { name: 'Pookode Lake', description: 'A small forest-fringed lake near Vythiri.', why: 'A gentle stop after the climb, especially for families.', duration: '45-75 min' },
        kappad: { name: 'Kappad Beach', description: 'A historic beach north of Kozhikode.', why: 'A coastal detour adds sea views without leaving the northbound corridor for long.', duration: '40-60 min' },
        vadakara: { name: 'Vadakara', description: 'A north Malabar town on the Kozhikode-Kannur road.', why: 'A practical meal and rest stop on the longer coastal transfer.', duration: '30-45 min' },
        muzhappilangad: { name: 'Muzhappilangad Beach', description: 'A long beach south of Kannur.', why: 'It is a popular coastal pause before entering Kannur city.', duration: '45-60 min' },
        payyanur: { name: 'Payyanur', description: 'A northern Kerala town between Kannur and Kasaragod districts.', why: 'Useful for food and supplies before the quieter backwater roads.', duration: '30-45 min' },
        kavvayi: { name: 'Kavvayi backwaters', description: 'A northern backwater landscape near Payyanur.', why: 'It gives a genuine preview of the island geography around Valiyaparamba.', duration: '45-75 min' },
        nileshwaram: { name: 'Nileshwaram', description: 'A cultural town and backwater gateway in Kasaragod district.', why: 'A good break for local food and a quieter view of north Kerala life.', duration: '35-50 min' },
        kanhangad: { name: 'Kanhangad', description: 'A well-connected town just south of Bekal.', why: 'A practical final rest stop before the fort and beach area.', duration: '25-40 min' }
    };

    const edges = [
        ['kochi', 'fort-kochi', 6, 30, ['mattancherry', 'vypin']],
        ['kochi', 'kadamakkudy', 29, 50, ['moolampilly', 'pizhala', 'varapuzha']],
        ['kochi', 'munnar', 125, 240, ['cheeyappara', 'valara', 'adimali']],
        ['kochi', 'alappuzha', 55, 105, ['cherthala', 'marari']],
        ['kochi', 'kumarakom', 51, 120, ['vaikom', 'thanneermukkom', 'kumarakomBird']],
        ['kochi', 'kozhikode', 182, 300, ['thrissur', 'ponnani', 'kadalundi']],
        ['munnar', 'thekkady', 83, 180, ['lockhart', 'pooppara', 'anakkara']],
        ['thekkady', 'alappuzha', 138, 240, ['kuttikkanam', 'kottayam', 'champakulam']],
        ['thekkady', 'munroe-island', 145, 240, ['kuttikkanam', 'thenmala', 'punalur']],
        ['alappuzha', 'kumarakom', 23, 75, ['champakulam', 'thanneermukkom', 'kumarakomBird']],
        ['alappuzha', 'munroe-island', 75, 120, ['karunagappally', 'sasthamkotta']],
        ['munroe-island', 'varkala', 42, 90, ['kollam', 'paravurLake', 'kappil']],
        ['munroe-island', 'thiruvananthapuram', 80, 100, ['kollam']],
        ['varkala', 'kovalam', 52, 90, ['anchuthengu', 'thiruvananthapuram', 'vizhinjam']],
        ['varkala', 'thiruvananthapuram', 42, 70, []],
        ['kovalam', 'poovar', 17, 40, ['vizhinjam']],
        ['kovalam', 'thiruvananthapuram', 17, 35, ['vizhinjam', 'vellayani']],
        ['kumarakom', 'thiruvananthapuram', 165, 240, ['karunagappally', 'kollam']],
        ['kozhikode', 'wayanad', 71, 150, ['thamarassery', 'lakkidi', 'pookode']],
        ['kozhikode', 'kannur', 92, 150, ['kappad', 'vadakara', 'muzhappilangad']],
        ['kannur', 'valiyaparamba', 42, 75, ['payyanur', 'kavvayi']],
        ['kannur', 'bekal', 75, 135, ['payyanur', 'nileshwaram', 'kanhangad']],
        ['valiyaparamba', 'bekal', 42, 75, ['nileshwaram', 'kanhangad']]
    ];

    const plans = [
        { id: 'three-day', name: '3-Day Kochi + Backwaters', duration: '3 days', pace: 'Compact', url: 'plan-3-days.html', destinations: ['kochi', 'fort-kochi', 'alappuzha'], categories: ['city', 'water'] },
        { id: 'five-day', name: '5-Day Hills + Houseboat', duration: '5 days', pace: 'Balanced', url: 'plan-5-days.html', destinations: ['kochi', 'munnar', 'thekkady', 'alappuzha'], categories: ['city', 'hills', 'nature', 'water'] },
        { id: 'seven-day', name: '7-Day Classic + Offbeat Kerala', duration: '7 days', pace: 'Balanced', url: 'plan-7-days.html', destinations: ['kochi', 'fort-kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'varkala', 'thiruvananthapuram'], categories: ['city', 'hills', 'nature', 'water', 'beach'] },
        { id: 'ten-day', name: '10-Day Kerala Deep Dive', duration: '10 days', pace: 'Active', url: 'plan-10-days.html', destinations: ['kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'thiruvananthapuram', 'wayanad', 'valiyaparamba', 'bekal'], categories: ['city', 'hills', 'nature', 'water', 'beach'] },
        { id: 'student', name: '5-Day Kerala Student Plan', duration: '5 days', pace: 'Active', url: 'plan-5-days-students.html', destinations: ['kochi', 'munnar', 'alappuzha'], categories: ['city', 'hills', 'water'], specialised: true },
        { id: 'senior', name: '5-Day Easy-Paced Senior Plan', duration: '5 days', pace: 'Gentle', url: 'plan-5-days-seniors.html', destinations: ['kochi', 'kumarakom', 'thiruvananthapuram'], categories: ['city', 'water'], specialised: true }
    ];

    const categoryMeta = {
        hills: { label: 'Hills', markerClass: 'marker-hills', icon: 'fa-mountain-sun' },
        water: { label: 'Backwaters & islands', markerClass: 'marker-water', icon: 'fa-water' },
        beach: { label: 'Beaches', markerClass: 'marker-beach', icon: 'fa-umbrella-beach' },
        city: { label: 'Cities & heritage', markerClass: 'marker-city', icon: 'fa-landmark' },
        nature: { label: 'Wildlife & nature', markerClass: 'marker-nature', icon: 'fa-tree' }
    };

    const graph = {};
    edges.forEach(([from, to, distance, minutes, stops]) => {
        graph[from] ||= [];
        graph[to] ||= [];
        graph[from].push({ to, distance, minutes, stops });
        graph[to].push({ to: from, distance, minutes, stops: [...stops].reverse() });
    });

    let map = null;
    let routeLayer = null;
    let terminalLayer = null;
    let mapMarkers = {};
    let forceFallbackRouting = new URLSearchParams(window.location.search).get('routing') === 'fallback';
    let currentRouteMode = 'point';
    let multiStopCounter = 0;
    const MAX_ROUTE_DESTINATIONS = 8;

    const elements = {};
    const allDestinationBounds = Object.values(destinations).map(destination => destination.coordinates);

    const roundToQuarterHour = minutes => Math.max(15, Math.round(minutes / 15) * 15);

    const formatDuration = minutes => {
        const rounded = roundToQuarterHour(minutes);
        const hours = Math.floor(rounded / 60);
        const remaining = rounded % 60;
        if (!hours) return `${remaining} min`;
        if (!remaining) return `${hours} hr`;
        return `${hours} hr ${remaining} min`;
    };

    const escapeHtml = value => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    function findDestinationId(value) {
        const candidate = String(value || '').trim().toLowerCase();
        return Object.entries(destinations).find(([, destination]) => {
            if (destination.name.toLowerCase() === candidate) return true;
            return destination.aliases?.some(alias => alias.toLowerCase() === candidate);
        })?.[0] || null;
    }

    function shortestFallbackRoute(fromId, toId) {
        const distance = Object.fromEntries(Object.keys(destinations).map(id => [id, Infinity]));
        const previous = {};
        const visited = new Set();
        distance[fromId] = 0;

        while (visited.size < Object.keys(destinations).length) {
            const current = Object.keys(distance)
                .filter(id => !visited.has(id))
                .sort((a, b) => distance[a] - distance[b])[0];

            if (!current || !Number.isFinite(distance[current])) break;
            if (current === toId) break;
            visited.add(current);

            (graph[current] || []).forEach(edge => {
                const candidate = distance[current] + edge.minutes;
                if (candidate < distance[edge.to]) {
                    distance[edge.to] = candidate;
                    previous[edge.to] = { from: current, edge };
                }
            });
        }

        if (!previous[toId] && fromId !== toId) return null;

        const path = [toId];
        const routeEdges = [];
        let cursor = toId;
        while (cursor !== fromId) {
            const step = previous[cursor];
            if (!step) return null;
            routeEdges.unshift(step.edge);
            cursor = step.from;
            path.unshift(cursor);
        }

        const totalDistance = routeEdges.reduce((sum, edge) => sum + edge.distance, 0);
        const totalMinutes = routeEdges.reduce((sum, edge) => sum + edge.minutes, 0);
        const stopIds = routeEdges.flatMap(edge => edge.stops);

        return {
            path,
            edges: routeEdges,
            distance: totalDistance,
            minutes: totalMinutes,
            stopIds,
            coordinates: path.map(id => destinations[id].coordinates)
        };
    }

    async function getRoadRoute(fromId, toId, fallback) {
        if (forceFallbackRouting) throw new Error('Fallback routing requested');

        const from = destinations[fromId].coordinates;
        const to = destinations[toId].coordinates;
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 9000);
        const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson&steps=false&alternatives=false`;

        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`Routing service returned ${response.status}`);
            const data = await response.json();
            if (data.code !== 'Ok' || !data.routes?.[0]) throw new Error('No road route returned');
            const roadRoute = data.routes[0];
            const liveMinutes = roadRoute.duration / 60;
            const planningMinutes = roundToQuarterHour(Math.max(liveMinutes * 1.25, fallback.minutes));

            return {
                source: 'live',
                distance: Math.round(roadRoute.distance / 1000),
                minutes: planningMinutes,
                coordinates: roadRoute.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude])
            };
        } finally {
            window.clearTimeout(timeout);
        }
    }

    function routeTypeFor(fromId, toId) {
        const pair = [destinations[fromId], destinations[toId]];
        if (pair.some(destination => destination.hill || ['hills', 'nature'].includes(destination.categoryKey))) return 'Hill road';
        if (pair.every(destination => destination.categoryKey === 'city') && pair.every(destination => !destination.coast)) return 'City route';
        if (pair.some(destination => destination.categoryKey === 'water')) return 'Backwater connection';
        if (pair.some(destination => destination.coast || destination.categoryKey === 'beach')) return 'Coastal road';
        return 'City route';
    }

    function distanceBetweenCoordinates(first, second) {
        const toRadians = degrees => degrees * Math.PI / 180;
        const latitudeDelta = toRadians(second[0] - first[0]);
        const longitudeDelta = toRadians(second[1] - first[1]);
        const firstLatitude = toRadians(first[0]);
        const secondLatitude = toRadians(second[0]);
        const haversine = Math.sin(latitudeDelta / 2) ** 2
            + Math.cos(firstLatitude) * Math.cos(secondLatitude) * Math.sin(longitudeDelta / 2) ** 2;
        return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    }

    function practicalRailConnection(fromId, toId, longRoute) {
        const from = transportAccess[fromId];
        const to = transportAccess[toId];
        const maximumTransfer = longRoute ? 180 : 90;
        const available = Boolean(from?.rail && to?.rail
            && from.railTransfer <= maximumTransfer
            && to.railTransfer <= maximumTransfer);
        return {
            available,
            requiresRoadTransfer: available && (from.railTransfer > 30 || to.railTransfer > 30),
            fromStation: from?.rail,
            toStation: to?.rail,
            transferMinutes: (from?.railTransfer || 0) + (to?.railTransfer || 0)
        };
    }

    function practicalFlightConnection(fromId, toId, roadMinutes, rail) {
        const fromAccess = transportAccess[fromId];
        const toAccess = transportAccess[toId];
        const fromAirport = airports[fromAccess?.airport];
        const toAirport = airports[toAccess?.airport];
        if (!fromAirport || !toAirport || fromAccess.airport === toAccess.airport) return { available: false, reason: 'same-airport-region' };

        const airportDistance = distanceBetweenCoordinates(fromAirport.coordinates, toAirport.coordinates);
        if (airportDistance < 160) return { available: false, reason: 'airports-too-close' };
        if (rail.available && roadMinutes <= 450) return { available: false, reason: 'rail-more-direct' };

        return {
            available: true,
            fromCode: fromAccess.airport,
            toCode: toAccess.airport,
            fromAirport,
            toAirport,
            airportDistance,
            requiresRoadTransfer: fromAccess.airportTransfer > 30 || toAccess.airportTransfer > 30,
            transferMinutes: fromAccess.airportTransfer + toAccess.airportTransfer
        };
    }

    function estimatedRailMinutes(roadMinutes, rail) {
        return roundToQuarterHour(Math.max(75, roadMinutes * 0.72) + rail.transferMinutes);
    }

    function estimatedFlightMinutes(flight) {
        const airborneMinutes = Math.max(60, Math.round(flight.airportDistance / 7.2));
        return roundToQuarterHour(flight.transferMinutes + 150 + airborneMinutes);
    }

    function recommendedMethod(fromId, toId, roadMinutes) {
        const longRoute = roadMinutes > 300;
        const rail = practicalRailConnection(fromId, toId, longRoute);
        const flight = practicalFlightConnection(fromId, toId, roadMinutes, rail);
        const remoteRoadRoute = [fromId, toId].every(id => {
            const access = transportAccess[id];
            return access && access.railTransfer >= 150 && access.airportTransfer >= 150;
        });

        let carScore = roadMinutes <= 150 ? 100
            : roadMinutes <= 240 ? 84
                : roadMinutes <= 360 ? 66
                    : roadMinutes <= 480 ? 48
                        : roadMinutes <= 720 ? 30 : 10;
        if (remoteRoadRoute) carScore += 22;

        const candidates = [{
            mode: 'Car',
            icon: 'fa-car-side',
            score: carScore,
            approximateMinutes: roadMinutes,
            reason: roadMinutes <= 240
                ? 'Best for this short or remote route and offers the most flexibility.'
                : 'Road travel remains the most practical option because rail and airport transfers would add a major detour.'
        }];

        if (rail.available) {
            const railMinutes = estimatedRailMinutes(roadMinutes, rail);
            let railScore = 68 + Math.min(26, Math.max(0, roadMinutes - 180) / 12) - rail.transferMinutes / 20;
            if (rail.transferMinutes <= 60) railScore += 10;
            if (roadMinutes < 150) railScore -= 38;
            candidates.push({
                mode: 'Train',
                icon: 'fa-train',
                score: railScore,
                approximateMinutes: railMinutes,
                reason: rail.requiresRoadTransfer
                    ? `Rail reduces sustained road travel. Use ${rail.fromStation} and ${rail.toStation}, with local road transfers at one or both ends.`
                    : 'A practical rail connection offers better comfort than a long road journey without airport overhead.'
            });
        }

        if (flight.available) {
            const flightMinutes = estimatedFlightMinutes(flight);
            const timeSaved = roadMinutes - flightMinutes;
            let flightScore = 55 + timeSaved / 8 - flight.transferMinutes / 25;
            if (roadMinutes >= 600) flightScore += 16;
            if (timeSaved < 120) flightScore -= 35;
            candidates.push({
                mode: 'Flight',
                icon: 'fa-plane-departure',
                score: flightScore,
                approximateMinutes: flightMinutes,
                reason: `Flying meaningfully reduces this long journey. Use ${flight.fromAirport.name} and ${flight.toAirport.name}, with road transfers where required.`
            });
        }

        const selected = candidates.sort((first, second) => second.score - first.score)[0];
        return { ...selected, rail, flight };
    }

    const roundFare = (amount, step = 50) => Math.max(step, Math.round(amount / step) * step);
    const formatRupees = amount => `₹${Number(amount).toLocaleString('en-IN')}`;

    function flightOptionsFor(recommendation) {
        const flight = recommendation.flight;
        if (!flight?.available) return [];
        const base = roundFare(2500 + flight.airportDistance * 2.5, 100);
        const airMinutes = Math.max(60, Math.round(flight.airportDistance / 7.2));
        const route = `${flight.fromCode} → ${flight.toCode}`;
        return [
            { name: 'Fastest Economy option', route, fare: `${formatRupees(base)}–${formatRupees(base + 1700)}`, stops: 'NON-STOP IF OPERATING', duration: formatDuration(airMinutes) },
            { name: 'Shortest one-stop option', route, fare: `${formatRupees(base + 700)}–${formatRupees(base + 2700)}`, stops: '1 STOP', duration: formatDuration(airMinutes + 120) },
            { name: 'Flexible Economy option', route, fare: `${formatRupees(base + 400)}–${formatRupees(base + 2400)}`, stops: '1 STOP', duration: formatDuration(airMinutes + 180) }
        ];
    }

    function trainOptionsFor(recommendation, roadMinutes, roadDistance) {
        const rail = recommendation.rail;
        if (!rail?.available) return [];
        const base = roundFare(450 + roadDistance * 0.82);
        const railMinutes = estimatedRailMinutes(roadMinutes, rail);
        const route = `${rail.fromStation} → ${rail.toStation}`;
        const overnightSuitable = (roadMinutes >= 420 && rail.transferMinutes <= 90)
            || (roadMinutes >= 600 && rail.transferMinutes <= 180)
            || (roadMinutes >= 300 && rail.transferMinutes <= 60);
        const common = { route, fare: `${formatRupees(base)}–${formatRupees(base + 350)}`, changes: 'DIRECT SERVICE PREFERRED' };
        const options = [
            { ...common, name: 'Fastest practical 3AC option', duration: formatDuration(railMinutes), timing: 'DAY TRAIN' },
            { ...common, name: 'Comfort-focused 3AC option', fare: `${formatRupees(base + 100)}–${formatRupees(base + 500)}`, duration: formatDuration(railMinutes + 30), timing: 'DAY TRAIN' }
        ];
        options.push(overnightSuitable
            ? { ...common, name: 'Overnight 3AC option', fare: `${formatRupees(base + 50)}–${formatRupees(base + 450)}`, duration: formatDuration(railMinutes + 45), timing: 'NIGHT TRAIN' }
            : { ...common, name: 'Flexible 3AC option', fare: `${formatRupees(base)}–${formatRupees(base + 450)}`, duration: formatDuration(railMinutes + 60), timing: 'DAY TRAIN' });
        return options;
    }

    function modeUnavailable(mode, reason) {
        const explanations = {
            Train: reason === 'access' ? 'No practical railway access near both places.' : 'Rail would add an unreasonable transfer for this route.',
            Flight: reason === 'same-airport-region' ? 'Both places use the same practical airport region.'
                : reason === 'airports-too-close' ? 'Airport overhead is greater than the time saved.'
                    : reason === 'rail-more-direct' ? 'A direct rail journey is more practical than flying.'
                        : 'No practical airport connection reduces the journey.'
        };
        return `<div class="transport-unavailable"><strong>${escapeHtml(mode)}</strong><span>Not practical for this route</span><small>${escapeHtml(explanations[mode] || '')}</small></div>`;
    }

    function renderTransportComparison(fromId, toId, route, recommendation, stops) {
        const flights = flightOptionsFor(recommendation);
        const trains = trainOptionsFor(recommendation, route.minutes, route.distance);
        const stopNames = stops.slice(0, 3).map(stop => stop.name).join(' · ') || 'Comfort breaks as needed';
        const flightMarkup = flights.length ? flights.map((option, index) => `<article class="mode-option-card"><span class="mode-option-number">Flight ${index + 1}</span><h5>${escapeHtml(option.name)}</h5><p class="mode-route">${escapeHtml(option.route)}</p><strong>${escapeHtml(option.fare)}</strong><small>Estimated Economy fare / person</small><div class="mode-option-meta"><span>${escapeHtml(option.stops)}</span><span>Approx. ${escapeHtml(option.duration)}</span></div></article>`).join('') : modeUnavailable('Flight', recommendation.flight?.reason);
        const trainMarkup = trains.length ? trains.map((option, index) => `<article class="mode-option-card"><span class="mode-option-number">Train ${index + 1}</span><h5>${escapeHtml(option.name)}</h5><p class="mode-route">${escapeHtml(option.route)}</p><strong>${escapeHtml(option.fare)}</strong><small>Estimated 3AC fare / person</small><div class="mode-option-meta"><span>${escapeHtml(option.changes)}</span><span>Approx. ${escapeHtml(option.duration)}</span><span>${escapeHtml(option.timing)}</span></div></article>`).join('') : modeUnavailable('Train', 'access');

        elements.transport.innerHTML = `<div class="recommended-mode"><span>Recommended</span><strong><i class="fa-solid ${escapeHtml(recommendation.icon)}" aria-hidden="true"></i> ${escapeHtml(recommendation.mode)}</strong><p>Approximate total travel time: ${escapeHtml(formatDuration(recommendation.approximateMinutes))}. ${escapeHtml(recommendation.reason)}</p></div><section class="mode-options-group" aria-labelledby="flight-options-heading"><div class="mode-options-heading"><i class="fa-solid fa-plane-departure" aria-hidden="true"></i><h4 id="flight-options-heading">Flights</h4><span>Economy fare estimate</span></div><div class="mode-option-grid">${flightMarkup}</div></section><section class="mode-options-group" aria-labelledby="train-options-heading"><div class="mode-options-heading"><i class="fa-solid fa-train" aria-hidden="true"></i><h4 id="train-options-heading">Trains</h4><span>3AC fare estimate</span></div><div class="mode-option-grid">${trainMarkup}</div></section><section class="mode-options-group" aria-labelledby="car-options-heading"><div class="mode-options-heading"><i class="fa-solid fa-car-side" aria-hidden="true"></i><h4 id="car-options-heading">Car</h4></div><article class="car-option-card"><div><span>Road distance</span><strong>${escapeHtml(`${route.distance} km`)}</strong></div><div><span>Drive time</span><strong>${escapeHtml(formatDuration(route.minutes))}</strong></div><div><span>Recommended stops</span><strong>${escapeHtml(stopNames)}</strong></div></article></section><p class="transport-fare-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Fares and schedules are estimates and may vary. Verify current availability before travel.</p>`;
    }

    function routeStops(fallback, fromId, toId) {
        const unique = [];
        fallback.stopIds.forEach(id => {
            if (stopLibrary[id] && !unique.includes(id)) unique.push(id);
        });

        const pathStopIds = fallback.path.slice(1, -1).map(id => {
            const destination = destinations[id];
            if (!destination) return null;
            const syntheticId = `destination-${id}`;
            if (!stopLibrary[syntheticId]) {
                stopLibrary[syntheticId] = {
                    name: destination.name,
                    description: destination.description,
                    why: `This route naturally passes through ${destination.name}, making it a practical place for a meal or an overnight break.`,
                    duration: '45-90 min'
                };
            }
            return syntheticId;
        }).filter(Boolean);

        if (fallback.distance >= 300 && pathStopIds.length) {
            const positions = pathStopIds.length <= 3
                ? pathStopIds.map((_, index) => index)
                : [0.25, 0.5, 0.75].map(ratio => Math.min(pathStopIds.length - 1, Math.round((pathStopIds.length - 1) * ratio)));
            const distributed = [...new Set(positions.map(index => pathStopIds[index]))];
            return distributed.slice(0, 3).map(id => stopLibrary[id]);
        }

        pathStopIds.forEach(id => {
            if (!unique.includes(id)) unique.push(id);
        });

        const chosen = unique.slice(0, 3).map(id => stopLibrary[id]);
        if (chosen.length >= 2) return chosen;

        const from = destinations[fromId];
        const to = destinations[toId];
        return [
            ...chosen,
            { name: `${from.name} departure area`, description: 'Use the departure area for water, snacks and a comfort break.', why: 'Starting prepared reduces unnecessary stops once the road becomes busier or more winding.', duration: '15-20 min' },
            { name: `${to.name} arrival area`, description: 'Pause before hotel check-in or the final local transfer.', why: 'It gives travellers time to confirm directions and arrival arrangements.', duration: '15-30 min' }
        ].slice(0, 3);
    }

    function journeyOverview(fromId, toId, type, fallback) {
        const from = destinations[fromId];
        const to = destinations[toId];
        const direction = to.coordinates[0] > from.coordinates[0] ? 'north' : 'south';
        const waypoints = fallback.path.slice(1, -1).map(id => destinations[id].name);
        const via = waypoints.length ? ` The fallback planning corridor passes via ${waypoints.join(', ')}.` : '';
        const experiences = {
            'Hill road': 'Expect changing elevations, plantation scenery and winding sections as the road approaches the Western Ghats.',
            'Backwater connection': 'The journey shifts between town roads, village landscapes, waterways and narrow last-mile approaches.',
            'Coastal road': 'Expect a mix of coastal towns, busy junctions and glimpses of Kerala\'s Arabian Sea landscape.',
            'City route': 'The route links urban neighbourhoods and heritage areas, where traffic conditions can shape the journey.'
        };
        return `Travel ${direction} from ${from.name} to ${to.name} on an approximate ${type.toLowerCase()}. ${experiences[type]}${via}`;
    }

    function travelAdvice(fromId, toId, type, distance, minutes, recommendation) {
        const advice = [];
        const pair = [destinations[fromId], destinations[toId]];

        if (recommendation.mode === 'Flight') {
            const flight = recommendation.flight;
            advice.push(['fa-ticket', 'Check current flight operation, Economy baggage rules and terminal details before booking.']);
            advice.push(['fa-clock', 'Allow enough time for airport check-in, security and the road transfer at each end of the journey.']);
            if (flight?.requiresRoadTransfer) advice.push(['fa-car-side', 'Pre-arrange the final road transfer because the selected destinations are not both beside their practical airports.']);
            advice.push(['fa-cloud-rain', 'Monsoon weather can affect road access and flight operations, so keep a generous connection buffer.']);
            advice.push(['fa-suitcase-medical', 'Keep medicines, identification and essential items in cabin baggage rather than checked luggage.']);
            advice.push(['fa-person-walking-luggage', 'Families and senior travellers should request airport assistance directly from the airline when needed.']);
            return advice.slice(0, 6);
        }

        if (recommendation.mode === 'Train') {
            const rail = recommendation.rail;
            advice.push(['fa-ticket', 'Check the current timetable and confirmed 3AC availability before finalising the journey.']);
            advice.push(['fa-clock', 'Reach the departure station 30-45 minutes early and confirm the platform using official station information.']);
            if (rail?.requiresRoadTransfer) advice.push(['fa-car-side', 'Plan the local road transfer to and from the railway station, including extra time for traffic.']);
            advice.push(['fa-moon', 'For an overnight service, keep valuables secure and choose a train whose arrival time suits the final transfer.']);
            advice.push(['fa-bottle-water', 'Carry drinking water and light food even when onboard catering may be available.']);
            advice.push(['fa-cloud-rain', 'During the monsoon, check current rail and local road advisories before departure.']);
            return advice.slice(0, 6);
        }

        if (type === 'Hill road') {
            advice.push(['fa-road', 'Hill roads can be narrow and winding. Use an experienced driver and avoid rushing after dark.']);
            advice.push(['fa-tablets', 'Travellers prone to motion sickness should carry their usual medicine and sit where the road is easiest to see.']);
        }
        if (type === 'Coastal road' || pair.some(destination => destination.coast)) {
            advice.push(['fa-traffic-light', 'Allow extra time near cities and beach towns, especially on weekends and public holidays.']);
        }
        if (type === 'Backwater connection') {
            advice.push(['fa-bridge-water', 'Confirm the final approach with the stay or boat operator; island and jetty roads can be narrow.']);
        }
        if (distance >= 120 || minutes >= 210) {
            advice.push(['fa-sun', 'Leave by about 7:00-8:00 AM so the longest road section is completed in daylight.']);
            advice.push(['fa-mug-hot', 'Plan a proper rest stop every 90-120 minutes, particularly for children and senior travellers.']);
        } else {
            advice.push(['fa-clock', 'A morning departure usually leaves more flexibility for stops and changing road conditions.']);
        }
        advice.push(['fa-cloud-rain', 'During the monsoon, check current weather and local advisories before departure and allow a larger time buffer.']);
        advice.push(['fa-people-roof', minutes > 240 ? 'This is a demanding same-day transfer for families and senior travellers; consider an overnight break.' : 'The route is generally manageable for families when comfort breaks and meal stops are planned.']);
        return advice.slice(0, 6);
    }

    function matchingPlan(fromId, toId) {
        const from = destinations[fromId];
        const to = destinations[toId];
        return plans
            .map((plan, index) => {
                const fromMatch = plan.destinations.includes(fromId);
                const toMatch = plan.destinations.includes(toId);
                let score = (fromMatch ? 7 : 0) + (toMatch ? 7 : 0);
                score += plan.categories.includes(from.categoryKey) ? 1 : 0;
                score += plan.categories.includes(to.categoryKey) ? 1 : 0;
                if (!plan.specialised) score += 1;
                if (fromMatch && toMatch) score += Math.max(0, 5 - plan.destinations.length * 0.25);
                return { ...plan, score, index, fromMatch, toMatch };
            })
            .sort((a, b) => b.score - a.score || a.index - b.index)[0];
    }

    function markerPopup(id, destination) {
        const image = destination.image ? `<img src="${escapeHtml(destination.image)}" alt="${escapeHtml(destination.name)} landscape" loading="lazy">` : '';
        const actionText = destination.url.startsWith('destination-') ? 'View Destination' : 'View Matching Plan';
        return `<article class="destination-popup">${image}<div class="destination-popup-copy"><span>${escapeHtml(destination.category)}</span><h3>${escapeHtml(destination.name)}</h3><p>${escapeHtml(destination.description)}</p><a href="${escapeHtml(destination.url || destination.planUrl)}">${actionText} <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a></div></article>`;
    }

    function markerIcon(destination) {
        const meta = categoryMeta[destination.categoryKey];
        return L.divIcon({
            className: 'map-marker-wrap',
            html: `<span class="map-marker ${meta.markerClass}" role="img" aria-label="${escapeHtml(destination.name)}, ${escapeHtml(meta.label)} marker"><i class="fa-solid ${meta.icon}" aria-hidden="true"></i></span>`,
            iconSize: [42, 42],
            iconAnchor: [21, 38],
            popupAnchor: [0, -36]
        });
    }

    function terminalIcon(label, isDestination = false) {
        return L.divIcon({
            className: 'map-marker-wrap',
            html: `<span class="route-terminal-marker${isDestination ? ' is-destination' : ''}" aria-label="${isDestination ? 'Destination' : 'Start'} marker">${label}</span>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });
    }

    function tripStopIcon(number, total) {
        const terminalClass = number === 1 ? ' is-start' : number === total ? ' is-destination' : '';
        return L.divIcon({
            className: 'map-marker-wrap',
            html: `<span class="route-terminal-marker trip-stop-marker${terminalClass}" aria-label="Trip stop ${number} of ${total}">${number}</span>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });
    }

    function setMapUnavailable(message) {
        elements.mapLoading.hidden = true;
        elements.mapUnavailable.hidden = false;
        if (message) elements.mapUnavailable.querySelector('p').textContent = message;
    }

    function initialiseMap() {
        if (!window.L) {
            setMapUnavailable('Map tiles could not load. The route planner below remains available with curated planning estimates.');
            return;
        }

        map = L.map('kerala-map', { zoomControl: true, scrollWheelZoom: false, keyboard: true, minZoom: 6, maxZoom: 16 });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        });

        let successfulTiles = 0;
        let tileFailureTimer = null;
        tiles.on('tileload', () => {
            successfulTiles += 1;
            elements.mapLoading.hidden = true;
            elements.mapUnavailable.hidden = true;
        });
        tiles.on('tileerror', () => {
            window.clearTimeout(tileFailureTimer);
            tileFailureTimer = window.setTimeout(() => {
                if (!successfulTiles) setMapUnavailable('Map tiles are not available right now. Route summaries and curated fallback information still work below.');
            }, 2500);
        });
        tiles.addTo(map);

        Object.entries(destinations).forEach(([id, destination]) => {
            const marker = L.marker(destination.coordinates, {
                icon: markerIcon(destination),
                title: destination.name,
                keyboard: true,
                alt: `${destination.name}, ${destination.category}`
            }).addTo(map);
            marker.bindPopup(markerPopup(id, destination), { maxWidth: 270, minWidth: 220 });
            marker.on('popupopen', () => marker.getElement()?.querySelector('.map-marker')?.classList.add('is-active'));
            marker.on('popupclose', () => marker.getElement()?.querySelector('.map-marker')?.classList.remove('is-active'));
            mapMarkers[id] = marker;
        });

        map.fitBounds(allDestinationBounds, { padding: [34, 34] });
        map.attributionControl.setPrefix(false);
        window.setTimeout(() => {
            elements.mapLoading.hidden = true;
            if (!successfulTiles) setMapUnavailable('Map tiles are not available right now. Route summaries and curated fallback information still work below.');
        }, 5000);

        window.setTimeout(() => {
            document.querySelector('.leaflet-control-zoom-in')?.setAttribute('aria-label', 'Zoom map in');
            document.querySelector('.leaflet-control-zoom-out')?.setAttribute('aria-label', 'Zoom map out');
        }, 0);
    }

    function clearRouteLayers() {
        if (!map) return;
        if (routeLayer) map.removeLayer(routeLayer);
        if (terminalLayer) map.removeLayer(terminalLayer);
        routeLayer = null;
        terminalLayer = null;
    }

    function drawRoute(coordinates, fromId, toId) {
        if (!map) return;
        clearRouteLayers();
        routeLayer = L.polyline(coordinates, {
            color: '#c5a059',
            weight: 6,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
            className: 'journey-route-line'
        }).addTo(map);
        terminalLayer = L.layerGroup([
            L.marker(destinations[fromId].coordinates, { icon: terminalIcon('A'), title: `Start: ${destinations[fromId].name}` }),
            L.marker(destinations[toId].coordinates, { icon: terminalIcon('B', true), title: `Destination: ${destinations[toId].name}` })
        ]).addTo(map);
        map.fitBounds(routeLayer.getBounds(), { padding: [54, 54], maxZoom: 11 });
    }

    function drawMultiCityRoute(legs, routeIds) {
        if (!map) return;
        clearRouteLayers();
        routeLayer = L.featureGroup(legs.map(leg => L.polyline(leg.route.coordinates, {
            color: '#c5a059',
            weight: 6,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
            className: 'journey-route-line multi-city-route-segment'
        }))).addTo(map);
        terminalLayer = L.layerGroup(routeIds.map((id, index) => L.marker(destinations[id].coordinates, {
            icon: tripStopIcon(index + 1, routeIds.length),
            title: `Trip stop ${index + 1}: ${destinations[id].name}`
        }))).addTo(map);
        const bounds = routeLayer.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [62, 62], maxZoom: 10 });
    }

    function renderStops(stops) {
        elements.stops.innerHTML = stops.map(stop => `<article class="journey-stop"><span>${escapeHtml(stop.duration)}</span><h4>${escapeHtml(stop.name)}</h4><p>${escapeHtml(stop.description)}</p><strong>${escapeHtml(stop.why)}</strong></article>`).join('');
    }

    function renderList(target, entries, transport = false) {
        target.innerHTML = entries.map(entry => {
            if (transport) return `<li><i class="fa-solid ${escapeHtml(entry[0])}" aria-hidden="true"></i><span><strong>${escapeHtml(entry[1])}:</strong> ${escapeHtml(entry[2])}</span></li>`;
            return `<li><i class="fa-solid ${escapeHtml(entry[0])}" aria-hidden="true"></i><span>${escapeHtml(entry[1])}</span></li>`;
        }).join('');
    }

    function validateMultiRouteIds(routeIds) {
        if (!Array.isArray(routeIds) || routeIds.length < 3) throw new Error('Add at least one intermediate Trip Stop for a Multi-City route.');
        if (routeIds.length > MAX_ROUTE_DESTINATIONS) throw new Error('Maximum number of trip stops reached.');
        if (routeIds.some(id => !destinations[id])) throw new Error('Choose every place from the supported destination list.');
        if (new Set(routeIds).size !== routeIds.length) throw new Error('This destination is already part of your route.');
        return routeIds;
    }

    function multiCityRecommendedStops(fallback, fromId, toId, minutes, type) {
        let count = minutes < 90 ? 0 : minutes < 240 ? 1 : minutes < 360 ? 2 : 3;
        if (minutes < 120 && ['Hill road', 'Coastal road', 'Backwater connection'].includes(type)) count = 1;
        return routeStops(fallback, fromId, toId).slice(0, count);
    }

    function multiCityRoadNote(type, minutes) {
        if (minutes >= 480) return 'Very long driving leg. Strongly consider an overnight break and avoid major sightseeing after arrival.';
        if (minutes >= 360) return 'Long driving day. Leave early, plan two or more comfort breaks and keep the evening light.';
        if (minutes >= 240) return 'This transfer may feel tiring after sightseeing. Start early and keep a proper meal and rest break.';
        if (type === 'Hill road') return 'Winding and slower road sections are likely near the hill region; travellers prone to motion sickness should prepare.';
        if (type === 'Backwater connection') return 'The final approach can include narrower village, island or jetty roads.';
        if (type === 'Coastal road') return 'Allow a buffer for town and beach traffic, especially on weekends.';
        return 'A generally manageable road leg; allow extra time for traffic and short comfort breaks.';
    }

    function multiCityComfort(legs) {
        const veryLongLegs = legs.filter(leg => leg.route.minutes >= 480).length;
        const longLegs = legs.filter(leg => leg.route.minutes >= 420).length;
        const totalMinutes = legs.reduce((sum, leg) => sum + leg.route.minutes, 0);
        if (veryLongLegs >= 1 || longLegs >= 2 || totalMinutes >= 1500) return 'Very Long Drive';
        if (longLegs >= 1 || totalMinutes >= 900) return 'Long Drive';
        if (totalMinutes <= 300 && legs.every(leg => leg.route.minutes <= 180) && legs.length <= 3) return 'Easy';
        return 'Balanced';
    }

    function multiCityRecommendedDays(routeIds, legs, comfort) {
        const totalMinutes = legs.reduce((sum, leg) => sum + leg.route.minutes, 0);
        let minimum = Math.max(routeIds.length, Math.ceil(totalMinutes / 300) + 1);
        if (legs.some(leg => leg.route.minutes >= 480)) minimum = Math.max(minimum, routeIds.length + 1);
        const maximum = minimum + (comfort === 'Easy' ? 1 : 2);
        return { minimum, maximum, label: `${minimum}-${maximum} days` };
    }

    function multiCityWarnings(legs, comfort) {
        const warnings = [];
        legs.forEach((leg, index) => {
            const name = `${destinations[leg.fromId].name} to ${destinations[leg.toId].name}`;
            if (leg.route.minutes >= 480) warnings.push(`Leg ${index + 1}, ${name}, is a very long drive. Add an overnight break where practical.`);
            else if (leg.route.minutes >= 360) warnings.push(`Leg ${index + 1}, ${name}, is a long driving day. Leave early and avoid major sightseeing after the transfer.`);
        });
        if (comfort === 'Very Long Drive') warnings.push('This complete route is demanding for children and senior travellers. Add rest days and avoid consecutive long transfers.');
        else if (comfort === 'Long Drive') warnings.push('Keep a flexible day after the longest transfer, particularly for families and senior travellers.');
        return warnings;
    }

    function updateMultiCityUrl(routeIds) {
        const url = new URL(window.location.href);
        url.searchParams.delete('from');
        url.searchParams.delete('to');
        url.searchParams.delete('plan');
        url.searchParams.set('mode', 'multi');
        url.searchParams.set('route', routeIds.map(id => destinations[id].name).join(','));
        window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    }

    function updatePointRouteUrl(fromId, toId) {
        const url = new URL(window.location.href);
        url.searchParams.delete('mode');
        url.searchParams.delete('route');
        url.searchParams.set('from', destinations[fromId].name);
        url.searchParams.set('to', destinations[toId].name);
        window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    }

    function renderMultiCityJourney(routeIds, legs, options = {}) {
        const totalDistance = legs.reduce((sum, leg) => sum + leg.route.distance, 0);
        const totalMinutes = legs.reduce((sum, leg) => sum + leg.route.minutes, 0);
        const comfort = multiCityComfort(legs);
        const days = multiCityRecommendedDays(routeIds, legs, comfort);
        const routeNames = routeIds.map(id => destinations[id].name);
        const warnings = multiCityWarnings(legs, comfort);

        elements.multiRouteLine.textContent = routeNames.join('  ->  ');
        elements.multiSummaryDestinations.textContent = `${routeIds.length} destinations`;
        elements.multiSummaryLegs.textContent = `${legs.length} road legs`;
        elements.multiSummaryDistance.textContent = `${totalDistance} km`;
        elements.multiSummaryTime.textContent = formatDuration(totalMinutes);
        elements.multiSummaryDays.textContent = days.label;
        elements.multiSummaryComfort.textContent = comfort;
        elements.multiWarnings.innerHTML = warnings.map(message => `<p><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i><span>${escapeHtml(message)}</span></p>`).join('');
        elements.multiWarnings.hidden = !warnings.length;
        elements.multiLegList.innerHTML = legs.map((leg, index) => {
            const from = destinations[leg.fromId];
            const to = destinations[leg.toId];
            const stops = multiCityRecommendedStops(leg.fallback, leg.fromId, leg.toId, leg.route.minutes, leg.type);
            const stopsMarkup = stops.length
                ? `<ul>${stops.map(stop => `<li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span><strong>${escapeHtml(stop.name)}</strong> - ${escapeHtml(stop.description)}</span></li>`).join('')}</ul>`
                : '<p class="multi-city-no-stop">No planned stop is normally needed on this short leg. Pause if travellers need a comfort break.</p>';
            const lengthClass = leg.route.minutes >= 480 ? ' is-very-long' : leg.route.minutes >= 360 ? ' is-long' : '';
            return `<article class="multi-city-leg-card${lengthClass}"><header><span>Leg ${index + 1}</span><small>${escapeHtml(leg.type)}</small></header><h4>${escapeHtml(from.name)} <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i> ${escapeHtml(to.name)}</h4><div class="multi-city-leg-metrics"><span><i class="fa-solid fa-road" aria-hidden="true"></i><strong>${escapeHtml(`${leg.route.distance} km`)}</strong> Approx. distance</span><span><i class="fa-regular fa-clock" aria-hidden="true"></i><strong>${escapeHtml(formatDuration(leg.route.minutes))}</strong> Approx. drive time</span></div><section><h5>Recommended Stops</h5>${stopsMarkup}</section><p class="multi-city-road-note"><strong>Road Note:</strong> ${escapeHtml(multiCityRoadNote(leg.type, leg.route.minutes))}</p></article>`;
        }).join('');

        elements.popular.hidden = true;
        elements.results.hidden = true;
        elements.multiResults.hidden = false;
        elements.multiResults.classList.remove('is-appearing');
        window.requestAnimationFrame(() => elements.multiResults.classList.add('is-appearing'));
        if (options.updateUrl !== false) updateMultiCityUrl(routeIds);

        return { mode: 'multi', travelMode: 'Cab', routeIds: [...routeIds], routeNames, destinations: routeIds.length, legs: legs.length, distance: totalDistance, minutes: totalMinutes, days, comfort, warnings };
    }

    async function multiCityLeg(fromId, toId, options = {}) {
        const fallback = shortestFallbackRoute(fromId, toId);
        if (!fallback) throw new Error(`A planning route is not available between ${destinations[fromId].name} and ${destinations[toId].name}.`);
        let route;
        try {
            if (options.preferFallback || forceFallbackRouting) throw new Error('Curated fallback requested');
            route = await getRoadRoute(fromId, toId, fallback);
        } catch {
            route = { source: 'fallback', distance: fallback.distance, minutes: fallback.minutes, coordinates: fallback.coordinates };
        }
        return { fromId, toId, route, fallback, type: routeTypeFor(fromId, toId) };
    }

    async function showMultiCityRoute(routeIds, options = {}) {
        const { scroll = true, preferFallback = false, updateUrl = true } = options;
        validateMultiRouteIds(routeIds);
        elements.message.textContent = 'Calculating each road leg for your multi-city cab journey...';
        const legs = await Promise.all(routeIds.slice(0, -1).map((fromId, index) => multiCityLeg(fromId, routeIds[index + 1], { preferFallback })));
        const fallbackCount = legs.filter(leg => leg.route.source === 'fallback').length;
        elements.message.textContent = fallbackCount
            ? `Cab route ready. ${fallbackCount} leg${fallbackCount === 1 ? '' : 's'} use curated approximate road data.`
            : 'Multi-city cab route ready. Times include a planning buffer for Kerala conditions.';
        drawMultiCityRoute(legs, routeIds);
        const summary = renderMultiCityJourney(routeIds, legs, { updateUrl });
        if (scroll) elements.multiResults.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        return summary;
    }

    function multiCityFallbackSummary(routeIds) {
        validateMultiRouteIds(routeIds);
        const legs = routeIds.slice(0, -1).map((fromId, index) => {
            const toId = routeIds[index + 1];
            const fallback = shortestFallbackRoute(fromId, toId);
            if (!fallback) throw new Error('A curated route is unavailable for one of these road legs.');
            return { fromId, toId, route: { source: 'fallback', distance: fallback.distance, minutes: fallback.minutes, coordinates: fallback.coordinates }, fallback, type: routeTypeFor(fromId, toId) };
        });
        const comfort = multiCityComfort(legs);
        return {
            mode: 'multi',
            travelMode: 'Cab',
            routeIds: [...routeIds],
            destinations: routeIds.length,
            legs: legs.length,
            distance: legs.reduce((sum, leg) => sum + leg.route.distance, 0),
            minutes: legs.reduce((sum, leg) => sum + leg.route.minutes, 0),
            days: multiCityRecommendedDays(routeIds, legs, comfort),
            comfort,
            warnings: multiCityWarnings(legs, comfort),
            legDetails: legs.map(leg => ({ fromId: leg.fromId, toId: leg.toId, distance: leg.route.distance, minutes: leg.route.minutes, type: leg.type }))
        };
    }

    function renderJourney(fromId, toId, route, fallback) {
        const from = destinations[fromId];
        const to = destinations[toId];
        const type = routeTypeFor(fromId, toId);
        const recommendation = recommendedMethod(fromId, toId, route.minutes);
        const plan = matchingPlan(fromId, toId);
        const stops = routeStops(fallback, fromId, toId);

        elements.summaryFrom.textContent = from.name;
        elements.summaryTo.textContent = to.name;
        elements.summaryDistance.textContent = `${route.distance} km`;
        elements.summaryTime.textContent = formatDuration(route.minutes);
        elements.summaryMethod.textContent = recommendation.mode;
        elements.summaryMethodIcon.className = `fa-solid ${recommendation.icon}`;
        elements.summaryType.textContent = type;
        elements.journeyHeading.textContent = `${from.name} to ${to.name}`;
        elements.overview.textContent = journeyOverview(fromId, toId, type, fallback);
        elements.routeSource.innerHTML = route.source === 'live'
            ? '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Road geometry via OSRM'
            : '<i class="fa-solid fa-shield" aria-hidden="true"></i> Curated fallback route';

        const showRoadStops = recommendation.mode === 'Car';
        elements.stopsPanel.hidden = !showRoadStops;
        if (showRoadStops) renderStops(stops);
        else elements.stops.innerHTML = '';
        elements.adviceTitle.textContent = `${recommendation.mode} Travel Advice`;
        renderList(elements.advice, travelAdvice(fromId, toId, type, route.distance, route.minutes, recommendation));
        renderTransportComparison(fromId, toId, route, recommendation, stops);

        elements.planTitle.textContent = plan.name;
        elements.planDuration.textContent = plan.duration;
        elements.planPace.textContent = `${plan.pace} pace`;
        elements.planReason.textContent = plan.fromMatch && plan.toMatch
            ? `This itinerary includes both ${from.name} and ${to.name}, making it the closest match for the selected journey.`
            : `This itinerary includes ${plan.fromMatch ? from.name : plan.toMatch ? to.name : 'similar Kerala landscapes'} and follows the closest mix of experiences to this route.`;
        elements.planLink.href = plan.url;

        elements.popular.hidden = true;
        elements.multiResults.hidden = true;
        elements.results.hidden = false;
        elements.results.classList.remove('is-appearing');
        window.requestAnimationFrame(() => elements.results.classList.add('is-appearing'));

        return { from: from.name, to: to.name, distance: route.distance, minutes: route.minutes, type, method: recommendation.mode, recommendation, plan: plan.name, url: plan.url, source: route.source };
    }

    async function showRoute(fromId, toId, options = {}) {
        const { scroll = true, preferFallback = false } = options;
        if (!destinations[fromId] || !destinations[toId]) throw new Error('Choose two supported Kerala destinations.');
        if (fromId === toId) throw new Error('Starting point and destination must be different.');

        const fallback = shortestFallbackRoute(fromId, toId);
        if (!fallback) throw new Error('A planning route is not available for this pair. Try another destination.');

        elements.message.textContent = 'Calculating an approximate road route...';
        let route;
        const previousForceFallback = forceFallbackRouting;
        if (preferFallback) forceFallbackRouting = true;

        try {
            route = await getRoadRoute(fromId, toId, fallback);
            elements.message.textContent = 'Road route ready. Times include a planning buffer for Kerala conditions.';
        } catch {
            route = { source: 'fallback', distance: fallback.distance, minutes: fallback.minutes, coordinates: fallback.coordinates };
            elements.message.textContent = 'Live routing is unavailable, so a curated approximate route is shown.';
        } finally {
            forceFallbackRouting = previousForceFallback;
        }

        drawRoute(route.coordinates, fromId, toId);
        const summary = renderJourney(fromId, toId, route, fallback);
        updatePointRouteUrl(fromId, toId);
        if (scroll) {
            elements.results.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        }
        return summary;
    }

    function refreshMultiStopRows() {
        const rows = [...elements.multiStopList.querySelectorAll('.multi-city-stop-row')];
        rows.forEach((row, index) => {
            const input = row.querySelector('input');
            const label = row.querySelector('label');
            label.textContent = `Stop ${index + 1}`;
            input.setAttribute('aria-label', `Trip Stop ${index + 1}`);
            row.querySelector('[data-stop-action="up"]').disabled = index === 0;
            row.querySelector('[data-stop-action="down"]').disabled = index === rows.length - 1;
            row.querySelector('[data-stop-action="up"]').setAttribute('aria-label', `Move Trip Stop ${index + 1} up`);
            row.querySelector('[data-stop-action="down"]').setAttribute('aria-label', `Move Trip Stop ${index + 1} down`);
            row.querySelector('[data-stop-action="remove"]').setAttribute('aria-label', `Remove Trip Stop ${index + 1}`);
        });
        elements.addStop.disabled = rows.length >= MAX_ROUTE_DESTINATIONS - 2;
    }

    function addMultiStop(value = '') {
        const currentStops = elements.multiStopList.querySelectorAll('.multi-city-stop-row').length;
        if (currentStops >= MAX_ROUTE_DESTINATIONS - 2) {
            elements.message.textContent = 'Maximum number of trip stops reached.';
            return null;
        }
        multiStopCounter += 1;
        const row = document.createElement('div');
        row.className = 'multi-city-stop-row';
        row.innerHTML = `<label for="multi-city-stop-${multiStopCounter}">Stop ${currentStops + 1}</label><div class="route-input-wrap"><i class="fa-solid fa-location-dot" aria-hidden="true"></i><input id="multi-city-stop-${multiStopCounter}" type="search" list="kerala-destinations" placeholder="Choose an intermediate destination" autocomplete="off" value="${escapeHtml(value)}"></div><div class="multi-city-stop-actions"><button type="button" data-stop-action="up" title="Move stop up"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button><button type="button" data-stop-action="down" title="Move stop down"><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button><button type="button" data-stop-action="remove" title="Remove stop"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div>`;
        elements.multiStopList.append(row);
        refreshMultiStopRows();
        return row.querySelector('input');
    }

    function selectedRouteInputs() {
        return [elements.from, ...elements.multiStopList.querySelectorAll('input'), elements.to];
    }

    function rejectDuplicateDestination(changedInput) {
        const selected = selectedRouteInputs()
            .map(input => ({ input, id: findDestinationId(input.value) }))
            .filter(entry => entry.id);
        const duplicate = selected.find((entry, index) => selected.findIndex(candidate => candidate.id === entry.id) !== index);
        if (!duplicate) return false;
        if (changedInput && findDestinationId(changedInput.value) === duplicate.id) changedInput.value = '';
        elements.message.textContent = 'This destination is already part of your route.';
        changedInput?.focus();
        return true;
    }

    function setRouteMode(mode, options = {}) {
        currentRouteMode = mode === 'multi' ? 'multi' : 'point';
        elements.modeInputs.forEach(input => { input.checked = input.value === currentRouteMode; });
        const multiActive = currentRouteMode === 'multi';
        elements.multiBuilder.hidden = !multiActive;
        elements.routeFields.classList.toggle('is-multi', multiActive);
        elements.swap.hidden = multiActive;
        elements.plannerKicker.textContent = multiActive ? 'Multi-City Road Trip' : 'Point-to-Point Journey';
        elements.plannerHeading.textContent = multiActive ? 'Build A Cab Route' : 'Choose Your Route';
        elements.show.innerHTML = multiActive
            ? '<i class="fa-solid fa-taxi" aria-hidden="true"></i> Show Cab Route'
            : '<i class="fa-solid fa-route" aria-hidden="true"></i> Show Route';
        if (multiActive && options.ensureStop !== false && !elements.multiStopList.children.length) addMultiStop();
        if (!options.keepResults) {
            elements.results.hidden = true;
            elements.multiResults.hidden = true;
            elements.popular.hidden = false;
            clearRouteLayers();
            if (map) map.fitBounds(allDestinationBounds, { padding: [34, 34] });
        }
        elements.message.textContent = multiActive
            ? 'Multi-City routes use a cab for every road leg. Add at least one intermediate Trip Stop.'
            : '';
    }

    function populateMultiCityBuilder(routeIds) {
        elements.from.value = destinations[routeIds[0]].name;
        elements.to.value = destinations[routeIds.at(-1)].name;
        elements.multiStopList.innerHTML = '';
        routeIds.slice(1, -1).forEach(id => addMultiStop(destinations[id].name));
        refreshMultiStopRows();
    }

    function readMultiCityRoute() {
        const inputs = selectedRouteInputs();
        const routeIds = [];
        for (const input of inputs) {
            const id = findDestinationId(input.value);
            if (!id) {
                elements.message.textContent = input.value.trim()
                    ? 'Choose every place from the supported destination list.'
                    : 'Complete the origin, every Trip Stop and the final destination.';
                input.focus();
                return null;
            }
            routeIds.push(id);
        }
        if (new Set(routeIds).size !== routeIds.length) {
            elements.message.textContent = 'This destination is already part of your route.';
            return null;
        }
        return routeIds;
    }

    function clearRoute() {
        elements.from.value = '';
        elements.to.value = '';
        elements.message.textContent = '';
        elements.results.hidden = true;
        elements.multiResults.hidden = true;
        elements.results.classList.remove('is-appearing');
        elements.multiResults.classList.remove('is-appearing');
        elements.popular.hidden = false;
        elements.multiStopList.innerHTML = '';
        if (currentRouteMode === 'multi') addMultiStop();
        clearRouteLayers();
        if (map) map.fitBounds(allDestinationBounds, { padding: [34, 34] });
        const url = new URL(window.location.href);
        ['mode', 'route', 'from', 'to', 'plan'].forEach(parameter => url.searchParams.delete(parameter));
        window.history.replaceState({}, '', `${url.pathname}${url.search ? `?${url.searchParams.toString()}` : ''}${url.hash}`);
    }

    function cacheElements() {
        Object.assign(elements, {
            form: document.getElementById('route-planner'),
            from: document.getElementById('route-from'),
            to: document.getElementById('route-to'),
            modeInputs: [...document.querySelectorAll('input[name="route-mode"]')],
            routeFields: document.getElementById('route-fields'),
            plannerKicker: document.getElementById('route-planner-kicker'),
            plannerHeading: document.getElementById('route-planner-heading'),
            swap: document.getElementById('route-swap'),
            show: document.querySelector('#route-planner .route-show'),
            clear: document.getElementById('route-clear'),
            message: document.getElementById('route-message'),
            datalist: document.getElementById('kerala-destinations'),
            multiBuilder: document.getElementById('multi-city-builder'),
            multiStopList: document.getElementById('multi-city-stop-list'),
            addStop: document.getElementById('multi-city-add-stop'),
            mapLoading: document.getElementById('map-loading'),
            mapUnavailable: document.getElementById('map-unavailable'),
            popular: document.getElementById('popular-journeys'),
            results: document.getElementById('journey-results'),
            multiResults: document.getElementById('multi-city-results'),
            multiRouteLine: document.getElementById('multi-city-route-line'),
            multiSummaryDestinations: document.getElementById('multi-summary-destinations'),
            multiSummaryLegs: document.getElementById('multi-summary-legs'),
            multiSummaryDistance: document.getElementById('multi-summary-distance'),
            multiSummaryTime: document.getElementById('multi-summary-time'),
            multiSummaryDays: document.getElementById('multi-summary-days'),
            multiSummaryComfort: document.getElementById('multi-summary-comfort'),
            multiWarnings: document.getElementById('multi-city-warnings'),
            multiLegList: document.getElementById('multi-city-leg-list'),
            routeSource: document.getElementById('route-source'),
            summaryFrom: document.getElementById('summary-from'),
            summaryTo: document.getElementById('summary-to'),
            summaryDistance: document.getElementById('summary-distance'),
            summaryTime: document.getElementById('summary-time'),
            summaryMethod: document.getElementById('summary-method'),
            summaryMethodIcon: document.getElementById('summary-method-icon'),
            summaryType: document.getElementById('summary-type'),
            journeyHeading: document.getElementById('journey-heading'),
            overview: document.getElementById('journey-overview'),
            stopsPanel: document.getElementById('journey-stops-panel'),
            stops: document.getElementById('journey-stops'),
            adviceTitle: document.getElementById('journey-advice-title'),
            advice: document.getElementById('journey-advice'),
            transport: document.getElementById('journey-transport'),
            planTitle: document.getElementById('matching-plan-title'),
            planDuration: document.getElementById('matching-plan-duration'),
            planPace: document.getElementById('matching-plan-pace'),
            planReason: document.getElementById('matching-plan-reason'),
            planLink: document.getElementById('matching-plan-link')
        });
    }

    function bindPlanner() {
        elements.datalist.innerHTML = Object.values(destinations)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(destination => `<option value="${escapeHtml(destination.name)}">${escapeHtml(destination.category)}</option>`)
            .join('');

        const recalculateVisibleMultiRoute = async () => {
            if (currentRouteMode !== 'multi' || elements.multiResults.hidden) return;
            const routeIds = readMultiCityRoute();
            if (!routeIds) {
                elements.multiResults.hidden = true;
                elements.popular.hidden = false;
                return;
            }
            try {
                await showMultiCityRoute(routeIds, { scroll: false });
            } catch (error) {
                elements.message.textContent = error.message;
            }
        };

        elements.form.addEventListener('submit', async event => {
            event.preventDefault();
            if (currentRouteMode === 'multi') {
                const routeIds = readMultiCityRoute();
                if (!routeIds) return;
                try {
                    await showMultiCityRoute(routeIds);
                } catch (error) {
                    elements.message.textContent = error.message;
                }
                return;
            }
            const fromId = findDestinationId(elements.from.value);
            const toId = findDestinationId(elements.to.value);

            if (!fromId || !toId) {
                elements.message.textContent = 'Choose both places from the supported destination list.';
                (!fromId ? elements.from : elements.to).focus();
                return;
            }
            if (fromId === toId) {
                elements.message.textContent = 'Starting point and destination must be different.';
                elements.to.focus();
                return;
            }

            try {
                await showRoute(fromId, toId);
            } catch (error) {
                elements.message.textContent = error.message;
            }
        });

        elements.modeInputs.forEach(input => {
            input.addEventListener('change', () => setRouteMode(input.value));
        });

        elements.addStop.addEventListener('click', () => {
            const input = addMultiStop();
            if (input) {
                elements.message.textContent = `Trip Stop added. ${selectedRouteInputs().length} of ${MAX_ROUTE_DESTINATIONS} possible destinations are in the builder.`;
                elements.multiResults.hidden = true;
                elements.popular.hidden = false;
                input.focus();
            }
        });

        elements.multiStopList.addEventListener('click', async event => {
            const button = event.target.closest('[data-stop-action]');
            if (!button) return;
            const row = button.closest('.multi-city-stop-row');
            if (button.dataset.stopAction === 'remove') {
                row.remove();
                refreshMultiStopRows();
                elements.message.textContent = elements.multiStopList.children.length
                    ? 'Trip Stop removed. Show the route again when every destination is complete.'
                    : 'Add at least one intermediate Trip Stop for a Multi-City route.';
                elements.multiResults.hidden = true;
                elements.popular.hidden = false;
                return;
            }
            if (button.dataset.stopAction === 'up' && row.previousElementSibling) row.parentElement.insertBefore(row, row.previousElementSibling);
            if (button.dataset.stopAction === 'down' && row.nextElementSibling) row.parentElement.insertBefore(row.nextElementSibling, row);
            refreshMultiStopRows();
            elements.message.textContent = 'Trip Stop order changed. Route metrics are being recalculated.';
            await recalculateVisibleMultiRoute();
        });

        elements.multiStopList.addEventListener('change', async event => {
            if (!event.target.matches('input') || rejectDuplicateDestination(event.target)) return;
            await recalculateVisibleMultiRoute();
        });

        elements.swap.addEventListener('click', () => {
            const fromValue = elements.from.value;
            elements.from.value = elements.to.value;
            elements.to.value = fromValue;
            elements.message.textContent = elements.from.value || elements.to.value ? 'Starting point and destination swapped.' : '';
        });

        elements.clear.addEventListener('click', clearRoute);

        [elements.from, elements.to].forEach(input => {
            input.addEventListener('change', async () => {
                if (currentRouteMode === 'multi') {
                    if (!rejectDuplicateDestination(input)) await recalculateVisibleMultiRoute();
                    return;
                }
                const fromId = findDestinationId(elements.from.value);
                const toId = findDestinationId(elements.to.value);
                elements.message.textContent = fromId && toId && fromId === toId ? 'Starting point and destination must be different.' : '';
            });
        });

        document.querySelectorAll('[data-route-from][data-route-to]').forEach(button => {
            button.addEventListener('click', async () => {
                const fromId = button.dataset.routeFrom;
                const toId = button.dataset.routeTo;
                setRouteMode('point', { keepResults: true });
                elements.from.value = destinations[fromId].name;
                elements.to.value = destinations[toId].name;
                try {
                    await showRoute(fromId, toId);
                } catch (error) {
                    elements.message.textContent = error.message;
                }
            });
        });
    }

    async function initialiseFromQuery() {
        const parameters = new URLSearchParams(window.location.search);
        if (parameters.get('mode') === 'multi' && parameters.get('route')) {
            const routeIds = parameters.get('route').split(',').map(value => destinations[value] ? value : findDestinationId(value));
            try {
                validateMultiRouteIds(routeIds);
                setRouteMode('multi', { ensureStop: false, keepResults: true });
                populateMultiCityBuilder(routeIds);
                await showMultiCityRoute(routeIds, { scroll: false, updateUrl: false });
            } catch (error) {
                setRouteMode('multi', { keepResults: true });
                elements.message.textContent = error.message;
            }
            return;
        }
        const fromId = findDestinationId(parameters.get('from'));
        const toId = findDestinationId(parameters.get('to'));
        const requestedPlan = plans.find(plan => plan.id === parameters.get('plan'));

        if (!parameters.has('from') && !parameters.has('to')) return;
        if (!fromId || !toId || fromId === toId) {
            elements.message.textContent = 'The recommended route could not be opened automatically. Choose two supported Kerala destinations below.';
            return;
        }

        elements.from.value = destinations[fromId].name;
        elements.to.value = destinations[toId].name;
        try {
            await showRoute(fromId, toId, { scroll: false });
            if (requestedPlan) elements.message.textContent = `${elements.message.textContent} Opened from the ${requestedPlan.name} recommendation.`;
        } catch (error) {
            elements.message.textContent = error.message;
        }
    }

    function initialise() {
        cacheElements();
        bindPlanner();
        setRouteMode('point', { ensureStop: false, keepResults: true });
        initialiseMap();

        window.KeralaMapPlanner = {
            destinations,
            plans,
            showRoute,
            showMultiCityRoute,
            multiCityFallbackSummary,
            clearRoute,
            findDestinationId,
            shortestFallbackRoute,
            recommendedMethod,
            transportForRoute(fromId, toId) {
                const route = shortestFallbackRoute(fromId, toId);
                if (!route) return null;
                const recommendation = recommendedMethod(fromId, toId, route.minutes);
                return {
                    recommendation,
                    flights: flightOptionsFor(recommendation),
                    trains: trainOptionsFor(recommendation, route.minutes, route.distance),
                    car: { distance: route.distance, minutes: route.minutes }
                };
            },
            setFallbackMode(enabled) { forceFallbackRouting = Boolean(enabled); }
        };
        void initialiseFromQuery();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
    else initialise();
})();
