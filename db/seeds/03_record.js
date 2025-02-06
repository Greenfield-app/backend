/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const TIMESTAMP_1 = "1736061479000";
const TIMESTAMP_2 = "1736666279000";
const TIMESTAMP_3 = "1738412279000";
exports.seed = async function (knex) {
  await knex("record").del();
  const users = await knex("users").select("id", "username");
  const foods = await knex("food").select("id", "foodname");
  await knex("record").insert([
    { user_id: users[0].id, food_id: foods[0].id, record_at: knex.fn.now() },
    { user_id: users[1].id, food_id: foods[0].id, record_at: knex.fn.now() },
    { user_id: users[2].id, food_id: foods[0].id, record_at: knex.fn.now() },
  ]);
};
