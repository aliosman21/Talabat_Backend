const router = require('express').Router();


feed = []
router.post('/', async (req,res)=>{

feed.push(req.body)

console.log(req.body)

res.send(req.body)




})





module.exports = router;