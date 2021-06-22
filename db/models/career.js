"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Career.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
      name: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      mobile: { type: DataTypes.STRING },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["Male", "Female"]],
        },
      },
      country: { type: DataTypes.STRING },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      cv: { type: DataTypes.STRING },
      job_title: { type: DataTypes.STRING },
      notes: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Career",
    }
  );

  Career.beforeCreate((option) => (option.id = uuidv4()));

  return Career;
};
