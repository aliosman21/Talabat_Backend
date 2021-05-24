const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");

module.exports.InsertSuperUser = async (super_user_info) => {
   try {
      await db.SuperUser.create({
         name: super_user_info.name,
         email: super_user_info.email,
         password: await HashingFunctions.hashPassword(super_user_info.password),
      });
      return true;
   } catch (err) {
      logger.error("Database Insertion failed err: ", err);
      return false;
   }
};

module.exports.FindByEmail = async (Super_User_Info) => {
   try {
      const User_retrieved = await db.SuperUser.findOne({
         where: {
            email: Super_User_Info.email,
         },
      });
      if (User_retrieved) {
         return (await HashingFunctions.hashCompare(
            Super_User_Info.password,
            User_retrieved.password
         ))
            ? User_retrieved
            : false;
      } else {
         return false;
      }
   } catch (err) {
      logger.error("Database Insertion failed err: ", err);
      return false;
   }
};
