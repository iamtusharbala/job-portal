import express from 'express'
import { loginController, registerController, userUpdateController } from '../controllers/authController.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = express.Router()


router.post('/register', registerController)
router.post('/login', userAuth, loginController)
router.patch('/user-update', userAuth, userUpdateController)

export default router