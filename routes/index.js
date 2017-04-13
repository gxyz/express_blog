var express = require('express');
var router = express.Router();
var models = require("../models/post");


/* GET home page. */
router.get('/', function(req, res, next) {
  models.Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    } else {
      res.render('index', { title: 'Express', posts: posts });
    }
  });
});

router.get('/tags', function(req, res, next) {
  
})

module.exports = router;
