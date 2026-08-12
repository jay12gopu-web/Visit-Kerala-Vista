'use strict';

const engine = require('../kerala-assistant.js');

const failures = [];
let assertions = 0;
let questions = 0;

const check = (condition, label, detail = '') => {
    assertions += 1;
    if (!condition) failures.push({ label, detail });
};

const ask = (question, context = engine.createContext()) => {
    questions += 1;
    const response = engine.answer(question, context);
    check(Boolean(response?.reply?.id), `${question}: reply id`);
    check(Boolean(response?.reply?.text), `${question}: reply text`);
    check(response.reply.text.length < 1600, `${question}: concise`, response.reply.text.length);
    return response;
};

const sequence = questionsToAsk => {
    let context = engine.createContext();
    return questionsToAsk.map(question => {
        const response = ask(question, context);
        context = response.context;
        return response;
    });
};

[
    ['What is the 3-day plan?', 'three-day'],
    ['Show me the 5-day itinerary.', 'five-day'],
    ['Give me the 7-day Kerala plan.', 'seven-day'],
    ['What happens in the 10-day plan?', 'ten-day'],
    ['Show me the student plan.', 'student'],
    ['Show me the senior plan.', 'senior']
].forEach(([question, planId]) => {
    const response = ask(question);
    check(response.reply.id === 'plan-recommendation', `${question}: plan summary`, response.reply.id);
    check(response.context.activePlanId === planId, `${question}: active plan`, response.context.activePlanId);
    check(response.context.routeSource === 'published-plan', `${question}: published route source`, response.context.routeSource);
});

[
    '3-day or 5-day plan?',
    'Which is better, 5 or 7 days?',
    'Compare the 7-day and 10-day plans.',
    'Student plan vs normal 5-day plan.',
    'Senior plan vs standard 5-day plan.'
].forEach(question => check(ask(question).reply.id === 'plan-comparison', `${question}: plan comparison`));

const comparisonFollowUp = sequence(['5-day or 7-day plan?', 'Which one has less driving?', 'Which one has beaches?']);
check(comparisonFollowUp.slice(1).every(item => item.reply.id === 'plan-comparison'), 'Plan comparison follow-ups retain comparison');
check(comparisonFollowUp[2].context.planComparisonWinner === 'seven-day', 'Beach comparison selects 7-day plan', comparisonFollowUp[2].context.planComparisonWinner);

[
    ['Which plan includes beaches?', '8-Day Classic'],
    ['Which plan has wildlife?', '5-Day Hills'],
    ['Which plans include Munnar?', '5-Day Hills'],
    ['Which plan has a houseboat?', '3-Day Kochi'],
    ['Which plan includes Varkala?', '8-Day Classic'],
    ['Which plan includes Wayanad?', '11-Day Kerala'],
    ['Which plan has the least driving?', '3-Day Kochi'],
    ['Which plan is the most relaxed?', 'Easy-Paced Senior'],
    ['Which plan has the most offbeat places?', '8-Day Classic'],
    ['Which plan has the fewest hotel changes?', '3-Day Kochi']
].forEach(([question, phrase]) => {
    const response = ask(question);
    check(response.reply.id === 'plan-feature-search', `${question}: feature search`, response.reply.id);
    check(response.reply.text.includes(phrase), `${question}: expected plan`, response.reply.text);
});

[
    ['Does the 5-day plan include Munnar?', true],
    ['Does the 5-day plan include a houseboat?', true],
    ['Does the 7-day plan include Alappuzha?', false],
    ['Does the 7-day plan include a beach?', true],
    ['Does the student plan include Thekkady?', false],
    ['Does the senior plan include Munnar?', false],
    ['Does the 10-day plan include Wayanad?', true]
].forEach(([question, expected]) => {
    const response = ask(question);
    check(response.reply.id === 'plan-inclusion', `${question}: inclusion intent`, response.reply.id);
    check(response.reply.text.startsWith(expected ? 'Yes.' : 'No.'), `${question}: direct yes/no`, response.reply.text);
});

