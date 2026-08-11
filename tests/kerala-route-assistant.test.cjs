'use strict';

const engine = require('../kerala-assistant.js');
const routes = require('../route-planner-core.js');
const failures = [];
let assertions = 0;
let routeQuestions = 0;

const check = (condition, label, detail = '') => {
    assertions += 1;
    if (!condition) failures.push({ label, detail });
};

const ask = (question, context = engine.createContext()) => {
    routeQuestions += 1;
    const response = engine.answer(question, context);
    check(Boolean(response.reply?.id), `${question}: reply exists`);
    check(Boolean(response.reply?.text), `${question}: text exists`);
    check(response.reply.text.length < 1400, `${question}: concise`, response.reply.text.length);
    return response;
};

const sequence = questions => {
    let context = engine.createContext();
    return questions.map(question => {
        const response = ask(question, context);
        context = response.context;
        return response;
    });
};

const supported = Object.keys(routes.destinations);
for (let left = 0; left < supported.length; left += 1) {
    for (let right = left + 1; right < supported.length; right += 1) {
        const fromId = supported[left];
        const toId = supported[right];
        const from = routes.destinations[fromId].name;
        const to = routes.destinations[toId].name;
        const stored = routes.pointSummary(fromId, toId);
        const turns = sequence([
            `How far is ${from} from ${to}?`,
            'How long does it take?',
            'Any stops on the way?'
        ]);
        check(turns[0].reply.id === 'transport-distance', `${from}-${to}: distance intent`, turns[0].reply.id);
        check(turns[0].reply.text.includes(`${stored.route.distance} km`), `${from}-${to}: stored distance`, turns[0].reply.text);
        check(turns[1].reply.id === 'transport-time', `${from}-${to}: time intent`, turns[1].reply.id);
        check(turns[1].reply.text.includes(routes.formatDuration(stored.route.minutes)), `${from}-${to}: stored duration`, turns[1].reply.text);
        check(turns[2].reply.id === 'transport-stops', `${from}-${to}: stop intent`, turns[2].reply.id);
        check(turns.every(turn => turn.context.activeRoute.join(',') === `${fromId},${toId}`), `${from}-${to}: route memory`, turns.at(-1).context.activeRoute.join(','));
        check(turns.every(turn => turn.reply.link?.[0]?.startsWith('map.html?from=')), `${from}-${to}: point map links`);
    }
}

const pointSequence = sequence([
    'How do I get from Kochi to Munnar?',
    'How long does it take?',
    'How far is it?',
    'Any stops on the way?',
    'Is that comfortable for seniors?',
    'Show it on the map.'
]);
check(pointSequence.map(turn => turn.reply.id).join(',') === 'transport-route,transport-time,transport-distance,transport-stops,transport-comfort,transport-map', 'Exact point sequence intents', pointSequence.map(turn => turn.reply.id).join(','));
check(pointSequence.every(turn => turn.context.activeRoute.join(',') === 'kochi,munnar'), 'Exact point sequence retains route');
check(pointSequence[3].reply.text.includes('Cheeyappara Waterfalls'), 'Point sequence uses planner stops', pointSequence[3].reply.text);
check(pointSequence.at(-1).reply.link?.[0] === 'map.html?from=Kochi&to=Munnar', 'Point sequence map link', pointSequence.at(-1).reply.link?.[0]);

