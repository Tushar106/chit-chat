const express=require("express");
const { verify } = require("../middleware/authMiddleWare");
const { sendMessage } = require("../controllers/message");
const router=express();
router.post("/",verify,sendMessage)
router.get("/:chatId",verify,)

module.exports=router