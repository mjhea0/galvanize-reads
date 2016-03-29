process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
// var passportStub = require('passport-stub');

var server = require('../../src/server/app');

var should = chai.should();

// passportStub.install(server);
chai.use(chaiHttp);

describe('GET /', function() {
  it('should render correctly', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.html;  // jshint ignore:line
      res.text.should.have.string(
        '<h1 class="page-header">Galvanize Reads</h1>');
      done();
    });
  });
});