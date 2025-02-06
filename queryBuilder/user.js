const knex = require("../src/knex");
const newUser = async (user_name, password_hashed) => {
  try {
    const userInfo = await knex("users").returning(["id", "username"]).insert({
      username: user_name,
      password_hashed: password_hashed,
      creation_date: knex.fn.now(),
    });
    return userInfo[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recordSignIn = async (user_id) => {
  try {
    const userInfo = await knex("users")
      .where("id", user_id)
      .update({ last_login: knex.fn.now() }, ["id", "username", "last_login"])
      .then(([user]) => {
        if (!user) {
          throw new Error("User not found");
        }
        return { userId: user.id, userName: user.username };
      });
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPasswod = async (user_id) => {
  try {
    const password = await knex
      .select("password_hashed")
      .from("users")
      .where("id", user_id);
    return password[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  newUser,
  recordSignIn,
  getPasswod,
};
