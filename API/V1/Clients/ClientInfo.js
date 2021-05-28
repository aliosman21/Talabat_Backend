const router = require("express").Router();
const VerifyClearance = require("../GlobalFunction/VerifyUsersClearance");
const clientRepository = require("../../Repositories/ClientRepository");
const jwt = require("jsonwebtoken");

router.get("/", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
   const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
   const client_Found = await clientRepository.FindByID(client_info);
   if (client_Found) {
      res.status(200).json({ client: client_Found });
   } else {
      res.status(500).json({ Message: "Database Error Occurred" });
   }
});

router.post("/edit", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
       const Updated_client = await clientRepository.Update(client_Found,req.body)
       if (Updated_client)
            res.status(200).json({ Message : "updated successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

router.delete("/delete", VerifyClearance.CheckAccessPrivilege("Client"), async (req, res) => {
       const client_info = jwt.decode(req.headers.authorization.split(" ")[1]);
       const client_Found = await clientRepository.FindByID(client_info);
       date = new Date().toISOString().slice(0, 19).replace('T', ' ')
       const Updated_client = await clientRepository.Update(client_Found,{deletedAt : date})
       if (Updated_client)
            res.status(200).json({ Message : "updated successfully" });
       else
            res.status(500).json({ Message: "Database Error Occurred" });

});

module.exports = router;
