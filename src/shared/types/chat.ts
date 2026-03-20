export interface Message {
  messageId: string;
  chatId: string;
  userId: string;
  text: string;
  isRead: true;
  createdAt: string;
}

export interface Chat {
  chatId: string;
  user: {
    userId: string;
    name: string;
    isOnline: boolean;
  };
  unreadCount: number;
  messages: Message[];
}
