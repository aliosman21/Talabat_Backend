const cors = require("cors");
const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const httpsServerOptions = require("./certificates");

//--------------------------------------Route Imports----------------------------------------------------\\

//---------------Super User--------------------\\
const superUserAuth = require("./API/V1/SuperUsers/Authentication");
const superUserContactUsForm = require("./API/V1/SuperUsers/ContactUs");
//---------------Super User--------------------\\

//---------------Provider--------------------\\
const providerAuth = require("./API/V1/Providers/Authentication");
const providerProfile = require("./API/V1/Providers/Profile");
//---------------Provider--------------------\\

//---------------Client--------------------\\
const clientAuth = require("./API/V1/Clients/Authentication");
const providerSearch = require("./API/V1/Clients/ProvidersSearch");
const clientInfo = require("./API/V1/Clients/ClientInfo");
//---------------Client--------------------\\

//---------------restaurant--------------------\\
const restaurant = require("./API/V1/Restaurant/restaurantPage");
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
app.use(express.json());
let bodyparser = require('body-parser')
let jsonparser = bodyparser.json();
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
app.use("/api/v1/client/authenticate", clientAuth);
app.use("/api/v1/client/info", clientInfo);
app.use("/api/v1/client/lookup", providerSearch);

app.use("/api/v1/forms/", superUserContactUsForm);
app.use("/api/v1/provider/authenticate", providerAuth);
app.use("/api/v1/provider/info", providerProfile);

app.use("/api/v1/restaurant", restaurant);



app.use("/api/v1/feedback", feedback);

//--------------------------------------Routes-------------------------------------------------------------\\

//--------------------------------------Server Listener----------------------------------------------------\\

const server = https.createServer(httpsServerOptions.options, app);
app.listen(port, () => console.log("Server Up niggas"));

//--------------------------------------Server Listener----------------------------------------------------\\

// const io = socket(server);

