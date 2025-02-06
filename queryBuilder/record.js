const knex = require("../src/knex");

const lastRecord = async (user_id) => {
  const data = await knex("record").where("user_id", user_id).select();
  console.log(data);
};
const newRecord = async (user_id, food_id) => {
  const recordDate = knex.fn.now();
  const record = { user_id, food_id, record_at: recordDate };
  const data = await knex("record")
    .returning(["user_id", "food_id", "record_at"])
    .insert(record);
  console.log(data);
  return data;
};
module.exports = {
  lastRecord,
  newRecord,
};
