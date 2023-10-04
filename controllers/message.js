const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");




const sendMessage=expressAsyncHandler(async(req,res)=>{
    const {content,chatId }=req.body

    if(!content || !chatId){
        res.status(200)
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
        message=await message.populate("sender","name pic").execPopulate();
        message=await message.populate("chat").execPopulate();
        message=await User.populate(message,{
            path:"chat.users",
            select:"name pic email"
        })
        await Chat.findByIdAndUpdate(chatId,{
            latesMessage:message
        })

        res.status(200).json(message);
    } catch (error) {
        console.log(error)
    }

})

module.exports={sendMessage};