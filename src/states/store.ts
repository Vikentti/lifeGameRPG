import {configureStore} from "@reduxjs/toolkit"
import bossReducer from "./boss/bossSlice"
import userReducer from './User/userSlice'
import miniBossReducer from './boss/miniBossSlice'
import mobsReducer from './boss/mobsSlice'

export const store = configureStore({
  reducer: {
    bosses: bossReducer,
    miniBosses: miniBossReducer,
    mobs: mobsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch