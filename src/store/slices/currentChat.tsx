import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/shared/types/chat";

interface ChatData {
  messages: Message[];
}

const initialState: ChatData = {
  messages: [],
};

export const chatsSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setMessages: (state: ChatData, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state: ChatData, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

// Экспортируем action
export const { setMessages, addMessage } = chatsSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsSlice.reducer;
