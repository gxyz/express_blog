var express = require('express');
var router = express.Router();
var marked = require('marked');
var models = require("../models/post");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:title', function(req, res, next) {
  models.Post.findOne({title: req.params.title},function(err, post) {
    if (err) {
      return next(err);
    } else {
      res.send(post.html);
    }
  });  
})



module.exports = router;
