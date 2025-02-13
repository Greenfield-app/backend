/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { hashPassword } = require('../../src/util/passwordUtils')
exports.seed = async function (knex) {
  await knex("users").del();

  const users = [
    {
      username: "Anne",
      email: "example1@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: "anne_123",
    },
    {
      username: "Sam",
      email: "example2@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: "sam1234",
    },
    {
      username: "Alex",
      email: "example3@mail.com",
      creation_date: knex.fn.now(),
      password_hashed: "alex23456",
    },
  ]
  for(const user of users) {
    user.password_hashed = await hashPassword(user.password_hashed)
  };
  await knex('users').insert(users);
};