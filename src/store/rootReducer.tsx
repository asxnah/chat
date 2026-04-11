import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import messagesReducer from "./slices/messages";
import chatsReducer from "./slices/chats";
import contactsReducer from "./slices/contacts";

export const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  chats: chatsReducer,
  contacts: contactsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
