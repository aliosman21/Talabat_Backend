const cors = require("cors");
const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const httpsServerOptions = require("./certificates");
const staticDirPoviders = "./images/providers";
const staticDirOrderStatus = "./images/orderstatus";
const path = require("path");

//--------------------------------------Route Imports----------------------------------------------------\\

//---------------Super User--------------------\\
const superUserAuth = require("./API/V1/SuperUsers/Authentication");
const superUserContactUsForm = require("./API/V1/SuperUsers/ContactUs");
const deleteProvider = require("./API/V1/SuperUsers/DeleteProvider");
const allUnapproved = require("./API/V1/SuperUsers/UnApprovedProviders");
//---------------Super User--------------------\\

//---------------Provider--------------------\\
const providerAuth = require("./API/V1/Providers/Authentication");
const providerProfile = require("./API/V1/Providers/Profile");
//---------------Provider--------------------\\

//---------------Client--------------------\\
const clientAuth = require("./API/V1/Clients/Authentication");
const clientInfo = require("./API/V1/Clients/ClientInfo");
const clientOrderStatus = require("./API/V1/Clients/OrderStatus")
//---------------Client--------------------\\

//---------------guest--------------------\\
const providerSearch = require("./API/V1/Guest/ProvidersSearch");
const restaurant = require("./API/V1/Guest/restaurantPage");
const allRestaurants = require("./API/V1/Guest/allRestaurants");
//---------------restaurant--------------------\\
// const restaurant = require("./API/V1/Restaurant/restaurantPage");
//---------------restaurant--------------------\\

//---------------feedback----------------------\\

const feedback = require("./API/V1/feedback/feedback");

//---------------feedback----------------------\\
//--------------------------------------Route Imports-----------------------------------------------------------\\

//--------------------------------------Server Configurations----------------------------------------------------\\
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use("/providers/images/", express.static(path.join(__dirname, staticDirPoviders)));
app.use("/orderstatus/images/", express.static(path.join(__dirname, staticDirOrderStatus)));
app.use(
   express.json({
      limit: "15mb",
   })
);
//--------------------------------------Server Configurations----------------------------------------------------\\

//--------------------------------------Routes-------------------------------------------------------------\\
app.get("/", async (req, res) => {
   res.send("Hello ");
});

// app.post('/api/v1/feedback', jsonparser,(req,res)=>{

//    console.log("helloa"+ req.body.effort );

//    res.send({success: 'heelloooo'})

// })
app.use("/api/v1/superuser/authenticate", superUserAuth);
app.use("/api/v1/superuser/delete/provider", deleteProvider);
app.use("/api/v1/superuser/unapproved/providers", allUnapproved);
app.use("/api/v1/client/authenticate", clientAuth);
app.use("/api/v1/client/info", clientInfo);
app.use("/api/v1/client/order/status", clientOrderStatus);

app.use("/api/v1/forms/", superUserContactUsForm);
app.use("/api/v1/provider/authenticate", providerAuth);
app.use("/api/v1/provider/info", providerProfile);
//----guest---\\
app.use("/api/v1/guest/restaurant", restaurant);
app.use("/api/v1/guest/lookup", providerSearch);
app.use("/api/v1/guest/restaurants", allRestaurants);

app.use("/api/v1/feedback", feedback);

//--------------------------------------Routes-------------------------------------------------------------\\

//--------------------------------------Server Listener----------------------------------------------------\\

const server = https.createServer(httpsServerOptions.options, app);
app.listen(port, () => console.log("Server Up niggas"));

//--------------------------------------Server Listener----------------------------------------------------\\

// const io = socket(server);
