import asyncHandler from "../utils/AsyncHandler.js";
import responseHandler from "../utils/Response.js";
import jwt from 'jsonwebtoken'

const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req?.cookies?.loginToken;

    if (!token) {
        return responseHandler(res, 401, "Login first to perform the tasks !");
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY)


    if (!decode) {
        return responseHandler(res, 401, "Invalid token");
    }

    req.userId = decode._id;
    next()
})

export default authMiddleware