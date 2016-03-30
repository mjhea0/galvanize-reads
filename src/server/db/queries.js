var knex = require('./knex');

// *** books *** //

function getBooks() {
  return knex('books')
    .select();
}

function getSingleBook(bookID) {
  return knex('books')
    .select()
    .where('id', bookID);
}

function addBook(obj) {
  return knex('books')
    .insert(obj);
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
    .select();
}

function getSingleAuthor(authorID) {
  return knex('authors')
    .select()
    .where('id', authorID);
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
  addUser: addUser,
  makeAdmin: makeAdmin,
};
