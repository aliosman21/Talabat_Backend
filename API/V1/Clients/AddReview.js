const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ProvederReviewRepo = require("../../Repositories/ProviderReviewsRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.post("/add/:provider_id", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   const Client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   Client_ID = Client_info._id
   const added_review = await ProvederReviewRepo.AddReview(req.body,Client_ID,req.params.provider_id);

   if (added_review) {
      res.status(200).json({ Message : "Review added successfuly"  });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});



module.exports = router;
