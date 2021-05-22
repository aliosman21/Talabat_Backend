"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Order_Items", {
         order_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         item_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         item_total_price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
         },
         quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         notes: {
            type: Sequelize.TEXT,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         deletedAt: {
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Order_Items");
   },
};
