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

play();

//Below is the establishing code for the inventory

let inventory = [];

class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.description = description;
    this.action = action || "nothing happened";
    this.takeable = takeable || false;
  }
  inspect() {
    return this.description;
  }
  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `you picked up ${this.name}`;
    } else {
      return `you can't take that!`;
    }
  }
  use() {
    if (this.name === "key" && inventory.includes("key")) {
      return `You unlocked the door, the roof is now accessible.`;
    } else {
      return this.action;
    }
  }
}

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

let itemTable = {
  flyer: flyer,
  pamphlet: pamphlet,
  soda: soda,
  key: key,
  sword: sword,
  door: door,
};

class Room {
  constructor(description, item, validInput) {
    this.description = description;
    this.item = item;
    this.validInput = validInput;
  }
  description() {
    return this.description;
  }
}

let outside = new Room(
  `DORUM'S CASTLE OF THE UNDYING.
Woah, how did I get here again?
You are standing in front of Dorum's castle doors.
There is this minor heat radiating from the top of the castle.
An ivory dagger is stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`,
  "flyer",
  ["read flyer", "enter foyer", "take flyer", "inventory"]
);

let foyer = new Room(
  `DORUM'S FOYER.
You enter Dorum's Foyer. Why does this room feel familiar?
A wrinkled pamphlet lies near a garbage pal.
To the left is a door labeled "BASEMENT,
On the right is a door labeled "KITCHEN",
Straight ahead is a chute that's labeled "UPSTAIRS".
Hmmm, where to first.....`,
  "pamphlet",
  [
    "take pamphlet",
    "read pamphlet",
    "drop pamphlet",
    "enter kitchen",
    "enter basement",
    "enter upstairs",
    "inventory",
    "drink soda",
  ]
);

let basement = new Room(
  `BASEMENT.
*COUGH*
Boy it sure is dusty. Hmm, there isn't much down here.
Doesn't seem like theres any other places to go from here.
A skeleton in clothing is sat on a chair. I wonder what
his story is.
A key on a necklace sits on his neck.`,
  "key",
  ["take key", "inventory", "enter foyer", "drink soda"]
);

let kitchen = new Room(
  `KITCHEN.
Oh boy, it reeks of spoiled meats. 
Is that *sniff* kangaroo? Aardvark? Honey Badger?
Doesn't seem like theres any other places to go from here.
The cabinet is open and a single soda can remains.`,
  "soda",
  ["take soda", "drink soda", "enter foyer", "inventory"]
);

let upstairs = new Room(
  `UPSTAIRS.
A long corridor.
to the right is a door labeled "ARMORY".
Straight ahead is the door that leads to the roof.`,
  "door",
  ["enter roof", "enter armory", "inventory"]
);

let armory = new Room(
  `THE ARMORY.
The armory is picked clean.
Doesn't seem like theres any other places to go from here.
Only one item remains. It can't be...It's Dorum's Sword!
Legend says this sword is known to send you back in time if you die within its range.
A second chance at life doesn't sound life a bad thing... `,
  "dagger",
  ["take sword", "inventory", "enter upstairs"]
);

let roof = new Room(
  `THE ROOF.
There his is: THE DRAGON!!
The heat coming off of him is intense. Sweat forms on your brow.
What will you do brave warrior?`,
  "dragon",
  []
);

let roomTable = {
  outside: outside,
  foyer: foyer,
  kitchen: kitchen,
  basement: basement,
  upstairs: upstairs,
  armory: armory,
  roof: roof,
};

let startPoint = "outside";

let transitions = {
  outside: ["foyer"],
  foyer: ["basement", "kitchen", "upstairs"],
  basement: ["foyer"],
  kitchen: ["foyer"],
  upstairs: ["foyer", "armory", "roof"],
  armory: ["upstairs"],
  roof: ["upstairs"],
};

function changeRoom(newRoom) {
  if (transitions[startPoint].includes(newRoom)) {
    startPoint = newRoom;
    console.log(
      `You've entered the ${newRoom}.\n${roomTable[newRoom].description}`
    );
  } else {
    console.log(`Not a valid room change: ${startPoint} to ${newRoom}.`);
  }
}

async function play() {
  console.log(
    "...\nACTION WORDS: TAKE, READ, ENTER, UNLOCK, KILL, DRINK, INVENTORY.\n..."
  );
  
// List of alloted action words to give player ease of playing

  const welcomeMessage = `Dorum's Castle of The Undying.
  OUTSIDE. 
Woah. Wait, how did I get here again?
You are standing in front of Dorum's castle doors.
There is a ivory dagger stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`;
  let answer = await ask(`${welcomeMessage}\n>_ `);
  }
















  //   while (
//     ![
//       "read flyer",
//       "enter outside",
//       "take flyer",
//       "enter foyer",
//       "take pamphlet",
//       "read pamphlet",
//       "drop pamphlet",
//       "enter kitchen",
//       "enter basement",
//       "enter upstairs",
//       "inventory",
//       "take soda",
//       "drink soda",
//       "take key",
//       "enter armory",
//       "take dagger",
//       "take sword",
//       "enter roof",
//       "kill dragon",
//       "give soda",
//     ].includes(answer)
//   ) {
//     console.log(`Sorry, I don't know what that means`);
//     answer = await ask(">_ ");
//   }
//   if (answer === "take dagger") {
//     console.log("The dagger is stabbed to deep to remove. Get stronger scrub.");
//     answer = await ask(">_ ");
//   }
//   if (answer === "read flyer") {
//     console.log(`${flyer.inspect()}`);
//     answer = await ask(">_ ");
//   }
//   if (answer === "take flyer") {
//     console.log(`The dagger has the note wedged too securely to the door.`);
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter foyer") {
//     changeRoom("foyer");
//     answer = await ask(">_ ");
//     console.log(newRoom + "287");
//   }
//   if (answer === "enter basement") {
//     changeRoom("basement");
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter kitchen") {
//     changeRoom("kitchen");
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter upstairs") {
//     changeRoom("upstairs");
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter roof") {
//     changeRoom("roof");
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter outside") {
//     changeRoom("outside");
//     answer = await ask(">_ ");
//   }
//   if (answer === "enter armory") {
//     changeRoom("armory");
//   } else {
//     answer = await ask(">_ ");
//   }