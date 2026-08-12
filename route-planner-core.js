((root, factory) => {
    const api = factory();
    root.KeralaRouteCore = api;
    if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis, () => {
    'use strict';

    const destinations = {
        kochi: { name: 'Kochi', categoryKey: 'city', coast: true },
        'fort-kochi': { name: 'Fort Kochi', categoryKey: 'city', coast: true },
        kadamakkudy: { name: 'Kadamakkudy', categoryKey: 'water', coast: true },
        munnar: { name: 'Munnar', categoryKey: 'hills', hill: true },
        thekkady: { name: 'Thekkady', categoryKey: 'nature', hill: true },
        alappuzha: { name: 'Alappuzha', categoryKey: 'water', coast: true },
        kumarakom: { name: 'Kumarakom', categoryKey: 'water' },
        'munroe-island': { name: 'Munroe Island', categoryKey: 'water' },
        varkala: { name: 'Varkala', categoryKey: 'beach', coast: true },
        kovalam: { name: 'Kovalam', categoryKey: 'beach', coast: true },
        poovar: { name: 'Poovar', categoryKey: 'water', coast: true },
        thiruvananthapuram: { name: 'Thiruvananthapuram', categoryKey: 'city', coast: true },
        wayanad: { name: 'Wayanad', categoryKey: 'nature', hill: true },
        kozhikode: { name: 'Kozhikode', categoryKey: 'city', coast: true },
        kannur: { name: 'Kannur', categoryKey: 'city', coast: true },
        valiyaparamba: { name: 'Valiyaparamba', categoryKey: 'water', coast: true },
        bekal: { name: 'Bekal', categoryKey: 'beach', coast: true }
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
        kozhikodeBreak: { name: 'Kozhikode meal and rest break', description: 'A practical city break on the long road between Wayanad and central Kerala.', why: 'It provides food, fuel and restrooms before the longer southbound section.', duration: '45-60 min' },
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
        ['kochi', 'wayanad', 270, 390, ['thrissur', 'thamarassery', 'lakkidi']],
        ['wayanad', 'munnar', 360, 540, ['kozhikodeBreak', 'thrissur', 'adimali']],
        ['munnar', 'thekkady', 106, 240, ['lockhart', 'pooppara', 'anakkara']],
        ['thekkady', 'alappuzha', 164, 300, ['kuttikkanam', 'kottayam', 'champakulam']],
        ['thekkady', 'munroe-island', 145, 240, ['kuttikkanam', 'thenmala', 'punalur']],
        ['alappuzha', 'kumarakom', 23, 75, ['champakulam', 'thanneermukkom', 'kumarakomBird']],
        ['alappuzha', 'munroe-island', 75, 120, ['karunagappally', 'sasthamkotta']],
        ['alappuzha', 'varkala', 107, 135, ['kollam', 'paravurLake']],
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

    const graph = {};
    edges.forEach(([from, to, distance, minutes, stops]) => {
        graph[from] ||= [];
        graph[to] ||= [];
        graph[from].push({ to, distance, minutes, stops });
        graph[to].push({ to: from, distance, minutes, stops: [...stops].reverse() });
    });

    const roundToQuarterHour = minutes => Math.max(15, Math.round(minutes / 15) * 15);
    const formatDuration = minutes => {
        const rounded = roundToQuarterHour(minutes);
        const hours = Math.floor(rounded / 60);
        const remaining = rounded % 60;
        if (!hours) return `${remaining} min`;
        if (!remaining) return `${hours} hr`;
        return `${hours} hr ${remaining} min`;
    };

    function pointRoute(fromId, toId) {
        if (!destinations[fromId] || !destinations[toId] || fromId === toId) return null;
        const distance = Object.fromEntries(Object.keys(destinations).map(id => [id, Infinity]));
        const previous = {};
        const visited = new Set();
        distance[fromId] = 0;
        while (visited.size < Object.keys(destinations).length) {
            const current = Object.keys(distance).filter(id => !visited.has(id)).sort((a, b) => distance[a] - distance[b])[0];
            if (!current || !Number.isFinite(distance[current]) || current === toId) break;
            visited.add(current);
            (graph[current] || []).forEach(edge => {
                const candidate = distance[current] + edge.minutes;
                if (candidate < distance[edge.to]) {
                    distance[edge.to] = candidate;
                    previous[edge.to] = { from: current, edge };
                }
            });
        }
        if (!previous[toId]) return null;
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
        return {
            path,
            edges: routeEdges,
            distance: routeEdges.reduce((sum, edge) => sum + edge.distance, 0),
            minutes: routeEdges.reduce((sum, edge) => sum + edge.minutes, 0),
            stopIds: routeEdges.flatMap(edge => edge.stops)
        };
    }

    function recommendedStops(route) {
        if (!route) return [];
        const direct = [...new Set(route.stopIds)].filter(id => stopLibrary[id]);
        const pathStops = route.path.slice(1, -1).map(id => ({
            name: destinations[id].name,
            description: `A practical intermediate break at ${destinations[id].name}.`,
            why: 'It divides a long road journey into more manageable sections.',
            duration: '45-90 min'
        }));
        if (route.distance >= 300 && pathStops.length) {
            const positions = pathStops.length <= 3
                ? pathStops.map((_, index) => index)
                : [0.25, 0.5, 0.75].map(ratio => Math.min(pathStops.length - 1, Math.round((pathStops.length - 1) * ratio)));
            return [...new Set(positions)].map(index => pathStops[index]).slice(0, 3);
        }
        return direct.slice(0, 3).map(id => stopLibrary[id]);
    }

    const distanceBetweenCoordinates = (first, second) => {
        const radians = degrees => degrees * Math.PI / 180;
        const latitudeDelta = radians(second[0] - first[0]);
        const longitudeDelta = radians(second[1] - first[1]);
        const firstLatitude = radians(first[0]);
        const secondLatitude = radians(second[0]);
        const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(firstLatitude) * Math.cos(secondLatitude) * Math.sin(longitudeDelta / 2) ** 2;
        return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    };

    function railConnection(fromId, toId, roadMinutes) {
        const from = transportAccess[fromId];
        const to = transportAccess[toId];
        const maximumTransfer = roadMinutes > 300 ? 180 : 90;
        const available = Boolean(from?.rail && to?.rail && from.railTransfer <= maximumTransfer && to.railTransfer <= maximumTransfer);
        return { available, requiresRoadTransfer: available && (from.railTransfer > 30 || to.railTransfer > 30), fromStation: from?.rail, toStation: to?.rail, transferMinutes: (from?.railTransfer || 0) + (to?.railTransfer || 0) };
    }

    function flightConnection(fromId, toId, roadMinutes, rail) {
        const from = transportAccess[fromId];
        const to = transportAccess[toId];
        const fromAirport = airports[from?.airport];
        const toAirport = airports[to?.airport];
        if (!fromAirport || !toAirport || from.airport === to.airport) return { available: false, reason: 'same-airport-region', fromAirport, toAirport };
        const airportDistance = distanceBetweenCoordinates(fromAirport.coordinates, toAirport.coordinates);
        if (airportDistance < 160) return { available: false, reason: 'airports-too-close', fromAirport, toAirport };
        if (rail.available && roadMinutes <= 450) return { available: false, reason: 'rail-more-direct', fromAirport, toAirport };
        return { available: true, fromCode: from.airport, toCode: to.airport, fromAirport, toAirport, airportDistance, requiresRoadTransfer: from.airportTransfer > 30 || to.airportTransfer > 30, transferMinutes: from.airportTransfer + to.airportTransfer };
    }

    const estimatedRailMinutes = (roadMinutes, rail) => roundToQuarterHour(Math.max(75, roadMinutes * 0.72) + rail.transferMinutes);
    const estimatedFlightMinutes = flight => roundToQuarterHour(flight.transferMinutes + 150 + Math.max(60, Math.round(flight.airportDistance / 7.2)));

    function recommendMode(fromId, toId, roadMinutes) {
        const rail = railConnection(fromId, toId, roadMinutes);
        const flight = flightConnection(fromId, toId, roadMinutes, rail);
        const remoteRoadRoute = [fromId, toId].every(id => transportAccess[id]?.railTransfer >= 150 && transportAccess[id]?.airportTransfer >= 150);
        let carScore = roadMinutes <= 150 ? 100 : roadMinutes <= 240 ? 84 : roadMinutes <= 360 ? 66 : roadMinutes <= 480 ? 48 : roadMinutes <= 720 ? 30 : 10;
        if (remoteRoadRoute) carScore += 22;
        const candidates = [{ mode: 'Car', icon: 'fa-car-side', score: carScore, approximateMinutes: roadMinutes, reason: roadMinutes <= 240 ? 'Best for this short or remote route and offers the most flexibility.' : 'Road travel remains most practical because rail and airport transfers add a major detour.' }];
        if (rail.available) {
            const railMinutes = estimatedRailMinutes(roadMinutes, rail);
            let score = 68 + Math.min(26, Math.max(0, roadMinutes - 180) / 12) - rail.transferMinutes / 20;
            if (rail.transferMinutes <= 60) score += 10;
            if (roadMinutes < 150) score -= 38;
            candidates.push({ mode: 'Train', icon: 'fa-train', score, approximateMinutes: railMinutes, reason: rail.requiresRoadTransfer ? `Rail reduces sustained road travel. Use ${rail.fromStation} and ${rail.toStation}, with local road transfers.` : 'A practical rail connection offers comfort without airport overhead.' });
        }
        if (flight.available) {
            const flightMinutes = estimatedFlightMinutes(flight);
            const timeSaved = roadMinutes - flightMinutes;
            let score = 55 + timeSaved / 8 - flight.transferMinutes / 25;
            if (roadMinutes >= 600) score += 16;
            if (timeSaved < 120) score -= 35;
            candidates.push({ mode: 'Flight', icon: 'fa-plane-departure', score, approximateMinutes: flightMinutes, reason: `Flying meaningfully reduces this long journey. Use ${flight.fromAirport.name} and ${flight.toAirport.name}, with road transfers where required.` });
        }
        return { ...candidates.sort((a, b) => b.score - a.score)[0], rail, flight };
    }

    function pointSummary(fromId, toId) {
        const route = pointRoute(fromId, toId);
        if (!route) return null;
        const recommendation = recommendMode(fromId, toId, route.minutes);
        return { mode: 'point', fromId, toId, route, recommendation, stops: recommendedStops(route) };
    }

    function routeType(fromId, toId) {
        const pair = [destinations[fromId], destinations[toId]];
        if (pair.some(destination => destination.hill || ['hills', 'nature'].includes(destination.categoryKey))) return 'Hill road';
        if (pair.every(destination => destination.categoryKey === 'city') && pair.every(destination => !destination.coast)) return 'City route';
        if (pair.some(destination => destination.categoryKey === 'water')) return 'Backwater connection';
        if (pair.some(destination => destination.coast || destination.categoryKey === 'beach')) return 'Coastal road';
        return 'City route';
    }

    function routeComfort(legs) {
        const veryLong = legs.filter(leg => leg.route.minutes >= 480).length;
        const long = legs.filter(leg => leg.route.minutes >= 420).length;
        const total = legs.reduce((sum, leg) => sum + leg.route.minutes, 0);
        if (veryLong >= 1 || long >= 2 || total >= 1500) return 'Very Long Drive';
        if (long >= 1 || total >= 900) return 'Long Drive';
        if (total <= 300 && legs.every(leg => leg.route.minutes <= 180) && legs.length <= 3) return 'Easy';
        return 'Balanced';
    }

    function multiSummary(routeIds) {
        const valid = [...routeIds];
        if (valid.length < 3 || valid.some(id => !destinations[id]) || new Set(valid).size !== valid.length) return null;
        const legs = valid.slice(0, -1).map((fromId, index) => {
            const toId = valid[index + 1];
            const route = pointRoute(fromId, toId);
            if (!route) return null;
            const type = routeType(fromId, toId);
            let count = route.minutes < 90 ? 0 : route.minutes < 240 ? 1 : route.minutes < 360 ? 2 : 3;
            if (route.minutes < 120 && ['Hill road', 'Coastal road', 'Backwater connection'].includes(type)) count = 1;
            return { fromId, toId, route, type, stops: recommendedStops(route).slice(0, count) };
        });
        if (legs.some(leg => !leg)) return null;
        const distance = legs.reduce((sum, leg) => sum + leg.route.distance, 0);
        const minutes = legs.reduce((sum, leg) => sum + leg.route.minutes, 0);
        const comfort = routeComfort(legs);
        const longestLeg = [...legs].sort((a, b) => b.route.minutes - a.route.minutes || b.route.distance - a.route.distance)[0];
        let minimumDays = Math.max(valid.length, Math.ceil(minutes / 300) + 1);
        if (legs.some(leg => leg.route.minutes >= 480)) minimumDays = Math.max(minimumDays, valid.length + 1);
        const maximumDays = minimumDays + (comfort === 'Easy' ? 1 : 2);
        const warnings = [];
        legs.forEach((leg, index) => {
            const name = `${destinations[leg.fromId].name} to ${destinations[leg.toId].name}`;
            if (leg.route.minutes >= 480) warnings.push(`Leg ${index + 1}, ${name}, is a very long drive. Add an overnight break where practical.`);
            else if (leg.route.minutes >= 360) warnings.push(`Leg ${index + 1}, ${name}, is a long driving day. Leave early and avoid major sightseeing after the transfer.`);
        });
        if (comfort === 'Very Long Drive') warnings.push('This route is demanding for children and senior travellers; add rest days and avoid consecutive long transfers.');
        else if (comfort === 'Long Drive') warnings.push('Keep a flexible day after the longest transfer, especially for families and senior travellers.');
        return { mode: 'multi', travelMode: 'Cab', routeIds: valid, destinations: valid.length, roadLegs: legs.length, distance, minutes, comfort, days: { minimum: minimumDays, maximum: maximumDays, label: `${minimumDays}-${maximumDays} days` }, warnings, legs, longestLeg };
    }

    return { destinations, airports, transportAccess, stopLibrary, edges, graph, formatDuration, pointRoute, recommendedStops, railConnection, flightConnection, recommendMode, pointSummary, routeType, routeComfort, multiSummary };
});
