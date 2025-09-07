import { Router } from 'express'
import { addLecturesToCourseController, deleteLecturesFromCourseController, getCourseLectureController, updateLectureController } from '../controllers/lecture.controllers.js'
import authMiddleware from '../middlewares/Auth.middleware.js'
import { upload } from '../utils/multer.utils.js'

const lectureRouter = Router()

lectureRouter.get('/:courseId', authMiddleware, getCourseLectureController)
lectureRouter.post('/add', authMiddleware, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'videoLink', maxCount: 1 }]), addLecturesToCourseController)
lectureRouter.put('/update', authMiddleware, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'videoLink', maxCount: 1 }]), updateLectureController)
lectureRouter.delete('/delete', authMiddleware, deleteLecturesFromCourseController)
export default lectureRouter