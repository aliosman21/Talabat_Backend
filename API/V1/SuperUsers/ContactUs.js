const router = require("express").Router();
const contact_us_validator = require("./ServiceLevelFunctions/ValidateContactUsForm");
const ContactFormRepo = require("../../Repositories/ContactFormRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/contactus", async (req, res) => {
   const validation_errors = contact_us_validator(req.body);
   if (validation_errors.length === 0) {
      (await ContactFormRepo.InsertResponse(req.body))
         ? res.status(200).json({ Message: "Form Submitted Successfully" })
         : res.status(500).json({ Message: "Database Error Occurred" });
   } else {
      res.status(400).json({ Message: validation_errors });
   }
});

router.get("/contactus", VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
   const fetchedFormResponses = await ContactFormRepo.FindAll();
   if (fetchedFormResponses) {
      res.status(200).json({ Responses: fetchedFormResponses });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

module.exports = router;
