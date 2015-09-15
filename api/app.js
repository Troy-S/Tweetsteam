var AYLIENTextAPI = require('aylien_textapi');
var request = require("request");
var express = require("express");
var app = express();

// Setup summary API
var textapi = new AYLIENTextAPI({
  application_id:  "5989941e",
  application_key: "83b717533f014a70eabdd372ae08ae44"
});

app.set("views", "./views");
app.set('view engine', "ejs");

// Serve all js, css, html from the public folder
app.use(express.static(__dirname + '/public'));

function getHashtags(newsItem) {
  console.log("Grabbing tags for: " + newsItem.title);

  textapi.hashtags({
    text: newsItem.contents,
    title: newsItem.title
  }, function(error, response) {
    if (error === null) {
      console.log(response.hashtags)
      return response.hashtags;
    } else {
      console.log(error);
      return null;
    }
  });
}

// Express routehandler
function fetchHashtags(req, res, next) {
  // Setup steam parameters
  var maxlength = "1000";
  var format = "json";
  var appid = "440";
  var count = "5";
  var url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid="+appid+"&count="+count+"&maxlength="+maxlength+"&format="+format;

  request(url, function(error, response, html){
    var news     = JSON.parse(response.body).appnews.newsitems;
    var counter  = 0;
    req.posts    = [];

    for (var i = 0; i < news.length; i++) {
      
      getHashtags(news[i], function(data){
        var post = {
          title: news[i].title,
          url: news[i].url,
          contents: news[i].contents,
          hashtags: data
        }

        if (post.hashtags) req.posts.push(post);
      });
    };

    res.render("index", { posts: req.posts });
  });
};

app.get("/", fetchHashtags);

app.listen(3000);