import { configureStore } from '@reduxjs/toolkit'
import authApi from './api/authApi.js'
import { rootReducer } from './api/rootReducer.js'
import courseApi from './api/courseApi.js'
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})

export default store