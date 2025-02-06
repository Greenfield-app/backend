const knex = require("../src/knex");

const lastRecord = async (user_id) => {
  const data = await knex("record").where("user_id", user_id).select();
  const sortedData = data.sort((a, b) => {
    const dataA = Number(new Date(a.record_at).getTime());
    const dataB = Number(new Date(b.record_at).getTime());
    console.log(dataA, dataB);
    return dataB - dataA;
  });
  console.log(sortedData);
  const lastData = {
    userId: sortedData[0].user_id,
    foodId: sortedData[0].food_id,
    recordAt: sortedData[0].record_at,
  };
  return lastData;
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
