"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Client extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         Client.hasMany(models.Order, {
            foreignKey: "client_id",
            onDelete: "CASCADE",
            hooks: true,
         });

         Client.hasMany(models.Client_Address, {
            foreignKey: "id",
            onDelete: "CASCADE",
            hooks: true,
         });
      }
   }
   Client.init(
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
         gender: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["Male", "Female"]],
            },
         },
         country: { type: DataTypes.STRING },
         date_of_birth: {
            type: DataTypes.DATEONLY,
            validate: {
               isDate: true,
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Client",
      }
   );

   Client.afterDestroy((instance, options) => {
      console.log("after delete");

      instance.getOrders().then((orders) => {
         orders.forEach((option) => {
            sequelize.models.Order.destroy({
               where: {
                  id: option.id,
               },
               individualHooks: true,
            });
         });
      });

      instance.getClient_Addresses().then((addresses) => {
         addresses.forEach((option) => {
            sequelize.models.Client_Address.destroy({
               where: {
                  id: option.id,
               },
               individualHooks: true,
            });
         });
      });
   });

   Client.afterRestore((instance, options) => {
      console.log("after Restore");
      sequelize.models.Order.restore({
         where: {
            client_id: instance.id,
         },
         individualHooks: true,
      });

      sequelize.models.Client_Address.restore({
         where: {
            id: instance.id,
         },
         individualHooks: true,
      });
   });

   Client.beforeCreate((option) => (option.id = uuidv4()));

   return Client;
};
