angular
  .module('Tweetsteam')
  .controller('usersController', UsersController);

UsersController.$inject = ['User'];
function UsersController(User){
//   var self = this;

//   init();

//   function init(){
//     self.currentUser = CurrentUser.check();

//     if (self.currentUser) {
//       getUsers();
//     } else {
//       self.all  = [];
//       self.user = {};
//     }
//   }
// }

// function getUsers(){
//   User.query(function(response){
//     self.all = response;
//   });
// }

// function login(response){
//   self.currentUser = CurrentUser.login(response.token)
//   init();
// }

// function logout(){
//   self.currentUser = CurrentUser.logout()
//   init();
// }

// self.authorize = function(){
//   User.authorize(self.user, login);
// }

// self.join = function(){ 
//   User.join(self.user, login);
//   login();
// }

// return self;
}