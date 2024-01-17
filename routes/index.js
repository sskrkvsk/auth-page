var express = require('express');
var router = express.Router();
// var db = require('../db');


// Home route
router.get('/', function(req, res, next) {
  
  if (!req.user) {console.log("no user", req.user); res.render('login', { title: 'Ass'});}},
  function(req, res, next) {
    console.log("success", req.user);
  res.render('home', { user: req.user });} );

module.exports = router;