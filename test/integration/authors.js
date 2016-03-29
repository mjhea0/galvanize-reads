process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var knex = require('../../src/server/db/knex');
var queries = require('../../src/server/db/queries');
// var passportStub = require('passport-stub');

var server = require('../../src/server/app');

var should = chai.should();

// passportStub.install(server);
chai.use(chaiHttp);

describe('author routes:', function() {

  var allAuthors;

  beforeEach(function(done) {
    knex.migrate.latest()
    .then(function() {
      return knex.seed.run()
        .then(function() {
          queries.getAuthors()
            .then(function(authors) {
              allAuthors = authors;
              done();
            });
        });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
      .then(function() {
        done();
      });
  });

  describe('GET /authors', function() {
    it('should display all authors', function(done) {
      chai.request(server)
      .get('/authors')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.have.string(
          '<h1 class="page-header">Galvanize Reads<small>&nbsp;Authors</small></h1>'
        );
        res.text.should.have.string(allAuthors[0].last_name);
        res.text.should.have.string(
          '<h2>Total Authors:&nbsp;<span><em>'+allAuthors.length+
          '</em></span></h2>');
        done();
      });
    });
  });

  describe('GET /authors/:id', function() {
    it('should display a single author', function(done) {
      chai.request(server)
      .get('/authors/'+allAuthors[0].id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.have.string(
          '<h1 class="page-header">Galvanize Reads<small>&nbsp;Authors</small></h1>'
        );
        res.text.should.have.string(allAuthors[0].last_name);
        done();
      });
    });
  });
});