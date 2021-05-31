const router = require("express").Router();
const ProviderRepo = require("../../Repositories/ProviderRepository");
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");

router.delete("/:id", VerifyClearance.CheckAccessPrivilege("Super User"), async (req, res) => {
   (await ProviderRepo.destroyProviderById(req.params.id, "Super User"))
      ? res.status(200).json({ Message: "Provider Deleted Successfully" })
      : res.status(500).json({ Message: "Database Error Occurred" });
});
module.exports = router;
