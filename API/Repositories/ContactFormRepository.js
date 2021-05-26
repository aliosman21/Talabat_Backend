const db = require("../../db/models/index");
const logger = require("../../Logger");

module.exports.InsertResponse = async (form_info) => {
   try {
      await db.Contact_Us.create({
         name: form_info.name,
         email: form_info.email,
         mobile: form_info.mobile,
         message: form_info.message,
      });
      return true;
   } catch (err) {
      logger.error("Database Insertion failed err: ", err);
      return false;
   }
};

module.exports.FindAll = async () => {
   try {
      const fetchedResponses = await db.Contact_Us.findAll();
      return fetchedResponses;
   } catch (err) {
      logger.error("Database Selection failed err: ", err);
      return false;
   }
};
