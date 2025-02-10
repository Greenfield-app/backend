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
    { foodname: "Casu Marzu", description: "Ramen near me" },
    { foodname: "Rocky Mountain oysters", description: "Yakiniku in Sinjuku" },
    {
      foodname: "Jellied moose nose",
      description: "Highly recommended by ...",
    },
    { foodname: "Shirako:", description: "Ramen near me" },
    { foodname: "Fruit bat soup", description: "Yakiniku in Sinjuku" },
    { foodname: "Chicken Shawarma", description: "Highly recommended by ..." },
    { foodname: "Miso Soup", description: "Ramen near me" },
    { foodname: "Fried tarantulas", description: "Yakiniku in Sinjuku" },
    { foodname: "Bushmeat", description: "Highly recommended by ..." },
  ]);
};
