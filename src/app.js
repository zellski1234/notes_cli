const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connection = require("./db/connection");
const { addNote, listNote} = require("./utils/notes.js");

//Initial Options
const topLevelQuestion = [{ 
	type: "list", 
	name: "options", 
	message: "What would you like to do?", 
	choices: ["add note","view notes", "exit"] },
];

//Question for adding a note
const addQuestion = [{ 
	type: "input", 
	name: "add", 
	message: "What would you like to add? (type your note and hit enter):" },
];

//main function which runs the app
const main = async () => {
	console.log(chalk.blue(figlet.textSync("Notes App", { font: "isometric3" })));
	console.log("Starting App...");
	await connection();
	console.log(" ");
	app();
};

//application logic
const app = async () => {
	const topLevelAnswer = await inquirer.prompt(topLevelQuestion);

	if (topLevelAnswer.options == "add note") {
		const answer = await inquirer.prompt(addQuestion);
		await addNote(answer.add);
		/*
		note  the recursion here. Once we have carried out a task, we call app again to go back to the start
		*/
		app();
	} else if(topLevelAnswer.options == "view notes"){
		let list = await listNote()
        console.log(chalk.red.bold("Listing all Notes:"))
		console.log(chalk.green(list))
		// console.log(chalk.green(`1. Walk the dog.\n2. Buy some milk.\n3. Wash the car.`))
		
		app();
	} else if (topLevelAnswer.options == "exit") {
		console.log("Ok, bye for now");
		mongoose.disconnect();
	}
};

//this starts the whole app
main();
