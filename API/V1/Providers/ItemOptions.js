const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ItemOptionsRepo = require("../../Repositories/ItemOptionsRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const added_item_option_id = await ItemOptionsRepo.InsertItemOption(req.body);
   if (added_item_option_id) {
      res.status(200).json({ Message : "Item option created successfuly",id:added_item_option_id  });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


module.exports = router;
