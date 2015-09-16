angular
  .module('Tweetsteam')
  .controller('postsController', PostsController);

PostsController.$inject = ['Post'];
function PostsController(Post){

  var self   = this;
  self.posts = []

  self.posts = Post.query();
}