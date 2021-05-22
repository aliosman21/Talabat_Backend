const router = require("express").Router();
const superUserRepo = require("../../Repositories/SuperUsersRepository");

router.get("/", async (req, res) => {
   superUserRepo.insert();
   // superUserRepo.select();
   res.send({ Message: "HEL:LLOO" });
});

module.exports = router;
