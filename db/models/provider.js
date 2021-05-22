"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Provider extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Provider.belongsTo(models.SuperUser, { foreignKey: "super_user_id" });
         Provider.hasMany(models.Category, {
            foreignKey: "provider_id",
            onDelete: "CASCADE",
            hooks: true,
         });
      }
   }
   Provider.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         email: { type: DataTypes.STRING, validate: { isEmail: true }, allowNull: false },
         password: { type: DataTypes.STRING, allowNull: false },
         name: { type: DataTypes.STRING, allowNull: false },
         reviews_count: { type: DataTypes.INTEGER, validate: { isInt: true } },
         latitude: {
            type: DataTypes.DECIMAL(8, 6),
            allowNull: false,
            validate: {
               isDecimal: true,
            },
         },
         longitude: {
            type: DataTypes.DECIMAL(9, 6),
            allowNull: false,
            validate: {
               isDecimal: true,
            },
         },
         provider_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isAlpha: true,
            },
         },
         coverage_zone: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
               isDecimal: true,
            },
         },
         opening_hour: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
               isDate: true,
            },
         },
         closing_hour: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
               isDate: true,
            },
         },
         delivery_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
               isDecimal: true,
            },
         },
         logo: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         delivery_time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
               isDate: true,
            },
         },
         provider_state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isAlpha: true,
            },
         },
         minimum_order: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isAlpha: true,
            },
         },
         rating: {
            type: DataTypes.FLOAT,
            validate: {
               isFloat: true,
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Provider",
      }
   );
   Provider.afterDestroy((instance, options) => {
      instance.getCategories().then((category) => {
         category.forEach((cat) => {
            sequelize.models.Category.destroy({
               where: {
                  provider_id: cat.provider_id,
               },
               individualHooks: true,
            });
         });
      });
   });

   Provider.afterRestore((instance, options) => {
      console.log("after Restore");
      sequelize.models.Category.restore({
         where: {
            provider_id: instance.id,
         },
         individualHooks: true,
      });
   });

   Provider.beforeCreate((Provider) => (Provider.id = uuidv4()));

   return Provider;
};
