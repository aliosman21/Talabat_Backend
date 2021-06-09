"use strict";
const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
   class Provider_reviews extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Provider_reviews.belongsTo(models.Provider, {
            foreignKey: "provider_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Provider_reviews.belongsTo(models.Client, {
            foreignKey: "client_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
      }
   }
   Provider_reviews.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         content: DataTypes.TEXT,
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Provider_reviews",
      }
   );
   Provider_reviews.beforeCreate((review) => (review.id = uuidv4()));
   return Provider_reviews;
};
