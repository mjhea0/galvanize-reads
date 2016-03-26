var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var databaseHelpers = require('../db/helpers');
var helpers = require('../auth/helpers');


router.get('/new', helpers.ensureAdmin, function(req, res, next) {
  res.render('./books/add-book', {
    user: req.user,
    messages: req.flash('messages')
  });
});

router.get('/:id/edit', helpers.ensureAdmin, function(req, res, next) {
  queries.getSingleBook(parseInt(req.params.id))
  .then(function(book){
    res.render('./books/edit-book', {
      user: req.user,
      messages: req.flash('messages'),
      book: book[0]
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// get ALL books
router.get('/', function(req, res, next) {
  queries.getBooks()
  .then(function(books){
    var genres = databaseHelpers.filterGenres(books);
    res.render('./books/all-books', {
      user: req.user,
      messages: req.flash('messages'),
      books: books,
      genres: genres
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
      messages: req.flash('messages'),
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
    req.flash('messages', {
      status: 'success',
      value: 'Book added!'
    });
    res.redirect('/books/new');
  })
  .catch(function(err){
    return next(err);
  });
});

// update book
router.post('/:id/edit', helpers.ensureAdmin, function(req, res, next) {
  queries.updateBook(parseInt(req.params.id), req.body)
  .then(function(book){
    req.flash('messages', {
      status: 'success',
      value: 'Book updated!'
    });
    res.redirect('/books/' + req.params.id + '/edit');
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
