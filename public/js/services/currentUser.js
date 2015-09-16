angular
  .module('Tweetsteam')
  .factory('CurrentUser', CurrentUser);

CurrentUser.$inject = ['$window', 'jwtHelper'];
function CurrentUser($window, jwtHelper){

  // function check(){
  //   var token = $window.localtorage.getItem('token')
  //   if (token) return login(token);
  // }

  // function login(token){
  //   var user = jwtHelper.decodeToken(token);

  //   if (user) {
  //     $window.localStorage.setItem('token', token)
  //     return user;
  //   } else {
  //     return false;
  //   }

  // }

  // function logout(){
  //   $window.localStorage.removeItem('token')
  //   return false;
  // }

  // return {
  //   check: check,
  //   login: login,
  //   logout: logout
  // }

}