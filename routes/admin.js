var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var models = require("../models/post");
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/add-post', checkLogin, function(req, res, next) {
  res.render('add-post');
})

router.post('/add-post', checkLogin, function(req, res, next) {

  var author = null;
  models.User.find({}, {limit: 1},function(err, user) {
    if (err) {
      return next(err);
    } else {
      author = user[0];
      console.log(author);
    }
  });

  var post = new models.Post({
    title: req.body.title, 
    author: author,  
    content: req.body.content,
    html: marked(req.body.content),
    summary: marked(req.body.content).replace(/<[^<>]*>/g, '').slice(0, 200) + "...",
    tags: req.body.tags.replace(/\s+/g, "").split(",") || "default"
  })

  post.save(function(err) {
    if (err) {
      console.log(err);
    }
  })

  res.redirect('/posts');
})

module.exports = router;
