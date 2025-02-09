const knex = require("../src/knex");
const newUser = async (user_name, password_hashed, email) => {
  try {
    const userInfo = await knex("users")
      .returning(["id", "username", "email", "last_login"])
      .insert({
        username: user_name,
        password_hashed: password_hashed,
        creation_date: knex.fn.now(),
        email: email,
      })
      .then(([user]) => {
        console.log(user);
        return {
          userId: user.id,
          userName: user.username,
          email: user.email,
          lastLogin: user.last_login,
        };
      });

    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recordSignIn = async (email) => {
  try {
    const userInfo = await knex("users")
      .where("email", email)
      .update({ last_login: knex.fn.now() }, [
        "id",
        "username",
        "last_login",
        "email",
      ])
      .then(([user]) => {
        return {
          userId: user.id,
          userName: user.username,
          email: user.email,
          lastLogin: user.last_login,
        };
      });
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPasswod = async (email) => {
  try {
    const password = await knex
      .select("password_hashed")
      .from("users")
      .where("email", email);
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
