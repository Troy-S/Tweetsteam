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

app
  .use('/api', expressJWT({ secret: config.secret})
  .unless({ path: ['/api/authorize', '/api/join'], method: 'post'}));

//no token?
app.use(function (error, request, response, next) {
  if (error.name === 'UnathorizedError') {
    response.status(401).json({ message: 'Not authroized to access this page'});
  }
});

//MiddleWHAT
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

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