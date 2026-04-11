import { Chat } from "@shared-types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLastMessageTime } from "../utils/getLastMessageTime";

interface Chats {
  chats: Chat[];
}

const initialState: Chats = {
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
  },
});

export const { setChats, addChat } = chatsPreviewSlice.actions;
export default chatsPreviewSlice.reducer;
