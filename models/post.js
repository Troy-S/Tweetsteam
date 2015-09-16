var mongoose = require("mongoose");

var hashtagSchema = new mongoose.Schema({
  tag: String
});

var postSchema = new mongoose.Schema({
  title: String,
  author: String,
  contents: String,
  url: String,
  hashtags: [hashtagSchema]
});

module.exports = mongoose.model("Post", postSchema);