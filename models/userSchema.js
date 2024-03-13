import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    emailId: {
        type: String,
        required: [true, 'Email ID is required'],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, "Password length should be greater than 8"]
    },
    location: {
        type: String,
        default: "India"
    }
}, { timeseries: true })


const User = mongoose.model('User', userSchema)
export default User