const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const CareerRepository = require("../../Repositories/CareerRepository");

router.post("/apply", async (req, res) => {
  const validation_errors = register_info_validator(req.body);
  if (validation_errors.length === 0) {
    (await CareerRepository.InsertApplicant(req.body))
      ? res
          .status(200)
          .json({ Message: "Applicant info recieved successfully" })
      : res.status(500).json({ Message: "Database Error Occurred" });
  } else {
    res.status(400).json({ Message: validation_errors });
  }
});

module.exports = router;
