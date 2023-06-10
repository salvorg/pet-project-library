// import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { Action, combineReducers } from 'redux';
// import { configureStore, ThunkAction } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import { usersReducer } from '@/features/users/usersSlice';
// import { authorsReducer } from '@/features/authors/authorsSlice';
// import { booksReducer } from '@/features/books/booksSlice';
// import { genresReducer } from '@/features/genres/genresSlice';
// import { borrowingsReducer } from '@/features/borrowings/borrowingsSlice';
//
// const persistConfig = {
//   key: 'library',
//   whitelist: ['user'],
//   storage,
// };
//
// const rootReducer = combineReducers({
//   users: persistReducer(persistConfig, usersReducer),
//   authors: authorsReducer,
//   books: booksReducer,
//   genres: genresReducer,
//   borrowings: borrowingsReducer,
// });
//
// const makeConfiguredStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     devTools: true,
//   });
//
// export const makeStore = () => {
//   const isServer = typeof window === 'undefined';
//   if (isServer) {
//     return makeConfiguredStore();
//   } else {
//     let store: any = configureStore({
//       reducer: rootReducer,
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//           serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//           },
//         }),
//       // devTools: process.env.NODE_ENV !== 'production',
//     });
//     store.__persistor = persistStore(store);
//     return store;
//   }
// };
//
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
//
// export const wrapper = createWrapper<AppStore>(makeStore);
