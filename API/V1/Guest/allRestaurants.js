const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");


router.get("/all" , async (req, res) => {
    const All_Restaurants = await ProviderRepo.getAllRestaurants();
    if(All_Restaurants){
        res.status(200).json({ All_Restaurants });
    }else{
         res.status(500).json({ Message: "Database Error Occurred" });
    }
});


module.exports = router;
