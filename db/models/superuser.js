"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class SuperUser extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         SuperUser.hasMany(models.Provider, {
            foreignKey: "super_user_id",
         });
         SuperUser.hasMany(models.Coupons, {
            foreignKey: "super_user_id",
         });
      }
   }
   SuperUser.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true },
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         name: DataTypes.STRING,
      },
      {
         sequelize,
         paranoid: true,
         modelName: "SuperUser",
      }
   );

   SuperUser.beforeCreate((SuperUser) => (SuperUser.id = uuidv4()));
   return SuperUser;
};
