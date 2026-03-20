import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userData";
import messagesReducer from "./slices/messages";
import chatsPreviewReducer from "./slices/chatsPreview";
import contactsReducer from "./slices/contacts";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  messages: messagesReducer,
  chatsPreview: chatsPreviewReducer,
  contacts: contactsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
