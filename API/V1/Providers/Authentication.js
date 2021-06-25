const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const saveLogo = require("./ServiceLevelFunctions/handleProviderLogo");
const ProviderRepo = require("../../Repositories/ProviderRepository");
const tokenFunctions = require("../GlobalFunction/TokenFunctions");
const HashComparer = require("../GlobalFunction/HashingFunctions");

router.post("/register", async (req, res) => {
  const validation_errors = register_info_validator(req.body);
  if (validation_errors.length === 0) {
    const uploadedLogoPath = saveLogo.saveLogo(req.body.logo, req.body.name);
    req.body.logo = uploadedLogoPath;
    req.body.formatted_address = "some dummy address for now";
    (await ProviderRepo.InsertProvider(req.body))
      ? res.status(200).json({ Message: "Registered Successfully" })
      : res.status(500).json({ Message: "Database Error Occurred" });
  } else {
    res.status(400).json({ Message: validation_errors });
  }
});

router.post("/login", async (req, res) => {
  const provider_found = await ProviderRepo.FindByEmail(req.body);
  if (provider_found.dataValues.provider_state === "Active") {
    if (provider_found) {
      (await HashComparer.hashCompare(
        req.body.password,
        provider_found.password
      ))
        ? res.status(200).json({
            Message: "Provider Logged in successfully",
            token: tokenFunctions.generateToken(provider_found.id, "Provider"),
          })
        : res.status(400).json({ Message: "Provider Credentials error" });
    } else {
      res.status(400).json({ Message: "Provider Credentials error" });
    }
  } else {
    res
      .status(400)
      .json({ Message: "Waiting for superuser to approve your request" });
  }
});

module.exports = router;
