import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LECTURE_BASE = 'http://localhost:8080/api/v1/lecture'
const lectureApi = createApi({
    reducerPath: 'lectureApi',
    baseQuery: fetchBaseQuery({ baseUrl: LECTURE_BASE, credentials: 'include' }),
    endpoints: (builder) => ({
        getLectures: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: 'GET'
            }),
            providesTags: ['lectureApi']
        }),
        addLecture: builder.mutation({
            query: (lectureData) => ({
                url: '/add',
                method: 'POST',
                body: lectureData
            }),
            invalidatesTags: ['lectureApi']
        }),
        updateLecture: builder.mutation({
            query: (formData) => ({
                url: '/update',
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['lectureApi']
        }),
        deleteLecture: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: '/delete',
                method: 'DELETE',
                body: { lectureId, courseId }
            }),
            invalidatesTags: ['lectureApi']
        })
    })
})


export const { useAddLectureMutation, useGetLecturesQuery, useUpdateLectureMutation, useDeleteLectureMutation } = lectureApi
export default lectureApi