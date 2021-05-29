const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ProviderRepo = require("../../Repositories/ProviderRepository");
const OrdersRepo = require("../../Repositories/OrdersRepository");
const HandleData = require("./ServiceLevelFunctions/HandleRestaurantDataForClintSide");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");



router.get("/info" , async (req, res) => {
   const Provider_Found = await ProviderRepo.FindByName(req.query.restaurant);
   if (Provider_Found) {
      data = HandleData(Provider_Found)
      res.status(200).json({ Restaurant: data });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


module.exports = router;
