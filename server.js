import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'

// API Documentation
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'



import { connect } from './config/connect.js'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
const PORT = process.env.PORT || 8080


// DOTENV configuration
dotenv.config({ path: './.env' })

// Connect to DATABASE
connect()

// Swagger API Config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Job Portal Application",
            description: "A Node.js express job Portal Application"
        },
        servers: [
            {
                url: 'http://localhost:8080/'
            }
        ]
    },
    apis: ['./routes/*.js']
}

const spec = swaggerJSDoc(options)

// App Object
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Security
app.use(helmet())
app.use(xss())
// app.use(mongoSanitize())


// Route
app.use('/api/v1/user', userRoute)
app.use('/api/v1/job', jobRoute)

// Error Handling Middleware
app.use(errorMiddleware)


// home route
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(spec))


// PORT listen
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})
