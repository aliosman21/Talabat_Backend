"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Driver_Break extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Driver_Break.belongsTo(models.Driver, {
            foreignKey: "id",
            constraints: true,
            foreignKeyConstraint: true,
         });
      }
   }
   Driver_Break.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         break_start_time: { type: DataTypes.DATE, isDate: true },
         break_end_time: { type: DataTypes.DATE, isDate: true },
      },
      {
         sequelize,
         modelName: "Driver_Break",
      }
   );
   return Driver_Break;
};
