"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Coupons extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         Coupons.belongsTo(models.SuperUser, {
            foreignKey: "super_user_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
      }
   }
   Coupons.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         coupon_name: { type: DataTypes.TEXT, allowNull: false },
         discount_percentage: { type: DataTypes.FLOAT, allowNull: false },
         expiration_date: { type: DataTypes.DATE, allowNull: false },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Coupons",
      }
   );
   Coupons.beforeCreate((coupon) => (coupon.id = uuidv4()));

   return Coupons;
};
