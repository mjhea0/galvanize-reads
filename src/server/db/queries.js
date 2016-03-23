var knex = require('./knex');

function getBooks() {
  return knex('books').select();
}

module.exports = {
  getBooks: getBooks
};
