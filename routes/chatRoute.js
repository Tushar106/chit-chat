const express=require('express');
const { verify } = require('../middleware/authMiddleWare');
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chat');
const router=express();
router.post("/",verify,accessChat)
router.get("/",verify,fetchChat)
router.post("/group",verify,createGroupChat)
router.put("/rename",verify,renameGroup)
router.put("/groupremove",verify,removeFromGroup)
router.put("/groupadd",verify,addToGroup)




module.exports=router