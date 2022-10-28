const express = require('express');
const path = require('path');
const fs= require('fs');
const notes = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.status(200).json(notes);
});


// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);


    const newNote = {
    //  note_id: uuid(),
        ...req.body
    };
    // pushing note into file
    const notes = require('./db/db.json');
    notes.push(newNote)
    const response = {
      status: 'success',
      body: newNote,
    };
// writing note to file
    console.log(response);
    fs.writeFile('./db/db.json',JSON.stringify(notes),(err)=>{
        if(err){
        console.log(err)
    }else{
        console.log('new note added')
    }
    })
});
 // Obtain existing reviews
 fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new review
      parsedNotess.push(newNote);

      // Write updated reviews back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
    }
    const response = {
        status: 'success',
        body: newNote,
      };
      console.log(response);
    res.status(201).json(response);
    res.status(500).json('Error in posting note');

  
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
    );
