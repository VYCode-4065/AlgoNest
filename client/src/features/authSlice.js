import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        loggedInUser(state, action) {
            return { ...state, user: action.payload, isAuthenticated: true }
        },
        loggedOutUser(state) {

            return { ...state, user: "", isAuthenticated: false }

        }
    }
})


export const getProfileData = (state)=>state.auth
export const { loggedInUser, loggedOutUser } = authSlice.actions

export default authSlice.reducer