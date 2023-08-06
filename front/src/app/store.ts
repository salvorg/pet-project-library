import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import { usersSlice, UserState } from '@/features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { authorsSlice } from '@/features/authors/authorsSlice';
import { booksSlice } from '@/features/books/booksSlice';
import { borrowingsSlice } from '@/features/borrowings/borrowingsSlice';
import { genresSlice } from '@/features/genres/genresSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  const usersReducer = isServer
    ? usersSlice.reducer
    : (persistReducer(persistConfig, usersSlice.reducer) as unknown as Reducer<UserState>);

  let rootReducer = combineReducers({
    [usersSlice.name]: usersReducer,
    [authorsSlice.name]: authorsSlice.reducer,
    [booksSlice.name]: booksSlice.reducer,
    [borrowingsSlice.name]: borrowingsSlice.reducer,
    [genresSlice.name]: genresSlice.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  if (!isServer) {
    // @ts-expect-error
    store.__persistor = persistStore(store);
  }

  return store;
};

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore);
