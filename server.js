const cors = require("cors");
const express = require("express");
// const { v4: uuidv4 } = require("uuid");
const https = require("https");
const httpsServerOptions = require("./certificates");
//--------------------------------------Route Imports----------------------------------------------------\\

const superUserAuth = require("./API/V1/SuperUsers/Authentication");

//--------------------------------------Route Imports----------------------------------------------------\\

//--------------------------------------Server Options----------------------------------------------------\\

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
//--------------------------------------Server Options----------------------------------------------------\\

//--------------------------------------Routes-------------------------------------------------------------\\
app.use("/api/superuser/authenticate", superUserAuth);
//--------------------------------------Routes-------------------------------------------------------------\\

//--------------------------------------Server Listener----------------------------------------------------\\

const server = https.createServer(httpsServerOptions.options, app);
server.listen(port, () => console.log("Server Up niggas"));
//--------------------------------------Server Listener----------------------------------------------------\\

// const io = socket(server);
