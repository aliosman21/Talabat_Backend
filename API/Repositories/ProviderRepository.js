const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");

module.exports.InsertProvider = async (provider_info) => {
   try {
      await db.Provider.create({
         email: provider_info.email,
         password: await HashingFunctions.hashPassword(provider_info.password),
         name: provider_info.name,
         latitude: provider_info.latitude,
         longitude: provider_info.longitude,
         provider_type: provider_info.provider_type,
         formatted_address: provider_info.formatted_address,
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
      return provider_retrieved ? provider_retrieved : false;
   } catch (err) {
      logger.error("Database Selection failed err: ", err);
      return false;
   }
};

module.exports.FindByID = async (provider_info) => {
   try {
      const provider_retrieved = await db.Provider.findOne({
         where: {
            id: provider_info._id,
         },
      });
      return provider_retrieved ? provider_retrieved : false;
   } catch (err) {
      logger.error("Database provider selection failed err: ", err);
      return false;
   }
};


module.exports.Update = async (provider,updatedData) => {
    console.log(updatedData)
   try {
     provider.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update provider info failed err: ", err);
      return false;
   }
};


module.exports.FindNearestProviders = async (marker_info) => {
   try {
      const providers_retrieved = await sequelize.query(
         "CALL getNearProviders (:clientLat, :clientLong)",
         {
            replacements: {
               clientLat: marker_info.latitude,
               clientLong: marker_info.longitude,
            },
         }
      );
      return providers_retrieved ? providers_retrieved : false;
   } catch (err) {
      logger.error("Database Selection failed err: ", err);
      return false;
   }
};
