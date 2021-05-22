"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Order extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Order.belongsTo(models.Provider, {
            foreignKey: "provider_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Order.belongsTo(models.Driver, {
            foreignKey: "driver_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Order.belongsTo(models.Client, {
            foreignKey: "client_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Order.belongsToMany(models.Item, { through: "Order_Item", uniqueKey: "order_id" });
      }
   }
   Order.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         pickup_latitude: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         pickup_longitude: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         total_price: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         order_status: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["Pending", "Ready", "Preparing", "Delivering", "Delivered", "Canceled"]],
            },
         },
         delivery_latitude: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
         delivery_longitude: {
            type: DataTypes.DECIMAL,
            validate: {
               isDecimal: true,
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Order",
      }
   );
   Order.beforeCreate((order) => (order.id = uuidv4()));

   return Order;
};
