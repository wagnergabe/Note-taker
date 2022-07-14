const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
var notesInput;


app.get("/notes", (req, res) => {
  // Reads the notes from JSON file
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // Parse data to get an array of objects
    notesInput = JSON.parse(data);
    //
    res.json(notesInput);
  });
});

//Add note 
app.post("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    
    notesInput = JSON.parse(data);

    let newNote = req.body;
    let currentID = notesInput.length;

    newNote.id = currentID + 1;

    notesInput.push(newNote);

    notesInput = JSON.stringify(notesInput);

    writeFileAsync("db/db.json", notesInput).then(function (data) {
      console.log("Note Successful");
    });
    res.json(notesInput);
  });
});

//Delete Note
app.delete("/notes/:id", (req, res) => {
  let selID = parseInt(req.params.id);

  for (let i = 0; i < notesInput.length; i++) {
    if (selID === notesInput[i].id) {
      notesInput.splice(i, 1);
      let noteJSON = JSON.stringify(notesInput, null, 2);

      writeFileAsync("db/db.json", noteJSON).then(function () {
        console.log("Note has been deleted.");
      });
    }
  }
  res.json(notesInput);
});

//Source app.delete function https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array
//
module.exports = app;