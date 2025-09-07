import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lectures.model.js"
import { User } from "../models/user.model.js"
import asyncHandler from "../utils/AsyncHandler.js"
import { deleteProfilePicFromCloudinary, deleteVideoFromCloudinary, uploadMediaImage, uploadMediaVideo } from "../utils/cloudinary.utils.js"
import responseHandler from "../utils/Response.js"

const addLecturesToCourseController = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Login first to perform this task !", {}, true)

    }

    const lecturer = await User.findById(userId)

    if (lecturer.userRole !== 'instructor') {
        return responseHandler(res, 401, "You are not authorized to perform this task !", {}, true)
    }

    const { courseId, lectureTitle, lectureSubtitle, isPreview } = req.body

    if (!courseId) {
        return responseHandler(res, 401, "Invalid course !", {}, true)
    }

    const videoLink = req.files['videoLink'][0]
    const thumbnailLink = req.files['thumbnail'][0]



    if (!videoLink || !thumbnailLink) {
        return responseHandler(res, "400", "lecture video or thumbnail not provided !", {}, true)
    }

    const cloudinaryThumbnails = await uploadMediaImage(thumbnailLink.path)
    const thumbnailUrl = cloudinaryThumbnails.secure_url



    const cloudinaryVideo = await uploadMediaVideo(videoLink.path)

    const videoUrl = cloudinaryVideo.secure_url




    const newLecture = await Lecture.create({
        lectureTitle,
        lectureSubtitle,
        videoUrl,
        thumbnailUrl,
        isPreview
    })

    if (!newLecture) {
        return responseHandler(res, 500, "Unable to upload lecture at this moment !", {}, true)
    }



    const toUpdateCourse = await Course.findByIdAndUpdate(courseId, {
        $push: { lectures: newLecture }
    }, { new: true })

    if (!toUpdateCourse) {
        return responseHandler(res, 500, "Unable to add lecture in course at this moment !", {}, true)
    }

    return responseHandler(res, 200, "Lecture addedd in course successfully !", toUpdateCourse, false)
})

const updateLectureController = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Login first to perform this task !", {}, true)

    }

    const lecturer = await User.findById(userId)

    if (lecturer.userRole !== 'instructor') {
        return responseHandler(res, 401, "You are not authorized to perform this task !", {}, true)
    }

    const { lectureId } = req.body

    if (!lectureId) {
        return responseHandler(res, 401, "Invalid lecture id !", {}, true)
    }

    const updateLecture = await Lecture.findById(lectureId)

    if (!updateLecture) {
        return responseHandler(res, 401, "Lecture doesn't found !", {}, true)
    }

    const { lectureTitle, lectureSubtitle, isPreview } = req.body

    if (lectureTitle) {

        updateLecture.lectureTitle = lectureTitle
    }
    if (lectureSubtitle) {

        updateLecture.lectureSubtitle = lectureSubtitle
    }
    if (isPreview) {

        updateLecture.isPreview = isPreview
    }
    const thumbnailPath = req.files['thumbnail'] && req.files['thumbnail'][0]?.path

    if (thumbnailPath) {
        const publicId = updateLecture.thumbnailUrl.split('/').pop().split('.')[0]
        await deleteProfilePicFromCloudinary(publicId)
        const thumbnailUrl = await uploadMediaImage(thumbnailPath)
        updateLecture.thumbnailUrl = thumbnailUrl.secure_url
    }

    const videoPath = req.files['videoLink'] && req.files['videoLink'][0]?.path

    if (videoPath) {
        const publicId = updateLecture.videoUrl.split('/').pop().split('.')[0]
        await deleteVideoFromCloudinary(publicId)
        const videoUrl = await uploadMediaVideo(videoPath)
        updateLecture.videoUrl = videoUrl.secure_url
    }

    const responseData = await updateLecture.save()

    if (!responseData) {
        return responseHandler(res, 500, "Unable to update lecture at this moment !", {}, true)
    }

    return responseHandler(res, 200, "Lecture updated successfully !", responseData, {});
})


const deleteLecturesFromCourseController = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Login first to perform this task !", {}, true)

    }

    const lecturer = await User.findById(userId)

    if (lecturer.userRole !== 'instructor') {
        return responseHandler(res, 401, "You are not authorized to perform this task !", {}, true)
    }

    const { lectureId } = req.body

    if (!lectureId) {
        return responseHandler(res, 401, "Invalid lecture id !", {}, true)
    }

    const toDeleteLecture = await Lecture.findByIdAndDelete(lectureId)

    if (toDeleteLecture.videoUrl) {
        const publicId = toDeleteLecture.videoUrl.split('/').pop().split('.')[0]
        await deleteVideoFromCloudinary(publicId)
    }
    if (toDeleteLecture.thumbnailUrl) {
        const publicId = toDeleteLecture.videoUrl.split('/').pop().split('.')[0]
        await deleteProfilePicFromCloudinary(publicId)
    }

    if (!toDeleteLecture) {
        return responseHandler(res, 500, "Unable to delete lecture at this moment !", {}, true)
    }

    const { courseId } = req.body

    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
        $pull: { lectures: toDeleteLecture._id }
    }, { new: true })


    if (!updatedCourse) {
        return responseHandler(res, 500, "Unable to update course at this moment !", {}, true)
    }

    return responseHandler(res, 200, "Lecture deleted successfully !", updatedCourse, false)

})

const getCourseLectureController = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Login first to perform this task !", {}, true)

    }

    const lecturer = await User.findById(userId)

    if (lecturer.userRole !== 'instructor') {
        return responseHandler(res, 401, "You are not authorized to perform this task !", {}, true)
    }

    const courseId = req.params.courseId

    if (!courseId) {
        return responseHandler(res, 401, "Must to provide course id !", {}, true)
    }

    const allLectures = await Course.findById(courseId).populate('lectures')

    if (!allLectures) {
        return responseHandler(res, 500, "Internal server error !", {}, true)
    }

    return responseHandler(res, 200, "Lectures fetched successfully !", allLectures, false)
})

export {
    addLecturesToCourseController,
    updateLectureController,
    deleteLecturesFromCourseController,
    getCourseLectureController
}