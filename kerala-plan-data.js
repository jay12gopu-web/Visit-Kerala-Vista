(function initialiseKeralaPlanData(factory) {
    'use strict';

    const root = typeof window !== 'undefined' ? window : globalThis;
    const data = factory();
    root.KeralaPlanData = data;
    if (typeof module === 'object' && module.exports) module.exports = data;
})(() => {
    'use strict';

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
            route: ['kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'varkala'],
            departureFrom: 'thiruvananthapuram',
            pace: 'balanced',
            driveLoad: 'moderate',
            interests: ['culture', 'heritage', 'hills', 'wildlife', 'spices', 'backwaters', 'canoe', 'offbeat', 'beaches', 'wellness'],
            audiences: ['family', 'couple', 'solo', 'students', 'first-time'],
            bestFor: ['a first full Kerala trip', 'travellers wanting famous and offbeat places', 'hills, backwaters and beach in one week'],
            highlights: ['Fort Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'Varkala'],
            experiences: ['heritage', 'island villages', 'tea country', 'spice country', 'small-canal canoe', 'beach and optional wellness'],
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
                { days: [7], label: 'Day 7', title: 'Varkala Cliff + Beach Finish', destinations: ['varkala', 'thiruvananthapuram'], overnight: null, summary: 'Continue to Varkala for the cliff path, beach or an optional wellness session, then travel to Thiruvananthapuram for departure.' }
            ],
            includes: ['Kochi', 'Kadamakkudy', 'Munnar', 'Thekkady', 'Munroe Island', 'canoe experience', 'Varkala beach'],
            excludes: ['Alappuzha', 'overnight houseboat', 'Wayanad'],
            transportNotes: 'A south-Kerala route with several base changes. Munroe Island replaces the busier Alappuzha houseboat corridor, and Varkala provides the coastal finish.',
            stayNotes: 'Kochi and Munnar are the two-night bases, followed by one night each in Thekkady and Munroe Island.'
        },
        {
            id: 'ten-day',
            name: '10-Day Kerala Deep Dive',
            days: 10,
            page: 'plan-10-days.html',
            budgetPlanId: 'ten-day',
            route: ['kochi', 'kadamakkudy', 'munroe-island', 'munnar', 'thekkady', 'wayanad', 'valiyaparamba', 'bekal'],
            pace: 'active',
            driveLoad: 'very high',
            interests: ['culture', 'heritage', 'hills', 'wildlife', 'spices', 'backwaters', 'canoe', 'offbeat', 'beaches', 'food'],
            audiences: ['family', 'couple', 'solo', 'students'],
            bestFor: ['active offbeat explorers', 'travellers comfortable with major transfers', 'a north-and-south Kerala overview'],
            highlights: ['Fort Kochi', 'Kadamakkudy', 'Munroe Island', 'Munnar', 'Thekkady', 'Wayanad', 'Valiyaparamba', 'Bekal'],
            experiences: ['heritage and food', 'island villages', 'canoe', 'tea country', 'spice and nature activity', 'forests and falls', 'north Kerala backwaters', 'Bekal coast'],
            waterExperience: 'canoe and day-cruise experiences',
            overnightBases: [
                { destination: 'kochi', nights: 2, type: 'hotel' },
                { destination: 'munroe-island', nights: 1, type: 'homestay' },
                { destination: 'munnar', nights: 2, type: 'hotel' },
                { destination: 'thekkady', nights: 1, type: 'hotel' },
                { destination: 'wayanad', nights: 2, type: 'hotel or nature stay' },
                { destination: 'bekal', nights: 1, type: 'hotel or resort' }
            ],
            dayByDay: [
                { days: [1, 2], label: 'Days 1-2', title: 'Kochi + Kadamakkudy Islands', destinations: ['kochi', 'kadamakkudy'], overnight: 'kochi', summary: 'Open with Fort Kochi heritage and food, then visit Kadamakkudy at sunrise before returning for Mattancherry and an evening performance.' },
                { days: [3], label: 'Day 3', title: 'Munroe Island Canoe Country', destinations: ['munroe-island'], overnight: 'munroe-island', summary: 'Travel south, check into a homestay and explore Munroe Island by small canoe where the Kallada River meets Ashtamudi Lake.' },
                { days: [4, 5], label: 'Days 4-5', title: 'Munnar High Country', destinations: ['munnar'], overnight: 'munnar', summary: 'Spend two nights in Munnar using flexible tea plantations, viewpoint roads, waterfalls and quiet valley walks.' },
                { days: [6], label: 'Day 6', title: 'Thekkady and Spices', destinations: ['thekkady'], overnight: 'thekkady', summary: 'Shift to the Periyar region for a spice garden, guided nature activity or lakeside experience, depending on conditions.' },
                { days: [7, 8], label: 'Days 7-8', title: 'Wayanad: Forests and Falls', destinations: ['wayanad'], overnight: 'wayanad', summary: 'Make the long northbound transfer, then use two Wayanad nights for forests, plantations, waterfalls and caves.' },
                { days: [9, 10], label: 'Days 9-10', title: 'Valiyaparamba Islands + Bekal', destinations: ['valiyaparamba', 'bekal'], overnight: 'bekal', summary: 'Finish with Valiyaparamba island backwaters, Malabar food and a final coastal evening near Bekal Fort before departure.' }
            ],
            includes: ['Kochi', 'Kadamakkudy', 'Munroe Island', 'Munnar', 'Thekkady', 'Wayanad', 'Valiyaparamba', 'Bekal'],
            excludes: ['overnight houseboat', 'relaxed pace', 'few hotel changes'],
            transportNotes: 'This is the most demanding published route. The stored planner identifies Munroe Island to Munnar, Thekkady to Wayanad and Wayanad to Valiyaparamba as substantial transfers; Thekkady to Wayanad is the heaviest leg.',
            stayNotes: 'Six overnight bases across south, central and north Kerala, including homestay, hill and coastal stays.'
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
            route: ['kochi', 'kumarakom'],
            returnTo: 'kochi',
            pace: 'relaxed',
            driveLoad: 'light',
            interests: ['culture', 'heritage', 'backwaters', 'wellness', 'relaxed'],
            audiences: ['senior', 'couple', 'family'],
            bestFor: ['senior travellers', 'multigenerational families needing a gentle base', 'travellers avoiding long drives and frequent packing'],
            highlights: ['restful Kochi arrival', 'easy heritage day', 'Kumarakom', 'covered daytime cruise', 'slow departure'],
            experiences: ['short heritage stops', 'rest time', 'Vembanad Lake', 'daytime motorboat or shikara cruise'],
            waterExperience: 'covered daytime cruise',
            overnightBases: [
                { destination: 'kochi', nights: 2, type: 'hotel' },
                { destination: 'kumarakom', nights: 2, type: 'hotel or backwater resort' }
            ],
            dayByDay: [
                { days: [1], label: 'Day 1', title: 'Kochi Arrival + Rest', destinations: ['kochi'], overnight: 'kochi', summary: 'Use a pre-booked transfer, settle into the hotel and keep the day free except for an optional short sunset drive or early dinner.' },
                { days: [2], label: 'Day 2', title: 'Easy Kochi Heritage Day', destinations: ['kochi'], overnight: 'kochi', summary: 'Use a car for two short Fort Kochi walking stops, seated museum time, a long lunch and optional Kathakali.' },
                { days: [3], label: 'Day 3', title: 'Kochi to Kumarakom', destinations: ['kochi', 'kumarakom'], overnight: 'kumarakom', summary: 'Leave after breakfast, check in near Vembanad Lake before lunch and keep the afternoon free for rest and sunset.' },
                { days: [4], label: 'Day 4', title: 'Slow Vembanad Backwaters', destinations: ['kumarakom'], overnight: 'kumarakom', summary: 'Take a two-hour covered motorboat or shikara cruise after confirming easy boarding, then return for lunch and a quiet resort afternoon.' },
                { days: [5], label: 'Day 5', title: 'Leisurely Kochi Departure', destinations: ['kumarakom', 'kochi'], overnight: null, summary: 'Have an unhurried breakfast and return to Kochi with a planned comfort stop and generous departure margin.' }
            ],
            includes: ['Kochi', 'Kumarakom', 'two overnight bases', 'private or easier transfers', 'daytime backwater cruise', 'rest time'],
            excludes: ['Munnar', 'Thekkady', 'overnight houseboat', 'fast pace'],
            transportNotes: 'The two-base route reduces long drives and hotel changes. Confirm any requested assistance and vehicle access directly.',
            stayNotes: 'Two nights each in Kochi and Kumarakom. Confirm lift access, step-free rooms, bathroom supports, walking distances and boat boarding directly with providers.'
        }
    ];

    const byId = Object.fromEntries(plans.map(plan => [plan.id, plan]));

    return Object.freeze({
        plans: Object.freeze(plans),
        byId: Object.freeze(byId),
        find(id) {
            return byId[id] || null;
        }
    });
});
