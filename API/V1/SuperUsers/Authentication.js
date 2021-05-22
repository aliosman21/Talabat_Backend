const router = require("express").Router();

router.get("/", async (req, res) => {
   res.send({ Message: "HEL:LLOO" });
});

module.exports = router;
