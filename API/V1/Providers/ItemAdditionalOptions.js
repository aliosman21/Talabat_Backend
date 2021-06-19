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


router.get("/getadditionaloption/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   console.log(req.params.id);
   const additional_options_Found = await ItemAdditionalOptionsRepo.FindAdditionalOption(req.params.id);
   console.log('this is',additional_options_Found);

  
   if (additional_options_Found) {
      res.status(200).json(additional_options_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});



router.put('/edit/:id', VerifyClearance.CheckAccessPrivilege("Provider"),async (req, res) =>{

  
   console.log('this is reqbody ',req.body)


   let additional = await ItemAdditionalOptionsRepo.FindAdditionalOption(req.params.id);

   console.log(additional);

   let updatestate = await ItemAdditionalOptionsRepo.UpdateAdditionalOption(additional,{ 
      
      option_name: req.body.option_name,
      additional_price: req.body.additional_price 
   
   })

   if(updatestate){
      res.status(200).json({ Message: "updated successfuly" } );
   }else{
      res.status(500).json({ Message: "Database Error Occurred" });
   }



})




module.exports = router;
