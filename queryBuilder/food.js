const knex = require("../src/knex");
const insertFood = async (foodName, description) => {
  try {
    const foodInfo = await knex("food")
      .returning(["id", "foodname"])
      .insert({ foodname: foodName, description: description })
      .then(([food]) => {
        return {
          foodId: food.id,
          foodName: food.foodname,
          description: food.description,
        };
      });

    return foodInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const allFood = async () => {
  try {
    const allFood = await knex.select().table("food");
    const foodList = allFood.map((food) => {
      return {
        foodId: food.id,
        foodName: food.foodname,
        description: food.description,
      };
    });
    return foodList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getFoodById = async (foodId) => {
  try {
    const food = await knex("food")
      .where("id", foodId)
      .select()
      .then(([food]) => food);

    const foodInfo = {
      foodId: food.id,
      foodName: food.foodname,
      description: food.description,
    };
    return foodInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { insertFood, allFood, getFoodById };
