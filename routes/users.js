var express = require('express');
var router = express.Router();
var models = require("../models/post");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add-user', function(req, res, next) {
  var user = new models.User({name: "gdb", password: "gaodebao712", email: "1178717119@qq.com", permission: 1})
  user.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('添加成功');   
    }
    res.send("添加用户成功");
  })
})

router.get('/all-user', function(req, res) {
  models.User.find({}, function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = router;
