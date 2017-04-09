var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    permission: Number
})

var commentSchema = new Schema({
    author: userSchema,
    pub_date: {type: Date, default: Date.now},
    content: String,
})

var categorySchema = new Schema({
    name: String
})

var postSchema = new Schema({
    title: String,
    author: userSchema,
    content: String,
    html: String,
    summary: String,
    tags: [String],
    pub_date: {type: Date, default: Date.now},
    comments: [commentSchema]
});


var Post = mongoose.model('Post', postSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
    Post: Post,
    User: User
}


// var p1 = new Post({title: "The Python", author: "gdb", content: "hello worlddewuidhudiewuhdw", tags: ["python", "default"]});
// p1.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');   
//   }
// })


