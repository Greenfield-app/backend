/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  //
  await knex.schema.createTable("record", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("food_id").notNullable();
    table.string("record_at").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("food_id")
      .references("id")
      .inTable("food")
      .onDelete("CASCADE");

    table.unique(["user_id", "record_at"], {
      indexName: "user_record_at_index",
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("record");
};
