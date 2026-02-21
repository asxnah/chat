import { MessageInterface } from "./message";

export interface ChatPreview {
  chatId: string;
  user: {
    userId: string;
    name: string;
    isOnline: boolean;
  };
  message: MessageInterface;
}
