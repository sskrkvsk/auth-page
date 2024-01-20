var express = require('express');
var router = express.Router();


router.get('/:xyz', function(req, res, next) {
    res.render('error');
  });

module.exports = router;