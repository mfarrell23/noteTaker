const express = require('express');
const { fstat } = require('fs');
const path = require('path');
// Helper method for generating unique ids
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

// GET request for reviews
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.status(200).json(notes);
});


// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
//   const { product, review, username } = req.body;

  // If all the required properties are present
//   if (product && review && username) {
    // Variable for the object we will save
    const newNote = {
    // note_id: uuid(),
        ...req.body
    };
    const notes = require('./db/db.json');
    notes.push(newNote)
    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    fs.writeFile('db/db.json',notes,(err)=>{
        if(err){
        console.log(err)
    }else{
        console.log('new note added')
    }
    })
//   } else {
//     res.status(500).json('Error in posting review');
//   }
});

// GET request for a specific review's upvotes
app.get('/api/upvotes/:review_id', (req, res) => {
  console.info(`${req.method} request received to get upvotes for a review`);
  for (let i = 0; i < reviews.length; i++) {
    const currentReview = reviews[i];
    if (currentReview.review_id === req.params.review_id) {
      res.status(200).json({
        message: `The review with ID ${currentReview.review_id} has ${currentReview.upvotes}`,
        upvotes: currentReview.upvotes,
      });
      return;
    }
  }
  res.status(404).json('Review ID not found');
});

// POST request to upvote a review
app.post('/api/upvotes/:review_id', (req, res) => {
  if (req.body && req.params.review_id) {
    console.info(`${req.method} request received to upvote a review`);
    const reviewId = req.params.review_id;
    for (let i = 0; i < reviews.length; i++) {
      const currentReview = reviews[i];
      if (currentReview.review_id === reviewId) {
        currentReview.upvotes += 1;
        res.status(200).json(`New upvote count is: ${currentReview.upvotes}!`);
        return;
      }
    }
    res.status(404).json('Review ID not found');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
