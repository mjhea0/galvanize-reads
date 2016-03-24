var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var helpers = require('../auth/helpers');


router.get('/new', helpers.ensureAdmin, function(req, res, next) {
  res.render('./books/add-book', {
    user: req.user,
    message: req.flash('message')
  });
});

// get ALL books
router.get('/', function(req, res, next) {
  queries.getBooks()
  .then(function(books){
    res.render('./books/all-books', {
      user: req.user,
      books: books
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// get SINGLE book
router.get('/:id', function(req, res, next) {
  queries.getSingleBook(parseInt(req.params.id))
  .then(function(book){
    res.render('./books/single-book', {
      user: req.user,
      book: book[0]
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// add new book
router.post('/', helpers.ensureAdmin, function(req, res, next) {
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

// remove book
router.delete('/:id', helpers.ensureAdmin, function(req, res, next) {
  queries.deleteBook(parseInt(req.params.id))
  .then(function(book){
    res.status(200).json({ status: 'success' });
  })
  .catch(function(err){
    res.status(500).json({ status: 'error' });
  });
});


module.exports = router;
