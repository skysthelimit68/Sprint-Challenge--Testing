
exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
      table.increments();
      table.string("title", 255).notNullable().unique()
      table.string("genre", 255).notNullable()
      table.integer("releaseYear").unsigned()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropIfTableExists('games')
};
