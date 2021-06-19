const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const CouponRepo = require("../../Repositories/CouponRepository");

router.get(
  "/last",
  VerifyClearance.CheckAccessPrivilege("Client"),
  async (req, res) => {
    const coupon_Found = await CouponRepo.getLatestCoupon();
    if (coupon_Found) {
      res.status(200).json({
        coupon: coupon_Found,
      });
    } else {
      res.status(500).json({ Message: "Database Error Occurred" });
    }
  }
);

module.exports = router;