const fiveDayQuestions = sequence([
    'Show me the 5-day itinerary.',
    'What happens on Day 1?',
    'What happens on Day 3?',
    'What is Day 4?',
    'Which day is the houseboat?',
    'When do we reach Munnar?',
    'What happens on the last day?',
    'What happens during Days 3-4?'
]);
check(fiveDayQuestions.slice(1).every(item => item.context.activePlanId === 'five-day'), 'Day follow-ups retain 5-day plan');
check(fiveDayQuestions[2].reply.text.includes('Munnar to Thekkady'), 'Day 3 is factual', fiveDayQuestions[2].reply.text);
check(fiveDayQuestions[3].reply.text.includes('Alappuzha'), 'Day 4 is factual', fiveDayQuestions[3].reply.text);
check(fiveDayQuestions[4].reply.text.includes('Day 4'), 'Houseboat day found', fiveDayQuestions[4].reply.text);
check(fiveDayQuestions[5].reply.text.includes('Day 2'), 'Munnar day found', fiveDayQuestions[5].reply.text);

[
    ['What happens on Day 6 of the 7-day plan?', 'Munroe Island'],
    ['Which day is Munroe Island in the 7-day plan?', 'Day 6'],
    ['When do we reach Varkala in the 7-day plan?', 'Day 7'],
    ['What happens on Day 4 of the 7-day plan?', 'part of the grouped Days 3-4']
].forEach(([question, phrase]) => check(ask(question).reply.text.includes(phrase), `${question}: grouped day support`));

[
    ['Where do we stay each night in the 5-day plan?', 'Kochi: 1 night'],
    ['How many nights in Munnar in the 7-day plan?', '2 nights'],
    ['Do we sleep on the houseboat in the 5-day plan?', 'Yes.'],
    ['How many hotel changes are in the senior plan?', '2 hotel or stay changes'],
    ['Where do students stay?', 'Hostel age']
].forEach(([question, phrase]) => check(ask(question).reply.text.includes(phrase), `${question}: overnight reasoning`));

[
    ['Why does the 7-day plan not use Alappuzha?', 'quieter village homestay'],
    ['Why is Munroe Island included in the 7-day plan?', 'small-canal canoe'],
    ['Why does the senior plan not include Munnar?', 'winding hill roads'],
    ['Why is the student plan cheaper?', 'shared transport'],
    ['Why is the 10-day plan more tiring?', 'Kochi to Wayanad']
].forEach(([question, phrase]) => check(ask(question).reply.text.includes(phrase), `${question}: plan reason`));

const memoryFive = sequence(['Give me the 5-day plan.', 'What happens on Day 3?', 'Where do we stay?', 'Does it include a houseboat?']);
check(memoryFive.slice(1).every(item => item.context.activePlanId === 'five-day'), 'Active 5-day plan survives follow-ups');
check(memoryFive[1].reply.text.includes('Thekkady'), 'Plan memory gives correct day');

const durationSwitch = sequence(['Give me the 10-day plan.', 'Actually make it 7 days.']);
check(durationSwitch[1].context.activePlanId === null && durationSwitch[1].context.routeSource === 'custom-user-route', 'Arbitrary 7-day request remains a custom duration', durationSwitch[1].context.activePlanId);
check(durationSwitch[1].context.activeRoute.join(',') === 'kochi,munnar,alappuzha', 'Duration switch clears stale 11-day route', durationSwitch[1].context.activeRoute.join(','));

const studentMap = sequence(['Give me the student plan.', 'Map it.']);
check(studentMap[1].reply.link?.[0] === 'map.html?mode=multi&route=kochi,munnar,alappuzha', 'Student plan map handoff', studentMap[1].reply.link?.[0]);
const seniorMap = sequence(['Show me the senior plan.', 'Show the route on the map.']);
check(seniorMap[1].reply.link?.[0] === 'map.html?mode=multi&route=kochi,kumarakom,thiruvananthapuram', 'Senior plan map handoff', seniorMap[1].reply.link?.[0]);

