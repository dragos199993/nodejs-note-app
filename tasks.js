const fs = require("fs");

// Other tasks
const fetchNotes = () => {
  try {
    let noteString = fs.readFileSync("note-data.json");
    return (notes = JSON.parse(noteString));
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFile("note-data.json", JSON.stringify(notes), err => {
    if (err) console.log("Something went wrong");
  });
};

// Main tasks
const add = (title, body) => {
  notes = [];
  note = { title, body };

  fetchNotes();

  let duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const list = () => {
  fetchNotes();
  notes.forEach((note, i) => {
      console.log(`-------------------Note ${++i}------------------------`);
      console.log(`  Title: ${note.title}`);
      console.log(`  Body:  ${note.body}`);
  });
};

const get = title => {
    fetchNotes();
    currentNote = notes.filter(note => note.title === title);
    debugger;
    if(currentNote.length != 0){
        console.log(`-----------`);
        console.log(`Title: ${currentNote[0].title}`);
        console.log(`Body: ${currentNote[0].body}`);
        console.log(`-----------`);
    }else{
        console.log(`Title '${title}' not found`);
    }
};

const remove = title => {
    fetchNotes();
    updatedNotes = notes.filter( note => note.title !== title);
    if(updatedNotes !== notes){
        saveNotes(updatedNotes);
        console.log(`${title} removed successfully`);
    }else{
        console.log(`${title} was not found in the record to remove it`);
    }
};

module.exports = {
  add,
  list,
  get,
  remove
};
