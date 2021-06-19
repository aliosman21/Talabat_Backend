const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const driverRepository = require("../../Repositories/DriverRepository");
const jwt = require("jsonwebtoken");

router.get("/", VerifyClearance.CheckAccessPrivilege("Driver"), async (req, res) => {
   const driver_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const driver_found = await driverRepository.FindByID(driver_info);
   if (driver_found) {
      res.status(200).json({
         driver: driver_found,
      });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

module.exports = router;
