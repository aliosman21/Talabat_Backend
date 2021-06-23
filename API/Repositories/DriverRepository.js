const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");

module.exports.InsertDriver = async (Driver_info) => {
  try {
    await db.Driver.create({
      name: Driver_info.name,
      email: Driver_info.email,
      password: await HashingFunctions.hashPassword(Driver_info.password),
      mobile: Driver_info.mobile,
      work_state: Driver_info.work_state,
    });
    return true;
  } catch (err) {
    logger.error("Database Insertion failed err: ", err);
    return false;
  }
};

module.exports.FindByEmail = async (driver_info) => {
  try {
    const driver_retrieved = await db.Driver.findOne({
      where: {
        email: driver_info.email,
      },
    });
    return driver_retrieved ? driver_retrieved : false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindByID = async (driver_info) => {
  try {
    const driver_retrieved = await db.Driver.findOne({
      where: {
        id: driver_info._id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
    return driver_retrieved ? driver_retrieved : false;
  } catch (err) {
    console.log(err);
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.updateLatLng = async (driver_latAndLng, id) => {
  // console.log(driver_latAndLng, id);
  try {
    const driver = await db.Driver.findOne({ where: { id: id } });
    driver.last_latitude = driver_latAndLng.last_latitude;
    driver.last_longitude = driver_latAndLng.last_longitude;
    await driver.save();
    return true;
  } catch (err) {
    logger.error("Database login failed err: ", err);
    return false;
  }
};

module.exports.DriverOnCall = async (id, state) => {
  try {
    const driver = await db.Driver.findOne({ where: { id: id } });
    driver.work_state = state;
    await driver.save();
    return true;
  } catch (err) {
    logger.error("Database change driver work_state failed err: ", err);
    return false;
  }
};

module.exports.FindAll = async () => {
  try {
    const fetchedResponses = await db.Driver.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    return fetchedResponses;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindNearestOrders = async (driver_location) => {
  try {
    const orders_retrieved = await sequelize.query(
      "CALL getNearOrder (:driverLat, :driverLong)",
      {
        replacements: {
          driverLat: driver_location.latitude,
          driverLong: driver_location.longitude,
        },
      }
    );
    return orders_retrieved ? orders_retrieved : false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};
