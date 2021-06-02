const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/nearproviders", async (req, res) => {
   const providers_found = await ProviderRepo.FindNearestProviders(req.body);
   if (providers_found.length != 0) {
      res.status(200).json({ Message: providers_found });
   } else {
      res.status(400).json({ Message: "No providers found in your area" });
   }
});

router.get("/providersinfo/:id", async (req, res) => {
   console.log(req.params.id);
   const Provider_Found = await ProviderRepo.FindProviderInfoById(req.params.id);
   if (Provider_Found) {
      res.status(200).json({ Provider: Provider_Found });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

module.exports = router;
