var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

// get ALL books
router.get('/', function(req, res, next) {

  queries.getBooks()
  .then(function(books){
    res.render('books', {
      user: req.user,
      books: books
    });
  })
  .catch(function(err){
    return next(err);
  });
});


module.exports = router;
