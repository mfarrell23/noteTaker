const express = require('express');
const path = require('path');
const fs= require('fs');
const notes = require('./db/db.json');
const uuid= require('uuid');


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
        ...req.body
    };
    // pushing note into file
    const notes = require('./db/db.json');
    newNote.id= uuid.v4()
    notes.push(newNote)
    const response = {
      status: 'success',
      body: newNote,
    };
// writing note to file
    console.log(response);
    fs.writeFile('./db/db.json',JSON.stringify(notes, null, 4),(err)=>{
        if(err){
        console.log(err)
    }else{
        console.log('new note added')
        console.log(`PORT is: ${process.env.PORT}`);
    }
    })
});


  
app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT} 🚀`)
    );
