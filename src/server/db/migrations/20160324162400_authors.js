exports.up = function(knex, Promise){
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('biography').notNullable();
    table.text('portrait_url').notNullable();
    table.string('book_title').notNullable();
    table.integer('book_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};