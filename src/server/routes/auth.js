
var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
var passport = require('../lib/auth');
var helpers = require('../lib/helpers');

router.get('/login', helpers.loginRedirect, function(req, res, next) {
  res.render('login', { message: req.flash('message') });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        } else {
          req.flash('message', {
            status: 'success',
            value: 'Welcome!'
          });
          return res.redirect('/');
        }
      });
    }
  })(req, res, next);
});

router.get('/register', helpers.loginRedirect, function(req, res, next) {
  res.render('register', { message: req.flash('message') });
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  knex('users').where('email', email)
    .then(function(data){
      if(data.length) {
          req.flash('message', {
            status: 'danger',
            value: 'Email already exists.!'
          });
          return res.redirect('/auth/register');
      } else {
        var hashedPassword = helpers.hashing(password);
        knex('users')
        .returning('*')
        .insert({
          email: email,
          password: hashedPassword
        })
        .then(function(data) {
          req.logIn(data[0], function(err) {
            if (err) {
              return next(err);
            } else {
              req.flash('message', {
                status: 'success',
                value: 'Welcome!'
              });
              return res.redirect('/');
            }
          });
        })
        .catch(function(err) {
          return next(err);
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

router.get('/logout', helpers.ensureAuthenticated, function(req, res, next) {
  req.logout();
  req.flash('message', {
    status: 'success',
    value: 'Goodbye!'
  });
  res.redirect('/');
});


module.exports = router;