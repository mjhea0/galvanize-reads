var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {
    user: req.user,
    messages: req.flash('messages')
  });
});


module.exports = router;
