import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@app/services/authApi'
import authSlice from './slices/auth'


const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth']
}
const rootReducer = combineReducers({ // added combineReducer since we have now two reducer
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch