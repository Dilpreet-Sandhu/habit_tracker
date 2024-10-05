'use client'
import {configureStore} from "@reduxjs/toolkit"
import {apiSlice} from './slices/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import miscSlice from './slices/slice';

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        "misc" : miscSlice,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) ,
})

type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;