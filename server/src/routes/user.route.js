import { Router } from 'express'
import { getUserProfileController, loginUserController, logoutUserController, registerUserController, updateUserProfileController } from '../controllers/user.controller.js'

import authMiddleware from '../middlewares/Auth.middleware.js'
import { upload } from '../utils/multer.utils.js'

const userRouter = Router()


userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.post('/logout', authMiddleware, logoutUserController);
userRouter.get('/profile', authMiddleware, getUserProfileController)
userRouter.put('/update', authMiddleware, upload.single("profilePic"), updateUserProfileController)

export default userRouter;