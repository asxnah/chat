import { ChatPreview } from "@/shared/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLastMessageTime } from "../utils/getLastMessageTime";

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
    setChatsPreview: (
      state: ChatsData,
      action: PayloadAction<ChatPreview[]>,
    ) => {
      state.chats = action.payload.sort(
        (a, b) => getLastMessageTime(b) - getLastMessageTime(a),
      );
    },
    addChatPreview: (state: ChatsData, action: PayloadAction<ChatPreview>) => {
      state.chats.push(action.payload);
      state.chats.sort((a, b) => getLastMessageTime(b) - getLastMessageTime(a));
    },
  },
});

// Экспортируем action
export const { setChatsPreview, addChatPreview } = chatsPreviewSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsPreviewSlice.reducer;
