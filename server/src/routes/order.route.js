import { Router } from 'express'
import { createOrderController, getRazorPayKey, paymentVerificationController } from '../controllers/orders.controller.js'
import authMiddleware from '../middlewares/Auth.middleware.js'

const orderRouter = Router()

orderRouter.post('/create-order', createOrderController)
orderRouter.get('/getId', getRazorPayKey)
orderRouter.post('/payment-verification', authMiddleware, paymentVerificationController)
export default orderRouter