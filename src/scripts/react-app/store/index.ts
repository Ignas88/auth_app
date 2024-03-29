import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { authApi } from '@app/services/authApi';
import { serversApi } from '@app/services/serversApi';
import authSlice from '@app/reduxSlices/auth';

export const persistConfig = {
  key: 'auth',
  storage: storageSession,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authSlice),
  [authApi.reducerPath]: authApi.reducer,
  [serversApi.reducerPath]: serversApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, serversApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;