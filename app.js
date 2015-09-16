var express    = require("express");
var expressJWT = require("express-jwt");
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var passport   = require("passport");
var app        = express();
var config     = require('./config/config');
var port       = process.env.PORT || 3000;

mongoose.connect(config.database);

require('./config/passport')(passport);

var secret = config.secret; //move to env?

//MiddleWHAT
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static("public"));

app.get('/', function(req, res) {
  // Post.find({}, function(err, posts){
  //   if (err) return res.status(500).send(err);
  //   res.render('index', { posts: posts});
  // });

  res.render("index.html");
});

// app
//   .use('/api', expressJWT({ secret: config.secret})
//   .unless({ path: ['/api/authorize', '/api/join'], method: 'post'}));

// //no token?
// app.use(function (error, request, response, next) {
//   if (error.name === 'UnathorizedError') {
//     response.status(401).json({ message: 'Not authroized to access this page'});
//   }
// });

//CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(passport.initialize());

// Req routes
var routes = require('./config/routes');
app.use('/api', routes);

// Start Server
app.listen(port, function () {
  console.log( "Express server listening on port " + port);
});

// var express  = require("express");
// var app      = express();
// var mongoose = require('mongoose');
// // var passport = require("passport");

// var Post = require("./models/post");

// mongoose.connect("mongodb://localhost:27017/tweetsteam")

// app.set("views", "./views");
// app.set('view engine', "ejs");
// // app.set("views", "./public");
// // app.engine('html', require('ejs').renderFile);
// // Setup Passport
// // require('./config/passport')(passport);

// // Serve all js, css, html from the public folder
// // app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//   Post.find({}, function(err, posts){
//     if (err) return res.status(500).send(err);
//     res.render('index', { posts: posts});
//   });
// });

// app.listen(3000);