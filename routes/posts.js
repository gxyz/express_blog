var express = require('express');
var router = express.Router();
var models = require("../models/post");
var checkLogin = require('../middlewares/check').checkLogin;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  models.Post.findOne({_id: req.params.id},function(err, post) {
    if (err) {
      return next(err);
    } else {
      models.Comment.find({postId: req.params.id}, function(err, comments) {
        if (err) {
            res.render('post', {post: post, comments: null});
        } else {
            res.render('post', {post: post, comments: comments});
        }
      });
    }
  });  
})

router.post('/:id', checkLogin, function(req, res, next) {
  var comment = new models.Comment({
    author: req.session.user._id,
    content: req.body.content,
    postId: req.params.id
  });

  comment.save(function(err) {
    if (err) {
      console.log(err);
    }
  })

  res.redirect('/posts/' + req.params.id);
})

module.exports = router;
