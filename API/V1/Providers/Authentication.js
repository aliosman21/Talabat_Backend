const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const ProviderRepo = require("../../Repositories/ProviderRepository");
const tokenFunctions = require("../GlobalFunction/TokenFunctions");

router.post("/register", async (req, res) => {
   const validation_errors = register_info_validator(req.body);
   if (validation_errors.length === 0) {
      (await ProviderRepo.InsertProvider(req.body))
         ? res.status(200).json({ Message: "Registered Successfully" })
         : res.status(500).json({ Message: "Database Error Occurred" });
   } else {
      res.status(400).json({ Message: validation_errors });
   }
});

router.post("/login", async (req, res) => {
   const provider_found = await ProviderRepo.FindByEmail(req.body);

   if (provider_found) {
      res.status(200).json({
         Message: "Provider Logged in successfully",
         token: tokenFunctions.generateToken(provider_found.id, "Provider"),
      });
   } else {
      res.status(400).json({ Message: "Provider Credentials error" });
   }
});

module.exports = router;