var express = require('express');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var db = require('../db');
var router = express.Router();

passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "/oauth2/redirect/github"
  },
  function(accessToken, refreshToken, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
        'https://www.github.com',
        profile.id
      ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) {
          db.run('INSERT INTO users (name) VALUES (?)', [
            profile.displayName
          ], function(err) {
            if (err) { return cb(err); }
    
            var id = this.lastID;
            db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
              id,
              'https://www.github.com',
              profile.id
            ], function(err) {
              if (err) { return cb(err); }
              var user = {
                id: id,
                name: profile.displayName
              };
              return cb(null, user);
            });
          });
        } else {
          db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
            if (err) { return cb(err); }
            if (!row) { return cb(null, false); }
            return cb(null, row);
          });
        }
      });
  }
));

// User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     return done(err, user);
//   });

router.get('/login/federated/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/oauth2/redirect/github', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;