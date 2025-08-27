import { Router } from 'express'
import { createCourseController } from '../controllers/course.controller.js'
import authMiddleware from '../middlewares/Auth.middleware.js'


const courseRouter = Router()


courseRouter.put('/', authMiddleware, createCourseController)


export default courseRouter