require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');


var cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");


const port = process.env.PORT

const app = express();
const corsOptions = {
    origin: ['https://chat-easy.netlify.app', 'https://main--chat-easy.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("connected");
    }
    catch (err) {
        throw err;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb is Disconnected");
})
mongoose.connection.on("connected", () => {
    console.log("MongoDb is Connected");
})
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello world")
})
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
//     next();
// })


app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);



app.use(notFound)
app.use(errorHandler);





const server = app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
    connect();
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["https://chat-easy.netlify.app", 'https://main--chat-easy.netlify.app'],
    }
})
io.on("connection", (socket) => {
    console.log("Connected to Socket.io")

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected")
    })
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room " + room);
    })
    socket.on("typing", (room, user) => {
        socket.in(room).emit("typing", user.name)
    })
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing")
    })

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat
        if (!chat.users) return console.log("chat.users not defined")

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});