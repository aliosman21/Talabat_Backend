"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Coupons", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         coupon_name: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         discount_percentage: {
            type: Sequelize.FLOAT,
            allowNull: false,
         },
         expiration_date: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         super_user_id: {
            type: Sequelize.UUID,
            references: {
               model: "SuperUsers",
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
      await queryInterface.dropTable("Coupons");
   },
};
