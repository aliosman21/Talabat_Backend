const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ProviderRepo = require("../../Repositories/ProviderRepository");
const HandleData = require("./ServiceLevelFunctions/HandleProviderDataForClintSide");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");



router.get("/profile", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const Provider_Found = await ProviderRepo.FindByID(Provider_info);
   if (Provider_Found) {
      data = HandleData(Provider_Found)
      res.status(200).json({ provider: data });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});



module.exports = router;
