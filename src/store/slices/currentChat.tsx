import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/shared/types/chat";

interface ChatData {
  hasParentBackground: boolean;
  messages: Message[];
}

const initialState: ChatData = {
  hasParentBackground: false,
  messages: [],
};

export const chatsSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setMessages: (
      state: ChatData,
      action: PayloadAction<{
        hasParentBackground: boolean;
        messages: Message[];
      }>,
    ) => {
      state.hasParentBackground = action.payload.hasParentBackground;
      state.messages = action.payload.messages;
    },
    addMessage: (
      state: ChatData,
      action: PayloadAction<{ message: Message }>,
    ) => {
      state.messages.push(action.payload.message);
    },
  },
});

// Экспортируем action
export const { setMessages, addMessage } = chatsSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsSlice.reducer;
