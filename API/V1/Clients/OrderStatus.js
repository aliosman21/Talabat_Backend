const router = require("express").Router();
const OrderRepo = require("../../Repositories/OrdersRepository");
const jwt = require("jsonwebtoken");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.get("/:id", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   // console.log("in right path");
   // console.log(req.params.id);
   const orderStatus = await OrderRepo.FindOrderStatus(req.params.id);
   if (orderStatus) {
      res.status(200).json({ orderStatus });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});
router.get("/trackorder", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   /**
    * Client sends the order_id
    */

   global.socket.on("connection", function (socket) {
      socket.on("join", function (room) {
         socket.join(room);
      });
   });
   res.status(200).json({ Message: "Connected to socket" });
});

module.exports = router;
