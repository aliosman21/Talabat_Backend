"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Order_Item extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         // Order_Item.hasMany(models.Order);
         // Order_Item.hasMany(models.Item);
      }
   }
   Order_Item.init(
      {
         order_id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         item_id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         item_total_price: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         quantity: {
            type: DataTypes.INTEGER,
            validate: {
               isInt: true,
            },
         },
         notes: { type: DataTypes.TEXT },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Order_Item",
      }
   );
   return Order_Item;
};
