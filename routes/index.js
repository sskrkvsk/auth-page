var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    res.render('login');
  } else {
    db.get('SELECT name FROM users WHERE id = ?', [req.user.id], (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (row) {
        var userName = row.name;
        res.render('home', { user: req.user, userName: userName });
      } else {
        console.log('No matching record found.');
        res.render('home', { user: req.user});
      }
    });    
  }
});

module.exports = router;