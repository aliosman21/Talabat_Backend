const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");
 
module.exports.InsertCategory = async (category_info,prov_id) => {
   try {
      await db.Category.create({
         name: category_info.name,
         provider_id: prov_id
      });
      return true;
   } catch (err) {
      logger.error("Database category Insertion failed err: ", err);
      return false;
   }
};
 
module.exports.FindAllProviderCategories = async (prov_id) => {
   try {
      const cat_retrieved = await db.Category.findAll({
        where: {
            provider_id: prov_id,
         },
      });
      return cat_retrieved ? cat_retrieved : false;
   } catch (err) {
      logger.error("Database category Selection failed err: ", err);
      return false;
   }
};





 
module.exports.FindCategoryById = async (category_id) => {
   try {
      const cat_retrieved = await db.Category.findOne({
        where: {
            id: category_id,
         },
      });
      return cat_retrieved ? cat_retrieved : false;
   } catch (err) {
      logger.error("Database category Selection failed err: ", err);
      return false;
   }
};

module.exports.destroyCategoryById = async (category_id) => {
  
   try {
      await db.Category.destroy(
         {
            where: {
               id: category_id,
            },
            individualHooks: true,
         },
      );
      return true;
   } catch (err) {
      logger.error("Database category Destruction failed err: ", err);
      return false;
   }
 
 };



 module.exports.UpdateCategory = async (category,updatedData) => {
   try {
     category.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};