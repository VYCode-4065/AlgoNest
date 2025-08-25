import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourse: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    profilePic: {
        type: String,
        default: ""
    },
    userRole: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student'
    }
}, {
    timestamps: true
})


export const User = mongoose.model('User', UserSchema);