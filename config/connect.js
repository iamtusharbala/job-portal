import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
            .then(() => console.log(`DB Connected successfullly on ${mongoose.connection.host}`))
            .catch((err) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}