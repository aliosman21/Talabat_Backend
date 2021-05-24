"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Client_Addresses", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Clients",
               key: "id",
            },
            primaryKey: true,
         },
         client_latitude: {
            type: Sequelize.DECIMAL,
            allowNull: false,

            primaryKey: true,
         },
         client_longitude: {
            type: Sequelize.DECIMAL,
            allowNull: false,

            primaryKey: true,
         },
         address_type: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable("Client_Addresses");
   },
};
