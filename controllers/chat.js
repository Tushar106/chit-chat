const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("Enter the userId")
        return res.status(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [{ users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } }]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latesMessage.sender",
        select: "name pic email"
    })
    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        try {
            const newChat = new Chat({
                chatname: "sender",
                isGroupChat: false,
                users: [req.user.id, userId]
            })
            await newChat.save();
            const FullChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password")
            res.status(200).json(FullChat)
        } catch (error) {
            throw new Error(error.message)
        }
    }
})

const fetchChat = expressAsyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 }).then(async (results) => {
            results = await User.populate(results, {
                path: "latesMessage.sender",
                select: "name pic email"
            })
            res.status(200).send(results);
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400)
        throw new Error("Enter the fields")
    }

    var users = req.body.users;

    if (users.length < 2) {
        res.status(400)
        throw new Error("More than 2 users are required")
    }

    users.push(req.user.id);

    try {
        const groupChat = await new Chat({
            chatname: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.id,
        });
        await groupChat.save();
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(200).json(fullGroupChat)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)

    }
})

const renameGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, newName } = req.body;
    if (!chatId || !newName) {
        res.status(400)
        throw new Error("Enter the fields")
    }
    try {
        var chat = await Chat.findByIdAndUpdate(chatId, { chatname: newName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
        if (!chat) {
            res.status(400)
            throw new Error("Chat not found")
        }
        else {
            res.status(200).json(chat);
        }
    }
    catch (err) {
        res.status(400)
        throw new Error(err.message)
    }

})

const addToGroup = expressAsyncHandler(async (req, res) => {
    try {
        const { userId, chatId } = req.body;

        const chat = await Chat.find({
            _id: chatId,
            isGroupChat: true,
            users: { $elemMatch: { $eq: userId } }
        })
        if (chat.length > 0) {
            res.status(200)
            const error = new Error("User already Exist")
            error.status = 200;
            throw error
        }
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (!added) {
            res.status(400);
            throw new Error("Chat not Found")
        }
        else {
            res.status(200).json(added)
        }
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = err.status;
        throw error
    }
})
const removeFromGroup = expressAsyncHandler(async (req, res) => {
    try {
        const { userId, chatId } = req.body;

        const chat = await Chat.find({
            _id: chatId,
            isGroupChat: true,
            users: { $elemMatch: { $eq: userId } }
        })
        if (chat.length === 0) {
            res.status(200)
            const error = new Error("User don't Exist")
            error.status = 200;
            throw error
        }
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (!removed) {
            res.status(400);
            throw new Error("Chat not Found")
        }
        else {
            res.status(200).json(removed)
        }
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = err.status;
        throw error
    }
})

const updateGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, users } = req.body;
    if (users.length < 2) {
        res.status(400)
        throw new Error("More than 2 users are required")
    }
    try {
        var chat = await Chat.findByIdAndUpdate(chatId, { users: users }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
        if (!chat) {
            res.status(400)
            throw new Error("Chat not found")
        }
        else {
            res.status(200).json(chat);
        }
    } catch (err) {
        const error = new Error(err.message)
        error.status = err.status;
        throw error
    }
})



// populate ka kaam jo data object hai oski jagh pura data aa jaye jo actual hai

module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup, updateGroup }

