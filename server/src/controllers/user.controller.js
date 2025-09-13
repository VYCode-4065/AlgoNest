import { User } from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { deleteProfilePicFromCloudinary, uploadMediaImage } from "../utils/cloudinary.utils.js";
import getSession from "../utils/getSession.js";
import responseHandler from "../utils/Response.js";
import bcrypt from 'bcryptjs'
import fs from 'fs'
import { OAuth2Client } from 'google-auth-library'

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
        sameSite: 'none',
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

    res.clearCookie("loginToken", { maxAge: 0 })

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

const updateUserProfileController = asyncHandler(async (req, res) => {

    const userId = req.userId

    const { name, email } = req.body ? req.body : { name: '', email: '' }

    const profilePic = req.file;




    if (!userId) {
        return responseHandler(res, 401, "Unauthorized access ", {}, true);
    }

    if (!name && !email && !profilePic) {
        return responseHandler(res, 406, "Please provide at least one field to update !")
    }

    const user = await User.findById(userId)

    if (!user) {
        return responseHandler(res, 401, "User not exists with provided id !")
    }

    if (user.profilePic) {
        const publicId = user.profilePic.split('/').pop().split('.')[0]
        deleteProfilePicFromCloudinary(publicId)
    }

    const cloudResponse = profilePic ? await uploadMediaImage(profilePic.path) : ''

    const profilePicUrl = profilePic ? cloudResponse.secure_url : ''

    if (profilePicUrl) {
        fs.unlinkSync(profilePic.path)
    }

    const updatedValue = await User.findByIdAndUpdate(userId, {
        email: email && email,
        name: name && name,
        profilePic: profilePic?.path && profilePicUrl
    }, { new: true }).select("-password")

    if (!updatedValue) {
        return responseHandler(res, 501, "Internal server error ", {}, true)
    }

    return responseHandler(res, 200, "Profile updated successfully !", updatedValue, false)
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


const loginWithGoogleController = asyncHandler(async (req, res) => {

    const { clientToken } = req.body;
    if (!clientToken) {
        return responseHandler(res, 400, "clientToken is missing !")
    }


    const ticket = await client.verifyIdToken({
        idToken: clientToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email_verified) {
        return responseHandler(res, 400, "Google account email not verified")
    }

    let existedUser = await User.findOne({ email })

    if (!existedUser) {
        existedUser = await User.create({
            name,
            email,
            profilePic: picture,
            password: googleId
        })
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
export {
    registerUserController,
    loginUserController,
    loginWithGoogleController,
    logoutUserController,
    getUserProfileController,
    updateUserProfileController
}