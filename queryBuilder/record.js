const knex = require("../src/knex");

const allRecord = async (user_id) => {
  try {
    const data = await knex("record").where("user_id", user_id).select();

    const sortedData = data
      .sort((a, b) => {
        const dataA = Number(new Date(a.record_at).getTime());
        const dataB = Number(new Date(b.record_at).getTime());
        return dataB - dataA;
      })
      .map((record) => {
        return {
          userId: record.user_id,
          foodId: record.food_id,
          recordAt: record.record_at,
        };
      });

    return sortedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const lastRecord = async (user_id) => {
  try {
    const data = await knex("record").where("user_id", user_id).select();

    const sortedData = data.sort((a, b) => {
      const dataA = Number(new Date(a.record_at).getTime());
      const dataB = Number(new Date(b.record_at).getTime());
      return dataB - dataA;
    });
    const lastData = {
      userId: sortedData[0].user_id,
      foodId: sortedData[0].food_id,
      recordAt: sortedData[0].record_at,
    };
    return lastData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const newRecord = async (user_id, food_id) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  allRecord,
  lastRecord,
  newRecord,
};
