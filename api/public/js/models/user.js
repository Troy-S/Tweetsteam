angular
.module('Tweetsteam');
.factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  var url = 'http://localhost:3000/api'; //Not sure if /api is correct

  return $resource(
    url+'/user/:id',
    { id: '@id'},
    { 'get'      : { method: 'GET'},
    'save'     : { method: 'POST'},
    'query'    : { method: 'GET'},
    'remove'   : { method: 'DELETE'},
    'delete'   : { method: 'DELETE'},
    'authorize': {
      url: url+ '/authorize',
      method: 'POST'
    },
    'join':{
      url: url+ '/join',
      method: 'POST'
    } 
  }
  );
}