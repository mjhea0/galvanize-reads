var bcrypt = require('bcrypt');

function ensureAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    req.flash('messages', {
      status: 'danger',
      value: 'Please login.'
    });
    return res.redirect('/auth/login');
  }
}

function ensureAdmin(req, res, next) {
  if (req.user) {
    if(req.user.admin) {
      return next();
    }
  }
  req.flash('messages', {
    status: 'danger',
    value: 'You do not have permission to view that page.'
  });
  return res.redirect('/');
}


function loginRedirect(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}

function hashing(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin,
  loginRedirect: loginRedirect,
  hashing: hashing,
  comparePassword: comparePassword
};