import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["habits", "streaks"],
  endpoints: (builder) => ({
    getHabits: builder.query<any, void | boolean>({
      query: (completed) => {
        let url = "/habit/get";
        if (completed) url += "?completed=true";

        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["habits"],
    }),
    getStreaks: builder.query<any, void>({
      query: () => ({
        url: "/streak/get",
        method: "GET",
      }),
      providesTags: ["streaks"],
    }),
    creatHabit: builder.mutation<any, any>({
      query: (habitData) => ({
        url: "/habit/methods",
        method: "POST",
        body: habitData,
      }),
      invalidatesTags: ["habits", "streaks"],
    }),
    deleteHabit: builder.mutation<any, any>({
      query: (habitId) => ({
        url: `/habit/delete/${habitId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["habits", "streaks"],
    }),
    updateHabit: builder.mutation<any, any>({
      query: (habitId) => ({
        url: "/habit/comp",
        body: { habitId },
        method: "POST",
      }),
      invalidatesTags: ["habits", "streaks"],
    }),
    updateProfileInfo: builder.mutation<any, any>({
      query: ({ usernameEdit, passwordEdit, data }) => {
        let url = "/profile/edit";
        if (usernameEdit) url += "?usernameEdit=true";
        if (passwordEdit) url += "?passwordEdit=true";

        return {
          url,
          method: "PUT",
          body: data,
        };
      },
    }),
    sendFcmToken : builder.mutation<any,any>({
      query: (token) => ({
        url : "/sendfcmtoken",
        method : "PUT",
        body : {token}
      })
    }),
    sendToAi : builder.mutation<any,any>({
      query : (prompt) => ({
        url : "/suggestions",
        method :"POST",
        body : {prompt}
      })
    })
  }),
});

export const {
  useLazyGetHabitsQuery,
  useGetHabitsQuery,
  useCreatHabitMutation,
  useGetStreaksQuery,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
  useUpdateProfileInfoMutation,
  useSendFcmTokenMutation,
  useSendToAiMutation
} = apiSlice;
export type mutationHookType = ReturnType<typeof useCreatHabitMutation>;
