const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ItemRepo = require("../../Repositories/ItemRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const saveLogo = require("./ServiceLevelFunctions/handleProviderLogo");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
    const uploadedLogoPath = saveLogo.saveItemLogo(req.body.logo, req.body.name);
    req.body.logo = uploadedLogoPath;
   const added_item_id = await ItemRepo.InsertItem(req.body);
   if (added_item_id) {
      res.status(200).json({ Message : "Item created successfuly" , id : added_item_id });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.get("/getcategoryitems/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   console.log(req.params.id);
   const CategoryItems_Found = await ItemRepo.FindCategoryItems(req.params.id);
   if (CategoryItems_Found) {
      
      res.status(200).json(CategoryItems_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.delete("/delete/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const item_deleted = await ItemRepo.destroyItemById(req.params.id);
   if (item_deleted) {
      res.status(200).json({ Message : "Item deleted successfuly"});
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

module.exports = router;
