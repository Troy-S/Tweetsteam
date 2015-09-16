angular
  .module('Tweetsteam')
  .factory('Post', Post);

Post.$inject = ['$resource'];
function Post($resource) {
  var url = 'http://localhost:3000/api'; //Not sure if /api is correct

  return $resource(
    url+'/posts/:id',
    { id: '@id'},
    { 'get'      : { method: 'GET'},
      'save'     : { method: 'POST'},
      'query'    : { method: 'GET', isArray: true},
      'remove'   : { method: 'DELETE'},
      'delete'   : { method: 'DELETE'} 
    }
  );
}