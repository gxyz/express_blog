var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    permission: Number,
    avatar: String,
    desc: String
})

var commentSchema = new Schema({
    author: userSchema,
    pub_date: {type: Date, default: Date.now},
    content: String,
    postId: Schema.Types.ObjectId
})

// commentSchema.methods.getAuthor = function() {
//     return this.model('User').findOne({_id: this.author}, function(err, user) {
//         if (err) {
//             return err;
//         } else {
//             return user;
//         }
//     });
// } 

var categorySchema = new Schema({
    name: String
})

var tagScheme = new Schema({
    name: {
        type: String,
        unique: true
    }
})

var postSchema = new Schema({
    title: String,
    author: Schema.Types.ObjectId,
    content: String,
    html: String,
    summary: String,
    tags: [String],
    pub_date: {type: Date, default: Date.now},
    comments: [commentSchema]
});



// 创建Model
var Post = mongoose.model('Post', postSchema);
var User = mongoose.model('User', userSchema);
var Tag = mongoose.model('Tag', tagScheme);
var Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Post: Post,
    User: User,
    Tag: Tag,
    Comment: Comment
}


// var p1 = new Post({title: "The Python", author: "gdb", content: "hello worlddewuidhudiewuhdw", tags: ["python", "default"]});
// p1.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');   
//   }
// })


