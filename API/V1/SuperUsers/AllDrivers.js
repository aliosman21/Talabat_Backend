const router = require("express").Router();
const driverRepository = require("../../Repositories/DriverRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.get(
  "/",
  VerifyClearance.CheckAccessPrivilege("Super User"),
  async (req, res) => {
    const fetchedFormResponses = await driverRepository.FindAll();
    if (fetchedFormResponses) {
      res.status(200).json({ Responses: fetchedFormResponses });
    } else {
      res.status(500).json({ Message: "Database Error Occurred" });
    }
  }
);

module.exports = router;
