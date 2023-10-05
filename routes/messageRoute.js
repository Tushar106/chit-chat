const express=require("express");
const { verify } = require("../middleware/authMiddleWare");
const { sendMessage, fetchAllChat } = require("../controllers/message");
const router=express();
router.post("/",verify,sendMessage)
router.get("/:chatId",verify,fetchAllChat)

module.exports=router