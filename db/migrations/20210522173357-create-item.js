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
            allowNull: false,

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
            allowNull: false,

            type: Sequelize.DECIMAL,
         },
         summary: {
            allowNull: false,

            type: Sequelize.STRING,
         },
         availability: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
         },
         category_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "Categories",
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
