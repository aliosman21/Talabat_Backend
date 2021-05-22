"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
   class Category extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Category.belongsTo(models.Provider, {
            foreignKey: "provider_id",
            constraints: true,
            foreignKeyConstraint: true,
         });
         Category.hasMany(models.Item, {
            foreignKey: "category_id",
            onDelete: "CASCADE",
            hooks: true,
         });
      }
   }
   Category.init(
      {
         id: { type: DataTypes.UUID, primaryKey: true },
         name: {
            type: DataTypes.STRING,
         },
      },
      {
         sequelize,
         paranoid: true,
         modelName: "Category",
      }
   );

   Category.afterDestroy((instance, options) => {
      instance.getItems().then((item) => {
         item.forEach((ite) => {
            sequelize.models.Item.destroy({
               where: {
                  category_id: ite.category_id,
               },
               individualHooks: true,
            });
         });
      });
   });

   Category.afterRestore((instance, options) => {
      console.log("after Restore");
      sequelize.models.Item.restore({
         where: {
            category_id: instance.id,
         },
         individualHooks: true,
      });
   });
   Category.beforeCreate((Category) => (Category.id = uuidv4()));

   return Category;
};
