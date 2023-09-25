
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const register = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        const error = new Error("Please Enter all the Fields")
        error.status = 400;
        throw error
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        const error = new Error("User already Exist")
        error.status = 400;
        throw error
    }
    if (password.length < 8) {
        res.status(400)
        throw new Error('Invalid Form, Password must contain greater than or equal to 8 characters.')
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0
    // variable to count lowercase characters in the password.
    let countLowerCase = 0
    // variable to count digit characters in the password.
    let countDigit = 0
    // variable to count special characters in the password.
    let countSpecialCharacters = 0

    for (let i = 0; i < password.length; i++) {
        const specialChars = [
            '!',
            '@',
            '#',
            '$',
            '%',
            '^',
            '&',
            '*',
            '(',
            ')',
            '_',
            '-',
            '+',
            '=',
            '[',
            '{',
            ']',
            '}',
            ':',
            ';',
            '<',
            '>',
        ]

        if (specialChars.includes(password[i])) {
            // this means that the character is special, so increment countSpecialCharacters
            countSpecialCharacters++
        } else if (!isNaN(password[i] * 1)) {
            // this means that the character is a digit, so increment countDigit
            countDigit++
        } else {
            if (password[i] == password[i].toUpperCase()) {
                // this means that the character is an upper case character, so increment countUpperCase
                countUpperCase++
            }
            if (password[i] == password[i].toLowerCase()) {
                // this means that the character is lowercase, so increment countUpperCase
                countLowerCase++
            }
        }
    }

    if (countLowerCase == 0) {
        // invalid form, 0 lowercase characters
        res.status(400)
        throw new Error('Invalid Form, 0 lower case characters in password')
    }

    if (countUpperCase == 0) {
        // invalid form, 0 upper case characters    
        res.status(400)
        throw new Error('Invalid Form, 0 upper case characters in password')

    }

    if (countDigit == 0) {
        // invalid form, 0 digit characters
        res.status(400)
        throw new Error('Invalid Form, 0 digit characters in password')
    }

    if (countSpecialCharacters == 0) {
        // invalid form, 0 special characters characters
        res.status(400)
        throw new Error('Invalid Form, 0 special characters in password')
        
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
        name: name,
        email: email,
        password: hash
    })
    await newUser.save();
    var token = jwt.sign({ id: newUser._id }, process.env.JWT);
    res.status(200).cookie("access_token", token, {
        httpOnly: true
    }).json(newUser)
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Enter the Fields")
    }
    const userExist = await User.findOne({ email })
    if (!userExist) {
        res.status(400)
        const error = new Error("User don't Exist")
        error.status = 400;
        throw error
    }
    const isPasswordCorrect = await bcrypt.compareSync(password, userExist.password);
    if (!isPasswordCorrect) {
        res.status(400)
        const error = new Error("Enter the correct Password")
        error.status = 400;
        throw error
    }
    var token = jwt.sign({ id: userExist._id }, process.env.JWT);
    res.status(200).cookie("access_token", token, {
        httpOnly: true
    }).json(userExist)
})
// /api/user?search=tushar
const getAllUser = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}
    const users = await User.find(keyword).find({ _id: { $ne: req.user.id } }).select("-password")
    res.status(200).json(users);
}
module.exports = { register, login, getAllUser }


//Must Remove password