var express = require('express');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');
var router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));
// persist user information in the login session
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// Login route
router.get('/', function(req, res, next) {
  if (!req.user) {res.render('login', { title: 'Ass'});}
  console.log(req.session);

  res.render('success', { user: req.user });
});

router.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/'
}));

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Ass' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Ass' });
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;