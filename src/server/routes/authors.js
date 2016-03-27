var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var databaseHelpers = require('../db/helpers');
var authHelpers = require('../auth/helpers');
var routeHelpers = require('./helpers');


router.get('/new', authHelpers.ensureAdmin, function(req, res, next) {
  res.render('./authors/add-author', {
    user: req.user,
    messages: req.flash('messages')
  });
});

router.get('/:id/edit', authHelpers.ensureAdmin, function(req, res, next) {
  queries.getSingleAuthor(parseInt(req.params.id))
  .then(function(author){
    res.render('./authors/edit-author', {
      user: req.user,
      messages: req.flash('messages'),
      author: author[0]
    });
  })
  .catch(function(err){
    return next(err);
  });
});

// get ALL authors
router.get('/', function(req, res, next) {
  var currentPage = 0;
  if (req.query.page) {
    currentPage += parseInt(req.query.page);
  } else {
    currentPage = 1;
  }
  queries.getAuthors()
  .then(function(authors){
    var totalAuthors = authors.length;
    var lastNames = databaseHelpers.filterData(authors, 'last_name');
    var groupedAuthors = routeHelpers.createChunks(authors);
    var pageCount = Math.ceil(totalAuthors / 10);
    res.render('./authors/all-authors', {
      user: req.user,
      messages: req.flash('messages'),
      authors: groupedAuthors[currentPage-1],
      lastNames: lastNames,
      totalAuthors: totalAuthors,
      pageCount: pageCount,
      currentPage: currentPage
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
router.post('/', authHelpers.ensureAdmin, function(req, res, next) {
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

// update author
router.post('/:id/edit', authHelpers.ensureAdmin, function(req, res, next) {
  queries.updateAuthor(parseInt(req.params.id), req.body)
  .then(function(author){
    req.flash('messages', {
      status: 'success',
      value: 'Author updated!'
    });
    res.redirect('/authors/' + req.params.id + '/edit');
  })
  .catch(function(err){
    return next(err);
  });
});

// remove author
router.delete('/:id', authHelpers.ensureAdmin, function(req, res, next) {
  queries.deleteAuthor(parseInt(req.params.id))
  .then(function(author){
    res.status(200).json({ status: 'success' });
  })
  .catch(function(err){
    res.status(500).json({ status: 'error' });
  });
});


module.exports = router;
