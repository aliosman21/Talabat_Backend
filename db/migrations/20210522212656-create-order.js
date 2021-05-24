"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Orders", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         pickup_latitude: {
            type: Sequelize.DECIMAL(8, 6),
            allowNull: false,
         },
         pickup_longitude: {
            type: Sequelize.DECIMAL(9, 6),
            allowNull: false,
         },
         total_price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
         },
         order_status: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         delivery_latitude: {
            type: Sequelize.DECIMAL(8, 6),
            allowNull: false,
         },
         delivery_longitude: {
            type: Sequelize.DECIMAL(9, 6),
            allowNull: false,
         },
         driver_id: {
            type: Sequelize.UUID,
            references: {
               model: "Drivers",
               key: "id",
            },
         },
         client_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Clients",
               key: "id",
            },
         },
         provider_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Providers",
               key: "id",
            },
         },
         deliveredAt: {
            type: Sequelize.DATE,
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
      await queryInterface.dropTable("Orders");
   },
};
