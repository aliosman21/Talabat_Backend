const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ItemAdditionalOptionsRepo = require("../../Repositories/AdditionalOptionsRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const additional_option = await ItemAdditionalOptionsRepo.InsertAdditionalOption(req.body);
   if (additional_option) {
      res.status(200).json({ Message : "Item additional option created successfuly"});
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


module.exports = router;
