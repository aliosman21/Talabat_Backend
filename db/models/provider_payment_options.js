"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Provider_Payment_Options extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Provider_Payment_Options.belongsTo(models.Provider, {
            foreignKey: "id",
            constraints: true,
            foreignKeyConstraint: true,
         });
      }
   }
   Provider_Payment_Options.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         name: { type: DataTypes.STRING, primaryKey: true },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Provider_Payment_Options",
      }
   );

   return Provider_Payment_Options;
};
