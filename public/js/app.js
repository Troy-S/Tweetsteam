angular
  .module('Tweetsteam', ['ngResource', 'ui.router', 'angular-jwt'])
  .config(MainRouter);

// angular
//   .module('Tweetsteam')
  // .run(function($http, $window){
  //   var token = $window.localStorage.getItem('token');
  //   $http.defaults.headers.commmon["Authorization"] = 'Bearer' + token;
  // })

// Route with ui
function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('feed', {
      url:'/feed',
      templateUrl:'js/views/feed.html'
    })
    .state('register', {
      url:'/register',
      templateUrl:'js/views/register.html'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'js/views/login.html'
    });

  $urlRouterProvider.otherwise('/');
}