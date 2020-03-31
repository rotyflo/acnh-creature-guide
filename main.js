const CREATURES = generateCreatures();
let creatureNames = Object.keys(CREATURES);
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentHour = today.getHours();
let highPriorityCreatures = listHighPriorityCreatures(CREATURES, creatureNames).sort();
let availableCreatures = listAvailableCreatures(CREATURES, creatureNames).sort();

printHighPriorityCreatures(CREATURES, highPriorityCreatures, 'high-priority-creatures');

document.getElementById('time').innerText = formatTime(currentHour);
document.getElementById('month').innerText = formatDate(currentMonth);

printAvailableCreatures(CREATURES, availableCreatures, 'available-creatures');

// FUNCTIONALITY

function formatName(name) {
  let formattedName = name[0].toUpperCase();
  let capitalizeLetter = false;

  for (let i = 1; i < name.length; i++) {
    formattedName += capitalizeLetter ? name[i].toUpperCase() : name[i];

    capitalizeLetter = (name[i] === ' ' || name[i] === '-');
  }

  return formattedName;
}

function formatTime(hour) {
  if (hour === 0) {
    return '12am';
  }
  else if (hour < 12) {
    return `${hour}am`;
  }
  else if (hour === 12) {
    return '12pm';
  }
  else {
    return `${hour - 12}pm`;
  }
}

function formatDate(month) {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][month - 1];
}

function listHighPriorityCreatures(database, creatureNames) {
  let highPriorityCreatures = [];

  for (let i = 0; i < creatureNames.length; i++) {
    let name = creatureNames[i];
    let availableMonths = database[name]['months'];

    if (isHighPriority(availableMonths)) highPriorityCreatures.push(name);
  }

  return highPriorityCreatures;
}

function listAvailableCreatures(database, creatureNames) {
  let availableCreatures = [];

  for (let i = 0; i < creatureNames.length; i++) {
    let name = creatureNames[i];
    let availableMonths = database[name]['months'];

    if (isAvailableThisMonth(availableMonths)) {
      let firstHour = database[name]['time'][0];
      let lastHour = database[name]['time'][1];
      let availableHours = listAvailableHours(firstHour, lastHour);

      if (availableHours.includes(currentHour)) availableCreatures.push(name);
    }
  }

  return availableCreatures;
}

function printHighPriorityCreatures(database, creatures, elementId) {
  let element = document.getElementById(elementId);
  let output = '<table><th>Name</th><th>Active hours</th>';

  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];
    let firstHour = database[creature]['time'][0];
    let lastHour = database[creature]['time'][1];

    output += `<tr><td>${formatName(creature)}</td>`;

    if (firstHour === 0 && lastHour === 23) {
      output += '<td>all day</td>';
    }
    else {
      output += `<td>${formatTime(firstHour)} - ${formatTime(lastHour)}</td></tr>`;
    }
  }

  element.innerHTML += output + '</table>';
}

function printAvailableCreatures(database, creatures, elementId) {
  let element = document.getElementById(elementId);
  let output = '<table><th>Name</th><th>Can be found</th><th>Price</th>';

  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];
    output += `<tr><td>${formatName(creature)}</td>`;
    output += `<td>${database[creature]['location']}</td>`;
    output += `<td>${database[creature]['price']}</td></tr>`;
  }

  element.innerHTML += output + '</table>';
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

// CREATURES

