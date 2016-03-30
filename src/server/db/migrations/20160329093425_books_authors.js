exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors', function(table){
    table.increments();
    table.integer('book_id')
      .references('id')
      .inTable('books');
    table.integer('author_id')
      .references('id')
      .inTable('authors');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
