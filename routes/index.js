var express = require('express');
var router = express.Router();
var db = require('../db');
const { name } = require('ejs');


// Home route
router.get('/', function(req, res, next) {
  if (!req.user) {
    res.render('login', { title: 'Ass' });
  } else {
    const id = req.user.id;
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

// router.get('/', function(req, res, next) {
//   console.log(req.user);
//   if (!req.user) {
//     res.render('login', { title: 'Ass' });
//   } else {
//     next();
//   }
// }, function(req, res, next) {
//   res.render('home', { user: req.user });
// });
module.exports = router;