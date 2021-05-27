const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const clientRepository = require("../../Repositories/ClientRepository");
const tokenFunctions = require("../GlobalFunction/TokenFunctions");
const HashComparer = require("../GlobalFunction/HashingFunctions");

router.post("/register", async (req, res) => {
  const validation_errors = register_info_validator(req.body);
  console.log(validation_errors);
  if (validation_errors.length === 0) {
    (await clientRepository.InsertClient(req.body))
      ? res.status(200).json({ Message: "Registered Successfully" })
      : res.status(500).json({ Message: "Database Error Occurred" });
  } else {
    res.status(400).json({ Message: validation_errors });
  }
});

router.post("/login", async (req, res) => {
  const client_Found = await clientRepository.FindByEmail(req.body);
  if (client_Found) {
    (await HashComparer.hashCompare(req.body.password, client_Found.password))
      ? res.status(200).json({
          Message: "Client Logged in successfully",
          token: tokenFunctions.generateToken(client_Found.id, "Client"),
        })
      : res.status(400).json({ Message: "Client Credentials error" });
  } else {
    res.status(400).json({ Message: "Client Credentials error" });
  }
});

module.exports = router;
