const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const driverRepository = require("../../Repositories/DriverRepository");

router.post("/", async (req, res) => {
   /**
    * Get nearest order
    * Send order ID,info to driver
    * driver will go to order
    * create room for this order
    */
   const order_found = await driverRepository.FindNearestOrders(req.body);
   if (order_found.length != 0) {
      res.status(200).json({ Message: order_found });
   } else {
      res.status(400).json({ Message: "No Orders found in your area" });
   }

   //    global.socket.emit("Hello", req.body);
   //    global.socket.in("room1").emit("message", "Order on way");
   //    res.status(200).json({ Hello: "MEssage" });
});

router.post("/updatelocation", async (req, res) => {
   global.socket.in("orderIdSent").emit("location", "lat/long");
   res.status(200).json({ Hello: "MEssage" });
});

module.exports = router;
