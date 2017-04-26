var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var models = require("../models/post");
var marked = require('marked');
var checkLogin = require('../middlewares/check').checkLogin;



router.get('/add-post', checkLogin, function(req, res, next) {
  res.render('add-post');
})

router.post('/add-post', checkLogin, function(req, res, next) {

  var tags = req.body.tags.replace(/\s+/g, "").split(",") || "default";
  tags.map(function(tag) {
    var t = new models.Tag({
      name: tag
    })
    t.save(function(err){
      console.log(err);
    });
  })

  var post = new models.Post({
    title: req.body.title, 
    author: req.session.user._id,  
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

  res.redirect('/');
})



module.exports = router;
