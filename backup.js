let answer = await ask(`${welcomeMessage}\nWhat would you like to do?\n>_ `);
  while (
    ![
      "read flyer",
      "inventory",
      "enter outside",
      "take flyer",
      "enter foyer",
      "take pamphlet",
      "read pamphlet",
      "drop pamphlet",
      "enter kitchen",
      "enter basement",
      "enter upstairs",
      "inventory",
      "take soda",
      "drink soda",
      "take key",
      "enter armory",
      "take dagger",
      "enter roof",
      "kill dragon",
      "give soda",
    ].includes(answer)
  ) {
    console.log(`Sorry, I don't know what that means`);
    answer = await ask(">_ ");
  }
  if (answer === "read flyer") {
    console.log(`${flyer.inspect()}`);
    answer = await ask(">_ ");
  }
  if (answer === "take flyer") {
    console.log(`The dagger has the note wedged too securely to the door.`);
    answer = await ask(">_ ");
  }
  if (answer === "enter foyer") {
    changeRoom("foyer");
    answer = await ask(">_ ");
  }
  if (answer === "take pamphlet") {
    inventory.push("pamphlet");
    console.log("You've added the pamphlet to your inventory.");
    answer = await ask(">_ ");
  }
}
play();

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