import { User } from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import getSession from "../utils/getSession.js";
import responseHandler from "../utils/Response.js";
import bcrypt from 'bcryptjs'

const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return responseHandler(res, 400, "All credentials are required !", {}, true)
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return responseHandler(res, 401, "User already exists with this email !", {}, true)
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = await User.create({
        email,
        name,
        password: hashedPassword
    })
    return responseHandler(res, 200, "Account created successfully !", { user: newUser })
})

const loginUserController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return responseHandler(res, 400, "Provided all credentials", {}, true);
    }

    const existedUser = await User.findOne({ email })

    if (!existedUser) {
        return responseHandler(res, 400, "Incorrect email or password !", {}, true)
    }


    const validPassword = await bcrypt.compare(password.toString(), existedUser.password.toString())

    if (!validPassword) {
        return responseHandler(res, 400, "Incorrect email or password !", {}, true)
    }

    const sessionKey = await getSession(existedUser.email, existedUser._id)

    const option = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }

    res.cookie("loginToken", sessionKey, option);

    existedUser.password = ""
    return responseHandler(res, 200, "User logged in successfully !", existedUser, {}, { loginToken: sessionKey })
})

const logoutUserController = asyncHandler(async (req, res) => {

    const userId = req.userId;

    if (!userId) {
        return responseHandler(res, 401, "User not logged in ", {}, true)
    }

    res.clearCookie("loginToken")

    return responseHandler(res, 200, "User logged out successfully !")
})

const getUserProfileController = asyncHandler(async (req, res) => {

    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Unauthorized access !", {}, true)
    }


    const userData = await User.findById(userId.toString()).select("-password");

    if (!userData) {
        return responseHandler(res, 500, "Internal server error !", {}, true)
    }

    return responseHandler(res, 200, "User profile fetched !", userData, false);

})
export {
    registerUserController,
    loginUserController,
    logoutUserController,
    getUserProfileController
}