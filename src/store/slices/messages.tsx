import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/shared/types/chat";

interface Messages {
  data: Message[];
}

const initialState: Messages = {
  data: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state: Messages, action: PayloadAction<Message[]>) => {
      state.data = action.payload;
    },
    addMessage: (state: Messages, action: PayloadAction<Message>) => {
      state.data.push(action.payload);
    },
  },
});

// Экспортируем action
export const { setMessages, addMessage } = messagesSlice.actions;
// Экспортируем редьюсер по умолчанию
export default messagesSlice.reducer;