const multiSequence = sequence([
    'How do I get from Kochi to Munnar?',
    'Add Thekkady.',
    'What transport should I use now?',
    'Why not train?',
    'Add Alappuzha.',
    'How many road legs?',
    'Which leg is longest?',
    'Where should we stop for breaks?',
    'Is this too tiring for seniors?',
    'Show it on the map.'
]);
const expectedMultiIds = ['transport-route', 'transport-multi-route', 'transport-multi-cab', 'transport-multi-cab', 'transport-multi-route', 'transport-multi-legs', 'transport-multi-longest', 'transport-multi-stops', 'transport-multi-comfort', 'transport-multi-map'];
check(multiSequence.map(turn => turn.reply.id).join(',') === expectedMultiIds.join(','), 'Exact multi-city sequence intents', multiSequence.map(turn => turn.reply.id).join(','));
check(multiSequence.at(-1).context.activeRoute.join(',') === 'kochi,munnar,thekkady,alappuzha', 'Exact multi-city route order', multiSequence.at(-1).context.activeRoute.join(','));
check(multiSequence.slice(2).every(turn => /Cab|cab/.test(turn.reply.text) || ['transport-multi-longest', 'transport-multi-stops', 'transport-multi-comfort'].includes(turn.reply.id)), 'Multi-city remains cab-only');
check(multiSequence[5].reply.text.includes('3 road legs'), 'Multi-city leg count', multiSequence[5].reply.text);
check(multiSequence[6].reply.text.includes('Thekkady → Alappuzha') && multiSequence[6].reply.text.includes('138 km'), 'Multi-city longest leg', multiSequence[6].reply.text);
check(multiSequence[7].reply.text.includes('Cheeyappara Waterfalls'), 'Multi-city recommended stops', multiSequence[7].reply.text);
check(multiSequence.at(-1).reply.link?.[0] === 'map.html?mode=multi&route=kochi,munnar,thekkady,alappuzha', 'Multi-city map link', multiSequence.at(-1).reply.link?.[0]);

[
    'Car or train from Kochi to Alappuzha?',
    'Train or flight from Kochi to Trivandrum?',
    'Car vs train from Alappuzha to Varkala?',
    'allepy to varkla train or car'
].forEach(question => {
    const response = ask(question);
    check(response.reply.id === 'transport-mode-comparison', `${question}: mode comparison`, response.reply.id);
    check(!response.reply.text.includes('Neither is universally better'), `${question}: not place comparison`, response.reply.text);
});

[
    ['Can I fly to Munnar?', 'transport-access-flight', 'no airport'],
    ['Direct train from Munnar to Wayanad?', 'transport-mode', 'not practical'],
    ['Flight from Munnar to Thekkady?', 'transport-mode', 'not practical']
].forEach(([question, id, phrase]) => {
    const response = ask(question);
    check(response.reply.id === id, `${question}: requested mode addressed`, response.reply.id);
    check(response.reply.text.toLowerCase().includes(phrase), `${question}: practical limitation explained`, response.reply.text);
});

const longMulti = ask('Bekal to Kozhikode to Kochi to Poovar, should I fly?');
check(longMulti.reply.id === 'transport-multi-cab', 'Long multi-city is cab-only', longMulti.reply.id);
check(longMulti.context.activeRoute.join(',') === 'bekal,kozhikode,kochi,poovar', 'Long multi-city retains all stops', longMulti.context.activeRoute.join(','));
const longMultiSummary = routes.multiSummary(['bekal', 'kozhikode', 'kochi', 'poovar']);
check(longMulti.reply.text.includes(routes.formatDuration(longMultiSummary.minutes)) && /long|overnight|sightseeing/.test(longMulti.reply.text), 'Long multi-city warns honestly', longMulti.reply.text);
check(longMulti.reply.link?.[0] === 'map.html?mode=multi&route=bekal,kozhikode,kochi,poovar', 'Long multi-city map link', longMulti.reply.link?.[0]);

[
    ['kochi to munar how', 'transport-route'],
    ['what transport now', 'transport-clarify'],
    ['Is this train running tomorrow?', 'live-information'],
    ['Current flight fare?', 'live-information'],
    ['Traffic right now?', 'live-information']
].forEach(([question, id]) => {
    const response = ask(question);
    check(response.reply.id === id, `${question}: casual/live safety`, response.reply.id);
});

const result = { routeQuestions, assertions, passed: assertions - failures.length, failed: failures.length, failures };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
