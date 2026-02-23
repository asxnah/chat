import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/shared/types/chat";

interface ChatData {
  hasParentBackground: boolean;
  messages: Message[];
}

const initialState: ChatData = {
  hasParentBackground: false,
  messages: [
    {
      messageId: "123e4567-e89b-12d3-a456-426614174000",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: "2026-02-21T13:33:16+0000",
      status: "idle",
    },
    {
      messageId: "550e8400-e29b-41d4-a716-446655440000",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: "2026-02-21T13:33:16+0000",
      status: "read",
    },
    {
      messageId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      createdAt: "2026-02-21T13:33:16+0000",
      status: "unread",
    },
    {
      messageId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      createdAt: "2026-02-21T13:33:16+0000",
      status: "sending",
    },
  ],
};

export const chatsSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    set: (state, action: PayloadAction) => {},
    add: (state, action: PayloadAction) => {},
  },
});

// Экспортируем action
export const { set, add } = chatsSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsSlice.reducer;
