const mongoose =require("mongoose")

const {Schema}=mongoose

const ChatSchema=new mongoose.Schema({
    chatname:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
        type:mongoose.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    // picture:{
    //     type:String,
    //     default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    //    }

},{timestamps:true})

module.exports= mongoose.model("Chat",ChatSchema)