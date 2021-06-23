const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const driverRepository = require("../../Repositories/DriverRepository");
const jwt = require("jsonwebtoken");

router.put(
  "/",
  VerifyClearance.CheckAccessPrivilege("Driver"),
  async (req, res) => {
    const states = ["OnCall", "Break", "GoingToOrder", "Delivering", "OffCall"];
    if (states.indexOf(req.body.work_state) !== -1) {
      const driver_info = jwt.decode(req.headers.authorization.split(" ")[1]);
      const driver_found = await driverRepository.FindByID(driver_info);
      if (driver_found) {
        await driverRepository.DriverOnCall(
          driver_found.dataValues.id,
          req.body.work_state
        );
        res.status(200).json({
          Message: req.body.work_state,
        });
      } else {
        res.status(500).json({ Message: "Database Error Occurred" });
      }
    } else {
      res.status(500).json({
        Message: `Can't update work_state with this ${req.body.work_state}`,
      });
    }
  }
);

module.exports = router;
