"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Providers", {
         id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
         },
         email: {
            type: Sequelize.STRING,
            unique: true,
         },
         password: {
            type: Sequelize.STRING,
         },
         name: {
            type: Sequelize.STRING,
         },
         reviews_count: {
            type: Sequelize.INTEGER,
         },
         latitude: {
            type: Sequelize.DECIMAL(8, 6),
         },
         longitude: {
            type: Sequelize.DECIMAL(9, 6),
         },
         provider_type: {
            type: Sequelize.STRING,
         },
         formatted_address: {
            type: Sequelize.STRING,
         },
         opening_hour: {
            type: Sequelize.TIME,
         },
         closing_hour: {
            type: Sequelize.TIME,
         },
         delivery_fee: {
            type: Sequelize.DECIMAL,
         },
         logo: {
            type: Sequelize.STRING,
         },
         delivery_time: {
            type: Sequelize.TIME,
         },
         provider_state: {
            type: Sequelize.STRING,
         },
         minimum_order: {
            type: Sequelize.DECIMAL,
         },
         country: {
            type: Sequelize.STRING,
         },
         deleted_by: {
            type: Sequelize.STRING,
         },
         rating: {
            type: Sequelize.FLOAT,
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
      await queryInterface.dropTable("Providers");
   },
};
