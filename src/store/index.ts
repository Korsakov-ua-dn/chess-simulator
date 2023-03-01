import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { boardReducer } from '../modules/board-controller/board-slice';

const rootReducer = combineReducers({
  board: boardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
