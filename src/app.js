const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk");
const mongoose = require("mongoose");
const Note = require("./db/noteModel");


const connection = require("./db/connection");
const { addNote, listNote, deleteNote } = require("./utils/notes.js");

//Initial Options
const topLevelQuestion = [{ 
	type: "list", 
	name: "options", 
	message: "What would you like to do with your note app?", 
	choices: ["add note","view notes", "edit notes","delete note","exit"] },
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

let answerup = ""
// Question1 for updating note
async function updateFunc (){
	// create array of all options
	let list = await Note.find({});
	noteList = await list.map(value => value.note)
	const updateQuestion = [{ 
		type: "rawlist", 
		name: "update", 
		message: "Which note would you like to update? (type the notes number and hit enter):" ,
		choices:  await noteList},
	];
	return answerup = await inquirer.prompt(updateQuestion);
}

// Question2 for updating note
const updateQuestion2 = [{ 
	type: "input", 
	name: "update", 
	message: "What would you like to update your note to? (type your new note and hit enter):" },
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
		setTimeout(() => {
			app();
		}, 2000);
	} else if(topLevelAnswer.options == "view notes") {
		await listNote();
		
		setTimeout(() => {
			app();
		}, 2000);
	} else if (topLevelAnswer.options == "edit notes") {
		let list = await Note.find({})
		if(list.length < 1){
			console.log("You currently have no notes")
		}
		else {
			await updateFunc()
			let oldNote = answerup.update
			console.log(`You are choosing to update ${oldNote}`)
			const answer2 = await inquirer.prompt(updateQuestion2);
		
			let newNote = {note: answer2.update} 
			let oldNote2 = {note: oldNote}
			await Note.updateOne(oldNote2, newNote)
			console.log(
				chalk.green.bold(
			`Updated note to "${answer2.update}"
			`))
			setTimeout(() => {
				app();
			}, 2000);
		} 
	} else if(topLevelAnswer.options == "delete note") {
		const answer = await inquirer.prompt(deleteQuestion);
		await deleteNote(parseFloat(answer.delete));
		setTimeout(() => {
			app();
		}, 2000);
	}
	
	else if (topLevelAnswer.options == "exit") {
		console.log(chalk.blue(figlet.textSync("Ok, bye for now", { font: "Star Wars" })));
		mongoose.disconnect();
	}
};

//this starts the whole app
main();
