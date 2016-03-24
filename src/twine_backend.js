var http = require("http");

var createServer = function () {
  return http.createServer(function (request, response) {
    response.end();
  });
};

module.exports.createServer = createServer;
