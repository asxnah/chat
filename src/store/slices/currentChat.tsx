import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "@shared-types/message";

const HAS_BG = false;

interface ChatData {
  data: MessageInterface[];
}

const initialState: ChatData = {
  data: [
    {
      hasParentBackground: HAS_BG,
      isSent: false,
      text: "a kitten is a young cat, typically referring to one under about one year old and before sexual maturity around seven months",
      createdAt: "2026-02-20T09:15:00+05:00",
    },
    {
      hasParentBackground: HAS_BG,
      isSent: true,
      text: "these juveniles are born altricial—blind, deaf, and fully dependent on their mother for warmth, milk, and protection",
      createdAt: "2026-02-20T11:30:00+05:00",
      quotedMessage: {
        user: "Someone",
        message:
          "a kitten is a young cat, typically referring to one under about one year old and before sexual maturity around seven months",
      },
    },
    {
      hasParentBackground: HAS_BG,
      isSent: false,
      text: "kittens are born after a 64-67 day gestation in litters of 2-5 (sometimes up to 10), emerging in an amniotic sac that the mother removes and eats",
      createdAt: "2026-02-20T14:45:00+05:00",
      quotedMessage: {
        user: "You",
        message:
          "these juveniles are born altricial—blind, deaf, and fully dependent on their mother for warmth, milk, and protection",
      },
    },
    {
      hasParentBackground: HAS_BG,
      isSent: true,
      text: "domestic kittens are playful, social creatures that thrive on human interaction and littermate bonding",
      createdAt: "2026-02-20T16:05:00+05:00",
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
