const db = require("../../db/models/index");
const HashingFunctions = require("../V1/GlobalFunction/HashingFunctions");
const logger = require("../../Logger");
const order = require("../../db/models/order");
const { sequelize } = require("../../db/models/index");

module.exports.InsertOrder = async (order_info,client_info) => {
  try{
   
    console.log(order_info);
      const Client_Order = await db.Order.create({
        client_id: client_info.id,
        pickup_latitude : order_info.lat,
        pickup_longitude: order_info.lng,
        total_price: order_info.total_price,
        order_status: order_info.order_status,
        delivery_latitude: order_info.lat,
        delivery_longitude: order_info.lng,
        provider_id: order_info.provider_id,
        order_status: "Pending"
      })
      //console.log(Client_Order.dataValues.client_id);
      order_infoParsed = JSON.parse(order_info.cart);
      for(let i = 0; i < order_infoParsed.length; i++) {
        console.log(order_infoParsed[i]);
      await db.Order_Item.create({
        order_id: Client_Order.id,
        item_total_price: order_infoParsed[i].price,
        quantity: order_infoParsed[i].quantity,
        item_id:order_infoParsed[i].id

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


module.exports.destroyOrderById = async (order_id, role) => {
  
  try {
    const t = await sequelize.transaction();

     await db.Order.update(
        { deleted_by: role },
        {
           where: {
              id: order_id,
           },
           individualHooks: true,
        },
        { transaction: t }
     );

     await db.Order.destroy(
        {
           where: {
              id: order_id,
           },
           individualHooks: true,
        },
        { transaction: t }
     );
     await t.commit();
     return true;
  } catch (err) {
     logger.error("Database Destruction failed err: ", err);
     await t.rollback();
     return false;
  }

};



module.exports.FindOrderStatus = async (order_id) => {
  try {
    const Order_status = await db.Order.findOne({
      attributes: ["order_status"],
      where: {
        id: order_id,
      },
    });
    if (Order_status) {
      return Order_status;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
    logger.error("Database order status Selection failed err: ", err);
    return false;
  }
};