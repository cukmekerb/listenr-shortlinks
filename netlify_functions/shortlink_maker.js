// forwards request to google apps script. useful for caching and for getting around adblocks. this is the same as search.js and adder.js
var fetch = require("node-fetch");
exports.handler = async (event, context) => {
  var response;
  try {
    var url = new URL("https://script.google.com/macros/s/AKfycbyLW2i1013p5koGyF7MigAOjnUksqeVmxDfaeV2TRKgzL3ZuG_F/exec");
    for (var i in event.queryStringParameters) {
      url.searchParams.append(i, event.queryStringParameters[i]);
    }
    response = await fetch(url.href);
  }
  catch (err) {
    return {
      headers: {
       "content-type": "application/json",
       "access-control-allow-origin": "*"
      },
      statusCode: 200,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
  var body = await response.text();
  return {
    headers: {
     "content-type": "application/json",
     "access-control-allow-origin": "*"
    },
    statusCode: 200,
    body: body
  };
};
