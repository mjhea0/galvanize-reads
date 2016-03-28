var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
var queries = require('../db/queries');
var passport = require('../auth/index');
var helpers = require('../auth/helpers');


router.get('/login', helpers.loginRedirect, function(req, res, next) {
  req.session.returnTo = req.header('referer');
  res.render('./auth/login', { messages: req.flash('messages') });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      req.flash('messages', {
        status: 'danger',
        value: 'Incorrect email and/or password.'
      });
      return res.redirect('/auth/login');
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        } else {
          req.flash('messages', {
            status: 'success',
            value: 'Welcome!'
          });
          res.redirect(req.session.returnTo || '/');
          delete req.session.returnTo;
        }
      });
    }
  })(req, res, next);
});

router.get('/register', helpers.loginRedirect, function(req, res, next) {
  res.render('./auth/register', { messages: req.flash('messages') });
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  knex('users').where('email', email)
    .then(function(data){
      if(data.length) {
          req.flash('messages', {
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
          password: hashedPassword,
          admin: false
        })
        .then(function(data) {
          req.logIn(data[0], function(err) {
            if (err) {
              return next(err);
            } else {
              req.flash('messages', {
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
  req.flash('messages', {
    status: 'success',
    value: 'Goodbye!'
  });
  res.redirect('/');
});

if (process.env.NODE_ENV === 'development') {
  router.get('/make-admin', helpers.ensureAuthenticated,
    function(req, res, next) {
    queries.makeAdmin(req.user.id)
    .then(function(books){
      req.flash('messages', {
        status: 'success',
        value: 'You are now an admin!'
      });
      res.redirect('/');
    })
    .catch(function(err){
      return next(err);
    });
  });
}


module.exports = router;