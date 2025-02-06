/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const TIMESTAMP = "1738739879000";
const EXAMPLE_PWD =
  "$2a$10$b.wYcezF1WcHilMDwilsNeHtIIyBwifxahhP5fnQnyEVPJP9NppGi";
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      username: "Anne",
      creation_date: knex.fn.now(),
      password_hashed: EXAMPLE_PWD,
    },
  ]);
};
