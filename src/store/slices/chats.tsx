import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chats {
  chats: Chat[];
}

const initialState: Chats = {
  chats: [
    {
      id: "chat-1a8f2e3d-91b7-4a22-bc1a-74d5b6e1e4a9",
      backgroundImage: "",
      chat_data: [
        {
          id: "msg-1b2e1a4d-7a0c-4b5f-81e7-0cdb34f7d1a9",
          user_id: "user-0f5e2cda-3471-46ac-9b2e-bb0b5c1d7b3e",
          msg: "Are you coming today?",
          time: "2025-08-27T11:30:00+05:00",
          read: true,
        },
        {
          id: "msg-2f9d5e6b-8a30-490f-9251-6abca1b0f11d",
          user_id: "user-8d6b3b9f-c4a0-4e91-a27e-5b7ce5e6401f",
          msg: "Yes, I'll be there",
          time: "2025-08-27T11:35:00+05:00",
          read: true,
        },
      ],
    },
    {
      id: "chat-24b91e57-fd63-4f35-b8b1-8b5d53a7c0ac",
      backgroundImage:
        "https://i.pinimg.com/736x/20/3a/80/203a80fdf2af69d79b40b324740aa4cd.jpg",
      chat_data: [
        {
          id: "msg-31dcf8a0-65b4-4a02-9d1c-03b19ff4c210",
          user_id: "user-4ac0a7fb-6f44-4a4e-9b7f-6b51b5cb973a",
          msg: "Good morning! Did you sleep well?",
          time: "2025-08-28T08:05:00+05:00",
          read: true,
        },
        {
          id: "msg-4e61a727-6a56-4eb2-b5b0-c3b9a1d2f5a1",
          user_id: "user-8d6b3b9f-c4a0-4e91-a27e-5b7ce5e6401f",
          msg: "Yeah, pretty good! You?",
          time: "2025-08-28T08:07:00+05:00",
          read: true,
        },
        {
          id: "msg-57cb77b0-b742-4f2a-b8c5-4df239e67ac4",
          user_id: "user-4ac0a7fb-6f44-4a4e-9b7f-6b51b5cb973a",
          msg: "Still sleepy",
          time: "2025-08-28T08:08:00+05:00",
          read: false,
        },
        {
          id: "msg-67f451e0-9cd9-43dc-857b-8a9f4d7c8c11",
          user_id: "user-4ac0a7fb-6f44-4a4e-9b7f-6b51b5cb973a",
          msg: "Need coffee ☕️",
          time: "2025-10-27T16:07:00+05:00",
          read: false,
        },
      ],
    },
    {
      id: "chat-3cf0d47e-63e2-46b8-a3e7-f8b83dcb8b1f",
      backgroundImage: "",
      chat_data: [
        {
          id: "msg-703eb5e1-89e9-4029-9e26-326c8f6bcd31",
          user_id: "user-62e2e1aa-f79f-458d-9c60-85dd1c3e1c4d",
          msg: "Hey, wanna watch something tonight?",
          time: "2025-08-29T20:15:00+05:00",
          read: true,
        },
        {
          id: "msg-811bc4f4-8d03-4db9-a6e3-3c2cde9df1f0",
          user_id: "user-8d6b3b9f-c4a0-4e91-a27e-5b7ce5e6401f",
          msg: "Sure! What are we watching?",
          time: "2025-08-29T20:16:00+05:00",
          read: true,
        },
        {
          id: "msg-9b5fdc8f-1c65-4ef7-8329-b2e2d0e0a6a2",
          user_id: "user-62e2e1aa-f79f-458d-9c60-85dd1c3e1c4d",
          msg: "Maybe that new fantasy movie?",
          time: "2025-08-29T20:17:00+05:00",
          read: true,
        },
        {
          id: "msg-a7dc0b9a-3b27-4e2d-9850-01ce74319b70",
          user_id: "user-8d6b3b9f-c4a0-4e91-a27e-5b7ce5e6401f",
          msg: "Perfect, I'll bring snacks 🍿",
          time: "2025-10-26T13:00:00+05:00",
          read: true,
        },
      ],
    },
  ],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Chat>) => {},
  },
});

export const { set } = chatsSlice.actions;
export default chatsSlice.reducer;
