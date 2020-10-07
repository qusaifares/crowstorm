import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
