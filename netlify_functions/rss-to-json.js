var Feed = require('rss-to-json');
exports.handler = async (event, context) => {
    var rssurl = decodeURIComponent(event.queryStringParameters.url);
    if (!rssurl) return { statusCode: 404, body: `{"error": "There was no provided RSS URL"}`, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } }
    try {
        var res_len = Number(event.queryStringParameters.items) || 50; // how many results to give
        var start_from = Number(event.queryStringParameters.startfrom) || 0; // where to start from
        var json_feed = await Feed.load(rssurl);
        var new_items = json_feed.items.splice(start_from, res_len);
        var new_feed = JSON.parse(JSON.stringify(json_feed))
        new_feed.items = new_items;
        new_feed = JSON.stringify(new_feed)
        // allitems param
        if(event.queryStringParameters.allitems == 1 || event.queryStringParameters.allitems == "true"){
            new_feed = JSON.stringify(json_feed)
        }
        return {
            headers: {
                "content-type": "application/json",
                "access-control-allow-origin": "*"
            },
            statusCode: 200,
            body: new_feed
        }
    }
    catch (err) {
        return {
            headers: {
                "content-type": "application/json",
                "access-control-allow-origin": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                error: err
            })
        }
    }
}