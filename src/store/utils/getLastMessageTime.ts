import { Chat } from "@/shared/types/chat";

export const getLastMessageTime = (chat: Chat): number => {
  if (!chat.messages.length) return 0;

  const lastMessage = chat.messages[chat.messages.length - 1];
  return new Date(lastMessage.createdAt).getTime();
};
