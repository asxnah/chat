import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userData";
import currentChatReducer from "./slices/currentChat";
import chatsPreviewReducer from "./slices/chatsPreview";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  currentChat: currentChatReducer,
  chatsPreview: chatsPreviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
