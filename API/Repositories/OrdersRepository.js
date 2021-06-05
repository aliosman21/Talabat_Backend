const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");

module.exports.InsertOrder = async (order_info,client_info) => {
  try{
    let total_price = 0
    for(i in order_info.cart){
       total_price += i.price
    }
      const Client_Order = await db.Order.Create({
        pickup_latitude : client_info.client_latitude,
        pickup_longitude: client_info.client_longitude,
        total_price: total_price,
        order_status: order_info.order_status,
        delivery_latitude: client_info.client_latitude,
        delivery_longitude: client_info.client_longitude,
        provider_id: order_info.provider_id,
      })
      for(i in order_info.cart) {
      
      await db.Order_items.Create({
        order_id: Client_Order.id,
        item_total_price: i.price,
        quantity: i.quantity,
        item_id:i.id

      })
    }  }
  catch(err){
    console.log(err)
    logger.error("Database insertion failed err: ", err);
    return false;
  }

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
        provider_id: provider_info._id,
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

module.exports.Update = async (order,updatedData) => {
   try {
     order.update(updatedData)
      return true
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};