const modified = sequence(['Give me the 5-day plan.', 'Remove Thekkady.', 'Add Varkala.', 'Show it on the map.']);
check(modified[1].context.routeSource === 'custom-user-route' && !modified[1].context.activeRoute.includes('thekkady'), 'Published plan becomes custom after removal');
check(modified[2].context.activeRoute.at(-1) === 'varkala', 'Custom plan appends Varkala');
check(modified[3].reply.link?.[0] === 'map.html?mode=multi&route=kochi,munnar,alappuzha,varkala', 'Modified route maps exact order', modified[3].reply.link?.[0]);

[
    ['Train or car from Kochi to Munnar?', 'transport-mode-comparison'],
    ['Munnar or Wayanad?', 'comparison'],
    ['5-day or 7-day?', 'plan-comparison']
].forEach(([question, id]) => check(ask(question).reply.id === id, `${question}: intent separation`));

[
    ['Best plan for seniors?', 'senior'],
    ['Best plan for students?', 'student'],
    ['We are a family with kids and have 5 days.', 'five-day'],
    ['We have 5 days and hate long drives.', 'senior'],
    ['We are school students and have 5 days.', 'student'],
    ['We are college students and have 5 days.', 'student']
].forEach(([question, planId]) => {
    const response = ask(question);
    check(response.context.activePlanId === planId, `${question}: traveller-aware plan`, response.context.activePlanId);
});
const school = ask('We are school students and have 5 days.');
check(/minor|supervised|18\+/.test(school.reply.text), 'School students receive accommodation warning', school.reply.text);
check(ask('We have grandparents and kids.').reply.text.includes('easy-paced'), 'Multigenerational route is useful immediately');

[
    ['We have 7 days and want beaches.', 'Varkala'],
    ['We have 5 days and want hills and backwaters.', 'five-day'],
    ['We want Munnar and a houseboat. Which plan?', '5-Day Hills'],
    ['We want offbeat Kerala. Which plan?', '8-Day Classic']
].forEach(([question, expected]) => {
    const response = ask(question);
    check(response.context.activePlanId === expected || response.reply.text.includes(expected), `${question}: interest-aware plan`, `${response.context.activePlanId} ${response.reply.text}`);
});

const wildlifeChange = sequence(['Give me the 5-day plan.', "I don't want wildlife.", 'Remove it.']);
check(wildlifeChange[1].context.pendingPlanDestination === 'thekkady', 'Wildlife objection prepares Thekkady change');
check(!wildlifeChange[2].context.activeRoute.includes('thekkady'), 'Remove it applies pending plan change');
check(ask("Give me the 5-day plan without a houseboat.").reply.text.includes('land hotel'), 'Houseboat alternative explained');

[
    ['Show the 5-day plan on the map.', 'map.html?mode=multi&route=kochi,munnar,thekkady,alappuzha'],
    ['Map the 7-day itinerary.', 'map.html?mode=multi&route=kochi,kadamakkudy,munnar,thekkady,munroe-island,varkala,thiruvananthapuram'],
    ['Show the 10-day route on the map.', 'map.html?mode=multi&route=kochi,wayanad,munnar,thekkady,alappuzha,varkala,thiruvananthapuram'],
    ['Map the senior plan.', 'map.html?mode=multi&route=kochi,kumarakom,thiruvananthapuram'],
    ['Map the student plan.', 'map.html?mode=multi&route=kochi,munnar,alappuzha'],
    ['Show Munnar to Thekkady on the map.', 'map.html?from=Munnar&to=Thekkady'],
    ['Show the first half of the 7-day route on the map.', 'map.html?mode=multi&route=kochi,kadamakkudy,munnar']
].forEach(([question, link]) => check(ask(question).reply.link?.[0] === link, `${question}: map link`, ask(question).reply.link?.[0]));

