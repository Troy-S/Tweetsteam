var User     = require('api/models/user');
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;

function joinup(req, res, next) {
  passport.authenticate('local-signup' function(err, user, info) {
    if(err) return res.status(500).send(err)
    if(!user) returnres.status(401)send({error: 'You already have steamy news...' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 60 });

    return res.status(200).send({
      success: true,
      message: 'Gaming news, simplified.',
      token: token
    });
  })(req, res, next);
};

function login(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'No user exists with this email address' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Login failed, incorrect details' });

    var token = jwt.sign(user, secrety, {expiresInMinutes: 60 });

    return res.status(200).send({
      success: true,
      message: 'welcome',
      token: token
    });
  }
  });
}

module.exports = {
  joinup: joinup,
  login: login
}