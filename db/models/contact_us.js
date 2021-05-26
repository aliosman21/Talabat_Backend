"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Contact_Us extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Contact_Us.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         name: { type: DataTypes.STRING },
         email: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true,
            },
         },
         message: { type: DataTypes.TEXT },
         mobile: { type: DataTypes.STRING },
      },
      {
         sequelize,
         modelName: "Contact_Us",
      }
   );
   Contact_Us.beforeCreate((option) => (option.id = uuidv4()));

   return Contact_Us;
};
