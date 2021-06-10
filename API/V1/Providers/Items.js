const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ItemRepo = require("../../Repositories/ItemRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const saveLogo = require("./ServiceLevelFunctions/handleProviderLogo");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
    // const uploadedLogoPath = saveLogo.saveItemLogo(req.body.logo, req.body.name);
    // req.body.logo = uploadedLogoPath;
   const added_item_id = await ItemRepo.InsertItem(req.body);
   if (added_item_id) {
      res.status(200).json({ Message : "Item created successfuly" , id : added_item_id });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


module.exports = router;
