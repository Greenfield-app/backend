/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("food").del();
  await knex("food").insert([
    { foodname: "ramen", description: "Ramen near me" },
    { foodname: "yakiniku", description: "Yakiniku in Sinjuku" },
    { foodname: "italian", description: "Highly recommended by ..." },
    { foodname: "mexican", description: "spicy stuff" },
    { foodname: "pizza", description: "its got pepperonis" },
    { foodname: "sushi", description: "lottsa fish" },
    { foodname: "oden", description: "delicious" },
  ]);
};
