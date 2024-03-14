import express from 'express'
import { loginController, registerController, userUpdateController } from '../controllers/userController.js'
import { userAuth } from '../middlewares/userAuth.js'

const userRoute = express.Router()

// User routes
userRoute.post('/register', registerController)
    .post('/login', userAuth, loginController)
    .patch('/user-update', userAuth, userUpdateController)


export default userRoute