var knex = require('./knex');

// *** books *** //

function getBooks() {
  return knex('books')
    .select()
    .innerJoin('books_authors', 'books.id', 'book_id')
    .innerJoin('authors', 'author_id', 'authors.id');
}

function getSingleBook(bookID) {
  return knex('books')
    .select('*', 'books.id AS book_id')
    .leftOuterJoin('books_authors', 'books.id', 'book_id')
    .leftOuterJoin('authors', 'author_id', 'authors.id')
    .where('books.id', bookID);
}

function addBook(obj) {
  if (!Array.isArray(obj.authors)) {
    obj.authors = [obj.authors];
  }
  return knex('books')
    .insert({
      title: obj.title,
      genre: obj.genre,
      description: obj.description,
      cover_url: obj.cover_url
    }).returning('id')
    .then(function(bookID) {
      var authorIds = obj.authors;
      var authorPromises = authorIds.map(function(id) {
        return knex('authors')
          .where('id', id)
          .returning('id');
      });
      return Promise.all(authorPromises)
        .then(function(ids) {
          var bookObject = ids.map(function(id) {
            return {
              book_id: bookID[0],
              author_id: id[0].id
            };
          });
          return knex('books_authors')
            .insert(bookObject);
        });
    });
}

function updateBook(bookID, obj) {
  return knex('books')
    .update(obj)
    .where('id', bookID);
}

function deleteBook(bookID) {
  return knex('books')
    .del()
    .where('id', bookID);
}

// *** authors *** //

function getAuthors() {
  return knex('authors')
    .select('*', 'authors.id AS author_id')
    .leftOuterJoin('books_authors', 'authors.id', 'author_id')
    .leftOuterJoin('books', 'book_id', 'books.id');
}

function getSingleAuthor(authorID) {
  return knex('authors')
    .select('*', 'authors.id AS author_id')
    .leftOuterJoin('books_authors', 'authors.id', 'author_id')
    .leftOuterJoin('books', 'book_id', 'books.id')
    .where('authors.id', authorID);
}

function addAuthor(obj) {
  return knex('authors')
    .insert(obj);
}

function updateAuthor(authorID, obj) {
  return knex('authors')
    .update(obj)
    .where('id', authorID);
}

function deleteAuthor(authorID) {
  return knex('authors')
    .del()
    .where('id', authorID);
}

// *** users *** //

function getUsers() {
  return knex('users')
    .select();
}

function getSingleUser(userID) {
  return knex('users')
    .select()
    .where('id', userID);
}

function addUser(obj) {
  return knex('users')
    .insert(obj);
}

// *** helpers *** //

function makeAdmin(userID) {
  return knex('users')
    .where('id', parseInt(userID))
    .update({ admin: true });
}

module.exports = {
  getBooks: getBooks,
  getSingleBook: getSingleBook,
  addBook: addBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
  getAuthors: getAuthors,
  getSingleAuthor: getSingleAuthor,
  addAuthor: addAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
  getUsers: getUsers,
  getSingleUser: getSingleUser,
  addUser: addUser,
  makeAdmin: makeAdmin,
};
