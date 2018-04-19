// Bring in modules
const express = require('express');
const passport = require('passport');

// Bring in model
const Book = require('../models/book')

// Init router
const router = express.Router();

// Add A book
router.post('/', (req, res)=>{
  const newBook = new Book({
  title: req.body.title,
  genre: req.body.genre,
  description: req.body.description,
  author: req.body.author,
  publisher: req.body.publisher
  })
  Book.addBook(newBook, (err, book) => {
    if(err){
      throw err;
    }else {
      res.json(book);
    }
  });
});


// A patch request only if authentication
router.patch('/:_id', passport.authenticate('jwt',{session:false}), (req, res) => {
    const patchBook = req.body;
    const query = {_id:req.params._id};
    Book.update(query, {$set: patchBook}, (err, book) =>{
      if(err){
          throw err;
        }else {
          res.json(book);
        }
     });
  });

// export router
module.exports = router;
