import { Chat } from "@shared-types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLastMessageTime } from "../utils/getLastMessageTime";

interface Chats {
  notifs: boolean;
  chats: Chat[];
}

const initialState: Chats = {
  notifs: true,
  chats: [],
};

export const chatsPreviewSlice = createSlice({
  name: "chatsPreview",
  initialState,
  reducers: {
    setChats: (state: Chats, action: PayloadAction<Chat[]>) => {
      if (action.payload.length === 0) {
        state.chats = action.payload.sort(
          (a, b) => getLastMessageTime(b) - getLastMessageTime(a),
        );
      }
    },
    addChat: (state: Chats, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
      state.chats.sort((a, b) => getLastMessageTime(b) - getLastMessageTime(a));
    },
    setNotifs: (state: Chats, action: PayloadAction<boolean>) => {
      state.notifs = action.payload;
    },
  },
});

export const { setChats, addChat, setNotifs } = chatsPreviewSlice.actions;
export default chatsPreviewSlice.reducer;
