'use client'
import {configureStore} from "@reduxjs/toolkit"
import {apiSlice} from './slices/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) ,
})

setupListeners(store.dispatch);