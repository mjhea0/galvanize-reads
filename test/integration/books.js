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

describe('book routes:', function() {

  var allBooks;

  beforeEach(function(done) {
    knex.migrate.latest()
    .then(function() {
      return knex.seed.run()
        .then(function() {
          queries.getBooks()
            .then(function(books) {
              allBooks = books;
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

  describe('GET /books', function() {
    it('should display all books', function(done) {
      chai.request(server)
      .get('/books')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.have.string(
          '<h1 class="page-header">Galvanize Reads<small>&nbsp;Books</small></h1>'
        );
        res.text.should.have.string(allBooks[0].title);
        res.text.should.have.string(
          '<h2>Total Books:&nbsp;<span><em>'+allBooks.length+
          '</em></span></h2>');
        done();
      });
    });
  });

  describe('GET /books/:id', function() {
    it('should display a single book', function(done) {
      chai.request(server)
      .get('/books/'+allBooks[0].id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.have.string(
          '<h1 class="page-header">Galvanize Reads<small>&nbsp;Books</small></h1>'
        );
        res.text.should.have.string(allBooks[0].title);
        done();
      });
    });
  });

  describe('GET /books/:id', function() {
    it('should display a single book', function(done) {
      chai.request(server)
      .get('/books/'+allBooks[0].id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.have.string(
          '<h1 class="page-header">Galvanize Reads<small>&nbsp;Books</small></h1>'
        );
        res.text.should.have.string(allBooks[0].title);
        done();
      });
    });
  });

  describe('POST /books', function() {
    describe('if not an admin', function() {
      it('should add not a book', function(done) {
        chai.request(server)
        .post('/books')
        .send({
          title: 'Real Python',
          genre: 'Python',
          description: 'A book about Python!',
          cover_url: 'https://realpython.com/real.png'
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.html;  // jshint ignore:line
          res.text.should.have.string(
            '<h1 class="page-header">Galvanize Reads</h1>');
          queries.getBooks()
            .then(function(books) {
              allBooks.length.should.equal(books.length);
              done();
            });
        });
      });
    });
  });

});