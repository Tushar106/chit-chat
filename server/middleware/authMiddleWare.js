
const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken")

const verify=expressAsyncHandler(async(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token)
    if(!token){
        res.status(400)
        throw new Error("Token is not present")
    }
    jwt.verify(token,process.env.Jwt,(err,user)=>{
    if(err) 
    throw new Error("Token Error")
    req.user=user  //koi random property user me user bhej diya
    next();//iske baad voh next vale route pe gya
    })
})
module.exports={verify}