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
      let notelist = {}
      return await Note.find(notelist);

  } catch (error) {
      console.log("error in listNote function")
      console.log(error)
  }
}