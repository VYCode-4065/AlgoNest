import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loggedInUser, loggedOutUser } from '../../features/authSlice'

const AUTH_BASE = "http://localhost:8080/api/v1/user/"
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: AUTH_BASE, credentials: "include" }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: 'register',
                method: 'POST',
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: 'POST',
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {

                    const result = await queryFulfilled
                    const loginData = result?.data?.data

                    dispatch(loggedInUser(loginData))

                } catch (error) {
                    console.log('Error at RTK login ', error)
                }
            },
            invalidatesTags: ['api']
        }),
        loginWithGoogle: builder.mutation({
            query: (clientToken) => ({
                url: `/google`,
                method: 'POST',
                body: { clientToken }
            }),
            invalidatesTags: ['api']
        }),
        loggoutUser: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
                body: { loginToken: JSON.parse(localStorage.getItem('loginToken')) }
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    await queryFulfilled
                    dispatch(loggedOutUser())

                    localStorage.removeItem('loginToken')
                    cookieStore.delete('loginToken')
                } catch (error) {
                    console.log('Error at RTK logout !', error)
                }
            }
        }),
        loadProfile: builder.query({
            query: () => ({
                url: 'profile',
                method: 'GET'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled
                    dispatch(loggedInUser(res?.data?.data))
                } catch (error) {
                    console.log('Error at load profile api')
                }
            },
            providesTags: ['api']
        }),
        updateProfile: builder.mutation({
            query: (updateData) => ({
                url: '/update',
                method: 'PUT',
                body: updateData,
                credentials: 'include'
            }),
            invalidatesTags: ['api']
        }),
    })
})


export const { useLoginUserMutation, useRegisterUserMutation, useLoggoutUserMutation, useLoadProfileQuery, useUpdateProfileMutation, useLoginWithGoogleMutation } = authApi

export default authApi