"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Driver extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Driver.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         name: { type: DataTypes.STRING },
         email: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true,
            },
         },
         password: { type: DataTypes.STRING },
         mobile: { type: DataTypes.STRING },
         work_state: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["OnCall", "Break", "GoingToOrder", "Delivering", "OffCall"]],
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Driver",
      }
   );

   Driver.beforeCreate((Driver) => (Driver.id = uuidv4()));

   return Driver;
};
