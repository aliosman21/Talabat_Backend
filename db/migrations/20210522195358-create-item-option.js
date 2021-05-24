"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Item_Options", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         section_name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         section_type: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         item_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Items",
               key: "id",
            },
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
      await queryInterface.dropTable("Item_Options");
   },
};
