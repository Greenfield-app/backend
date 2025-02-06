const knex = require("../src/knex");

const lastRecord = async (user_id) => {
  const data = await knex("record").where("user_id", user_id).select();
  console.log(data);
};
const newRecord = async (user_id, food_id) => {
  const record = { user_id, food_id, record_at: knex.fn.now() };
  const data = await knex("record")
    .returning(["user_id", "food_id", "record_at"])
    .insert(record)
    .then(([data]) => {
      return {
        userId: data.user_id,
        foodId: data.food_id,
        recordAt: data.record_at,
      };
    });
  return data;
};
module.exports = {
  lastRecord,
  newRecord,
};
