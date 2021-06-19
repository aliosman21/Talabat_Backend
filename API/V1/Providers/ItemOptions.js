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

router.get("/getitemoptions/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   console.log(req.params.id);
   const item_options_Found = await ItemOptionsRepo.FindItemOptions(req.params.id);
   if (item_options_Found) {
      res.status(200).json(item_options_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});


router.get("/getitemoption/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   console.log(req.params.id);
   const item_options_Found = await ItemOptionsRepo.FindItemOption(req.params.id);
   if (item_options_Found) {
      res.status(200).json(item_options_Found);
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.delete("/delete/:id", VerifyClearance.CheckAccessPrivilege("Provider"), async (req, res) => {
   const item_option_deleted = await ItemOptionsRepo.destroyItemOptionById(req.params.id);
   if (item_option_deleted) {
      res.status(200).json({ Message : "Item additional option deleted successfuly"});
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});




router.put('/edit/:id', VerifyClearance.CheckAccessPrivilege("Provider"),async (req, res) =>{

  
   console.log('this is reqbody ',req.body)


   let itemopt = await ItemOptionsRepo.FindItemOption(req.params.id);

   console.log(itemopt);

   let updatestate = await ItemOptionsRepo.UpdateItemOption(itemopt,{ 
      
      section_name: req.body.section_name,
      section_type: req.body.section_type 
   
   })

   if(updatestate){
      res.status(200).json({ Message: "updated successfuly" } );
   }else{
      res.status(500).json({ Message: "Database Error Occurred" });
   }



})



module.exports = router;
