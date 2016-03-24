exports.up = function(knex, Promise){
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('biography').notNullable();
    table.text('portrait_url').notNullable();
  }).then(function(){
    return knex.schema.createTable('book_author', function(bookTable){
      bookTable.increments();
      bookTable.integer('book_id')
      .references('id').inTable('books').onDelete('CASCADE');
      bookTable.integer('author_id')
      .references('id').inTable('authors').onDelete('CASCADE');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('book_author').then(function(){
    return knex.schema.dropTable('authors');
  });
};