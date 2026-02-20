interface User {
  userId: string;
  name: string;
  isOnline: boolean;
}

interface Message {
  messageId: string;
  text: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatPreview {
  chatId: string;
  user: User;
  message: Message;
}
