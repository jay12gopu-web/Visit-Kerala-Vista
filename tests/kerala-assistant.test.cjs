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
    check(response.reply.text.length < 1400, `${question}: concise response`, response.reply.text.length);
    check(Array.isArray(response.reply.related), `${question}: related suggestions`);
    return response;
};

Object.entries(engine.destinations).forEach(([id, destination]) => {
    destination.aliases.forEach(alias => {
        const response = ask(`Could you explain ${alias} for first-time visitors?`);
        check(response.context.currentDestination === id, `Alias ${alias} resolves to ${id}`, response.context.currentDestination);
        check(response.reply.id === 'destination', `Alias ${alias} returns destination guidance`, response.reply.id);
    });
});

for (let days = 1; days <= 14; days += 1) {
    const response = ask(`bro we have ${days}-day trip, where should a family go?`);
    check(response.context.duration === days, `${days}-day duration retained`, response.context.duration);
    check(['plan-recommendation', 'custom-plan', 'plan-too-rushed'].includes(response.reply.id), `${days}-day route is useful`, response.reply.id);
}

[
    ['Munnar or Wayanad with children?', 'comparison'],
    ['Varkala versus Kovalam for seniors?', 'comparison'],
    ['Alleppey or Kumarakom for a quiet backwater stay?', 'comparison'],
    ['Alappuzha vs Munro Island: which is cheaper?', 'comparison'],
    ['Cochin or Trivandrum for a first arrival?', 'comparison'],
    ['Thekkady or Wayanad for wildlife?', 'comparison'],
    ['Where should we stay in munar if we want something affordable?', 'stay'],
    ['Family hotel in Kochi?', 'stay'],
    ['Resort or homestay in Kerala?', 'stay-comparison'],
    ['Cheap stays in Calicut?', 'stay'],
    ['What should I eat in Kochi?', 'food'],
    ['What food is Wayanad known for?', 'food'],
    ['Vegetarian food in Munnar?', 'food'],
    ['What can kids eat in Varkala if they dislike spice?', 'food'],
    ['I have a seafood allergy. What should I check?', 'food'],
    ['How do I get from Kochi to Munnar?', 'transport-route'],
    ['Munnar to Thekkady by train?', 'transport-route'],
    ['Allepy to varkla how?', 'transport-route'],
    ['Which airport works for Wayanad?', 'transport-access'],
    ['Can I take a train from Kochi to Varkala?', 'transport-route'],
    ['Is Munnar good for kids in July?', 'seasonal-weather'],
    ['Should a family choose Munnar or Wayanad in June?', 'comparison'],
    ['Which 7-day plan is best for seniors who like wildlife?', 'plan-recommendation'],
    ['Give me a relaxed 5-day Kerala trip for senior citizens.', 'plan-recommendation'],
    ['Can we visit Munnar, Alleppey and Varkala in six days?', 'custom-plan'],
    ['Munnar, Wayanad, Varkala and Alleppey in 4 days', 'plan-too-rushed'],
    ['Can 2 adults and 2 kids do Kerala for INR 60000?', 'budget-need-duration'],
    ['We are four people with 70000 rupees for seven days.', 'budget-fit'],
    ['Which plan is cheapest?', 'budget-cheapest'],
    ['How can I reduce the cost?', 'budget-saving'],
    ['Value vs Comfortable?', 'budget-tiers'],
    ['Can we skip the houseboat to save money?', 'budget-houseboat-saving'],
    ['What is Munnar weather tomorrow?', 'live-information'],
    ['Is Periyar open right now?', 'live-information'],
    ['Are trains running tomorrow?', 'live-information'],
    ['Current hotel price in Kovalam?', 'live-information'],
    ['Tell me about Kathakali.', 'culture-kathakali'],
    ['Where can we understand Theyyam?', 'culture-theyyam'],
    ['When is Thrissur Pooram?', 'culture-festival'],
    ['What is temple etiquette in Kerala?', 'culture-etiquette'],
    ['How do I say thank you in Malayalam?', 'malayalam-phrase'],
    ['How do I ask the price in Malayalam?', 'malayalam-phrase'],
    ['Where is the bathroom in Malayalam?', 'malayalam-phrase'],
    ['Teach me some Malayalam phrases for tourists.', 'malayalam-guide'],
    ['Can my grandparents do the houseboat?', 'safety-houseboat-seniors'],
    ['Is Varkala safe with children?', 'safety'],
    ['Is July good for Kerala?', 'seasonal-weather'],
    ['What is Munnar like in December?', 'seasonal-weather'],
    ['Can I visit during monsoon?', 'best-time'],
    ['What questions can I ask?', 'help']
].forEach(([question, expected]) => {
    const response = ask(question);
    check(response.reply.id === expected, `${question}: expected ${expected}`, response.reply.id);
});

const budgetGroups = [
    '2 adults and 2 kids', 'one adult travelling solo', '2 seniors', 'a senior couple',
    'four friends', 'six students', 'parents children and grandparents', 'family of five'
];
budgetGroups.forEach((group, index) => {
    const response = ask(`We are ${group}, have ${5 + (index % 3)} days and INR ${50000 + (index * 5000)}. What is realistic?`);
    check(response.reply.id.startsWith('budget'), `${group}: group-aware budget`, response.reply.id);
});

