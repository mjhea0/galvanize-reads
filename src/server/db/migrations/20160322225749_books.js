exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.text('description').notNullable();
    table.text('cover_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};