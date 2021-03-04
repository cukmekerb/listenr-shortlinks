var Feed = require('rss-to-json');
exports.handler = async (event, context) => {
    var rssurl = decodeURIComponent(event.queryStringParameters.url);
    if (!rssurl) return { statusCode: 404, body: `{"error": "There was no provided RSS URL"}`, headers: { "content-type": "application/json" } }
    try {
        var json_feed = await Feed.load(rssurl);
        json_feed = JSON.stringify(json_feed)
        return {
            headers: {
                "content-type": "application/json"
            },
            statusCode: 200,
            body: json_feed
        }
    }
    catch (err) {
        return {
            headers: {
                "content-type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify({
                error: err
            })
        }
    }
}