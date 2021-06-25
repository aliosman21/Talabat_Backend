const cors = require("cors");
const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
// const httpsServerOptions = require("./certificates");
const staticDirPoviders = "./images/providers";
const staticDirOrderStatus = "./images/orderstatus";
const staticDirItems = "./images/items";
const staticDirHomePage = "./images/homepage";
const staticCVs = "./API/V1/Careers/CVs";
const path = require("path");
const logger = require("./Logger");

const socket = require("socket.io");

//--------------------------------------Route Imports----------------------------------------------------\\

//---------------Super User--------------------\\
const superUserAuth = require("./API/V1/SuperUsers/Authentication");
const superUserContactUsForm = require("./API/V1/SuperUsers/ContactUs");
const deleteProvider = require("./API/V1/SuperUsers/DeleteProvider");
const allUnapproved = require("./API/V1/SuperUsers/UnApprovedProviders");
const coupons = require("./API/V1/SuperUsers/Coupons");
const allDrivers = require("./API/V1/SuperUsers/AllDrivers");

//---------------Super User--------------------\\

//---------------Provider--------------------\\
const providerAuth = require("./API/V1/Providers/Authentication");
const providerProfile = require("./API/V1/Providers/Profile");
const providerCategories = require("./API/V1/Providers/Categories");
const providerItems = require("./API/V1/Providers/Items");
const providerItemOptions = require("./API/V1/Providers/ItemOptions");
const providerItemAdditionalOptions = require("./API/V1/Providers/ItemAdditionalOptions");
const providerOrders = require("./API/V1/Providers/orderState");

//---------------Provider--------------------\\

//----------------Orders---------------------//
const clientooo = require("./API/V1/orders/CreateOrder");
//----------------Orders---------------------//

//---------------Client--------------------\\
const clientAuth = require("./API/V1/Clients/Authentication");
const clientInfo = require("./API/V1/Clients/ClientInfo");
const clientOrderStatus = require("./API/V1/Clients/OrderStatus");
const clientAddProviderReview = require("./API/V1/Clients/AddReview");
const lastCoupon = require("./API/V1/Clients/GetLastCoupon");
//---------------Client--------------------\\

//---------------Driver--------------------\\
const driverAuth = require("./API/V1/Driver/Authentication");
const driverInfo = require("./API/V1/Driver/DriverInfo");
const driverSocket = require("./API/V1/Driver/driverSocket");
const driverStatus = require("./API/V1/Driver/DriverStatus");
//---------------Driver--------------------\\

//---------------guest--------------------\\
const providerSearch = require("./API/V1/Guest/ProvidersSearch");
const restaurant = require("./API/V1/Guest/restaurantPage");
const allRestaurants = require("./API/V1/Guest/allRestaurants");
const allProviders = require("./API/V1/Guest/allProviders");
//---------------restaurant--------------------\\
//const restaurant = require("./API/V1/Restaurant/restaurantPage");
// const restaurant = require("./API/V1/Restaurant/restaurantPage");
//---------------restaurant--------------------\\

//---------------feedback----------------------\\

const feedback = require("./API/V1/feedback/feedback");

//---------------feedback----------------------\\

const careers = require("./API/V1/Careers/apply");
//--------------------------------------Route Imports-----------------------------------------------------------\\

//--------------------------------------Server Configurations----------------------------------------------------\\
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(
  "/providers/images/",
  express.static(path.join(__dirname, staticDirPoviders))
);
app.use(
  "/orderstatus/images/",
  express.static(path.join(__dirname, staticDirOrderStatus))
);
app.use("/items/images/", express.static(path.join(__dirname, staticDirItems)));
app.use("/CVs/", express.static(path.join(__dirname, staticCVs)));
app.use(
  "/homepage/images/",
  express.static(path.join(__dirname, staticDirHomePage))
);
app.use(
  express.json({
    limit: "5mb",
  })
);
//--------------------------------------Server Configurations----------------------------------------------------\\

//--------------------------------------Routes-------------------------------------------------------------\\
app.get("/", async (req, res) => {
  res.send("Hello ");
});

app.use("/api/v1/superuser/authenticate", superUserAuth);
app.use("/api/v1/superuser/delete/provider", deleteProvider);
app.use("/api/v1/superuser/unapproved/providers", allUnapproved);
app.use("/api/v1/superuser/coupons", coupons);
app.use("/api/v1/superuser/get/alldrivers", allDrivers);

app.use("/api/v1/client/authenticate", clientAuth);
app.use("/api/v1/client/info", clientInfo);
app.use("/api/v1/client/order/status", clientOrderStatus);
app.use("/api/v1/client/order/review", clientAddProviderReview);
app.use("/api/v1/client/coupon", lastCoupon);

app.use("/api/v1/orders/CreateOrder", clientooo);
app.use("/api/v1/forms/", superUserContactUsForm);
app.use("/api/v1/provider/authenticate", providerAuth);
app.use("/api/v1/provider/info", providerProfile);
app.use("/api/v1/provider/categories", providerCategories);
app.use("/api/v1/provider/items", providerItems);
app.use("/api/v1/provider/itemoptions", providerItemOptions);
app.use(
  "/api/v1/provider/itemadditionaloptions",
  providerItemAdditionalOptions
);
app.use("/api/v1/provider/orders", providerOrders);

app.use("/api/v1/driver/authenticate", driverAuth);
app.use("/api/v1/driver/info", driverInfo);
app.use("/api/v1/driver/socket", driverSocket);
app.use("/api/v1/driver/status", driverStatus);

app.use("/api/v1/careers", careers);

//----guest---\\
//app.use("/api/v1/guest/restaurant", restaurant);
app.use("/api/v1/guest/lookup", providerSearch);
app.use("/api/v1/guest/restaurants", allRestaurants);
app.use("/api/v1/guest/providers", allProviders);

app.use("/api/v1/feedback", feedback);

//--------------------------------------Routes-------------------------------------------------------------\\

//--------------------------------------Server Listener----------------------------------------------------\\

// const server = https.createServer(httpsServerOptions.options, app);
const server = app.listen(port, () => console.log("Server Up on port " + port));
const io = socket(server);
global.socket = io;

// global.socket.on("joinroom", function (socket) {
//    console.log(socket);
//  socket.on("join", function (room) {
//     socket.join(room);
//  });
// });

global.socket.on("connection", function (socket) {
  //  console.log("HERE", socket.id);
  socket.on("room", function (room) {
    console.log(room);
    logger.info("Socket Connection made to room ", room);
    socket.join(room);
  });
});
//--------------------------------------Server Listener----------------------------------------------------\\
