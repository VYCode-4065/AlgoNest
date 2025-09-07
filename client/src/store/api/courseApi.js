import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const COURSE_BASE = 'http://localhost:8080/api/v1/course'
const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: COURSE_BASE, credentials: 'include' }),
    endpoints: (builder) => ({

        getCourse: builder.query({
            query: () => ({
                url: '/',
                method: 'GET'
            }),
            providesTags: ['loadCourse']
        }),
        addCourse: builder.mutation({
            query: (courseData) => ({
                url: '/add',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['loadCourse']
        }),
        updateCourse: builder.mutation({
            query: (updateData) => ({
                url: '/update',
                method: 'PUT',
                body: updateData
            }),
            invalidatesTags: ['loadCourse']
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: '/all',
                method: 'GET'
            }),

        }),
        getCourseById: builder.mutation({
            query: (courseId) => ({
                url: `/course-details/${courseId}`,
                method: 'POST',
                body: ''
            })
        }),
        getCourseByCat: builder.mutation({
            query: (checkedCategory) => ({
                url: '/getByCat',
                method: 'POST',
                body: { checkedCategory }
            })
        }),
        getByEnrolledId: builder.query({
            query: () => ({
                url: '/getByEnrolledId',
                method: 'GET'
            })
        }),
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: '/delete',
                method: 'DELETE',
                body: { courseId }
            }),
            invalidatesTags: ['loadCourse']
        }),
        searchCourse: builder.mutation({
            query: (searchData) => ({
                url: '/getSearch',
                method: 'POST',
                body: { searchData }
            })
        })
    })
})

export const { useGetCourseQuery, useAddCourseMutation, useUpdateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useGetCourseByIdMutation, useGetCourseByCatMutation, useSearchCourseMutation, useGetByEnrolledIdQuery } = courseApi

export default courseApi