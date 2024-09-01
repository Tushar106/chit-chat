const mongoose=require('mongoose')
const {Schema}=mongoose
const userSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type: String ,  unique : true,
    required:true
   },
   password:{
    type:String,
    required:true,
   },
   picture:{
    type:String,
    default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
   }
},{timestamps:true})
module.exports= mongoose.model("User",userSchema)