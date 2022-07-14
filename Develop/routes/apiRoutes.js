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


module.exports = app;