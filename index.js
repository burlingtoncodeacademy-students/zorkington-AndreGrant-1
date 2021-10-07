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

function validTransition(newRoom) {
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

sign = {
  description: `Sign.
  The sign reads:
  $$$50,000 SCHMECKLE REWARD$$$ 
  TO THE PERSON TO SLAY THE DRAGON ON THE ROOF!!!!
  ENTER FOYER TO ACCEPT THE CHALLENGE!!!`,
};

pamphlet = {
  description: `Pamphlet.
  A pamphlet ripped in half and crumpled, it reads:
  DRAGONS: BLOODTHIRSTY BEASTS or JUST THIRSTY??`,
};

key = {
  description: `Key.
  A key that was found on the neck of a skeleton.
  I wonder what is opens.`,
};

soda = {
  description: `Soda.
  An unopened can of Dragon Cola.
  I heard this stuff isn't made for regular human consumption.`,
};

dagger = {
  description: `Dagger.
  Dorum's infamous Dagger of the Undying.
  Legend reads any person who dies 
  within the vicinity of this weapon is brought back to life
  at a moment in their past and given a second chance at life.
  Pfft, sounds like a shitty cop-out for a text-based RPG.
  `,
};

async function start() {
  const welcomeMessage = `Dorum's Castle of The Undying.
Woah. Wait, how did I get here again?
You are standing in front of Dorum's castle doors.
There is a ivory dagger stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`;
  let answer = await ask(`${welcomeMessage}\n>_ `);
  console.log("Now write your code to make this work!");

  process.exit();
}
