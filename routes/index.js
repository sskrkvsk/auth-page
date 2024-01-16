var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Ass' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Ass' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Ass' });
});

module.exports = router;