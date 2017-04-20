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
  models.Tag.find({}, function(err, tags){
  	if (err) {
  		return next(err)
  	} else {
  		res.render('tags', {title: '标签页', tags: tags});
  	}
  })
})

router.get('/tags/:name', function(req, res, next) {
    models.Post.find({tags: req.params.name}, function(err, posts) {
        if (err) {
            return next(err);
        }else {
            res.render('tag-posts', {posts, posts});
        }
    })
})

module.exports = router;
