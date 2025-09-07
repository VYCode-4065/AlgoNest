import { configureStore } from '@reduxjs/toolkit'
import authApi from './api/authApi.js'
import { rootReducer } from './api/rootReducer.js'
import courseApi from './api/courseApi.js'
import lectureApi from './api/lectureApi.js'
import orderApi from './api/orderApi.js'
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, lectureApi.middleware, orderApi.middleware)
})

export default store