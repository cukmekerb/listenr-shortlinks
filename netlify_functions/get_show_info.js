var atob = require('atob');
var Feed = require('rss-to-json');
exports.handler = async (event, context) => {
  var rssurl = atob(event.queryStringParameters.showid);
  var json_feed = await Feed.load(rssurl);
  var showdata = {
    image: json_feed.image,
    description: json_feed.description,
    title: json_feed.title
  };
  showdata = JSON.stringify(showdata);
  return {
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    },
    statusCode: 200,
    body: showdata
  };
};
