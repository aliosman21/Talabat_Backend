const fs = require("fs");

const key = fs.readFileSync(__dirname + "/server_certificates/server.key");
const cert = fs.readFileSync(__dirname + "/server_certificates/server.crt");
const options = {
   key: key,
   cert: cert,
};

module.exports = { options: options };
