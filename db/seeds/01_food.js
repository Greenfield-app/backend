/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("food").del();
  await knex("food").insert([
    { foodname: "Hainanese Chicken Rice Azabujuban Main Shop", description: "ChIJdTl5Ap6LGGARPQhK3unBcdY" },
    { foodname: "4000 Chinese Restaurant －南青山－", description: "ChIJE73gHM-LGGAR8lrzu5vYTM0" },
    { foodname: "Bistro Chick Azabujubanten", description: "ChIJm7-XcaKLGGAReDvdi4Soxnk" },
  ]);
};
