"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Additional_Option extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Additional_Option.belongsTo(models.Item_Option, { foreignKey: "item_option_id" });
      }
   }
   Additional_Option.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         option_name: { type: DataTypes.STRING },
         additional_price: { type: DataTypes.DECIMAL },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Additional_Option",
      }
   );
   Additional_Option.beforeCreate((option) => (option.id = uuidv4()));

   return Additional_Option;
};
