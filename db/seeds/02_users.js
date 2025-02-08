/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const EXAMPLE_PWD =
  "$2a$10$b.wYcezF1WcHilMDwilsNeHtIIyBwifxahhP5fnQnyEVPJP9NppGi";
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      username: "Anne",
      email: "example1@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: EXAMPLE_PWD,
    },
    {
      username: "Sam",
      email: "example2@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: EXAMPLE_PWD,
    },
    {
      username: "Alex",
      email: "example3@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: EXAMPLE_PWD,
    },
  ]);
};
