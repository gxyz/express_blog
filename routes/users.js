var express = require('express');
var router = express.Router();
var models = require("../models/post");
var checkLogin = require('../middlewares/check').checkLogin;
var multer  = require('multer');   // 上传文件中间件
var uuidV1 = require('uuid/v1');
// var upload = multer({dest: 'public/uploads'})

var storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        cb(null, uuidV1() + '.jpg')
    }
})

var upload = multer({storage: storage})

router.get('/:name', checkLogin, function(req, res, next) {
    models.User.findOne({name: req.params.name}, {name:1, email:1, avatar: 1}, function(err, user) {
        if (err) {
            next(err);
        } else {
            res.render('user/user', {user: user});
        }
    })
})

router.get('/:id/posts', checkLogin, function(req, res, next) {
    models.Post.find({author: req.params.id}, function(err, posts) {
        if(err) {
            next(err);
        } else {
            res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(posts))
        }
    })
})

router.post('/change-avatar', upload.single('avatar'), function(req, res, next) {
    models.User.update({name: req.session.user.name}, {avatar: req.file.filename}, function(err, raw) {
          if (err) return handleError(err);
          console.log('The raw response from Mongo was ', raw);
    })
    res.redirect('/users/' + req.session.user.name);
})

module.exports = router;
