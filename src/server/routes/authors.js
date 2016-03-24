var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var helpers = require('../auth/helpers');


router.get('/new', helpers.ensureAdmin, function(req, res, next) {
  res.render('./authors/add-author', {
    user: req.user,
    messages: req.flash('messages')
  });
});

// get ALL authors
router.get('/', function(req, res, next) {
  queries.getAuthors()
  .then(function(authors){
    res.render('./authors/all-authors', {
      user: req.user,
      messages: req.flash('messages'),
      authors: authors
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// get SINGLE author
router.get('/:id', function(req, res, next) {
  queries.getSingleAuthor(parseInt(req.params.id))
  .then(function(author){
    res.render('./authors/single-author', {
      user: req.user,
      messages: req.flash('messages'),
      author: author[0]
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// add new author
router.post('/', helpers.ensureAdmin, function(req, res, next) {
  queries.addAuthor(req.body)
  .then(function(author){
    req.flash('messages', {
      status: 'success',
      value: 'Author added!'
    });
    res.redirect('/authors/new');
  })
  .catch(function(err){
    return next(err);
  });
});


module.exports = router;
