"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Additional_Options", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         option_name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         additional_price: {
            type: Sequelize.DECIMAL,
         },
         item_option_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Item_Options",
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
      await queryInterface.dropTable("Additional_Options");
   },
};
