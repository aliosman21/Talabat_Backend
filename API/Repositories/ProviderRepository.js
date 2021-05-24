const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");

module.exports.InsertProvider = async (provider_info) => {
   try {
      await db.Provider.create({
         email: provider_info.email,
         password: await HashingFunctions.hashPassword(provider_info.password),
         name: provider_info.name,
         latitude: provider_info.latitude,
         longitude: provider_info.longitude,
         provider_type: provider_info.provider_type,
         coverage_zone: provider_info.coverage_zone,
         opening_hour: provider_info.opening_hour,
         closing_hour: provider_info.closing_hour,
         delivery_fee: provider_info.delivery_fee,
         logo: provider_info.logo,
         provider_state: "Inactive",
         minimum_order: provider_info.minimum_order,
         country: provider_info.country,
         delivery_time: provider_info.delivery_time,
      });
      return true;
   } catch (err) {
      logger.error("Database Insertion failed err: ", err);
      return false;
   }
};

module.exports.FindByEmail = async (provider_info) => {
   try {
      const provider_retrieved = await db.Provider.findOne({
         where: {
            email: provider_info.email,
         },
      });
      if (provider_retrieved) {
         return (await HashingFunctions.hashCompare(
            provider_info.password,
            provider_retrieved.password
         ))
            ? provider_retrieved
            : false;
      } else {
         return false;
      }
   } catch (err) {
      logger.error("Database Selection failed err: ", err);
      return false;
   }
};
