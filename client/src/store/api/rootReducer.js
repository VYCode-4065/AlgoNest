import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../../features/authSlice.js'
import authApi from "./authApi.js";
import courseApi from "./courseApi.js";
import courseReducer from '../../features/courseSlice.js'
import lectureApi from "./lectureApi.js";
import orderApi from "./orderApi.js";

export const rootReducer = combineReducers({
    auth: authReducer,
    courses: courseReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
})