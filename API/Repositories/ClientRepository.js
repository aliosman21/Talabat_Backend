const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");

module.exports.InsertClient = async (client_info) => {
   try {
      await db.Client.create({
         name: client_info.name,
         email: client_info.email,
         password: await HashingFunctions.hashPassword(client_info.password),
         mobile: client_info.mobile,
         gender: client_info.gender,
         country: client_info.country,
         date_of_birth: client_info.date_of_birth,
      });
      return true;
   } catch (err) {
      logger.error("Database Insertion failed err: ", err);
      return false;
   }
};

module.exports.FindByEmail = async (client_info) => {
   try {
      const client_retrieved = await db.Client.findOne({
         where: {
            email: client_info.email,
         },
      });
      return client_retrieved ? client_retrieved : false;
   } catch (err) {
      logger.error("Database Selection failed err: ", err);
      return false;
   }
};
