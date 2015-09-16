var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var authController  = require('../controllers/authController');
var usersController = require('../controllers/usersController');

router.post('/authorize', authController.login);
router.post('/join', authController.joinup);

router.route('/users')
  .get(usersController.indexUsers)
  .post(usersController.createUser)

router.route('/users/:id')
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;