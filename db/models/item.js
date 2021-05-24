"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Item extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Item.belongsTo(models.Category, {
            foreignKey: "category_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Item.hasMany(models.Item_Option, {
            foreignKey: "item_id",
            onDelete: "CASCADE",
            hooks: true,
         });

         Item.belongsToMany(models.Order, { through: "Order_Item", uniqueKey: "item_id" });
      }
   }
   Item.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         name: { type: DataTypes.STRING },
         logo: { type: DataTypes.STRING },
         reviews_count: {
            type: DataTypes.INTEGER,
            validate: {
               isInt: true,
            },
         },
         rating: {
            type: DataTypes.FLOAT,
            validate: {
               isFloat: true,
            },
         },
         old_price: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         price: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         summary: {
            type: DataTypes.STRING,
         },
         availability: {
            type: DataTypes.BOOLEAN,
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Item",
      }
   );

   Item.afterDestroy((instance, options) => {
      instance.getItem_Options().then((item_option) => {
         item_option.forEach((option) => {
            sequelize.models.Item_Option.destroy({
               where: {
                  item_id: option.item_id,
               },
               individualHooks: true,
            });
         });
      });
   });

   Item.afterRestore((instance, options) => {
      console.log("after Restore");
      sequelize.models.Item_Option.restore({
         where: {
            item_id: instance.id,
         },
         individualHooks: true,
      });
   });
   Item.beforeCreate((Item) => (Item.id = uuidv4()));

   return Item;
};
