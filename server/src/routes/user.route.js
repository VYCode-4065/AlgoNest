import { Router } from 'express'
import { getUserProfileController, loginUserController, logoutUserController, registerUserController } from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/Auth.middleware.js'


const userRouter = Router()


userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.post('/logout', authMiddleware, logoutUserController);
userRouter.get('/profile', authMiddleware, getUserProfileController)

export default userRouter;