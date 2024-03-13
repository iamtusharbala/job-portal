import User from "../models/userSchema.js";
import { passwordHashing, passwordCompare } from "../utils/auth.js";
import JWT from 'jsonwebtoken'


export const registerController = async (req, res, next) => {
    try {
        const { name, emailId, password, location } = req.body
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name must be provided"
            })
        }
        if (!emailId) {
            return res.status(400).send({
                success: false,
                message: "Email ID must be provided"
            })
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: "Password must be provided"
            })
        }
        if (!location) {
            return res.status(400).send({
                success: false,
                message: "Location must be provided"
            })
        }
        const checkUser = await User.findOne({ emailId })
        if (checkUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = passwordHashing(password)
        const newUser = new User({
            name, emailId, password: hashedPassword, location
        })
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "New User created successfully"
        })
    } catch (error) {
        next(error)
    }
}


export const loginController = async (req, res, next) => {
    try {
        const { emailId, password } = req.body
        if (!emailId || !password) {
            return res.status(400).send({
                success: false,
                message: "Email Id or password must be provided"
            })
        }
        const checkUser = await User.findOne({ emailId })
        console.log(checkUser)
        if (!checkUser) {
            return res.status(400).send({
                success: false,
                message: "No such user exits please create an account"
            })
        }
        const compare = passwordCompare(password, checkUser.password)
        console.log(compare);
        if (!compare) {
            return res.status(400).send({
                success: false,
                message: "Incorrect Password"
            })
        }
        const token = JWT.sign({ _id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: '2d' })
        res.status(200).send({
            success: true,
            message: "Logged in succesfully",
            token
        })

    } catch (error) {
        next(error)
    }
}