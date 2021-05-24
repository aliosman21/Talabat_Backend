const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const clientRepository = require("../../Repositories/ClientRepository");

router.get("/", async (req, res) => {
   res.send({ Message: "Hello from client" });
});
router.post("/register", async (req, res) => {
   const validation_errors = register_info_validator(req.body);
   if (validation_errors.length === 0) {
      (await clientRepository.register(req.body))
         ? res.status(200).json({ Message: "Registered Successfully" })
         : res.status(500).json({ Message: "Database Error Occurred" });
   } else {
      res.status(400).json({ Message: validation_errors });
   }
});

module.exports = router;
