var express  = require("express");
var app      = express();
var mongoose = require('mongoose');
// var passport = require("passport");

var Post = require("./models/post");

mongoose.connect("mongodb://localhost:27017/tweetsteam")

app.set("views", "./views");
app.set('view engine', "ejs");
// app.set("views", "./public");
// app.engine('html', require('ejs').renderFile);
// Setup Passport
// require('./config/passport')(passport);

// Serve all js, css, html from the public folder
// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  Post.find({}, function(err, posts){
    if (err) return res.status(500).send(err);
    res.render('index', { posts: posts});
  });
});

app.listen(3000);