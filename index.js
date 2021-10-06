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
There is a ivory dagger stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`);

let foyer = new Room(`Dorum's Foyer.`);
let basement = new Room(`Basement.`);
let kitchen = new Room(`Kitchen.`);
let upstairs = new Room(`Upstairs.`);
let armory = new Room(`The Armory.`);
let roof = new Room(`The Roof.`);

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

async function start() {
  const welcomeMessage = `Dorum's Castle of The Undying.
Woah, how did I get here again?
You are standing in front of Dorum's castle doors.
There is a ivory dagger stabbed into the elegant wooden doors.
Pinned between the dagger and the door is a handwritten flyer.`;
  let answer = await ask(`${welcomeMessage}\n>_ `);
  console.log("Now write your code to make this work!");

  process.exit();
}
