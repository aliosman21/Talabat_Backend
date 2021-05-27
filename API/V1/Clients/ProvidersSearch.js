const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/nearproviders", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   const providers_found = await ProviderRepo.FindNearestProviders(req.body);
   if (providers_found.length != 0) {
      res.status(200).json({ Message: providers_found });
   } else {
      res.status(400).json({ Message: "No providers found in your area" });
   }
});

module.exports = router;
