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

router.delete("/delete/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const additional_option_deleted = await ItemAdditionalOptionsRepo.destroyAdditionalOptionById(req.params.id);
   if (additional_option_deleted) {
      res.status(200).json({ Message : "Item additional option deleted successfuly"});
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.get("/getadditionaloptions/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   console.log(req.params.id);
   const additional_options_Found = await ItemAdditionalOptionsRepo.FindOptionAdditionalOptions(req.params.id);
   if (additional_options_Found) {
      res.status(200).json(additional_options_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});



module.exports = router;
