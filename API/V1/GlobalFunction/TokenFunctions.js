const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
   return jwt.sign(
      {
         _id: id,
         _role: role,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
   );
};

module.exports = { generateToken: generateToken };
