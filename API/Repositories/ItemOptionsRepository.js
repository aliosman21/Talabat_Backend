const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");
 
module.exports.InsertItemOption = async (ItemOption_info) => {
   try {
      const insertedItemOption = await db.Item_Option.create({
         section_name: ItemOption_info.section_name,
         section_type: ItemOption_info.section_type,
         item_id:ItemOption_info.item_id,
      });
      return insertedItemOption.dataValues.id;
   } catch (err) {
      logger.error("Database item option Insertion failed err: ", err);
      return false;
   }
};

module.exports.FindItemOptions = async (item_id) => {
   try {
      const item_options_retrieved = await db.Item_Option.findAll({
        where: {
            item_id: item_id,
         },
      });
      return item_options_retrieved ? item_options_retrieved : false;
   } catch (err) {
      logger.error("Database item options Selection failed err: ", err);
      return false;
   }
};


module.exports.FindItemOption = async (itemoption_id) => {
   try {
      const item_options_retrieved = await db.Item_Option.findOne({
        where: {
            id: itemoption_id,
         },
      });
      return item_options_retrieved ? item_options_retrieved : false;
   } catch (err) {
      logger.error("Database item options Selection failed err: ", err);
      return false;
   }
};




module.exports.destroyItemOptionById = async (item_option_id) => {
  
   try {
      await db.Item_Option.destroy(
         {
            where: {
               id: item_option_id,
            },
            individualHooks: true,
         },
      );
      return true;
   } catch (err) {
      logger.error("Database item option Destruction failed err: ", err);
      return false;
   }
 
 };


 
 module.exports.UpdateItemOption = async (itemopt,updatedData) => {
   try {
     itemopt.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};
 
 