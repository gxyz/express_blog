var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var models = require("../models/post");
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;


/* GET Login page. */
router.get('/signin', checkNotLogin, function(req, res, next) {
    res.render('auth/signin');
});

/* POST Login page */ 
router.post('/signin', checkNotLogin, function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    models.User.findOne({email: email}, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('back');
        }

        // 检查密码是否匹配
        if (sha1(password) != user.password) {
            req.flash('error', '用户名或密码错误');
            return res.redirect('back');
        }

        req.flash('success', '登录成功');
        
        // 用户信息写入 session，先把啊用户的密码属性删除
        delete user.password;
        req.session.user = user;
        // 跳转到主页
        res.redirect('/');
    })
})

/* 注册页面 get */
router.get('/signup', checkNotLogin, function(req, res, next) {
    res.render("auth/signup");
})

/* 注册页面 post */
router.post('/signup', checkNotLogin, function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword

    try {
        if(!(username.length >= 3 && username.length <= 15)) {
            throw new Error('名字限制在 1-10 个字符之间');
        }
        if (password < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password != repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        // 注册失败
        req.flash('error', e.message);
        return res.redirect('/auth/signup');
    }

    password = sha1(password);

    var user = new models.User({
        name: username,
        email: email,
        password: password,
        permission: 1
    })
    user.save(function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.redirect("/");
})

router.get('/signout', checkLogin, function(req, res, next) {

  // 清空 session 中用户信息
  req.session.user = null;
  
  req.flash('success', '登出成功');
  
  // 登出成功后跳转到主页
  res.redirect('/');
});

module.exports = router;
