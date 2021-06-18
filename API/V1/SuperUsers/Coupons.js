const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ItemRepo = require("../../Repositories/ItemRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const CouponRepo = require("../../Repositories/CouponRepository");

router.post("/add",VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
//    const added_item_id = await ItemRepo.InsertItem(req.body);
    const super_user_info = jwt.decode(req.headers.authorization.split(" ")[1]);
    const added_coupon =  await CouponRepo.InsertCoupon(req.body,super_user_info._id);
    console.log('hello super',super_user_info);
    console.log('hello body',req.body);
   if (added_coupon) {
      res.status(200).json({ Message : "Coupon created successfuly" });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.get("/getall", VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
   const super_user_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const CategoryItems_Found = await CouponRepo.FindAllSuperuserCoupons(super_user_info._id);
   if (CategoryItems_Found) {
      
      res.status(200).json(CategoryItems_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.delete("/delete/:id", VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
    console.log(req.params.id);
   const coupon_deleted = await CouponRepo.destroyCouponById(req.params.id);
   if (coupon_deleted) {
      res.status(200).json({ Message : "Item deleted successfuly"});
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

module.exports = router;
