"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Items", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         name: {
            type: Sequelize.STRING,
         },
         logo: {
            type: Sequelize.STRING,
         },
         reviews_count: {
            type: Sequelize.INTEGER,
         },
         rating: {
            type: Sequelize.FLOAT,
         },
         old_price: {
            type: Sequelize.DECIMAL,
         },
         price: {
            type: Sequelize.DECIMAL,
         },
         summary: {
            type: Sequelize.STRING,
         },
         active: {
            type: Sequelize.BOOLEAN,
         },
         category_id: {
            type: Sequelize.UUID,
            references: {
               model: "categories",
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
      await queryInterface.dropTable("Items");
   },
};
