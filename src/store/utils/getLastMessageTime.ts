import { ChatPreview } from "@/shared/types/chat";

export const getLastMessageTime = (chat: ChatPreview): number => {
  if (!chat.messages.length) return 0;

  const lastMessage = chat.messages[chat.messages.length - 1];
  return new Date(lastMessage.createdAt).getTime();
};
