import { Course } from '../models/course.model.js'
import asyncHandler from '../utils/AsyncHandler.js'
import { uploadMedia } from '../utils/cloudinary.utils.js'
import responseHandler from '../utils/Response.js'

const createCourseController = asyncHandler(async (req, res) => {

    const courseCreator = req.userId

    const { courseTitle, category, coursePrice } = req.body

    if (!courseTitle || !category || !coursePrice) {
        return responseHandler(res, 406, "Provide all the required field data !", {}, true)
    }

    const subTitle = req.body?.subTitle
    const description = req.body?.subTitle
    const thumbnails = req.file
    const isPublished = req.body?.isPublished


    const cloudResponse = thumbnails.path ? await uploadMedia(thumbnails.path) : ''

    const thumbnailUrl = thumbnails.path ? cloudResponse.secure_url : ''

    const newCourse = await Course.create({
        courseTitle,
        category,
        courseCreator,
        subTitle: subTitle && subTitle,
        description: description && description,
        thumbnails: thumbnails.path && thumbnailUrl,
        isPublished: isPublished && isPublished,
    })

    if (!newCourse) {
        return responseHandler(res, 500, "Internal Server Error ", {}, true)
    }
    return responseHandler(res, 201, "Course created successfully !", newCourse)

})

export {
    createCourseController
}