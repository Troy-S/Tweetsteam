var Aylien   = require("aylien_textapi");
var request  = require("request");
var colors   = require("colors");
var mongoose = require("mongoose");
var Post     = require("../models/post");

// Connect to the database
mongoose.connect("mongodb://localhost:27017/tweetsteam")

// Setup summary API
var textapi = new Aylien({
  application_id:  "5989941e",
  application_key: "83b717533f014a70eabdd372ae08ae44"
});

function getHashtags(newsItem, callback) {
  console.log("Grabbing tags for: " + newsItem.title);

  textapi.hashtags({
    text: newsItem.contents,
    title: newsItem.title
  }, function(error, response) {
    if (error === null) {
      newsItem["hashtags"] = response.hashtags;
      callback(null, newsItem);
    } else {
      callback(error, null);
    }
  });
}

// Express routehandler
function fetchHashtags() {
  // Setup steam parameters
  var maxlength = "1000";
  var format = "json";
  var appid = "440";
  var count = "5";
  var url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid="+appid+"&count="+count+"&maxlength="+maxlength+"&format="+format;

  request(url, function(error, response, html){
    var news     = JSON.parse(response.body).appnews.newsitems;
    var counter  = 0;

    for (var i = 0; i < news.length; i++) {
      
      getHashtags(news[i], function(error, newsItemWithHashtags){
        if (error) console.log(error.red);

        Post.findOne({ "url": newsItemWithHashtags.url }, function(err, post) {
          if (err) console.log(err.red);

          if (post) {
            Post.findByIdAndUpdate(post._id, {new: true}, function(err, updatedPost){
              if (error) return console.log(error.message.red);

              var message = updatedPost.title + " was updated!"
              console.log(message.blue);
            });
          } else {
            var newPost      = new Post();
            newPost.title    = newsItemWithHashtags.title;
            newPost.author   = newsItemWithHashtags.author;
            newPost.contents = newsItemWithHashtags.contents;

            newsItemWithHashtags.hashtags.forEach(function(tag, index) {
              newPost.hashtags.push({ tag: tag });
            });

            newPost.save(function(error) {
              if (error) return console.log(error.message.red);
              
              var message = newsItemWithHashtags.title + " was created!"
              console.log(message.green);
            })
          };
        })

      });
    };
  });
};

fetchHashtags();