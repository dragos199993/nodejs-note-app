const fs = require("fs");

const note = require("./tasks");
const yargs = require("yargs");

const _ = require("lodash");

const command = process.argv[2];

const argv = yargs.argv;
if (command == "add") {
  let addedNote = note.add(argv.title, argv.body);
  if (addedNote) {
    debugger;
    console.log(`------------`);
    console.log(`Created note`);
    console.log(`------------`);
    console.log(`Title:   '${addedNote.title}'`);
    console.log(`Content: '${addedNote.body}' was added`);
  } else console.log(`This note title already exists`);
} else if (command == "list") {
  note.list();
} else if (command == "get") {
  note.get(argv._[1]);
} else if (command == "remove") {
  note.remove(argv._[1]);
} else {
  console.log("Command doesn't exists");
}
