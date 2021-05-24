const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const path = require("path");

const scriptName = path.basename(__filename);

const myFormat = printf((info) => {
   return `${info.timestamp} [${info.label}] [${info.level}]: ${info.message}`;
});

const logger = createLogger({
   format: combine(
      label({ label: scriptName }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
   ),
   transports: [new transports.File({ filename: "output.log", level: "debug" })],
});

module.exports = logger;
