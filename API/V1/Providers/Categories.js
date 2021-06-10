const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CategoryRepo = require("../../Repositories/CategoryRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/add", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const added_category = await CategoryRepo.InsertCategory(req.body,Provider_info._id);
//    const Provider_Found = await ProviderRepo.FindByID(Provider_info);
   if (added_category) {
      res.status(200).json({ Message : "Category created successfuly"  });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.get("/getall", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const Provider_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const Categories_Found = await CategoryRepo.FindAllProviderCategories(Provider_info._id);
   if (Categories_Found) {
      
      res.status(200).json(Categories_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


module.exports = router;
