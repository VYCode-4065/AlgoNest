import { Course } from '../models/course.model.js'
import { Lecture } from '../models/lectures.model.js'
import { User } from '../models/user.model.js'
import asyncHandler from '../utils/AsyncHandler.js'
import { deleteProfilePicFromCloudinary, uploadMediaImage, uploadMediaVideo } from '../utils/cloudinary.utils.js'
import responseHandler from '../utils/Response.js'

const createCourseController = asyncHandler(async (req, res) => {

    const courseCreator = req.userId

    const { courseTitle, category, coursePrice } = req.body

    console.log(courseTitle, category, coursePrice)

    if (!courseTitle || !category || !coursePrice) {
        return responseHandler(res, 406, "Provide all the required field data !", {}, true)
    }

    const subTitle = req.body?.subTitle
    const description = req.body?.description
    const thumbnails = req.file
    const isPublished = req.body?.isPublished
    const courseLevel = req.body?.level


    const cloudResponse = thumbnails?.path ? await uploadMediaImage(thumbnails.path) : ''

    const thumbnailUrl = thumbnails?.path ? cloudResponse.secure_url : ''

    const newCourse = await Course.create({
        courseTitle,
        category,
        courseCreator,
        courseLevel,
        coursePrice,
        subTitle: subTitle && subTitle,
        description: description && description,
        thumbnails: thumbnails?.path && thumbnailUrl,
        isPublished: isPublished && isPublished,
    })

    if (!newCourse) {
        return responseHandler(res, 500, "Internal Server Error ", {}, true)
    }
    return responseHandler(res, 201, "Course created successfully !", newCourse)

})

const getCourseController = asyncHandler(async (req, res) => {

    const userId = req.userId

    const user = await User.findById(userId).select('+userRole')

    if (!user) {
        return responseHandler(res, 401, "User doesn't exists !")
    }

    if (user.userRole !== 'instructor') {
        return responseHandler(res, 400, "You are not authrized for this task !")
    }

    const coursesData = await Course.find().where({ courseCreator: userId })

    return responseHandler(res, 200, "Course data fetched successfully !", coursesData)
})

const updateCourseController = asyncHandler(async (req, res) => {

    const courseCreator = req.userId;

    const { courseTitle, category, coursePrice, courseId } = req.body

    if (!courseId) {
        return responseHandler(res, 401, "Access denied to update the course !", {}, true)
    }
    if (!courseTitle || !category || !coursePrice) {
        return responseHandler(res, 406, "Provide all the required field data !", {}, true)
    }

    const subTitle = req.body?.subTitle
    const description = req.body?.description
    const thumbnails = req.file
    const isPublished = req.body?.isPublished
    const courseLevel = req.body?.courseLevel



    let updateCourse = await Course.findById(courseId)

    if (!updateCourse) {
        return responseHandler(res, 404, 'Course not found !', {}, true)
    }

    if (updateCourse.thumbnails) {
        const publicId = updateCourse.thumbnails.split('/').pop().split('.')[0]

        await deleteProfilePicFromCloudinary(publicId)
    }

    const cloudResponse = thumbnails?.path ? await uploadMediaImage(thumbnails.path) : ''

    const thumbnailUrl = thumbnails?.path ? cloudResponse.secure_url : ''

    updateCourse = await Course.findByIdAndUpdate(courseId, {
        courseTitle,
        category,
        courseCreator,
        courseLevel,
        coursePrice,
        subTitle: subTitle && subTitle,
        description: description && description,
        thumbnails: thumbnails?.path && thumbnailUrl,
        isPublished: isPublished && isPublished,
    }, { new: true })

    if (!updateCourse) {
        return responseHandler(res, 500, "Internal Server Error ", {}, true)
    }
    return responseHandler(res, 201, "Course updated successfully !", updateCourse)
})

const deleteCourseByIdController = asyncHandler(async (req, res) => {
    const userId = req.userId

    const courseCreator = await User.findById(userId)

    if (courseCreator.userRole !== 'instructor') {
        return responseHandler(res, 401, "You are not authorize for this task !", {}, true)
    }

    const { courseId } = req.body

    if (!courseId) {
        return responseHandler(res, 404, "Course not found !", {}, true)
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId)

    const publicId = deletedCourse?.thumbnails && deletedCourse.thumbnails?.split('/').pop().split('.')[0]

    if (publicId) {

        const deleteFromCloudinary = await deleteProfilePicFromCloudinary(publicId)
    }


    if (!deletedCourse) {
        return responseHandler(res, 500, "Unable to delete course at this moment !", {}, true)
    }

    return responseHandler(res, 200, "Course deleted successfully !", deletedCourse, false)
})

const getAllCourseController = asyncHandler(async (req, res) => {
    const allCourse = await Course.find().populate("courseCreator", { name: 1, profilePic: 1 })

    if (!allCourse) {
        return responseHandler(res, 500, "Internal server error !", {}, true);
    }

    return responseHandler(res, 200, "Course fetched successfully !", allCourse)
})

const getCourseByIdController = asyncHandler(async (req, res) => {

    const userId = req.userId

    const user = await User.findById(userId, { userRole: 1 })

    if (!user) {
        return responseHandler(res, 401, "User doesn't exists !")
    }

    const { courseId } = req.params

    if (!courseId) {
        return responseHandler(res, 401, "Unauthorized Access !")
    }

    const course = await Course.findById(courseId).populate("courseCreator", { name: 1 })

    if (!course) {
        return responseHandler(res, 404, "Course not found !")
    }

    return responseHandler(res, 200, "Course data fetched successfully !", course, false)

})

const getCourseByCategory = asyncHandler(async (req, res) => {
    const checkedCategory = req.body.checkedCategory
    if (!checkedCategory) {
        return responseHandler(res, 401, "Provide atleast one category to update !")
    }

    const dataByCategory = await Course.find({ category: { $in: checkedCategory } })

    if (!dataByCategory) {
        return responseHandler(res, 501, "Internal server error !")
    }
    return responseHandler(res, 200, "Data by category fetched !", dataByCategory, false)
})

const getCourseBySearch = asyncHandler(async (req, res) => {
    const searchValue = req.body.searchData

    if (!searchValue) {
        return responseHandler(res, 400, "No search value are provided !")
    }


    const searchResult = await Course.find({ courseTitle: { $regex: searchValue, $options: 'i' } })

    if (!searchResult) {
        return responseHandler(res, 400, "Course not found !", {}, true)
    }

    return responseHandler(res, 200, "Course fetched successfully !", searchResult, false)
})

const getCourseByEnrolledId = asyncHandler(async (req, res) => {
    const userId = req.userId

    const enrolledCourse = await Course.find({
        enrolledStudent: userId
    })

    if (!enrolledCourse) {
        return responseHandler(res, 200, "No purchase course exists !", {}, false)
    }

    return responseHandler(res, 200, "Course fetched successfully !", enrolledCourse, false)
})

export {
    createCourseController,
    getCourseController,
    getAllCourseController,
    updateCourseController,
    deleteCourseByIdController,
    getCourseByIdController,
    getCourseByCategory,
    getCourseBySearch,
    getCourseByEnrolledId
}