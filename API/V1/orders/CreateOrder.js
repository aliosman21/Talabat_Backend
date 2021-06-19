const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const clientRepository = require("../../Repositories/ClientRepository");
const jwt = require("jsonwebtoken");
const OrdersRepo = require("../../Repositories/OrdersRepository");

router.post("/create", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
    const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
    
    const client_Found = await clientRepository.FindByID(client_info);
  
    const Order_Create = await OrdersRepo.InsertOrder(req.body,client_Found);
   
   
   
         res.status(200).json({ Message : "updated successfully" });
   

});
router.post("/checkCoupon", async (req, res) => {

    const checkCoupon = await OrdersRepo.checkCoupon(req.body);



         res.status(200).json({checkCoupon});


});

module.exports = router;