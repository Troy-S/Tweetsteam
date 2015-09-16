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
  .state('join', {
    url:'/join',
    templateUrl:'./public/js/views/join.html'
  })
  .state('authorize', {
    url:'/authorize',
    templateUrl: './public/js/views/authorize.html'
  });

  $urlRouterProvider.otherwise('/');
}