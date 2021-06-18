const db = require("../../db/models/index");
const logger = require("../../Logger");
const { sequelize } = require("../../db/models/index");
 
module.exports.AddReview = async (review,clientId,provId) => {
   try {
      await db.Provider_reviews.create({
        provider_id:provId,
        client_id:clientId,
        content:review.content
      });
      return true;
   } catch (err) {
      logger.error("Database review Insertion failed err: ", err);
      return false;
   }
};
 
