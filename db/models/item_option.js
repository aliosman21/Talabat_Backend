"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Item_Option extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Item_Option.belongsTo(models.Item, { foreignKey: "item_id" });
      }
   }
   Item_Option.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         section_name: {
            type: DataTypes.STRING,
         },
         section_type: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["RadioButton", "CheckBox"]],
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Item_Option",
      }
   );
   Item_Option.beforeCreate((option) => (option.id = uuidv4()));
   return Item_Option;
};
