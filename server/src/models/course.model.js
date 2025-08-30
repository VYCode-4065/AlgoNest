import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ['Beginner', 'Medium', 'Advance'],
        default: 'Beginner'
    },
    thumbnails: {
        type: String,
    },
    enrolledStudent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'
        }
    ],
    isPublished: {
        type: Boolean,
        default: false
    },
    courseCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })


courseSchema.index({ courseTitle: 'text' })

export const Course = mongoose.model("Course", courseSchema);

