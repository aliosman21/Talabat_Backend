const jwt = require("jsonwebtoken");
const logger = require("../../../Logger");

module.exports.CheckAccessPrivilege = function (role) {
   return async (req, res, next) => {
      try {
         if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") {
            const VerifiedToken = jwt.verify(
               req.headers.authorization.split(" ")[1],
               process.env.TOKEN_SECRET
            );
            VerifiedToken._role === role ? next() : res.status(401).send("Access denied");
         }else{
            res.status(401).send("Access denied no TOKEN found");
         }
      } catch (error) {
         logger.warn("Attempt to access restricted resources", error);
         res.status(401).send("Wrong Token XSS Attempted");
      }
   };
};
