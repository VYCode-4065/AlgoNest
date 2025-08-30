import { Router } from 'express'
import { createCourseController, deleteCourseByIdController, getAllCourseController, getCourseByCategory, getCourseByIdController, getCourseBySearch, getCourseController, updateCourseController } from '../controllers/course.controller.js'
import authMiddleware from '../middlewares/Auth.middleware.js'
import { upload } from '../utils/multer.utils.js'


const courseRouter = Router()


courseRouter.post('/add', authMiddleware, upload.single('thumbnail'), createCourseController)
courseRouter.get('/', authMiddleware, getCourseController)
courseRouter.get('/all', getAllCourseController)
courseRouter.post('/getByCat', getCourseByCategory)
courseRouter.post('/getSearch', getCourseBySearch)
courseRouter.post('/course-details/:courseId', authMiddleware, getCourseByIdController)
courseRouter.put('/update', authMiddleware, upload.single('thumbnail'), updateCourseController)
courseRouter.delete('/delete', authMiddleware, deleteCourseByIdController)


export default courseRouter