"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Careers", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
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
      mobile: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
      },
      cv: {
        type: Sequelize.STRING,
      },
      job_title: {
        type: Sequelize.STRING,
      },
      notes: {
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
    await queryInterface.dropTable("Careers");
  },
};
