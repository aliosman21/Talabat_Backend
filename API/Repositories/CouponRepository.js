const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");

module.exports.InsertCoupon = async (coupon_info,super_id) => {
   try {
      await db.Coupons.create({
         coupon_name: coupon_info.coupon_name,
         discount_percentage: coupon_info.discount_percentage,
         expiration_date: coupon_info.expiration_date,
         super_user_id: super_id
      });
      return true;
   } catch (err) {
      logger.error("Database copoun Insertion failed err: ", err);
      return false;
   }
};
 
module.exports.FindAllSuperuserCoupons = async (super_id) => {
   try {
      const cat_retrieved = await db.Coupons.findAll({
        where: {
            super_user_id: super_id,
         },
      });
      return cat_retrieved ? cat_retrieved : false;
   } catch (err) {
      logger.error("Database coupon Selection failed err: ", err);
      return false;
   }
};

module.exports.destroyCouponById = async (coupon_id) => {
  
   try {
      await db.Coupons.destroy(
         {
            where: {
               id: coupon_id,
            },
            individualHooks: true,
         },
      );
      return true;
   } catch (err) {
      logger.error("Database category Destruction failed err: ", err);
      return false;
   }
 
 };