const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");


router.get("/all/:provType" , async (req, res) => {
    console.log("in all providers file");
    console.log(req.params.provType);
    let prov_type=req.params.provType
    const All_Providers = await ProviderRepo.getAllProvs(prov_type);
    console.log("from file 2",All_Providers);
    if(All_Providers){
        res.status(200).json({ All_Providers });
    }else{
         res.status(500).json({ Message: "Database Error Occurred" });
    }
});


module.exports = router;
