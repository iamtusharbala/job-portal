import User from "../models/userSchema.js";


export const registerController = async (req, res) => {
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
        const newUser = new User({
            name, emailId, password, location
        })
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "New User created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: false,
            message: "Error in Register Controller",
            error
        })
    }
}