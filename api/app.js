var express  = require("express");
var app      = express();
var mongoose = require("mongoose");
var passport = require(z)

mongoose.connect("mongodb://localhost:27017/tweetsteam")

app.set("views", "./views");
app.set('view engine', "ejs");

// Setup Passport
require('./config/passport')(passport);

// Serve all js, css, html from the public folder
app.use(express.static(__dirname + '/public'));

app.listen(3000);