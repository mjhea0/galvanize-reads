var express = require('express');
var router = express.Router();

var queries = require('../db/queries');


router.get('/', function(req, res, next) {
  res.render('index', {
    user: req.user,
    messages: req.flash('messages')
  });
});

router.get('/results', function(req, res, next) {
  res.render('results', {
    user: req.user,
    results: req.session.results,
    messages: req.flash('messages')
  });
  delete req.session.results;
});

router.post('/search', function(req, res, next) {
  var term = req.body.term;
  queries.getBooks()
  .then(function(results) {
    var allResults = results.filter(function(el) {
      return el.genre.toLowerCase() === term.toLowerCase();
    });
    if (allResults.length) {
      req.session.results = allResults;
      res.redirect('/results');
    } else {
      req.flash('messages', {
        status: 'danger',
        value: 'No results. Please try again.'
      });
      res.redirect('/');
    }
  })
  .catch(function(err) {
    return next(err);
  });
});


module.exports = router;
