import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { usersReducer } from '@/features/users/usersSlice';
import { booksReducer } from '@/features/books/booksSlice';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === 'undefined' ? createWebStorage('local') : createNoopStorage();
const persistConfig = {
  key: 'users',
  storage,
  whitelist: ['users'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  books: booksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: true,
  });

export const store = makeStore();
export const wrapper = createWrapper<RootStore>(makeStore);

export const persistor = persistStore(store);
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
