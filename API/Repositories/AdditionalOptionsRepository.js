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
 