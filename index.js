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

start();

class Room {
  constructor(description) {
    this.description = description;
  }
  description() {
    console.log(``);
  }
}

let outside = new Room(`Dorum's Castle of The Undying.
Woah, how did I get here again?
You are standing in front of Dorum's castle doors.
There is this minor heat radiating from the top of the castle.
An ivory dagger is stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`);

let foyer = new Room(`Dorum's Foyer.
You enter Dorum's Foyer. Why does this room feel familiar?
A wrinkled pamphlet lies near a garbage pal.
To the left is a door labeled "BASEMENT,
On the left is a door labeled "KITCHEN",
Straight ahead is a chute that's labeled "UPSTAIRS".
Hmmm, where to first.....`);

let basement = new Room(`Basement.
*COUGH*
Boy it sure is dusty. Hmm, there isn't much down here.
Doesn't seem like theres any other places to go from here.
A skeleton in clothing is sat on a chair. I wonder what
his story is.
A key on a necklace sits on his neck.`);

let kitchen = new Room(`Kitchen.
Oh boy, it reeks of spoiled meats. 
Is that *sniff* kangaroo? Aardvark? Honey Badger?
Doesn't seem like theres any other places to go from here.
The cabinet is open and a single soda can remains.`);

let upstairs = new Room(`Upstairs.
A long corridor.
to the right is a door labeled "ARMORY".
Straight ahead is the door that leads to the roof.`);

let armory = new Room(`The Armory.
The armory is picked clean.
Doesn't seem like theres any other places to go from here.
Only one item remains. It can't be...It's Dorum's Dagger!
Legend says this dagger is known to send you back in time if you die near it.
A second chance at life doesn't sound life a bad thing... `);

let roof = new Room(`The Roof.
There his is: THE DRAGON!!
The heat coming off of him is intense. Sweat forms on your brow.
What will you do brave warrior?`);

let startPoint = "outside";

let transitions = {
  outside: ["foyer"],
  foyer: ["basement", "kitchen", "upstairs"],
  basement: ["foyer"],
  kitchen: ["foyer"],
  upstairs: ["foyer", "armory", "roof"],
  roof: ["upstairs"],
};

function changeRoom(newRoom) {
  if (transitions[startPoint].includes(newRoom)) {
    startPoint = newRoom;
  } else {
    console.log(`Not a valid room change: ${startPoint} to ${newRoom}.`);
  }
}

class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  inspect() {
    return this.description;
  }
}

let flyer = new Item(
  "flyer",
  `The sign reads:
  $$$50,000 SCHMECKLE REWARD$$$ 
  TO THE PERSON TO SLAY THE DRAGON ON THE ROOF!!!!
  ENTER FOYER TO ACCEPT THE CHALLENGE!!!`
);

let pamphlet = new Item(
  "pamphlet",
  `A pamphlet ripped in half and crumpled, it reads:
  DRAGONS: BLOODTHIRSTY BEASTS or JUST THIRSTY??`
);

let key = new Item(
  "key",
  `A key that was found on the neck of a skeleton.
  I wonder what is opens.`
);

let soda = new Item(
  "soda",
  `An unopened can of Dragon Cola.
I heard this stuff isn't made for regular human consumption.`
);

let dagger = new Item(
  "dagger",
  `Dorum's infamous Dagger of the Undying.
  Legend reads any person who dies 
  within the vicinity of this weapon is brought back to life
  at a moment in their past and given a second chance at life.
  Pfft, sounds like a shitty cop-out for a text-based RPG.`
);

let inventory = [];

async function start() {
  function gameAction(string) {
    while (
      ![
        "read flyer",
        "take pamphlet",
        "read pamphlet",
        "take soda",
        "take key",
        "take dagger",
        "kill dragon",
        "give soda",
        "drink soda",
        "",
      ].includes(answer)
    ) {
      console.log(`Sorry, I don't know what that means`);
    }
  }

  const welcomeMessage = `Dorum's Castle of The Undying.
OUTSIDE. 
Woah. Wait, how did I get here again?
You are standing in front of Dorum's castle doors.
There is a ivory dagger stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`;
  let answer = await ask(`${welcomeMessage}\n>_ `);
  while (!["read sign", "take sign"].includes(answer)) {
    answer = await ask("Sorry, I do not understand that.");
  }
  if (answer === "read flyer") {
    console.log(`${flyer.inspect()}`);
    answer = await ask(">_ ");
  }
  if (answer === "take flyer") {
    console.log(`The dagger has the note wedged too securely to the door.`);
    answer = await ask(">_ ");
  }
  if (answer !== "read flyer" || answer !== "take flyer") {
    console.log("Sorry, I do not understand.");
    answer = await ask(">_ ");
  }
}

// if (answer === "take pamphlet") {
//   inventory.push("pamphlet");
//   console.log("You've added the pamphlet to your inventory.");
// }
// if (answer === "take soda") {
//   inventory.push("soda");
//   console.log("You've added the soda to your inventory.");
// }
// if (answer === "take key") {
//   inventory.push("key");
//   console.log("You've added the key to your inventory.");
// }
// if (answer === "take dagger") {
//   inventory.push("dagger");
//   console.log("You've added the dagger to your inventory.");
// }
