import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const production = import.meta.env.PRODUCTION_BACKEND;
const path = production ? String(production) : "http://localhost:3000/backend"

export const api = createApi({
    reducerPath: 'financeApi',
    tagTypes: ["Signup", "Login", "JsonWebToken", "Payment", "UpdatePlan", "CancelPlan"],
    baseQuery: fetchBaseQuery({ baseUrl: path, credentials: "include" }),
    endpoints: (builder) => ({
        signup: builder.mutation<any, any>({
            query: (data) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Signup"]
        }),
        login: builder.mutation<any,any>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Login"]
        }),
        verifyJwt: builder.mutation<any, any>({
            query: (data) => ({
                url: '/auth/jwt',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["JsonWebToken"],
        }),
        generatePaymentLink: builder.mutation<any, any>({
            query: (data) => ({
                url: '/user/payment',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Payment"],
        }),
        getUser: builder.query<any,any>({
            query: () => '/user'
        }),
        updateUserPlan: builder.mutation<any, any>({
            query: (data) => ({
                url: '/user/update-plan',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["UpdatePlan"],
        }),
        cancelPlan: builder.mutation<any, any>({
            query: (data) => ({
                url: '/user/cancel-plan',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["CancelPlan"],
        }),
    })
})
    
export const { useSignupMutation,
                useLoginMutation,
                useVerifyJwtMutation,
                useGeneratePaymentLinkMutation,
                useGetUserQuery,
                useUpdateUserPlanMutation,
                useCancelPlanMutation,
            } = api
