import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import urlReducer from "./urlSlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        urls:urlReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;