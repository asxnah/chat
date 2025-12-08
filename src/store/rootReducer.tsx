import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userData";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
