import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import { usersSlice } from '@/features/users/usersSlice';
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

  let rootReducer = combineReducers({
    [usersSlice.name]: persistReducer(persistConfig, usersSlice.reducer),
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

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
