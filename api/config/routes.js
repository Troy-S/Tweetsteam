var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var authController  = require('./api/controllers/authController');
var UsersController = require)'./api/controlleres/usersController');

router.post('/authorize', authController.login);
router.post('/join', authController.joinup);

router.route('/users')
  .get(usersController.indexUsers)
  .post(usersController.createUser)

router.route('/users/:id')
  .get(usersController.showUser)
  .put(agentsController.updateAgent)
  .delete(usersController.deleteUser)

module.exports = router;