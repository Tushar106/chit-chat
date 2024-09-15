const express=require('express');
const {register, getAllUser} = require('../controllers/user');
const {login} = require('../controllers/user');
const { verify } = require('../middleware/authMiddleWare');

const router=express();

router.post("/register",register)
// router.post("/login",login)
router.get("/",verify,getAllUser)
router.post("/login",(req,res)=>{
    res.send("working")
})



module.exports=router;