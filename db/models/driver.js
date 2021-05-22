"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Driver extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Driver.hasMany(models.Driver_Break, {
            foreignKey: "id",
            onDelete: "CASCADE",
            hooks: true,
         });
      }
   }
   Driver.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true, isUUID: 4 },
         name: { type: DataTypes.STRING },
         email: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true,
            },
         },
         password: { type: DataTypes.STRING },
         mobile: { type: DataTypes.STRING },
         work_state: {
            type: DataTypes.STRING,
            validate: {
               isIn: [["OnCall", "Break", "GoingToOrder", "Delivering", "OffCall"]],
            },
         },
         last_latitude: {
            type: DataTypes.DECIMAL(8, 6),
            validate: {
               isDecimal: true,
            },
         },
         last_longitude: {
            type: DataTypes.DECIMAL(9, 6),
            validate: {
               isDecimal: true,
            },
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Driver",
      }
   );

   Driver.afterDestroy((instance, options) => {
      console.log("after delete");

      instance.getDriver_Breaks().then((breaks) => {
         breaks.forEach((driver_break) => {
            sequelize.models.Driver_Break.destroy({
               where: {
                  id: driver_break.id,
               },
               individualHooks: true,
            });
         });
      });
   });

   Driver.afterRestore((instance, options) => {
      console.log("after Restore");

      sequelize.models.Driver_Break.restore({
         where: {
            id: instance.id,
         },
         individualHooks: true,
      });
   });

   Driver.beforeCreate((Driver) => (Driver.id = uuidv4()));

   return Driver;
};
