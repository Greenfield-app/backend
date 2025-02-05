const bcrypt = require("bcryptjs");
const hashHelper = async (plain) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plain, salt);
    return hash;
  } catch (error) {
    throw new Error("Hassing Password Failed");
  }
};
const vertify = async (inputPassword, hash) => {
  try {
    const result = await bcrypt.compare(inputPassword, hash);
    return result;
  } catch (error) {
    throw new Error("Vertify Failed");
  }
};
export default { hashHelper, vertify };
