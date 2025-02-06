/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  //
  await knex.schema.createTable("food", (table) => {
    table.increments("id").primary();
    table.string("foodname", 35).notNullable();
    table.string("description");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("food");
};
