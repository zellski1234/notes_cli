const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connection = require("./db/connection");
const { addNote, listNote, deleteNote } = require("./utils/notes.js");

//Initial Options
const topLevelQuestion = [{ 
	type: "list", 
	name: "options", 
	message: "What would you like to do?", 
	choices: ["add note","view notes", "delete note","exit"] },
];

//Question for adding a note
const addQuestion = [{ 
	type: "input", 
	name: "add", 
	message: "What would you like to add? (type your note and hit enter):" },
];

// Question for deleting note
const deleteQuestion = [{ 
	type: "input", 
	name: "delete", 
	message: "Which note would you like to delete? (type the notes number and hit enter):" },
];

//main function which runs the app
const main = async () => {
	console.log(chalk.blue(figlet.textSync("Notes App", { font: "Larry 3D" })));
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
	} else if(topLevelAnswer.options == "view notes") {
		await listNote();
		
		app();
	} else if(topLevelAnswer.options == "delete note") {
		const answer = await inquirer.prompt(deleteQuestion);
		await deleteNote(answer.delete);
		setTimeout(() => {
			app();
		}, 2000);
	}
	
	else if (topLevelAnswer.options == "exit") {
		console.log("Ok, bye for now");
		mongoose.disconnect();
	}
};

//this starts the whole app
main();
