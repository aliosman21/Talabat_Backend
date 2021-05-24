const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   return hashedPassword;
};

module.exports = { hashPassword: hashPassword };
