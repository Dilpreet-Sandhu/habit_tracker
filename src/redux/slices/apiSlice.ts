import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes : ["habits","streaks"],
    endpoints : (builder) => ({
        getHabits : builder.query<any,void>({
            query : () => ({
                url : "/habit/get",
                method : "GET"
            }),
            providesTags : ["habits"]
        })
    })

})

export const {useLazyGetHabitsQuery,useGetHabitsQuery} = apiSlice;