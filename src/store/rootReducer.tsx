import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userData";
import currentChatReducer from "./slices/currentChat";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  currentChat: currentChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
