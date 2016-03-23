var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var knex = require('../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
    knex('users').where('email', email)
    .then(function(data) {
      if (!data.length) {
        return done('Incorrect email.');
      }
      var user = data[0];
      if (helpers.comparePassword(password, user.password)) {
        return done(null, user);
      } else {
        return done('Incorrect password.');
      }
    })
    .catch(function(err) {
      return done('Incorrect email and/or password.');
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  knex('users').where('id', id)
  .then(function(data) {
    return done(null, data[0]);
  })
  .catch(function(err) {
    return done(err);
  });
});


module.exports = passport;