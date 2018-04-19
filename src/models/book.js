const mongoose = require('mongoose');

// Book schema
const bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  genre:{
    type: String,
    required: true
  },
  description:{
    type: String
  },
  author:{
    type: String,
    required: true
  },
  publisher:{
    type: String,
    required: true
  }
},
{ timestamps: true}
);

// Init Book
const Book = mongoose.model('Book', bookSchema)

// Export Schema
module.exports = mongoose.model('Book', bookSchema)

// Add a book function
 module.exports.addBook = function addBook(newBook, callback){
  Book.create(newBook, callback);
 }
