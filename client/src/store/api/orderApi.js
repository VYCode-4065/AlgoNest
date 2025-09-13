import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ORDER_BASE = 'https://algonest-y8ai.onrender.com/api/v1/order'
const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: ORDER_BASE, credentials: 'include' }),
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: ({ amount, receipt }) => ({
                url: '/create-order',
                method: 'POST',
                body: { amount, receipt }
            })
        }),
        getRazorPayId: builder.query({
            query: () => ({
                url: '/getId',
                method: 'GET',
            })
        }),
        paymentVerification: builder.mutation({
            query: (razorpayData) => ({
                url: '/payment-verification',
                method: 'POST',
                body: razorpayData
            })
        })
    })
})

export const { useCreateOrderMutation, useGetRazorPayIdQuery, usePaymentVerificationMutation } = orderApi

export default orderApi