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
  makeAdmin: makeAdmin
};