[
    'Kochi to Alappuzha', 'Kochi to Varkala', 'Kozhikode to Wayanad', 'Kannur to Bekal',
    'Kollam to Poovar', 'Thrissur to Athirappilly', 'Vagamon to Idukki', 'Bekal to Thiruvananthapuram'
].forEach(route => {
    const response = ask(`How should we travel ${route}?`);
    check(response.reply.id === 'transport-route', `${route}: route response`, response.reply.id);
    check(response.reply.link?.[0]?.startsWith('map.html?'), `${route}: map link`, response.reply.link?.[0]);
});

Object.entries(engine.phrases).forEach(([id, phrase]) => {
    const response = ask(`How do I say ${phrase.english} in Malayalam?`);
    check(response.reply.id === 'malayalam-phrase', `${id}: phrase matched`, response.reply.id);
    if (phrase.audio) check(response.reply.audio === phrase.audio, `${id}: real audio path`, response.reply.audio);
});

const runSequence = (items, expectedIds = []) => {
    let context = engine.createContext();
    return items.map((question, index) => {
        const response = ask(question, context);
        context = response.context;
        if (expectedIds[index]) check(response.reply.id === expectedIds[index], `Sequence turn: ${question}`, response.reply.id);
        return response;
    });
};

const sequenceA = runSequence([
    'Tell me about Munnar',
    'How many days there?',
    'What about hotels?',
    'Is it good for kids?',
    'What about in July?',
    'How do I get there from Kochi?'
], ['destination', 'destination', 'stay', 'destination', 'seasonal-weather', 'transport-route']);
check(sequenceA.every(item => item.context.currentDestination === 'munnar'), 'Sequence A retains Munnar');
check(sequenceA.at(-1).context.month === 'july', 'Sequence A retains July');
check(sequenceA.at(-1).context.travellerType === 'family', 'Sequence A retains family');

const stayToWeather = runSequence([
    'Tell me about Munnar',
    'What about hotels?',
    'Which are cheaper?',
    'What about for a family?',
    'What about in July?'
], ['destination', 'stay', 'stay', 'stay', 'seasonal-weather']);
check(stayToWeather.at(-1).context.currentDestination === 'munnar', 'Month follow-up retains destination after stay questions');

const multiCityLink = runSequence([
    'Plan Kochi, Munnar, Thekkady and Alappuzha for 7 days',
    'Give me the map link'
], ['custom-plan', 'transport-multi-route']);
check(multiCityLink.at(-1).reply.link?.[0]?.startsWith('map.html?mode=multi&route='), 'Multi-city plan opens multi-city map', multiCityLink.at(-1).reply.link?.[0]);

const sequenceB = runSequence([
    'Munnar or Wayanad?',
    'Which is easier with children?',
    'Which is cheaper?',
    'What about during monsoon?',
    'Okay, give me a 6-day trip using the better option.'
], ['comparison', 'comparison', 'comparison', 'comparison', 'custom-plan']);
check(sequenceB.at(-1).context.duration === 6, 'Sequence B retains six days');
check(sequenceB.at(-1).context.previousComparison.join(',') === 'munnar,wayanad', 'Sequence B retains comparison');
check(sequenceB.at(-1).reply.text.includes('Munnar'), 'Sequence B uses the better option');

const sequenceC = runSequence([
    'We are 2 adults and 2 kids.',
    'We have seven days.',
    'We like hills and backwaters.',
    'We do not want too many long drives.',
    'What do you recommend?'
], ['context-updated', 'plan-recommendation', 'context-updated', 'plan-recommendation', 'plan-recommendation']);
const finalC = sequenceC.at(-1);
check(finalC.context.adults === 2 && finalC.context.children === 2, 'Sequence C retains family counts');
check(finalC.context.duration === 7, 'Sequence C retains duration');
check(finalC.context.interests.includes('hills') && finalC.context.interests.includes('backwaters'), 'Sequence C retains interests');
check(finalC.context.avoidLongDrives, 'Sequence C retains drive preference');
check(finalC.reply.text.includes('fewer long drives'), 'Sequence C applies drive preference');

const editSequence = runSequence([
    'Give me a seven-day Kerala plan.',
    'Remove Thekkady.',
    'Add Varkala.',
    'What did I tell you earlier?'
], ['plan-recommendation', 'custom-plan-adjusted', 'custom-plan-adjusted', 'recall']);
check(!editSequence[1].context.destinations.includes('thekkady'), 'Route edit removes Thekkady');
check(editSequence[2].context.destinations.filter(id => id === 'varkala').length === 1, 'Route edit avoids duplicate Varkala');
check(editSequence[3].reply.text.includes('Varkala') && !editSequence[3].reply.text.includes('Thekkady'), 'Route recall reflects edits');

const stress = runSequence([
    'bro i got 6 days where should i go',
    'munar or waynad with kids?',
    'what about there in july',
    'can my grandparents do the houseboat',
    'we have 60k and four people',
    'allepy to varkla how',
    'i hate long drives',
    'veg food there?',
    'which one was cheaper again',
    'change it to 5 days',
    'skip wildlife',
    'add a beach',
    'where do we fly out from',
    'is it raining tomorrow',
    'what did i tell you earlier',
    'how do i say thank you in malayalam'
]);
check(stress.every(item => item.reply.id !== 'fallback'), 'Casual stress sequence avoids generic fallback');
check(stress.at(-2).reply.id === 'recall', 'Stress sequence recalls context');
check(stress.at(-1).reply.audio === 'audio/malayalam/nandi.mp3', 'Stress sequence exposes real audio');

const result = { questions, assertions, passed: assertions - failures.length, failed: failures.length, failures };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
