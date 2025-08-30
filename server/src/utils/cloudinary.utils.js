import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config({})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export const uploadMediaImage = async (file) => {
    try {

        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: 'image'
        })
        return uploadResponse
    } catch (error) {
        console.log('error at cloudinary')
    }
}
export const uploadMediaVideo = async (file) => {
    try {

        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: 'video'
        })
        return uploadResponse
    } catch (error) {
        console.log('error at cloudinary')
    }
}


export const deleteProfilePicFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log('error at cloudinary')

    }
}

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video'
        })
    } catch (error) {
        console.log('error at cloudinary')

    }
}

