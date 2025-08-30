import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: '' }
const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setCourses(state, action) {
            return { data: action.payload }
        }
    }
})

export const { setCourses } = courseSlice.actions
export default courseSlice.reducer