const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");


module.exports.InsertClient = async (client_info) => {
const transaction = await sequelize.transaction();

  try {
   User = await db.Client.create({
      name: client_info.name,
      email: client_info.email,
      password: await HashingFunctions.hashPassword(client_info.password),
      mobile: client_info.mobile,
      gender: client_info.gender,
      country: client_info.country,
      date_of_birth: client_info.date_of_birth,
    },{transaction: transaction});
    await db.Client_Address.create({
        id : User.id,
        client_latitude:client_info.clientLAt,
        client_longitude:client_info.clientLng,
        address_type:client_info.type,

    },{transaction: transaction})
    await transaction.commit();
    return true;
  } catch (err) {
    await transaction.rollback();
    console.log(err)
    logger.error("Database Insertion failed err: ", err);
    return false;
  }
};
module.exports.InsertAddress = async (client_info,location) => {
  try {
    await db.Client_Address.create({
        id : client_info.id,
        client_latitude:location.clientLAt,
        client_longitude:location.clientLng,
        address_type:location.type,
    })
    return true;
  } catch (err) {
    console.log(err)
    logger.error("Database Insertion failed err: ", err);
    return false;
  }
};
module.exports.EditAddress = async (client_info,data) => {
  try {
     address = await db.Client_Address.findOne({
        where :
        {
                id : client_info.id,
                client_latitude:data.old.clientLAt,
                client_longitude:data.old.clientLng,
        }})
       await  address.update({
                id : client_info.id,
                client_latitude:data.newLocation.clientLAt,
                client_longitude:data.newLocation.clientLng,
                address_type:data.newLocation.type,
        })
        return true;
    }

   catch (err) {
    console.log(err)
    logger.error("Database Update failed err: ", err);
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
    return client_retrieved ? client_retrieved : false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindByID = async (client_info) => {
  try {
    //console.log(client_info._id);
    const client_retrieved = await db.Client.findOne({
      where: {
        id: client_info._id,
      },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      include:[{
                  model: db.Client_Address,
            }]
    });

    return client_retrieved ? client_retrieved : false;
  } catch (err) {
    console.log(err);
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.Update = async (client, client_info) => {
//  console.log(updatedData);
  const transaction = await sequelize.transaction();

  try {
   await client.update({
     name: client_info.name,
         email: client_info.email,
//         password: await HashingFunctions.hashPassword(client_info.password),
         mobile: client_info.mobile,
         gender: client_info.gender,
         country: client_info.country,
         date_of_birth: client_info.date_of_birth,
   },{transaction:transaction});
     await db.Client_Address.create({
            id : client.id,
            client_latitude:client_info.clientLAt,
            client_longitude:client_info.clientLng,
            address_type:client_info.type,

        },{transaction: transaction})
        await transaction.commit();
    return true;
  } catch (err) {
   await transaction.rollback();
   console.log(err)
    logger.error("Database update client info failed err: ", err);
    return false;
  }
};
