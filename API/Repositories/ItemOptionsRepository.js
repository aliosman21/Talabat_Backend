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
 