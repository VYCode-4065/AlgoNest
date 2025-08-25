import { configureStore } from '@reduxjs/toolkit'
import authApi from './api/authApi.js'
import { rootReducer } from './api/rootReducer.js'
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})

export default store