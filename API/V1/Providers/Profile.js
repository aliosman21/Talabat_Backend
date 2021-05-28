const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ProviderRepo = require("../../Repositories/ProviderRepository");
const OrdersRepo = require("../../Repositories/OrdersRepository");
const HandleData = require("./ServiceLevelFunctions/HandleProviderDataForClintSide");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");



router.get("/profile", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const Provider_Found = await ProviderRepo.FindByID(Provider_info);
   if (Provider_Found) {
      const Orders_Found = await OrdersRepo.FindProviderOrders(Provider_info);
      data = HandleData(Provider_Found,Orders_Found)
      res.status(200).json({ provider: data });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.post("/edit", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
       const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const Provider_Found = await ProviderRepo.FindByID(Provider_info);
       const Updated_provider = await ProviderRepo.Update(Provider_Found,req.body)
       if (Updated_provider)
            res.status(200).json({ Message : "updated successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

router.delete("/delete", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
       const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const Provider_Found = await ProviderRepo.FindByID(Provider_info);
       date = new Date().toISOString().slice(0, 19).replace('T', ' ')
       const Updated_provider = await ProviderRepo.Update(Provider_Found,{deletedAt : date })
       if (Updated_provider)
            res.status(200).json({ Message : "updated successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

module.exports = router;
