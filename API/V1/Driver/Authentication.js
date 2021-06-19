const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const driverRepository = require("../../Repositories/DriverRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const tokenFunctions = require("../GlobalFunction/TokenFunctions");
const HashComparer = require("../GlobalFunction/HashingFunctions");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
   const validations_error = register_info_validator(req.body);
   if (validations_error.length === 0) {
      (await driverRepository.InsertDriver(req.body))
         ? res.status(200).json({ Message: "Registered Successfully" })
         : res.status(500).json({ Message: "Database Error Occurred" });
   } else {
      res.status(400).json({ Message: validations_error });
   }
});

router.post("/login", async (req, res) => {
   if (req.body.last_latitude && req.body.last_longitude) {
      const driver_found = await driverRepository.FindByEmail(req.body);
      if (driver_found) {
         (await HashComparer.hashCompare(req.body.password, driver_found.password)) &&
         (await driverRepository.updateLatLng(req.body, driver_found.dataValues.id))
            ? res.status(200).json({
                 Message: "Driver Logged in successfully",
                 token: tokenFunctions.generateToken(driver_found.id, "Driver"),
              })
            : res.status(400).json({ Message: "Driver Credentials error" });
      } else {
         res.status(400).json({ Message: "Driver Credentials error" });
      }
   } else {
      res.status(400).json({ Message: "Driver cannot login without lat and long" });
   }
});

module.exports = router;
