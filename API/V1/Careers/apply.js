const router = require("express").Router();
const register_info_validator = require("./ServiceLevelFunctions/ValidateRegisterFunctions");
const CareerRepository = require("../../Repositories/CareerRepository");
const handleCV = require("./ServiceLevelFunctions/handleCV");

router.post("/apply", async (req, res) => {
  const validation_errors = register_info_validator(req.body);
  if (validation_errors.length === 0) {
    if (req.body.cv) {
      const uploadedCVPath = handleCV.saveCV(req.body.cv, req.body.name);
      req.body.cv = uploadedCVPath;
      (await CareerRepository.InsertApplicant(req.body))
        ? res
            .status(200)
            .json({ Message: "Applicant info recieved successfully" })
        : res.status(500).json({ Message: "Database Error Occurred" });
    } else {
      res.status(400).json({ Message: "please uploaded your CV" });
    }
  } else {
    res.status(400).json({ Message: validation_errors });
  }
});

module.exports = router;
