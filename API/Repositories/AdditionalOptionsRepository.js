const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");
 
module.exports.InsertAdditionalOption = async (ItemAdditionalOption_info) => {
   try {
      await db.Additional_Option.create({
         option_name: ItemAdditionalOption_info.option_name,
         additional_price: ItemAdditionalOption_info.additional_price,
         item_option_id:ItemAdditionalOption_info.item_option_id,
      });
      return true;
   } catch (err) {
      logger.error("Database item option Insertion failed err: ", err);
      return false;
   }
};

module.exports.destroyAdditionalOptionById = async (additional_option_id) => {
  
   try {
      await db.Additional_Option.destroy(
         {
            where: {
               id: additional_option_id,
            },
            
         },
      );
      return true;
   } catch (err) {
      logger.error("Database additional option Destruction failed err: ", err);
      return false;
   }
 
 };

 module.exports.FindOptionAdditionalOptions = async (itemOptionId) => {
   try {
      const additional_options_retrieved = await db.Additional_Option.findAll({
        where: {
            item_option_id: itemOptionId,
         },
      });
      return additional_options_retrieved ? additional_options_retrieved : false;
   } catch (err) {
      logger.error("Database option's additional option Selection failed err: ", err);
      return false;
   }
};
 

module.exports.FindAdditionalOption = async (additional_option_id) => {
   try {
      const additional_option_retrieved = await db.Additional_Option.findOne({
        where: {
            id: additional_option_id,
         },
      });
      return additional_option_retrieved ? additional_option_retrieved : false;
   } catch (err) {
      logger.error("Database option's additional option Selection failed err: ", err);
      return false;
   }
};




 
module.exports.UpdateAdditionalOption = async (additional_option,updatedData) => {
   try {
      additional_option.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};