var knex = require('./knex');

// *** books *** //

function getBooks() {
  return knex('books').select();
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
  addBook: addBook,
  makeAdmin: makeAdmin
};
