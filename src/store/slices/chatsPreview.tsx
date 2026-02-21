import { ChatPreview } from "@shared-types/chatPreview";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatsData {
  chats: ChatPreview[];
}

const initialState: ChatsData = {
  chats: [
    {
      chatId: "59d25a54-904d-4fb5-b1a4-6d42c3f03671",
      user: {
        userId: "5cd2aa7d-5e0e-4ad6-8123-5ef2695ed4ab",
        name: "User 1",
        isOnline: false,
      },
      message: {
        messageId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        status: "idle",
        createdAt: "2026-02-21T13:53:08.744046+00:00",
      },
    },
    {
      chatId: "ba1e3bb7-7acf-42da-a3b0-fb2a7aaaf013",
      user: {
        userId: "528c6104-37f7-41a9-9740-5dc9a1e7f020",
        name: "User 2",
        isOnline: true,
      },
      message: {
        messageId: "98765432-10fe-dcba-9876-543210fedcba",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
        status: "idle",
        createdAt: "2026-02-21T13:48:08.744202+00:00",
      },
    },
  ],
};

export const chatsPreviewSlice = createSlice({
  name: "chatsPreview",
  initialState,
  reducers: {
    set: (state, action: PayloadAction) => {},
    add: (state, action: PayloadAction) => {},
  },
});

// Экспортируем action
export const { set, add } = chatsPreviewSlice.actions;
// Экспортируем редьюсер по умолчанию
export default chatsPreviewSlice.reducer;
