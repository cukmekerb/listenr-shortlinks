var atob = require('atob');
var Feed = require('rss-to-json');
var sanitizeHtml = require("sanitize-html");
// disallow all html
var sanitize_options = {
  allowedTags: [], 
  allowedAttributes: []
};
exports.handler = async (event, context) => {
  var rssurl = atob(event.queryStringParameters.showid);
  var json_feed = await Feed.load(rssurl);
  var showdata = {
    image: encodeURI(json_feed.image),
    description: sanitizeHtml(json_feed.description, sanitize_options),
    title: sanitizeHtml(json_feed.title, sanitize_options)
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
