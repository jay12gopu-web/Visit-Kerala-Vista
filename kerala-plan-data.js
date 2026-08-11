(function initialiseKeralaPlanData(factory) {
    'use strict';

    const root = typeof window !== 'undefined' ? window : globalThis;
    const data = factory();
    root.KeralaPlanData = data;
    if (typeof module === 'object' && module.exports) module.exports = data;
})(() => {
    'use strict';

    const attractions = {
        padmanabhaswamy: {
            id: 'padmanabhaswamy',
            name: 'Sree Padmanabhaswamy Temple',
            destination: 'thiruvananthapuram',
            planIds: ['seven-day', 'ten-day', 'senior'],
            planDays: { 'seven-day': 7, 'ten-day': 6, senior: 5 },
            summary: "One of Thiruvananthapuram's most important heritage and religious landmarks, set within the historic East Fort area.",
            entryNote: 'Entry is restricted to Hindus and a strict traditional dress code applies.',
            timingNote: 'Visitors should verify current entry rules and worship timings before visiting because arrangements can change during festivals and special occasions.',
            accessibilityNote: 'Senior visitors should confirm current queue arrangements, walking requirements, step-free access, seating, toilets and vehicle drop-off before visiting.',
            alternative: {
                name: 'Kuthiramalika Palace',
                summary: 'Visitors who cannot or prefer not to enter the temple can use this time for nearby Thiruvananthapuram heritage sightseeing at Kuthiramalika Palace when open.'
            },
            officialSource: 'https://www.keralatourism.org/destination/padmanabha-swamy-temple-thiruvananthapuram/13'
        }
    };

    const plans = [
        {
            id: 'three-day',
            name: '3-Day Kochi + Backwaters',
            days: 3,
            page: 'plan-3-days.html',
            budgetPlanId: 'three-day',
            route: ['kochi', 'alappuzha'],
            returnTo: 'kochi',
            pace: 'relaxed',
            driveLoad: 'light',
            interests: ['culture', 'heritage', 'backwaters', 'houseboat'],
            audiences: ['family', 'couple', 'solo', 'senior', 'first-time'],
            bestFor: ['short holidays', 'first-time Kerala visitors', 'families wanting a simple route'],
            highlights: ['Fort Kochi', 'Mattancherry', 'optional Kathakali', 'Alappuzha backwaters'],
            experiences: ['heritage walk', 'cultural evening', 'overnight houseboat', 'backwater cruise'],
            waterExperience: 'overnight houseboat',
            overnightBases: [
                { destination: 'kochi', nights: 1, type: 'hotel' },
                { destination: 'alappuzha', nights: 1, type: 'houseboat' }
            ],
            dayByDay: [
                { days: [1], label: 'Day 1', title: 'Arrive in Kochi', destinations: ['kochi'], overnight: 'kochi', summary: "Settle in and explore Fort Kochi's colonial lanes, the Chinese fishing nets, St. Francis Church and Mattancherry; add Kathakali if timings allow." },
                { days: [2], label: 'Day 2', title: 'Alappuzha Houseboat', destinations: ['alappuzha'], overnight: 'alappuzha', summary: 'Drive to Alappuzha, board a traditional-style houseboat and cruise past canals, paddy fields and village scenery before dinner and an overnight stay on the water.' },
                { days: [3], label: 'Day 3', title: 'Breakfast on the Water', destinations: ['alappuzha', 'kochi'], overnight: null, summary: 'Enjoy a morning backwater cruise, disembark and return to Kochi for optional spice or craft shopping before departure.' }
            ],
            includes: ['Fort Kochi', 'Mattancherry', 'optional Kathakali', 'Alappuzha', 'overnight houseboat'],
            excludes: ['hills', 'wildlife stay', 'beach stay'],
            transportNotes: 'A short central-Kerala route with one main intercity transfer and a return to Kochi for departure.',
            stayNotes: 'One Kochi hotel night followed by one night aboard the Alappuzha houseboat.'
        },
        {
            id: 'five-day',
            name: '5-Day Hills + Houseboat',
            days: 5,
            page: 'plan-5-days.html',
            budgetPlanId: 'five-day',
            route: ['kochi', 'munnar', 'thekkady', 'alappuzha'],
            returnTo: 'kochi',
            pace: 'balanced',
            driveLoad: 'moderate',
            interests: ['culture', 'heritage', 'hills', 'wildlife', 'spices', 'backwaters', 'houseboat'],
            audiences: ['family', 'couple', 'solo', 'first-time'],
            bestFor: ['first-time Kerala visitors', 'families wanting the classic circuit', 'travellers wanting hills and backwaters'],
            highlights: ['Fort Kochi', 'Munnar tea country', 'Thekkady and Periyar', 'Alappuzha houseboat'],
            experiences: ['heritage walk', 'tea estates', 'viewpoints and waterfalls', 'spice or nature activity', 'overnight houseboat'],
            waterExperience: 'overnight houseboat',
            overnightBases: [
                { destination: 'kochi', nights: 1, type: 'hotel' },
                { destination: 'munnar', nights: 1, type: 'hotel' },
                { destination: 'thekkady', nights: 1, type: 'hotel' },
                { destination: 'alappuzha', nights: 1, type: 'houseboat' }
            ],
            dayByDay: [
                { days: [1], label: 'Day 1', title: 'Kochi Arrival', destinations: ['kochi'], overnight: 'kochi', summary: 'Arrive in Kochi and keep the day light with a Fort Kochi or Mattancherry heritage walk.' },
                { days: [2], label: 'Day 2', title: "Into Munnar's Tea Country", destinations: ['kochi', 'munnar'], overnight: 'munnar', summary: 'Drive uphill to Munnar, using viewpoints and waterfalls as timing allows, then settle among the tea estates.' },
                { days: [3], label: 'Day 3', title: 'Munnar to Thekkady', destinations: ['munnar', 'thekkady'], overnight: 'thekkady', summary: 'Continue to the Periyar-Thekkady region for spice country and one guided plantation or nature activity.' },
                { days: [4], label: 'Day 4', title: 'Alappuzha by Houseboat', destinations: ['thekkady', 'alappuzha'], overnight: 'alappuzha', summary: 'Travel to Alappuzha, board a houseboat and spend the afternoon, sunset, dinner and night on the backwaters.' },
                { days: [5], label: 'Day 5', title: 'Back to Kochi', destinations: ['alappuzha', 'kochi'], overnight: null, summary: 'Finish the morning cruise, return to Kochi and add a craft or spice stop only if departure timing is comfortable.' }
            ],
            includes: ['Kochi', 'Munnar', 'Thekkady', 'Periyar region', 'Alappuzha', 'overnight houseboat'],
            excludes: ['beach stay', 'north Kerala', 'offbeat island stay'],
            transportNotes: 'A classic loop with a hill transfer on Days 2 and 3, a longer descent to Alappuzha on Day 4 and a return to Kochi on Day 5.',
            stayNotes: 'Four overnight bases: Kochi, Munnar, Thekkady and the Alappuzha houseboat.'
        },
        {
            id: 'seven-day',
            name: '7-Day Classic + Offbeat Kerala',
            days: 7,
            page: 'plan-7-days.html',
            budgetPlanId: 'seven-day',
            route: ['kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'varkala', 'thiruvananthapuram'],
            arrivalAt: 'kochi',
            departureFrom: 'thiruvananthapuram',
            pace: 'balanced',
            driveLoad: 'moderate',
            interests: ['culture', 'heritage', 'hills', 'wildlife', 'spices', 'backwaters', 'canoe', 'offbeat', 'beaches', 'wellness'],
            audiences: ['family', 'couple', 'solo', 'students', 'first-time'],
            bestFor: ['a first full Kerala trip', 'travellers wanting famous and offbeat places', 'hills, backwaters and beach in one week'],
            highlights: ['Fort Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'Varkala', 'Sree Padmanabhaswamy Temple'],
            experiences: ['heritage', 'island villages', 'tea country', 'spice country', 'small-canal canoe', 'Varkala coast', 'Thiruvananthapuram temple and palace heritage'],
            waterExperience: 'Munroe Island canoe experience',
            overnightBases: [
                { destination: 'kochi', nights: 2, type: 'hotel' },
                { destination: 'munnar', nights: 2, type: 'hotel' },
                { destination: 'thekkady', nights: 1, type: 'hotel' },
                { destination: 'munroe-island', nights: 1, type: 'homestay' }
            ],
            dayByDay: [
                { days: [1, 2], label: 'Days 1-2', title: 'Kochi + Kadamakkudy Islands', destinations: ['kochi', 'kadamakkudy'], overnight: 'kochi', summary: "Day 1 settles into Fort Kochi. Day 2 visits Kadamakkudy's island roads and wetlands, then returns for Mattancherry and a Kathakali evening.", perDay: { 1: 'Settle into Fort Kochi and explore its heritage waterfront.', 2: 'Visit Kadamakkudy, then return for Mattancherry and a Kathakali evening.' } },
                { days: [3, 4], label: 'Days 3-4', title: 'Munnar: Tea and Mist', destinations: ['munnar'], overnight: 'munnar', summary: 'These two Munnar days use flexible tea-estate walks, viewpoints, waterfalls and sunrise lookouts; the published page does not assign each activity to one exact day.' },
                { days: [5], label: 'Day 5', title: 'Thekkady: Spice Country', destinations: ['thekkady'], overnight: 'thekkady', summary: 'Travel to Thekkady for the Periyar area, one gentle outdoor activity and an optional spice garden or cooking experience.' },
                { days: [6], label: 'Day 6', title: 'Munroe Island: Small-Canal Kerala', destinations: ['munroe-island'], overnight: 'munroe-island', summary: 'Stay at a village homestay and take a small canoe through narrow palm-lined canals and the Ashtamudi backwaters.' },
                { days: [7], label: 'Day 7', title: 'Varkala + Thiruvananthapuram Heritage Finish', destinations: ['varkala', 'thiruvananthapuram'], overnight: null, summary: 'Leave Munroe Island early for a concise Varkala cliff stop, then continue to Thiruvananthapuram for Sree Padmanabhaswamy Temple when current entry rules and timings allow. Visitors who cannot or prefer not to enter can visit nearby Kuthiramalika Palace when open before a suitably late departure.' }
            ],
            includes: ['Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'canoe experience', 'Varkala', 'Thiruvananthapuram', 'Sree Padmanabhaswamy Temple'],
            excludes: ['Alappuzha', 'overnight houseboat', 'Wayanad'],
            transportNotes: 'A south-Kerala route with several base changes. Munroe Island replaces the busier Alappuzha houseboat corridor; Day 7 continues from a concise Varkala stop to Thiruvananthapuram for the heritage finish and departure.',
            stayNotes: 'Kochi and Munnar are the two-night bases, followed by one night each in Thekkady and Munroe Island.'
        },
        {
            id: 'ten-day',
            name: '10-Day Kerala Deep Dive',
            days: 10,
            page: 'plan-10-days.html',
            budgetPlanId: 'ten-day',
            route: ['kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'thiruvananthapuram', 'wayanad', 'valiyaparamba', 'bekal'],
            arrivalAt: 'kochi',
            departureFrom: 'bekal',
            pace: 'active',
            driveLoad: 'high',
            interests: ['culture', 'heritage', 'hills', 'wildlife', 'spices', 'backwaters', 'canoe', 'offbeat', 'beaches', 'food'],
            audiences: ['family', 'couple', 'solo', 'students'],
            bestFor: ['active offbeat explorers', 'travellers comfortable with major transfers', 'a north-and-south Kerala overview'],
            highlights: ['Fort Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'Sree Padmanabhaswamy Temple', 'Wayanad', 'Valiyaparamba', 'Bekal'],
            experiences: ['heritage and food', 'island villages', 'tea country', 'spice and nature activity', 'canoe', 'Thiruvananthapuram temple and palace heritage', 'forests and falls', 'north Kerala backwaters', 'Bekal coast'],
            waterExperience: 'canoe and day-cruise experiences',
            overnightBases: [
                { destination: 'kochi', nights: 2, type: 'hotel' },
                { destination: 'munnar', nights: 1, type: 'hotel' },
                { destination: 'thekkady', nights: 1, type: 'hotel' },
                { destination: 'munroe-island', nights: 1, type: 'homestay' },
                { destination: 'wayanad', nights: 2, type: 'hotel or nature stay' },
                { destination: 'bekal', nights: 1, type: 'hotel or resort' }
            ],
            travelNights: [
                { afterDay: 6, nights: 1, type: 'overnight northbound rail journey', summary: 'Use a currently verified overnight rail connection from Thiruvananthapuram towards Kozhikode, followed by the road transfer to Wayanad.' }
            ],
            nonRoadTransfers: [
                { from: 'thiruvananthapuram', to: 'wayanad', mode: 'overnight rail and road', summary: 'Use a currently verified overnight rail connection towards Kozhikode, then continue by road to Wayanad.' }
            ],
            dayByDay: [
                { days: [1, 2], label: 'Days 1-2', title: 'Kochi + Kadamakkudy Islands', destinations: ['kochi', 'kadamakkudy'], overnight: 'kochi', summary: 'Open with Fort Kochi heritage and food, then visit Kadamakkudy at sunrise before returning for Mattancherry and an evening performance.' },
                { days: [3], label: 'Day 3', title: 'Munnar High Country', destinations: ['munnar'], overnight: 'munnar', summary: 'Travel from Kochi into Munnar, keeping stops selective so there is time for a tea-country viewpoint and a restful hill evening.' },
                { days: [4], label: 'Day 4', title: 'Thekkady and Spices', destinations: ['munnar', 'thekkady'], overnight: 'thekkady', summary: 'Use the Munnar morning for one compact tea-country experience, then continue to the Periyar region for spice country and a light evening.' },
                { days: [5], label: 'Day 5', title: 'Munroe Island Canoe Country', destinations: ['thekkady', 'munroe-island'], overnight: 'munroe-island', summary: 'Travel south with a proper comfort stop, then explore Munroe Island by small canoe and settle into a village homestay.' },
                { days: [6], label: 'Day 6', title: 'Thiruvananthapuram Heritage + Northbound Rail', destinations: ['munroe-island', 'thiruvananthapuram'], overnight: null, summary: 'Continue to Thiruvananthapuram for Sree Padmanabhaswamy Temple when current rules and timings allow, or nearby Kuthiramalika Palace for visitors who cannot enter. Keep meal and rest time before a currently verified overnight rail connection towards Kozhikode.' },
                { days: [7, 8], label: 'Days 7-8', title: 'Wayanad: Forests and Falls', destinations: ['wayanad'], overnight: 'wayanad', summary: 'Continue from the northbound rail arrival to Wayanad by road, keep Day 7 light, then use Day 8 for one compact forest, plantation, waterfall or cave circuit.' },
                { days: [9, 10], label: 'Days 9-10', title: 'Valiyaparamba Islands + Bekal', destinations: ['valiyaparamba', 'bekal'], overnight: 'bekal', summary: 'Finish with Valiyaparamba island backwaters, Malabar food and a final coastal evening near Bekal Fort before departure.' }
            ],
            includes: ['Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'Thiruvananthapuram', 'Sree Padmanabhaswamy Temple', 'Wayanad', 'Valiyaparamba', 'Bekal'],
            excludes: ['overnight houseboat', 'relaxed pace', 'few hotel changes'],
            transportNotes: 'This remains the most demanding published route, but it avoids a giant Thiruvananthapuram-to-Wayanad cab day. Use a currently verified overnight rail connection towards Kozhikode after Day 6, then continue by road to Wayanad. The interactive multi-city map still displays road-planning metrics for the full route.',
            stayNotes: 'Six accommodation bases across south, central and north Kerala, plus one overnight inter-regional rail journey. Confirm the rail service before fixing non-refundable stays.'
        },
        {
            id: 'student',
            name: '5-Day Kerala Student Plan',
            days: 5,
            page: 'plan-5-days-students.html',
            budgetPlanId: 'student',
            route: ['kochi', 'munnar', 'alappuzha'],
            returnTo: 'kochi',
            pace: 'active',
            driveLoad: 'moderate',
            interests: ['culture', 'food', 'hills', 'backwaters', 'beaches'],
            audiences: ['students', 'friends'],
            bestFor: ['college groups', 'groups of roughly 4-8 friends', 'active value-conscious travel'],
            highlights: ['Kochi culture and food', 'Munnar viewpoints', 'Alappuzha backwaters and beach'],
            experiences: ['local transport', 'shared group vehicle', 'tea country', 'shikara or canoe', 'beach sunset'],
            waterExperience: 'shared shikara, canoe or local backwater trip',
            overnightBases: [
                { destination: 'kochi', nights: 1, type: 'budget hotel or eligible hostel' },
                { destination: 'munnar', nights: 2, type: 'budget stay or eligible hostel' },
                { destination: 'alappuzha', nights: 1, type: 'budget stay or eligible hostel' }
            ],
            dayByDay: [
                { days: [1], label: 'Day 1', title: 'Kochi Culture + Food', destinations: ['kochi'], overnight: 'kochi', summary: 'Use ferry or local transport for Fort Kochi, combining heritage streets, waterfront views, cafes and a pre-booked cultural show.' },
                { days: [2], label: 'Day 2', title: 'Road Trip to Munnar', destinations: ['kochi', 'munnar'], overnight: 'munnar', summary: 'Leave early in a shared cab or group vehicle, use one or two waterfall or viewpoint stops and check into a budget stay.' },
                { days: [3], label: 'Day 3', title: 'Munnar Viewpoints + Tea', destinations: ['munnar'], overnight: 'munnar', summary: 'Choose a compact weather-aware circuit of tea gardens, a museum or plantation experience, viewpoints and one short nature walk.' },
                { days: [4], label: 'Day 4', title: 'Backwaters + Alappuzha Beach', destinations: ['munnar', 'alappuzha'], overnight: 'alappuzha', summary: 'Travel to Alappuzha for a shared shikara, canoe or local backwater trip, then keep sunset free near the beach.' },
                { days: [5], label: 'Day 5', title: 'Local Morning + Kochi Return', destinations: ['alappuzha', 'kochi'], overnight: null, summary: 'Start near the beach or canals, then return to Kochi by a currently verified train, bus or shared vehicle.' }
            ],
            includes: ['Kochi', 'Munnar', 'Alappuzha', 'shared backwater experience', 'budget-oriented stays and transport'],
            excludes: ['Thekkady', 'overnight houseboat', 'premium stay assumption'],
            transportNotes: 'Shared transport and fewer route bases help control group costs; current train, bus and hostel rules still need verification.',
            stayNotes: 'Hostels are optional, not guaranteed. Some accept only guests aged 18 or above or limit group size; school groups and minors need supervised accommodation confirmed directly.'
        },
        {
            id: 'senior',
            name: '5-Day Easy-Paced Senior Plan',
            days: 5,
            page: 'plan-5-days-seniors.html',
            budgetPlanId: 'senior',
            route: ['kochi', 'kumarakom', 'thiruvananthapuram'],
            arrivalAt: 'kochi',
            departureFrom: 'thiruvananthapuram',
            pace: 'relaxed',
            driveLoad: 'moderate',
            interests: ['culture', 'heritage', 'backwaters', 'wellness', 'relaxed'],
            audiences: ['senior', 'couple', 'family'],
            bestFor: ['senior travellers', 'multigenerational families needing protected rest time', 'travellers wanting backwaters and a light temple day'],
            highlights: ['restful Kochi arrival', 'short Kochi heritage visit', 'Kumarakom', 'covered daytime cruise', 'Sree Padmanabhaswamy Temple'],
            experiences: ['short heritage stops', 'rest time', 'Vembanad Lake', 'daytime motorboat or shikara cruise', 'Thiruvananthapuram temple and palace heritage'],
            waterExperience: 'covered daytime cruise',
            overnightBases: [
                { destination: 'kochi', nights: 1, type: 'hotel' },
                { destination: 'kumarakom', nights: 2, type: 'hotel or backwater resort' },
                { destination: 'thiruvananthapuram', nights: 1, type: 'hotel' }
            ],
            dayByDay: [
                { days: [1], label: 'Day 1', title: 'Kochi Arrival + Rest', destinations: ['kochi'], overnight: 'kochi', summary: 'Use a pre-booked transfer, settle into the hotel and keep the day free except for an optional short sunset drive or early dinner.' },
                { days: [2], label: 'Day 2', title: 'Easy Kochi Heritage + Kumarakom', destinations: ['kochi', 'kumarakom'], overnight: 'kumarakom', summary: 'Choose one or two short Fort Kochi stops after breakfast, have a seated lunch, then use a private road transfer to Kumarakom and rest after check-in.' },
                { days: [3], label: 'Day 3', title: 'Slow Vembanad Backwaters', destinations: ['kumarakom'], overnight: 'kumarakom', summary: 'Take a two-hour covered motorboat or shikara cruise after confirming easy boarding, then return for lunch and a quiet resort afternoon.' },
                { days: [4], label: 'Day 4', title: 'Kumarakom to Thiruvananthapuram', destinations: ['kumarakom', 'thiruvananthapuram'], overnight: 'thiruvananthapuram', summary: 'Use a private daytime transfer with planned comfort and meal stops, then check in and leave the evening entirely free for rest.' },
                { days: [5], label: 'Day 5', title: 'Light Temple Visit + Departure', destinations: ['thiruvananthapuram'], overnight: null, summary: 'After a relaxed breakfast, visit Sree Padmanabhaswamy Temple when current entry rules and timings allow. Visitors who cannot or prefer not to enter can use the same light heritage window for nearby Kuthiramalika Palace when open, followed by lunch, rest and a generous departure buffer.' }
            ],
            includes: ['Kochi', 'Kumarakom', 'Thiruvananthapuram', 'Sree Padmanabhaswamy Temple', 'three overnight bases', 'private transfers', 'daytime backwater cruise', 'protected rest time'],
            excludes: ['Munnar', 'Thekkady', 'overnight houseboat', 'fast pace'],
            transportNotes: 'Kochi remains the arrival gateway. Day 4 is the longest road transfer and should use a private vehicle with planned comfort and meal stops; departure is from Thiruvananthapuram.',
            stayNotes: 'One night in Kochi, two in Kumarakom and one in Thiruvananthapuram. Confirm lift access, step-free rooms, bathroom supports, walking distances, vehicle drop-off and boat boarding directly with providers.'
        }
    ];

    const byId = Object.fromEntries(plans.map(plan => [plan.id, plan]));

    return Object.freeze({
        plans: Object.freeze(plans),
        byId: Object.freeze(byId),
        attractions: Object.freeze(attractions),
        find(id) {
            return byId[id] || null;
        }
    });
});
