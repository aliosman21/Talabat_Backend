const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");

module.exports.InsertClient = async (client_info) => {
  try {
    await db.Client.create({
      name: client_info.name,
      email: client_info.email,
      password: await HashingFunctions.hashPassword(client_info.password),
      mobile: client_info.mobile,
      gender: client_info.gender,
      country: client_info.country,
      date_of_birth: client_info.date_of_birth,
    });
    return true;
  } catch (err) {
    logger.error("Database Insertion failed err: ", err);
    return false;
  }
};

module.exports.FindByEmail = async (client_info) => {
  try {
    const client_retrieved = await db.Client.findOne({
      where: {
        email: client_info.email,
      },
    });
    if (client_retrieved) {
      return (await HashingFunctions.hashCompare(
        client_info.password,
        client_retrieved.password
      ))
        ? client_retrieved
        : false;
    } else {
      return false;
    }
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindByID = async (client_info) => {
  try {
    const client_retrieved = await db.Client.findOne({
      where: {
        id: client_info._id,
      },
    });
    if (client_retrieved) {
      const clientValues = {
        name: client_retrieved.dataValues.name,
        email: client_retrieved.dataValues.email,
        mobile: client_retrieved.dataValues.mobile,
        gender: client_retrieved.dataValues.gender,
        country: client_retrieved.dataValues.country,
        date_of_birth: client_retrieved.dataValues.date_of_birth,
      };
      return clientValues;
    } else {
      return false;
    }
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.Update = async (client,updatedData) => {
    console.log(updatedData)
   try {
     client.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};
