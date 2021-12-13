const { lookup } = require("dns");
const { userInfo } = require("os");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//player inventory structured as an array
let inventory = [];

class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.description = description;
    this.action = action || "nothing happened";
    this.takeable = takeable || false;
  }

  //take function, add item to inventory
  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `you picked up ${this.name}
      ${this.description}`;
    } else {
      return `you can't take that!`;
    }
  }

  //inspect function
  inspect() {
    return this.description;
  }

  //use function
  //usable items: key, soda, sword
  use() {
    if (
      this.name === "soda" &&
      startPoint === "roof" &&
      inventory.includes("soda")
    ) {
      return `You offer the dragon the soda. He drinks it with one big gulp & lets out a fiery burp...
      ${process.exit()}`;
    } else if (
      this.name === "sword" &&
      startPoint === "roof" &&
      inventory.includes("sword")
    ) {
      return `...${process.exit()};`;
    } else {
      return this.action;
    }
  }

  unlock() {
    if (startPoint === "upstairs" && inventory.includes("key")) {
      return `You unlocked the door, the roof is now accessible.`;
    } else {
      return `This door is locked!`;
    }
  }
}

//item constructor: name, description, action, takeable

let flyer = new Item(
  "flyer",
  `The sign reads:
  $$$ 50,000 SCHMECKLE REWARD $$$ 
  TO THE PERSON TO SLAY THE DRAGON ON THE ROOF!!!!
  ENTER FOYER TO ACCEPT THE CHALLENGE!!!`,
  undefined,
  false
);

let pamphlet = new Item(
  "pamphlet",
  `A pamphlet ripped in half and crumpled, it reads:
  DRAGONS: BLOODTHIRSTY BEASTS or JUST THIRSTY??`,
  undefined,
  true
);

let key = new Item(
  "key",
  `A key that was found on the neck of a skeleton.
  I wonder what is opens.`,
  undefined,
  true
);

let soda = new Item(
  "soda",
  `An unopened can of Dragon Cola.
I heard this stuff isn't made for regular human consumption.`,
  undefined,
  true
);

let sword = new Item(
  "sword",
  `Dorum's infamous Blade of the Undying.
  Legend reads any person who dies 
  within the vicinity of this weapon is brought back to life
  at a moment in their past and given a second chance at life.
  Pfft, sounds like a shitty cop-out for a text-based RPG.`,
  undefined,
  true
);

let door = new Item(
  "door",
  "a solid iron door, it looks locked.",
  "the door is locked.",
  false
);

let lookupTable = {
  flyer: flyer,
  pamphlet: pamphlet,
  soda: soda,
  key: key,
  sword: sword,
  door: door,
};

//room constructor, give room description, what items it holds and what room it can transition to
class Room {
  constructor(description, item, transitions) {
    this.description = description;
    this.item = item;
    this.transitions = transitions;
  }
  description() {
    return this.description;
  }
  //enter function lets players move between valid rooms and give error if player makes a invalid room change
  enter(newRoom) {
    if (this.transitions.includes(newRoom)) {
      startPoint = newRoom;
      return `You've entered the ${newRoom}.\n${roomTable[newRoom].description}`;
    } else {
      return `Not a valid room change: ${startPoint} to ${newRoom}.`;
    }
  }
}

//list of room made with class constructor
let outside = new Room(
  `------------------------
  DORUM'S CASTLE OF THE UNDYING.
Woah, how did I get here again?
You are standing in front of Dorum's castle doors.
There is this minor heat radiating from the top of the castle.
A blood-stained flyer is pinned into the elegant wooden doors.`,
  "flyer",
  ["foyer"]
);

let foyer = new Room(
  `------------------------
  DORUM'S FOYER.
You enter Dorum's Foyer. Why does this room feel familiar?
A bunch of wrinkled pamphlets lie near a garbage pal.
To the left is a door labeled "BASEMENT,
On the right is a door labeled "KITCHEN",
Straight ahead is a chute that's labeled "UPSTAIRS".
Hmmm, where to first.....`,
  "pamphlet",
  ["outside", "basement", "kitchen", "upstairs"]
);

let basement = new Room(
  `------------------------
  BASEMENT.
*COUGH*
Boy it sure is dusty. Hmm, there isn't much down here.
Doesn't seem like theres any other places to go from here.
A skeleton in clothing is sat on a chair. I wonder what
his story is.
A key on a necklace sits on his neck.`,
  "key",
  ["foyer"]
);

let kitchen = new Room(
  `------------------------
  KITCHEN.
Oh boy, it reeks of spoiled meats. 
Is that *sniff* kangaroo? Aardvark? Honey Badger?
Doesn't seem like theres any other places to go from here.
The cabinet is open and a single soda can remains.`,
  "soda",
  ["foyer"]
);

let upstairs = new Room(
  `------------------------
  UPSTAIRS.
A long hallway.
to the right is a door labeled "ARMORY".
Straight ahead is the door that leads to the roof.`,
  "door",
  ["roof", "armory", "foyer"]
);

let armory = new Room(
  `------------------------
  THE ARMORY.
The armory is picked clean.
Doesn't seem like theres any other places to go from here.
Only one item remains. It can't be...It's Dorum's Sword!
Legend says this sword is known to send you back in time if you die within its range.
A second chance at life doesn't sound life a bad thing... 
The door leading back is labeled "HALLWAY".`,
  "dagger",
  ["hallway"]
);

let roof = new Room(
  `------------------------
  THE ROOF.
There his is: THE DRAGON!!
The heat coming off of him is intense. Sweat forms on your brow.
What will you do brave warrior?`,
  "dragon",
  ["upstairs"]
);

let hallway = new Room(
  `------------------------
  HALLWAY.
  To the right is the door to the roof,
  to the left leads back to the foyer.
  Hmmmm, I hope I checked all the rooms...`,
  undefined,
  ["roof", "armory", "foyer"]
);

//room lookup table
let roomTable = {
  outside: outside,
  foyer: foyer,
  kitchen: kitchen,
  basement: basement,
  upstairs: upstairs,
  armory: armory,
  roof: roof,
  hallway: hallway,
};

//player start point
let startPoint = "outside";

// List of alloted action words to give player ease of game play
console.log(
  `...\nACTION WORDS: TAKE, INSPECT, ENTER, UNLOCK, USE, INVENTORY.\n...\nDorum's Castle of The Undying.
OUTSIDE. 
Woah. Wait, how did I get here again?
You are standing in front of Dorum's castle doors.
A blood-stained flyer is pinned into the elegant wooden doors...
Hmmm, What should I do?`
);

async function play() {
  let userAction = await ask(">_ ");

  let inputArray = userAction.toLowerCase().split(" ");

  let action = inputArray[0];

  let target = inputArray.slice(1).join(" ");

  if (action === "use") {
    console.log(lookupTable[target].use());
  } else if (action === "take") {
    if (lookupTable[target] instanceof Item) {
      console.log(lookupTable[target].take());
    } else {
      console.log(lookupTable[target].take());
      console.log("You cannot take that.");
    }
  } else if (action === "inspect") {
    console.log(lookupTable[target].description);
  } else if (action === "enter") {
    console.log(roomTable[startPoint].enter(target));
  } else if (action === "inventory") {
    console.log(inventory);
  } else if (action === "use soda") {
    process.exit();
  } else if (action === "inventory") {
    console.log(inventory);
  } else {
    console.log(`I dont know how to ${userAction}`);
  }
  return play();
}

play();
