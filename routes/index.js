var express = require('express');
var router = express.Router();

const tweetData = require('../data/tweets.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(tweetData));
});

module.exports = router;
