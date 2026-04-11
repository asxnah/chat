import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/user";
import messagesReducer from "./slices/messages";
import chatsReducer from "./slices/chats";
import contactsReducer from "./slices/contacts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["chats", "messages", "contacts"],
};

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  chats: chatsReducer,
  contacts: contactsReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
