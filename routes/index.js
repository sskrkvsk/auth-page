var express = require('express');
var router = express.Router();
// var db = require('../db');


// Home route
router.get('/', function(req, res, next) {
  if (!req.user) {
    res.render('login', { title: 'Ass' });
  } else {
    res.render('home', { user: req.user });
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