import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userData";
import currentChatReducer from "./slices/currentChat";
import chatsPreviewReducer from "./slices/chatsPreview";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  currentChat: currentChatReducer,
  chatsPreview: chatsPreviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
