require("dotenv").config();
const express=require("express")
const bodyParser=require("body-parser");
const cors=require('cors')
const { chats } = require("./data/data");
const { default: mongoose } = require("mongoose");
const userRoute =require('./routes/userRoute');
const chatRoute =require('./routes/chatRoute');
const messageRoute =require('./routes/messageRoute');


var cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");


const port=process.env.PORT

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
const connect=async()=>{
    try{
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.MONGO);
        console.log("connected");
    }
    catch(err){
        throw err;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb is Disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDb is Connected");
})
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Hello world")
})


app.use("/api/user",userRoute);
app.use("/api/chat",chatRoute);
app.use("/api/message",messageRoute);



app.use(notFound)
app.use(errorHandler);





app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
    connect();
})