const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");
const jwt = require("jsonwebtoken");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.get("/" , VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
    const All_Unapproved = await ProviderRepo.getAllUnapproved();
    if(All_Unapproved){
        res.status(200).json({ All_Unapproved });
    }else{
         res.status(500).json({ Message: "Database Error Occurred" });
    }
});

router.put("/approve/:id" ,VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
    const TokenInfo = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.TOKEN_SECRET
     );    
    (await ProviderRepo.approveProvider(req.params.id, TokenInfo._id))
      ? res.status(200).json({ Message: "Provider Approved Successfully" })
      : res.status(500).json({ Message: "Database Error Occurred" });
});


module.exports = router;