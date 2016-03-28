var fs = require("fs"),
    http = require("http");

var createServer = function (fileName) {
  return http.createServer(function (request, response) {
    if (request.method == 'POST') {
      request.pipe(fs.createWriteStream('data/' + fileName));
      response.end();
    } else {
      fs.createReadStream('data/' + fileName).pipe(response);
    }
  });
};

module.exports.createServer = createServer;
