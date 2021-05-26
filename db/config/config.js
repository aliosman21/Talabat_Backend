require("dotenv").config();

module.exports = {
   development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "talabat_dev",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
   },
   test: {
      username: "root",
      password: "ali",
      database: "talabat_test",
      host: "127.0.0.1",
      port: 3307,
      dialect: "mysql",
   },
   production: {
      username: "root",
      password: "ali",
      database: "talabat_production",
      host: "127.0.0.1",
      port: 3307,
      dialect: "mysql",
   },
};
