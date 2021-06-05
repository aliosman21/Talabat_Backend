const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");
const order = require("../../db/models/order");

module.exports.InsertOrder = async (order_info) => {

};



module.exports.FindClientOrders = async (client_info) => {
  try {
    const Orders_retrieved = await db.Order.findAll({
      where: {
        client_id: client_info._id,
      },
    });
    if (Orders_retrieved) {
      return Orders_retrieved;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindProviderOrders = async (provider_info) => {
  try {
    const Orders_retrieved = await db.Order.findAll({
      where: {
        provider_id: provider_info.id,
      },
    });
    if (Orders_retrieved) {
      return Orders_retrieved;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};



module.exports.FindOrderByID = async (order_id) =>{
  
  try{

    const order_retrieved = await db.Order.findOne({

      where: {id: order_id},
    });

    return order_retrieved ? order_retrieved : false

  } catch (err) {
    console.log(err)
    logger.error("Database Selection failed err: ", err);
    return false;
  }


}

module.exports.Update = async (order,updatedData) => {
   try {
     order.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};



module.exports.UpdateState = async (order,state) => {
  try {
    order.update(updatedData)
     return true
  } catch (err) {
     logger.error("Database update client info failed err: ", err);
     return false;
  }
};