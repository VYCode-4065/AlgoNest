import Razorpay from 'razorpay'
import asyncHandler from '../utils/AsyncHandler.js'
import responseHandler from '../utils/Response.js'
import { Course } from '../models/course.model.js'
import crypto from 'crypto'

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrderController = asyncHandler(async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body


    const amountInPaise = Math.round(Number(amount) * 100);

    const options = {
        amount: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        payment_capture: 1, // auto-capture (set 0 if you want manual capture)
    };

    const newOrder = await razorpay.orders.create(options);

    if (!newOrder) {
        return responseHandler(res, 500, "Sorry can't place order at this moment !", {}, true)
    }

    return responseHandler(res, 200, "Order created successfully !", newOrder, false)
})

const getRazorPayKey = asyncHandler(async (req, res) => {
    return responseHandler(res, 200, "Razorpay key", { razorPayId: process.env.RAZORPAY_KEY_ID })
})


const paymentVerificationController = asyncHandler(async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    const userId = req.userId

    if (!userId) {
        return responseHandler(res, 401, "Login first to make payment !", {}, true)
    }
    if (!courseId) {
        return responseHandler(res, 401, "Invalid request !", {}, true)
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return responseHandler(res, 400, "All payment field are required !", {}, true)
    }


    const signBody = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature =  crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(signBody).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

   
    if (!isAuthentic) {
        return responseHandler(res, 400, "Invalid signature", {}, true)
    }

    const purchasedCourse = await Course.findByIdAndUpdate(courseId, {
        $push: { enrolledStudent: userId }
    },
        { new: true }
    )

    if(!purchasedCourse){
        return responseHandler(res,500,"Something went wrong !",{},true)
    }

    return responseHandler(res,200,"Payment verified successfully !",purchasedCourse,false)
})

export {
    createOrderController,
    getRazorPayKey,
    paymentVerificationController
}