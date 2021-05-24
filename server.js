const cors = require("cors");
const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const httpsServerOptions = require("./certificates");
//--------------------------------------Route Imports----------------------------------------------------\\

//---------------Super User--------------------\\
const superUserAuth = require("./API/V1/SuperUsers/Authentication");
//---------------Super User--------------------\\

//---------------Provider--------------------\\
const providerAuth = require("./API/V1/Providers/Authentication");
//---------------Provider--------------------\\

//---------------Client--------------------\\
const clientAuth = require("./API/V1/Clients/Authentication");
//---------------Client--------------------\\

//--------------------------------------Route Imports-----------------------------------------------------------\\

//--------------------------------------Server Configurations----------------------------------------------------\\
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
//--------------------------------------Server Configurations----------------------------------------------------\\

//--------------------------------------Routes-------------------------------------------------------------\\
app.use("/api/v1/superuser/authenticate", superUserAuth);
app.use("/api/v1/client/authenticate", clientAuth);
app.use("/api/v1/provider/authenticate", providerAuth);
//--------------------------------------Routes-------------------------------------------------------------\\

//--------------------------------------Server Listener----------------------------------------------------\\

const server = https.createServer(httpsServerOptions.options, app);
server.listen(port, () => console.log("Server Up niggas"));
//--------------------------------------Server Listener----------------------------------------------------\\

// const io = socket(server);
