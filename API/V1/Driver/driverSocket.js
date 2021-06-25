const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const driverRepository = require("../../Repositories/DriverRepository");
const orderRepository = require("../../Repositories/OrdersRepository");

router.post("/", async (req, res) => {
  /**
   * Get nearest order
   * Send order ID,info to driver
   * driver will go to order
   * create room for this order
   */
  const order_found = await driverRepository.FindNearestOrders(req.body);

  if (order_found) {
    (await orderRepository.updateDriverIdForOrder(
      order_found[0].id,
      req.body.driver_id
    ))
      ? res.status(200).json({ Order: order_found })
      : res.status(400).json({ Message: "No Orders found in your area" });
  } else {
    res.status(400).json({ Message: "No Orders found in your area" });
  }

  //    global.socket.emit("Hello", req.body);
  //    global.socket.in("room1").emit("message", "Order on way");
  //    res.status(200).json({ Hello: "MEssage" });
});

router.post("/updatelocation", async (req, res) => {
  global.socket
    .in(req.body.order_id)
    .emit("location", { lat: req.body.lat, long: req.body.long });
  console.log("UPDATED");
  res.status(200).json({ Message: "Location Updated" });
});

module.exports = router;
