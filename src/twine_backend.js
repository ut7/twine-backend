var createServer = function (fileName) {
  var fs = require("fs"),
      http = require("http"),

      express = require("express"),

      app = express();

  app.post('/', function (request, response) {
    request.pipe(fs.createWriteStream('data/' + fileName));
    response.end();
  });

  app.get('/', function (request, response) {
      fs.createReadStream('data/' + fileName).pipe(response);
  });

  return http.createServer(app);
};

module.exports.createServer = createServer;
