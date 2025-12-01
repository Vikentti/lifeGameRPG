import {combineReducers,configureStore} from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import bossReducer from "./boss/bossSlice"
import miniBossReducer from './boss/miniBossSlice'
import mobsReducer from './boss/mobsSlice'
import dailyReducer from './Daily/DailySlice'
import userReducer from './User/userSlice'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const rootReducer = combineReducers({
  bosses: bossReducer,
  miniBosses: miniBossReducer,
  mobs: mobsReducer,
  user: userReducer,
  daily: dailyReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createClientStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        },
      }),
  })

  const persistor = persistStore(store)
  return { store, persistor }
}

export const createServerStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof createClientStore>['store']['dispatch']