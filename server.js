const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const https = require("https");
const httpsServerOptions = require("./certificates");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
   console.log("a request is here");
   res.status(200).send({ message: "Hello there" });
});

const server = https.createServer(httpsServerOptions.options, app);
server.listen(port, () => console.log("Server Up niggas"));

// const io = socket(server);