function generateCreatures() {
  return {

    // BUG LIST

    'agrias butterfly': {
      'price': 3000,
      'location': 'flying around',
      'time': [8, 17],
      'months': [4, 5, 6, 7, 8, 9]
    },
    'ant': {
      'price': 80,
      'location': 'on rotten food',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'atlas moth': {
      'price': 3000,
      'location': 'on trees',
      'time': [19, 4],
      'months': [4, 5, 6, 7, 8, 9]
    },
    'bagworm': {
      'price': 600,
      'location': 'by shaking trees',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'banded dragonfly': {
      'price': 4500,
      'location': 'flying around',
      'time': [8, 17],
      'months': [5, 6, 7, 8, 9, 10]
    },
    'bell cricket': {
      'price': 430,
      'location': 'on the ground',
      'time': [17, 8],
      'months': [9, 10]
    },
    'blue weevil beetle': {
      'price': 800,
      'location': 'on coconut trees',
      'time': [0, 23],
      'months': [7, 8]
    },
    'brown cicada': {
      'price': 250,
      'location': 'on trees',
      'time': [8, 17],
      'months': [7, 8]
    },
    'centipede': {
      'price': 300,
      'location': 'by hitting rocks',
      'time': [16, 23],
      'months': [1, 2, 3, 4, 5, 6, 9, 10, 11, 12]
    },
    'cicada shell': {
      'price': 10,
      'location': 'on trees',
      'time': [0, 23],
      'months': [7, 8]
    },
    // 'citrus long-horned beetle': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    'common bluebottle': {
      'price': 300,
      'location': 'flying around',
      'time': [4, 19],
      'months': [4, 5, 6, 7, 8]
    },
    'common butterfly': {
      'price': 160,
      'location': 'flying around',
      'time': [4, 19],
      'months': [1, 2, 3, 4, 5, 6, 9, 10, 11, 12]
    },
    // 'cricket': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'cyclommatus stag': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'damselfly': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'darner dragonfly': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'diving beetle': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'drone beetle': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'dung beetle': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    // 'earth-boring dung beetle': {
    //   'price': ,
    //   'location': '',
    //   'time': [],
    //   'months': []
    // },
    'emperor butterfly': {
      'price': 4000,
      'location': 'flying around',
      'time': [17, 8],
      'months': [1, 2, 3, 6, 7, 8, 9, 12]
    },
    'fly': {
      'price': 60,
      'location': 'on trash items',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'great purple emperor': {
      'price': 3000,
      'location': 'flying around',
      'time': [4, 19],
      'months': [5, 6, 7, 8]
    },
    'hermit crab': {
      'price': 1000,
      'location': 'disguised as shells on the beach',
      'time': [19, 8],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'honeybee': {
      'price': 200,
      'location': 'flying around',
      'time': [8, 17],
      'months': [3, 4, 5, 6, 7]
    },
    'ladybug': {
      'price': 200,
      'location': 'on flowers',
      'time': [8, 17],
      'months': [3, 4, 5, 6, 10]
    },
    'man-faced stink bug': {
      'price': 1000,
      'location': 'on flowers',
      'time': [19, 8],
      'months': [3, 4, 5, 6, 7, 8, 9, 10]
    },
    'mantis': {
      'price': 430,
      'location': 'on flowers',
      'time': [8, 17],
      'months': [3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    'mole cricket': {
      'price': 500,
      'location': 'underground',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 11, 12]
    },
    'moth': {
      'price': 130,
      'location': 'flying by light',
      'time': [19, 4],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'orchid mantis': {
      'price': 2400,
      'location': 'on white flowers',
      'time': [8, 17],
      'months': [3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    'paper kite butterfly': {
      'price': 1000,
      'location': 'flying around',
      'time': [8, 19],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'peacock butterfly': {
      'price': 2500,
      'location': 'flying by hybrid flowers',
      'time': [4, 19],
      'months': [3, 4, 5, 6]
    },
    'pill bug': {
      'price': 250,
      'location': 'by hitting rocks',
      'time': [23, 16],
      'months': [1, 2, 3, 4, 5, 6, 9, 10, 11, 12]
    },
    'snail': {
      'price': 250,
      'location': 'on rocks when raining',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'spider': {
      'price': 480,
      'location': 'by shaking trees',
      'time': [19, 8],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'stinkbug': {
      'price': 120,
      'location': 'on flowers',
      'time': [0, 23],
      'months': [3, 4, 5, 6, 7, 8, 9, 10]
    },
    'tarantula': {
      'price': 8000,
      'location': 'on the ground',
      'time': [19, 4],
      'months': [1, 2, 3, 4, 11, 12]
    },
    'tiger beetle': {
      'price': 1500,
      'location': 'on the ground',
      'time': [0, 23],
      'months': [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    'tiger butterfly': {
      'price': 240,
      'location': 'flying around',
      'time': [4, 19],
      'months': [3, 4, 5, 6, 7, 8, 9]
    },
    'wasp': {
      'price': 2500,
      'location': 'by shaking trees',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'wharf roach': {
      'price': 200,
      'location': 'on beach rocks',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'yellow butterfly': {
      'price': 160,
      'location': 'flying around',
      'time': [4, 19],
      'months': [3, 4, 5, 6, 9, 10]
    },

    // FISH LIST

    'anchovy': {
      'price': 200,
      'location': 'in the sea',
      'time': [4, 21],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'barred knifejaw': {
      'price': 5000,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    'barreleye': {
      'price': 15000,
      'location': 'in the sea',
      'time': [21, 4],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'bitterling': {
      'price': 900,
      'location': 'in the river',
      'time': [0, 23],
      'months': [1, 2, 3, 11, 12]
    },
    'black bass': {
      'price': 400,
      'location': 'in the river',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'blue marlin': {
      'price': 10000,
      'location': 'at the pier',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 7, 8, 9, 11, 12]
    },
    'football fish': {
      'price': 2500,
      'location': 'in the sea',
      'time': [16, 9],
      'months': [1, 2, 3, 11, 12]
    },
    'sea butterfly': {
      'price': 1000,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 12]
    },
    'stringfish': {
      'price': 15000,
      'location': 'in the clifftop river',
      'time': [16, 9],
      'months': [1, 2, 3, 12]
    },
    'sturgeon': {
      'price': 10000,
      'location': 'in the river mouth',
      'time': [0, 23],
      'months': [1, 2, 3, 9, 10, 11, 12]
    },
    'yellow perch': {
      'price': 300,
      'location': 'in the river',
      'time': [0, 23],
      'months': [1, 2, 3, 10, 11, 12]
    },
  }
}
