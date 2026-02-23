import { ChatPreview } from "@/shared/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatsData {
  chats: ChatPreview[];
}

const initialState: ChatsData = {
  chats: [],
};

export const chatsPreviewSlice = createSlice({
  name: "chatsPreview",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ChatPreview[]>) => {
      state.chats = action.payload.sort(
        (a, b) =>
          new Date(b.message.createdAt).getTime() -
          new Date(a.message.createdAt).getTime(),
      );
    },
    add: (state, action: PayloadAction<ChatPreview>) => {
      state.chats.push(action.payload);
      state.chats.sort(
        (a, b) =>
          new Date(b.message.createdAt).getTime() -
          new Date(a.message.createdAt).getTime(),
      );
    },
  },
});

// Экспортируем action
export const { set, add } = chatsPreviewSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsPreviewSlice.reducer;