const tenDay = engine.plans.find(plan => plan.id === 'ten-day');
check(tenDay.route.join(',') === 'kochi,wayanad,munnar,thekkady,alappuzha,varkala,thiruvananthapuram', 'Published 11-day route remains consistent');
check(engine.routeCore.multiSummary(tenDay.route).comfort === 'Very Long Drive', '11-day route is explicitly demanding');

[
    ['Show me the 8-day plan.', '8-Day Classic + Offbeat Kerala'],
    ['Where do we stay on Night 7 in the 8-day plan?', 'Varkala'],
    ['What happens on Day 8 of the 8-day plan?', 'Thiruvananthapuram'],
    ['Show me the 11-day plan.', '11-Day Kerala Deep Dive'],
    ['Which day is Alappuzha in the 11-day plan?', 'Day 7'],
    ['Which day is Varkala in the 11-day plan?', 'Day 9'],
    ['Where does the 11-day plan start?', 'starts in Kochi'],
    ['Houseboat or shikara in the 11-day plan?', 'choose one']
].forEach(([question, phrase]) => check(ask(question).reply.text.includes(phrase), `${question}: rebuilt itinerary fact`));

[
    ['Does the 11-day plan include Kadamakkudy?', false],
    ['Does the 11-day plan include Munroe Island?', false],
    ['Does the 11-day plan include Valiyaparamba?', false],
    ['Does the 11-day plan include Bekal?', false],
    ['Does the 11-day plan include Alappuzha?', true],
    ['Does the 11-day plan include Varkala?', true]
].forEach(([question, expected]) => check(ask(question).reply.text.startsWith(expected ? 'Yes.' : 'No.'), `${question}: final route inclusion`));

const templePlans = ask('Which plans include Sree Padmanabhaswamy Temple?');
check(['seven-day', 'ten-day', 'senior'].every(id => templePlans.reply.text.includes(engine.planData.byId[id].name)), 'Temple search lists all three matching plans', templePlans.reply.text);
check(!templePlans.reply.text.includes('5-Day Hills + Houseboat'), 'Temple search excludes the regular 5-day plan', templePlans.reply.text);
check(ask('Does the 7-day plan include Padmanabhaswamy Temple?').reply.text.includes('Day 8'), '8-day temple placement');
check(ask('Does the 10-day plan include Padmanabhaswamy Temple?').reply.text.includes('Day 10'), '11-day temple placement');
check(ask('Does the senior plan include Padmanabhaswamy Temple?').reply.text.includes('Day 5'), 'Senior temple placement');
check(ask('Does the student plan include Padmanabhaswamy Temple?').reply.text.startsWith('No.'), 'Student plan excludes temple');

const templeFollowUps = sequence(['Does the 10-day plan include Padmanabhaswamy Temple?', 'Where does this plan start?', 'Can everyone enter?', 'What if I cannot enter?']);
check(templeFollowUps[1].reply.text.includes('starts in Kochi'), '10-day arrival remains Kochi', templeFollowUps[1].reply.text);
check(templeFollowUps[2].reply.text.includes('restricted to Hindus') && templeFollowUps[2].reply.text.includes('traditional dress'), 'Temple restrictions retained in conversation', templeFollowUps[2].reply.text);
check(templeFollowUps[3].reply.text.includes('Kuthiramalika Palace'), 'Temple non-entry alternative retained', templeFollowUps[3].reply.text);

const seniorTemple = sequence(['Show me the senior plan.', 'Is the temple day tiring for seniors?']);
check(seniorTemple[1].reply.text.includes('light Day 5') && seniorTemple[1].reply.text.includes('rest'), 'Senior temple day remains light', seniorTemple[1].reply.text);

const result = { questions, assertions, passed: assertions - failures.length, failed: failures.length, failures };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
