var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var helpers = require('../auth/helpers');


// get ALL books
router.get('/', function(req, res, next) {
  queries.getBooks()
  .then(function(books){
    res.render('./books/books', {
      user: req.user,
      books: books
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// add new book
router.post('/', function(req, res, next) {
  queries.addBook(req.body)
  .then(function(book){
    req.flash('message', {
      status: 'success',
      value: 'Book added!'
    });
    return res.redirect('/books/new');
  })
  .catch(function(err){
    return next(err);
  });
});


router.get('/new', helpers.ensureAdmin, function(req, res, next) {
  res.render('./books/add-book', {
    user: req.user,
    message: req.flash('message')
  });
});


module.exports = router;
