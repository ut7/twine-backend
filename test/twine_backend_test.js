var stream = require("stream"),

    request = require("request"),
    expect = require("expect.js"),

    TB = require("../src/twine_backend");


describe("A Twine Backend Server", function () {
  var server = TB.createServer();

  beforeEach(function (done) {
    server = TB.createServer('test_archive_file_name.txt');
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
      if (error) { return done(error); }

      expect(response.statusCode).to.eql(200);
      done();
    });
  });

  it("can retrieve a Twine archive", function (done) {
    var data = new stream.Readable();

    data.pipe(request.post("http://localhost:1789/", function (error) {
      if (error) { return done(error); }

      request.get("http://localhost:1789/", function (error, response, body) {
        if (error) { return done(error); }

        expect(body).to.eql("archive data");
        done();
      });
    }));

    data.push("archive data");
    data.push(null);
  });
});
