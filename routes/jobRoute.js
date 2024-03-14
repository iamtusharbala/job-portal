import express from 'express'
import { userAuth } from '../middlewares/userAuth.js'
import { createJobController, deleteJobs, getAllJobs, updateJobs } from '../controllers/jobController.js'

const jobRoute = express.Router()


// Job routes
jobRoute.get('/', userAuth, getAllJobs)
    .post('/', userAuth, createJobController)
    .patch('/:id', userAuth, updateJobs)
    .delete('/:id', userAuth, deleteJobs)


export default jobRoute