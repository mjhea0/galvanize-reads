var express = require('express');
var router = express.Router();

var queries = require('../db/queries');
var helpers = require('../auth/helpers');


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


module.exports = router;
