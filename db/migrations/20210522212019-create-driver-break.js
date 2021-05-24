"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Driver_Breaks", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Drivers",
               key: "id",
            },
            primaryKey: true,
         },
         break_start_time: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: true,
         },
         break_end_time: {
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
      await queryInterface.dropTable("Driver_Breaks");
   },
};
