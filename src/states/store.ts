import {configureStore, combineReducers} from "@reduxjs/toolkit"
import bossReducer from "./boss/bossSlice"
import userReducer from './User/userSlice'
import miniBossReducer from './boss/miniBossSlice'
import mobsReducer from './boss/mobsSlice'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// Create noop storage for server-side
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
})

const persistConfig = {
  key: 'root',
  storage,
  // Optional: add whitelist if you only want to persist certain reducers
  // whitelist: ['user']
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