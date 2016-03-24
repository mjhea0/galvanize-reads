var knex = require('./knex');

// *** books *** //

function getBooks() {
  return knex('books').select();
}

function getSingleBook(bookID) {
  return knex('books')
    .select()
    .where('id', bookID);
}

function addBook(obj) {
  return knex('books').insert(obj);
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
  return knex('authors').select();
}

function addAuthor(obj) {
  return knex('authors').insert(obj);
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
  addAuthor: addAuthor,
  makeAdmin: makeAdmin
};
