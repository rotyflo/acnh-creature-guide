const Bugs = require('./bugs.js');
const Fish = require('./fish.js');

let bugNames = Object.keys(Bugs);
let fishNames = Object.keys(Fish);
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentHour = today.getHours();
let highPriorityBugs = [];
let highPriorityFish = [];
let availableBugs = [];
let availablefish = [];

populateBugLists();

console.log('Last month to catch:')
highPriorityBugs.forEach(function(bug) {
  let firstHour = Bugs[bug]['time'][0];
  let secondHour = Bugs[bug]['time'][1];

  console.log(`${bug.toUpperCase()}: ${firstHour} - ${secondHour}`);
});

console.log('');

console.log('Available Bugs:');
availableBugs.forEach(function(bug) {
  console.log(`The ${bug.toUpperCase()} can be found ${Bugs[bug]['location']}.`);
});

function populateBugLists() {
  for (let i = 0; i < bugNames.length; i++) {
    let name = bugNames[i];
    let availableMonths = Bugs[name]['months'];

    if (isHighPriority(availableMonths)) highPriorityBugs.push(name);

    if (isAvailableThisMonth(availableMonths)) {
      let firstHour = Bugs[name]['time'][0];
      let lastHour = Bugs[name]['time'][1];
      let availableHours = listAvailableHours(firstHour, lastHour);

      if (availableHours.includes(currentHour)) availableBugs.push(name);
    }
  }
}

function isAvailableThisMonth(availableMonths) {
  return availableMonths.includes(currentMonth);
}

function isHighPriority(availableMonths) {
  return isAvailableThisMonth(availableMonths) && !availableMonths.includes(currentMonth + 1);
}

function listAvailableHours(firstHour, lastHour) {
  let hours = [];

  if (firstHour > lastHour) lastHour += 24;

  for (let hour = firstHour; hour <= lastHour; hour++) hours.push(hour % 24);

  if (hours.length !== 24) hours.pop();

  return hours;
}
