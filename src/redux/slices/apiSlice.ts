import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes : ["habits","streaks"],
    endpoints : (builder) => ({
        getHabits : builder.query<any,void | boolean>({
            query : (completed) => {
                let url = "/habit/get";
                if (completed) url += '?completed=true';

                return {
                    url :url,
                    method : "GET"
                }
            },
            providesTags : ["habits"]
        }),
        getStreaks : builder.query<any,void>({
            query : () => ({
                url : "/streak/get",
                method : "GET"
            }),
            providesTags : ["streaks"]
        }),
        creatHabit : builder.mutation<any,any>({
            query : (habitData) => ({
                url : "/habit/methods",
                method : "POST",
                body : habitData,
            }),
            invalidatesTags : ["habits","streaks"]
        })
    })

})


export const {useLazyGetHabitsQuery,useGetHabitsQuery,useCreatHabitMutation,useGetStreaksQuery} = apiSlice;
export type mutationHookType = ReturnType<typeof useCreatHabitMutation>;