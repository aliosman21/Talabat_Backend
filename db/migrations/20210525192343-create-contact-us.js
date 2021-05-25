"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Contact_Us", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         name: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         email: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         message: {
            allowNull: false,
            type: Sequelize.TEXT,
         },
         mobile: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Contact_Us");
   },
};
