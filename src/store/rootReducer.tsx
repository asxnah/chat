import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userData";
import currentChatReducer from "./slices/currentChat";
import chatsPreviewReducer from "./slices/chatsPreview";
import contactsReducer from "./slices/contacts";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  currentChat: currentChatReducer,
  chatsPreview: chatsPreviewReducer,
  contacts: contactsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
