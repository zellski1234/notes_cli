const Note = require("../db/noteModel");
const chalk = require("chalk");

exports.addNote = async (myNote) => {
	try {
		await Note.create({ note: myNote });
		console.log(
			chalk.green(`
		Added new note: ${myNote}
		`)
		);
	} catch (error) {
		console.log("error in addNote function")
		console.log(error);
	}
};

exports.listNote = async () => {
	try {
		let list = await Note.find({});
		console.log(chalk.blue.bold("Listing all Notes:"))
		// console.log(chalk.green(list.map(value => value.note)));
		for(let i = 0; i < list.length; i++){
			console.log(chalk.green(`${i+1}) ${list[i].note}`))
		} 
	} catch (error) {
		console.log("error in listNote function")
		console.log(error)
	}
}

exports.deleteNote = async (myIndex) => {
	try {
		let list = await Note.find({});
		if ((myIndex > list.length) || (myIndex <= 0)){
			if (list.length > 1){
				console.log(chalk.red.bold(`Sorry there is no note number ${myIndex}, there are only ${list.length} notes`))
			}
			else {
				console.log(chalk.red.bold(`Sorry there is no note number ${myIndex}, there is only ${list.length} note!`))
			}
		} else if((myIndex <= list.length) && (myIndex > 0 ) && (Number.isInteger(myIndex))){
			console.log(chalk.red.bold(`\n${list[myIndex-1].note} was removed\n`))
			return await Note.deleteOne(list[myIndex-1]);
		}
		 else {
			if((list.length > 1) && (Number.isInteger(myIndex))){
				
				console.log(chalk.red.bold(`Choose a whole number between 1 - ${list.length}`))
			}
			else if ((typeof myIndex === "string")){
				console.log(chalk.red.bold(`Whole number expected!`))
			}
			else {
				console.log(chalk.red.bold(`Whole number expected!`))
			}
		}

		// console.log(chalk.red.bold("Listing all Notes:"))
		// // console.log(chalk.green(list.map(value => value.note)));
		// for(let i = 0; i < list.length; i++){
		// 	console.log(chalk.green(`${i+1}: ${list[i]}`))
		// } 
	} catch (error) {
		console.log("error in listNote function")
		console.log(error)
	}
}