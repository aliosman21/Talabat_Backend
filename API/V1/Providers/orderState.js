const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");
const OrderRepo = require("../../Repositories/OrdersRepository");
const jwt = require("jsonwebtoken");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.get("/" , async (req, res) => {

    const TokenInfo = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.TOKEN_SECRET
     );   

     console.log('this is my token', TokenInfo);

     
    const prov_info = await ProviderRepo.FindProviderInfoById(TokenInfo._id);
    const prov_orders = await OrderRepo.FindProviderOrders(prov_info);
    
    
    if(prov_orders){
        res.status(200).json( prov_orders );
    }else{
         res.status(500).json({ Message: "Database Error Occurred" });
    }
});


router.put('/state/:id', async (req, res) =>{

    const TokenInfo = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.TOKEN_SECRET
     );   
    


    let prov_order = await OrderRepo.FindOrderByID(req.params.id);
    
    
    await OrderRepo.Update(prov_order,{ order_status: req.body.state })

    if(prov_order){
        res.status(200).json({ prov_order });
    }else{
         res.status(500).json({ Message: "Database Error Occurred" });
    }



})


router.delete('/delete/:id', async(req,res)=>{


    const TokenInfo = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.TOKEN_SECRET
     ); 


    console.log(TokenInfo)
    let deleted_order =await OrderRepo.destroyOrderById(req.params.id, TokenInfo._role) 


    if(deleted_order){
        res.status(200).json({Message: "deleted succesfuly"})

        
    }
    else{

        res.status(500).json({ Message: "Database Error Occurred" });

    }
})


module.exports = router;