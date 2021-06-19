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

module.exports.FindCategoryItems = async (categoryId) => {
   try {
      const items_retrieved = await db.Item.findAll({
        where: {
            category_id: categoryId,
         },
      });
      return items_retrieved ? items_retrieved : false;
   } catch (err) {
      logger.error("Database category items Selection failed err: ", err);
      return false;
   }
};


module.exports.FindItemById = async (item_id) => {
   try {
      const item_retrieved = await db.Item.findOne({
        where: {
            id: item_id,
         },
      });
      return item_retrieved ? item_retrieved : false;
   } catch (err) {
      logger.error("Database category Selection failed err: ", err);
      return false;
   }
};


module.exports.destroyItemById = async (item_id) => {
  
   try {
      await db.Item.destroy(
         {
            where: {
               id: item_id,
            },
            individualHooks: true,
         },
      );
      return true;
   } catch (err) {
      logger.error("Database item Destruction failed err: ", err);
      return false;
   }
 
 };
 


 
 module.exports.UpdateItem = async (item,updatedData) => {
   try {
     item.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};