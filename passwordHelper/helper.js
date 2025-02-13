// const bcrypt = require("bcryptjs");
// const hashHelper = async (plain) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(plain, salt);
//     return hash;
//   } catch (error) {
//     throw new Error("Hassing Password Failed");
//   }
// };
// const verify = async (inputPassword, hash) => {
//   try {
//     const result = await bcrypt.compare(inputPassword, hash);
//     return result;
//   } catch (error) {
//     throw new Error("Verify Failed");
//   }
// };
const requireSignin = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ error: "Authentication required", signinRequired: true });
  }
  // Optionally update last activity timestamp
  req.session.user.lastActivity = new Date();
  next();
};
module.exports = { requireSignin };
