import mongoose from "mongoose";

const Schema = mongoose.Schema

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        minLength: 10
    },
    status: {
        tye: String,
        enum: ['pending', 'rejected', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'Kochi',
        required: [true, 'Please provide Work Location']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)
export default Job