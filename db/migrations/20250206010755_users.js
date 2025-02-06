/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  //
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 35).notNullable();
    table.string("creation_date").notNullable();
    table.string("last_login").defaultTo(knex.fn.now());
    table.string("password_hashed").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
