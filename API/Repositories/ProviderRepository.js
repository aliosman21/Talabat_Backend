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
         deleted_by: null,
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

module.exports.FindByName = async (providerName) => {
   try {
      const provider_retrieved = await db.Provider.findOne({
         where: {
            name: providerName,
         },
         include: [
            {
               model: db.Category,
               include: {
                  model: db.Item,
                  include: {
                     model: db.Item_Option,
                  },
               },
            },
         ],
      });
      console.log(provider_retrieved);
      return provider_retrieved ? provider_retrieved : false;
   } catch (err) {
      console.log(err);
      return false;
   }
};

module.exports.FindProviderInfoById = async (provider_id) => {
   try {
      const provider_retrieved = await db.Provider.findOne({
         where: {
            id: provider_id,
         },
         include: [
            { model: db.Provider_reviews },
            {
               model: db.Category,
               include: {
                  model: db.Item,
                  include: {
                     model: db.Item_Option,
                     include: {
                        model: db.Additional_Option,
                     },
                  },
               },
            },
         ],
         attributes: {
            exclude: [
               "password",
               "super_user_id",
               "createdAt",
               "updatedAt",
               "deletedAt",
               "deleted_by",
            ],
         },
      });
      return provider_retrieved ? provider_retrieved : false;
   } catch (err) {
      logger.error("Database provider selection failed err: ", err);
      return false;
   }
};

module.exports.FindByID = async (provider_info) => {
   try {
      const provider_retrieved = await db.Provider.findOne({
         where: {
            id: provider_info._id,
         },
         include: [
            {
               model: db.Order,
            },
            {
               model: db.Category,
               include: {
                  model: db.Item,
                  include: {
                     model: db.Item_Option,
                  },
               },
            },
         ],
      });
      return provider_retrieved ? provider_retrieved : false;
   } catch (err) {
      logger.error("Database provider selection failed err: ", err);
      return false;
   }
};

module.exports.Update = async (provider, updatedData) => {
   console.log(updatedData);
   try {
      provider.update(updatedData);
      return true;
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

module.exports.destroyProviderById = async (provider_id, role) => {
   try {
      const t = await sequelize.transaction();

      await db.Provider.update(
         { deleted_by: role },
         {
            where: {
               id: provider_id,
            },
            individualHooks: true,
         },
         { transaction: t }
      );

      await db.Provider.destroy(
         {
            where: {
               id: provider_id,
            },
            individualHooks: true,
         },
         { transaction: t }
      );
      await t.commit();
      return true;
   } catch (err) {
      logger.error("Database Destruction failed err: ", err);
      await t.rollback();
      return false;
   }
};

module.exports.getAllRestaurants = async () => {
   try {
      const All_Restaurants = await db.Provider.findAll({
         attributes: ["id", "name", "provider_type", "logo"],
         where: { provider_type: "Restaurant", provider_state: "Active" },
      });
      return All_Restaurants ? All_Restaurants : false;
   } catch (err) {
      logger.error("Database get all restaurants failed err: ", err);
      return false;
   }
};

module.exports.getAllProvs = async (prov_type) => {
   console.log("from provider repo",prov_type);
   try {
      const All_Providers = await db.Provider.findAll({
         attributes: ["id", "name", "provider_type", "logo"],
         where: { provider_type: prov_type, provider_state: "Active" },
      });
      console.log("from rep 2 ",All_Providers);
      return All_Providers ? All_Providers : false;
   } catch (err) {
      logger.error("Database get all restaurants failed err: ", err);
      return false;
   }
};

module.exports.getAllUnapproved = async () => {
   try {
      const All_Unapproved = await db.Provider.findAll({
         attributes: ["id", "name", "provider_type"],
         where: { provider_state: "Inactive" },
      });
      return All_Unapproved ? All_Unapproved : false;
   } catch (err) {
      logger.error("Database get all unapproved providers failed err: ", err);
      return false;
   }
};

module.exports.approveProvider = async (provider_id, superUser_id) => {
   try {
      await db.Provider.update(
         { provider_state: "Active", super_user_id: superUser_id },
         {
            where: {
               id: provider_id,
            },
         }
      );

      return true;
   } catch (err) {
      logger.error("Database approving provider failed err: ", err);
      return false;
   }
};
