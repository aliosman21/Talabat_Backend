"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Client_Address extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Client_Address.belongsTo(models.Client, {
            foreignKey: "id",
            constraints: true,
            foreignKeyConstraint: true,
         });
      }
   }
   Client_Address.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         client_latitude: { type: DataTypes.DECIMAL, primaryKey: true },
         client_longitude: { type: DataTypes.DECIMAL, primaryKey: true },
         address_type: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["Home", "Work", "Other"]],
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Client_Address",
      }
   );

   return Client_Address;
};
