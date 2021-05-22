"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Drivers", {
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
            unique: true,
            type: Sequelize.STRING,
         },
         password: {
            allowNull: false,

            type: Sequelize.STRING,
         },
         mobile: {
            allowNull: false,

            type: Sequelize.STRING,
         },
         work_state: {
            allowNull: false,

            type: Sequelize.STRING,
         },
         last_latitude: {
            type: Sequelize.DECIMAL(8, 6),
         },
         last_longitude: {
            type: Sequelize.DECIMAL(9, 6),
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
      await queryInterface.dropTable("Drivers");
   },
};
