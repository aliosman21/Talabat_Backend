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
         Item.belongsTo(models.Category, { foreignKey: "category_id" });
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
         active: {
            type: DataTypes.BOOLEAN,
            validate: {
               isIn: [[0, 1]],
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Item",
      }
   );
   Item.beforeCreate((Item) => (Item.id = uuidv4()));

   return Item;
};
