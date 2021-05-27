const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const SuperUserRepo = require("../../Repositories/SuperUserRepository");
const tokenFunctions = require("../GlobalFunction/TokenFunctions");
const HashComparer = require("../GlobalFunction/HashingFunctions");

router.post("/register", async (req, res) => {
   const validation_errors = register_info_validator(req.body);
   if (validation_errors.length === 0) {
      (await SuperUserRepo.InsertSuperUser(req.body))
         ? res.status(200).json({ Message: "Registered Successfully" })
         : res.status(500).json({ Message: "Database Error Occurred" });
   } else {
      res.status(400).json({ Message: validation_errors });
   }
});

router.post("/login", async (req, res) => {
   const user_found = await SuperUserRepo.FindByEmail(req.body);

   if (user_found) {
      (await HashComparer.hashCompare(req.body.password, user_found.password))
         ? res.status(200).json({
              Message: "Super User Logged in successfully",
              token: tokenFunctions.generateToken(user_found.id, "Super User"),
           })
         : res.status(400).json({ Message: "Super User Credentials error" });
   } else {
      res.status(400).json({ Message: "Super User Credentials error" });
   }
});

module.exports = router;
