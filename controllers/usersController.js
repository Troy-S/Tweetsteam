var User = require('../models/user');

function indexUsers(req, res) {
  User.find(function(error, users) {
    if (error) return res.status(404).json({ message: 'Subscribers'});
    return res.status(200).send(users);
  });
}

function createUser(req, res) {
  var User = new User(req.body);
  user.save(function(error) {
    if (error) return res.status(403).send ({ message: 'Account successfully created'})
    return res.status(200).send(user);
  });
}

function showUser(req, res) {
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send ({ message: 'Hello'})
    return res.status(200).send(user);
  });
}

function updateUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}), function(error, user) {
    if (error) return res.status(404).send({ message: 'Hello'})

    if (req.body.full_name) user.full_name = req.body.full_name;
    if (req.body.email) user.email = req.body.email;

    user.save(function(error) {
      if (error) return res.status(500).send({ message: 'Update failed'})
      return res.status(200).send(user);
    });
  }
}

function deleteUser(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({ message: 'User deleted'})
  })
  return;
}

module.exports = {
  indexUsers: indexUsers,
  createUser: createUser,
  showUser: showUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}