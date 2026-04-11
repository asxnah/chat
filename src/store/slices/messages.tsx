import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@shared-types/chat";

interface Messages {
  messages: Message[];
}

const initialState: Messages = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state: Messages, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state: Messages, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
