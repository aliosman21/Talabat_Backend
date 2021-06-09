"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Provider_reviews", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         provider_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Providers",
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
         content: {
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
      await queryInterface.dropTable("Provider_reviews");
   },
};
