const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const clientRepository = require("../../Repositories/ClientRepository");
const jwt = require("jsonwebtoken");
const OrdersRepo = require("../../Repositories/OrdersRepository");

router.get("/", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const client_Found = await clientRepository.FindByID(client_info);
   if (client_Found) {
      const Orders_Found = await OrdersRepo.FindClientOrders(client_info);
      console.log(client_Found.Client_Addresses[0])
      res.status(200).json({
      client: client_Found,
      orders: Orders_Found
      });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.post("/edit", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
//       console.log(client_Found)
       const Updated_client = await clientRepository.Update(client_Found,req.body)
//       console.log(req.body);
       if (Updated_client){
           console.log(Updated_client);

            res.status(200).json({ Message : "updated successfully" });
            }
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

router.post("/addnewaddress", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
       console.log(client_Found)
       const Updated_address = await clientRepository.InsertAddress(client_Found,req.body)
       console.log(req.body);
       if (Updated_address)
            res.status(200).json({ Message : "added successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});
router.post("/editaddress", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
       console.log(client_Found)
       const Updated_address = await clientRepository.EditAddress(client_Found,req.body)
       console.log(req.body);
       if (Updated_address)
            res.status(200).json({ Message : "updated successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

router.delete("/delete", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
       date = new Date().toISOString().slice(0, 19).replace('T', ' ')
       const Updated_client = await clientRepository.Update(client_Found,{deletedAt : date})
       if (Updated_client){
            res.status(200).json({ Message : "updated successfully" });
            }
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

router.get("/allorders", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   
      const Orders_Found = await OrdersRepo.FindClientOrders(client_info);
      if(Orders_Found){
         res.status(200).json(Orders_Found);
      } else {
         res.status(500).json({ Message: "Database Error Occurred" });
      }
});

module.exports = router;
