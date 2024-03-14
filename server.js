import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'


import { connect } from './config/connect.js'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
const PORT = process.env.PORT || 8080


// DOTENV configuration
dotenv.config({ path: './.env' })

// Connect to DATABASE
connect()

// App Object
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


// Route
app.use('/api/v1/user', userRoute)
app.use('/api/v1/job', jobRoute)

// Error Handling Middleware
app.use(errorMiddleware)


// PORT listen
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})
