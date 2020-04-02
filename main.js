const CREATURES = generateCreatures();
let creatureNames = Object.keys(CREATURES);
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentHour = today.getHours();
let monthlyCreatures = listMonthlyCreatures(CREATURES, creatureNames).sort();
let importantElement = document.getElementById('important-creatures');
let activeElement = document.getElementById('active-creatures');
let inactiveElement = document.getElementById('inactive-creatures');

document.getElementById('time').innerText = formatTime(currentHour);
document.getElementById('month').innerText = formatDate(currentMonth);

printCreatures(CREATURES, monthlyCreatures, importantElement, activeElement, inactiveElement);

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

// CREATURES AVAILABLE THIS MONTH
function listMonthlyCreatures(database, creatureNames) {
  let monthlyCreatures = [];

  for (let i = 0; i < creatureNames.length; i++) {
    let name = creatureNames[i];
    let creature = database[name];

    if (isAvailableThisMonth(creature)) monthlyCreatures.push(name);
  }

  return monthlyCreatures;
}

function printCreatures(database, monthlyCreatures, importantElement, activeElement, inactiveElement) {
  let importantOutput = '<table><th>Name</th><th>Times</th>';
  let activeOutput = '<table><th>Name</th><th>Can be found</th><th>Price</th>';
  let inactiveOutput = '<table><th>Name</th><th>Times</th>';

  for (let i = 0; i < monthlyCreatures.length; i++) {
    let name = monthlyCreatures[i];
    let creature = database[name];
    let firstHour = creature['time'][0];
    let lastHour = creature['time'][1];

    if (isHighPriority(creature)) {
      importantOutput += `<tr><td>${formatName(name)}</td>`;
      if (firstHour === 0 && lastHour === 23) importantOutput += '<td>all day</td>';
      else importantOutput += `<td>${formatTime(firstHour)} - ${formatTime(lastHour)}</td></tr>`;
    }
    if (isAvailableThisHour(creature)) {
      activeOutput += `<tr><td>${formatName(name)}</td>`;
      activeOutput += `<td>${creature['location']}</td>`;
      activeOutput += `<td>${creature['price']}</td></tr>`;
    }
    else {
      inactiveOutput += `<tr><td>${formatName(name)}</td>`;
      if (firstHour === 0 && lastHour === 23) inactiveOutput += '<td>all day</td>';
      else inactiveOutput += `<td>${formatTime(firstHour)} - ${formatTime(lastHour)}</td></tr>`;
    }
  }

  importantElement.innerHTML += importantOutput + '</table>';
  activeElement.innerHTML += activeOutput + '</table>';
  inactiveElement.innerHTML += inactiveOutput + '</table>';
}

function isAvailableThisMonth(creature) {
  return creature['months'].includes(currentMonth);
}

function isAvailableThisHour(creature) {
  let firstHour = creature['time'][0];
  let lastHour = creature['time'][1];
  let availableHours = listAvailableHours(firstHour, lastHour);

  return availableHours.includes(currentHour);
}

function isHighPriority(creature) {
  return isAvailableThisMonth(creature) && !creature['months'].includes(currentMonth + 1);
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
      'location': 'in rivers',
      'time': [0, 23],
      'months': [1, 2, 3, 11, 12]
    },
    'black bass': {
      'price': 400,
      'location': 'in rivers',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'blue marlin': {
      'price': 10000,
      'location': 'by the pier',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 7, 8, 9, 11, 12]
    },
    'bluegill': {
      'price': 180,
      'location': 'in rivers',
      'time': [9, 16],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'carp': {
      'price': 300,
      'location': 'in ponds',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'char': {
      'price': 3800,
      'location': 'in clifftop rivers and ponds',
      'time': [16, 9],
      'months': [3, 4, 5, 6, 9, 10, 11]
    },
    'cherry salmon': {
      'price': 1000,
      'location': 'in clifftop rivers and ponds',
      'time': [16, 9],
      'months': [3, 4, 5, 6, 9, 10, 11]
    },
    'coelacanth': {
      'price': 15000,
      'location': 'in the sea when raining',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'crucian carp': {
      'price': 160,
      'location': 'in rivers',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'dab': {
      'price': 300,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 10, 11, 12]
    },
    'dace': {
      'price': 240,
      'location': 'in rivers',
      'time': [16, 9],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'football fish': {
      'price': 2500,
      'location': 'in the sea',
      'time': [16, 9],
      'months': [1, 2, 3, 11, 12]
    },
    'freshwater goby': {
      'price': 400,
      'location': 'in rivers',
      'time': [16, 9],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'golden trout': {
      'price': 15000,
      'location': 'in clifftop rivers',
      'time': [16, 9],
      'months': [3, 4, 5, 9, 10, 11]
    },
    'goldfish': {
      'price': 1300,
      'location': 'in ponds',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'horse mackerel': {
      'price': 150,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'koi': {
      'price': 4000,
      'location': 'in ponds',
      'time': [16, 9],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'loach': {
      'price': 400,
      'location': 'in rivers',
      'time': [0, 23],
      'months': [3, 4, 5]
    },
    'oarfish': {
      'price': 9000,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 12]
    },
    'olive flounder': {
      'price': 800,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'pale chub': {
      'price': 200,
      'location': 'in rivers',
      'time': [9, 16],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'pop-eyed goldfish': {
      'price': 1300,
      'location': 'in ponds',
      'time': [9, 16],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'ranchu goldfish': {
      'price': 4500,
      'location': 'in ponds',
      'time': [9, 16],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'red snapper': {
      'price': 3000,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'sea bass': {
      'price': 400,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'sea butterfly': {
      'price': 1000,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 12]
    },
    'squid': {
      'price': 500,
      'location': 'in the sea',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 5, 6, 7, 8, 12]
    },
    'stringfish': {
      'price': 15000,
      'location': 'in clifftop rivers',
      'time': [16, 9],
      'months': [1, 2, 3, 12]
    },
    'sturgeon': {
      'price': 10000,
      'location': 'in river mouths',
      'time': [0, 23],
      'months': [1, 2, 3, 9, 10, 11, 12]
    },
    'tadpole': {
      'price': 100,
      'location': 'in ponds',
      'time': [0, 23],
      'months': [3, 4, 5, 6, 7]
    },
    'tuna': {
      'price': 7000,
      'location': 'by the pier',
      'time': [0, 23],
      'months': [1, 2, 3, 4, 11, 12]
    },
    'yellow perch': {
      'price': 300,
      'location': 'in rivers',
      'time': [0, 23],
      'months': [1, 2, 3, 10, 11, 12]
    },
  }
}
