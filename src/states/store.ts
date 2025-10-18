import {configureStore} from "@reduxjs/toolkit"
import bossReducer from "./boss/bossSlice"

export const store = configureStore({
  reducer: {
    bosses: bossReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch