import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "../features/reservationSlice"
import customerReducer from "../features/componentSlice"
// the first thing we need to do is to configure our store
export const store=configureStore({
    reducer:{
        reservations: reservationReducer ,
        customers:customerReducer,
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;