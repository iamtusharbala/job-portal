import Job from "../models/jobsSchema.js"


export const createJobController = async (req, res, next) => {
    try {
        const { company, position } = req.body
        if (!company || !position) {
            next('All fields are required')
        }
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        return res.status(201).send({ job })

    } catch (error) {
        next(error)
    }
}


export const getAllJobs = async (req, res, next) => {
    try {
        const fetchJobs = await Job.find()
        res.status(200).send({ success: true, message: "Jobs fetched successfully", length: fetchJobs.length, fetchJobs })
    } catch (error) {
        next(error)
    }
}

export const updateJobs = async (req, res, next) => {
    try {
        const { id } = req.params
        const { company, position } = req.body
        if (!company || !position) {
            next('All fields are required')
        }
        const job = await Job.findOne({ _id: id })
        if (!job) {
            next('No job found')
        }
        console.log(req.user.userId);
        console.log(job.createdBy);
        if (!req.user.userId === job.createdBy.toString()) {
            next('You are not authorized to update the job')
        }
        const jobUpdate = await Job.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
        res.status(200).send({ jobUpdate })
    } catch (error) {
        next(error)
    }
}

export const deleteJobs = async (req, res, next) => {
    try {
        const { id } = req.params
        const { company, position } = req.body
        if (!company || !position) {
            next('All fields are required')
        }
        const job = await Job.findOne({ _id: id })
        if (!job) {
            next('No job found to delete')
        }
        if (!req.user.userId === job.createdBy.toString()) {
            next('You are not authorized to delete the job')
        }
        const jobDelete = await Job.findByIdAndDelete({ _id: id })
        res.status(200).send({ success: true, message: "Job deleted" })

    } catch (error) {
        next(error)
    }
}