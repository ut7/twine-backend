var request = require("request"),
    TB = require("../src/twine_backend");

describe("A Twine Backend Server", function () {
  var server = TB.createServer();

  beforeEach(function (done) {
    server = TB.createServer();
    server.listen(1789, function () {
      done();
    });
  });

  afterEach(function (done) {
    server.close(function () {
      done();
    });
  });

  it("can receive a Twine archive", function (done) {
    request.post("http://localhost:1789/", function (error, response) {
      if (error) { done(error); }

      expect(response.statusCode).to.eql(200);
      done();
    });
  });
});
