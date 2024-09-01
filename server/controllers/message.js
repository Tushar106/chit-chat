const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");




const sendMessage=expressAsyncHandler(async(req,res)=>{
    const {content,chatId }=req.body

    if(!content || !chatId){
        res.status(400)
        const error = new Error("Invalid data passed")
        error.status = 200;
        throw error
    }
    try {
        var message=await new Message({
            content:content,
            sender:req.user.id,
            chat:chatId
        })
        await message.save();
        message=await message.populate("sender","name picture");
        message=await message.populate("chat");
        message=await User.populate(message,{
            path:"chat.users",
            select:"name picture email"
        })
        const c=await Chat.findByIdAndUpdate(chatId,{
            latestMessage:message
        },{new:true})
        res.status(200).json(message);
    } catch (err) {
        res.status(400)
        const error = new Error(err.message)
        error.status = 400;
        throw error 
    }

})
const fetchAllChat=expressAsyncHandler(async(req,res)=>{
    const chatId=req.params.chatId;
    try {
        // console.log(chatId)
        const message=await Message.find({chat:chatId}).populate("sender","name picture email").populate("chat");
        res.status(200).json(message);
    } catch (err) {
        res.status(400)
        const error = new Error(err.message)
        error.status = 400;
        throw error 
    }

})
module.exports={sendMessage,fetchAllChat}; 