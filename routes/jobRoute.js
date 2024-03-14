import express from 'express'
import { userAuth } from '../middlewares/userAuth.js'
import { createJobController, deleteJobs, getAllJobs, jobStatsController, updateJobs } from '../controllers/jobController.js'

const jobRoute = express.Router()


// Job routes
jobRoute.get('/', userAuth, getAllJobs)
    .post('/', userAuth, createJobController)
    .patch('/:id', userAuth, updateJobs)
    .delete('/:id', userAuth, deleteJobs)
    .get('/stats', userAuth, jobStatsController)


export default jobRoute