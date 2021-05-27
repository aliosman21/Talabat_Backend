const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const clientRepository = require("../../Repositories/ClientRepository");
const jwt = require("jsonwebtoken");

router.get(
  "/",
  VerifyClearance.CheckAccessPrivilege("Client"),
  async (req, res) => {
    const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
    const client_Found = await clientRepository.FindByID(client_info);
    if (client_Found) {
      res.status(200).json({ client: client_Found });
    } else {
      res.status(500).json({ Message: "Database Error Occurred" });
    }
  }
);

module.exports = router;
