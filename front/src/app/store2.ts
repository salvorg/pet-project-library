export const a = 1;
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import { booksSlice } from '@/features/books/booksSlice';
// import { usersSlice } from '@/features/users/usersSlice';
// import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
//
// const persistConfig = {
//   key: 'library',
//   storage,
//   whitelist: ['user'],
// };
//
// const makeStore = () => {
//   const isServer = typeof window === 'undefined';
//
//   let rootReducer = combineReducers({
//     [booksSlice.name]: booksSlice.reducer,
//     [usersSlice.name]: isServer ? usersSlice.reducer : persistReducer(persistConfig, usersSlice.reducer),
//   });
//
//   const store = configureStore({
//     reducer: rootReducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });
//
//   if (!isServer) {
//     store.__persistor = persistStore(store);
//   }
//
//   return store;
// };
//
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
//
// export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
