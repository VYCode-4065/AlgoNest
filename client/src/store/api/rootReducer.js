import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../../features/authSlice.js'
import authApi from "./authApi.js";

export const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
})