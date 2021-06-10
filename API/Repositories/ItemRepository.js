const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");
 
module.exports.InsertItem = async (Item_info) => {
   try {
      const insertedItem = await db.Item.create({
         name: Item_info.name,
         logo:Item_info.logo,
         price:Item_info.price,
         summary:Item_info.summary,
         availability:true,
         category_id:Item_info.category_id,
      });
      return insertedItem.dataValues.id;
   } catch (err) {
      logger.error("Database item Insertion failed err: ", err);
      return false;
   }
};
 