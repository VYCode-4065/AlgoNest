import mongoose, { Schema } from 'mongoose'

const lectureSchema = new Schema({
    lectureTitle: {
        type: String,
        required: true
    },
    lectureSubtitle: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    isPreview: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Lecture = mongoose.model("Lecture", lectureSchema)